'use client'

import React from 'react';
import AdministratorDashboard from '@/views/AdministratorDashboard';
import HRDashboard from '@/views/HRDashboard';
import FacultyDashboard from '@/views/FacultyDashboard';
import StudentDashboard from '@/views/StudentDashboard';
import PlaceholderView from '@/views/PlaceholderView';
import { useUser } from '@/context/UserContext';
import { Role } from '@/lib/types';

export default function DashboardPage() {
  const { currentUserRole } = useUser();

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

  return renderDashboard();
}
