import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LastNewsItem from '../news-item/LastNewsItem';
import { Link } from 'react-router-dom';

function LastNews() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await axios.get('https://newsua-217e80321b33.herokuapp.com/articles-list', {
                    params: {
                        category: undefined,
                        sortingType: "publishTime",
                        sortingDirection: "desc",
                        limit: 30,
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
                Array.isArray(articles) && articles.slice(0, 30).map((article) => (
                    <LastNewsItem
                        article={{ ...article }}
                    />
                ))
            }
        </div>
    );
}

export default LastNews;
