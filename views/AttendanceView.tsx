import React, { useState, useMemo } from 'react';
import AttendanceTable from '../components/AttendanceTable';
import { MOCK_ATTENDANCE_DATA, MOCK_COURSES, MOCK_STUDENT_DATA } from '../constants';
import type { AttendanceRecord, Course } from '../types';
import { Department, AttendanceStatus } from '../types';

const AttendanceView: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE_DATA);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');
  const [courseFilter, setCourseFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const handleStatusChange = (recordId: string, newStatus: AttendanceStatus) => {
    setAttendanceRecords(prevRecords =>
      prevRecords.map(record =>
        record.id === recordId ? { ...record, status: newStatus } : record
      )
    );
  };

  const coursesByDepartment = useMemo(() => {
    if (departmentFilter === 'All') return MOCK_COURSES;
    return MOCK_COURSES.filter(c => c.department === departmentFilter);
  }, [departmentFilter]);

  // Reset course filter if it's no longer valid for the selected department
  React.useEffect(() => {
    if (!coursesByDepartment.some(c => c.id === courseFilter)) {
        setCourseFilter('All');
    }
  }, [coursesByDepartment, courseFilter]);

  const displayData = useMemo(() => {
    const studentMap = new Map(MOCK_STUDENT_DATA.map(s => [s.id, s]));
    const courseMap = new Map(MOCK_COURSES.map(c => [c.id, c]));

    return attendanceRecords
      .map(record => {
        const student = studentMap.get(record.studentId);
        const course = courseMap.get(record.courseId);
        if (!student || !course) return null;
        return {
          ...record,
          studentName: student.name,
          courseName: course.name,
          department: course.department,
        };
      })
      .filter(record => {
        if (!record) return false;
        const matchesDate = record.date === selectedDate;
        const matchesDept = departmentFilter === 'All' || record.department === departmentFilter;
        const matchesCourse = courseFilter === 'All' || record.courseId === courseFilter;
        const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
        return matchesDate && matchesDept && matchesCourse && matchesStatus;
      });
  }, [attendanceRecords, selectedDate, departmentFilter, courseFilter, statusFilter]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Attendance Tracking</h1>
      <p className="text-slate-500">Monitor and manage student attendance records for daily classes.</p>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="date-filter" className="block text-sm font-medium text-slate-700 mb-1">Date</label>
            <input
              type="date"
              id="date-filter"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            />
          </div>
          <div>
            <label htmlFor="dept-filter" className="block text-sm font-medium text-slate-700 mb-1">Department</label>
            <select
                id="dept-filter"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
                <option value="All">All Departments</option>
                {Object.values(Department).map(dep => <option key={dep} value={dep}>{dep}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="course-filter" className="block text-sm font-medium text-slate-700 mb-1">Course</label>
            <select
                id="course-filter"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                disabled={departmentFilter !== 'All' && coursesByDepartment.length === 0}
            >
                <option value="All">All Courses</option>
                {coursesByDepartment.map(course => <option key={course.id} value={course.id}>{course.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
                <option value="All">All Statuses</option>
                {Object.values(AttendanceStatus).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
      
      <AttendanceTable
        records={displayData}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default AttendanceView;
