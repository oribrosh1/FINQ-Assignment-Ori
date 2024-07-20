import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
    const navigate = useNavigate();

    const handleFetchUsers = () => {
        navigate('/users'); // Navigates to Screen 1
    };

    const handleViewHistory = () => {
        navigate('/saved-users'); // Navigates to Screen 2
    };

    return (
        <div>
            <button onClick={handleFetchUsers}>Fetch</button>
            <button onClick={handleViewHistory}>History</button>
        </div>
    );
};

export default HomeScreen;
