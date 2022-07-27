import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const About = () => {



    const [about, setAbout] = useState("");
    const [newabout, setNewabout] = useState(false)
    const navigate = useNavigate();

    const getAbout = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/portfolio"

        axios.get(url,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("access_token")}`
                }
            }).then(data => {
                setAbout(data.data)
                if (data.data == "Not found") {
                    setNewabout(true)

                }
                else {
                    setNewabout(false)
                }
            })
            .catch(err => {

            })
    }
    const postAbout = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/portfolio"
        let { name, address, email, phone_no } = about

        axios.post(url, {
            name, address, email, phone_no
        },
            {
                headers: {
                    "Authorization": `${localStorage.getItem("access_token")}`
                }
            }).then(data => {
                navigate('/dashboard/portfolio')
            })
    }

    const updateAbout = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/portfolio"
        let { name, address, email, phone_no } = about

        axios.put(url, {
            name, address, email, phone_no
        },
            {
                headers: {
                    "Authorization": `${localStorage.getItem("access_token")}`
                }
            }).then(data => {
                navigate('/dashboard/portfolio')
            })
    }
    useEffect(() => {
        getAbout();

    }, [])


    const handleChange = (e) => {
        setAbout({ ...about, [e.target.name]: e.target.value })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newabout) {
            postAbout();
        }
        else {
            updateAbout();
        }


    }


    return (
        <form onSubmit={handleSubmit}>
            <div className='container'>
                <div class="form-group bg-light">
                    <hr />
                    <label for="exampleInputEmail1 bg-dark"><h5>About</h5></label>
                    <hr />

                </div>
                <div class="form-group">

                    <label for="educationTitle">Name</label>
                    <input type="text" class="form-control" placeholder="Name" name='name' value={about.name} onChange={handleChange} required />
                </div>
                <div class="form-group">

                    <label for="educationOrganization">Address</label>
                    <input type="text" class="form-control" placeholder="address" name='address' value={about.address} onChange={handleChange} required />
                </div>
                <div class="form-group">

                    <label >Email</label>
                    <input type="email" class="form-control" placeholder="email" name='email' value={about.email} onChange={handleChange} required />
                </div>
                <div class="form-group">

                    <label >Phone No.</label>
                    <input type="number" class="form-control" placeholder="phone no" name='phone_no' value={about.phone_no} onChange={handleChange} required />
                </div>

                <div><button className='mt-3 btn btn-primary' type='submit' >Submit</button></div>

            </div>
        </form>
    )
}

export default About