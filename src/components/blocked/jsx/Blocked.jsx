import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../../services/Firebase';
import '../css/blocked.css';

const Blocked = ({handleSignoutClick}) => {

  return (
    <div className='blocked'>
      <p>Вас було заблоковано.</p>
      <p>Зв'яжіться з адміністратором: 35ba@gmail.com</p>
      <button onClick={handleSignoutClick}>Вийти з акаунту</button>
    </div>
  );
}

export default Blocked;
