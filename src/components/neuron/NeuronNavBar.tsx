import React from 'react';
import Link from "next/link";

const NeuronNavBar = () => {
    const neuronNavigationItems = [
        {title: "Home", link: "/" },
        {title: "Exam", link: "/exam" },
        {title: "Questions", link: "/questions" },
        {title: "About", link: "/about" },
        {title: "Contact", link: "/contact" },

    ]
    return (
        <div className="bg-purple-800 py-2">
            <nav className="flex justify-between items-center text-white gap-2 max-w-7xl mx-auto">
                <h2 className="text-3xl"><Link href="/">Neuron</Link></h2>
                <ul className="flex gap-4">
                    {neuronNavigationItems && neuronNavigationItems.map((item, i) => (<li key={i}><Link href={item.link}>{item.title}</Link></li>))}
                </ul>
            </nav>
        </div>
    );
};

export default NeuronNavBar;