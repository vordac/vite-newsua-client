import React, { useState, useEffect } from 'react';
import '../css/admin.css';
import axios from 'axios';
import ListItemPublished from './ListItemPublished';
import ListItemModerated from './ListItemModerated';
import ListItemRejected from './ListItemRejected';

const Moderator = ({ userRole }) => {

    const [articlesPublished, setArticlesPublished] = useState('');
    const [articlesModerated, setArticlesModerated] = useState('');
    const [articlesRejected, setArticlesRejected] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState(1);
    const [refreshRate, setRefreshRate] = useState(0);

    const handleFirstTabClick = () => {
        setTab(1);
    }

    const handleSecondTabClick = () => {
        setTab(2);
    }

    const handleThirdTabClick = () => {
        setTab(3);
    }

    async function fetchPublishedArticles() {
        try {
            const response = await axios.get('http://localhost:5000/admin-get-published', {
            });
            setArticlesPublished(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    async function fetchModeratedArticles() {
        try {
            const response = await axios.get('http://localhost:5000/admin-get-moderated', {
            });
            setArticlesModerated(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    async function fetchRejectedArticles() {
        try {
            const response = await axios.get('http://localhost:5000/admin-get-rejected', {
            });
            setArticlesRejected(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPublishedArticles();
        fetchModeratedArticles();
        fetchRejectedArticles();
        setIsLoading(false);
    }, [userRole, refreshRate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (userRole === 'moderator') {
        if (tab === 1) {
            return (
                <div className='tab'>
                    <div className='tab-controls'>
                        <div className='tab-controls-news'>
                            <button onClick={handleFirstTabClick}>Опубліковані</button>
                            <button onClick={handleSecondTabClick}>Модеровані</button>
                            <button onClick={handleThirdTabClick}>Відхилені</button>
                        </div>
                    </div>
                    <div className='tab-published'>
                        {
                            Array.isArray(articlesPublished) && articlesPublished.map((article) => (
                                <ListItemPublished
                                    article={{ ...article, imageUrl: article.preview }}
                                    refreshRate={refreshRate}
                                    setRefreshRate={setRefreshRate}
                                />
                            ))
                        }
                    </div>
                </div>
            );
        } else if (tab === 2) {
            return (
                <div className='tab'>
                    <div className='tab-controls'>
                        <div className='tab-controls-news'>
                            <button onClick={handleFirstTabClick}>Опубліковані</button>
                            <button onClick={handleSecondTabClick}>Модеровані</button>
                            <button onClick={handleThirdTabClick}>Відхилені</button>
                        </div>
                    </div>
                    <div className='tab-moderated'>
                        {
                            Array.isArray(articlesModerated) && articlesModerated.map((article) => (
                                <ListItemModerated
                                    article={{ ...article, imageUrl: article.preview }}
                                    refreshRate={refreshRate}
                                    setRefreshRate={setRefreshRate}
                                />
                            ))
                        }
                    </div>
                </div>
            );
        } else if (tab === 3) {
            return (
                <div className='tab'>
                    <div className='tab-controls'>
                        <div className='tab-controls-news'>
                            <button onClick={handleFirstTabClick}>Опубліковані</button>
                            <button onClick={handleSecondTabClick}>Модеровані</button>
                            <button onClick={handleThirdTabClick}>Відхилені</button>
                        </div>
                    </div>
                    <div className='tab-rejected'>
                        {
                            Array.isArray(articlesRejected) && articlesRejected.map((article) => (
                                <ListItemRejected
                                    article={{ ...article, imageUrl: article.preview }}
                                    refreshRate={refreshRate}
                                    setRefreshRate={setRefreshRate}
                                />
                            ))
                        }
                    </div>
                </div>
            );
        } else {
            return (
                <div>Помилка завантаження вкладки</div>
            )
        }
    } else {
        return (
            <div>У вас немає прав модератора</div>
        )
    }
};

export default Moderator;
