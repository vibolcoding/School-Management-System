import React, { useState } from 'react';
import StaffTable from '../components/StaffTable';
import AddStaffModal from '../components/AddStaffModal';
import { MOCK_STAFF_DATA } from '../constants';
import type { StaffMember } from '../types';

const StaffManagementView: React.FC = () => {
  const [staffList, setStaffList] = useState<StaffMember[]>(MOCK_STAFF_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  const handleAddClick = () => {
    setEditingStaff(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (staffMember: StaffMember) => {
    setEditingStaff(staffMember);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStaff(null);
  };

  const handleSaveStaff = (staffData: Omit<StaffMember, 'id'>) => {
    if (editingStaff) {
      // Update existing staff
      const updatedStaffMember = { ...editingStaff, ...staffData };
      setStaffList(staffList.map(s => s.id === editingStaff.id ? updatedStaffMember : s));
    } else {
      // Add new staff
      const newStaffMember: StaffMember = {
        id: `S${(staffList.length + 1).toString().padStart(3, '0')}`,
        ...staffData,
      };
      setStaffList(prevList => [...prevList, newStaffMember].sort((a, b) => a.name.localeCompare(b.name)));
    }
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Staff Management</h1>
      <p className="text-slate-500">View, edit, and manage all staff members in the system.</p>
      <StaffTable 
        staff={staffList} 
        onAddStaffClick={handleAddClick}
        onEditClick={handleEditClick}
      />
      <AddStaffModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSaveStaff={handleSaveStaff}
        staffToEdit={editingStaff}
      />
    </div>
  );
};

export default StaffManagementView;