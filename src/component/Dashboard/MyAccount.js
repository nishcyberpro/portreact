import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MyAccount = () => {
    const [user, setUser] = useState()


    const getUser = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/api/user/data"
        axios.post(url, {

        }, {
            headers: {
                "Authorization": `${localStorage.getItem("access_token")}`
            }
        }).then((data) => {
            console.log(data)
            setUser(data.data)
        })



    }


    useEffect(() => {
        getUser()
    }, [])

    if (!user) {
        return (<>Loading...</>)
    }
    return (


        <main>



            <h2>My Account</h2>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>


                        </tr>
                    </thead>
                    <tbody>
                        <tr >


                            <td>{user.name}</td>
                            <td>{user.email}</td>



                        </tr>



                    </tbody>
                </table>


            </div>

        </main>
    )
}

export default MyAccount