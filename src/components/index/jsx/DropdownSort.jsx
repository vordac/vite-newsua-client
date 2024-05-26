import React, { useState, useEffect, useNavigate } from 'react';
import '../css/index-dropdown.css';

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
    <div className='sort'>
      <div className="index-dropdown">
        <div className="index-dropdown-icon" onClick={toggleDropdown}>Сортування</div>
        <div className={`index-dropdown-content ${isOpen ? 'show' : ''}`}>
          <a onClick={() => handleSortingClick('publishTime', 'desc')}>Нові</a> {/* publishTime, desc */}
          <a onClick={() => handleSortingClick('publishTime', 'asc')}>Старі</a> {/* publishTime, asc */}
          <a onClick={() => handleSortingClick('rating', 'desc')}>Рейтингові</a> {/* rating, desc */}
          <a onClick={() => handleSortingClick('views', 'desc')}>Популярні</a>{/* views, desc */}
        </div>
      </div>
    </div>
  );
}

export default DropdownSort;
