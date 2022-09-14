import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { callApi } from '../api';

const Routine = ({routine, routines, token, user, isLoggedIn}) => {
    const { routineId } = useParams();
    const navigate = useNavigate();
    if (routines.length === 0) return null;
    let routineToRender;
    if (routine) {
        routineToRender = routine;
    } else {
        routineToRender = routines.find((routine) => routineId === routine.id);
}

return ( 
<>
{routineToRender.username
? 
<div><b>Submitted by:</b>{routineToRender.username }</div>
:
null}
<div><b>Routine Name:</b>{routineToRender.name}</div>
<div><b>Goal:</b>{routineToRender.goal}</div>
<div><b>CreatorName:</b>{routineToRender.creatorName}</div>
{!routine ? <Link to="/routines">Back to Routines</Link> : null}


{routine.activities?.map((activity) => {
  return  (
<>
<div className='routineActivitiesBox'>
    <div id="activityName"><b>Activity: {activity.name}</b></div>
    <div id="activityID"><i>Activity Id: {activity.id}</i></div>
    <div id="activityDescription"><i>Description: {activity.description}</i></div>
    <div id="activityDuration"><i>Duration: {activity.duration}</i></div>
    <div id="activityCount"><b><i>Count: {activity.count}</i></b></div>
    <div id="routineActivity"><i>Routine Activity:{activity.routineActivityId}</i></div>
    <div id="routineID"><i>RoutineId: {activity.routineId}</i></div>
</div>
</>
)
})}
</>    
);
};

export default Routine;