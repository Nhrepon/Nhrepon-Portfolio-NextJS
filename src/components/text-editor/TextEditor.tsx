import { useState, useEffect } from "react";

export interface TextEditorProps {
    onChange: (value: string) => void;
    value: string;
}

const TextEditor = ({onChange, value}: TextEditorProps) => {
    const [content, setContent] = useState(value);

    // Update content when value prop changes
    useEffect(() => {
        setContent(value);
    }, [value]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setContent(newValue);
        onChange(newValue);
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
