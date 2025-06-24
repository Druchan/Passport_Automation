import { Applicant } from '../context/AppContext';

export const mockApplicants: Applicant[] = [
  {
    id: 'app1',
    name: 'John Doe',
    address: '123 Main St, Anytown, USA',
    gender: 'Male',
    status: 'Pending',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) // 8 days ago
  },
  {
    id: 'app2',
    name: 'Jane Smith',
    address: '456 Oak Ave, Somewhere, USA',
    gender: 'Female',
    status: 'Approved',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) // 15 days ago
  },
  {
    id: 'app3',
    name: 'Sam Wilson',
    address: '789 Pine Rd, Elsewhere, USA',
    gender: 'Male',
    status: 'Rejected',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  {
    id: 'app4',
    name: 'Emily Johnson',
    address: '101 Elm St, Nowhere, USA',
    gender: 'Female',
    status: 'Pending',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  }
];

export const mockAdmins = [
  {
    id: 'admin1',
    username: 'dru',
    password: 'leodas2023' // In a real app, this would be hashed
  }
];