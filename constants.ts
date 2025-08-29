import type { StaffMember, Student, Course, AttendanceRecord } from './types';
import { Role, Department, AttendanceStatus } from './types';

export const MOCK_STAFF_DATA: StaffMember[] = [
  {
    id: 'S001',
    name: 'Dr. Evelyn Reed',
    email: 'e.reed@school.edu',
    phone: '555-0101',
    department: Department.SCIENCE,
    position: 'Head of Science',
    role: Role.FACULTY,
    hireDate: '2018-08-15',
    status: 'Active',
  },
  {
    id: 'S002',
    name: 'Johnathan Carter',
    email: 'j.carter@school.edu',
    phone: '555-0102',
    department: Department.ADMINISTRATION,
    position: 'Principal',
    role: Role.ADMINISTRATOR,
    hireDate: '2015-03-20',
    status: 'Active',
  },
  {
    id: 'S003',
    name: 'Maria Garcia',
    email: 'm.garcia@school.edu',
    phone: '555-0103',
    department: Department.ARTS,
    position: 'Art Teacher',
    role: Role.FACULTY,
    hireDate: '2020-09-01',
    status: 'Active',
  },
  {
    id: 'S004',
    name: 'Samuel Chen',
    email: 's.chen@school.edu',
    phone: '555-0104',
    department: Department.MATHEMATICS,
    position: 'Math Teacher',
    role: Role.FACULTY,
    hireDate: '2019-08-22',
    status: 'On Leave',
  },
  {
    id: 'S005',
    name: 'Patricia Williams',
    email: 'p.williams@school.edu',
    phone: '555-0105',
    department: Department.ADMINISTRATION,
    position: 'HR Manager',
    role: Role.HR,
    hireDate: '2017-05-11',
    status: 'Active',
  },
  {
    id: 'S006',
    name: 'Michael Brown',
    email: 'm.brown@school.edu',
    phone: '555-0106',
    department: Department.PHYSICAL_EDUCATION,
    position: 'Gym Teacher',
    role: Role.FACULTY,
    hireDate: '2021-01-18',
    status: 'Active',
  },
  {
    id: 'S007',
    name: 'Linda Davis',
    email: 'l.davis@school.edu',
    phone: '555-0107',
    department: Department.SCIENCE,
    position: 'Biology Teacher',
    role: Role.FACULTY,
    hireDate: '2022-08-30',
    status: 'Active',
  },
  {
    id: 'S008',
    name: 'Robert Miller',
    email: 'r.miller@school.edu',
    phone: '555-0108',
    department: Department.ADMINISTRATION,
    position: 'Accountant',
    role: Role.HR,
    hireDate: '2016-11-01',
    status: 'Inactive',
  },
];

export let MOCK_COURSES: Course[] = [
    { id: 'C101', name: 'Introduction to Biology', department: Department.SCIENCE },
    { id: 'C102', name: 'Calculus I', department: Department.MATHEMATICS },
    { id: 'C103', name: 'World History', department: Department.ARTS },
    { id: 'C104', name: 'English Literature', department: Department.ARTS },
    { id: 'C105', name: 'Studio Art', department: Department.ARTS },
];

export let MOCK_STUDENT_DATA: Student[] = [
    {
        id: 'STU001',
        name: 'Alice Johnson',
        email: 'a.johnson@student.edu',
        enrollmentDate: '2023-09-01',
        status: 'Enrolled',
        courses: [MOCK_COURSES[0], MOCK_COURSES[1]],
    },
    {
        id: 'STU002',
        name: 'Bob Williams',
        email: 'b.williams@student.edu',
        enrollmentDate: '2022-09-01',
        status: 'Enrolled',
        courses: [MOCK_COURSES[2], MOCK_COURSES[3]],
    },
    {
        id: 'STU003',
        name: 'Charlie Brown',
        email: 'c.brown@student.edu',
        enrollmentDate: '2021-09-01',
        status: 'Graduated',
        courses: [],
    },
    {
        id: 'STU004',
        name: 'Diana Miller',
        email: 'd.miller@student.edu',
        enrollmentDate: '2023-09-01',
        status: 'Enrolled',
        courses: [MOCK_COURSES[4], MOCK_COURSES[1]],
    },
    {
        id: 'STU005',
        name: 'Ethan Davis',
        email: 'e.davis@student.edu',
        enrollmentDate: '2022-09-01',
        status: 'Withdrawn',
        courses: [],
    },
];

const today = new Date();
const todayString = today.toISOString().split('T')[0];
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const yesterdayString = yesterday.toISOString().split('T')[0];

export const MOCK_ATTENDANCE_DATA: AttendanceRecord[] = [
  // Today's Data
  { id: 'ATT001', studentId: 'STU001', courseId: 'C101', date: todayString, status: AttendanceStatus.PRESENT },
  { id: 'ATT002', studentId: 'STU001', courseId: 'C102', date: todayString, status: AttendanceStatus.PRESENT },
  { id: 'ATT003', studentId: 'STU002', courseId: 'C103', date: todayString, status: AttendanceStatus.ABSENT },
  { id: 'ATT004', studentId: 'STU002', courseId: 'C104', date: todayString, status: AttendanceStatus.PRESENT },
  { id: 'ATT005', studentId: 'STU004', courseId: 'C105', date: todayString, status: AttendanceStatus.LATE },
  { id: 'ATT006', studentId: 'STU004', courseId: 'C102', date: todayString, status: AttendanceStatus.PRESENT },

  // Yesterday's Data
  { id: 'ATT007', studentId: 'STU001', courseId: 'C101', date: yesterdayString, status: AttendanceStatus.PRESENT },
  { id: 'ATT008', studentId: 'STU001', courseId: 'C102', date: yesterdayString, status: AttendanceStatus.LATE },
  { id: 'ATT009', studentId: 'STU002', courseId: 'C103', date: yesterdayString, status: AttendanceStatus.PRESENT },
  { id: 'ATT010', studentId: 'STU002', courseId: 'C104', date: yesterdayString, status: AttendanceStatus.PRESENT },
  { id: 'ATT011', studentId: 'STU004', courseId: 'C105', date: yesterdayString, status: AttendanceStatus.ABSENT },
  { id: 'ATT012', studentId: 'STU004', courseId: 'C102', date: yesterdayString, status: AttendanceStatus.PRESENT },
];
