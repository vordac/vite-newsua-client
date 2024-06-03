import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../../services/Firebase';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../css/auth.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faA, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SignInForm = ({ setUser, user, setIsUserBlocked }) => {
  const auth = getAuth(app);
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  const navigate = useNavigate();

  const checkIfUserIsBlocked = async (email) => {
    try {
      const response = await axios.get("http://localhost:5000/is-user-blocked", {
        params: {
          email: email,
        },
      });
      setIsUserBlocked(response.data.isBlocked);
      localStorage.setItem("isBlocked", response.data.isBlocked);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.email) {
      checkIfUserIsBlocked(user.email);
    }
  }, [user]);

  const handleSigninSubmit = async (event) => {
    event.preventDefault();
    if (signinEmail && signinPassword) {
      try {
        await signInWithEmailAndPassword(auth, signinEmail, signinPassword);
        Swal.fire("Авторизація успішна", "", "success");
        setUser(auth.currentUser);

        checkIfUserIsBlocked(auth.currentUser.email);

        navigate('/');
      } catch (error) {
        Swal.fire("Помилка входу", error.message, "error");
      }
    }
  };

  const handleBackClick = () => {
    navigate('/');
  }

  const handleRegClick = () => {
    navigate('/register')
  }

  return (
    <div className='auth'>
      <form onSubmit={handleSigninSubmit} className='auth-form'>
        <input value={signinEmail} type="email" name="email" class="input" onChange={(event) => setSigninEmail(event.target.value)} placeholder="Пошта" />
        <input value={signinPassword} type="password" name="password" class="input" onChange={(event) => setSigninPassword(event.target.value)} placeholder="Пароль" />
        <button className='auth-form-submit' type="submit">Увійти</button>
        <button className='auth-signin-form-signup' onClick={handleRegClick}>Ще немає акаунту?</button>
      </form>
      <div className='auth-back'>
        <button><FontAwesomeIcon icon={faArrowLeft} onClick={handleBackClick} /></button>
      </div>
    </div>
  );
}

export default SignInForm;
