import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GridNewsItem from '../news-item/GridNewsItem';
import { Link } from 'react-router-dom';
import '../../css/layouts/news-grid.css';

function PopularNews() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await axios.get('http://localhost:5000/articles', {
                    params: {
                        category: undefined,
                        sortingType: "rating",
                        sortingDirection: "desc",
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
                    <Link
                        key={article.id}
                        to="/read"
                        state={{ id: article.id }}
                    >
                        <GridNewsItem
                            article={{ ...article, imageUrl: article.preview }}
                        />
                    </Link>
                ))
            }
        </div>
    );
}

export default PopularNews;
