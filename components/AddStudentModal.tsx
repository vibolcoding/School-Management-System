'use client';

import React, { useState, FormEvent, useEffect, useRef } from 'react';
import type { Student } from '@/lib/types';
import { MOCK_COURSES } from '@/lib/constants';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveStudent: (newStudent: Omit<Student, 'id'>) => void;
  studentToEdit?: Student | null;
}

const initialFormState = {
  name: '',
  email: '',
  enrollmentDate: '',
  status: 'Enrolled' as 'Enrolled' | 'Graduated' | 'Withdrawn',
};

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onSaveStudent, studentToEdit }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<typeof initialFormState>>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isEditMode = !!studentToEdit;

  useEffect(() => {
    if (isOpen) {
      if (studentToEdit) {
        setFormData({
          name: studentToEdit.name,
          email: studentToEdit.email,
          enrollmentDate: studentToEdit.enrollmentDate,
          status: studentToEdit.status,
        });
        setSelectedCourseIds(studentToEdit.courses.map(c => c.id));
      } else {
        setFormData(initialFormState);
        setSelectedCourseIds([]);
      }
      setErrors({});
      setIsDropdownOpen(false);
      setSearchTerm('');
    }
  }, [isOpen, studentToEdit]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };
    if (isDropdownOpen) {
        document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const validate = (): boolean => {
    const newErrors: Partial<typeof initialFormState> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!formData.enrollmentDate) newErrors.enrollmentDate = 'Enrollment date is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCourseChange = (courseId: string) => {
    setSelectedCourseIds(prevIds =>
      prevIds.includes(courseId)
        ? prevIds.filter(id => id !== courseId)
        : [...prevIds, courseId]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const enrolledCourses = MOCK_COURSES.filter(c => selectedCourseIds.includes(c.id));
      onSaveStudent({ ...formData, courses: enrolledCourses });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredCourses = MOCK_COURSES.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" role="dialog" aria-modal="true" aria-labelledby="add-student-modal-title">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-full overflow-y-auto animate-fade-in-scale">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 id="add-student-modal-title" className="text-xl font-bold text-slate-800">
              {isEditMode ? 'Edit Student Details' : 'Add New Student'}
            </h2>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-800" aria-label="Close modal">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="p-6 grid grid-cols-1 gap-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md text-sm ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} focus:outline-none focus:ring-1 focus:ring-blue-500`} required aria-describedby="name-error" />
              {errors.name && <p id="name-error" className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md text-sm ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} focus:outline-none focus:ring-1 focus:ring-blue-500`} required aria-describedby="email-error"/>
              {errors.email && <p id="email-error" className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="enrollmentDate" className="block text-sm font-medium text-slate-700 mb-1">Enrollment Date</label>
              <input type="date" id="enrollmentDate" name="enrollmentDate" value={formData.enrollmentDate} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md text-sm ${errors.enrollmentDate ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} focus:outline-none focus:ring-1 focus:ring-blue-500`} required aria-describedby="enrollmentDate-error"/>
              {errors.enrollmentDate && <p id="enrollmentDate-error" className="text-xs text-red-500 mt-1">{errors.enrollmentDate}</p>}
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                <option value="Enrolled">Enrolled</option>
                <option value="Graduated">Graduated</option>
                <option value="Withdrawn">Withdrawn</option>
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Course Enrollment</label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-white border border-slate-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                  >
                    <div className="flex flex-wrap gap-1 min-h-[20px]">
                      {selectedCourseIds.length === 0 ? (
                        <span className="text-slate-500">Select courses...</span>
                      ) : (
                        MOCK_COURSES
                          .filter(c => selectedCourseIds.includes(c.id))
                          .map(course => (
                            <span key={course.id} className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                              {course.name}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCourseChange(course.id);
                                }}
                                className="text-blue-600 hover:text-blue-800 focus:outline-none"
                                aria-label={`Remove ${course.name}`}
                              >
                                &times;
                              </button>
                            </span>
                          ))
                      )}
                    </div>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" role="listbox">
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Search courses..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          aria-label="Search courses"
                        />
                      </div>
                      <ul className="list-none p-0 m-0">
                        {filteredCourses.map(course => (
                          <li key={course.id}>
                            <label
                              htmlFor={`course-dropdown-${course.id}`}
                              className="flex items-center py-2 px-3 hover:bg-slate-100 cursor-pointer text-sm text-slate-700 select-none"
                              role="option"
                              aria-selected={selectedCourseIds.includes(course.id)}
                            >
                              <input
                                type="checkbox"
                                id={`course-dropdown-${course.id}`}
                                checked={selectedCourseIds.includes(course.id)}
                                onChange={() => handleCourseChange(course.id)}
                                className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                              />
                              <span className="ml-3">
                                {course.name}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                      {filteredCourses.length === 0 && (
                        <p className="text-center py-2 text-sm text-slate-500">No courses found.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
          </div>
          <div className="p-6 bg-slate-50 border-t rounded-b-xl flex justify-end items-center gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {isEditMode ? 'Save Changes' : 'Save Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
