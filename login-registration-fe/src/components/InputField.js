import React from 'react';

const InputField = ({ name, type, label, register, validation, error }) => {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input 
        id={name}
        name={name}
        type={type}
        {...register(name, validation)}
      />
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
};

export default InputField;
