import React, { useState, useEffect } from 'react';
import { useAuth } from "../../contexts/AuthContext";

import { 
    Box, 
    Typography, 
    Paper, 
    Grid, 
    TextField, 
    Button, 
    CircularProgress, 
    Alert, 
    Avatar,
    InputAdornment, // Import for input icons
} from '@mui/material';

// Import icons for a nicer touch
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SaveIcon from '@mui/icons-material/Save';


// To simulate an update without an actual API call:
const simulateUpdate = (data) => new Promise(resolve => setTimeout(() => resolve(data), 1000));


const Profile = () => {
    const { currentUser } = useAuth();
    
    // State to hold the profile data
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        userType: 'Provider',
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: null, message: '' }); 

    // Initialize data from currentUser
    useEffect(() => {
        if (currentUser) {
            setProfileData({
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '', 
                userType: currentUser.userType || 'User', // Changed default to 'User'
            });
        }
    }, [currentUser]); 

    // Handle form input changes
    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission (Simulated/Local Update only)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: null, message: '' });
        
        try {
            await simulateUpdate(profileData); 
            setStatus({ type: 'success', message: 'Profile details saved locally! (No API update performed)' });
            
        } catch (error) {
            console.error('Local profile update failed:', error);
            setStatus({ type: 'error', message: 'Failed to save local profile changes.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Render Logic ---
    if (!currentUser) {
        return (
            <Box sx={{ p: 5 }}>
                <Alert severity="warning">You must be logged in to view this page.</Alert>
            </Box>
        );
    }
    
    return (
        <Box 
            sx={{ 
                p: { xs: 2, md: 5 }, 
                backgroundColor: '#f4f7f6', // Light background for the page
                minHeight: '100vh' 
            }}
        >
            <Typography variant="h3" color="primary" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                🛠️ Profile Settings
            </Typography>

            <Paper 
                elevation={6} // Higher elevation for a floating effect
                sx={{ 
                    p: { xs: 3, md: 5 }, 
                    mt: 3, 
                    borderRadius: 3, // Rounded corners
                    maxWidth: 800, // Constrain width for better design
                    mx: 'auto' // Center the paper
                }}
            >
                <Grid container spacing={5} component="form" onSubmit={handleSubmit}>
                    
                    {/* --- Profile Header (Avatar and Type) --- */}
                    <Grid item xs={12} sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        pb: 3, // Add padding below
                        borderBottom: '1px solid #e0e0e0' // Separator line
                    }}>
                        
                        {/* Avatar */}
                        <Avatar sx={{ 
                            width: 100, 
                            height: 100, 
                            mb: 2, 
                            bgcolor: 'secondary.main', // A nice accent color
                            fontSize: '2.5rem'
                        }}>
                            {profileData.firstName ? profileData.firstName[0].toUpperCase() : 'U'}
                        </Avatar>
                        
                        {/* CHANGE AVATAR BUTTON - Styled */}
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            size="medium"
                            startIcon={<CameraAltIcon />}
                            sx={{ mt: -2, zIndex: 1, textTransform: 'none' }} // Float button slightly
                        >
                            Upload Photo
                        </Button>

                        {/* User Type Display */}
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
                            Account Type: **{profileData.userType}**
                        </Typography>
                    </Grid>

                    {/* --- Contact Information Section --- */}
                    <Grid item xs={12}>
                        <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 500 }}>
                            Contact Information
                        </Typography>
                    </Grid>
                    
                    {/* First Name */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Last Name */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Email Address (Read-Only)"
                            name="email"
                            value={profileData.email}
                            disabled
                            variant="filled" // Use filled variant to clearly show it's disabled/read-only
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="disabled" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Phone Number */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleChange}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* --- Status & Submit --- */}
                    <Grid item xs={12}>
                        {status.type === 'success' && (
                            <Alert severity="success" sx={{ mb: 2 }}>{status.message}</Alert>
                        )}
                        {status.type === 'error' && (
                            <Alert severity="error" sx={{ mb: 2 }}>{status.message}</Alert>
                        )}
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            size="large"
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                            sx={{ padding: '10px 30px', fontWeight: 'bold' }}
                        >
                            {isSubmitting ? 'Saving Changes...' : 'Save Profile'}
                        </Button>
                    </Grid>
                    
                </Grid>
            </Paper>
        </Box>
    );
};

export default Profile;