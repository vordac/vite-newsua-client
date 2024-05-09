// import React, { useEffect, useState } from 'react';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { app } from '../../../services/Firebase';
// import Swal from 'sweetalert2';
// import AuthController from './AuthController';
// import { useNavigate } from 'react-router-dom';
// import UserDropdown from './UserDropdown';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSort, faSearch } from '@fortawesome/free-solid-svg-icons';


// const Header = ({ setSelectedCategory, setSortingType, setSortingDirection, selectedCategory, sortingType, sortingDirection, onSearch }) => {
//   const [user, setUser] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchInput, setSearchInput] = useState('');
//   const navigate = useNavigate();

//   const auth = getAuth(app);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isOpen && !event.target.closest('.sorting-dropdown-button')) {
//         setIsOpen(false);
//       }
//     };

//     window.addEventListener('click', handleClickOutside);

//     return () => {
//       window.removeEventListener('click', handleClickOutside);
//     };
//   }, [isOpen]);

//   const handleSignOut = async () => {
//     try {
//       if (auth) {
//         await auth.signOut();
//         Swal.fire('Ви успішно вийшли з акаунту', '', 'success');
//         navigate('/');
//       }
//     } catch (error) {
//       Swal.fire('Помилка виходу', error.message, 'error');
//     }
//   };

//   const handleLinkClick = (category) => {
//     setSelectedCategory(category);
//     navigate('/', { state: { selectedCategory: category, sortingType, sortingDirection } });
//   };

//   const handleSearchButton = () => {
//     navigate('/search');
//   }

//   const handleSearch = (event) => {
//     event.preventDefault();
//     onSearch(searchInput);
//   };

//   // Відкриття контекстного меню
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleDropdownClick = (sortingType, sortingDirection) => {
//     setSortingType(sortingType);
//     setSortingDirection(sortingDirection);
//     navigate('/', { state: { selectedCategory, sortingType, sortingDirection } });
//   }

//   return (
//     <header className="header">

//       <div className="header-row">

//         <div className='links-row'>
//           <div className='logo' >
//             <a href='' onClick={() => handleLinkClick('Усі')} >NEWSUA</a>
//           </div>
//           <a href='' onClick={() => handleLinkClick('Україна')}>УКРАЇНА</a>
//           <a href='' onClick={() => handleLinkClick('Світ')}>СВІТ</a>
//           <a href='' onClick={() => handleLinkClick('Бізнес')}>БІЗНЕС</a>
//           <a href='' onClick={() => handleLinkClick('Технології')}>ТЕХНОЛОГІЇ</a>
//           <a href='' onClick={() => handleLinkClick('Культура')}>КУЛЬТУРА</a>
//           <a href='' onClick={() => handleLinkClick('Здоров\'я')}>ЗДОРОВ'Я</a>
//           <a href='' onClick={() => handleLinkClick('Спорт')}>СПОРТ</a>
//           <a href='' onClick={() => handleLinkClick('Ігри')}>ІГРИ</a>
//         </div>
//         <div className='header-manage'>
//           <div className='search-button'>
//           <div className="search-button-icon" onClick={handleSearchButton}>
//               <FontAwesomeIcon icon={faSearch} />
//             </div>
//           </div>
//           <div className="sorting-dropdown-button">
//             <div className="sorting-dropdown-button-icon" onClick={toggleDropdown}>
//               <FontAwesomeIcon icon={faSort} />
//             </div>
//             <div className={`sorting-dropdown-content ${isOpen ? 'show' : ''}`}>
//               <a href='' onClick={() => handleDropdownClick('publishTime', 'desc')}>Нові</a> {/* publishTime, desc */}
//               <a href='' onClick={() => handleDropdownClick('publishTime', 'asc')}>Старі</a> {/* publishTime, asc */}
//               <a href='' onClick={() => handleDropdownClick('comments', 'desc')}>Обговорювані</a> {/* comments, desc */}
//               <a href='' onClick={() => handleDropdownClick('rating', 'desc')}>Рейтингові</a> {/* rating, desc */}
//               <a href='' onClick={() => handleDropdownClick('views', 'desc')}>Популярні</a> {/* views, desc */}
//             </div>
//           </div>
// {/* 
//           {user ? (
//             <UserDropdown onSignOut={handleSignOut} />
//           ) : (
//             <AuthController />
//           )} */}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
