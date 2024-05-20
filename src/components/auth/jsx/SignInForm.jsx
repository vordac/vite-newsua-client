import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInForm = ({ onSigninSuccess, setUser }) => {
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  const navigate = useNavigate();

  const handleSigninSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signinEmail,
          password: signinPassword,
        }),
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Error signing in');
      }
  
      const data = await response.json();
      const user = data.user;
      setUser(user);
  
      console.log('Signin successful:', data);
      navigate('/');
  
      onSigninSuccess(data.user || {});
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <form onSubmit={handleSigninSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={signinEmail}
          onChange={(event) => setSigninEmail(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={signinPassword}
          onChange={(event) => setSigninPassword(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Sign In</button>
    </form>
  );
}

export default SignInForm;

