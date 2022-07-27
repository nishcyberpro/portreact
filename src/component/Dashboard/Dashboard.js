import React, { useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import Blogdash from './Blogdash'
import CreateProtfolio from './CreateProtfolio'
import Navigation from './Navigation'
import ProtfolionDash from './ProtfolioComp/ProtfolionDash'

const Dashboard = () => {
    let navigate = useNavigate();
    useEffect(() => {
        navigate('/dashboard/account')
    }, [])

    return (

        <>
            <div className="container-fluid">
                <div className="row">
                    <main className="col-md-3 ms-sm-auto col-lg-2 px-md-8">
                        <Navigation />

                    </main>
                    {/* <ProtfolionDash /> */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Outlet />
                    </main>

                </div>
            </div>

        </>
    )
}

export default Dashboard