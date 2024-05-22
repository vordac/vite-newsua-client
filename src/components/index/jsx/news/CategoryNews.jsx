import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GridNewsItem from '../news-item/GridNewsItem';
import '../../css/layouts/news-grid.css';

function CategoryNews({ selectedCategory, sortingType, sortingDirection }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get('http://localhost:5000/category', {
          params: {
            category: selectedCategory,
            sortingType: sortingType,
            sortingDirection: sortingDirection,
            limit: 32,
          },
        });
        setArticles(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchArticles();
  }, [selectedCategory, sortingType, sortingDirection]);

  return (
    <div className="news-grid-items">
      {
        Array.isArray(articles) && articles.map((article) => (
            <GridNewsItem
              article={{ ...article, imageUrl: article.preview }}
            />
        ))
      }
    </div>
  );
}

export default CategoryNews;
