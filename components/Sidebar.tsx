'use client';

import React, { useMemo } from 'react';
import type { ViewType } from '@/lib/types';
import { Role } from '@/lib/types';
import { ROLE_NAV_ITEMS } from '@/lib/constants';
import HomeIcon from './icons/HomeIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import UsersIcon from './icons/UsersIcon';
import LibraryIcon from './icons/LibraryIcon';
import CalendarIcon from './icons/CalendarIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import CogIcon from './icons/CogIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import PlaneIcon from './icons/PlaneIcon';
import QrcodeIcon from './icons/QrcodeIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import PresentationChartLineIcon from './icons/PresentationChartLineIcon';
import TrendingUpIcon from './icons/TrendingUpIcon';

// FIX: Update SidebarProps to accept view state and setters from App.tsx
interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentUserRole: Role;
}

// FIX: NavLink now determines its active state via a prop and uses a simple `<a>` tag with an onClick handler for navigation.
const NavLink: React.FC<{
  icon: React.ReactNode;
  label: ViewType;
  isCollapsed: boolean;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isCollapsed, isActive, onClick }) => {
    return (
        <li>
            <a
            href="#"
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
                isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-200 hover:bg-blue-800 hover:text-white'
            }`}
            >
            {icon}
            <span
                className={`ml-3 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 md:opacity-100' : ''}`}
            >
                {label}
            </span>
            </a>
        </li>
    );
};

const ALL_NAV_ITEMS: { label: ViewType; icon: React.ReactNode }[] = [
    { label: 'Dashboard', icon: <HomeIcon /> },
    { label: 'Staff', icon: <BriefcaseIcon /> },
    { label: 'Students', icon: <UsersIcon /> },
    { label: 'Courses', icon: <LibraryIcon /> },
    { label: 'Assignments', icon: <ClipboardListIcon /> },
    { label: 'Course Analytics', icon: <PresentationChartLineIcon /> },
    { label: 'Student Performance', icon: <TrendingUpIcon /> },
    { label: 'E-Library', icon: <BookOpenIcon /> },
    { label: 'Attendance', icon: <CalendarIcon /> },
    { label: 'Leave', icon: <PlaneIcon /> },
    { label: 'Scan QR', icon: <QrcodeIcon /> },
    { label: 'Reports', icon: <ChartBarIcon /> },
];

// FIX: Sidebar now receives `currentView` and `setCurrentView` and passes them down correctly.
const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen, currentUserRole }) => {

  const navItems = useMemo(() => {
    const allowedViews = ROLE_NAV_ITEMS[currentUserRole] || [];
    return ALL_NAV_ITEMS.filter(item => allowedViews.includes(item.label));
  }, [currentUserRole]);

  const isCollapsed = !isOpen;
  
  const handleLinkClick = (view: ViewType) => {
    setCurrentView(view);
    if (window.innerWidth < 768) {
        setIsOpen(false);
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`bg-blue-900 text-white flex flex-col transition-all duration-300 ease-in-out z-40 h-full ${
          isOpen ? 'w-64' : 'w-0 md:w-20'
        } overflow-hidden`}
      >
        <div className={`flex items-center p-4 border-b border-blue-800 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className={`flex items-center ${isCollapsed ? 'md:justify-center' : ''}`}>
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-5.22-8.242l10.44 4.99m-10.44-4.99l10.44 4.99M3 10.519l9-4.266 9 4.266" />
            </svg>
            <h1 className={`text-xl font-bold ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 md:opacity-100' : ''}`}>
              SMS Portal
            </h1>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4">
          <ul>
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                icon={item.icon}
                label={item.label}
                onClick={() => handleLinkClick(item.label)}
                isCollapsed={isCollapsed}
                isActive={currentView === item.label}
              />
            ))}
          </ul>
        </nav>
        <div className="px-3 py-4 border-t border-blue-800">
           <ul>
             <NavLink
                icon={<CogIcon />}
                label="Settings"
                onClick={() => handleLinkClick('Settings')}
                isCollapsed={isCollapsed}
                isActive={currentView === 'Settings'}
              />
           </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;