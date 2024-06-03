import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import '../css/list-item-role.css';
import axios from 'axios';

const ListItemModerators = ({ key, element, setModerators, refreshRate, setRefreshRate }) => {
    const navigate = useNavigate();

    const { email, role, uid, username } = element;
    const [isBlocked, setIsBlocked] = useState(element.isBlocked);

    const handleBlockClick = async () => {
        try {
            const response = await axios.put(`https://newsua-217e80321b33.herokuapp.com//admin-block-user?uid=${uid}`);
            console.log(response.data);
            setModerators(prevModerators => prevModerators.map(moderator => moderator.uid === uid ? { ...moderator, isBlocked: true } : moderator));
            setRefreshRate(1);
            setIsBlocked(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnblockClick = async () => {
        try {
            setIsBlocked(false);
            const response = await axios.put(`https://newsua-217e80321b33.herokuapp.com//admin-unblock-user?uid=${uid}`);
            console.log(response.data);
            setModerators(prevModerators => prevModerators.map(moderator => moderator.uid === uid ? { ...moderator, isBlocked: false } : moderator));
            setRefreshRate(refreshRate + 1);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSetAuthorClick = async () => {
        try {
            const response = await axios.put(`https://newsua-217e80321b33.herokuapp.com//admin-set-author?uid=${uid}`);
            console.log(response.data);
            setModerators(prevModerators => prevModerators.map(moderator => moderator.uid === uid ? { ...moderator, role: 'author' } : moderator));
            setRefreshRate(refreshRate + 1);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(`Author ${element.username} is now ${isBlocked ? 'blocked' : 'unblocked'}`);
    }, [isBlocked]);

    return (
        <Card className="list-item-role">
            <div className='list-item-role-info'>
                <Card.Text className="list-item-role-info-username" >{username}</Card.Text>
                <Card.Text className="list-item-role-info-email" >{email}</Card.Text>
            </div>
            <div className='list-item-role-controls'>
                <button onClick={handleSetAuthorClick}>Надати авторку</button>
                <button onClick={isBlocked ? handleUnblockClick : handleBlockClick}>
                    {isBlocked ? "Розблокувати" : "Заблокувати"}
                </button>
            </div>
        </Card>
    )
};

export default ListItemModerators;
