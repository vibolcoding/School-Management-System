'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_COURSES, MOCK_STUDENT_DATA, MOCK_ATTENDANCE_DATA } from '@/lib/constants';
import { AttendanceStatus } from '@/lib/types';
import DashboardCard from '@/components/DashboardCard';
import UsersIcon from '@/components/icons/UsersIcon';
import ChartBarIcon from '@/components/icons/ChartBarIcon';

const FACULTY_ID = 'S001'; // Mock faculty user: Dr. Evelyn Reed

const CourseAnalyticsView: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const myCourses = useMemo(() => MOCK_COURSES.filter(c => c.teacherId === FACULTY_ID), []);
  
  useEffect(() => {
    if (!selectedCourseId && myCourses.length > 0) {
      setSelectedCourseId(myCourses[0].id);
    }
  }, [myCourses, selectedCourseId]);

  const selectedCourse = useMemo(() => {
    if (!selectedCourseId) return null;
    return myCourses.find(c => c.id === selectedCourseId) || null;
  }, [selectedCourseId, myCourses]);

  const courseData = useMemo(() => {
    if (!selectedCourse) return null;

    // 1. Enrolled students
    const enrolledStudents = MOCK_STUDENT_DATA.filter(student =>
      student.courses.some(course => course.id === selectedCourse.id)
    );

    // 2. Attendance records for this course
    const courseAttendanceRecords = MOCK_ATTENDANCE_DATA.filter(
      rec => rec.courseId === selectedCourse.id
    );

    // 3. Overall attendance rate
    const presentCount = courseAttendanceRecords.filter(
      r => r.status === AttendanceStatus.PRESENT || r.status === AttendanceStatus.LATE
    ).length;
    const overallAttendanceRate = courseAttendanceRecords.length > 0
      ? Math.round((presentCount / courseAttendanceRecords.length) * 100)
      : 100;

    // 4. Attendance trend
    const attendanceByDate: { [key: string]: { present: number, total: number } } = {};
    courseAttendanceRecords.forEach(record => {
      if (!attendanceByDate[record.date]) {
        attendanceByDate[record.date] = { present: 0, total: 0 };
      }
      attendanceByDate[record.date].total++;
      if (record.status === AttendanceStatus.PRESENT || record.status === AttendanceStatus.LATE) {
        attendanceByDate[record.date].present++;
      }
    });
    const attendanceTrend = Object.entries(attendanceByDate)
      .map(([date, data]) => ({
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        'Attendance Rate': Math.round((data.present / data.total) * 100),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-10); // Last 10 records

    // 5. Student specific attendance
    const studentAttendance = enrolledStudents.map(student => {
      const studentRecords = courseAttendanceRecords.filter(rec => rec.studentId === student.id);
      const studentPresentCount = studentRecords.filter(r => r.status === AttendanceStatus.PRESENT || r.status === AttendanceStatus.LATE).length;
      const attendanceRate = studentRecords.length > 0
        ? Math.round((studentPresentCount / studentRecords.length) * 100)
        : 100;
      const lastStatus = studentRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]?.status || 'N/A';
      return {
        ...student,
        attendanceRate,
        lastStatus
      };
    });

    return {
      enrolledStudents,
      overallAttendanceRate,
      attendanceTrend,
      studentAttendance,
    };
  }, [selectedCourse]);

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourseId(e.target.value || null);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-800">Course Analytics</h1>
      <p className="text-slate-500">Dive into the performance and engagement metrics for your courses.</p>
      
      <div className="bg-white p-4 rounded-xl shadow-md sticky top-0 z-10">
        <label htmlFor="course-selector" className="block text-sm font-medium text-slate-700 mb-1">Select a Course</label>
        <select
          id="course-selector"
          value={selectedCourseId ?? ''}
          onChange={handleCourseChange}
          className="w-full sm:max-w-md px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
        >
          {myCourses.length > 0 ? (
            myCourses.map(course => <option key={course.id} value={course.id}>{course.name}</option>)
          ) : (
            <option disabled>No courses assigned to you</option>
          )}
        </select>
      </div>

      {!selectedCourse || !courseData ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-slate-900">{myCourses.length > 0 ? 'Select a course' : 'No courses found'}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {myCourses.length > 0 ? 'Please choose a course from the dropdown to view its analytics.' : 'You are not currently assigned to any courses.'}
            </p>
        </div>
      ) : (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <DashboardCard title="Enrolled Students" value={courseData.enrolledStudents.length.toString()} icon={<UsersIcon />} />
                <DashboardCard title="Overall Attendance" value={`${courseData.overallAttendanceRate}%`} icon={<ChartBarIcon />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-slate-800">Attendance Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={courseData.attendanceTrend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" fontSize={12} />
                            <YAxis unit="%" domain={[0, 100]}/>
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Attendance Rate" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-slate-800">Student Roster & Engagement</h2>
                    <div className="overflow-y-auto max-h-[300px]">
                        <table className="w-full text-sm text-left text-slate-500">
                            <thead className="text-xs text-slate-700 uppercase bg-slate-100 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Student Name</th>
                                    <th scope="col" className="px-4 py-3 text-center">Attendance</th>
                                    <th scope="col" className="px-4 py-3 text-center">Last Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseData.studentAttendance.sort((a,b) => a.name.localeCompare(b.name)).map(student => (
                                    <tr key={student.id} className="bg-white border-b hover:bg-slate-50">
                                        <td className="px-4 py-3 font-medium text-slate-900">{student.name}</td>
                                        <td className="px-4 py-3 text-center font-semibold">{student.attendanceRate}%</td>
                                        <td className="px-4 py-3 text-center text-xs font-semibold">
                                            <span className={`px-2 py-1 rounded-full ${
                                                student.lastStatus === AttendanceStatus.PRESENT ? 'bg-green-100 text-green-800' :
                                                student.lastStatus === AttendanceStatus.LATE ? 'bg-yellow-100 text-yellow-800' :
                                                student.lastStatus === AttendanceStatus.ABSENT ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
                                            }`}>
                                                {student.lastStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                         {courseData.studentAttendance.length === 0 && (
                            <div className="text-center py-10 text-slate-500">
                                No students are currently enrolled in this course.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
      )}
    </div>
  );
};

export default CourseAnalyticsView;
