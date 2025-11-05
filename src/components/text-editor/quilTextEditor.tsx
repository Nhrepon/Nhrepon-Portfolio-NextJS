// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
//
// const QuilTextEditor = () => {
//     const [editorValue, setEditorValue] = useState('');
//
//     const handleChange = (value: any) => {
//         setEditorValue(value);
//     };
//
//     return (
//         <div>
//             <ReactQuill
//                 value={editorValue}
//                 onChange={handleChange}
//                 modules={{
//                     toolbar: [
//                         [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
//                         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//                         [{ 'align': [] }],
//                         ['bold', 'italic', 'underline'],
//                         ['link'],
//                         ['image'],
//                         [{ 'indent': '-1'}, { 'indent': '+1' }],
//                         [{ 'script': 'sub'}, { 'script': 'super' }],
//                         ['blockquote'],
//                         [{ 'direction': 'rtl' }],
//                         ['clean']
//                     ],
//                 }}
//             />
//         </div>
//     );
// };
//
// export default QuilTextEditor;