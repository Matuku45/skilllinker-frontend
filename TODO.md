# Phase 1 MVP Implementation Plan

## Overview
Implement the MVP for SkillLinker app with core features: Practitioner + SDP onboarding, Job board & simple messaging, Manual verification, Basic admin dashboard.

## Steps
1. Create mock data structures in src/data/
2. Create authentication context and hooks
3. Enhance Register/Login for user type handling and redirection
4. Implement Job Board for Assessor/Moderator dashboard
5. Implement Post Job functionality for SDP dashboard
6. Create simple messaging system
7. Implement Admin Dashboard with user management
8. Add manual verification for practitioners
9. Update App.jsx with protected routes
10. Add routing for all dashboards
11. Test integrations and fix issues
12. Commit changes (aim for 20 commits)
13. Push to main branch

## Detailed Breakdown
- **Data Layer**: Mock users, jobs, messages
- **Auth**: Context for login state, user type
- **Dashboards**: Separate for Assessor/Moderator, SDP, Admin
- **Job Board**: List jobs, apply, post jobs
- **Messaging**: Basic chat between users
- **Admin**: Verify practitioners, manage users/jobs
