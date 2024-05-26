import React, { useState, useEffect } from 'react';
import '../css/profile.css';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { getAuth, onAuthStateChanged, updateEmail, updatePassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { app } from '../../../services/Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [userData, setUserData] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handlePasswordChange = async () => {
        const result = await Swal.fire({
            title: 'Зміна паролю',
            input: 'password',
            inputPlaceholder: 'Введіть новий пароль',
            inputAttributes: {
                autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Зберегти',
            cancelButtonText: 'Скасувати',
        });
    
        if (result.isConfirmed) {
            setPassword(result.value);
        }
    };

    const handleSave = async () => {
        setError('');
        setLoading(true);

        if (!username || !email || !password) {
            setError('Будь ласка, заповніть усі поля');
            setLoading(false);
            return;
        }

        const auth = getAuth(app);
        const db = getFirestore(app);
        const user = auth.currentUser;

        try {
            if (user.email !== email) {
                await updateEmail(user, email);
            }

            if (password) {
                await updatePassword(user, password);
            }

            await setDoc(doc(db, 'users', user.uid), {
                username,
                email,
                password,
            }, { merge: true });

            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Успіх!',
                text: 'Дані успішно збережені.',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/');
            });
        } catch (err) {
            setError(err.message);
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Помилка!',
                text: err.message,
                confirmButtonText: 'OK',
            });
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    useEffect(() => {
        const auth = getAuth(app);
        const db = getFirestore(app);

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    setUserData(userDocSnap.data());
                    setUsername(userDocSnap.data().username);
                    setEmail(userDocSnap.data().email);
                    setPassword(userDocSnap.data().password);
                    switch (userDocSnap.data().role) {
                        case "admin":
                            setRole("Адміністратор")
                            break;
                        case "moder":
                            setRole("Модератор")
                            break;
                        case "author":
                            setRole("Автор")
                            break;
                    }
                } else {
                    console.log('No such document!');
                }
            } else {
                console.log('User is signed out');
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className='profile-container'>
            {userData ? (
                <div className='profile'>
                    <div className='profile-label'>НАЛАШТУВАННЯ ПРОФІЛЮ</div>
                    <div className='profile-form'>
                        <label htmlFor='username'>
                            Нікнейм
                            <input type='text' id='username' name='username' value={username} onChange={handleInputChange} />
                        </label>
                        <label htmlFor='email'>
                            Пошта
                            <input type='email' id='email' name='email' value={email} readOnly />
                        </label>
                        <label htmlFor='email'>
                            Роль
                            <input type='role' id='role' name='role' value={role} readOnly />
                        </label>
                        {error && <p className='error'>{error}</p>}
                        <div className='profile-form-buttons'>
                            <button type='button' onClick={handlePasswordChange}>Змінити пароль</button>
                            <button type='button' onClick={handleSave} disabled={loading}>Зберегти</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Завантаження...</div>
            )}
        </div>
    );
};

export default Profile;
