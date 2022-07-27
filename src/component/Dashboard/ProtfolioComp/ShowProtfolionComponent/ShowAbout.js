import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ShowAbout = () => {

    const [about, setAbout] = useState()

    const getAbout = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/portfolio"

        axios.get(url,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("access_token")}`
                }
            }).then(data => {
                setAbout(data.data)
                console.log(about)
            })
    }

    useEffect(() => {
        getAbout()
    }, [])
    if (!about) {
        return (<>LOADING...</>)
    }
    else {
        return (
            <div>  <main >



                <h2>About</h2>

                {/* {!about && `<div> <Link className='btn btn-outline-success' to="/dashboard/portfolio/about/create">Add About</Link></div>`} */}

                < div className="table-responsive" >
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone No.</th>



                            </tr>
                        </thead>
                        <tbody>
                            {
                                < tr >


                                    <td>{about.name}</td>
                                    <td>{about.address}</td>
                                    <td>{about.email}</td>
                                    <td>{about.phone_no}</td>
                                    <td><Link className='btn btn-outline-success' to="/dashboard/portfolio/about">Edit</Link> </td>



                                </tr>

                            }


                        </tbody>
                    </table>


                </div >

            </main ></div >
        )
    }
}

export default ShowAbout