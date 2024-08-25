import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
interface SearchBarProps {
  onSearch: (query: string) => void;
  suggestions: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, suggestions }) => {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  const handleSearch = () => {
    setFilteredSuggestions([]);
    onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setFilteredSuggestions([]); // Close the suggestions box
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex " ref={containerRef}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="border p-2 rounded-l-2xl w-full"
        placeholder="Search for a widget..."
      />
      <button
        onClick={handleSearch}
        className="bg-indigo-400 text-white p-2 rounded-r-2xl"
      >
        <Search className='w-5 h-5 text-white'/>
      </button>
      {filteredSuggestions.length > 0 && (
        <ul className="absolute bg-white border mt-12 rounded-lg w-full z-10">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(suggestion);
                setFilteredSuggestions([]);
                onSearch(suggestion);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
