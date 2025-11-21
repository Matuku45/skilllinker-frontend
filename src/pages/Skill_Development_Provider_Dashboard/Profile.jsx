import React, { useState, useEffect } from 'react';
import { useAuth } from "../../contexts/AuthContext";

import axios from 'axios';
import { 
    Box, 
    Typography, 
    Paper, 
    Grid, 
    TextField, 
    Button, 
    CircularProgress, 
    Alert, 
    Avatar 
} from '@mui/material';

const API_URL = "http://localhost:3000/api"; 

const Profile = () => {
    const { currentUser, logout } = useAuth();
    
    // State to hold the profile data
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        userType: 'Provider',
        companyName: '',
        description: '',
        // You might have more fields like address, website, etc.
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: null, message: '' }); // for success/error alerts

    // 1. Fetch data on component mount
    useEffect(() => {
        if (currentUser) {
            // NOTE: Ideally, you'd fetch the complete provider profile from a separate API endpoint 
            // (e.g., /api/providers/:id) if provider details are separate from base user details.
            // For simplicity, we initialize with user data and assume a provider profile extension.
            setProfileData({
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '', // Assuming phone is part of currentUser
                userType: currentUser.userType || 'Provider',
                companyName: currentUser.companyName || '', // Assuming provider-specific fields are here
                description: currentUser.description || '',
            });
        }
        // If you had a dedicated fetch function, you'd call it here:
        // fetchProviderProfile();
    }, [currentUser]);

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    // 2. Handle form submission (update profile)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: null, message: '' });
        
        try {
            if (!currentUser?.token) {
                throw new Error("User token missing. Please log in again.");
            }

            // Endpoint for updating user data (assuming the backend handles provider fields)
            const res = await axios.put(`${API_URL}/users/${currentUser.id}`, profileData, {
                headers: { 
                    Authorization: `Bearer ${currentUser.token}`,
                    'Content-Type': 'application/json',
                },
            });
            
            // Handle successful update
            setStatus({ type: 'success', message: 'Profile updated successfully!' });
            // Optionally, update the global currentUser state in AuthContext if needed
            
        } catch (error) {
            console.error('Profile update failed:', error);
            const msg = error.response?.data?.error || error.message || 'Failed to update profile.';
            setStatus({ type: 'error', message: msg });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                <CircularProgress />
            </Box>
        );
    }
    
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                ⚙️ Provider Profile Settings
            </Typography>

            <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
                <Grid container spacing={4} component="form" onSubmit={handleSubmit}>
                    
                    {/* --- Profile Picture/Avatar --- */}
                    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
                            {profileData.firstName ? profileData.firstName[0] : 'P'}
                        </Avatar>
                        <Button variant="outlined" size="small">
                            Change Avatar
                        </Button>
                    </Grid>

                    {/* --- Company Information --- */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 1 }}>Company Details</Typography>
                        <TextField
                            fullWidth
                            label="Company Name"
                            name="companyName"
                            value={profileData.companyName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Company Description / Bio"
                            name="description"
                            value={profileData.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            helperText="Provide a brief summary of your organization, services, and mission."
                        />
                    </Grid>
                    
                    {/* --- Contact Information --- */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>Contact Information</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Email Address (Read-Only)"
                            name="email"
                            value={profileData.email}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleChange}
                        />
                    </Grid>

                    {/* --- Status & Submit --- */}
                    <Grid item xs={12}>
                        {status.type === 'success' && (
                            <Alert severity="success">{status.message}</Alert>
                        )}
                        {status.type === 'error' && (
                            <Alert severity="error">{status.message}</Alert>
                        )}
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            disabled={isSubmitting}
                            startIcon={isSubmitting && <CircularProgress size={20} />}
                        >
                            {isSubmitting ? 'Saving...' : 'Update Profile'}
                        </Button>
                    </Grid>
                    
                </Grid>
            </Paper>
        </Box>
    );
};

export default Profile;