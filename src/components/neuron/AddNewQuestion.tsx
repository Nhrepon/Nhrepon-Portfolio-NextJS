import React from 'react';

const AddNewQuestion = async () => {
    const neuronCategoryList:Array<any> = [
        {id:1,name:"Category 1"},
        {id:2,name:"Category 2"},
        {id:3,name:"Category 3"},
        {id:4,name:"Category 4"},
        {id:5,name:"Category 5"},
    ];
    const examList:Array<any> = [
        {id:1,name:"Exam 1"},
        {id:2,name:"Exam 2"},
        {id:3,name:"Exam 3"},
        {id:4,name:"Exam 4"},
        {id:5,name:"Exam 5"},
    ];
    const subjectList:Array<any> = [
        {id:1,name:"Subject 1"},
        {id:2,name:"Subject 2"},
        {id:3,name:"Subject 3"},
        {id:4,name:"Subject 4"},
        {id:5,name:"Subject 5"},
    ]
    const topicList:Array<any> = [
        {id:1,name:"Topic 1"},
        {id:2,name:"Topic 2"},
        {id:3,name:"Topic 3"},
        {id:4,name:"Topic 4"},
        {id:5,name:"Topic 5"},
    ];




    return (
        <div className="flex flex-col w-full max-w-[800px] mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-4 p-3 w-full md:w-1/2">
                    <div className="flex flex-col">
                        <label form="question">Question:</label>
                        <input name="question" id="question" type="text" placeholder="Question"
                               className="border border-gray-300 p-2 rounded shadow-lg"/>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label form="options">Options:</label>
                        <input name="option1" id="option1" type="text" placeholder="Options 1"
                               className="border border-gray-300 p-2 rounded shadow-lg"/>
                        <input name="option2" id="option2" type="text" placeholder="Options 2"
                               className="border border-gray-300 p-2 rounded shadow-lg"/>
                        <input name="option3" id="option3" type="text" placeholder="Options 3"
                               className="border border-gray-300 p-2 rounded shadow-lg"/>
                        <input name="option4" id="option4" type="text" placeholder="Options 4"
                               className="border border-gray-300 p-2 rounded shadow-lg"/>
                    </div>

                    <div className="flex flex-col">
                        <label form="answer">Answer:</label>
                        <select className=" border-gray-300 p-2 rounded shadow-lg">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label form="explanation">Explanation:</label>
                        <textarea name="explanation" id="explanation" placeholder="Explanation" rows={5}
                                  className="border border-gray-300 p-2 rounded shadow-lg"></textarea>
                    </div>


                </div>
                <div className="flex flex-col gap-4 p-3 w-full md:w-1/2">
                    <div className="flex flex-col">
                        <label>Categories:</label>
                        <select className=" border-gray-300 p-2 rounded shadow-lg">
                            <option>Select Category</option>
                            {
                                neuronCategoryList && neuronCategoryList.map((category, index) => {
                                    return (<option key={index} value={index}>{category.name}</option>)
                                })
                            }
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label>Exam:</label>
                        <select className=" border-gray-300 p-2 rounded shadow-lg">
                            <option>Select Exam</option>
                            {
                                examList && examList.map((exam, index) => {
                                    return (<option key={index} value={index}>{exam.name}</option>)
                                })
                            }
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label>Year:</label>
                        <select className=" border-gray-300 p-2 rounded shadow-lg">
                            <option>Select Year</option>
                            {Array.from({ length: new Date().getFullYear() - 1989 }, (_, i) =>
                                <option key={i} value={1990 + i}>{1990 + i}</option>
                            )}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label>Subjects:</label>
                        <select className=" border-gray-300 p-2 rounded shadow-lg">
                            <option>Select Subject</option>
                            {
                                subjectList && subjectList.map((subject, index) => {
                                    return (<option key={index} value={index}>{subject.name}</option>)
                                })
                            }
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label>Topics:</label>
                        <select className=" border-gray-300 p-2 rounded shadow-lg">
                            <option>Select Topic</option>
                            {
                                topicList && topicList.map((topic, index) => {
                                    return (<option key={index} value={index}>{topic.name}</option>)
                                })
                            }
                        </select>
                    </div>

                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <button
                    className="bg-green-700 hover:bg-green-800 shadow-ld rounded cursor-pointer w-fit text-white py-2 px-6 my-3">Save
                </button>
            </div>
        </div>
    );
};

export default AddNewQuestion;