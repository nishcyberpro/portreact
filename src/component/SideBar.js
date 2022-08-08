import React from 'react'
import Popular from './Popular'
const SideBar = () => {


    return (
        <div className="col-md-4">

            <div className="position-sticky mysticky">
                <div className="p-4 mb-3 bg-light rounded">
                    <h4 className="fst-italic">Popular</h4>
                    <hr />
                    <Popular />

                </div>

                <div className="p-4">
                    <h4 className="fst-italic">Recent Comment</h4>
                    <ol className="list-unstyled mb-0">

                    </ol>
                </div>


            </div>
        </div>
    )
}

export default SideBar