import React from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate hook
import '../../css/items/grid-news-item.css';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const GridNewsItem = ({ article }) => {
    const navigate = useNavigate(); // use useNavigate hook

    const { title, author, category, views, publishTime, imageUrl } = article;

    const formattedPublishTime = new Date(publishTime).toLocaleString('uk-UA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    const handleReadClick = (id) => {
        navigate('/read', { state: { id } }); // use navigate to navigate to /read route
    };

    const handleAuthorClick = () => {
        navigate('/author');
    }

    const handleCategoryClick = () => {
        navigate('/category');
    }

    return (
        <Card className="news-item">
            <Link
                key={article.id}
                to="/read"
                state={{ id: article.id }}
            >
                <Card.Img src={imageUrl} alt={title} className="news-item-preview" />
            </Link>
            <Card.Body className="news-item-body">
                <div className='news-item-upper'>
                    <Card.Text className="news-item-category" onClick={handleCategoryClick}>{category}</Card.Text>
                    <Link
                        key={article.id}
                        to="/read"
                        state={{ id: article.id }}
                    >
                        <Card.Title className="news-item-title" >{title}</Card.Title>
                    </Link>
                </div>
                <div className='news-item-lower'>
                    <div className='news-item-lower-info'>
                        <div className="news-item-lower-info-author">
                            <Card.Text onClick={handleAuthorClick}>{author}</Card.Text>
                        </div>
                        <div className='news-item-lower-info-box' onClick={() => handleTitleClick(article.id)}>
                            <Card.Text className="news-item-lower-info-box-views">
                                <FontAwesomeIcon icon={faEye} />
                                <div>&nbsp;{views}&nbsp;&nbsp;&#x2022;&nbsp;&nbsp;</div>
                            </Card.Text>
                            <Card.Text className="news-item-lower-info-box-publishtime">{formattedPublishTime}</Card.Text>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
};

export default GridNewsItem;
