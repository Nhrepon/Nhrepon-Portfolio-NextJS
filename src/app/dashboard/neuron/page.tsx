import React from 'react';
import Link from "next/link";

const NeuronPage = () => {
    return (
        <div className="flex flex-col h-dvh">
            <div className="flex flex-col justify-center h-16">
                <h1>Neuron Dashboard</h1>
            </div>
            <hr/>
            <div className="flex-1 overflow-y-scroll">
                <Link className="bg-green-700" href="/dashboard/neuron/question/new">Add new question</Link>
                <div>
                    body
                </div>


            </div>
            <div className="flex flex-col h-16">
                <h2>Footer</h2>
            </div>
        </div>
    );
};

export default NeuronPage;