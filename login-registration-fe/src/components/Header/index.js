import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './style.css'
import Logo from '../../assets/images/logo.png'
import LoginIcon from '../../assets/images/coolicon.svg'
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const location = useLocation(); 
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const renderAuthLink = () => {
    if (isAuthenticated) {
      return (
        <Link className='login' onClick={handleLogout} to="/login">
          <img src={LoginIcon} alt="Sign Out" />
          Sign Out
        </Link>
      );
    } else if (location.pathname === '/login') {
      return (
        <Link className='login' to="/register">
          <img src={LoginIcon} alt="Signup" />
          Signup
        </Link>
      );
    } else if (location.pathname === '/register' || location.pathname === "/") {
      return (
        <Link className='login' to="/login">
          <img src={LoginIcon} alt="Signin" />
          Signin
        </Link>
      );
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      console.log(response, 'response')
      if (response.ok) {
        console.log('Logged out successfully');
        setIsAuthenticated(false);
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang)
  };

  const getButtonStyle = (lang) => ({
    color: selectedLanguage === lang ? 'white' : 'rgba(255,255,255,.5)',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    fontWeight: 'bold',
  });

  return (
    <header className="header">
        <div className='header-content'>
            <div></div>
            <div className="logo-container">
                <img src={Logo} alt="Logo" className="logo" />
            </div>
            <div className="language-selector">
                <button style={getButtonStyle('en')} onClick={() => changeLanguage('en')}>Eng</button>
                <button style={getButtonStyle('hy')} onClick={() => changeLanguage('hy')}>Հայ</button>
                <button style={getButtonStyle('ru')} onClick={() => changeLanguage('ru')}>Рус</button>
            </div>
        </div>
      <nav className="nav-links">
        <ul>
          <li><Link to="/teachers">TEACHERS</Link></li>
          <li><Link to="/donors">DONORS</Link></li>
          <li><Link to="/about">ABOUT US</Link></li>
          <li><Link to="/contact">CONTACT US</Link></li>
          <li><Link to="/blog">BLOG</Link></li>
        </ul>
        {renderAuthLink()}
      </nav>
    </header>
  );
};

export default Header;
