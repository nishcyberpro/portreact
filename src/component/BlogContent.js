import axios from 'axios'
import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Articles from './Articles'
import LatestPost from './LatestPost'
import SideBar from './SideBar'
const BlogContent = () => {
    console.log()
    let { id } = useParams();
    const [content, setmyContent] = useState()

    const getBlogOfId = () => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/getall/blog"
        axios.get(url + '/' + id)
            .then(data => {
                console.log(data)
                setmyContent(data.data)

                //.log(data.data.title)
            })

    }
    console.log(id)

    useState(() => {
        getBlogOfId()
    }, [])

    if (!content) {
        return <>Loading...</>
    }
    if (content) {

        return (
            <main className='container'>
                {/* This is page to display single blogpsot */}

                <div class="row g-5">

                    <div className="col-md-8">





                        <article className="blog-post">

                            <div>
                                <h2 className="blog-post-title mb-1">{content.title}</h2>
                                <p className="blog-post-meta">{content.published_date.slice(0, 10)}</p>


                                <p><div dangerouslySetInnerHTML={{ __html: content.content }}
                                ></div>
                                </p>
                            </div>


                        </article>


                        {/* <nav className="blog-pagination" aria-label="Pagination">
                        <a className="btn btn-outline-primary rounded-pill" href="#">Older</a>
                        <a className="btn btn-outline-secondary rounded-pill disabled">Newer</a>
                    </nav> */}

                    </div>

                    <SideBar />
                </div>

            </main>
        )
    }
}

export default BlogContent