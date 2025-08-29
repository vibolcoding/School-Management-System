import React from 'react';
import type { ViewType } from '../types';
import HomeIcon from './icons/HomeIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import UsersIcon from './icons/UsersIcon';
import LibraryIcon from './icons/LibraryIcon';
import CalendarIcon from './icons/CalendarIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import CogIcon from './icons/CogIcon';
import BookOpenIcon from './icons/BookOpenIcon';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavLink: React.FC<{
  icon: React.ReactNode;
  label: ViewType;
  isActive: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}> = ({ icon, label, isActive, onClick, isCollapsed }) => (
  <li>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
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

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen }) => {
  const navItems: { label: ViewType; icon: React.ReactNode }[] = [
    { label: 'Dashboard', icon: <HomeIcon /> },
    { label: 'Staff', icon: <BriefcaseIcon /> },
    { label: 'Students', icon: <UsersIcon /> },
    { label: 'Courses', icon: <LibraryIcon /> },
    { label: 'E-Library', icon: <BookOpenIcon /> },
    { label: 'Attendance', icon: <CalendarIcon /> },
    { label: 'Reports', icon: <ChartBarIcon /> },
  ];

  const isCollapsed = !isOpen;

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
                isActive={currentView === item.label}
                onClick={() => {
                  setCurrentView(item.label);
                  if (window.innerWidth < 768) {
                    setIsOpen(false);
                  }
                }}
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>
        </nav>
        <div className="px-3 py-4 border-t border-blue-800">
           <ul>
             <NavLink
                icon={<CogIcon />}
                label="Settings"
                isActive={currentView === 'Settings'}
                onClick={() => {
                  setCurrentView('Settings');
                  if (window.innerWidth < 768) {
                    setIsOpen(false);
                  }
                }}
                isCollapsed={isCollapsed}
              />
           </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;