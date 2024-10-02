import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Verification from './pages/Verification';
import AuthProvider from './context/AuthContext';
import UserDetail from './pages/UserDetail';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/user/:userId" element={<UserDetail />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
