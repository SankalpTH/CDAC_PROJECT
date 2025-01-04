import React, { useState, useEffect } from 'react';
import { useParams,useNavigate,Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from './Logout';

const OwnerPage = () => {
    const { type: ownerType } = useParams();
    const navigate = useNavigate();
    const [pgList] = useState([]);
    //const [showMesslist] = useState([]);
    const [showPgList, setShowPgList] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [currentOwner, setCurrentOwner] = useState(null);

    const favoriteCustomers = useSelector((state) => state.customers?.favoriteCustomers || []);
     
     console.log(currentOwner);
    // Fetch data from localStorage
    useEffect(() => {
        const ownerData = localStorage.getItem('user');
        if (ownerData) {
            setCurrentOwner(JSON.parse(ownerData));
        } else {
            console.error('No owner data found in localStorage.');
        }
    }, []);

    // Check if currentOwner exists
    if (!currentOwner) {
        return <div>Loading owner information...</div>;
    }

  //  const profileInitial = currentOwner.name.charAt(0).toUpperCase();
 // const { name } = currentOwner;

  const profileInitial = currentOwner?.fname ? currentOwner.fname.charAt(0).toUpperCase() : '';

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-brand">Owner Dashboard</span>

                    {/* Add PG, Your PG, and View Favorites Options */}
                    {ownerType === 'PG' && (
                        <>
                            <button
                                className="btn btn-outline-primary btn-sm ms-2"
                                onClick={() => navigate('addpg')}
                            >
                                Add PG
                            </button>
                            <button
                                className="btn btn-outline-secondary btn-sm ms-2"
                                onClick={() => setShowPgList(!showPgList)}
                            >
                                Your PG
                            </button>
                        </>
                    )}

                    {ownerType === 'Mess' && (
                        <>
                            <button
                                className="btn btn-outline-primary btn-sm ms-2"
                                onClick={() => navigate('addmess')}
                            >
                                Add Mess
                            </button>
                            <button
                                className="btn btn-outline-secondary btn-sm ms-2"
                                onClick={() => setShowPgList(!showPgList)}
                            >
                                Your Mess
                            </button>
                        </>
                    )}

                    <button
                        className="btn btn-outline-info btn-sm ms-2"
                        onClick={() => setShowFavorites(!showFavorites)}
                    >
                        View Favorites
                    </button>

                    {/* Profile Icon */}
                    <div className="ms-auto">
                        <button
                            className="btn btn-link p-0"
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                        >
                            <div
                                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                                style={{ width: '40px', height: '40px', fontSize: '18px' }}
                            >
                                {profileInitial}
                            </div>
                        </button>
                    </div>

                    {/* Dropdown Menu for Profile and Logout */}
                    {showProfileDropdown && (
                        <div
                            className="dropdown-menu show"
                            style={{ position: 'absolute', right: '10px', top: '50px' }}
                        >
                            <button
                                className="dropdown-item"
                                onClick={() => setShowProfile(true)}
                            >
                                View Profile
                            </button>
                            <Logout />
                        </div>
                    )}
                </div>
            </nav>

            <div className="container mt-5">
                <h2>Welcome, {currentOwner.fname}!</h2>
                <p>This is your dashboard for managing {ownerType.toLowerCase()} operations.</p>
                <Outlet />
                {/* Profile Section */}
                {showProfile && (
                    <div className="card mt-4">
                        <div className="card-header">
                            <h4>Your Profile</h4>
                        </div>
                        <div className="card-body">
                            <p>
                                <strong>Name:</strong> {currentOwner.fname}
                            </p>
                            <p>
                                <strong>Email:</strong> {currentOwner.email}
                            </p>
                            <p>
                                <strong>Phone Number:</strong> {currentOwner.phoneNumber}
                            </p>
                            <p>
                                <strong>Address:</strong> {currentOwner.permanentAddress}
                            </p>
                        </div>
                    </div>
                )}

                {/* Favorite Customers Section */}
                {showFavorites && (
                    <div className="mt-4">
                        <h4>Customers Who Favorited Your {ownerType}</h4>
                        {favoriteCustomers.length > 0 ? (
                            <ul>
                                {favoriteCustomers.map((customer) => (
                                    <li key={customer.email}>
                                        {customer.name} - {customer.address}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No customers have favorited your {ownerType.toLowerCase()} yet.</p>
                        )}
                    </div>
                )} 

                {/* Your PG Section */}
                {showPgList && (
                    <div className="mt-4">
                        <h4>Your PGs</h4>
                        {pgList.length > 0 ? (
                            <ul>
                                {pgList.map((pg, index) => (
                                    <li key={index}>
                                        <strong>{pg.name}</strong> - {pg.address}, ₹{pg.pricing}/month
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No PGs added yet.</p>
                        )}
                        
                    </div>
                )} 
                 {/* {showMesslist && (
                    <div className="mt-4">
                        <h4>Your Mess</h4>
                        {showMesslist.length > 0 ? (
                            <ul>
                                {showMesslist.map((Mess, index) => (
                                    <li key={index}>
                                        <strong>{Mess.name}</strong> - {Mess.address}, ₹{Mess.pricing}/month
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No Mess added yet.</p>
                        )}
                        
                    </div>
                )}  */}
            </div>
        </>
    );
};

export default OwnerPage;
