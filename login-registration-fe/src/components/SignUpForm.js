import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Modal from '../components/Modal/index'
import { useNavigate } from 'react-router-dom';

const locationsData = {
  am: {
    cities: [
      { value: 'yerevan', label: 'Yerevan' },
      { value: 'gyumri', label: 'Gyumri' }
    ],
    villages: [
      { value: 'village1', label: 'Village 1' },
      { value: 'village2', label: 'Village 2' }
    ],
    schools: [
      { value: 'school1', label: 'School 1' },
      { value: 'school2', label: 'School 2' }
    ]
  },
  us: {
    cities: [
      { value: 'newyork', label: 'New York' },
      { value: 'losangeles', label: 'Los Angeles' }
    ],
    villages: [
      { value: 'village3', label: 'Village 3' },
      { value: 'village4', label: 'Village 4' }
    ],
    schools: [
      { value: 'school3', label: 'School 3' },
      { value: 'school4', label: 'School 4' }
    ]
  }
};

const regionOptions = [
  { value: 'region1', label: 'Region 1' },
  { value: 'region2', label: 'Region 2' },
  { value: 'region3', label: 'Region 3' }
];

const subjects = [
  { value: 'math', label: 'Mathematics' },
  { value: 'science', label: 'Science' },
  { value: 'literature', label: 'Literature' }
];

const grades = [
  { value: 'grade1', label: 'Grade 1' },
  { value: 'grade2', label: 'Grade 2' },
  { value: 'grade3', label: 'Grade 3' }
];

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [cityVillage, setCityVillage] = useState(null);
  const [school, setSchool] = useState(null);
  const [region, setRegion] = useState(null);
  const [cities, setCities] = useState([]);
  const [villages, setVillages] = useState([]);
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation(); 
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = {
      ...data,
      subjects: selectedSubjects.map(subject => subject.value),
      grades: selectedGrades.map(grade => grade.value),
      cityVillage: cityVillage?.value,
      school: school?.value,
      region: region?.value
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) { 
        setModalMessage('Registration successful! Please check your email for the verification code.');
      } else {
        setModalMessage(`Registration failed: ${result.message}`);
      }
      setModalOpen(true);

    } catch (error) {
      console.error('An error occurred:', error);
      setModalMessage('Registration failed. Please try again.' + error);
      setModalOpen(true);
    }
    setIsLoading(false);
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const closeModal = () => {
    setModalOpen(false);
    navigate('/verify')
  };
  const handleCountryChange = (country) => {
    setCountry(country);
    setValue('country', country.label);

    setCityVillage(null);
    setSchool(null);

    const countryCode = country.value.toLowerCase();
    setCities(locationsData[countryCode]?.cities || []);
    setVillages(locationsData[countryCode]?.villages || []);
    setSchools(locationsData[countryCode]?.schools || []);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">

      <div className="input-field name">
        <label htmlFor="name">{t('name')}</label>
        <input id="name" placeholder={t('name')} {...register('name', { required: t('nameRequired') })} />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <div className="input-field email">
        <label htmlFor="email">{t('email')}</label>
        <input id="email" placeholder={t('email')} type="email" {...register('email', {
          required: t('emailRequired'),
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: t('emailPattern')
          }
        })} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      <div className="input-field">
        <label htmlFor="country">{t('country')}</label>
        <Select options={countryList().getData()} value={country} placeholder={t('country')} onChange={handleCountryChange} required/>
      </div>

      <div className="input-field">
        <label htmlFor="region">{t('region')}</label>
        <Select options={regionOptions} value={region} onChange={setRegion} placeholder={t('region')} required/>
      </div>

      <div className="input-field">
        <label htmlFor="cityVillage">{t('cityVillage')}</label>
        <Select options={cities.length > 0 ? cities : villages} value={cityVillage} onChange={setCityVillage} placeholder={t('cityVillage')} required/>
      </div>

      <div className="input-field">
        <label htmlFor="school">{t('school')}</label>
        <Select options={schools} value={school} onChange={setSchool} placeholder={t('school')} required/>
      </div>

      <div className="input-field">
        <label htmlFor="subjects">{t('subjects')}</label>
        <Select isMulti options={subjects} value={selectedSubjects} placeholder={t('subjects')} onChange={setSelectedSubjects} required />
      </div>

      <div className="input-field">
        <label htmlFor="grades">{t('grades')}</label>
        <Select isMulti options={grades} value={selectedGrades} placeholder={t('grades')} onChange={setSelectedGrades} />
      </div>

      <div className="input-field">
        <label htmlFor="password">{t('password')}</label>
        <div className="password-wrapper">
          <input id="password" type={showPassword ? 'text' : 'password'} placeholder={t('password')} {...register('password', {
            required: t('passwordRequired'),
            minLength: { value: 6, message: t('passwordMinLength') }
          })} />
          <span onClick={togglePasswordVisibility} className="eye-icon">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>

      <div className="input-field">
        <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
        <div className="password-wrapper">
          <input id="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder={t('confirmPassword')} {...register('confirmPassword', {
            required: t('confirmPasswordRequired'),
            validate: value => value === watch('password') || t('passwordsDoNotMatch')
          })} />
          <span onClick={togglePasswordVisibility} className="eye-icon">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
      </div>

      <button className='btn-submit' type="submit" disabled={isLoading}>
        {isLoading ? t('Loading') : t('Ok')}
      </button>

      <Modal isOpen={modalOpen} onClose={closeModal} message={modalMessage} />
    </form>
  );
};

export default SignUpForm;
