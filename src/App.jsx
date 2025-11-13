import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Public_Pages/Home.jsx";
import About from "./pages/Public_Pages/About.jsx";
import Blog from "./pages/Public_Pages/Blog.jsx";
import Careers from "./pages/Public_Pages/Careers.jsx";
import Events from "./pages/Public_Pages/Events.jsx";
import FAQ from "./pages/Public_Pages/FAQ.jsx";
import Pricing from "./pages/Public_Pages/pRICING.JSX";
import Contact from "./pages/Public_Pages/Contact.jsx";
import Services from "./pages/Public_Pages/Services.jsx";
import Login from "./pages/Public_Pages/Login.jsx";
import Register from "./pages/Public_Pages/Register.jsx";
import Testimonials from "./pages/Public_Pages/Testimonials.jsx";
import ForgotPassword from "./pages/Public_Pages/ForgotPassword.jsx";
import PrivacyPolicy from "./pages/Public_Pages/PrivacyPolicy.jsx";
import TermsAndConditions from "./pages/Public_Pages/TermsAndConditions.jsx";
import HelperCenter from "./pages/Public_Pages/HelperCenter.jsx";

function App() {
  return (
    <Router>
      <Header />
      <div className="mt-20">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/help" element={<HelperCenter />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
