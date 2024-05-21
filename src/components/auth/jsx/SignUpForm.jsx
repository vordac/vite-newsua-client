import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    return (
        <form onSubmit={handleSignupSubmit}>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <br />
            <label>
                Username:
                <input
                    type="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </label>
            <br />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUpForm;
