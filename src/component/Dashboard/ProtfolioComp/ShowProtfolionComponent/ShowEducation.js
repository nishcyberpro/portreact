import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const ShowEducation = () => {

    const [education, setEducation] = useState([])
    const [del, setDel] = useState(false)

    const getEducation = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/education"

        axios.get(url,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("access_token")}`
                }
            }).then(data => {
                setEducation(data.data)
                setDel(false)

                console.log(education)
            })
    }

    useEffect(() => {
        getEducation()
    }, [])
    useEffect(() => {
        getEducation()
    }, [del])

    const handleDelete = (e) => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/education"
        let id = e.target.name
        axios.delete(url + '/' + id, {
            headers: {
                "Authorization": `${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            setDel(true)

        })
    }
    return (
        <main >



            <h2>Education</h2>
            <div><Link className='btn btn-outline-success' to="/dashboard/portfolio/education/create">Add Education</Link></div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Education Title</th>
                            <th scope="col">Organization</th>
                            <th scope="col">Address</th>
                            <th scope="col">City</th>
                            <th scope="col">Country</th>
                            <th scope="col">Website</th>






                        </tr>
                    </thead>
                    <tbody>
                        {education.map(el => {
                            return <>
                                <tr >


                                    <td>{el.title}</td>
                                    <td>{el.organization}</td>
                                    <td>{el.address}</td>
                                    <td>{el.city}</td>
                                    <td>{el.country}</td>
                                    <td>{el.website}</td>


                                    <td><Link className='btn btn-outline-success' to={`/dashboard/portfolio/education/${el._id}`}>Edit</Link> <button className='btn btn-outline-success' name={el._id} onClick={handleDelete}> Delete</button></td>



                                </tr>
                            </>

                        })}




                    </tbody>
                </table>


            </div>

        </main>
    )
}

export default ShowEducation
