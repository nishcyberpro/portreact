import axios from 'axios'
import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import SideBar from './SideBar'


const Pages = () => {
    const [pagedata, setPages] = useState();

    let { id } = useParams();


    const getPages = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + '/api/pages'
        axios.get(url)
            .then(res => {
                console.log(res.data)
                setPages(res.data)
            })


    }

    console.log(id)
    return (
        <main className='container'>
            {/* This is page to display single blogpsot */}
            <Outlet />

        </main>
    )
}

export default Pages