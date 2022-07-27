import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ContactDash = () => {
    const [contact, setContact] = useState()

    const [del, setDel] = useState(false)
    const getUser = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/api/contact"
        axios.get(url, {
            headers: {
                "Authorization": `${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            console.log(data)
            setContact(data.data)
            setDel(false)
        })



    }


    useEffect(() => {
        getUser()
    }, [])
    useEffect(() => {
        getUser()
    }, [del])


    const handleDelte = (e) => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/api/contact"
        let id = e.target.name
        axios.delete(url + '/' + id, {
            headers: {
                "Authorization": `${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            setDel(true)

        })
    }

    if (!contact) {
        return (<>Loading...</>)
    }
    return (


        <main>



            <h2>Messages</h2>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone No.</th>
                            <th scope="col">Message</th>


                        </tr>
                    </thead>
                    <tbody>


                        {contact.map(el => {
                            return <>
                                <tr >
                                    <td>{el.name}</td>
                                    <td>{el.email}</td>
                                    <td>{el.phone_no}</td>
                                    <td>{el.message}</td>
                                    <td><input type='button' value="Delete" name={el._id} onClick={handleDelte} /></td>
                                </tr>
                            </>
                        })}








                    </tbody>
                </table>


            </div>

        </main>
    )
}

export default ContactDash