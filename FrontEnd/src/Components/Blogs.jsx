import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BlogCard from './BlogCard'
import Api from '../Api';
import BlogPagination from './BlogPagination';


const Blogs = () => {

    const { http } = Api();

    //State
    const [blogs, setBlogs] = useState([]);
    const [paginateBlogs, sepaginateBlogs] = useState([]);
    const [page, setPage] = useState(1);

    //Get All Blogs
    useEffect(() => {
        getUser();
    }, [page])

    const getUser = () => {
        http.get(`/blogs?page=${page}`).then(res => {
            setBlogs(res.data.blogs.data);
            sepaginateBlogs(res.data.blogs);
        })
    }

    //Delete User
    const dltUser = (id) => {
        http.delete(`blogs/${id}`).then(res => {

            if (res.data.status == true) {
                if (blogs.length == 1 && page > 1) {
                    setPage(page - 1);
                }

                setBlogs(blogs.filter(blog => blog.id !== id));
            }

        })
    }

    return (
        <>
            <section className='py-5'>
                <div className="container">
                    <div className="d-flex justify-content-between pb-3">
                        <h4>BLOGS</h4>
                        <Link className='btn btn-dark' to="/create">ADD +</Link>
                    </div>

                    <div className="row">
                        {
                            blogs?.map((blog) => (
                                <BlogCard key={blog.id} title={blog.title} description={blog.description} image={blog.image} author={blog.author} id={blog.id} onclick={() => dltUser(blog.id)} />
                            ))
                        }
                    </div>
                    
                    <BlogPagination blogs={paginateBlogs} setPage={setPage} />
                </div>
            </section>
        </>
    )
}

export default Blogs
