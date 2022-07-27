import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const ShowProjects = () => {

    const [Projects, setProjects] = useState([])
    const [del, setDel] = useState(false)

    const getProjects = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/Projects"

        axios.get(url,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("access_token")}`
                }
            }).then(data => {
                setProjects(data.data)
                setDel(false)

                console.log(Projects)
            })
    }

    const handleDelete = (e) => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/Projects"
        let id = e.target.name
        axios.delete(url + '/' + id, {
            headers: {
                "Authorization": `${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            setDel(true)

        })
    }
    useEffect(() => {
        getProjects()
    }, [])

    useEffect(() => {
        getProjects()
    }, [del])
    return (
        <main >



            <h2>Projects</h2>
            <div><Link className='btn btn-outline-success' to="/dashboard/portfolio/project/create">Add Projects</Link></div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Projects Title</th>
                            <th scope="col">Role</th>
                            <th scope="col">Address</th>
                            <th scope="col">City</th>
                            <th scope="col">Country</th>
                            <th scope="col">Website</th>






                        </tr>
                    </thead>
                    <tbody>
                        {Projects.map(el => {
                            return <>
                                <tr >


                                    <td>{el.title}</td>
                                    <td>{el.role}</td>
                                    <td>{el.address}</td>
                                    <td>{el.city}</td>
                                    <td>{el.country}</td>
                                    <td>{el.website}</td>


                                    <td><Link className='btn btn-outline-success' to={`/dashboard/portfolio/project/${el._id}`}>Edit</Link> <button className='btn btn-outline-success' name={el._id} onClick={handleDelete}> Delete</button></td>



                                </tr>
                            </>

                        })}




                    </tbody>
                </table>


            </div>

        </main>
    )
}

export default ShowProjects
