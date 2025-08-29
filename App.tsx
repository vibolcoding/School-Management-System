import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import StaffManagementView from './views/StaffManagementView';
import StudentManagementView from './views/StudentManagementView';
import CourseManagementView from './views/CourseManagementView';
import ELibraryView from './views/ELibraryView';
import AttendanceView from './views/AttendanceView';
import ReportsView from './views/ReportsView';
import PlaceholderView from './views/PlaceholderView';
import type { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'Dashboard':
        return <DashboardView />;
      case 'Staff':
        return <StaffManagementView />;
      case 'Students':
        return <StudentManagementView />;
      case 'Courses':
        return <CourseManagementView />;
      case 'E-Library':
        return <ELibraryView />;
      case 'Attendance':
        return <AttendanceView />;
      case 'Reports':
        return <ReportsView />;
      case 'Settings':
        return <PlaceholderView title="System Settings" />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-4 md:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;