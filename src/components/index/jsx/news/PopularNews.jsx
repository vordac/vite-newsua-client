import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GridNewsItem from '../news-item/GridNewsItem';
import { Link } from 'react-router-dom';
import '../../css/layouts/news-grid.css';

function PopularNews({ selectedCategory, sortingType, sortingDirection, setSortingDirection }) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await axios.get('https://newsua-217e80321b33.herokuapp.com/articles-grid', {
                    params: {
                        category: undefined,
                        sortingType: "rating",
                        sortingDirection: "desc",
                        limit: 6,
                    },
                });
                setArticles(response.data);

            } catch (error) {
            }
        }

        fetchArticles();
    }, []);

    return (
        <div className="news-grid-items">
            {
                Array.isArray(articles) && articles.slice(0, 6).map((article) => (
                    <GridNewsItem
                        article={{ ...article, imageUrl: article.preview }}
                        selectedCategory={selectedCategory}
                        sortingType={sortingType}
                        sortingDirection={sortingDirection}
                        setSortingDirection={setSortingDirection}
                    />
                ))
            }
        </div>
    );
}

export default PopularNews;
