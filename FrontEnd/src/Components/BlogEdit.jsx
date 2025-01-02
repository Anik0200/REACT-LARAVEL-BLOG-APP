import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Editor from 'react-simple-wysiwyg';
import Api from '../Api';
import { toast } from 'react-toastify';

const BlogEdit = () => {

    //Navigate
    const navigate = useNavigate();

    // Base Api
    const { http } = Api();

    // URL Param
    const { id } = useParams();

    // State
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [author, setAuthor] = useState()

    const [imagePreview, setImagePreview] = useState();

    const [titleError, setTitleError] = useState();
    const [descriptionError, setDescriptionError] = useState();
    const [imageError, setImageError] = useState();
    const [authorError, setAuthorError] = useState();

    // fetch single blog data
    useEffect(() => {
        http.get(`blogs/${id}/edit`).then(res => {
            if (res.data.status == true) {
                setTitle(res.data.blog.title);
                setDescription(res.data.blog.description);
                setImagePreview(res.data.blog.image);
                setAuthor(res.data.blog.author);
            }

            if (res.data.status == false) {
                toast(res.data.message);
                navigate('/');
            }
        })
    }, [])

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!titleError && !descriptionError && !imageError && !authorError) {
            //Clear Errors
            setTitleError('');
            setDescriptionError('');
            setImageError('');
            setAuthorError('');

            //Create FormData
            const formData = new FormData();
            formData.append('_method', 'put');
            formData.append('title', title || '');
            formData.append('description', description || '');
            formData.append('image', image || '');
            formData.append('author', author || '');

            //Call Update API
            http.post(`blogs/${id}`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
                .then(res => {
                    if (res.data.status == false) {
                        setTitleError(res.data.error.title);
                        setDescriptionError(res.data.error.description);
                        setImageError(res.data.error.image);
                        setAuthorError(res.data.error.author);
                    }

                    if (res.data.status == true) {
                        toast(res.data.message);
                        navigate('/');
                    }
                })
        }
    }



    return (
        <>
            <section className='py-4'>
                <div className="container">
                    <div className="d-flex justify-content-between pb-3">
                        <h4>EDIT</h4>
                        <Link className='btn btn-dark' to="/">BACK</Link>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card border-0 shadow-lg p-3">

                                <div className="mb-3">
                                    <label className='form-label'>Title </label>
                                    <input type="text" className='form-control' defaultValue={title}
                                        onChange={(e) => setTitle(e.target.value)} />
                                    <p className='text-danger fw-bold mt-2'>{titleError}</p>
                                </div>

                                <div className="mb-3">
                                    <label className='form-label'>Description </label>
                                    <Editor value={description} onChange={(e) => setDescription(e.target.value)}
                                        containerProps={{ style: { height: '200px' } }} />
                                    <p className='text-danger fw-bold mt-2'>{descriptionError}</p>

                                </div>

                                <div className="mb-3">
                                    <label className='form-label'>Image</label>
                                    <input type="file" className='form-control'
                                        onChange={(e) => setImage(e.target.files[0])} />
                                    <p className='text-danger fw-bold mt-2'>{imageError}</p>

                                    <img src={`http://127.0.0.1:8000/images/${imagePreview}`} className='card-img' style={{ width: '100px', height: '100px' }} alt="" />
                                </div>

                                <div className="mb-3">
                                    <label className='form-label'>Author</label>
                                    <input type="text" className='form-control' defaultValue={author}
                                        onChange={(e) => setAuthor(e.target.value)} />
                                    <p className='text-danger fw-bold mt-2'>{authorError}</p>
                                </div>

                                <div>
                                    <button onClick={handleSubmit} type="submit" className='btn btn-dark'>Save</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlogEdit
