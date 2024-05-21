import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/items/last-news-item.css';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';

const NewsItem = ({ article }) => {
    const navigate = useNavigate();

    const { title, author, category, publishTime, views, rating, comments } = article;

    const formattedPublishTime = new Date(publishTime).toLocaleString('uk-UA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    const handleTitleClick = (id) => {
        navigate('/read', { state: { id } });
    };

    return (
        <Card className="last-news-item">
            <Card.Body className="last-news-item-body">
                <div className='last-news-item-upper'>
                    <Card.Title className="last-news-item-title" onClick={() => handleTitleClick(article.id)}>{title}</Card.Title>
                </div>
                <div className='last-news-item-lower'>
                    <Card.Text className="last-news-item-lower-publishtime">{formattedPublishTime}</Card.Text>
                    <div className='last-news-item-lower-views'>
                        <FontAwesomeIcon icon={faEye} />
                        <Card.Text className="last-news-item-lower-views-text">{views}</Card.Text>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
};

export default NewsItem;
