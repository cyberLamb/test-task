import React from 'react';

const MultiSelectField = ({ name, label, options, register }) => {
  return (
    <div className="multi-select-field">
      <label>{label}</label>
      <select name={name} {...register(name)} multiple>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiSelectField;
