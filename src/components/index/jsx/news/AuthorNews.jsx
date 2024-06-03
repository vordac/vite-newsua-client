import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../css/layouts/news-grid.css';
import GridNewsItem from '../news-item/GridNewsItem';

// List of author news that displays after user clicking on author at news grid
function AuthorNews({ selectedAuthor, setSelectedAuthor, selectedCategory, setSelectedCategory, sortingType, sortingDirection }) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await axios.get('https://newsua-217e80321b33.herokuapp.com//author', {
                    params: {
                        author: selectedAuthor,
                        category: selectedCategory,
                        sortingType: sortingType,
                        sortingDirection: sortingDirection,
                    },
                });
                setArticles(response.data);
            } catch (error) {
            }
        }

        fetchArticles();
    }, [selectedAuthor, selectedCategory, sortingType, sortingDirection]);

    return (
        <div className="author-news-grid-items">
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

export default AuthorNews;
