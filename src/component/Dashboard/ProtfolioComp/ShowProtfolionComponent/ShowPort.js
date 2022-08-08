import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';


const ShowPort = () => {
    let { id } = useParams();

    const [alldata, setAllData] = useState([]);
    const [about, setAbout] = useState([])
    const [education, setEducation] = useState([])
    const [experience, setExperience] = useState([])
    const [project, setProject] = useState([])
    const [skill, setSkill] = useState([])

    const printDocument = () => {
        // const input = document.getElementById('port');
        var printOutContent = document.getElementById('port').innerHTML;
        var originalContent = document.body.innerHTML;
        document.body.innerHTML = printOutContent;
        window.print();
        // document.body.innerHTML = originalContent;
        // const doc = new jsPDF();

        // //get table html
        // const pdfTable = document.getElementById('port');
        // //html to pdf format
        // var html = htmlToPdfmake(pdfTable.innerHTML);

        // const documentDefinition = { content: html };
        // pdfMake.vfs = pdfFonts.pdfMake.vfs;
        // pdfMake.createPdf(documentDefinition).open();

    }

    const getAll = () => {
        const u = process.env.REACT_APP_SERVER_DOMAIN
        console.log(u + "secrect")
        const url = process.env.REACT_APP_SERVER_DOMAIN + '/getall/portfolio/' + id
        axios.get(url)
            .then(res => {
                setAllData(res.data)
                setAbout(res.data.about)
                setEducation(res.data.education)
                setExperience(res.data.experience)
                setProject(res.data.project)
                setSkill(res.data.skill)
                console.log(alldata)
            })
            .catch(err => {
                console.log(err)
            })

    }

    useEffect(() => {
        getAll()
    }, [])
    if (!alldata) {
        return (<>Loading...</>)
    }
    return (
        <>
            <button class="btn btn-primary" onClick={printDocument}>Export To PDF</button>

            <div class="container" id='port'>

                {about.map(el => {
                    return (
                        <div>
                            <div class="row"><h3> {el.name}</h3></div>
                            <div class="row"><h4><i class="bi bi-geo-alt-fill"></i>Address: {el.address}</h4></div>
                            <div class="d-flex flex-row">
                                <div class=" p-2"><i class="bi bi-envelope-fill"></i> <strong>Email address:</strong> {el.email} </div>
                                <div class=" p-2"> <i class="bi bi-telephone-fill"></i> <strong>Phone number:</strong> {el.phone_no}</div>

                            </div>
                            {/* <div class="d-flex flex-row">
                                <div class="p-2">Date of birth: 09/30/1986  </div>
                                <div class="p-2">  Nationality: Nepalese </div>

                            </div> */}
                        </div>)
                })}

                {/* Experience */}
                <div name="experience">
                    <div class="d-flex flex-row mt-2">
                        <div class="col-md-2 "><h5 className='text-primary'>WORK EXPERIENCE</h5>
                        </div>
                        <div class="col-md-9">  <hr /></div>

                    </div>
                    {experience.map(el => {
                        return (
                            <>
                                <div class="d-flex flex-row ">
                                    <div class="col-md-2 "><p>{'[' + el.datefrom}-{el.dateto + ']'}</p>
                                    </div>
                                    <div class="col-md-10">  <h5 className='text-primary'>{el.title}</h5></div>

                                </div>

                                <div class="d-flex flex-row">
                                    <div class="col-md-2 ">
                                    </div>
                                    <div class="col-md-10"> <p><strong>Employer:</strong> {el.employer}</p></div>

                                </div>
                                <div class="d-flex flex-row">
                                    <div class="col-md-2 ">
                                    </div>
                                    <div class="col-md-10">  <p><strong>Address:</strong> {el.address}</p></div>

                                </div>
                                <div class="d-flex flex-row">
                                    <div class="col-md-2">
                                    </div>
                                    <div class="col-md-10">  <p><strong>City:</strong> {el.city}</p></div>

                                </div>
                                <div class="d-flex flex-row ">
                                    <div class="col-md-2 ">
                                    </div>
                                    <div class="col-md-10">  <p><strong>Country:</strong> {el.country}</p></div>

                                </div>
                                <div class="d-flex flex-row ">
                                    <div class="col-md-2 ">
                                    </div>
                                    <div class="col-md-10">  <h6>Main activities and responsibilities:
                                    </h6></div>

                                </div>
                                <div class="d-flex flex-row mt-2 ">
                                    <div class="col-md-2 ">
                                    </div>
                                    <div class="col-md-10">  <h6 className='text-primary'>Responsiblities</h6></div>

                                </div>
                                <div class="d-flex flex-row ">
                                    <div class="col-md-3 ">
                                    </div>
                                    <div class="col-md-9">
                                        <div className="content" dangerouslySetInnerHTML={{ __html: el.activities }} />
                                    </div>

                                </div>

                            </>
                        )
                    })}



                </div>

                {/* next one education */}

                {/* Education details  */}
                <div name="education">

                    <div class="d-flex flex-row mt-2">
                        <div class="col-md-2 "><h5 className='text-primary'>EDUCATION AND TRAINING</h5>
                        </div>
                        <div class="col-md-10">  <hr /></div>

                    </div>
                    {education.map(el => {
                        return (<>


                            <div class="d-flex flex-row ">
                                <div class="col-md-2 ">
                                    <p>{'[' + el.datefrom}-{el.dateto + ']'}</p>
                                </div>
                                <div class="col-md-10">  <h5 className='text-primary'> {el.title}</h5></div>

                            </div>

                            <div class="d-flex flex-row">
                                <div class="col-md-2 ">
                                </div>
                                <div class="col-md-10">  <h5>{el.organization}</h5></div>

                            </div>
                            <div class="d-flex flex-row">
                                <div class="col-md-2 ">
                                </div>
                                <div class="col-md-10">  <p><strong>Address:</strong> {el.address}</p></div>

                            </div>
                            <div class="d-flex flex-row">
                                <div class="col-md-2">
                                </div>
                                <div class="col-md-10">  <p><strong>City:</strong> {el.city}</p></div>
                            </div>
                            <div class="d-flex flex-row ">
                                <div class="col-md-2 ">
                                </div>
                                <div class="col-md-10">  <p><strong>Country:</strong> {el.country}</p></div>

                            </div>
                            <div class="d-flex flex-row ">
                                <div class="col-md-2 ">
                                </div>
                                <div class="col-md-10">  <p><strong>Website:</strong> {el.website}</p></div>

                            </div>



                        </>)
                    })}
                </div>


                {/* Projects Details */}
                <div name="project">
                    <div class="d-flex flex-row mt-2">
                        <div class="col-md-2 "><h5 className='text-primary'>PROJECTS</h5>
                        </div>
                        <div class="col-md-9">  <hr /></div>

                    </div>
                    {project.map(el => {
                        return (
                            <>


                                <div class="d-flex flex-row ">
                                    <div class="col-md-2 ">
                                    </div>
                                    <div class="col-md-10">  <h5 className='text-primary'>{el.title}</h5></div>

                                </div>

                                <div class="d-flex flex-row">
                                    <div class="col-md-2 ">
                                    </div>
                                    <div class="col-md-10">  <h6>{el.role}</h6></div>

                                </div>
                                <div class="d-flex flex-row">
                                    <div class="col-md-2 ">
                                    </div>
                                    <div class="col-md-10">  <p><strong>Address:</strong> {el.address}</p></div>

                                </div>
                                <div class="d-flex flex-row">
                                    <div class="col-md-2">
                                    </div>
                                    <div class="col-md-10">  <p><strong>City:</strong> {el.city}</p></div>
                                </div>
                                <div class="d-flex flex-row ">
                                    <div class="col-md-2 ">
                                    </div>
                                    <div class="col-md-10">  <p><strong>Country:</strong> {el.country}</p></div>

                                </div>
                                <div class="d-flex flex-row ">
                                    <div class="col-md-2 ">
                                    </div>
                                    <div class="col-md-10">  <p><strong>Website:</strong> {el.website}</p></div>

                                </div>
                            </>
                        )
                    })}


                </div>
                {/* Skills */}
                <div name="skills">
                    <div class="d-flex flex-row ">
                        <div class="col-md-2 "><h5 className='text-primary'>SKILLS</h5>
                        </div>
                        <div class="col-md-10">  <hr /></div>

                    </div>

                    {skill.map(el => {
                        return (<>
                            <div class="d-flex flex-row ">
                                <div class="col-md-2 ">
                                </div>
                                <div class="col-md-10">  <h5 className='text-primary'>{el.title}</h5></div>

                            </div>

                            <div class="d-flex flex-row ">
                                <div class="col-md-2 ">
                                </div>
                                <div class="col-md-10">  <h6>{el.description}</h6></div>

                            </div>

                        </>)
                    })}




                </div>
            </div>
            <div>

            </div>


        </>
    )
}

export default ShowPort