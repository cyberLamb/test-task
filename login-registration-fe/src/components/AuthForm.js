import React from 'react';
import InputField from './InputField';
import { useTranslation } from 'react-i18next';
import useAuthForm from '../hooks/useAuthForm';

const AuthForm = ({ mode, onSubmit }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, errors } = useAuthForm(mode);

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <InputField 
        name="email"
        type="email"
        label={t('email')}
        register={register}
        validation={{ required: true }}
        error={errors.email}
      />
      
      <InputField 
        name="password"
        type="password"
        label={t('password')}
        register={register}
        validation={{ required: true, minLength: 6 }}
        error={errors.password}
      />

      <button type="submit" className="btn-submit">{t('submit')}</button>
    </form>
  );
};

export default AuthForm;
