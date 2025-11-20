// src/data/mockData.js
export const mockUsers = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    phone: '123-456-7890',
    verified: true,
    userType: 'assessor',
    active: false, // Default inactive for assessors
    agreeToTerms: true,
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
    phone: '098-765-4321',
    verified: true,
    userType: 'sdp',
    active: true, // Active for SDP
    agreeToTerms: true,
  },
  {
    id: 3,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'admin123',
    phone: '111-222-3333',
    verified: true,
    userType: 'admin',
    active: true, // Active for admin
    agreeToTerms: true,
  },
  {
    id: 4,
    firstName: 'Active',
    lastName: 'Assessor',
    email: 'active.assessor@example.com',
    password: 'password123',
    phone: '444-555-6666',
    verified: true,
    userType: 'assessor',
    active: true, // Active assessor
    agreeToTerms: true,
  },
];

export const mockJobs = [
  {
    id: 1,
    title: 'Software Development Training',
    description: 'Provide training on software development skills.',
    sdpId: 2,
    location: 'Johannesburg',
    budget: 50000.00,
    status: 'open',
    requiredQualifications: ['JavaScript', 'React'],
    postedDate: new Date().toISOString(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  },
  {
    id: 2,
    title: 'Data Analysis Workshop',
    description: 'Conduct workshops on data analysis techniques.',
    sdpId: 2,
    location: 'Cape Town',
    budget: 30000.00,
    status: 'open',
    requiredQualifications: ['Python', 'Pandas'],
    postedDate: new Date().toISOString(),
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockMessages = [
  {
    id: 1,
    senderId: 1,
    receiverId: 2,
    content: 'Hello, I am interested in your job posting.',
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    senderId: 2,
    receiverId: 1,
    content: 'Great! Please send your resume.',
    timestamp: new Date().toISOString(),
  },
];
