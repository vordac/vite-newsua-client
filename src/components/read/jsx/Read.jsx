import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/read.css';
import LastNews from '../../index/jsx/news/LastNews';
import ShowAllNews from '../../index/jsx/ShowAllNews';

const Read = ({ setSelectedAuthor, setSelectedCategory }) => {
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
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
                const response = await axios.get('https://newsua-217e80321b33.herokuapp.com/read', {
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

    const handleAuthorClick = (author) => {
        navigate('/author');
        setSelectedAuthor(author);
    }

    const handleCategoryClick = (category) => {
        navigate('/category');
        setSelectedCategory(category);
    }

    // render the article data
    return (
        <div className='read'>
            {article && (
                <>
                    <div className='read-box'>
                        <div className='read-box-category'>
                            <p>Новини &rarr;&nbsp; </p>
                            <p key={article.id} className='read-box-category-link' onClick={() => handleCategoryClick(article.category)}> {article.category}</p>
                        </div>
                        <div className='read-box-title'>
                            <h1 key={article.id}>{article.title}</h1>
                        </div>
                        <div className='read-box-info'>
                            <div className='read-box-info-author'>
                                <p key={article.id} onClick={() => handleAuthorClick(article.author)}>{article.author}</p>
                            </div>
                            <div className='read-box-info-publishtime'>
                                <p key={article.id}>&nbsp;&#x2022;&nbsp;{formatDate(new Date(article.publishTime))}</p>
                            </div>
                        </div>
                        <div className='read-box-preview'>
                            <img key={article.id} src={article.preview} />
                        </div>
                        <div className='read-box-text'>
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
                        </div>
                        <div className='read-box-comments'>

                        </div>
                    </div>
                </>
            )}
            <div className='read-last'>
                <h4>ОСТАННІ НОВИНИ</h4>
                <LastNews />
                <ShowAllNews />
            </div>

        </div>
    );
};

export default Read;