//App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SignIn from './components/Login';
import Register from './components/Register';
import CustomerPage from './components/CustomerPage';
import Owner from './components/Owner';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import AdminPage from './components/AdminPage';
import PGDetails from "./components/PGDetails";
import ViewFavorites from './components/ViewFavorites';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          {/* Header with navigation */}
          <Header />

          {/* Routes for landing page */}
          <Routes>
            {/* Define landing page */}
            <Route
              path="/"
              element={
                <div>
                  <Hero />
                  <About />
                  <Features />
                  <Contact />
                  
                </div>
              }
            />
            <Route path="#Features" element={<Features />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/owner/:type" element={<Owner />} />
            <Route path="/" element={<Features />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/" element={<CustomerPage />} />
            
            <Route path="/pg/:pgId" element={<PGDetails />} />

            <Route path="/favorites" element={<ViewFavorites />} /> 

          </Routes>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
