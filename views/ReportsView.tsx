import React, { useMemo } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { MOCK_STUDENT_DATA, MOCK_STAFF_DATA, MOCK_ATTENDANCE_DATA, MOCK_COURSES } from '../constants';
import { Department, Role, AttendanceStatus } from '../types';
import DashboardCard from '../components/DashboardCard';
import UsersIcon from '../components/icons/UsersIcon';
import BriefcaseIcon from '../components/icons/BriefcaseIcon';
import LibraryIcon from '../components/icons/LibraryIcon';
import ChartBarIcon from '../components/icons/ChartBarIcon';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ReportsView: React.FC = () => {

  const enrollmentByDept = useMemo(() => {
    const enrolledStudents = MOCK_STUDENT_DATA.filter(s => s.status === 'Enrolled');
    const data = Object.values(Department).map(dept => ({
      name: dept,
      students: enrolledStudents.filter(student =>
        student.courses.some(course => course.department === dept)
      ).length,
    }));
    return data.filter(d => d.students > 0);
  }, []);

  const staffByRole = useMemo(() => {
    const data = Object.values(Role).map(role => ({
      name: role,
      value: MOCK_STAFF_DATA.filter(staff => staff.role === role).length,
    }));
    return data.filter(d => d.value > 0);
  }, []);

  const studentByStatus = useMemo(() => {
    const statuses = ['Enrolled', 'Graduated', 'Withdrawn'];
    return statuses.map(status => ({
      name: status,
      count: MOCK_STUDENT_DATA.filter(s => s.status === status).length,
    }));
  }, []);
  
  const attendanceTrend = useMemo(() => {
    const attendanceByDate: { [key: string]: { present: number, total: number } } = {};
    MOCK_ATTENDANCE_DATA.forEach(record => {
      if (!attendanceByDate[record.date]) {
        attendanceByDate[record.date] = { present: 0, total: 0 };
      }
      attendanceByDate[record.date].total++;
      if (record.status === AttendanceStatus.PRESENT || record.status === AttendanceStatus.LATE) {
        attendanceByDate[record.date].present++;
      }
    });

    return Object.entries(attendanceByDate)
      .map(([date, data]) => ({
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        'Attendance Rate': Math.round((data.present / data.total) * 100),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, []);

  const totalEnrolled = MOCK_STUDENT_DATA.filter(s => s.status === 'Enrolled').length;
  const totalStaff = MOCK_STAFF_DATA.length;
  const staffStudentRatio = totalStaff > 0 ? `1:${(totalEnrolled / totalStaff).toFixed(1)}` : 'N/A';
  const overallAttendance = useMemo(() => {
      const present = MOCK_ATTENDANCE_DATA.filter(r => r.status === AttendanceStatus.PRESENT || r.status === AttendanceStatus.LATE).length;
      return MOCK_ATTENDANCE_DATA.length > 0 ? `${((present / MOCK_ATTENDANCE_DATA.length) * 100).toFixed(1)}%` : 'N/A';
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Reports & Analytics</h1>
      <p className="text-slate-500">An overview of school-wide data trends and key performance indicators.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Staff-Student Ratio" value={staffStudentRatio} icon={<UsersIcon />} />
        <DashboardCard title="Total Enrolled Students" value={totalEnrolled.toString()} icon={<UsersIcon />} />
        <DashboardCard title="Total Courses" value={MOCK_COURSES.length.toString()} icon={<LibraryIcon />} />
        <DashboardCard title="Overall Attendance" value={overallAttendance} icon={<ChartBarIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Enrollment by Department</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enrollmentByDept} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-20} textAnchor="end" height={50} interval={0} fontSize={12} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#3b82f6" name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Staff Distribution by Role</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={staffByRole} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {staffByRole.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">Attendance Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceTrend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" fontSize={12} />
                    <YAxis unit="%" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Attendance Rate" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Student Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentByStatus} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" name="Number of Students">
                    {studentByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index + 1 % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;