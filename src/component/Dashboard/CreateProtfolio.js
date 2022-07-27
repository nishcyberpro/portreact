import React, { useState } from 'react'
import Education from './ProtfolioComp/Education'
import WorkExperience from './ProtfolioComp/WorkExperience'

const CreateProtfolio = () => {
    const [experience, setExperience] = useState();

    const addExperience = (e) => {
        e.preventDefault();


    }

    return (
        <div className='container'>
            <form>
                <WorkExperience />



            </form>
        </div>
    )
}

export default CreateProtfolio