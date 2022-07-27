import React from 'react'
import LatestPost from './LatestPost'
const SideBar = () => {
    return (
        <div className="col-md-4">

            <div className="position-sticky mysticky">
                <div className="p-4 mb-3 bg-light rounded">
                    <h4 className="fst-italic">About</h4>
                    <p className="mb-0">Customize this section to tell your visitors a little bit about your publication, writers,
                        content, or something else entirely. Totally up to you.</p>
                    <a href="#" className="stretched-link">Continue reading</a>

                </div>

                <div className="p-4">
                    <h4 className="fst-italic">Archives</h4>
                    <ol className="list-unstyled mb-0">

                    </ol>
                </div>

                <div className="p-4">
                    <h4 className="fst-italic">Elsewhere</h4>
                    <ol className="list-unstyled">

                    </ol>
                </div>
            </div>
        </div>
    )
}

export default SideBar