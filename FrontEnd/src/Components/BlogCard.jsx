import React from 'react'
import { Link } from 'react-router-dom'
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const BlogCard = ({ title, description, image, author, id, onclick }) => {
    return (
        <>
            <div className="col-12 con-md-2 col-lg-3 mb-4">
                <div className="card border-0 shadow-lg p-2">
                    <img src={`http://127.0.0.1:8000/images/${image}`} className='card-img-top' alt="" />

                    <h2 className='h5 mt-3 mb-0'>{title}</h2>
                    <p className='mb-0 mt-1'>{description}</p>
                    <p className='text-muted fw-bold mt-1'>Author: {author}</p>

                    <div className="d-flex gap-2 align-items-center mt-3">
                        <Link className='btn btn-sm btn-outline-dark' to={`/edit/${id}`}>
                            <FaPen />
                        </Link>

                        <button className='btn btn-sm btn-outline-dark' onClick={onclick}>
                            <FaTrash />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard
