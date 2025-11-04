import React from 'react';
import NeuronNavBar from "@/components/neuron/NeuronNavBar";
import NeuronFooter from "@/components/neuron/NeuronFooter";

export default function NeuronLayout({children}:{children:React.ReactNode}) {
    return (
        <div className="flex flex-col h-screen">
            <NeuronNavBar/>
            <div className="flex-1">
                <div className="min-h-[80vh] mx-auto">
                    {children}
                </div>
                <NeuronFooter/>
            </div>
        </div>
    );
};
