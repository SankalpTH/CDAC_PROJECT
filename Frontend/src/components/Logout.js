//Logout.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../Store'; // Import setLoggedIn action
import { useNavigate } from 'react-router-dom';
import { logout } from './slice';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const handleLogout = () => {
    //     localStorage.removeItem('user');
    //     dispatch(setLoggedIn(false)); // Set loggedIn to false in Redux state
    //     navigate('/'); // Redirect to login page
    // };

    const handleLogout = () => {
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if (isConfirmed === true) {
            // Clear user data from localStorage (optional)
            localStorage.removeItem("user");
            console.log("true")
            dispatch(logout());

            // Redirect to login page
            navigate('/')
        }
        // else{
        //     console.log("false")
        //     return;
        // }
    };

    return (
        <button className="dropdown-item" onClick={handleLogout}>Logout</button>
    );
};

export default Logout;