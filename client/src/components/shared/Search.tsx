 import { AiOutlineSearch } from 'react-icons/ai';
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate()

  const moveToSearchPage = () => {
    navigate("/search")
  }

  return (
    <div className="relative flex items-center bg-white rounded-full shadow-md px-4 py-2 w-full max-w-lg min-w-[720px]" onClick={moveToSearchPage}>
      {/* Search Icon */}
      <AiOutlineSearch size={24} className="text-gray-500 mr-3" />

      {/* Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=""
        className="outline-none text-gray-700 w-full bg-transparent placeholder-gray-400"
      />

      {/* Typing Animation Placeholder */}
      {inputValue === "" && !isFocused && (
        <div className="absolute left-12 text-gray-400 pointer-events-none" >
          <TypeAnimation
            sequence={[
              "Search for products...",
              2000,
              "Search for deals...",
              2000,
              "Search for brands...",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
            wrapper="span"
          />
        </div>
      )}
    </div>
  );
};

export default Search;

