import React, { useEffect, useState } from 'react'
import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');
import sanitizeHtml from 'sanitize-html';

import 'quill/dist/quill.snow.css'; // Add css for snow theme
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const WorkExperience = () => {
    const { id } = useParams();

    const { quill, quillRef } = useQuill();

    const [myContent, setmyContent] = useState("")
    const [experience, setExperience] = useState([])
    const navigate = useNavigate();
    const insertExp = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/experience"
        let { address, city, country, employer, title, website, datefrom, dateto } = experience
        let activities = sanitizeHtml(quill.root.innerHTML);

        axios.post(url, {
            address, city, country, employer, title, website, activities, datefrom, dateto
        }, {
            headers: {
                "Authorization": `${localStorage.getItem("access_token")}`
            }
        }).then(dat => {
            console.log(dat)
            console.log("inserted")
            navigate('/dashboard/portfolio')
        })
            .catch(err => {
                console.log(err)
            })
    }
    const editExp = () => {

        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/experience"

        let { address, city, country, employer, title, website, datefrom, dateto } = experience
        let activities = sanitizeHtml(quill.root.innerHTML);
        axios.put(url, {
            address, city, country, employer, title, website, activities, id, datefrom, dateto
        },
            {
                headers: {
                    "Authorization": `${localStorage.getItem("access_token")}`
                }
            }).then(data => {
                navigate('/dashboard/portfolio')
            })

    }
    const getExpOfId = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/experience"

        axios.get(url + '/' + id,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("access_token")}`
                }
            }).then(data => {
                setExperience(data.data)
                setmyContent(data.data.activities)
                console.log(experience)
            })
    }



    React.useEffect(() => {
        if (quill) {
            // Add custom handler for Image Upload
            quill.clipboard.dangerouslyPasteHTML(myContent);

        }
    }, [myContent]);
    const handleChange = (e) => {
        setExperience({ ...experience, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //   setmyContent(sanitizeHtml(quill.root.innerHTML));
        setmyContent(sanitizeHtml(quill.root.innerHTML));
        if (id) {
            if (id == 'create') {
                insertExp()

            }
            else {
                editExp()
            }
        }

    }
    useEffect(() => {
        if (id) {
            if (id != 'create') {
                getExpOfId();
            }

        }

    }, [])


    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div class="form-group bg-light">
                    <hr />
                    <label ><h5>Work experience
                    </h5></label>
                    <hr />

                </div>
                <div class="form-group">

                    <label>Occupation or position held
                    </label>
                    <input type="text" class="form-control" placeholder="Position " name="title" value={experience.title} onChange={handleChange} required />
                </div>
                <div class="form-group">

                    <label>Employer </label>
                    <input type="text" class="form-control" placeholder="Employer " name="employer" value={experience.employer} onChange={handleChange} required />
                </div>
                <div class="form-group">

                    <label>Address</label>
                    <input type="text" class="form-control" placeholder="Address" name="address" value={experience.address} onChange={handleChange} required />
                </div>
                <div class="form-group mt-2 ">

                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="City name" name="city" value={experience.city} onChange={handleChange} required />
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Country" name="country" onChange={handleChange} value={experience.country} required />
                        </div>
                    </div>

                </div>
                <div class="form-group">

                    <label >Website</label>
                    <input type="text" class="form-control" placeholder="city" name="website" onChange={handleChange} value={experience.website} required />
                </div>
                <div class="form-group">

                    <label className='mt-3'><h4>Main activities and responsibilities</h4></label>
                </div>
                <div className='mt-4 container row quillformat'>
                    <div ref={quillRef} className='quillformat' />
                </div>
                <div class="row mt-2 ">
                    <div className='col'>
                        <label>From:</label><input type="date" class="form-control" name='datefrom' onChange={handleChange} value={experience.datefrom} required />
                    </div>
                    <div className='col'>
                        <label>To:</label><input type="date" class="form-control" id="date" name='dateto' onChange={handleChange} value={experience.dateto} required />
                    </div>


                </div>
                <button type="submit" className=' btn btn-primary mt-5'>Add Exprience</button>
            </form>
        </div>
    )
}

export default WorkExperience