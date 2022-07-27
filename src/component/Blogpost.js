import React from 'react'
import FeaturedBlog from './FeaturedBlog'
import Featuredtwo from './Featuredtwo'
import LatestPost from './LatestPost'
import SideBar from './SideBar'

const Blogpost = () => {
    return (

        <main className='container'>
            {/* Featured Blogpost */}
            <FeaturedBlog />
            {/* end of featured one */}
            {/* Two featured ones */}
            <div className="row g-5">
                <LatestPost />
                <SideBar />
            </div>

        </main>
    )
}

export default Blogpost