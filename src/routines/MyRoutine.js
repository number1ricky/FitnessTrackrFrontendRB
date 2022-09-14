import React from 'react';

const MyRoutine = ({routine}) => {
    return (<>
        { routine.creatorName && <div><b>Submitted by:</b>{ routine.creatorName }</div> }
        <div><b>Routine Name:</b>{routine.name}</div>
        <div><b>Goal:</b>{routine.goal}</div>
        <div><b>CreatorName:</b>{routine.creatorName}</div>
        <div><b>Public:</b>{routine.isPublic ? 'Yes' : 'No'}</div>
        {!routine && <Link to="/routines">Back to Routines</Link>}
        {routine.activities?.map((activity) => {
            return  (<>
                
                <div>Activity:{activity.name}</div>
                <div>Activity Id: {activity.id}</div>
                <div>Description: {activity.description}</div>
                <div>Duration: {activity.duration}</div>
                <div>Count: {activity.count}</div>
                <div>Routine Activity:{activity.routineActivityId}</div>
                <div>RoutineId: {activity.routineId}</div>
                
            </>)
        })}
    </>)
}

export default MyRoutine;