// Mock data for SkillLinker MVP

export const mockUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password", // Mock password for demo
    userType: "assessor",
    verified: true,
    qualifications: ["SETA Registered Assessor"],
    location: "Johannesburg",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "password", // Mock password for demo
    userType: "moderator",
    verified: true,
    qualifications: ["SETA Registered Moderator"],
    location: "Cape Town",
    createdAt: "2024-01-20"
  },
  {
    id: 3,
    firstName: "Skills",
    lastName: "Provider",
    email: "sdp@example.com",
    password: "password", // Mock password for demo
    userType: "sdp",
    verified: true,
    companyName: "Skills Development Co",
    location: "Durban",
    createdAt: "2024-01-10"
  },
  {
    id: 4,
    firstName: "Admin",
    lastName: "User",
    email: "admin@skilllinker.com",
    password: "password", // Mock password for demo
    userType: "admin",
    verified: true,
    createdAt: "2024-01-01"
  },
  {
    id: 5,
    firstName: "Unverified",
    lastName: "Assessor",
    email: "unverified@example.com",
    password: "password", // Mock password for demo
    userType: "assessor",
    verified: false,
    qualifications: ["Pending Verification"],
    location: "Pretoria",
    createdAt: "2024-01-25"
  }
];

export const mockJobs = [
  {
    id: 1,
    title: "Assessment Services for IT Certification",
    description: "Need qualified assessors for IT certification assessments in Johannesburg area.",
    sdpId: 3,
    sdpName: "Skills Development Co",
    location: "Johannesburg",
    budget: 5000,
    status: "open",
    requiredQualifications: ["SETA Registered Assessor", "IT Certification"],
    postedDate: "2024-01-20",
    deadline: "2024-02-20",
    applicants: [1]
  },
  {
    id: 2,
    title: "Moderation Services for Business Skills",
    description: "Looking for experienced moderators for business skills training programs.",
    sdpId: 3,
    sdpName: "Skills Development Co",
    location: "Cape Town",
    budget: 3500,
    status: "open",
    requiredQualifications: ["SETA Registered Moderator", "Business Skills"],
    postedDate: "2024-01-22",
    deadline: "2024-02-15",
    applicants: [2]
  },
  {
    id: 3,
    title: "Assessment and Moderation Combo",
    description: "Combined assessment and moderation services needed for manufacturing sector.",
    sdpId: 3,
    sdpName: "Skills Development Co",
    location: "Durban",
    budget: 8000,
    status: "in-progress",
    requiredQualifications: ["SETA Registered Assessor", "SETA Registered Moderator"],
    postedDate: "2024-01-18",
    deadline: "2024-03-01",
    applicants: [1, 2],
    assignedTo: [1, 2]
  }
];

export const mockMessages = [
  {
    id: 1,
    fromUserId: 3,
    toUserId: 1,
    jobId: 1,
    message: "Hi John, we're interested in your application for the IT assessment job.",
    timestamp: "2024-01-21T10:00:00Z",
    read: false
  },
  {
    id: 2,
    fromUserId: 1,
    toUserId: 3,
    jobId: 1,
    message: "Thank you! I'd be happy to discuss the details.",
    timestamp: "2024-01-21T11:30:00Z",
    read: true
  },
  {
    id: 3,
    fromUserId: 3,
    toUserId: 2,
    jobId: 2,
    message: "Jane, please review the attached documents for the moderation job.",
    timestamp: "2024-01-23T09:15:00Z",
    read: false
  }
];

// Helper functions
export const getUserById = (id) => mockUsers.find(user => user.id === id);
export const getJobById = (id) => mockJobs.find(job => job.id === id);
export const getMessagesForUser = (userId) => mockMessages.filter(msg => msg.fromUserId === userId || msg.toUserId === userId);
export const getJobsBySDP = (sdpId) => mockJobs.filter(job => job.sdpId === sdpId);
export const getApplicantsForJob = (jobId) => {
  const job = getJobById(jobId);
  return job ? job.applicants.map(id => getUserById(id)) : [];
};
