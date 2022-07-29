import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Outlet, useParams, withRouter } from 'react-router-dom';


const Blogdash = () => {
    const [pageno, setPageno] = useState(1)


    const [pages, setPages] = useState();
    const [search, setSearch] = useState("");
    const [deleted, setDeleted] = useState(false)
    const getPages = () => {
        axios.get(process.env.REACT_APP_SERVER_DOMAIN + '/api/blog?pageno=' + pageno + '&search_term=' + search)
            .then(res => {
                console.log(res.data)
                setPages(res.data)
                setDeleted(false)

            })


    }
    useEffect(() => {
        getPages();
    }, [])

    useEffect(() => {
        getPages();
    }, [deleted])

    useEffect(() => {
        getPages();
    }, [search])
    useEffect(() => {
        if (pageno == -1) {
            setPageno(1)
        }

        getPages();
    }, [pageno])
    if (!pages) {
        return <p>Loading...</p>
    }

    const deleteBlog = (da) => {
        console.log(da)
        let url = process.env.REACT_APP_SERVER_DOMAIN + '/api/blog'
        axios.delete(url + '/' + da, {
            headers: {
                "Authorization": `${localStorage.getItem("access_token")}`
            }
        }).then(result => {
            console.log(result.data)
            setDeleted(true)

        })
    }
    const deletepost = (e) => {
        if (e.target.name) {
            deleteBlog(e.target.name)
        }
    }

    const searchBlog = (e) => {
        console.log(e.target.value)
        setSearch(e.target.value)
    }

    return (
        <main>



            <h2>Blogs</h2>
            <div className='row'>
                <div className='col'>
                    <Link className='btn btn-outline-success' to="/dashboard/blog/create">Create New Blog Post</Link>
                </div>
                <div className='col'>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={searchBlog} />
                    </form>
                </div>


            </div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Content</th>
                            <th scope="col">Published Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map(el => {
                            return <tr key={el._id}>

                                <th scope="row">{el.title}</th>
                                <td> <div className="content" dangerouslySetInnerHTML={{ __html: el.content.slice(0, 20) }} /></td>
                                {/* <td>{el.published_date.slice(0, 10)}</td> */}
                                <td><Link className='btn btn-outline-success' to={'/dashboard/blog/' + el._id}>Edit</Link></td>
                                <td><button className='btn btn-outline-success' name={el._id} onClick={deletepost}>Delete</button></td>


                            </tr>
                        })}


                    </tbody>
                    <nav className="blog-pagination mt-4" aria-label="Pagination">
                        <a className="btn btn-outline-primary rounded-pill " onClick={() => { setPageno(pageno - 1) }}>Newer</a>

                        <a className="btn btn-outline-primary rounded-pill" onClick={() => {
                            console.log("page count" + pages.count)

                            setPageno(pageno + 1)

                        }}>Older</a>
                    </nav>
                </table>


            </div>
        </main>
    )
}

export default Blogdash