import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Education = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const [education, setEducation] = useState([]);

    const getEducationbyId = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/education/" + id

        axios.get(url
        ).then(data => {
            setEducation(data.data)
            console.log(education)
        })
    }

    const postEducationbyId = () => {
        let { title, organization, address, city, country, website, datefrom, dateto } = education
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/education/"

        axios.post(url, {
            title, organization, address, city, country, website, datefrom, dateto
        },
            {
                headers: {
                    "Authorization": `${localStorage.getItem("access_token")}`
                }
            }).then(data => {
                console.log(data)
                navigate('/dashboard/portfolio')
            }).catch(res => {
                console.log(res)
            })
    }
    const editEducationbyId = () => {

        let { title, organization, address, city, country, website, datefrom, dateto } = education
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/education"

        axios.put(url, {
            title, organization, address, city, country, website, id, datefrom, dateto
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
        if (id != 'create') {
            getEducationbyId();
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id)
        if (id) {
            if (id == 'create') {
                postEducationbyId();
                console.log("buttonsubmite")

            }
            else {
                editEducationbyId();
            }
        }
    }
    const handleChange = (e) => {
        setEducation({ ...education, [e.target.name]: e.target.value })
    }

    const checkDate = (e) => {
        console.log(e.target.value)
    }
    if (!education) {
        return (<>Loading...</>)
    }
    return (
        <div className='container'>
            <div class="form-group bg-light">
                <hr />
                <label ><h5>Education and Training</h5></label>
                <hr />

            </div>
            <form onSubmit={handleSubmit}>
                <div class="form-group">

                    <label>Title of qualification awarded</label>
                    <input type="text" class="form-control" placeholder="Title" name='title' onChange={handleChange} value={education.title} required />
                </div>
                <div class="form-group">

                    <label >Organisation providing education and training</label>
                    <input type="text" class="form-control" placeholder="Organization" name='organization' onChange={handleChange} value={education.organization} required />
                </div>
                <div class="form-group">

                    <label>Address</label>
                    <input type="text" class="form-control" placeholder="Address" name='address' onChange={handleChange} value={education.address} required />
                </div>
                <div class="form-group mt-2 ">

                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="City name" name='city' onChange={handleChange} value={education.city} required />
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Country" name='country' onChange={handleChange} value={education.country} required />
                        </div>
                    </div>

                </div>
                <div class="form-group">

                    <label>Website</label>
                    <input type="text" class="form-control" placeholder="Website" name='website' onChange={handleChange} value={education.website} required />
                </div>
                <div class="row mt-2 ">
                    <div className='col'>
                        <label>From:</label><input type="date" class="form-control" name='datefrom' onChange={handleChange} value={education.datefrom} required />
                    </div>
                    <div className='col'>
                        <label>To:</label><input type="date" class="form-control" id="date" name='dateto' onChange={handleChange} value={education.dateto} required />
                    </div>


                </div>
                <div><button className='mt-3 btn btn-primary' type='submit' >Submit</button></div>

            </form>
        </div>
    )
}

export default Education