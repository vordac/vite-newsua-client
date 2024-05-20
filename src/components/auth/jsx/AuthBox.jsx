import React, {useState} from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const AuthBox = ({setUser}) => {
    const [isSignin, setIsSignin] = useState(true);

    const handleToggleAuthBox = () => {
        setIsSignin(!isSignin);
    }

    return (
        <div className="auth-box">
            {isSignin ? (
                <SignInForm onSigninSuccess={(user) => setUser(user)} setUser={setUser} />
            ) : (
                <SignUpForm />
            )}
            <button onClick={handleToggleAuthBox}>
                {isSignin ? 'Need an account?' : 'Already have an account?'}
            </button>
        </div>
    );
}

export default AuthBox;