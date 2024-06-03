import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import '../css/list-item-role.css';
import axios from 'axios';

const ListItemAuthors = ({ key, element, setAuthors, refreshRate, setRefreshRate }) => {
    const navigate = useNavigate();

    const { email, role, uid, username } = element;
    const [isBlocked, setIsBlocked] = useState(element.isBlocked);

    const handleBlockClick = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/admin-block-user?uid=${uid}`);
            console.log(response.data);
            setAuthors(prevAuthors => prevAuthors.map(author => author.uid === uid ? { ...author, isBlocked: true } : author));
            setRefreshRate(refreshRate + 1);
            setIsBlocked(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnblockClick = async () => {
        try {
            setIsBlocked(false); 
            const response = await axios.put(`http://localhost:5000/admin-unblock-user?uid=${uid}`);
            console.log(response.data);
            setAuthors(prevAuthors => prevAuthors.map(author => author.uid === uid ? { ...author, isBlocked: false } : author));
            setRefreshRate(refreshRate + 1);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSetModeratorClick = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/admin-set-moderator?uid=${uid}`);
            console.log(response.data);
            setAuthors(prevAuthors => prevAuthors.map(author => author.uid === uid ? { ...author, role: 'moderator' } : author));
            setRefreshRate(1);
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
                <button onClick={handleSetModeratorClick}>Надати модерку</button>
                <button onClick={isBlocked ? handleUnblockClick : handleBlockClick}>
                    {isBlocked ? "Розблокувати" : "Заблокувати"}
                </button>
            </div>
        </Card>
    );
};

export default ListItemAuthors;
