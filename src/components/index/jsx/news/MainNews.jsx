import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GridNewsItem from '../news-item/GridNewsItem';
import '../../css/layouts/news-grid.css';

function MainNews({ setSelectedCategory, setSelectedAuthor, setArticleID }) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await axios.get('http://localhost:5000/articles-grid', {
                    params: {
                        category: undefined,
                        sortingType: "views",
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
                        setSelectedAuthor={setSelectedAuthor}
                        setSelectedCategory={setSelectedCategory}
                        setArticleID={setArticleID}
                    />
                ))
            }
        </div>
    );
}

export default MainNews;
