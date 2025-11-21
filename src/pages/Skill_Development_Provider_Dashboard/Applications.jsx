import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../../context/AuthContext'; // Re-enable when fetching data
// import applicationService from '../../services/applicationService'; 
import { 
    Box, 
    Typography, 
    Paper, 
    Grid, 
    Card,           // New: Use Card for visual separation
    CardContent,    // New: Card Content container
    Button,         // New: Action buttons
    Chip,           // New: Status indicators
    CircularProgress, // New: Loading indicator
    Divider,        // New: Visual separation
    List,
    ListItem,
    ListItemText
} from '@mui/material'; 
import { AssignmentTurnedIn, PersonOutline, EmailOutlined } from '@mui/icons-material'; // Icons

/**
 * Renders the dashboard page for Skill Development Providers to view incoming applications.
 */
const Applications = () => {
    // const { currentUser } = useAuth(); // Example: Get user context if needed
    // const [applications, setApplications] = useState([]);
    // const [loading, setLoading] = useState(true);

    // --- Placeholder Data for Beautification ---
    const loading = false; // Set to true to see the loading state
    const applications = [
        { id: 1, applicantName: "Thato Mofokeng", program: "Advanced React Course", status: "New", appliedDate: "2025-11-18", email: "thato@example.com" },
        { id: 2, applicantName: "Palesa Dlamini", program: "Data Science Internship", status: "Reviewed", appliedDate: "2025-11-15", email: "palesa@example.com" },
        { id: 3, applicantName: "Sipho Nkosi", program: "Cloud Computing Certification", status: "Accepted", appliedDate: "2025-11-10", email: "sipho@example.com" },
    ];
    // --- End Placeholder Data ---

    // Function to map status to Chip color
    const getStatusChip = (status) => {
        let color, label;
        switch (status) {
            case "New":
                color = "primary";
                label = "NEW";
                break;
            case "Reviewed":
                color = "warning";
                label = "REVIEWED";
                break;
            case "Accepted":
                color = "success";
                label = "ACCEPTED";
                break;
            case "Rejected":
                color = "error";
                label = "REJECTED";
                break;
            default:
                color = "default";
                label = status.toUpperCase();
        }
        return <Chip label={label} color={color} size="small" />;
    };

    // useEffect(() => { /* ... application fetching logic ... */ }, []);

    return (
        <Box sx={{ p: 4 }}>
            
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                📋 Application Dashboard
            </Typography>
            
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
                Review, track, and manage all incoming applications for your skill programs.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Grid container spacing={3}>
                
                {/* --- Loading State --- */}
                {loading ? (
                    <Grid item xs={12} sx={{ textAlign: 'center', py: 5 }}>
                        <CircularProgress />
                        <Typography sx={{ mt: 2 }}>Loading applications...</Typography>
                    </Grid>
                ) : applications.length === 0 ? (
                    /* --- Empty State --- */
                    <Grid item xs={12}>
                        <Paper elevation={1} sx={{ p: 4, textAlign: 'center', border: '2px dashed #ccc' }}>
                            <AssignmentTurnedIn sx={{ fontSize: 60, color: 'text.disabled', mb: 1 }} />
                            <Typography variant="h6">No Applications Yet!</Typography>
                            <Typography color="text.secondary">
                                Once learners start applying to your programs, they will appear here.
                            </Typography>
                        </Paper>
                    </Grid>
                ) : (
                    /* --- Application Cards --- */
                    applications.map((app) => (
                        <Grid item xs={12} md={6} lg={4} key={app.id}>
                            <Card variant="outlined" sx={{ '&:hover': { boxShadow: 3 } }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Applied: {app.appliedDate}
                                        </Typography>
                                        {getStatusChip(app.status)}
                                    </Box>
                                    
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 500, mt: 1 }}>
                                        <PersonOutline sx={{ verticalAlign: 'middle', mr: 1 }} />
                                        {app.applicantName}
                                    </Typography>
                                    
                                    <Typography variant="body2" color="primary.main" sx={{ mb: 2 }}>
                                        {app.program}
                                    </Typography>
                                    
                                    <List dense disablePadding sx={{ mb: 2 }}>
                                        <ListItem disableGutters>
                                            <ListItemText 
                                                primary={<>Email: <a href={`mailto:${app.email}`}>{app.email}</a></>}
                                                primaryTypographyProps={{ variant: 'body2' }}
                                            />
                                        </ListItem>
                                    </List>

                                    <Box sx={{ display: 'flex', gap: 1, pt: 1 }}>
                                        <Button 
                                            variant="contained" 
                                            size="small"
                                            color="success"
                                        >
                                            View Details
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            size="small"
                                            color="secondary"
                                            startIcon={<EmailOutlined />}
                                        >
                                            Contact
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default Applications;