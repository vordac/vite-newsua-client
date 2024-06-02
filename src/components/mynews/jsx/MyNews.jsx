import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../../services/Firebase';
import Swal from 'sweetalert2';
import '../css/my-news.css';
import axios from 'axios';

import MyNewsItem from './MyNewsItem';

const MyNews = ({ myNewsTab, userNickname, setMyNewsTab }) => {
    const [articlesPublished, setArticlesPublished] = useState([]);
    const [articlesModerated, setArticlesModerated] = useState([]);
    const [articlesRejected, setArticlesRejected] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFirstTabClick = () => {
        setMyNewsTab(1);
    }

    const handleSecondTabClick = () => {
        setMyNewsTab(2);
    }

    const handleThirdTabClick = () => {
        setMyNewsTab(3);
    }

    async function fetchPublishedArticles() {
        try {
            const response = await axios.get('http://localhost:5000/my-news-published', {
                params: {
                    userNickname: userNickname,
                },
            });
            setArticlesPublished(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    async function fetchModeratedArticles() {
        try {
            const response = await axios.get('http://localhost:5000/my-news-moderated', {
                params: {
                    params: {
                        author: userNickname,
                    },
                },
            });
            setArticlesModerated(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    async function fetchRejectedArticles() {
        try {
            const response = await axios.get('http://localhost:5000/my-news-rejected', {
                params: {
                    params: {
                        author: userNickname,
                    },
                },
            });
            setArticlesRejected(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchPublishedArticles();
        setIsLoading(false);
    }, [userNickname]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (myNewsTab === 1) {
        return (
            <div className='my-news-published'>
                <div className='set-tab'>
                    <button onClick={handleFirstTabClick}>Опубліковані</button>
                    <button onClick={handleSecondTabClick}>Модеровані</button>
                    <button onClick={handleThirdTabClick}>Відхилені</button>
                </div>
                <div className="news-grid-items">
                {
                    Array.isArray(articlesPublished) && articlesPublished.map((article) => (
                        <MyNewsItem
                            article={{ ...article, imageUrl: article.preview }}
                        />
                    ))
                }
                </div>
            </div>
        );
    } else if (myNewsTab === 2) {
        return (
            <div className='my-news-moderated'>
                <div className='set-tab'>
                <button onClick={handleFirstTabClick}>Опубліковані</button>
                    <button onClick={handleSecondTabClick}>Модеровані</button>
                    <button onClick={handleThirdTabClick}>Відхилені</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className='my-news-rejected'>
                <div className='set-tab'>
                <button onClick={handleFirstTabClick}>Опубліковані</button>
                    <button onClick={handleSecondTabClick}>Модеровані</button>
                    <button onClick={handleThirdTabClick}>Відхилені</button>
                </div>
            </div>
        );
    }
}

export default MyNews;
