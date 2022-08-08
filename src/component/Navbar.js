import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
function Navbar() {
    const loginState = useContext(AuthContext)


    const [pages, setPages] = useState()
    const [token, setToken] = useState()
    const navigate = useNavigate();
    const getPages = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + '/api/pages'
        axios.get(url)
            .then(res => {
                console.log(res.data)
                setPages(res.data)
            })


    }
    const logOut = (e) => {


        e.preventDefault();
        loginState.logOut();




    }
    const handleLoginButton = (e) => {
        e.preventDefault();
        if (loginState.state.isloggedIn) {
            localStorage.removeItem('access_token')
            loginState.logOut();
            navigate('/')

        }
        else {
            navigate('/login')
        }
    }
    const logIn = (e) => {


        e.preventDefault();
        navigate('/login')
        console.log(" ima in login")




    }
    useEffect(() => {
        setToken(localStorage.getItem('access_token'))
        getPages()




    }, [])

    // useEffect(() => {
    //     setToken(localStorage.getItem('access_token'))

    // }, token)

    if (!pages) {
        return <p>Loading...</p>
    }




    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" id='pagenav'>
            <div className="container-fluid">
                <Link className='navbar-brand' to="/">NSN</Link>


                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">



                        {pages.map(el => {
                            return <li className="nav-item" key={el.slug}>
                                <Link className='nav-link' to={`/pages/${el.slug}`}>{el.title}</Link>

                                {/* <a className='nav-link' href={`/pages/${el.slug}`}> {el.title}</a> */}

                            </li>

                        })}
                        <li className="nav-item">
                            <Link className='nav-link' to="/contact-us">Contact Us</Link>
                        </li>



                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>

                    {
                        loginState.state.isloggedIn && <Link className='btn btn-outline-success' type='submit' to="/dashboard">MyAccount</Link>
                    }



                    <form onSubmit={handleLoginButton} >
                        <button className='btn btn-outline-success' type='submit' >{loginState.state.isloggedIn && <>Logout</>}{!loginState.state.isloggedIn && <>Login</>}</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar