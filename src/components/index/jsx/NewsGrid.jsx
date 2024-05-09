import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
import '../css/news-grid.css';

function NewsGrid() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/articles');
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="news-grid">
      <div className='news-grid-title'>
        <h2>Усі новини</h2>
      </div>
      <div className='news-grid-items'>
        {loading ? (
          <p className='news-grid-loading'>Завантаження новин...</p> // Replace this with your loading indicator
        ) : (
          articles.map((article) => (
            <NewsItem
              key={article.id}
              article={{ ...article, imageUrl: article.preview }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default NewsGrid;
