import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
// import '../css/news-grid.css';

function NewsGrid({ selectedCategory, sortingType, sortingDirection }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get('https://newsua-217e80321b33.herokuapp.com/articles', {
          params: {
            category: selectedCategory,
            sortingType: sortingType,
            sortingDirection: sortingDirection,
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
          <NewsItem
            article={{ ...article, imageUrl: article.preview }}
          />
        ))
      }
    </div>
  );
}

export default NewsGrid;
