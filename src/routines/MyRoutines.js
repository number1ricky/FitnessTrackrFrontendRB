import React, {useState, useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { callApi } from '../api';
import { MyRoutine } from '.';

const MyRoutines = ({token, user, fetchMyRoutines, myRoutines, setMyRoutines}) => {
   
    const navigate= useNavigate();
  
    useEffect(async () => {
        if (user && user.username) {
            const fetchedMyRoutines = await fetchMyRoutines(user.username, token);
            console.log("Fetched My Routines", fetchedMyRoutines)
            setMyRoutines(fetchedMyRoutines);
        }
    },[user]);

    return <>
        <button>
            <Link to="/">Home</Link>
        </button>
        <h2 className="myRoutinesTitle">My Routines</h2>
        <div id = "myRoutineContainer"> 
            {myRoutines.map((routine) => {
                return (<div key={routine.id}>
                    <MyRoutine routine={routine} />
        
            
                </div>)
            })}
        </div>
    </>;
};


export default MyRoutines;