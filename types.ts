export type ViewType = 'Dashboard' | 'Staff' | 'Students' | 'Courses' | 'E-Library' | 'Attendance' | 'Reports' | 'Settings';

export enum Role {
  ADMINISTRATOR = 'Administrator',
  HR = 'HR',
  FACULTY = 'Faculty',
  STUDENT = 'Student',
}

export enum Department {
  ADMINISTRATION = 'Administration',
  SCIENCE = 'Science',
  ARTS = 'Arts',
  MATHEMATICS = 'Mathematics',
  PHYSICAL_EDUCATION = 'Physical Education',
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: Department;
  position: string;
  role: Role;
  hireDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export interface Course {
  id: string;
  name: string;
  department: Department;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentDate: string;
  status: 'Enrolled' | 'Graduated' | 'Withdrawn';
  courses: Course[];
}

export enum AttendanceStatus {
  PRESENT = 'Present',
  ABSENT = 'Absent',
  LATE = 'Late',
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  date: string; // YYYY-MM-DD format
  status: AttendanceStatus;
}

export enum ResourceType {
  BOOK = 'Book',
  JOURNAL = 'Journal',
}

export interface LibraryResource {
  id: string;
  title: string;
  author: string;
  type: ResourceType;
  coverImage: string;
  publicationYear: number;
  department: Department;
  isAvailable: boolean;
}
