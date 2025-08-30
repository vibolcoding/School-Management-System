import React, { useMemo } from 'react';
import DashboardCard from '../components/DashboardCard';
import UsersIcon from '../components/icons/UsersIcon';
import BriefcaseIcon from '../components/icons/BriefcaseIcon';
import { MOCK_STAFF_DATA } from '../constants';
import { Department } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const HRDashboard: React.FC = () => {
  const totalStaff = MOCK_STAFF_DATA.length;
  const onLeave = MOCK_STAFF_DATA.filter(s => s.status === 'On Leave').length;
  const newHires = MOCK_STAFF_DATA.filter(s => new Date(s.hireDate) > new Date(new Date().setMonth(new Date().getMonth() - 3))).length;
  const activeStaff = MOCK_STAFF_DATA.filter(s => s.status === 'Active').length;

  const staffByDept = useMemo(() => {
    const data = Object.values(Department).map(dept => ({
      name: dept,
      count: MOCK_STAFF_DATA.filter(staff => staff.department === dept).length,
    }));
    return data.filter(d => d.count > 0);
  }, []);

  const staffByStatus = useMemo(() => {
      const statuses = ['Active', 'On Leave', 'Inactive'];
      return statuses.map(status => ({
          name: status,
          value: MOCK_STAFF_DATA.filter(s => s.status === status).length,
      }));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-800">Welcome back, Patricia!</h1>
      <p className="text-slate-500">Here's an overview of your staff management metrics.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Staff" value={totalStaff.toString()} icon={<BriefcaseIcon />} />
        <DashboardCard title="Active Staff" value={activeStaff.toString()} icon={<UsersIcon />} />
        <DashboardCard title="Staff on Leave" value={onLeave.toString()} icon={<BriefcaseIcon />} />
        <DashboardCard title="New Hires (3 Mo)" value={newHires.toString()} icon={<UsersIcon />} changeType="increase" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Staff by Department</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={staffByDept} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-20} textAnchor="end" height={50} interval={0} fontSize={12} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" name="Staff Members" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Staff by Status</h2>
           <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={staffByStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {staffByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
      `}</style>
    </div>
  );
};

export default HRDashboard;
