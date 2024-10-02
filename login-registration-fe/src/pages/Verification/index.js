import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationCode }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Email verified successfully!');
        navigate('/login'); 
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Verification failed. Please try again.');
    }
  };

  return (
    <div className='auth-container'>
      <h2>{t('email_verification')}</h2>
      <form onSubmit={onSubmit}>
        <div className='input-field'>
          <input
            className='pr-5'
            type="text"
            placeholder={t("enter_verification_code")}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        <button className='btn-submit' type="submit">{t("verify")}</button>
      </form>
    </div>
  );
};

export default Verification;
