import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from './Logout';
import AddMessForm from './AddMessForm';
import AddPGForm from './AddPGForm';

const OwnerPage = () => {
    const { type: ownerType } = useParams();
    const [pgList, setPgList] = useState([]);
    const [messList, setMessList] = useState([]);  // New state for storing added mess
    const [showPgList, setShowPgList] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);
    const [showAddPGForm, setShowAddPGForm] = useState(false);
    const [showAddMessForm, setShowAddMessForm] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [currentOwner, setCurrentOwner] = useState(null);

    const favoriteCustomers = useSelector((state) => state.customers?.favoriteCustomers || []);

    useEffect(() => {
        const ownerData = localStorage.getItem('user');
        if (ownerData) {
            setCurrentOwner(JSON.parse(ownerData));
        } else {
            console.error('No owner data found in localStorage.');
        }
    }, []);

    if (!currentOwner) {
        return <div>Loading owner information...</div>;
    }

    const profileInitial = currentOwner?.fname ? currentOwner.fname.charAt(0).toUpperCase() : '';

    const toggleAddPGForm = () => {
        setShowAddPGForm((prev) => !prev);
        setShowAddMessForm(false); // Hide Mess form
    };

    const toggleAddMessForm = () => {
        setShowAddMessForm((prev) => !prev);
        setShowAddPGForm(false); // Hide PG form
    };

    const handlePGAddSuccess = (newPG) => {
        setPgList((prev) => [...prev, newPG]);
        setShowAddPGForm(false); // Hide the form
    };

    const handleMessAddSuccess = (newMess) => {
        setMessList((prev) => [...prev, newMess]);  // Add the newly registered mess to the list
        setShowAddMessForm(false); // Hide the form
    };

    const toggleProfile = () => {
        setShowProfile((prev) => !prev);
        setShowAddPGForm(false);
        setShowAddMessForm(false);
        setShowFavorites(false);
        setShowPgList(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-brand">Owner Dashboard</span>

                    <button
                        className="btn btn-outline-primary btn-sm ms-2"
                        onClick={ownerType === 'PG' ? toggleAddPGForm : toggleAddMessForm}
                    >
                        {ownerType === 'PG' ? 'Add PG' : 'Add Mess'}
                    </button>

                    <button
                        className="btn btn-outline-secondary btn-sm ms-2"
                        onClick={() => setShowPgList(!showPgList)}
                    >
                        Your {ownerType}
                    </button>

                    <button
                        className="btn btn-outline-info btn-sm ms-2"
                        onClick={() => setShowFavorites((prev) => !prev)}
                    >
                        View Favorites
                    </button>

                    <div className="ms-auto">
                        <button
                            className="btn btn-link p-0"
                            onClick={() => setShowProfileDropdown((prev) => !prev)}
                        >
                            <div
                                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                                style={{ width: '40px', height: '40px', fontSize: '18px' }}
                            >
                                {profileInitial}
                            </div>
                        </button>
                    </div>

                    {showProfileDropdown && (
                        <div
                            className="dropdown-menu show"
                            style={{ position: 'absolute', right: '10px', top: '50px' }}
                        >
                            <button className="dropdown-item" onClick={toggleProfile}>
                                {showProfile ? 'Hide Profile' : 'View Profile'}
                            </button>
                            <Logout />
                        </div>
                    )}
                </div>
            </nav>

            <div className="container mt-5">
                <h2>Welcome, {currentOwner.fname}!</h2>
                <p>This is your dashboard for managing {ownerType.toLowerCase()} operations.</p>

                {showProfile && (
                    <div className="card mt-4">
                        <div className="card-header">
                            <h4>Your Profile</h4>
                        </div>
                        <div className="card-body">
                            <p><strong>Name:</strong> {currentOwner.fname} {currentOwner.lname}</p>
                            <p><strong>Email:</strong> {currentOwner.email}</p>
                            <p><strong>Phone Number:</strong> {currentOwner.phoneNumber}</p>
                            <p><strong>Address:</strong> {currentOwner.permanentAddress}</p>
                        </div>
                    </div>
                )}

                {showAddPGForm && <AddPGForm ownerData={currentOwner} onSuccess={handlePGAddSuccess} />}
                {showAddMessForm && <AddMessForm ownerData={currentOwner} onSuccess={handleMessAddSuccess} />}

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

                {showPgList && ownerType === 'PG' && (
                    <div className="mt-4">
                        <h4>Your PGs</h4>
                        {pgList.length > 0 ? (
                            <ul>
                                {pgList.map((pg, index) => (
                                    <li key={index}>
                                        <strong>{pg.pgName}</strong> - {pg.pgAddress}, ₹{pg.pricing}/month
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No PGs added yet.</p>
                        )}
                    </div>
                )}

                {showPgList && ownerType === 'Mess' && (
                    <div className="mt-4">
                        <h4>Your Messes</h4>
                        {messList.length > 0 ? (
                            <ul>
                                {messList.map((mess, index) => (
                                    <li key={index}>
                                        <strong>{mess.messName}</strong> - {mess.messAddress}, ₹{mess.pricing}/month
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No Messes added yet.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default OwnerPage;
