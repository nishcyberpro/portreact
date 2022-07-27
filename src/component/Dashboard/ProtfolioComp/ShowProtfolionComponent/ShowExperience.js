import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const ShowExperience = () => {

    const [Experience, setExperience] = useState([])
    const [del, setDel] = useState(false)

    const getExperience = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/experience"

        axios.get(url,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("access_token")}`
                }
            }).then(data => {
                setExperience(data.data)
                console.log(Experience)
                setDel(false)
            })
    }
    const handleDelete = (e) => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/experience"
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
        getExperience()
    }, [del])
    useEffect(() => {
        getExperience()
    }, [])
    return (
        <main >



            <h2>Experience</h2>
            <div><Link className='btn btn-outline-success' to="/dashboard/portfolio/experience/create">Add Experience</Link></div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col"> Title</th>
                            <th scope="col">Employer</th>
                            <th scope="col">Address</th>
                            <th scope="col">City</th>
                            <th scope="col">Country</th>
                            <th scope="col">Website</th>
                            <th scope="col">Duties</th>







                        </tr>
                    </thead>
                    <tbody>
                        {Experience.map(el => {
                            return <>
                                <tr >


                                    <td>{el.title}</td>
                                    <td>{el.employer}</td>
                                    <td>{el.address}</td>
                                    <td>{el.city}</td>
                                    <td>{el.country}</td>
                                    <td>{el.website}</td>
                                    <td> <div className="content" dangerouslySetInnerHTML={{ __html: el.activities }} /></td>


                                    <td><Link className='btn btn-outline-success' to={`/dashboard/portfolio/experience/${el._id}`}>Edit</Link><button className='btn btn-outline-success' name={el._id} onClick={handleDelete}> Delete</button></td>



                                </tr>
                            </>

                        })}




                    </tbody>
                </table>


            </div>

        </main>
    )
}

export default ShowExperience
