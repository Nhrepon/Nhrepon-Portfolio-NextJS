import { useState } from "react";

const TextEditor = ({onChange}) => {
    const [content, setContent] = useState('');
    const onChangeHandler = (e) => {
        const value = e.target.value;
        setContent(value);
        onChange(value);
    }
    return (
        <textarea 
            className="w-full h-96 border border-gray-300 rounded p-2" 
            rows={10} 
            cols={50} 
            onChange={onChangeHandler} 
            value={content}
        />
    )
}

export default TextEditor;
