import React from 'react';

const NeuronPage = () => {
    return (
        <div className="flex flex-col h-dvh">
            <div className="flex flex-col justify-center h-16">
                <h1>Neuron Dashboard</h1>
            </div>
            <hr/>
            <div className="flex-1 overflow-y-scroll">
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