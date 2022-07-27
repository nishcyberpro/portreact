import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const LatestPost = () => {
    const [article, setArticle] = useState([])

    const getArticle = (() => {
        axios.get(process.env.REACT_APP_SERVER_DOMAIN + '/api/blog')
            .then(res => {
                console.log(res.data);
                setArticle(res.data)
            })
            .catch(res => {
                console.log(res)
            })


    })


    useEffect(() => {
        getArticle();
    }, [])
    return (



        <div className="col-md-8">
            <h3 className="pb-4 mb-4 fst-italic border-bottom">
                Latest posts
            </h3>
            {article.map(el => {
                return (
                    <article className="blog-post" key={el._id}>

                        <h2 className="blog-post-title mb-1">{el.title}</h2>
                        {/* <p className="blog-post-meta">{el.published_date.slice(0, 10)}<a href="#">   Chris</a></p> */}
                        <div dangerouslySetInnerHTML={{ __html: el.content.slice(0, 200) }}
                        ></div>
                        <p><Link to={'/blog/' + el.slug} >Read More</Link></p>
                    </article>)
            })}






            <nav className="blog-pagination" aria-label="Pagination">
                <a className="btn btn-outline-primary rounded-pill" href="#">Older</a>
                <a className="btn btn-outline-secondary rounded-pill disabled">Newer</a>
            </nav>

        </div >

    )
}

export default LatestPost