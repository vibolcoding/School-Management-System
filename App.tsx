
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AdministratorDashboard from './views/AdministratorDashboard';
import HRDashboard from './views/HRDashboard';
import FacultyDashboard from './views/FacultyDashboard';
import StudentDashboard from './views/StudentDashboard';
import StaffManagementView from './views/StaffManagementView';
import StudentManagementView from './views/StudentManagementView';
import CourseManagementView from './views/CourseManagementView';
import ELibraryView from './views/ELibraryView';
import AttendanceView from './views/AttendanceView';
import LeaveManagementView from './views/LeaveManagementView';
import ReportsView from './views/ReportsView';
import ScanView from './views/ScanView';
import PlaceholderView from './views/PlaceholderView';
import AssignmentsView from './views/AssignmentsView';
import CourseAnalyticsView from './views/CourseAnalyticsView';
import StudentPerformanceView from './views/StudentPerformanceView';
import type { ViewType } from './types';
import { Role } from './types';
import { ROLE_NAV_ITEMS } from './constants';
import { UserContext } from './context/UserContext';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState<Role>(Role.ADMINISTRATOR);

  useEffect(() => {
    const allowedViews = ROLE_NAV_ITEMS[currentUserRole];
    // If the current view is not allowed for the new role, switch to dashboard.
    // 'Settings' is always allowed and handled separately in the sidebar.
    if (currentView !== 'Settings' && !allowedViews.includes(currentView)) {
      setCurrentView('Dashboard');
    }
  }, [currentUserRole, currentView]);


  const renderDashboard = () => {
    switch (currentUserRole) {
      case Role.ADMINISTRATOR:
        return <AdministratorDashboard />;
      case Role.HR:
        return <HRDashboard />;
      case Role.FACULTY:
        return <FacultyDashboard />;
      case Role.STUDENT:
        return <StudentDashboard />;
      default:
        return <PlaceholderView title="Dashboard Not Available" />;
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'Dashboard':
        return renderDashboard();
      case 'Staff':
        return <StaffManagementView />;
      case 'Students':
        return <StudentManagementView />;
      case 'Courses':
        return <CourseManagementView />;
      case 'Assignments':
        return <AssignmentsView />;
      case 'Course Analytics':
        return <CourseAnalyticsView />;
      case 'Student Performance':
        return <StudentPerformanceView />;
      case 'E-Library':
        return <ELibraryView />;
      case 'Attendance':
        return <AttendanceView />;
      case 'Leave':
        return <LeaveManagementView />;
      case 'Reports':
        return <ReportsView />;
      case 'Scan QR':
        return <ScanView />;
      case 'Settings':
        return <PlaceholderView title="System Settings" />;
      default:
        return renderDashboard();
    }
  };

  return (
    // FIX: Pass both `currentUserRole` and `setCurrentUserRole` to the context provider.
    <UserContext.Provider value={{ currentUserRole, setCurrentUserRole }}>
      <div className="flex h-screen bg-slate-100">
        <Sidebar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
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
            {renderView()}
          </main>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default App;