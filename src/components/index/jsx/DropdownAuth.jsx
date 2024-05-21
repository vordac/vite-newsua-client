import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/index-dropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function DropdownAuth() {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLoginClick = () => {
        navigate('/login');
    }

    const handleRegisterClick = () => {
        navigate('/register');
    }

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

    return (
        <div className="index-dropdown">
            <div className="index-dropdown-icon" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faUser} />
            </div>
            <div className={`index-dropdown-content ${isOpen ? 'show' : ''}`}>
                <a onClick={handleLoginClick}>Авторизація</a>
                <a onClick={handleRegisterClick}>Реєстрація</a>
            </div>
        </div>
    );
}

export default DropdownAuth;
