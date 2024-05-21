import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../../services/Firebase';
import Swal from 'sweetalert2';

const SignInForm = ({ setUser }) => {
  const auth = getAuth(app);
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  const navigate = useNavigate();

  const handleSigninSubmit = async (event) => {
    event.preventDefault();
    if (signinEmail && signinPassword) {
      try {
        await signInWithEmailAndPassword(auth, signinEmail, signinPassword);
        Swal.fire("Авторизація успішна", "", "success");
        setUser(auth.currentUser);
        navigate('/');
      } catch (error) {
        Swal.fire("Помилка входу", error.message, "error");
      }
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
