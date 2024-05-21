import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
import { Link } from 'react-router-dom';
// import '../css/news-grid.css';

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
        console.log("Типы:");
        console.log(`Категория: ${typeof selectedCategory}\nТип сортировки: ${typeof sortingType}\nНаправление сортировки: ${typeof sortingDirection}`);
        console.log("Значения:");
        console.log(`Категория: ${selectedCategory}\nТип сортировки: ${sortingType}\nНаправление сортировки ${sortingDirection}`);

      } catch (error) {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [selectedCategory, sortingType, sortingDirection]);

  return (
    <div className="news-grid-items">
      {
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
      }
    </div>
  );
}

export default NewsGrid;
