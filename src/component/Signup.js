import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Signup = () => {
    const loginState = useContext(AuthContext)

    const [signupdata, setsignupData] = useState({})
    const [errors, setErros] = useState();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setsignupData({ ...signupdata, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e) => {

        e.preventDefault();
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/api/user/signup"
        let { name, email, password } = signupdata
        axios.post(url, {
            name,
            email,
            password,

        }).then(res => {

            console.log(res.response)
            navigate('/dashboard')


        })
            .catch(res => {
                setErros(res.response.data.errors)
                console.log(res.response.data.errors);

            })
    }
    useState(() => {

    }, [])

    if (localStorage.getItem('access_token')) {
        navigate('/')

        return (<></>)


    }
    return (

        <div className='container_login'>
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign Up</h3>
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
                                <input type="text" className="form-control" name='name' placeholder="Name" required
                                    onChange={handleChange} />

                            </div>
                            <div className="input-group form-group mt-3">
                                <div className="input-group-prepend align-self-center">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control" name='email' placeholder="email" required
                                    onChange={handleChange} />

                            </div>
                            <div className="input-group form-group mt-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" name='password' className="form-control" placeholder="password"
                                    onChange={handleChange} required />
                            </div>

                            <div className="form-group mt-3 mx-auto d-flex justify-content-center">
                                <input type="submit" value="Signup" className="btn float-right login_btn" />
                            </div>
                            <div className="form-group mt-3 mx-auto d-flex justify-content-center">
                                {errors && <p>{errors.map(el => {
                                    return <p>{el.msg == 'Invalid value' && <p className='text-warning'>Min password length 8 </p>}
                                        {el.msg != 'Invalid value' && <p className='text-warning'>{el.msg} </p>}

                                    </p>
                                })}</p>}

                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center ">

                                    Already have an account?
                                    <Link to="/login">Login</Link>

                                </div>

                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signup