import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Read = () => {
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);

    const location = useLocation();
    const { id } = location.state || {};

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year}, ${hour}:${minute}`;
    };

    useEffect(() => {
        async function fetchArticle() {
            try {
                const response = await axios.get('http://localhost:5000/read', {
                    params: {
                        id: id
                    },
                });
                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
                setError('Error fetching article');
            }
        }

        if (!id) {
            setError('Missing article id');
            return;
        }

        fetchArticle();
    }, [id, setArticle]);

    // render the article data
    return (
        <div>
            {article && (
                <>
                    <p key={article.id}>{article.category}</p>
                    <h1 key={article.id}>{article.title}</h1>
                    <p key={article.id}>{article.author}</p>
                    <p key={article.id}>{formatDate(new Date(article.publishTime))}</p>
                    {typeof article.content === 'string' ? (
                        <p key={article.id} dangerouslySetInnerHTML={{ __html: article.content }} />
                    ) : typeof article.content === 'object' ? (
                        <pre key={article.id}>{JSON.stringify(article.content, null, 2)}</pre>
                    ) : Array.isArray(article.content) ? (
                        <ul key={article.id}>
                            {article.content.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p key={article.id}>{article.content}</p>
                    )}
                </>
            )}
        </div>
    );
};

export default Read;
