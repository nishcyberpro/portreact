import fetch from 'isomorphic-unfetch';
import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import sanitizeHtml from 'sanitize-html';
import parse from 'html-react-parser';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export default () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState();
    let { id } = useParams();
    const insertPage = (title, content) => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/api/pages"
        axios.post(url, {
            title, content
        }, {
            headers: {
                "Authorization": `${localStorage.getItem("access_token")}`
            }
        }).then(res => {
            navigate('/dashboard/pages')
        })



    }
    const editPage = (title, content) => {
        let url = process.env.REACT_APP_SERVER_DOMAIN + "/api/pages"
        axios.put(url, {
            title, content, id
        }, {
            headers: {
                "Authorization": `${localStorage.getItem("access_token")}`
            }
        }).then(res => {
            navigate('/dashboard/pages')
        })



    }

    const getPageOfId = () => {

        let url = process.env.REACT_APP_SERVER_DOMAIN + "/api/pages"
        axios.get(url + '/' + id)
            .then(data => {
                console.log(data)
                setTitle(data.data.title)
                setmyContent(data.data.content)

                //.log(data.data.title)
            })

    }

    const { quill, quillRef } = useQuill();
    const [myContent, setmyContent] = useState();

    // Insert Image(selected by user) to quill
    const insertToEditor = (url) => {
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', url);
    };

    // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
    const saveToServer = async (file) => {
        const body = new FormData();
        body.append('photos', file);

        const res = await fetch('Your Image Server URL', { method: 'POST', body });
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
        //   setmyContent(sanitizeHtml(quill.root.innerHTML));
        let content = sanitizeHtml(quill.root.innerHTML, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
        });
        if (id) {
            if (id == 'create') {
                insertPage(title, content)

            }
            else {
                editPage(title, content)
            }
        }

    }


    const handleChange = (e) => {
        setTitle(e.target.value)



    }
    useEffect(() => {
        if (id) {
            if (id != 'create') {
                getPageOfId();
            }

        }

    }, [])


    React.useEffect(() => {

        if (quill) {
            // Add custom handler for Image Upload
            quill.clipboard.dangerouslyPasteHTML(myContent);
            quill.getModule('toolbar').addHandler('image', selectLocalImage);
        }
    }, [myContent]);

    return (
        <div className='container mt-4'>
            <form onSubmit={handleSubmit}>
                <div class="form-group">

                    <input type="text" class="form-control" name="title" onChange={handleChange} value={title} id="formGroupExampleInput" placeholder="Title" required />
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