import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAuth, Applicant } from '../context/AppContext';

const StatusCheck: React.FC = () => {
  const [applicationId, setApplicationId] = useState('');
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  
  const { getApplicant } = useAuth();

  // Check if there's an ID in the URL params
  useEffect(() => {
    const idFromParams = searchParams.get('id');
    if (idFromParams) {
      setApplicationId(idFromParams);
      handleSearch(idFromParams);
    }
  }, [searchParams]);
  
  const handleSearch = (id: string = applicationId) => {
    setError('');
    
    if (!id.trim()) {
      setError('Please enter an application ID');
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      const result = getApplicant(id);
      
      if (result) {
        setApplicant(result);
      } else {
        setError('No application found with this ID. Please check and try again.');
        setApplicant(null);
      }
      
      setIsSearching(false);
    }, 800);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="h-8 w-8 text-success-500" />;
      case 'Rejected':
        return <XCircle className="h-8 w-8 text-error-500" />;
      default:
        return <Clock className="h-8 w-8 text-accent-500" />;
    }
  };

  const getStatusColor = (status: string) => {
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
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Check Application Status</h1>
          <p className="text-gray-600">
            Enter your application ID to track the current status of your passport application.
          </p>
        </div>
        
        <div className="card p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={applicationId}
              onChange={(e) => {
                setApplicationId(e.target.value);
                setError('');
              }}
              placeholder="Enter your Application ID"
              className="input flex-grow"
              aria-label="Application ID"
            />
            <button
              onClick={() => handleSearch()}
              disabled={isSearching}
              className="btn btn-primary whitespace-nowrap"
            >
              {isSearching ? 'Searching...' : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Check Status
                </>
              )}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-error-50 border border-error-200 rounded-md text-error-800 text-sm">
              {error}
            </div>
          )}
          
          {applicant && (
            <div className="mt-8 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Application Details</h2>
                <div className={`px-3 py-1 rounded-full border ${getStatusColor(applicant.status)}`}>
                  {applicant.status}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-5 mb-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center">
                    {getStatusIcon(applicant.status)}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Applicant Name</p>
                        <p className="font-medium">{applicant.name}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Application ID</p>
                        <p className="font-mono text-sm">{applicant.id}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Submission Date</p>
                        <p>{formatDate(applicant.createdAt)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p>{applicant.gender}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Address</p>
                      <p>{applicant.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {applicant.status === 'Pending' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800">Application in Progress</h3>
                  <p className="mt-1 text-sm text-blue-700">
                    Your application is currently under review. This process typically takes 7-10 business days.
                  </p>
                </div>
              )}
              
              {applicant.status === 'Approved' && (
                <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-success-800">Application Approved</h3>
                  <p className="mt-1 text-sm text-success-700">
                    Congratulations! Your passport application has been approved. You will receive further instructions for collection.
                  </p>
                </div>
              )}
              
              {applicant.status === 'Rejected' && (
                <div className="bg-error-50 border border-error-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-error-800">Application Rejected</h3>
                  <p className="mt-1 text-sm text-error-700">
                    We regret to inform you that your application has been rejected. Please contact our support team for more information.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusCheck;