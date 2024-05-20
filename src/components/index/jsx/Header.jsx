import React, { useEffect, useState } from 'react';
import DropdownUser from './DropdownUser';
import DropdownSort from './DropdownSort';
import '../css/header.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSearch } from '@fortawesome/free-solid-svg-icons';

// const Header = ({ setSelectedCategory, setSortingType, setSortingDirection, selectedCategory, sortingType, sortingDirection, onSearch }) => {
const Header = ({ user, selectedCategory, sortingType, sortingDirection, setSelectedCategory, setSortingType, setSortingDirection }) => {

    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleSortingClick = (sortingType, sortingDirection) => {
        setSortingType(sortingType);
        setSortingDirection(sortingDirection);
    };

    const handleLogClick = () => {
        navigate('/login');
    };

    const handleRegClick = () => {
        navigate('/register');
    }

    return (
        <header className="header">

            <div className="header-row">

                <div className='links-row'>
                    <div className='logo' >
                        <a onClick={() => handleCategoryClick('')}>NEWSUA</a><br />
                    </div>
                    <a onClick={() => handleCategoryClick('Україна')}>УКРАЇНА</a><br />
                    <a onClick={() => handleCategoryClick('Світ')}>СВІТ</a><br />
                    <a onClick={() => handleCategoryClick('Бізнес')}>БІЗНЕС</a><br />
                    <a onClick={() => handleCategoryClick('Технології')}>ТЕХНОЛОГІЇ</a><br />
                    <a onClick={() => handleCategoryClick('Культура')}>КУЛЬТУРА</a><br />
                    <a onClick={() => handleCategoryClick('Здоров\'я')}>ЗДОРОВ'Я</a><br />
                    <a onClick={() => handleCategoryClick('Спорт')}>СПОРТ</a><br />
                    <a onClick={() => handleCategoryClick('Ігри')}>ІГРИ</a><br />
                </div>
                <div className='header-manage'>
                    {/* <div className='search-button'>
            <div className="search-button-icon" onClick={handleSearchButton}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div> */}
                    <div className="sorting-dropdown-button">
                        <div className="sorting-dropdown-button-icon" >
                            <FontAwesomeIcon icon={faSort} />
                        </div>
                        <div className={`sorting-dropdown-content`}>
                            <a onClick={() => handleSortingClick('publishTime', 'desc')}>Нові</a><br /> {/* publishTime, desc */}
                            <a onClick={() => handleSortingClick('publishTime', 'asc')}>Старі</a><br /> {/* publishTime, asc */}
                            <a onClick={() => handleSortingClick('comments', 'desc')}>Обговорювані</a><br /> {/* comments, desc */}
                            <a onClick={() => handleSortingClick('rating', 'desc')}>Рейтингові</a><br /> {/* rating, desc */}
                            <a onClick={() => handleSortingClick('views', 'desc')}>Популярні</a><br /> {/* views, desc */}
                        </div>
                        <div className='auth-controller'>
                            {user ? (
                                <p>Bob</p>
                            ) : (
                                <p>Alice</p>
                            )}

                            <button onClick={handleRegClick}>Register</button>
                            <button onClick={handleLogClick}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
