'use client';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css';

const QuillTextEditor = ({onInputChange}) => {
    const [value, setValue] = useState('');
      
    onInputChange(value);
    

    const modules = {
      toolbar: [
        [{ header: [] }, { font: [] }],
        //[{ size: [] }],
        [
          'bold', 
          'italic', 
          'underline', 
          'strike', 
          'blockquote',
        ],
          [
          { 'color': [] }, 
          { 'background': [] },
          { 'align': [] },
          { list: 'ordered' },
          { list: 'bullet' },
          { list: 'check' },
          { indent: '-1' },
          { indent: '+1' },
          { 'script': 'sub'},
          { 'script': 'super' },
          {'direction': 'rtl'},
          'link', 
          'image', 
          'video',
          
      ],
        ['clean'],
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    }
    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    const formats = [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'align',
      'color',
      'background',
      'list',
      'bullet',
      'indent',
      'direction',
      'script',
      'link',
      'image',
      'video',
    ]



  return <ReactQuill theme="snow" value={value} onChange={setValue} className='my-2' modules={modules} formats={formats}/>;
};

export default QuillTextEditor;