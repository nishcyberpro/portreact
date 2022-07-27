import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Projects = () => {

    let { id } = useParams();
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    const getProjectsbyId = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/projects/" + id

        axios.get(url
        ).then(data => {
            setProjects(data.data)
        })
    }

    const postProjectsbyId = () => {
        let { title, role, address, city, country, website } = projects
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/projects/"

        axios.post(url, {
            title, role, address, city, country, website
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
    const editProjectsbyId = () => {

        let { title, role, address, city, country, website } = projects

        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/projects"

        axios.put(url, {
            title, role, address, city, country, website, id
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
            getProjectsbyId();
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id)
        if (id) {
            if (id == 'create') {
                postProjectsbyId();
                console.log("buttonsubmite")

            }
            else {
                editProjectsbyId();
            }
        }
    }
    const handleChange = (e) => {
        setProjects({ ...projects, [e.target.name]: e.target.value })
    }


    if (!projects) {
        return (<>Loading...</>)
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div class="form-group bg-light">
                    <hr />
                    <label><h5>Projects</h5></label>
                    <hr />

                </div>
                <div class="form-group">

                    <label >Name of Project</label>
                    <input type="text" class="form-control" placeholder="Title" name='title' onChange={handleChange} value={projects.title} required />
                </div>
                <div class="form-group">

                    <label >Role</label>
                    <input type="text" class="form-control" placeholder="Role" name='role' onChange={handleChange} value={projects.role} required />
                </div>
                <div class="form-group">

                    <label>Address</label>
                    <input type="text" class="form-control" placeholder="Address" name='address' onChange={handleChange} value={projects.address} required />
                </div>
                <div class="form-group mt-2 ">

                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="City name" name='city' onChange={handleChange} value={projects.city} required />
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Country" name='country' onChange={handleChange} value={projects.country} required />
                        </div>
                    </div>

                </div>
                <div class="form-group">

                    <label for="address">Website</label>
                    <input type="text" class="form-control" placeholder="Website" name='website' onChange={handleChange} value={projects.website} required />
                </div>
                <div><button className='mt-3 btn btn-primary' type='submit' >Submit</button></div>
            </form>
        </div>

    )
}

export default Projects