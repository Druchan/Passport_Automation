import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react';
import { useAuth, Applicant } from '../context/AppContext';

const AdminDashboard: React.FC = () => {
  const { applicants, updateApplicantStatus } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  
  // Filter and sort applications
  const filteredApplicants = applicants
    .filter(app => {
      // Filter by status
      if (statusFilter !== 'all' && app.status !== statusFilter) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          app.name.toLowerCase().includes(query) ||
          app.id.toLowerCase().includes(query) ||
          app.address.toLowerCase().includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Newest first
  
  const handleStatusUpdate = (id: string, status: 'Pending' | 'Approved' | 'Rejected') => {
    updateApplicantStatus(id, status);
    
    // Update selected applicant if it's the one being modified
    if (selectedApplicant && selectedApplicant.id === id) {
      setSelectedApplicant({ ...selectedApplicant, status });
    }
  };
  
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-success-100 text-success-800 border-success-200';
      case 'Rejected':
        return 'bg-error-100 text-error-800 border-error-200';
      default:
        return 'bg-accent-100 text-accent-800 border-accent-200';
    }
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="page-container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage passport applications and update their status.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="border-b border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900">Applications</h2>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Search Box */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search applications"
                      className="input pl-9 py-1.5 text-sm"
                    />
                  </div>
                  
                  {/* Status Filter */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="input pl-9 py-1.5 text-sm pr-10"
                    >
                      <option value="all">All Applications</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {filteredApplicants.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No applications found matching your criteria.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3 text-left">Applicant</th>
                      <th className="px-6 py-3 text-left">Date</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredApplicants.map((app) => (
                      <tr 
                        key={app.id}
                        className={`hover:bg-gray-50 cursor-pointer transition-colors ${selectedApplicant?.id === app.id ? 'bg-primary-50' : ''}`}
                        onClick={() => setSelectedApplicant(app)}
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{app.name}</p>
                            <p className="text-xs text-gray-500">ID: {app.id}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(app.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(app.status)}`}>
                            {app.status === 'Approved' && <CheckCircle className="mr-1 h-3 w-3" />}
                            {app.status === 'Rejected' && <XCircle className="mr-1 h-3 w-3" />}
                            {app.status === 'Pending' && <Clock className="mr-1 h-3 w-3" />}
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedApplicant(app);
                            }}
                            className="font-medium text-primary-600 hover:text-primary-800"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        
        {/* Applicant Details Panel */}
        <div className="lg:col-span-1">
          {selectedApplicant ? (
            <div className="card h-full">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Applicant Details</h2>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{selectedApplicant.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(selectedApplicant.status)}`}>
                      {selectedApplicant.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Application ID: {selectedApplicant.id}</p>
                  <p className="text-sm text-gray-500">Submitted: {formatDate(selectedApplicant.createdAt)}</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Gender</h4>
                    <p>{selectedApplicant.gender}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Address</h4>
                    <p className="text-sm">{selectedApplicant.address}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Update Status</h4>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleStatusUpdate(selectedApplicant.id, 'Approved')}
                      disabled={selectedApplicant.status === 'Approved'}
                      className={`btn text-sm ${
                        selectedApplicant.status === 'Approved'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-success-100 text-success-800 hover:bg-success-200'
                      }`}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Application
                    </button>
                    
                    <button
                      onClick={() => handleStatusUpdate(selectedApplicant.id, 'Rejected')}
                      disabled={selectedApplicant.status === 'Rejected'}
                      className={`btn text-sm ${
                        selectedApplicant.status === 'Rejected'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-error-100 text-error-800 hover:bg-error-200'
                      }`}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Application
                    </button>
                    
                    <button
                      onClick={() => handleStatusUpdate(selectedApplicant.id, 'Pending')}
                      disabled={selectedApplicant.status === 'Pending'}
                      className={`btn text-sm ${
                        selectedApplicant.status === 'Pending'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-accent-100 text-accent-800 hover:bg-accent-200'
                      }`}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Mark as Pending
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card h-full flex items-center justify-center p-6 text-center">
              <div>
                <p className="text-gray-500 mb-2">Select an application to view details</p>
                <p className="text-sm text-gray-400">
                  Click on any application from the list to view and manage its details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;