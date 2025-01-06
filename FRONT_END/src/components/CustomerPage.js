import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './Logout'; // Assuming Logout component exists

const CustomerPage = () => {
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchTriggered, setSearchTriggered] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            alert('No user data found. Redirecting to login...');
            navigate('/login');
        }
    }, [navigate]);

    // Page refresh confirmation
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // Trigger confirmation dialog
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const pgData = [
        { id: 1, name: "Sai PG", location: "Shivaji Nagar", price: "₹5000", ownerName: "Ramesh Kumar", ownerPhone: "+919876543210" },
        { id: 2, name: "Shanti PG", location: "Kothrud", price: "₹7000", ownerName: "Sunita Yadav", ownerPhone: "+919876543211" },
        { id: 3, name: "Dhanraj PG", location: "Gokhalenagar", price: "₹6000", ownerName: "Vijay Sharma", ownerPhone: "+919876543212" }
    ];

    const messData = [
        { id: 1, name: "Tasty Mess", location: "Shivaji Nagar", price: "₹2000", ownerName: "Rohit Shetty", ownerPhone: "+919812345678" },
        { id: 2, name: "Healthy Bites", location: "Kothrud", price: "₹2500", ownerName: "Anita Mehta", ownerPhone: "+919812345679" },
        { id: 3, name: "Food Paradise", location: "Gokhalenagar", price: "₹2200", ownerName: "Arjun Kapoor", ownerPhone: "+919812345680" }
    ];

    const favoritePGs = [
        { id: 1, name: "Sai PG", location: "Shivaji Nagar", price: "₹5000", ownerName: "Ramesh Kumar", ownerPhone: "+919876543210" },
        { id: 2, name: "Shanti PG", location: "Kothrud", price: "₹7000", ownerName: "Sunita Yadav", ownerPhone: "+919876543211" },
        { id: 3, name: "Dhanraj PG", location: "Gokhalenagar", price: "₹6000", ownerName: "Vijay Sharma", ownerPhone: "+919876543212" }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTriggered(true);
        const results = [
            ...pgData.filter(item => item.location.toLowerCase().includes(searchQuery.toLowerCase())),
            ...messData.filter(item => item.location.toLowerCase().includes(searchQuery.toLowerCase()))
        ];
        setSearchResults(results);
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        setSearchResults([]);
        setSearchTriggered(false);
    };

    if (!user) {
        return null; // Avoid rendering if user is not loaded
    }

    const { name } = user;
    const profileInitial = user?.fname ? user.fname.charAt(0).toUpperCase() : '';

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <form className="d-flex mx-auto w-50" onSubmit={handleSearch}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search PGs or Mess by location"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleInputChange}
                                required
                            />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <ul className="navbar-nav ms-2">
                            <li className="nav-item ms-3">
                                <button className="nav-link btn btn-link p-0" onClick={() => setShowFavorites(!showFavorites)}>
                                    Favorites
                                </button>
                            </li>
                            <li className="nav-item ms-3">
                                <button className="nav-link btn btn-link p-0" onClick={() => setShowDropdown(!showDropdown)}>
                                    <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px', fontSize: '18px' }}>
                                        {profileInitial}
                                    </div>
                                </button>
                                {showDropdown && (
                                    <div className="dropdown-menu show" style={{ position: 'absolute', right: '10px' }}>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => setShowProfile(prev => !prev)}
                                        >
                                            View Profile
                                        </button>
                                        <Logout />
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <h2>Welcome {user.fname +" !"}</h2>
                        <p className="lead">Hello {user.fname}, here's your personalized dashboard where you can view your profile, search for PGs, and can view your favorite PG's!</p>
                    </div>
                </div>

                {showProfile && (
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Your Profile</h4>
                                </div>
                                <div className="card-body">
                                    <p><strong>Name:</strong> {user.fname}{user.lname}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                                    <p><strong>Address:</strong> {user.permanentAddress}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showFavorites && (
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Your Favorite PGs</h4>
                                </div>
                                <div className="card-body">
                                    {favoritePGs.length > 0 ? (
                                        <ul>
                                            {favoritePGs.map(pg => (
                                                <li key={pg.id}>
                                                    <strong>{pg.name}</strong> - {pg.location} - {pg.price}
                                                    <br />
                                                    <span><strong>PG Owner:</strong> {pg.ownerName} | <strong>Contact:</strong> {pg.ownerPhone}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>You have no favorite PGs yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {searchTriggered && (
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Search Results</h4>
                                </div>
                                <div className="card-body">
                                    {searchResults.length > 0 ? (
                                        <ul>
                                            {searchResults.map(item => (
                                                <li key={item.id}>
                                                    <strong>{item.name}</strong> - {item.location} - {item.price}
                                                    <br />
                                                    <span><strong>Owner:</strong> {item.ownerName} | <strong>Contact:</strong> {item.ownerPhone}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No results found for "{searchQuery}".</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CustomerPage;
