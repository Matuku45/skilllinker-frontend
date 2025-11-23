const sequelize = require('../../config/database');

const { DataTypes } = require('sequelize');
// Import the User model
// This executes the function exported by the model file, creating the User model instance.
const User = require('../models/User')(sequelize, DataTypes); 

async function seedUsers() {
    try {
        // 1. Authenticate connection
        await sequelize.authenticate();
        console.log('✅ Database connection established');
        
        // 2. Sync all registered tables (User and any others)
        await sequelize.sync({ force: true }); // ⚠️ force: true drops tables and recreates them

        console.log('✅ All tables synced');
        
        // --- Sample Users Data ---
        const sampleUsers = [
            {
                firstName: 'Alice',
                lastName: 'Smith',
                email: 'alice@example.com',
                password: 'password123',
                phone: '0821234567',
                verified: true,
                userType: 'assessor', // Assessor user
                agreeToTerms: true
            },
            {
                firstName: 'Bob',
                lastName: 'Johnson',
                email: 'bob@example.com',
                password: 'password123',
                phone: '0839876543',
                verified: false,
                userType: 'moderator', // Moderator user
                agreeToTerms: true
            },
            {
                firstName: 'Charlie',
                lastName: 'Brown',
                email: 'charlie@example.com',
                password: 'password123',
                phone: '0845556677',
                verified: true,
                userType: 'sdp', // Service Delivery Provider (SDP) user
                agreeToTerms: false
            }
        ];

        // 3. Insert sample data
        await User.bulkCreate(sampleUsers);
        console.log('✅ Sample users inserted');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding users:', error);
        process.exit(1);
    }
}

// Run the seed
seedUsers();