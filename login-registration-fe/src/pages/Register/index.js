import React from 'react';
import { useTranslation } from 'react-i18next';
import SignUpForm from '../../components/SignUpForm';

const Register = () => {
  const { t } = useTranslation();

  return (
    <div className="auth-container">
      <h2>{t('register')}</h2>
      <SignUpForm />
    </div>
  );
};

export default Register;
