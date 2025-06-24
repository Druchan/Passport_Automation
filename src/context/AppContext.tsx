import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockApplicants, mockAdmins } from '../data/mockData';

// Types
export type Applicant = {
  id: string;
  name: string;
  address: string;
  gender: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: Date;
};

type Admin = {
  id: string;
  username: string;
  password: string;
};

type AppContextType = {
  applicants: Applicant[];
  addApplicant: (applicant: Omit<Applicant, 'id' | 'status' | 'createdAt'>) => string;
  getApplicant: (id: string) => Applicant | undefined;
  updateApplicantStatus: (id: string, status: 'Pending' | 'Approved' | 'Rejected') => void;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [admins] = useState<Admin[]>(mockAdmins);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Initialize with mock data
  useEffect(() => {
    const storedApplicants = localStorage.getItem('applicants');
    if (storedApplicants) {
      const parsedApplicants = JSON.parse(storedApplicants);
      // Convert date strings back to Date objects
      const formattedApplicants = parsedApplicants.map((app: any) => ({
        ...app,
        createdAt: new Date(app.createdAt)
      }));
      setApplicants(formattedApplicants);
    } else {
      setApplicants(mockApplicants);
    }

    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Save to localStorage whenever applicants change
  useEffect(() => {
    localStorage.setItem('applicants', JSON.stringify(applicants));
  }, [applicants]);

  const addApplicant = (newApplicant: Omit<Applicant, 'id' | 'status' | 'createdAt'>) => {
    const id = Math.random().toString(36).substring(2, 10);
    const applicant: Applicant = {
      ...newApplicant,
      id,
      status: 'Pending',
      createdAt: new Date()
    };
    setApplicants([...applicants, applicant]);
    return id;
  };

  const getApplicant = (id: string) => {
    return applicants.find(app => app.id === id);
  };

  const updateApplicantStatus = (id: string, status: 'Pending' | 'Approved' | 'Rejected') => {
    setApplicants(applicants.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  const login = (username: string, password: string) => {
    const admin = admins.find(
      admin => admin.username === username && admin.password === password
    );
    
    if (admin) {
      setIsAdmin(true);
      localStorage.setItem('adminLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminLoggedIn');
  };

  const value = {
    applicants,
    addApplicant,
    getApplicant,
    updateApplicantStatus,
    isAdmin,
    login,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AppProvider');
  }
  return context;
};

export default AppContext;