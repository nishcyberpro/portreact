import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
const Skills = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const [skills, setskills] = useState([]);

    const getskillsbyId = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/skills/" + id

        axios.get(url
        ).then(data => {
            setskills(data.data)
            console.log(skills)
        })
    }

    const postskillsbyId = () => {
        let { title, description } = skills
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/skills/"

        axios.post(url, {
            title, description
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
    const editskillsbyId = () => {

        let { title, description } = skills

        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/skills"

        axios.put(url, {
            title, description, id
        },
            {
                headers: {
                    "Authorization": `${localStorage.getItem("access_token")}`
                }
            }).then(data => {
                console.log(data)
                navigate('/dashboard/portfolio')

            })
    }
    useEffect(() => {
        if (id != 'create') {
            getskillsbyId();
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id)
        if (id) {
            if (id == 'create') {
                postskillsbyId();
                console.log("buttonsubmite")

            }
            else {
                editskillsbyId();
            }
        }
    }
    const handleChange = (e) => {
        setskills({ ...skills, [e.target.name]: e.target.value })
    }


    if (!skills) {
        return (<>Loading...</>)
    }




    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div class="form-group bg-light">
                    <hr />
                    <label ><h5>Skills</h5></label>
                    <hr />

                </div>
                <div class="form-group">

                    <label for="educationTitle">Skill Title</label>
                    <input type="text" class="form-control" placeholder="Title" name='title' onChange={handleChange} value={skills.title} required />
                </div>
                <div class="form-group">

                    <label >Skill Description</label>
                    <input type="text" class="form-control" placeholder="Description" name='description' onChange={handleChange} value={skills.description} required />
                </div>
                <div><button className='mt-3 btn btn-primary' type='submit' >Submit</button></div>
            </form>
        </div>
    )
}

export default Skills