import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


const Activity = ({activity, activities, token, user}) => {
    const { activityId } = useParams();

    if (activities.length === 0) return null;
    let activityToRender;

    if (activity) {
        activityToRender = activity;
    } else {
        activityToRender = activities.find((activity) => activityId === activity.id);
    }


return (
<>
        
{
activityToRender.username
? 
<div>Submitted by: {activityToRender.username }</div>
:
null
}
<div className='cardHolderActivities'>
<div><b>Name:</b> {activityToRender.name}</div>
<div><b>Id:</b>{activityToRender.id}</div>
<div><b>Count:</b>{activityToRender.count}</div>
<div><b>Duration:</b>{activityToRender.duration}</div>
</div>
{!activity ? <Link to="/activities">Back to Activities</Link> : null}

{activity.activities?.map((routine) => {return  (
<>
<div><b>Name:</b> {routine.name}</div>
<div><b>Count:</b>{routine.count}</div>
<div><b>Description:</b>{routine.description}</div>
<div><b>Goal:</b> {routine.goal}</div>
</>
)
})}
</>       
);
};

export default Activity;