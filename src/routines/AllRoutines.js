import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Routine } from '../routines';
import { callApi } from '../api';


const AllRoutines = ({user, token}) => {
    const [routines, setRoutines] = useState([]);

    const fetchAllRoutines = async (token) => {
        const routines = await callApi({
            url: '/routines',
            method: 'GET',
            token,
        });
        return routines;
    };
 useEffect(async () => {
        if (routines.length === 0) {
            const fetchedRoutines = await fetchAllRoutines(token);
            // console.log("Fetched Routines", fetchedRoutines)
            setRoutines(fetchedRoutines);
    }
    },[]);

return (
    <>
<button className="LargeButton">
    <Link to="/">Home</Link>
</button>
    <div></div>
<h2 className="routinesTitle">Routines</h2>
<div id ="routineContainer"> {routines?.map((routine) => (
<div key={routine.id}>
    <Routine routines={routines} routine={routine} />
</div>
        
))}
</div>
</>
);
};

export default AllRoutines;