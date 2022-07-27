import Quill from 'quill/core';
import Toolbar from 'quill/modules/toolbar';
import Snow from 'quill/themes/snow';
import editor from 'quill'

import htmlEditButton from "quill-html-edit-button";

Quill.register({
    'modules/toolbar': Toolbar,
    'themes/snow': Snow,
    "modules/htmlEditButton": htmlEditButton
})
const Quillexam = () => {

    const quill = new Quill(editor, {
        // ...
        modules: {
            // ...
            htmlEditButton: {}
        }
    });

}



export default Quillexam