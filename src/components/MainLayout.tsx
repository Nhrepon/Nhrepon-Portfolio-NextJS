"use client";
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {usePathname} from "next/navigation";

const MainLayout = ({children}: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <>
            {!pathname.startsWith('/dashboard') && <Navbar/>}
            <main>{children}</main>
            {!pathname.startsWith('/dashboard') && <Footer/>}
        </>
    );
};

export default MainLayout;