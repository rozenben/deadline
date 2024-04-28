import React, { useState } from 'react';

const LanguageSelector = ({ languages, defaultLanguage, onSelectLanguage }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setSelectedLanguage(selectedLanguage);
    onSelectLanguage(selectedLanguage);
  };

  return (
    <div>
      <label className='mr-2' htmlFor="language">Language:</label>
      <select id="language" value={selectedLanguage} onChange={handleLanguageChange}>
        {languages.map(language => (
          <option key={language.code} value={language.code}>{language.name}</option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
