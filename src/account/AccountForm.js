import React, { useState } from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import { callApi } from '../api';

export const AccountForm = ({ setToken }) => {
    const { action } = useParams()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isLogin = action === 'login';
    const title = isLogin ? 'Login' : 'Register';
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await callApi({
            url: `/users/${action}`,
            body: { username, password },
            method: 'POST',
        });
        
        try { 
            const { token } = data;
            if (token) {
                localStorage.setItem( 'st-token', token );
                setToken(token);
                navigate('/');
            }
        } catch (error) {
            window.alert("Wrong Username/Password")
        }
    };

    return (<>
        <h1 className='accountTitle'>{title}</h1>
        <div className='submissionForm'>
        <form className='formHolder' onSubmit={handleSubmit}>
            <input className='subFormInput'
                type="text"
                placeholder="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}>
            </input>
            <input className='subFormInput'
                type="password"
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}>
            </input>
            <button id="regLoginInput" type="submit">{title}</button>
        </form>
        <button id="homeButton">
            <Link to="/">Home</Link>
        </button>
        </div>
    </>);
};

export default AccountForm ;