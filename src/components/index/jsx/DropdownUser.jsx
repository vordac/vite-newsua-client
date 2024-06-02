import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/index-dropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function DropdownUser({ auth, userRole }) {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log(userRole);
  };

  const handleNewClick = () => {
    navigate('/new');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSignoutClick = () => {
    if (auth) {
      auth.signOut();
      navigate('/');
    }
  };

  const handleMyNewsClick = () => {
    navigate('/my-news');
  }

  const handleAdminPanelClick = () => {
    navigate('/admin');
  }

  const handleModerPanelClick = () => {
    navigate('/moder');
  }

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

  if (userRole === 'admin') {
    return (
      <div className="index-dropdown">
        <div className="index-dropdown-icon" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className={`index-dropdown-content ${isOpen ? 'show' : ''}`}>
          <a onClick={handleNewClick}>Створити новину</a>
          <a onClick={handleProfileClick}>Профіль</a>
          <a onClick={handleMyNewsClick}>Мої новини</a>
          <a onClick={handleAdminPanelClick}>Панель адміна</a>
          <a onClick={handleSignoutClick}>Вийти з акаунту</a>
        </div>
      </div>
    )
  } else if (userRole === 'moderator') {
    return (
      <div className="index-dropdown">
        <div className="index-dropdown-icon" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className={`index-dropdown-content ${isOpen ? 'show' : ''}`}>
          <a onClick={handleNewClick}>Створити новину</a>
          <a onClick={handleProfileClick}>Профіль</a>
          <a onClick={handleMyNewsClick}>Мої новини</a>
          <a onClick={handleModerPanelClick}>Панель модера</a>
          <a onClick={handleSignoutClick}>Вийти з акаунту</a>
        </div>
      </div>
    )
  } else {
    return (
      <div className="index-dropdown">
        <div className="index-dropdown-icon" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className={`index-dropdown-content ${isOpen ? 'show' : ''}`}>
          <a onClick={handleNewClick}>Створити новину</a>
          <a onClick={handleProfileClick}>Профіль</a>
          <a onClick={handleMyNewsClick}>Мої новини</a>
          <a onClick={handleSignoutClick}>Вийти з акаунту</a>
        </div>
      </div>
    );
  }


}

export default DropdownUser;
