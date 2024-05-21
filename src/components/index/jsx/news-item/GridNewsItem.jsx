import React from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate hook
import '../../css/items/grid-news-item.css';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const GridNewsItem = ({ article }) => {
    const navigate = useNavigate(); // use useNavigate hook

    const { title, author, category, publishTime, imageUrl} = article;

    const formattedPublishTime = new Date(publishTime).toLocaleString('uk-UA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    const handleTitleClick = (id) => {
        navigate('/read', { state: { id } }); // use navigate to navigate to /read route
    };

    return (
        <Card className="news-item" onClick={() => handleTitleClick(article.id)}>
            <Card.Img src={imageUrl} alt={title} className="news-item-preview" />
            <Card.Body className="news-item-body">
                <div className='news-item-upper'>
                    {/* <Card.Text className="news-item-category">{category}</Card.Text> */}
                    <Card.Title className="news-item-title" >{title}</Card.Title>
                </div>
                {/* <div className='news-item-lower'>
                    <div className='news-item-lower-info'>
                        <Card.Text className="news-item-publish-time">{formattedPublishTime}</Card.Text>
                        <Card.Text className="news-item-author">{author}</Card.Text>
                    </div>
                </div> */}
            </Card.Body>
        </Card>
    )
};

export default GridNewsItem;
