import React, { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';

const Profile = () => {
    const userInfoString = sessionStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    return(
        <div>
            {userInfo.name}
        </div>
    );
}

export default Profile;