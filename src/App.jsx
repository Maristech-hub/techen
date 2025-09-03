import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account'; // Import at the top
import AdminDashboard from './pages/AdminDashboard';
import MyRequests from './pages/MyRequests';
import QuoteForm from './pages/QuoteForm';
import Contact from './pages/Contact';
import Header from './components/Header'; // <-- Add this
import Footer from './components/Footer';
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <Header /> {/* Header now includes Navbar and more */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/quote" element={<QuoteForm />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;