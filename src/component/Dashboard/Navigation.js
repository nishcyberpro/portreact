import { Link } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Navigation() {
    const [user, setUser] = useState()
    const [isAdmin, setisAdmin] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const getUser = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/api/user/data"
        axios.post(url, {

        }, {
            headers: {
                "Authorization": `${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            console.log(data)

            setUser(data.data)
            if (data.data.role === 'Admin') {
                setisAdmin(true)
            }
            else if (data.data.role === 'seller') {
                setIsSeller(true)

            }
            console.log(isAdmin)
        })



    }
    useEffect(() => {
        getUser()

    }, [])



    return (
        <div>
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar  mt-3 ">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/dashboard/account">
                                <span data-feather="home" className="align-text-bottom"></span>
                                My Account
                            </Link>
                        </li>
                        {isAdmin &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard/blog">
                                    <span data-feather="file" className="align-text-bottom"></span>
                                    Blogs
                                </Link>
                            </li>}
                        {isAdmin && <li className="nav-item">

                            <Link className="nav-link" to="/dashboard/pages">
                                <span data-feather="shopping-cart" className="align-text-bottom"></span>
                                Pages
                            </Link>
                        </li>}
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard/portfolio">
                                    <span data-feather="users" className="align-text-bottom"></span>
                                    Protfolio
                                </Link>


                            </li>

                        </ul>

                        {isAdmin && <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard/contact">
                                    <span data-feather="users" className="align-text-bottom"></span>
                                    Messages
                                </Link>


                            </li>
                        </ul>}   {isSeller && <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard/orders">
                                    <span data-feather="users" className="align-text-bottom"></span>
                                    Orders
                                </Link>


                            </li>
                        </ul>}


                    </ul>



                </div>
            </nav>
        </div>
    )
}

export default Navigation