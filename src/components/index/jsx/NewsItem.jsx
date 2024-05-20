import React from 'react';
import '../css/news-item.css';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const NewsItem = ({ article }) => {
    const { title, author, category, publishTime, views, imageUrl, rating, comments } = article;

    const formattedPublishTime = new Date(publishTime).toLocaleString('uk-UA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <Card className="news-item">
            <Card.Img src={imageUrl} alt={title} className="news-item-preview" />
            <div className="news-item-content">
                <div className='news-item-content-views'>
                    <FontAwesomeIcon icon={faEye} />
                    <Card.Text className='news-item-card-content-views-text'>{views}</Card.Text>
                </div>
                <div className='news-item-content-comments'>
                    <FontAwesomeIcon icon={faComment} />
                    <Card.Text className='news-item-content-comments-text'>{comments}</Card.Text>
                </div>
                <div className='news-item-content-text'>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <Card.Text className='news-item-content-rating-text'>{rating}</Card.Text>
                </div>
            </div>
            <Card.Body className="news-item-body">
                <div className='news-item-upper'>
                    <Card.Text className="news-item-category">{category}</Card.Text>
                    <Card.Title className="news-item-title">{title}</Card.Title>
                </div>
                <div className='news-item-lower'>
                    <div className='divider'></div>
                    <div className='news-item-lower-info'>
                        <Card.Text className="news-item-publish-time">{formattedPublishTime}</Card.Text>
                        <Card.Text className="news-item-author">{author}</Card.Text>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
};

export default NewsItem;
