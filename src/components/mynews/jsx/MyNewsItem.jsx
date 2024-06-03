import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../css/news-item.css'

const MyNewsItem = ({ article, setSelectedCategory, setSelectedAuthor }) => {
    const navigate = useNavigate();

    const { title, author, category, views, publishTime, imageUrl, rating } = article;

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


    return (
        <Card className="list-item-news-item">
            <Card.Body className="list-item-news-item-body">
                <div className='list-item-news-item-body-left'>
                    <Card.Title className="list-item-news-item-title" onClick={() => handleReadClick(article.id)}>{title}</Card.Title>
                    <Card.Text className="list-item-news-item-category" >Категорія: {category}</Card.Text>
                    <Card.Text >Автор: {author}</Card.Text>
                    <Card.Text className="list-item-news-item-lower-info-box-publishtime">Час публікації: {formattedPublishTime}</Card.Text>
                </div>
            </Card.Body>
        </Card>
    )
};

export default MyNewsItem;
