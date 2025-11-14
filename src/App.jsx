import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

// Dashboard Pages
import ModeratorAssessorDashboard from './pages/Assessor_Moderator_Dashboard/Moderator_Assessor_Dashboard';
import SDPDashboard from './pages/SDP_Dashboard/SDP_Dashboard';
import AdminDashboard from './pages/Admin_Dashboard/Admin_Dashboard';

// Components
import Footer from './components/Footer';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser?.userType)) {
    // Redirect to appropriate dashboard based on user type
    if (currentUser?.userType === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (currentUser?.userType === 'sdp') {
      return <Navigate to="/sdp/dashboard" replace />;
    } else {
      return <Navigate to="/assessor/dashboard" replace />;
    }
  }

  return children;
};

// Public Route Component (redirects authenticated users)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth();

  if (isAuthenticated) {
    // Redirect to appropriate dashboard based on user type
    if (currentUser?.userType === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (currentUser?.userType === 'sdp') {
      return <Navigate to="/sdp/dashboard" replace />;
    } else {
      return <Navigate to="/assessor/dashboard" replace />;
    }
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
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

            {/* Auth Routes (redirect if authenticated) */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/assessor/dashboard"
              element={
                <ProtectedRoute allowedRoles={['assessor', 'moderator']}>
                  <ModeratorAssessorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sdp/dashboard"
              element={
                <ProtectedRoute allowedRoles={['sdp']}>
                  <SDPDashboard />
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

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
