import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LastNewsItem from '../news-item/LastNewsItem';
import { Link } from 'react-router-dom';

function LastNews() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await axios.get('http://localhost:5000/articles', {
                    params: {
                        category: undefined,
                        sortingType: "publishTime",
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
        <div className="news-list-items">
            {
                Array.isArray(articles) && articles.map((article) => (
                    <Link
                        key={article.id}
                        to="/read"
                        state={{ id: article.id }}
                    >
                        <LastNewsItem
                            article={{ ...article }}
                        />
                    </Link>
                ))
            }
        </div>
    );
}

export default LastNews;
