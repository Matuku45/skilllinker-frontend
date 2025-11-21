import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Public Pages
import Home from './pages/Public_Pages/Home';
import About from './pages/Public_Pages/About';
import Services from './pages/Public_Pages/Services';
import Contact from './pages/Public_Pages/Contact';
import Blog from './pages/Public_Pages/Blog';
import Careers from './pages/Public_Pages/Careers';
import Events from './pages/Public_Pages/Events';
import FAQ from './pages/Public_Pages/FAQ';
import Pricing from './pages/Public_Pages/pRICING.JSX';
import Testimonials from './pages/Public_Pages/Testimonials';
import PrivacyPolicy from './pages/Public_Pages/PrivacyPolicy';
import TermsAndConditions from './pages/Public_Pages/TermsAndConditions';
import HelperCenter from './pages/Public_Pages/HelperCenter';
import Login from './pages/Public_Pages/Login';
import Register from './pages/Public_Pages/Register';
import ForgotPassword from './pages/Public_Pages/ForgotPassword';
import Notifications from './pages/Skill_Development_Provider_Dashboard/Notifications';
import { AssessorProvider } from './contexts/AssessorContext';
// Import Profile
import Profile from './pages/Assessor_Moderator_Dashboard/Profile';
import JobDetails from './pages/Assessor_Moderator_Dashboard/JobDetails';
import Payment from './pages/Assessor_Moderator_Dashboard/Payment';
// Dashboard Pages
import ModeratorAssessorDashboard from './pages/Assessor_Moderator_Dashboard/Moderator_Assessor_Dashboard';
import SDS_Dashboard from './pages/Skill_Development_Provider_Dashboard/SDS_Dashboard';
import AdminDashboard from './pages/Admin_Dashboard/Admin_Dashboard';
import Applications from './pages/Assessor_Moderator_Dashboard/Applications';
import Profile3 from './pages/Skill_Development_Provider_Dashboard/Profile';
// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Applications2 from './pages/Skill_Development_Provider_Dashboard/Applications';
// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser?.userType)) {
    // Redirect to appropriate dashboard based on user type
    if (currentUser?.userType === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (currentUser?.userType === 'sdp') return <Navigate to="/sdp/dashboard" replace />;
    return <Navigate to="/assessor/dashboard" replace />;
  }

  return children;
};

// App Wrapper to conditionally render Header
const AppWrapper = () => {
  const location = useLocation();

  // Hide header for all dashboard routes
  const hideHeaderRoutes = ['/admin', '/sdp', '/assessor'];
  const hideHeader = hideHeaderRoutes.some((path) => location.pathname.startsWith(path));

// Public Route Component (redirects authenticated users)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    // Redirect authenticated users to their dashboard
    return <Navigate to="/assessor/dashboard" replace />;
  }
  return children;
};


  return (
    <>
      {!hideHeader && <Header />}
      <main className={!hideHeader ? 'pt-20' : ''}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/helper-center" element={<HelperCenter />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Dashboard Routes */}
   <Route
  path="/assessor/dashboard"
  element={
    <ProtectedRoute allowedRoles={['assessor', 'moderator']}>
      <AssessorProvider>
        <ModeratorAssessorDashboard />
      </AssessorProvider>
    </ProtectedRoute>
  }
/>

          <Route
            path="/sdp/dashboard"
            element={
              <ProtectedRoute allowedRoles={['sdp']}>
                <SDS_Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

{/* Job Details Route */}
 <Route path="/job-details/:jobId" 
 element={ <ProtectedRoute allowedRoles={['assessor', 'moderator']}>
 <AssessorProvider> <JobDetails />
  </AssessorProvider> </ProtectedRoute> } />


{/* Notifications Route (Shared) */}
        <Route 
          path="/notifications"
          element={
            <ProtectedRoute allowedRoles={['assessor', 'moderator', 'sdp', 'admin']}> 
              <Notifications />
            </ProtectedRoute>
          }
        />

  {/* Profile Route (Assessor/Moderator/Admin - generic) */}
  <Route
    path="/profile"
    element={
      <ProtectedRoute allowedRoles={['assessor', 'moderator', 'admin']}>
        <Profile />
      </ProtectedRoute>
    }
  />

  {/* Applications Route (Assessor/Moderator) */}
  <Route
    path="/applications"
    element={
      <ProtectedRoute allowedRoles={['assessor', 'moderator']}>
        <AssessorProvider>
          <Applications />
        </AssessorProvider>
      </ProtectedRoute>
    }
  />

  {/* Payment Route (Assessor/Moderator) */}
  <Route
    path="/payment"
    element={
      <ProtectedRoute allowedRoles={['assessor', 'moderator']}>
        <Payment />
      </ProtectedRoute>
    }
  />
  

  {/* Applications Route for SDP */}
  <Route
    path="/sdp/applications"      
    element={
      <ProtectedRoute allowedRoles={['sdp']}>
        <Applications2 />
      </ProtectedRoute>
    }
  />  


  {/* Profile Route for SDP **<-- ADDED THIS ROUTE** */}
  <Route
    path="/sdp/profile" 
    element={
      <ProtectedRoute allowedRoles={['sdp']}>
        <Profile3 />
      </ProtectedRoute>
    }
  />  
    




          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hideHeader && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppWrapper />
      </Router>
    </AuthProvider>
  );
}

export default App;