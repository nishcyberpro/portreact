import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const loginState = useContext(AuthContext)

    const [token, setToken] = useState()

    const [logindata, setLoginData] = useState({})
    const [loginResult, setLoginResult] = useState()
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({ ...logindata, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e) => {

        e.preventDefault();
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/api/user/login"
        let { email, password } = logindata

        axios.post(url, {

            email,
            password,

        }).then(res => {
            setLoginResult(res.data)
            console.log(loginResult)
            if (res.data.access_token) {
                loginState.logIn();
                localStorage.setItem("access_token", res.data.access_token)

                navigate('/dashboard')
            }



        })
    }
    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            navigate('/dashboard')

        }


    })
    if (localStorage.getItem('access_token')) {
        return (<></>)

    }

    return (

        <div className='container_login'>
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign In</h3>
                        <div className="d-flex justify-content-end social_icon">
                            <span><i className="fab fa-facebook-square"></i></span>
                            {/* <span><i className="fab fa-google-plus-square"></i></span>
                            <span><i className="fab fa-twitter-square"></i></span> */}
                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend align-self-center">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control" name='email' placeholder="username" required
                                    onChange={handleChange} />

                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" name='password' className="form-control" placeholder="password"
                                    onChange={handleChange} required />
                            </div>

                            <div className="form-group mt-2 mx-auto d-flex justify-content-center">
                                <input type="submit" value="Login" className="btn float-right login_btn" />
                            </div>
                            <div className="form-group mt-2 mx-auto d-flex justify-content-center">
                                {loginResult && <p className='text-warning'>{loginResult}</p>}
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">

                            Don't have an account?
                            <Link to="/signup">Sign Up</Link>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login