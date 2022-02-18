import React, {useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Activity } from '.';


const AllActivities = ({ isLoggedIn, user, token, activities, fetchAllActivities, setActivities}) => {
const navigate = useNavigate();

useEffect(async () => {
    if (activities.length === 0) {
        const fetchedActivities = await fetchAllActivities(token);
        console.log("Fetched Activities", fetchedActivities)
        setActivities(fetchedActivities);
    }
},[]);
console.log("Activities:", activities)

return (
    
<>

<button><Link to="/">Home</Link></button>
<div></div>

<h2 className="activitiesTitle">Activities</h2>

<div id = "activityContainer"> {activities?.map((activity) => (<div key={activity.id}>
        <Activity activities={activities} activity={activity} user={user} />
        {isLoggedIn? <button> <Link to={`/edit_activity/${activity.id}`}>Edit Activity</Link></button>: null} 
        {/* {<button> <Link to={`/delete_activity/${activity.id}`}>Delete</Link></button>} */} <br></br><br></br>
    </div>
                
))}
</div>
</>
);
};

export default AllActivities;