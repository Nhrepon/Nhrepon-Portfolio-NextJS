import React from 'react';
import QuestionModel from "@/models/neuron/Question-Model";
import QuestionMetaModel from "@/models/neuron/Question-Meta-Model";

const AddNewQuestion = () => {

    const question = async ()=>{
        await QuestionModel.find();
        await QuestionMetaModel.find();
    }
    question();
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
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label>Exam:</label>
                        <select className=" border-gray-300 p-2 rounded shadow-lg">
                            <option>Select Exam</option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label>Year:</label>
                        <select className=" border-gray-300 p-2 rounded shadow-lg">
                            <option>Select Year</option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label>Subjects:</label>
                        <select className=" border-gray-300 p-2 rounded shadow-lg">
                            <option>Select Subject</option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label>Topics:</label>
                        <select className=" border-gray-300 p-2 rounded shadow-lg">
                            <option>Select Topic</option>
                            <option>1</option>
                            <option>2</option>
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