import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Popular = () => {
    const [pageno, setPageno] = useState(1)

    const [article, setArticle] = useState([])

    const getArticle = (() => {
        axios.get(process.env.REACT_APP_SERVER_DOMAIN + '/api/blog?pageno=' + pageno + "&popular=true")
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

    useEffect(() => {
        console.log("calling")
        if (pageno == -1) {
            setPageno(1)
        }
        getArticle();
    }, [pageno])

    return (



        <div className="col-md-8">

            {article.map(el => {
                return (
                    <article className="blog-post" key={el._id}>
                        <Link to={'/blog/' + el.slug} >
                            <h5 className="blog-post-title mb-1">{el.title}</h5>
                            <hr />
                            {/* <p className="blog-post-meta">{el.published_date.slice(0, 10)}<a href="#">   Chris</a></p> */}
                        </Link>

                    </article>
                )
            })}








        </div >

    )
}

export default Popular