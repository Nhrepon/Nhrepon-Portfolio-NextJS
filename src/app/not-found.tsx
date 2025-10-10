import React from 'react';
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
    return (
        <div>
            <Navbar/>
            <div className="flex flex-col gap-3 justify-center items-center h-[80vh] max-w-7xl mx-auto">
                <h2 className="text-9xl font-bold">404</h2>
                <h3 className="text-7xl">Not Found</h3>
                <p>Could not find requested resource</p>
                <Link className="text-2xl text-green-800 p-4" href="/">Return Home <i className="bi bi-house-door"></i></Link>
            </div>
            <Footer/>
        </div>
    );
};

export default NotFound;