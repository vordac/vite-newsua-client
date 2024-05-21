import React, { useEffect, useState } from 'react';
import '../css/header.css';
import DropdownUser from './DropdownUser';
import DropdownSort from './DropdownSort';
import DropdownAuth from './DropdownAuth';
import '../css/index-dropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, auth, selectedCategory, sortingType, sortingDirection, setSelectedCategory, setSortingType, setSortingDirection }) => {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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

    const handleCategoryClick = (category) => {
        navigate('/');
        setSelectedCategory(category);
    };

    return (
        <header className="header">

            <div className="header-row">

                <div className='links-row'>
                    <div className='logo' >
                        <a onClick={() => handleCategoryClick('')}>NEWSUA</a><br />
                    </div>
                    <a onClick={() => handleCategoryClick('Україна')}>УКРАЇНА</a><br />
                    <a onClick={() => handleCategoryClick('Світ')}>СВІТ</a><br />
                    
                    <div className="index-dropdown">
                        <a onClick={toggleDropdown}>ЩЕ</a>
                        <div className={`index-dropdown-content ${isOpen ? 'show' : ''}`}>
                            <a onClick={() => handleCategoryClick('Бізнес')}>БІЗНЕС</a>
                            <a onClick={() => handleCategoryClick('Технології')}>ТЕХНОЛОГІЇ</a>
                            <a onClick={() => handleCategoryClick('Культура')}>КУЛЬТУРА</a>
                            <a onClick={() => handleCategoryClick('Здоров\'я')}>ЗДОРОВ'Я</a>
                            <a onClick={() => handleCategoryClick('Спорт')}>СПОРТ</a>
                            <a onClick={() => handleCategoryClick('Ігри')}>ІГРИ</a>
                        </div>
                    </div>
                </div>
                <div className='header-manage'>

                    <div className="sorting-dropdown-button">
                        <DropdownSort sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection} />
                    </div>
                    <div className='auth-controller'>
                        {user ? (
                            <DropdownUser auth={auth} />
                        ) : (
                            <DropdownAuth />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
