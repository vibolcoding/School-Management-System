import React, { useState } from 'react';
import StudentTable from '../components/StudentTable';
import AddStudentModal from '../components/AddStudentModal';
import { MOCK_STUDENT_DATA } from '../constants';
import type { Student } from '../types';

const StudentManagementView: React.FC = () => {
  const [studentList, setStudentList] = useState<Student[]>(MOCK_STUDENT_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleAddClick = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const handleSaveStudent = (studentData: Omit<Student, 'id'>) => {
    if (editingStudent) {
      // Update existing student
      const updatedStudent = { ...editingStudent, ...studentData };
      setStudentList(studentList.map(s => s.id === editingStudent.id ? updatedStudent : s));
    } else {
      // Add new student
      const newStudent: Student = {
        id: `STU${(studentList.length + 1).toString().padStart(3, '0')}`,
        ...studentData,
      };
      setStudentList(prevList => [...prevList, newStudent].sort((a, b) => a.name.localeCompare(b.name)));
    }
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Student Management</h1>
      <p className="text-slate-500">View, edit, and manage all student records in the system.</p>
      <StudentTable 
        students={studentList} 
        onAddStudentClick={handleAddClick}
        onEditClick={handleEditClick}
      />
      <AddStudentModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSaveStudent={handleSaveStudent}
        studentToEdit={editingStudent}
      />
    </div>
  );
};

export default StudentManagementView;