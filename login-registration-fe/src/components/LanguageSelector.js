import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-selector">
      <button onClick={() => changeLanguage('en')}>EN</button>
      <button onClick={() => changeLanguage('hy')}>HY</button>
    </div>
  );
};

export default LanguageSelector;
