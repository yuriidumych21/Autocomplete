import React, { useState, useEffect } from 'react';

interface AutoCompleteProps {
  suggestions: string[];
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ suggestions }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      // Simulate a REST call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newFilteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(newFilteredSuggestions);
      setLoading(false);
    };

    fetchSuggestions();
  }, [inputValue, suggestions]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <div className='autocomplete'>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Type here...'
        className='input'
        onFocus={() => setInputFocused(true)}
      />
      {loading && <div className='loading'>Loading...</div>}
      {filteredSuggestions.length > 0 && !loading && inputFocused && (
        <ul className='suggestion-list'>
          {filteredSuggestions.map((suggestion, index) => {
            const parts = suggestion.split(new RegExp(`(${inputValue})`, 'gi'));
            return (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className='suggestion-item'
              >
                {parts.map((part, index) =>
                  part.toLowerCase() === inputValue.toLowerCase() ? (
                    <strong key={index} className='highlight'>
                      {part}
                    </strong>
                  ) : (
                    part
                  )
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
