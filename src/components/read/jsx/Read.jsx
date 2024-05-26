import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/read.css';
import LastNews from '../../index/jsx/news/LastNews';
import ShowAllNews from '../../index/jsx/ShowAllNews';
import { getFirestore, collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../../../services/Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { DiscussionEmbed } from 'disqus-react';

const Read = ({ setSelectedAuthor, setSelectedCategory }) => {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userReaction, setUserReaction] = useState(null);

  const db = getFirestore(app);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year}, ${hour}:${minute}`;
  };

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await axios.get('https://newsua-217e80321b33.herokuapp.com/read', {
          params: {
            id: id
          },
        });
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
        setError('Error fetching article');
      }
    }

    if (!id) {
      setError('Missing article id');
      return;
    }

    fetchArticle();
  }, [id, setArticle]);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!app || !db || !id || !article) {
      return;
    }

    setUserReaction(article.userReactions?.[userId] || null);
  }, [id, article, app, db, userId]);

  const handleAuthorClick = (author) => {
    navigate('/author');
    setSelectedAuthor(author);
  };

  const handleCategoryClick = (category) => {
    navigate('/category');
    setSelectedCategory(category);
  };

  const handleReactionClick = async (reaction) => {
    if (!app || !db || !id || !article || !userId) {
      setError('Firebase app or Firestore database is not initialized. Please log in to leave a reaction.');
      return;
    }

    // Prevent multiple clicks on the same reaction
    if (userReaction === reaction) return;

    try {
      const articleRef = doc(db, 'articles', id);
      let newRating = article.rating;

      // If the user is changing their reaction, subtract their previous reaction first
      if (userReaction) {
        newRating -= userReaction;
      }

      // Add the new reaction
      newRating += reaction;

      await updateDoc(articleRef, {
        rating: newRating,
        userReactions: {
          ...article.userReactions,
          [userId]: reaction, // Store the user's reaction in Firestore
        },
      });

      setUserReaction(reaction); // Update the local state
    } catch (error) {
      setError(`Error updating article: ${error}`);
    }
  };

  // Add your Disqus shortname here
  const disqusShortname = 'newsua-1';

  return (
    <div className='read'>
      {article && (
        <>
          <div className='read-box'>
            <div className='read-box-category'>
              <p>Новини &rarr;&nbsp; </p>
              <p key={article.id} className='read-box-category-link' onClick={() => handleCategoryClick(article.category)}> {article.category}</p>
            </div>
            <div className='read-box-title'>
              <h1 key={article.id}>{article.title}</h1>
            </div>
            <div className='read-box-info'>
              <div className='read-box-info-author'>
                <p key={article.id} onClick={() => handleAuthorClick(article.author)}>{article.author}</p>
              </div>
              <div className='read-box-info-publishtime'>
                <p key={article.id}>&nbsp;&#x2022;&nbsp;{formatDate(new Date(article.publishTime))}</p>
              </div>

            </div>
            <div className='read-box-preview'>
              <img key={article.id} src={article.preview} />
            </div>
            <div className='read-box-text'>
              {typeof article.content === 'string' ? (
                <p key={article.id} dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : typeof article.content === 'object' ? (
                <pre key={article.id}>{JSON.stringify(article.content, null, 2)}</pre>
              ) : Array.isArray(article.content) ? (
                <ul key={article.id}>
                  {article.content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p key={article.id}>{article.content}</p>
              )}
            </div>
            <div className='read-box-info-reactions'>
              <button onClick={() => handleReactionClick(1)} disabled={userReaction === 1 || !userId}>
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
              <button onClick={() => handleReactionClick(-1)} disabled={userReaction === -1 || !userId}>
                <FontAwesomeIcon icon={faThumbsDown} />
              </button>
            </div>
            <div className='read-box-comments'>
              <div className='read-box-comments-embed'>
              <DiscussionEmbed
                shortname={disqusShortname}
                config={{
                  url: `https://newsua.netlify.app/read/${article.id}`, // Replace with the actual article URL
                  identifier: article.id,
                  title: article.title,
                }}
              />                    
              </div>
            </div>
          </div>
        </>
      )}
      <div className='read-last'>
        <h4>ОСТАННІ НОВИНИ</h4>
        <LastNews />
        <ShowAllNews />
      </div>

    </div>
  );
};

export default Read;
