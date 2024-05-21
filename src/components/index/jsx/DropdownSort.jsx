import React, { useState, useEffect } from 'react';
import '../css/index-dropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

function DropdownSort({ sortingType, sortingDirection, setSortingType, setSortingDirection }) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSortingClick = (sortingType, sortingDirection) => {
    setSortingType(sortingType);
    setSortingDirection(sortingDirection);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.index-dropdown')) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="index-dropdown">
      <div className="index-dropdown-icon" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faSort} />
      </div>
      <div className={`index-dropdown-content ${isOpen ? 'show' : ''}`}>
        <a onClick={() => handleSortingClick('publishTime', 'desc')}>Нові</a> {/* publishTime, desc */}
        <a onClick={() => handleSortingClick('publishTime', 'asc')}>Старі</a> {/* publishTime, asc */}
        <a onClick={() => handleSortingClick('comments', 'desc')}>Обговорювані</a> {/* comments, desc */}
        <a onClick={() => handleSortingClick('rating', 'desc')}>Рейтингові</a> {/* rating, desc */}
        <a onClick={() => handleSortingClick('views', 'desc')}>Популярні</a>{/* views, desc */}
      </div>
    </div>
  );
}

export default DropdownSort;
