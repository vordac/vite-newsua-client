import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../css/layouts/news-grid.css';
import GridNewsItem from '../news-item/GridNewsItem';

// List of author news that displays after user clicking on author at news grid
function AuthorNews({selectedCategory, sortingType, sortingDirection}) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await axios.get('http://localhost:5000/author', {
                    params: {
                        category: undefined,
                        sortingType: sortingType,
                        sortingDirection: sortingDirection,
                    },
                });
                setArticles(response.data);
            } catch (error) {
            }
        }

        fetchArticles();
    }, [selectedCategory, sortingType, sortingDirection]);

    return (
        <div className="news-list-items">
            {
                Array.isArray(articles) && articles.map((article) => (
                    <Link
                        key={article.id}
                        to="/read"
                        state={{ id: article.id }}
                    >
                        <GridNewsItem
                            article={{ ...article }}
                        />
                    </Link>
                ))
            }
        </div>
    );
}

export default AuthorNews;
