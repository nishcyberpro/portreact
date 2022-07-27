import axios from 'axios'
import React, { useState } from 'react'
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import ContactSubmit from './ContactSubmit';

const ContactUs = () => {
    const navigate = useNavigate();

    const [contactUs, setContactUs] = useState({
        message: ""
    }
    )

    const handleChange = (e) => {

        setContactUs({ ...contactUs, [e.target.name]: e.target.value })

    }

    const handleSubmit = (e) => {

        e.preventDefault();
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/api/contact"
        let { name, email, phone_no, message } = contactUs
        axios.post(url, {
            name,
            email,
            phone_no,
            message,

        }).then(res => {
            console.log(res)
            navigate('/submitted');


        })
    }

    return (

        <div class="container">

            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6 pb-5 ">



                    <form onSubmit={handleSubmit}>
                        <div class="card border-primary rounded-0">
                            <div class="card-header p-0">
                                <div class="bg-info text-white text-center py-2">
                                    <h3><i class="fa fa-envelope"></i> Contact Us</h3>

                                </div>
                            </div>
                            <div class="card-body p-3">

                                <div class="form-group">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fa fa-user text-info"></i></div>
                                        </div>
                                        <input type="text" class="form-control" id="nombre" name="name" placeholder="Name" required
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fa fa-envelope text-info"></i></div>
                                        </div>
                                        <input type="email" class="form-control" id="nombre" name="email" placeholder="email" required
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fa fa-phone text-info"></i></div>
                                        </div>
                                        <input type="number" class="form-control" id="nombre" name="phone_no" placeholder="Phone no" required
                                            onChange={handleChange} />


                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fa fa-comment text-info"></i></div>
                                        </div>
                                        <textarea class="form-control" placeholder="message" value={contactUs.message} required name="message"
                                            onChange={handleChange}></textarea>
                                    </div>
                                </div>

                                <div class="text-center">
                                    <input type="submit" value="Submit" class="btn btn-info btn-block rounded-0 py-2" />
                                </div>
                            </div>

                        </div>
                    </form>


                </div>
            </div>

        </div>
    )
}

export default ContactUs