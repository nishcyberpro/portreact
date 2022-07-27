import React, { useEffect, useState } from 'react'

import axios from 'axios'

const Articles = () => {



    return (
        <div className="col-md-8">





            <article className="blog-post">

                <h2 className="blog-post-title mb-1">title</h2>
                <p className="blog-post-meta">date<a href="#">   Chris</a></p>


                <p>content<a href="more">Read More</a></p>
            </article>


            <nav className="blog-pagination" aria-label="Pagination">
                <a className="btn btn-outline-primary rounded-pill" href="#">Older</a>
                <a className="btn btn-outline-secondary rounded-pill disabled">Newer</a>
            </nav>

        </div>
    )
}

export default Articles