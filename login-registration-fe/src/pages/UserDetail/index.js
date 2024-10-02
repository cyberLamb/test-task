import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Modal from '../../components/Modal';

const UserDetail = () => {
  const { userId } = useParams();
  const { t } = useTranslation();
  
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
        setModalMessage('Failed to load user details. Please try again later.');
        setModalOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const closeModal = () => {
    setModalOpen(false);
  };

  if (isLoading) {
    return <div>{t('Loading...')}</div>;
  }

  if (error) {
    return <div>{t('Error: ' + error)}</div>;
  }

  return (
    <div className="user-detail">
      <h2>{t('user_details')}</h2>
      {user ? (
        <div className="user-info">
          <p><strong>{t('Name')}: </strong>{user.name}</p>
          <p><strong>{t('Email')}: </strong>{user.email}</p>
          <p><strong>{t('Phone')}: </strong>{user.phone}</p>
          <p><strong>{t('Country')}: </strong>{user.country}</p>
          <p><strong>{t('Region')}: </strong>{user.region}</p>
          <p><strong>{t('City/Village')}: </strong>{user.cityVillage}</p>
          <p><strong>{t('School')}: </strong>{user.school}</p>
          <p><strong>{t('Subjects')}: </strong>{user.subjects.join(', ')}</p>
          <p><strong>{t('Grades')}: </strong>{user.grades.join(', ')}</p>
        </div>
      ) : (
        <div>{t('User not found')}</div>
      )}
      <Modal isOpen={modalOpen} onClose={closeModal} message={modalMessage} />
    </div>
  );
};

export default UserDetail;
