import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Articles from './Articles'
import LatestPost from './LatestPost'
import SideBar from './SideBar'
const PageContent = () => {
    let { id } = useParams();
    const [pageid, setPageId] = useState(id)
    const [content, setmyContent] = useState()
    const [loaded, setLoaded] = useState(false)

    const getPagesOfId = () => {

        let url = process.env.REACT_APP_SERVER_DOMAIN + "/getall/page"
        axios.get(url + '/' + id)
            .then(data => {
                console.log(data)
                setmyContent(data.data)
                //.log(data.data.title)
            })

    }
    console.log(id)

    useEffect(() => {
        getPagesOfId()
    }, [])

    useEffect(() => {
        getPagesOfId()
    }, [id])


    if (!content) {
        return <>Loading...</>
    }


    return (
        <main className='container'>
            {/* This is page to display single Pagespsot */}









            <article className="Pages-post">

                <div>
                    <hr />

                    <p><div dangerouslySetInnerHTML={{ __html: content.content }}
                    ></div>
                    </p>
                </div>


            </article>


            {/* <nav className="Pages-pagination" aria-label="Pagination">
                        <a className="btn btn-outline-primary rounded-pill" href="#">Older</a>
                        <a className="btn btn-outline-secondary rounded-pill disabled">Newer</a>
                    </nav> */}



        </main>
    )

}

export default PageContent