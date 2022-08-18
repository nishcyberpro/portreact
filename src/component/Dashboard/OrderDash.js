import axios from 'axios'
import React, { useEffect, useState } from 'react'

const OrderDash = () => {
    const [order, setOrder] = useState()

    const [del, setDel] = useState(false)
    const getUser = () => {
        let orderid = 2145258;
        let url = "https://portal.nepalcanmove.com/api/v1/order?id=" + orderid;
        axios.get(url, {
            headers: {
                "Authorization": 'Token e1e36b36f4888741cf0afb1deb4d0c76644437fc'
            }
        }).then((data) => {
            console.log(data.data)

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


                        {/* {order.map(el => {
                            return <>
                                <tr >
                                    <td>{el.name}</td>
                                    <td>{el.email}</td>
                                    <td>{el.phone_no}</td>
                                    <td>{el.message}</td>
                                    <td><input type='button' value="Delete" name={el._id} onClick={handleDelte} /></td>
                                </tr>
                            </>
                        })} */}








                    </tbody>
                </table>


            </div>

        </main>
    )
}

export default OrderDash