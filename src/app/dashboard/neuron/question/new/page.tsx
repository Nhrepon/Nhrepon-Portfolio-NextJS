import React from 'react';
import AddNewQuestion from "@/components/neuron/AddNewQuestion";

const Page = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="h-16 flex flex-col gap-4 justify-center">
                <h2>Add New Question</h2>
            </div>
            <hr/>
            <div className="flex flex-col flex-1 overflow-y-scroll">
            <AddNewQuestion/>
            </div>

        </div>
    );
};

export default Page;