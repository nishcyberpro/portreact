import fetch from 'isomorphic-unfetch';
import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import sanitizeHtml from 'sanitize-html';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Quill from 'quill/core';
import Toolbar from 'quill/modules/toolbar';
import Snow from 'quill/themes/snow';
import htmlEditButton from "quill-html-edit-button";


//remaining task is to upload featured image and multer


export default () => {

    const theme = 'snow';
    // const theme = 'bubble';

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
        ],
    };

    const placeholder = 'Compose an epic...';

    const formats = ['bold', 'italic', 'underline', 'strike'];

    const [files, setFiles] = useState([]);

    const { bid } = useParams();;
    const feturedState = 'checked'
    const navigate = useNavigate();

    const [title, setTitle] = useState();
    const [myContent, setmyContent] = useState('');
    const [id, setId] = useState();
    const [isFeatured, setisFeatured] = useState(false)



    function handleFileChange(e) {
        setFiles(e.target.files)
    }
    // to edit the page get data from id of the page

    const getBlogOfId = () => {

        let url = process.env.REACT_APP_SERVER_DOMAIN + "/api/blog"
        axios.get(url + '/' + bid)
            .then(data => {
                console.log(data)
                setTitle(data.data.title)
                setmyContent(data.data.content)
                setisFeatured(data.data.featured)

                //.log(data.data.title)
            })

    }
    const editBLog = (form_data) => {
        let featured = isFeatured
        form_data.append("featured", featured)
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/api/blog"
        axios.put(url + '/' + bid, form_data, {
            headers: {
                "Authorization": `${localStorage.getItem("access_token")}`
            }
        }).then(
            (res) => {
                navigate('/dashboard/blog')
            }
        )
    }
    useEffect(() => {
        if (bid) {
            if (bid != 'create') {
                getBlogOfId();
            }

        }

    }, [])


    const insertPage = (form_data) => {

        let featured = isFeatured
        form_data.append("featured", featured)
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/api/blog"
        axios.post(url,
            form_data
            , {
                headers: {
                    "Authorization": `${localStorage.getItem("access_token")}`
                }
            }).then(
                () => {
                    navigate('/dashboard/blog')
                }
            )
            .catch(err => {
                console.log(err)
            })
    }
    const { quill, quillRef } = useQuill();

    // Insert Image(selected by user) to quill
    const insertToEditor = (url) => {
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', url);
    };

    // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
    const saveToServer = async (file) => {
        const body = new FormData();
        body.append('photos', file);

        const res = await axios.post('http://localhost:8000/api/blog/images', body)
        insertToEditor(res.uploadedImageUrl);
    };

    // Open Dialog to select Image File
    const selectLocalImage = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            saveToServer(file);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (bid) {
            if (bid != 'create') {
                let form_data = new FormData();
                form_data.append("title", title)
                console.log(form_data)

                let content = sanitizeHtml(quill.root.innerHTML, {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
                });
                form_data.append("content", content)
                let new_arr = [...files];
                // [...files].forEach(el => {
                new_arr.forEach(el => {
                    form_data.append("photos", el)
                })
                editBLog(form_data)
                console.log(sanitizeHtml(quill.root.innerHTML))
            }
            else {
                let form_data = new FormData();
                form_data.append("title", title)
                console.log(form_data)

                let content = sanitizeHtml(quill.root.innerHTML, {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
                });
                form_data.append("content", content)
                let new_arr = [...files];
                // [...files].forEach(el => {
                new_arr.forEach(el => {
                    form_data.append("photos", el)
                })
                insertPage(form_data)
                console.log(sanitizeHtml(quill.root.innerHTML))
            }

        }
        else {
            let form_data = new FormData();
            form_data.append("title", title)

            let content = sanitizeHtml(quill.root.innerHTML);
            form_data.append("content", content)
            let new_arr = [...files];
            // [...files].forEach(el => {
            new_arr.forEach(el => {
                form_data.append("photos", el)
            })
            insertPage(form_data)
            console.log(sanitizeHtml(quill.root.innerHTML))
        }


    }


    const handleChange = (e) => {
        setTitle(e.target.value)
        console.log(e.target.value)

    }
    const handleCheck = (e) => {
        setisFeatured(e.target.checked)
        console.log(e.target.checked)
    }
    React.useEffect(() => {
        if (quill) {
            // Add custom handler for Image Upload
            quill.clipboard.dangerouslyPasteHTML(myContent);
            // quill.clipboard.data(myContent)
            quill.getModule('toolbar').addHandler('image', selectLocalImage);
        }
    }, [myContent]);

    const changeHtml = () => {
        quill = "this";
    }

    return (
        <div className='container mt-4'>

            <form onSubmit={handleSubmit}>
                <div class="form-group">

                    <input type="text" class="form-control" name="title" value={title} onChange={handleChange} id="formGroupExampleInput" placeholder="Title" required />

                </div>
                <div class="custom-file mt-2 row">
                    <div className='col-md-3'><h4>Featured Image</h4></div>
                    <div className='col-md-6'> <input type="file" class="custom-file-input" id="customFile" accept='image/*'
                        onChange={handleFileChange} /></div>

                    <div className='col-md-3'>
                        <input class="form-check-input" type="checkbox" checked={isFeatured} name='featured' id="flexCheckDefault" onChange={handleCheck} />
                        <label class="form-check-label" for="flexCheckDefault" className='featured' >
                            <h5>Featured Blog?</h5>
                        </label>
                    </div>

                </div>
                <div className='mt-3 ' style={{ width: 'auto', height: 300 }}>
                    <div className='rounded' ref={quillRef} />

                    <div><button className='mt-3 btn btn-primary' type='submit' >Submit post</button></div>
                    <div>
                    </div>
                </div>

            </form>

        </div>

    );
};