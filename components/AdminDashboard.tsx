
import React from 'react';
import { Inquiry, InquiryStatus } from '../types';

const AdminDashboard: React.FC<{ inquiries: Inquiry[] }> = ({ inquiries }) => {

  const stats = inquiries.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    acc.total = (acc.total || 0) + 1;
    return acc;
  }, {} as Record<InquiryStatus | 'total', number>);

  const StatCard: React.FC<{ label: string; value: number, color: string }> = ({ label, value, color }) => (
    <div className={`p-6 rounded-lg shadow ${color}`}>
      <p className="text-sm font-medium text-gray-100 opacity-90 uppercase">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
  
  const getStatusChip = (status: string) => {
    const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full";
    switch (status) {
        case 'assigned': return `${baseClasses} bg-yellow-100 text-yellow-800`;
        case 'responded': return `${baseClasses} bg-green-100 text-green-800`;
        default: return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };


  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <p className="text-gray-500 mt-1">Overall view of clinic inquiries.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Inquiries" value={stats.total || 0} color="bg-blue-500" />
        <StatCard label="Assigned" value={stats.assigned || 0} color="bg-yellow-500" />
        <StatCard label="Responded" value={stats.responded || 0} color="bg-green-500" />
        <StatCard label="New" value={stats.new || 0} color="bg-red-500" />
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">All Inquiries</h3>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Client Email</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Therapist</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inquiries.map((inq) => (
                <tr key={inq.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inq.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{inq.userEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{inq.serviceType.replace('_', ' ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{inq.therapistEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm"><span className={getStatusChip(inq.status)}>{inq.status}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{inq.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
