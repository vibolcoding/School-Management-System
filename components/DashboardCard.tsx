
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, change, changeType }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between transition hover:shadow-lg hover:-translate-y-1">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
        {change && (
          <div className={`text-sm flex items-center mt-1 ${changeColor}`}>
             {changeType === 'increase' ? (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            ) : (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            )}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
        {icon}
      </div>
    </div>
  );
};

export default DashboardCard;
