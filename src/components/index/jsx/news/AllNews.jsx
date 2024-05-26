import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GridNewsItem from '../news-item/GridNewsItem';
import '../../css/layouts/news-grid.css';

function AllNews({ selectedAuthor, setSelectedAuthor, selectedCategory, setSelectedCategory, sortingType, sortingDirection }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const sortDir = sortingDirection === 'asc' || sortingDirection === 'desc' ? sortingDirection : 'desc';
        const response = await axios.get('http://localhost:5000/all', {
          params: {
            category: selectedCategory,
            sortingType: sortingType,
            sortingDirection: sortDir,
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
