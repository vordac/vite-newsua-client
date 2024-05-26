import React from 'react';
import '../css/show-all-items.css'
import { useNavigate } from 'react-router-dom';

const ShowAllNews = ({setSelectedCategory, setSortingType, setSortingDirection}) => {

    const navigate = useNavigate();

    const handleShowAllClick = (category, sortingType, sortingDirection) => {
        navigate('/all');
        setSelectedCategory(category);
        setSortingType(sortingType);
        setSortingDirection(sortingDirection);
    }

    return (
        <button className='show-all-news' onClick={() => handleShowAllClick('', 'publishTime', 'desc')}>БІЛЬШЕ НОВИН</button>
    );
};

export default ShowAllNews;
