import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AuthForm from '../../components/AuthForm';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; 

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {

        localStorage.setItem('accessToken', result.accessToken);

        setIsAuthenticated(true);

        navigate(`/user/${result.id}`);
      } else {
        console.error('Login failed:', result.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="auth-container">
      <h2>{t('login')}</h2>
      <AuthForm mode="login" onSubmit={handleLogin} />
      <p>{t("don't_have_account")} <Link to="/register">{t('sign_up')}</Link></p>
    </div>
  );
};

export default Login;
