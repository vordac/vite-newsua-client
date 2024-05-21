import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
import { Link } from 'react-router-dom';
import '../css/news-grid.css';

function NewsGrid({ selectedCategory, sortingType, sortingDirection }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get('http://localhost:5000/articles', {
          params: {
            category: selectedCategory,
            sortingType: sortingType,
            sortingDirection: sortingDirection,
          },
        });
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [selectedCategory, sortingType, sortingDirection]);

  return (
    <div className="news-grid-items">
      {loading ? (
        <p className="news-grid-loading">Завантаження новин...</p>
      ) : (
        Array.isArray(articles) && articles.map((article) => (
          <Link
            key={article.id} 
            to="/read"
            state={{ id: article.id }}
          >
            <NewsItem
              article={{ ...article, imageUrl: article.preview }}
            />
          </Link>
        ))
      )}
    </div>
  );
}

export default NewsGrid;
