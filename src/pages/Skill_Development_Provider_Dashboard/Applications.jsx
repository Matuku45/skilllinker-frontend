import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    Button, 
    Chip, 
    CircularProgress, 
    Divider, 
    Alert,
    Grid,
    Modal, 
    IconButton, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel,
    // --- Table Imports ---
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    Paper,
    Tooltip
} from '@mui/material'; 

import { 
    Work, 
    AssignmentTurnedIn, 
    Delete, 
    Edit,
    Person,
    Close, 
    Visibility, 
    Update,
    Description, // Icon for Resumes
    GetApp, // Icon for Download
    Cached // Icon for Refresh
} from '@mui/icons-material';

// --- AUTH and API IMPORTS ---
import { useAuth } from '../../contexts/AuthContext'; 

// Define API_URL for direct axios use (replace with your actual base URL)
const API_URL = 'http://localhost:3000/api'; 

// Define Status Options for the Dropdown (used for Applications)
// NOTE: 'New' and 'Reviewed' are used for display but will be mapped to 'pending'
// or 'reviewed' on the backend side if you update your DB enum.
const APPLICATION_STATUSES = [
    { value: 'New', label: 'New' },
    { value: 'Reviewed', label: 'Reviewed' },
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Rejected', label: 'Rejected' },
];

/**
 * Renders the comprehensive dashboard page for Skill Development Providers (SDP).
 * Includes Job, Application, and Resume management tables with robust viewing.
 */
const Applications2 = () => { 
    const { currentUser, isLoading: isAuthLoading } = useAuth(); 

    // --- STATE HOOKS ---
    const [postedJobs, setPostedJobs] = useState([]);
    const [incomingApplications, setIncomingApplications] = useState([]);
    // Resumes now include applicant details merged from applications
    const [resumes, setResumes] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionMessage, setActionMessage] = useState(null); 
    
    // Application Viewer State
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedApplication, setSelectedApplication] = useState(null); 
    
    // Resume Viewer State
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
    const [selectedResumeUrl, setSelectedResumeUrl] = useState(null);
    const [selectedResumeMime, setSelectedResumeMime] = useState(null);
    const [selectedResumeFilename, setSelectedResumeFilename] = useState(null);


    // Function to map status to Chip color (used for Applications)
    const getStatusChip = (status) => {
        let color, label;
        const lowerStatus = status?.toLowerCase();
        switch (lowerStatus) {
            case "new":
            case "pending": 
                color = "primary";
                label = "NEW";
                break;
            case "reviewed":
                color = "info";
                label = "REVIEWED";
                break;
            case "accepted":
                color = "success";
                label = "ACCEPTED";
                break;
            case "rejected":
                color = "error";
                label = "REJECTED";
                break;
            default:
                color = "default";
                label = status ? status.toUpperCase() : "PENDING";
        }
        return <Chip label={label} color={color} size="small" variant="filled" sx={{ fontWeight: 'bold' }} />;
    };

    // --- HANDLERS FOR MODALS ---
    const handleOpenModal = (app) => {
        const job = postedJobs.find(j => j.id === app.jobId);
        setSelectedApplication({ ...app, jobTitle: job?.title });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedApplication(null);
    };
    
    // **HANDLER: Close Resume Modal (Crucial for memory management)**
    const handleCloseResumeModal = () => {
        setIsResumeModalOpen(false);
        // Revoke the Blob URL to free up memory after the modal is closed
        if (selectedResumeUrl) {
            URL.revokeObjectURL(selectedResumeUrl);
        }
        setSelectedResumeUrl(null);
        setSelectedResumeMime(null);
        setSelectedResumeFilename(null);
    };


const handleStatusUpdate = async (appId, newStatus) => {
    try {
        // Call backend to update status
        const res = await axios.put(`${API_URL}/applications/${appId}`, { status: newStatus }, {
            headers: { Authorization: `Bearer(currentUser.token)` }
        });

        // Update local state so table reflects change immediately
        setIncomingApplications(prev =>
            prev.map(app => (app.id === appId ? res.data.application : app))
        );
    } catch (err) {
        console.error("Error updating application status:", err);
    }
};





// --- Parent Component Context (where state is defined and handlers live) ---
// Assuming you have these states and imports in your main component:
// const [selectedApplication, setSelectedApplication] = useState(null);
// const [actionMessage, setActionMessage] = useState(null);
// const [currentUser, setCurrentUser] = useState({ id: 1, token: 'fake-token-123' }); // Example User
// const [statusMessage, setStatusMessage] = useState(''); // NEW STATE for message input
// const API_URL = "http://localhost:3000/api";
// const axios = require('axios'); // Placeholder, assuming Axios is imported

