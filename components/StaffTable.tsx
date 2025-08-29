import React, { useState, useMemo } from 'react';
import type { StaffMember } from '../types';
import { Department } from '../types';

interface StaffTableProps {
  staff: StaffMember[];
  onAddStaffClick: () => void;
  onEditClick: (staffMember: StaffMember) => void;
}

const getStatusBadge = (status: 'Active' | 'On Leave' | 'Inactive') => {
  switch (status) {
    case 'Active':
      return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Active</span>;
    case 'On Leave':
      return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">On Leave</span>;
    case 'Inactive':
      return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">Inactive</span>;
    default:
      return null;
  }
};


const StaffTable: React.FC<StaffTableProps> = ({ staff, onAddStaffClick, onEditClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredStaff = useMemo(() => {
    return staff.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            member.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = departmentFilter === 'All' || member.department === departmentFilter;
      const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [staff, searchTerm, departmentFilter, statusFilter]);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
       <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold text-slate-800">Staff Members</h2>
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-2">
            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-48 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full md:w-auto px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
                <option value="All">All Departments</option>
                {Object.values(Department).map(dep => <option key={dep} value={dep}>{dep}</option>)}
            </select>
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full md:w-auto px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
            </select>
            <button onClick={onAddStaffClick} className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition">
              Add Staff
            </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-100">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Position</th>
              <th scope="col" className="px-6 py-3">Department</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Hire Date</th>
              <th scope="col" className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((member) => (
              <tr key={member.id} className="bg-white border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{member.name}</td>
                <td className="px-6 py-4">{member.position}</td>
                <td className="px-6 py-4">{member.department}</td>
                <td className="px-6 py-4">{getStatusBadge(member.status)}</td>
                <td className="px-6 py-4">{new Date(member.hireDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => onEditClick(member)} className="font-medium text-blue-600 hover:underline mr-4">Edit</button>
                  <a href="#" className="font-medium text-red-600 hover:underline">Delete</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStaff.length === 0 && (
          <div className="text-center py-10 text-slate-500">
            No staff members found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffTable;