import React, { useState, useEffect } from 'react';
import '../css/admin.css';
import ListItemAuthors from './ListItemAuthors';

import axios from 'axios';
import ListItemModerators from './ListItemModerators';
import ListItemPublished from './ListItemPublished';
import ListItemModerated from './ListItemModerated';
import ListItemRejected from './ListItemRejected';

const Admin = ({ userRole }) => {

    const [authors, setAuthors] = useState('');
    const [moderators, setModerators] = useState('');
    const [articlesPublished, setArticlesPublished] = useState('');
    const [articlesModerated, setArticlesModerated] = useState('');
    const [articlesRejected, setArticlesRejected] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState(1);
    const [refreshRate, setRefreshRate] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);

    const handleFirstTabClick = () => {
        setTab(1);
    }

    const handleSecondTabClick = () => {
        setTab(2);
    }

    const handleThirdTabClick = () => {
        setTab(3);
    }

    const handleFourthTabClick = () => {
        setTab(4);
    }

    const handleFifthTabClick = () => {
        setTab(5);
    }

    async function fetchAuthors() {
        try {
            const response = await axios.get('http://localhost:5000/admin-get-authors', {
            });
            setAuthors(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchModerators() {
        try {
            const response = await axios.get('http://localhost:5000/admin-get-moderators', {
            });
            setModerators(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
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
        fetchAuthors();
        fetchModerators();
        fetchPublishedArticles();
        fetchModeratedArticles();
        fetchRejectedArticles();
        setIsLoading(false);
    }, [userRole, refreshRate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (userRole === 'admin') {
        if (tab === 1) {
            return (
                <div className='tab'>
                    <div className='tab-controls'>
                        <div className='tab-controls-roles'>
                            <button onClick={handleFirstTabClick}>Автори</button>
                            <button onClick={handleSecondTabClick}>Модератори</button>
                        </div>
                        <div className='tab-controls-news'>
                            <button onClick={handleThirdTabClick}>Опубліковані</button>
                            <button onClick={handleFourthTabClick}>Модеровані</button>
                            <button onClick={handleFifthTabClick}>Відхилені</button>
                        </div>
                    </div>
                    <div className='tab-authors'>
                        {
                            Array.isArray(authors) && authors.map((element) => (
                                <ListItemAuthors
                                    key={element.uid}
                                    element={{ ...element }}
                                    setAuthors={setAuthors}
                                    refreshRate={refreshRate}
                                    setRefreshRate={setRefreshRate}
                                    setIsBlocked={setIsBlocked}
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
                        <div className='tab-controls-roles'>
                            <button onClick={handleFirstTabClick}>Автори</button>
                            <button onClick={handleSecondTabClick}>Модератори</button>
                        </div>
                        <div className='tab-controls-news'>
                            <button onClick={handleThirdTabClick}>Опубліковані</button>
                            <button onClick={handleFourthTabClick}>Модеровані</button>
                            <button onClick={handleFifthTabClick}>Відхилені</button>
                        </div>
                    </div>
                    <div className='tab-moderators'>
                        {
                            Array.isArray(moderators) && moderators.map((element) => (
                                <ListItemModerators
                                    key={element.uid}
                                    element={{ ...element }}
                                    setModerators={setModerators}
                                    refreshRate={refreshRate}
                                    setRefreshRate={setRefreshRate}
                                    setIsBlocked={setIsBlocked}
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
                        <div className='tab-controls-roles'>
                            <button onClick={handleFirstTabClick}>Автори</button>
                            <button onClick={handleSecondTabClick}>Модератори</button>
                        </div>
                        <div className='tab-controls-news'>
                            <button onClick={handleThirdTabClick}>Опубліковані</button>
                            <button onClick={handleFourthTabClick}>Модеровані</button>
                            <button onClick={handleFifthTabClick}>Відхилені</button>
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
        } else if (tab === 4) {
            return (
                <div className='tab'>
                    <div className='tab-controls'>
                        <div className='tab-controls-roles'>
                            <button onClick={handleFirstTabClick}>Автори</button>
                            <button onClick={handleSecondTabClick}>Модератори</button>
                        </div>
                        <div className='tab-controls-news'>
                            <button onClick={handleThirdTabClick}>Опубліковані</button>
                            <button onClick={handleFourthTabClick}>Модеровані</button>
                            <button onClick={handleFifthTabClick}>Відхилені</button>
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
        } else if (tab === 5) {
            return (
                <div className='tab'>
                    <div className='tab-controls'>
                        <div className='tab-controls-roles'>
                            <button onClick={handleFirstTabClick}>Автори</button>
                            <button onClick={handleSecondTabClick}>Модератори</button>
                        </div>
                        <div className='tab-controls-news'>
                            <button onClick={handleThirdTabClick}>Опубліковані</button>
                            <button onClick={handleFourthTabClick}>Модеровані</button>
                            <button onClick={handleFifthTabClick}>Відхилені</button>
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
            <div>У вас немає прав адміністратора</div>
        )
    }
};

export default Admin;
