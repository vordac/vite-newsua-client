import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GridNewsItem from '../news-item/GridNewsItem';
import '../../css/layouts/news-grid.css';

function AllNews({ selectedAuthor, setSelectedAuthor, selectedCategory, setSelectedCategory, sortingType, sortingDirection }) {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/all', {
        params: {
          sortingType: sortingType,
          sortingDirection: sortingDirection,
        },
      });
      setArticles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [sortingType, sortingDirection]);

  return (
    <div className="all-news-grid-items">
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

export default AllNews;
