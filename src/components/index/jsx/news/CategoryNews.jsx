import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GridNewsItem from '../news-item/GridNewsItem';
import '../../css/layouts/news-grid.css';

function CategoryNews({ selectedAuthor, setSelectedAuthor, selectedCategory, setSelectedCategory, sortingType, sortingDirection }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get('https://newsua-217e80321b33.herokuapp.com//category', {
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
    <div className="category-news-grid-items">
      {
        Array.isArray(articles) && articles.map((article) => (
          <GridNewsItem
            article={{ ...article, imageUrl: article.preview }}
            setSelectedAuthor={setSelectedAuthor}
            setSelectedCategory={setSelectedCategory}
          />
        ))
      }
    </div>
  );
}

export default CategoryNews;
