"use client";
import React from 'react';
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


const SideNav = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            sessionStorage.clear();
            localStorage.clear();
            const response = await axios.post('/api/users/logout');
            if (response.data.status !== "success") {
                toast.error("Logout failed");
            }
            router.push("/login");
            //router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
            router.push("/login");
        }
    };


    const navigation = [
        {name: 'Dashboard', href: '/dashboard', icon: "bi bi-house"},
        {name: 'Skills', href: '/dashboard/skills', icon: "bi bi-gear"},
        {name: 'Projects', href: '/dashboard/projects', icon: "bi bi-briefcase"},
        {name: 'Blog', href: '/dashboard/blog', icon: "bi bi-card-text"},
        {name: 'Categories', href: '/dashboard/category', icon: "bi bi-border-all"},
        {name: 'Tags', href: '/dashboard/tag', icon: "bi bi-tag"},
        {name: 'Media', href: '/dashboard/media', icon: "bi bi-image"},
        {name: 'Messages', href: '/dashboard/messages', icon: "bi bi-chat-dots"},
        {name: 'Profile', href: '/dashboard/profile', icon: "bi bi-person"},
        {name: 'Settings', href: '/dashboard/settings', icon: "bi bi-gear-fill"},
    ];


    return (
        <div className="flex flex-col h-full bg-green-700 text-white">
            <div className="flex items-center justify-center h-16 border-b">
                <Link href={'/'} className="text-xl text-semibold">NHRepon</Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                isActive
                                    ? 'bg-gray-200 font-bold text-gray-900 transition-all duration-200 ease-in-out'
                                    : 'text-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 ease-in-out'
                            }`}
                        >
                            <i className={`me-1 font-bold ${item.icon}`}/>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile and Logout */}
            <div className="p-4 border-t">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                        <div className="ml-3">
                            <p className="text-sm font-medium">NHRepon</p>
                            <p className="text-xs text-gray-300">Admin</p>
                        </div>
                    </div>
                    <button onClick={handleLogout}
                            className="flex items-center text-sm text-gray-200 hover:text-black hover:cursor-pointer">
                        <i className="bi bi-box-arrow-right me-1"></i>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideNav;