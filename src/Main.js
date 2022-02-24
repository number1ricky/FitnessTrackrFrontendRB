import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { callApi } from './api/index';
import { AllRoutines, CreateRout, EditRout, Routine, MyRoutines, MyRoutine } from './routines';
import { AllActivities, CreateAct, EditAct, AddActtoRout } from './activities';
import { AccountForm } from "./account/AccountForm"
import './Main.css'

export const Main = () => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});
    const [activities, setActivities] = useState([]);
    const [routines, setRoutines] = useState([]);
    const [myRoutines, setMyRoutines] = useState([]);
    const navigate = useNavigate();
    const isLoggedIn = user.username !== undefined;

    const logOut = () => {
        localStorage.removeItem('st-token');
        setToken('');
        setUser({});
        navigate('/')
    };

    const fetchUserData = async (token) => {
        const data  = await callApi({
            url: '/users/me',
            token,
        });
        return data;
    };

    const fetchMyRoutines = async (username, token) => {
        const myRoutines = await callApi({
            url: `/users/${username}/routines`,
            method: 'GET',
            token
        });
        return myRoutines;

    };

    const fetchAllActivities = async (token) => {
        const activities = await callApi({
            url: '/activities',
            token,
    }); 
        return activities;
    };

    useEffect(async () => {
        if (!token) {
            setToken(localStorage.getItem('st-token'));
            return;
        }
        const data = await fetchUserData(token);
        setUser(data);
    }, [token]);

    return (<>
        {!isLoggedIn && <h1 className="greeting">Welcome to Fitness Trackr</h1>}

        {isLoggedIn ? (<>
            <h1 className="greeting">WELCOME {user.username}</h1>
            <div className='header'>
            <button className="headerButton" ><Link to="/my_routines">My Routines</Link></button>
            <button className="headerButton" ><Link to="/routines">Routines</Link></button>
            <button className="headerButton" ><Link to="/create_routine">Add Routine</Link></button>
            <button className="headerButton" ><Link to="/activities">Activities</Link></button>
            <button className="headerButton" ><Link to="/create_activity">Add Activity</Link></button>
            <button className="headerButton"  onClick={logOut}>Log Out</button>
            </div>
        </>)
        : ( <>
            <div className='header'>
            <button className="headerButton"><Link to="/account/register">Register</Link></button>
            <button className="headerButton"><Link to="/account/login">Login</Link></button>
            <br></br>
            <button className="headerButton"><Link to="/routines">Routines</Link></button>
            <button className="headerButton"><Link to="/activities">Activities</Link></button>
            </div>
        </>)}

        <Routes>
            <Route path="/create_routine" exact element={<CreateRout action="Create Routine" token={token}/>}/>
            <Route path="/create_activity" exact element={<CreateAct action="Create Activity" token={token} />}/>
            <Route path="/routines" exact element={ <AllRoutines routines={routines} token={token} user = {user} />}/>
            <Route path="/routine" exact element={<Routine routines={routines} token={token} user = {user} />}/>
            <Route path="/my_routine" exact element={ <MyRoutine token={token} user = {user} />}/>
            <Route path="/my_routines" exact element={ <MyRoutines token={token} user={user} fetchMyRoutines={fetchMyRoutines} myRoutines={myRoutines} setMyRoutines={setMyRoutines} />}/>
            <Route path="/edit_activity/:activityId" exact element={<EditAct setActivities={setActivities} user={user} fetchAllActivities={fetchAllActivities} activities={activities} token={token} />}/>
            <Route path="/add_activitytoroutine"exact element={<AddActtoRout action="AddActtoRout" token={token} user = {user} routines = {routines} />}/>
            <Route path="/activities" exact element={<AllActivities isLoggedIn={isLoggedIn} setActivities={setActivities} fetchAllActivities={fetchAllActivities} activities={activities}  user={user} token={token} />}/>
            <Route path="/account/:action" exact element={<AccountForm setToken={setToken} />}/>
        </Routes>

        
    </>
    );
};

export default Main;