// **MODIFIED LOGIC: APPLICATION STATUS UPDATE & MESSAGE SEND**
const handleUpdateApplicationStatus = async (applicationId, newStatus) => {
    // 1. Clear previous action message
    setActionMessage(null);

    // 2. Initial checks for prerequisites
    if (!currentUser?.token || !selectedApplication || !applicationId) return;

    // 3. Map Frontend Status to Backend Status (Crucial)
    let backendStatus = newStatus.toLowerCase();
    // Default mapping for front-end statuses that might be considered 'pending' on the backend
    if (backendStatus === 'new' || backendStatus === 'reviewed') {
        backendStatus = 'pending';
    }

    // 4. Optimistically update local state for the modal view
    if (selectedApplication.id === applicationId) {
        setSelectedApplication(prev => ({ ...prev, status: newStatus }));
    }

    try {
        // 5. Update application status
        const updatePayload = { status: backendStatus };

        // **API Route for Status Update**
        const statusRes = await axios.put(`${API_URL}/applications/${applicationId}`, updatePayload, {
            headers: { 
                Authorization: `Bearer ${currentUser.token}`, 
                'Content-Type': 'application/json' 
            },
        });

        const updateSuccess = statusRes.status === 200 || statusRes.status === 204;

        if (updateSuccess) {
            // 6. Set success feedback
            let successMessage = `Application ID ${applicationId} status updated to **${newStatus}** successfully.`;
            setActionMessage(successMessage);

            // Optional: You would typically refresh the main application list here
            // await loadApplications(currentUser.token); 
        } else {
            throw new Error('Status update failed unexpectedly.');
        }

    } catch (err) {
        // 7. Handle errors and set feedback
        console.error("Error updating status:", err);
        setActionMessage(`Failed to process Application ID ${applicationId}. ${err.response?.data?.message || err.message}`);
        
        // Optional: Revert optimistic update or refresh list on failure
        // await loadApplications(currentUser.token); 
    }
    // Note: The original 'setStatusMessage' is also removed since messageContent is no longer an argument
};

    // **MODIFIED FUNCTION: RESUME VIEW/DOWNLOAD LOGIC (The Fix)**
    const handleViewDownloadResume = (resume, action = 'view') => {
        setActionMessage(null);
        
        // 1. Validate the buffer data structure
        if (!resume.data || !resume.data.data || !Array.isArray(resume.data.data)) {
            setActionMessage(`Error: No file data found for Resume ID ${resume.id}. It may be corrupted or missing.`);
            return;
        }

        // 2. Create a Blob from the byte array (Buffer)
        const fileBytes = new Uint8Array(resume.data.data);
        const mimeType = resume.mimetype || 'application/octet-stream';
        const filename = resume.filename || `resume_${resume.id}.pdf`; 
        const blob = new Blob([fileBytes], { type: mimeType });
        
        // 3. Create a URL for the Blob (This is the powerful library solution)
        const blobUrl = URL.createObjectURL(blob);

        // 4. Handle Download Action (Forces save dialog)
        if (action === 'download' || (action === 'view' && mimeType !== 'application/pdf' && !mimeType.startsWith('image/'))) {
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // IMPORTANT: Revoke URL immediately after download is triggered
            URL.revokeObjectURL(blobUrl); 
            setActionMessage(`Download triggered for Resume: ${filename}`);
            return;
        } 
        
        // 5. Handle View Action (Opens the modal for supported types)
        if (action === 'view' && (mimeType === 'application/pdf' || mimeType.startsWith('image/'))) {
            setSelectedResumeUrl(blobUrl);
            setSelectedResumeMime(mimeType);
            setSelectedResumeFilename(filename);
            setIsResumeModalOpen(true);
            // Note: URL is revoked when the modal is closed via handleCloseResumeModal
            setActionMessage(`Preparing to view Resume: ${filename}`);
        } else {
            setActionMessage(`File type ${mimeType} is not supported for inline viewing. Download triggered.`);
             // Fallback to force download if view button clicked for unsupported file
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl); 
        }
    };


    // --- CRUD API FUNCTIONS (Data Fetching) ---
    
    const loadJobs = async (token) => {
        try {
            const res = await axios.get(`${API_URL}/jobs?ts=${Date.now()}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPostedJobs(res.data); 
            return res.data; 
        } catch (err) {
            console.error("Error loading jobs:", err);
            setError(`Failed to load jobs: ${err.message}.`);
            return [];
        }
    };
    
    const loadApplications = async (token) => {
        try {
            const res = await axios.get(`${API_URL}/applications?ts=${Date.now()}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIncomingApplications(res.data); 
            return res.data; 
        } catch (err) {
            console.error("Error loading applications:", err);
            setIncomingApplications([]); 
            return [];
        }
    };

    // **NEW HELPER FUNCTION: Fetch User Details**
    const fetchUserById = async (userId, token) => {
        try {
            // NOTE: Replace `/users/${userId}` with your actual API endpoint to get a user's details
            const res = await axios.get(`${API_URL}/users/${userId}`, { 
                headers: { Authorization: `Bearer ${token}` },
            });
            // NOTE: Replace `res.data.name` or `res.data.fullName` with the actual property name from your User model
            // This is the source of the Applicant Name
            return res.data.name || res.data.fullName || res.data.email || `User ${userId}`; 
        } catch (err) {
            console.warn(`Failed to fetch user details for ID ${userId}:`, err.message);
            return `User ${userId} (Name Unavailable)`;
        }
    };
    
    // **MODIFIED RESUME LOADING FUNCTION (To include Applicant Name)**
    const loadResumes = async (token) => {
        try {
            const [resumeRes, appRes] = await Promise.all([
                axios.get(`${API_URL}/resumes?ts=${Date.now()}`, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(`${API_URL}/applications?ts=${Date.now()}`, { headers: { Authorization: `Bearer ${token}` } }),
            ]);

            const applications = appRes.data;
            const applicationsMap = applications.reduce((map, app) => {
                // Map the resumeId to the corresponding application info
                map[app.resumeId] = { userId: app.userId, applicantNameFromApp: app.applicantName }; 
                return map;
            }, {});

            const resumesData = resumeRes.data;
            const resumesWithNames = await Promise.all(resumesData.map(async (resume) => {
                const appInfo = applicationsMap[resume.id];
                let applicantName = 'N/A';
                let userId = appInfo?.userId || null;
                
                // Priority 1: Use name if available directly on the application object (best performance)
                if (appInfo?.applicantNameFromApp) {
                    applicantName = appInfo.applicantNameFromApp;
                } 
                // Priority 2: Fetch name from the user service using the userId (slower, but accurate fallback)
                else if (userId) {
                    applicantName = await fetchUserById(userId, token);
                } 
                // Priority 3: No link found
                else {
                    applicantName = 'User Link Missing';
                }

                return {
                    ...resume,
                    applicantName,
                    userId
                };
            }));

            setResumes(resumesWithNames); 
            return resumesWithNames; 
        } catch (err) {
            console.error("Error loading resumes:", err);
            setResumes([]); 
            return [];
        }
    };

    // --- OTHER CRUD API FUNCTIONS (Delete Resume) ---
    const handleDeleteResume = async (resumeId) => {
        setActionMessage(null);
        if (!currentUser?.token) return;
        
        if (!window.confirm(`Are you sure you want to delete Resume ID ${resumeId}? This cannot be undone.`)) {
            return;
        }

        try {
            await axios.delete(`${API_URL}/resumes/${resumeId}`, {
                headers: { Authorization: `Bearer ${currentUser.token}` },
            });
            setActionMessage(`Resume ID ${resumeId} deleted successfully.`);
            await loadResumes(currentUser.token); // Refresh the list
        } catch (err) {
            setActionMessage(`Failed to delete Resume ID ${resumeId}. ${err.response?.data?.message || err.message}`);
        }
    };


    // --- DATA FETCHING ORCHESTRATION ---
    const fetchProviderData = async () => {
        setLoading(true);
        setError(null);
        if (!currentUser || !currentUser.token) {
            setError("Authentication token missing. Please log in.");
            setLoading(false);
            return;
        }

        const token = currentUser.token;
        // We modified loadResumes to handle applications internally via Promise.all
        await Promise.all([
            loadJobs(token),
            loadResumes(token) 
        ]);
        // Re-load applications to ensure it is fully up to date for the ApplicationDetailModal
        await loadApplications(token); 
        setLoading(false); 
    };

    useEffect(() => {
        if (!isAuthLoading) {
            if (currentUser && currentUser.token) {
                fetchProviderData();
            } else {
                setLoading(false);
                setError("You must be logged in as a Provider to view this dashboard.");
            }
        }
    }, [currentUser, isAuthLoading]); 

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ ml: 2 }}>Loading Dashboard Data...</Typography>
            </Box>
        );
    }

    // --- RENDER FUNCTIONS: MODALS ---

    const ApplicationDetailModal = () => { 
        if (!selectedApplication) return null;
        const handleStatusChange = (event) => {
            const newStatus = event.target.value;
            // Update the local state instantly for UI responsiveness
            setSelectedApplication(prev => ({ ...prev, status: newStatus }));
            // Call the async update function
            handleUpdateApplicationStatus(selectedApplication.id, newStatus);
        };

        return (
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="application-detail-title"
                aria-describedby="application-detail-description"
            >
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        width: { xs: '90%', md: 800 }, 
                        bgcolor: 'background.paper', 
                        borderRadius: 2, 
                        boxShadow: 24, 
                        p: 4,
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography id="application-detail-title" variant="h5" component="h2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            Application Review 👁️ - ID: {selectedApplication.id}
                        </Typography>
                        <IconButton onClick={handleCloseModal}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Divider sx={{ mb: 2 }} />

                    {/* Status Update & Info Row */}
                    <Grid container spacing={2} alignItems="center" sx={{ mb: 3, p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Current Status:
                                </Typography>
                                {getStatusChip(selectedApplication.status)}
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="status-select-label">Update Status</InputLabel>
                                <Select
                                    labelId="status-select-label"
                                    value={selectedApplication.status || 'New'}
                                    label="Update Status"
                                    onChange={handleStatusChange}
                                >
                                    {APPLICATION_STATUSES.map(status => (
                                        <MenuItem key={status.value} value={status.value}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Update fontSize="small" color={getStatusChip(status.value).props.color} />
                                                **{status.label}**
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    
                    {actionMessage && actionMessage.includes(selectedApplication.id.toString()) && (
                        <Alert severity={actionMessage.includes('successfully') ? 'success' : 'info'} sx={{ mt: 1, mb: 2 }}>
                            {actionMessage.replace(/\*{2}/g, '')}
                        </Alert>
                    )}

                    <Divider sx={{ mb: 3 }} />

                    {/* Applicant & Job Info */}
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                        Applicant & Job Information
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3, border: '1px solid #ddd', p: 2, borderRadius: 1 }}>
                        <Grid item xs={6}><Typography variant="body2" color="text.secondary">Applicant User ID:</Typography><Typography fontWeight="medium">{selectedApplication.userId || 'N/A'}</Typography></Grid>
                        <Grid item xs={6}><Typography variant="body2" color="text.secondary">Applied for Job ID:</Typography><Typography fontWeight="medium">{selectedApplication.jobId || 'N/A'}</Typography></Grid>
                        <Grid item xs={12}><Typography variant="body2" color="text.secondary">Job Title:</Typography><Typography fontWeight="medium" color="primary.dark">{selectedApplication.jobTitle || 'Title not loaded/found'}</Typography></Grid>
                    </Grid>

                    {/* Cover Letter (The "Letter") */}
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                        Cover Letter Content 📝 (Read the Letter)
                    </Typography>
                    <Paper 
                        elevation={2} 
                        sx={{ 
                            p: 3, 
                            bgcolor: '#ffffff', 
                            borderRadius: 1,
                            whiteSpace: 'pre-wrap', 
                            textAlign: 'justify',
                            maxHeight: 300,
                            overflowY: 'auto',
                            borderLeft: '4px solid #ff9800' // Accent color for the letter
                        }}
                    >
                        <Typography id="application-detail-description" variant="body1">
                            {selectedApplication.coverLetter || 'No cover letter provided.'}
                        </Typography>
                    </Paper>

                </Box>
            </Modal>
        );
    };

    const ResumeViewerModal = () => { 
        if (!isResumeModalOpen || !selectedResumeUrl) return null;

        let content;
        if (selectedResumeMime === 'application/pdf') {
            content = (
                <Box sx={{ width: '100%', height: 'calc(90vh - 150px)', border: 'none' }}>
                    <iframe 
                        src={selectedResumeUrl} 
                        title={selectedResumeFilename || "Resume Viewer"} 
                        width="100%" 
                        height="100%"
                        style={{ border: 'none' }}
                        type="application/pdf"
                    ></iframe>
                </Box>
            );
        } else if (selectedResumeMime?.startsWith('image/')) {
            content = (
                <Box sx={{ textAlign: 'center' }}>
                    <img 
                        src={selectedResumeUrl} 
                        alt={selectedResumeFilename || "Applicant Image"} 
                        style={{ maxWidth: '100%', maxHeight: 'calc(90vh - 150px)', height: 'auto' }}
                    />
                </Box>
            );
        } else {
            content = (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="warning.main" sx={{ mb: 2 }}>
                        File Preview Not Available
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        The file type (**{selectedResumeMime}**) cannot be previewed directly in the browser. 
                        A download has been initiated, or you can use the button below.
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="success" 
                        startIcon={<GetApp />}
                        onClick={() => handleViewDownloadResume({
                            // Find the full resume object to get the data buffer for the download
                            data: { data: resumes.find(r => r.filename === selectedResumeFilename)?.data?.data || [] }, 
                            mimetype: selectedResumeMime,
                            filename: selectedResumeFilename,
                            id: resumes.find(r => r.filename === selectedResumeFilename)?.id || null,
                        }, 'download')}
                    >
                        Force Download: {selectedResumeFilename}
                    </Button>
                </Box>
            );
        }

        return (
            <Modal
                open={isResumeModalOpen}
                onClose={handleCloseResumeModal}
                aria-labelledby="resume-viewer-title"
            >
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        width: { xs: '95%', md: '80%' }, 
                        bgcolor: 'background.paper', 
                        borderRadius: 2, 
                        boxShadow: 24, 
                        p: 2,
                        maxHeight: '95vh',
                        overflowY: 'hidden'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography id="resume-viewer-title" variant="h5" component="h2" sx={{ fontWeight: 600, color: 'success.main' }}>
                            View Resume: {selectedResumeFilename || 'File'}
                        </Typography>
                        <IconButton onClick={handleCloseResumeModal}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {content}
                </Box>
            </Modal>
        );
    };

    // --- RENDER FUNCTIONS: TABLES ---
    
    // 1. Job Management Table (Unchanged)
    const renderPostedJobsTable = () => (
        <Card component={Paper} elevation={3} sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', mb: 2, fontWeight: 600, color: '#3f51b5' }}>
                        <Work color="primary" sx={{ mr: 1 }} /> Job Postings ({postedJobs.length})
                    </Typography>
                    <Button size="small" variant="outlined" startIcon={<Cached />} onClick={fetchProviderData}>Refresh</Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <TableContainer sx={{ maxHeight: 300 }}>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#e8eaf6' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>ID / Provider</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {postedJobs.length > 0 ? (
                                postedJobs.slice(0, 5).map(job => (
                                    <TableRow key={job.id} hover>
                                        <TableCell>
                                            <Chip label={`Job ${job.id}`} size="small" variant="outlined" color="primary" sx={{ mb: 0.5 }} />
                                            <Typography variant="caption" display="block">Provider {job.sdpId || 'N/A'}</Typography>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'medium' }}>{job.title}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                                <Tooltip title="Update Job Title"><Button size="small" startIcon={<Edit />} /* onClick={() => handleUpdateJob(job.id)} */ variant="outlined">Update</Button></Tooltip>
                                                <Tooltip title="Delete Job"><Button size="small" color="error" startIcon={<Delete />} /* onClick={() => handleDeleteJob(job.id)} */ variant="outlined">Delete</Button></Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow><TableCell colSpan={3} sx={{ textAlign: 'center', py: 3 }}><Typography color="text.secondary">No jobs found.</Typography></TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
    
    // 2. Incoming Applications Table (Unchanged)
    // 2. Incoming Applications Table
const renderIncomingApplicationsTable = () => (
    <Card component={Paper} elevation={3} sx={{ height: '100%' }}>
        <CardContent>
            <Typography 
                variant="h5" 
                sx={{ display: 'flex', alignItems: 'center', mb: 2, fontWeight: 600, color: '#ff9800' }}
            >
                <AssignmentTurnedIn color="warning" sx={{ mr: 1 }} /> Incoming Applications ({incomingApplications.length})
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <TableContainer sx={{ maxHeight: 300 }}>
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#fff3e0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Applicant ID / Job ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Application Snippet</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Review</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {incomingApplications.length > 0 ? (
                            incomingApplications.slice(0, 5).map(app => (
                                <TableRow key={app.id} hover>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                            <Person fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> 
                                            User {app.userId}
                                        </Typography>
                                        <Chip 
                                            label={`Job ${app.jobId}`} 
                                            size="small" 
                                            variant="outlined" 
                                            sx={{ mt: 0.5, maxWidth: 100 }} 
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title={app.coverLetter}>
                                            <Typography 
                                                variant="body2" 
                                                color="text.secondary" 
                                                sx={{ fontStyle: 'italic', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}
                                            >
                                                "{app.coverLetter?.substring(0, 40) || 'No cover letter'}..."
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        {getStatusChip(app.status)}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Tooltip title="View Details and Update Status">
                                            <Button 
                                                size="small" 
                                                variant="contained" 
                                                color="primary" 
                                                startIcon={<Visibility />} 
                                                onClick={() => {
                                                    handleOpenModal(app); 
                                                    // Pass a callback to update status directly from modal
                                                    setModalStatusUpdateCallback((newStatus) => handleStatusUpdate(app.id, newStatus));
                                                }}
                                            >
                                                Review
                                            </Button>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} sx={{ textAlign: 'center', py: 3 }}>
                                    <Typography color="text.secondary">No incoming applications.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
    </Card>
);


    // 3. Resumes Management Table - MODIFIED to include Applicant Name
    const renderResumesTable = () => (
        <Card component={Paper} elevation={3} sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', mb: 2, fontWeight: 600, color: '#4caf50' }}>
                    <Description color="success" sx={{ mr: 1 }} /> Applicant Resumes ({resumes.length})
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <TableContainer sx={{ maxHeight: 400 }}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#e8f5e9' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>ID / Filename</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>**Owner Name** / User ID</TableCell> {/* <-- NEW COLUMN HEADER */}
                                <TableCell sx={{ fontWeight: 'bold' }}>MIME Type</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {resumes.length > 0 ? (
                                resumes.map(resume => (
                                    <TableRow key={resume.id} hover>
                                        <TableCell>
                                            <Chip label={`Resume ${resume.id}`} size="small" variant="outlined" color="success" sx={{ mb: 0.5 }} /><br/>
                                            <Typography variant="caption" sx={{ wordBreak: 'break-all' }}>{resume.filename}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>**{resume.applicantName || 'N/A'}**</Typography>
                                            <Typography variant="caption" color="text.secondary">User ID: {resume.userId || 'N/A'}</Typography>
                                        </TableCell> {/* <-- NEW CELL CONTENT */}
                                        <TableCell>{resume.mimetype}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                                <Tooltip title={`View: ${resume.filename}`}>
                                                    <Button 
                                                        size="small" 
                                                        variant="contained"
                                                        color="primary"
                                                        startIcon={<Visibility />} 
                                                        onClick={() => handleViewDownloadResume(resume, 'view')} 
                                                    >
                                                        View
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title={`Download: ${resume.filename}`}>
                                                    <Button 
                                                        size="small" 
                                                        color="success" 
                                                        startIcon={<GetApp />} 
                                                        onClick={() => handleViewDownloadResume(resume, 'download')} 
                                                        variant="outlined"
                                                    >
                                                        Download
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title={`Delete Resume ${resume.id}`}>
                                                    <IconButton color="error" size="small" onClick={() => handleDeleteResume(resume.id)}>
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow><TableCell colSpan={4} sx={{ textAlign: 'center', py: 3 }}><Typography color="text.secondary">No resumes uploaded yet.</Typography></TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );


    // --- MAIN RETURN ---
    return (
        <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
            
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#333' }}>
                Provider Dashboard: Jobs, Applications, & Resumes
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            {actionMessage && !error && (
                <Alert severity={actionMessage.includes('successfully') ? 'success' : 'info'} sx={{ mb: 3 }}>
                    {actionMessage.replace(/\*{2}/g, '')}
                </Alert>
            )}

            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} lg={6}>
                    {renderPostedJobsTable()}
                </Grid>
                <Grid item xs={12} lg={6}>
                    {renderIncomingApplicationsTable()}
                </Grid>
            </Grid>
            
            {/* Resume Management Section */}
            <Box sx={{ mt: 3, mb: 3 }}>
                {renderResumesTable()}
            </Box>

            {/* The Modals - placed at the end for correct layering */}
            <ApplicationDetailModal />
            <ResumeViewerModal /> 
        </Box>
    );
};

export default Applications2;