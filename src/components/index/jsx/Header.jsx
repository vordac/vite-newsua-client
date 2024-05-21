import React, { useEffect, useState } from 'react';
import '../css/header.css';
import DropdownUser from './DropdownUser';
import DropdownSort from './DropdownSort';
import DropdownAuth from './DropdownAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = ({ user, auth, selectedCategory, sortingType, sortingDirection, setSelectedCategory, setSortingType, setSortingDirection }) => {

    const handleCategoryClick = (category) => {
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
                    <a onClick={() => handleCategoryClick('Бізнес')}>БІЗНЕС</a><br />
                    <a onClick={() => handleCategoryClick('Технології')}>ТЕХНОЛОГІЇ</a><br />
                    <a onClick={() => handleCategoryClick('Культура')}>КУЛЬТУРА</a><br />
                    <a onClick={() => handleCategoryClick('Здоров\'я')}>ЗДОРОВ'Я</a><br />
                    <a onClick={() => handleCategoryClick('Спорт')}>СПОРТ</a><br />
                    <a onClick={() => handleCategoryClick('Ігри')}>ІГРИ</a><br />
                </div>
                <div className='header-manage'>

                    <div className="sorting-dropdown-button">
                        <DropdownSort sortingType={sortingType} sortingDirection={sortingDirection} setSortingType={setSortingType} setSortingDirection={setSortingDirection}/>
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
