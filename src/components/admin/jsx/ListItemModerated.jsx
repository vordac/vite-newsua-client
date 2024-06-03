import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate hook
import { Card } from 'react-bootstrap';
import '../css/list-item-news.css'
import axios from 'axios';

const ListItemModerated = ({ article, refreshRate, setRefreshRate }) => {
    const navigate = useNavigate();

    const { title, author, category, views, publishTime, imageUrl, rating } = article;
    const [statusModerated, setStatusModerated] = useState(article.status);

    const formattedPublishTime = new Date(publishTime).toLocaleString('uk-UA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    const handleReadClick = (id) => {
        navigate('/read', { state: { id } });
    };

    const handleSaveStatusClick = async () => {
        console.log("Status value: ", status);
        try {
            const response = await axios.put(`https://newsua-217e80321b33.herokuapp.com//admin-set-status-moderated`, {
                uid: article.id,
                status: statusModerated
            });
            setRefreshRate(refreshRate + 1);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card className="list-item-news-item">
            <Card.Body className="list-item-news-item-body">
                <div className='list-item-news-item-body-left'>
                    <Card.Title className="list-item-news-item-title" onClick={() => handleReadClick(article.id)}>{title}</Card.Title>
                    <Card.Text className="list-item-news-item-category" >Категорія: {category}</Card.Text>
                    <Card.Text >Автор: {author}</Card.Text>
                    <Card.Text className="list-item-news-item-lower-info-box-publishtime">Час публікації: {formattedPublishTime}</Card.Text>
                </div>
                <div className='list-item-news-item-body-right'>
                    <select value={statusModerated} onChange={(e) => setStatusModerated(e.target.value)}>
                        <option value="moderated">Модероване</option>
                        <option value="published">Опубліковане</option>
                        <option value="rejected">Відхилене</option>
                    </select>
                    <button onClick={handleSaveStatusClick}>ЗБЕРЕГТИ</button>
                </div>
            </Card.Body>
        </Card>
    )
};

export default ListItemModerated;
