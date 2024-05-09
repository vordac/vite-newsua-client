import { useState } from 'react';

export function SignInForm() {
    const [signinEmail, setSigninEmail] = useState('');
    const [signinPassword, setSigninPassword] = useState('');
  
    const handleSigninSubmit = async (event) => {
      event.preventDefault();
  
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signinEmail,
          password: signinPassword,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Signin successful:', data);
  
        // Store the ID token in an HttpOnly cookie
        document.cookie = `idToken=${data.idToken}; HttpOnly; Secure; Path=/; Max-Age=${60 * 60 * 24 * 7}`; // Cookie expires in 7 days
      } else {
        console.error('Error signing in:', data.error);
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