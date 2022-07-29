import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ShowAbout from './ShowProtfolionComponent/ShowAbout'
import ShowEducation from './ShowProtfolionComponent/ShowEducation'
import ShowExperience from './ShowProtfolionComponent/ShowExperience'
import ShowProjects from './ShowProtfolionComponent/ShowProjects'
import ShowSkill from './ShowProtfolionComponent/ShowSkill'


const ProtfolionDash = () => {

    const [linkslug, setlinkslug] = useState();
    const [portData, setPortdata] = useState();
    const [available, setAvailable] = useState('')
    const [portlink, setportlink] = useState('');

    const checkSlug = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/get"
        axios.post(url, { linkslug },
            {
                headers: {
                    "Authorization": `${localStorage.getItem("access_token")}`
                }
            }
        )

            .then(res => {
                if (res.data) {
                    console.log(res.data)
                    setAvailable("")
                    setlinkslug(res.data.slug)
                    setportlink(res.data.slug)
                    //now need to get all the data of user and insert into slug table
                }
                else {
                    console.log("not available")
                    setAvailable("Not Available")
                    setportlink("")
                }
            })
    }
    useEffect(() => {
        checkSlug();
    }, [])

    const createLink = (e) => {
        e.preventDefault();
        checkSlug()

    }
    const handleChange = (e) => {
        setlinkslug(e.target.value)
        console.log(linkslug)

    }


    return (
        <>
            <form onSubmit={createLink}>
                <div className='d-flex flex-row'>

                    <div className='p-2'><button className='btn btn-outline-success'>Create Portfolio Link</button></div>
                    <div className='p-2 '><input type="text" placeholder='link-slug' value={linkslug} required onChange={handleChange}></input></div>
                    <div className='p-2 '>{available}</div>

                    <div className='p-2'> <Link to={`/portfolio/${portlink}`} >{process.env.REACT_APP_SERVER_DOMAIN}/portfolio/{portlink}</Link></div>


                </div>
            </form>

            <ShowAbout />
            <ShowEducation />
            <ShowExperience />
            <ShowProjects />
            <ShowSkill />

        </>
    )
}

export default ProtfolionDash