import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Outlet, useParams, withRouter } from 'react-router-dom';


const Pagedash = (props) => {


    const [pages, setPages] = useState();
    const [deleted, setDeleted] = useState(false)
    const getPages = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + '/api/pages'
        axios.get(url)
            .then(res => {
                console.log(res.data)
                setPages(res.data)
                setDeleted(false)
            })


    }
    const deletePage = (da) => {

        let url = process.env.REACT_APP_SERVER_DOMAIN + "/api/pages"
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
        console.log('inside delete button')
        if (e.target.name) {
            deletePage(e.target.name)
        }
    }
    useEffect(() => {
        getPages();
    }, [])
    useEffect(() => {
        getPages();
    }, [deleted])
    if (!pages) {
        return <p>Loading...</p>
    }
    return (
        <main>



            <h2>Pages</h2>
            <div><Link className='btn btn-outline-success' to="/dashboard/pages/create">Create New Page</Link></div>
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
                                <td><Link className='btn btn-outline-success' to={'/dashboard/pages/' + el._id}>Edit</Link></td>
                                <td><button className='btn btn-outline-success' name={el._id} onClick={deletepost}>Delete</button></td>

                            </tr>
                        })}


                    </tbody>
                </table>


            </div>
        </main>
    )
}

export default Pagedash