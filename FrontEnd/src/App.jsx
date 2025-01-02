import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, Link, Route, RouterProvider } from 'react-router-dom'
import BlogCard from './Components/BlogCard';
import Blogs from "./Components/Blogs";
import BlogCreate from "./Components/BlogCreate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogEdit from "./Components/BlogEdit";

function App() {

    const route = createBrowserRouter(createRoutesFromElements(
        <Route>
            <Route path="/" element={<Blogs />} />
            <Route path="/create" element={<BlogCreate />} />
            <Route path="/edit/:id" element={<BlogEdit />} />
        </Route>
    ))

    return (
        <>
            <RouterProvider router={route} />
            <ToastContainer />
        </>
    )
}

export default App
