import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/auth.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faA, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const handleSignupSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                username,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Signup successful:', data);
            navigate('/');
        } else {
            console.error('Error signing up:', data.error);
        }
    };

    const handleBackClick = () => {
        navigate('/');
    }

    const handleLogClick = () => {
        navigate('/register')
    }

    return (
        <div className='auth'>
            <form onSubmit={handleSignupSubmit} className='auth-form'>
                <input value={email} type="email" name="email" class="input" onChange={(event) => setEmail(event.target.value)} placeholder="Пошта" />
                <input value={password} type="password" name="password" class="input" onChange={(event) => setPassword(event.target.value)} placeholder="Пароль" />
                <input value={username} type="username" name="username" class="input" onChange={(event) => setUsername(event.target.value)} placeholder="Нікнейм" />
                <button className='auth-form-submit' type="submit">Зареєструватись</button>
                <button className='auth-signin-form-signin' onClick={handleLogClick}>Вже є акаунт?</button>
            </form>
            <div className='auth-back'>
                <button ><FontAwesomeIcon icon={faArrowLeft} onClick={handleBackClick} /></button>
            </div>
        </div>
        // <form onSubmit={handleSignupSubmit} className='auth-signup-form'>
        //     <label>
        //         Email:
        //         <input
        //             type="email"
        //             value={email}
        //             onChange={(event) => setEmail(event.target.value)}
        //         />
        //     </label>
        //     <br />
        //     <label>
        //         Password:
        //         <input
        //             type="password"
        //             value={password}
        //             onChange={(event) => setPassword(event.target.value)}
        //         />
        //     </label>
        //     <br />
        //     <label>
        //         Username:
        //         <input
        //             type="username"
        //             value={username}
        //             onChange={(event) => setUsername(event.target.value)}
        //         />
        //     </label>
        //     <br />
        //     <button type="submit">Sign Up</button>
        // </form>
    );
}

export default SignUpForm;
