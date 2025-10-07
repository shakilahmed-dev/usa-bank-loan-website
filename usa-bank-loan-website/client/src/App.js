import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoanServices from './pages/LoanServices';
import Contact from './pages/Contact';
import ApplicationForm from './pages/ApplicationForm';
import ThankYou from './pages/ThankYou';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loan-services" element={<LoanServices />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/apply-now" element={<ApplicationForm />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;