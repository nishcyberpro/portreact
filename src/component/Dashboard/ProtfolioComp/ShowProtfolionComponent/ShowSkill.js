import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const ShowSkill = () => {

    const [Skill, setSkill] = useState([])
    const [del, setDel] = useState(false)

    const getSkill = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/skill"

        axios.get(url,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("access_token")}`
                }
            }).then(data => {
                setSkill(data.data)
                console.log(Skill)
            })
    }

    const handleDelete = (e) => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/portfolio/skills"
        let id = e.target.name
        axios.delete(url + '/' + id, {
            headers: {
                "Authorization": `${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            setDel(true)

        })
    }
    useEffect(() => {
        getSkill()
    }, [])
    useEffect(() => {
        getSkill()
    }, [del])
    return (
        <main >



            <h2>Skill</h2>
            <div><Link className='btn btn-outline-success' to="/dashboard/portfolio/skill/create">Add Skill</Link></div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Skill Title</th>
                            <th scope="col">Description</th>







                        </tr>
                    </thead>
                    <tbody>
                        {Skill.map(el => {
                            return <>
                                <tr >


                                    <td>{el.title}</td>
                                    <td>{el.description}</td>



                                    <td><Link className='btn btn-outline-success' to={`/dashboard/portfolio/skill/${el._id}`}>Edit</Link>  <button className='btn btn-outline-success' name={el._id} onClick={handleDelete}> Delete</button></td>



                                </tr>
                            </>

                        })}




                    </tbody>
                </table>


            </div>

        </main>
    )
}

export default ShowSkill
