import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Editor from 'react-simple-wysiwyg';
import Api from '../Api';
import { toast } from 'react-toastify';


const BlogCreate = () => {

    const navigate = useNavigate();

    //Base Api
    const { http } = Api();

    //State
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [author, setAuthor] = useState();

    const [titleError, setTitleError] = useState();
    const [descriptionError, setDescriptionError] = useState();
    const [imageError, setImageError] = useState();
    const [authorError, setAuthorError] = useState();


    //Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        //Create FormData
        const formData = new FormData();
        formData.append('title', title || '');
        formData.append('description', description || '');
        formData.append('image', image || '');
        formData.append('author', author || '');

        //Call Store API
        http.post('blogs', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(res => {
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

    return (
        <>
            <section className='py-4'>
                <div className="container">
                    <div className="d-flex justify-content-between pb-3">
                        <h4>CREATE</h4>
                        <Link className='btn btn-dark' to="/">BACK</Link>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card border-0 shadow-lg p-3">

                                <div className="mb-3">
                                    <label className='form-label'>Title </label>
                                    <input type="text" className='form-control' onChange={(e) => setTitle(e.target.value)} />
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
                                    <input type="file" className='form-control' onChange={(e) => setImage(e.target.files[0])} />
                                    <p className='text-danger fw-bold mt-2'>{imageError}</p>
                                </div>

                                <div className="mb-3">
                                    <label className='form-label'>Author</label>
                                    <input type="text" className='form-control' onChange={(e) => setAuthor(e.target.value)} />
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

export default BlogCreate
