import React from 'react';

const NeuronQuestionCard = () => {
    const questionList = [
        {question:"This is the demo question. there is a question and questio ....", options:["one","two","three", "four"]},
        {question:"This is the demo question.", options:["one","two","three", "four"]},
        {question:"This is the demo question.", options:["one","two","three", "four"]},
        {question:"This is the demo question.", options:["one","two","three", "four"]},
        {question:"This is the demo question.", options:["one","two","three", "four"]},
        {question:"This is the demo question.", options:["one","two","three", "four"]},
        {question:"This is the demo question.", options:["one","two","three", "four"]},
        {question:"This is the demo question.", options:["one","two","three", "four"]},
        {question:"This is the demo question.", options:["one","two","three", "four"]},
        {question:"This is the demo question.", options:["one","two","three", "four"]},
    ]
    return (
        <div className="max-w-7xl mx-auto my-8">
            <div className="grid grid-cols-3 gap-2">
                {
                    questionList.map((item, index) => (
                        <div key={index} className="rounded shadow-lg p-2">
                            <h3 className="py-2 ">{item.question}</h3>
                            <div className="flex flex-col gap-2">
                                {
                                    item.options.map((option, index) => (
                                        <div key={index} className="flex gap-2"><input type="checkbox"/>{option}</div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default NeuronQuestionCard;