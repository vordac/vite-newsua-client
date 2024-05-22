import React from 'react';
import '../css/category-header.css'

function CategoryHeader({selectedCategory}) {
    return (
        <h4 className='category-header'>{selectedCategory.toUpperCase()}</h4>
    );
}

export default CategoryHeader;
