import React from "react";
import SideNav from "@/components/dashboard/sideNav";
export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-100 overflow-hidden max-w-[1920px] mx-auto">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 shadow-lg">
                <SideNav/>
            </div>

            {/* Main Content */}
            <div className="pl-64">
                <div className="px-3">
                    {children}
                </div>
            </div>
        </div>
    );
}


