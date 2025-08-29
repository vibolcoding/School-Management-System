import React, { useState, useMemo } from 'react';
import { MOCK_E_LIBRARY_DATA } from '../constants';
import { Department, ResourceType } from '../types';
import ELibraryGrid from '../components/ELibraryGrid';

const ELibraryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');

  const filteredResources = useMemo(() => {
    return MOCK_E_LIBRARY_DATA.filter(resource => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All' || resource.type === typeFilter;
      const matchesDepartment = departmentFilter === 'All' || resource.department === departmentFilter;
      return matchesSearch && matchesType && matchesDepartment;
    });
  }, [searchTerm, typeFilter, departmentFilter]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">E-Library</h1>
      <p className="text-slate-500">Browse, search, and borrow from our digital collection of books and journals.</p>

      <div className="bg-white p-4 rounded-xl shadow-md sticky top-0 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              <option value="All">All Types</option>
              {Object.values(ResourceType).map(type => <option key={type} value={type}>{type}</option>)}
            </select>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              <option value="All">All Departments</option>
              {Object.values(Department).map(dep => <option key={dep} value={dep}>{dep}</option>)}
            </select>
          </div>
        </div>
      </div>

      <ELibraryGrid resources={filteredResources} />
    </div>
  );
};

export default ELibraryView;
