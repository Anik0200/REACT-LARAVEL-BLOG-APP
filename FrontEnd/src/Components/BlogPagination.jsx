import React from 'react'
import './BlogPagination.css'

const BlogPagination = ({ blogs, setPage }) => {

    const fetchNextPrevTasks = (link) => {
        const url = new URL(link);
        setPage(url.searchParams.get('page'));
    }

    const renderPaginationLinks = () => {
        return <ul className="pagination">
            {
                blogs.links?.map((link, index) => (
                    <li key={index} className="page-item">
                        <a style={{ cursor: 'pointer' }} className={`page-link ${link.active ? 'active' : ''}`}
                            onClick={() => fetchNextPrevTasks(link.url)}>
                            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                        </a>
                    </li>
                ))
            }
        </ul>
    }

    return (
        <>
            {
                renderPaginationLinks()
            }
        </>
    )
}

export default BlogPagination
