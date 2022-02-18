import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { callApi } from '../api';



const EditAct = ({token, activities, fetchAllActivities, user, setAllActivities}) => {
    const navigate = useNavigate();
    const {activityId} = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [count, setCount] = useState('');
    console.log(activities);

    useEffect(async () => {
        if (user && user.username) {
            const fetchedAllActivites = await fetchAllActivities(user.username, token);
            console.log("Fetched Activites", fetchedAllActivites)
            setAllActivities(fetchedAllActivites);
        } 
        let activityToRender = activities.find((activity) => { 
            return Number(activityId) === Number(activity.id)
        });
        
        const [name, setName] = useState(activityToRender.name);
        const [description, setDescription] = useState(activityToRender.description);
        const [duration, setDuration] = useState(activityToRender.duration);
        const [count, setCount] = useState(activityToRender.count);

    },[user]);

    const editAct = async (event) => {
        event.preventDefault();
        const data = await callApi({
            url: `/activities/${activityId}`,
            method: 'PATCH',
            body:{
                  name: name,
                  description: description,
                  duration: duration,
                  count: count,
            }, token:token
});
        navigate('/activities');
        window.location.reload()
    console.log(data)
};
    
return (
    <>
    <h3>Edit Activity</h3>
    <div className='editActSubmission'>
    <form onSubmit={editAct}>
        <div id ="TextField">
        <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}></input>
        <input type="text" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)}></input>
        <input type="text" placeholder="Duration" value={duration} onChange={(event) => setDuration(event.target.value)}></input>
        <input type="text" placeholder="Count" value={count} onChange={(event) => setCount(event.target.value)}></input>
    </div>
    <button type="submit">Sumbit</button>
    </form>
    <button>
        <Link to="/">Home</Link>
    </button>
    </div>
</>
);
};

export default EditAct;


    