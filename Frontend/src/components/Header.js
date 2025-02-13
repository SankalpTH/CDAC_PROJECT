// Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux state

const Header = () => {
    const mystate = useSelector(state => state.logged); // Get login state from Redux
    console.log(mystate);

    return (
        <div>
            {!mystate.loggedIn && (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
                    <div className="container">
                        <NavLink className="navbar-brand fw-bold text-warning" to="/">PG Explorer</NavLink>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link text-light fw-semibold px-3 py-2 rounded-pill btn btn-outline-secondary mx-2" to="/" exact>
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-light fw-semibold px-3 py-2 rounded-pill btn btn-outline-danger mx-2" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-light fw-semibold px-3 py-2 rounded-pill btn btn-outline-success mx-2" to="/register">
                                        Register
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )}
        </div>
    );
};

export default Header;
