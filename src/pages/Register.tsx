import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AppContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    gender: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const { addApplicant } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender selection is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const id = addApplicant(formData);
        setApplicationId(id);
        setSuccess(true);
        setIsSubmitting(false);
        setFormData({ name: '', address: '', gender: '' });
      }, 1000);
    }
  };

  const handleCheckStatus = () => {
    navigate(`/status?id=${applicationId}`);
  };

  if (success) {
    return (
      <div className="page-container">
        <div className="max-w-md mx-auto card p-8 animate-fade-in">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-success-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
            <p className="text-gray-600">
              Your passport application has been successfully submitted and is now pending review.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Your Application ID:</p>
            <p className="text-xl font-mono font-medium text-primary-800">{applicationId}</p>
            <p className="text-xs text-gray-500 mt-2">
              Please save this ID for checking your application status.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={handleCheckStatus} 
              className="btn btn-primary"
            >
              Check Status
            </button>
            <button
              onClick={() => setSuccess(false)}
              className="btn btn-outline"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Passport Application Form</h1>
          <p className="text-gray-600">
            Please fill out the form below to submit your passport application.
          </p>
        </div>
        
        <div className="card p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input ${errors.name ? 'border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-error-600">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="address" className="label">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className={`input ${errors.address ? 'border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="Enter your complete address"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-error-600">{errors.address}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="gender" className="label">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`input ${errors.gender ? 'border-error-500 focus:ring-error-500' : ''}`}
                >
                  <option value="" disabled>Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-error-600">{errors.gender}</p>
                )}
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800">Important Information</h3>
          <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
            <li>All fields in the form are mandatory.</li>
            <li>Please ensure your name exactly matches your identification documents.</li>
            <li>You'll receive an application ID after submission to track your status.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;