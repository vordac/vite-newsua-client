import React from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate hook
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
        <Card className="news-item">
            <Link
                key={article.id}
                to="/read"
                state={{ id: article.id }}
                onClick={() => handleReadClick(article.id)}
            >
                <Card.Img src={imageUrl} alt={title} className="news-item-preview" />
            </Link>
            <Card.Text className="news-item-category" >{category}</Card.Text>
            <Card.Body className="news-item-body">
                <div className='news-item-upper'>
                    <Card.Title className="news-item-title" onClick={() => handleReadClick(article.id)}>{title}</Card.Title>
                </div>
                <div className='news-item-lower'>
                    <div className='news-item-lower-info'>
                        <div className="news-item-lower-info-author">
                            <Card.Text >{author}</Card.Text>
                        </div>
                        <div className='news-item-lower-info-box'>
                            <Card.Text className="news-item-lower-info-box-views">
                                <FontAwesomeIcon icon={faEye} />
                                <div>&nbsp;{views}&nbsp;&nbsp;&#x2022;&nbsp;&nbsp;</div>
                            </Card.Text>
                            <Card.Text className="news-item-lower-info-box-views">
                                <FontAwesomeIcon icon={faThumbsUp} />
                                <div>&nbsp;{rating}&nbsp;&nbsp;&#x2022;&nbsp;&nbsp;</div>
                            </Card.Text>
                            <Card.Text className="news-item-lower-info-box-publishtime">{formattedPublishTime}</Card.Text>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
};

export default MyNewsItem;
