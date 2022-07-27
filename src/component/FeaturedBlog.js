import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'




const FeaturedBlog = () => {

    const [article, setArticle] = useState()
    const getArticle = (() => {
        axios.get(process.env.REACT_APP_SERVER_DOMAIN + '/api/blog/featured')
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

    if (article) {
        return (
            <div>
                <div className="p-4 p-md-5 mb-4 text-white rounded " style={{

                    "background-image": `url(${article[0].images[0]})
                    `, "background-size": "cover"

                }}>
                    <div className="col-md-6 px-0">
                        <h1 className="display-4 fst-italic">{article[0].title}</h1>
                        <p className="lead my-3"> <div dangerouslySetInnerHTML={{ __html: article[0].content.slice(0, 200) }} /></p>
                        <p className="lead mb-0"><Link className="text-white fw-bold" to={'/blog/' + article[0].slug} >Continue reading...</Link></p>
                    </div>


                </div>
                <div className="row mb-2">
                    <div className="col-md-6">
                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-primary"></strong>
                                <h3 className="mb-0">{article[1].title}</h3>
                                <div className="mb-1 text-muted">{article[1].published_date.slice(0, 10)}</div>
                                <p className="card-text mb-auto"><div dangerouslySetInnerHTML={{ __html: article[1].content.slice(0, 100) }} /></p>
                                <Link className="stretched-link" to={'/blog/' + article[1].slug} >Continue reading...</Link>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img className="bd-placeholder-img" width="200" height="250"
                                    src={article[1].images[0]} />
                                <title>Placeholder</title>



                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-primary"></strong>
                                <h3 className="mb-0">{article[2].title}</h3>
                                <div className="mb-1 text-muted">{article[1].published_date.slice(0, 10)}</div>
                                <p className="card-text mb-auto"><div dangerouslySetInnerHTML={{ __html: article[2].content.slice(0, 100) }} /></p>
                                <Link className="stretched-link" to={'/blog/' + article[2].slug} >Continue reading...</Link>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img className="bd-placeholder-img" width="200" height="250"
                                    src={article[2].images[0]} />
                                <title>Placeholder</title>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FeaturedBlog