"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useUser } from '@/context/UserContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { currentUserRole, setCurrentUserRole } = useUser();

    return (
        <div className="flex h-screen bg-slate-100">
            <Sidebar 
                isOpen={isSidebarOpen}
                setIsOpen={setSidebarOpen}
                currentUserRole={currentUserRole}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                    currentUserRole={currentUserRole}
                    setCurrentUserRole={setCurrentUserRole}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
