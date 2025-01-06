import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Axios for API calls.
import Logout from "./Logout"; // Assumes Logout component is defined and handles logout logic.

const CustomerPage = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [searchType, setSearchType] = useState("PG");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showProfile, setShowProfile] = useState(false); // For profile toggle

  const amenities = ["Wi-Fi", "AC", "Laundry"];
  const foodOptions = ["Veg", "Non-Veg"];

  const dummyData = {
    pgs: [
      { id: 1, name: "PG 1", location: "Gokhalenagar", price: "6000", amenities: ["Wi-Fi", "AC"], food: "Veg" },
      { id: 2, name: "PG 2", location: "Shivajinagar", price: "4000", amenities: ["Wi-Fi"], food: "Non-Veg" },
      { id: 3, name: "PG 3", location: "Gokhalenagar", price: "5000", amenities: ["Laundry", "Wi-Fi"], food: "Veg" },
    ],
    messes: [
      { id: 1, name: "Mess 1", location: "Gokhalenagar", price: "3000", food: "Veg" },
      { id: 2, name: "Mess 2", location: "Shivajinagar", price: "4000", food: "Non-Veg" },
      { id: 3, name: "Mess 3", location: "Gokhalenagar", price: "2500", food: "Veg" },
    ],
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("No user data found. Redirecting to login...");
      navigate("/login");
    }
  }, [navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchTriggered(true);

    try {
      const filteredResults =
        searchType === "PG"
          ? dummyData.pgs.filter((pg) => pg.location.toLowerCase().includes(searchQuery.toLowerCase()))
          : dummyData.messes.filter((mess) => mess.location.toLowerCase().includes(searchQuery.toLowerCase()));

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("An error occurred while fetching search results.");
    }
  };

  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleAddToFavorites = async (item) => {
    try {
      await axios.post("/api/favorites", { item });
      setFavorites((prevFavorites) => [...prevFavorites, item]);
      alert(`${item.name} added to favorites!`);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("An error occurred while adding to favorites.");
    }
  };

  const handleViewProfile = () => {
    setShowProfile(!showProfile); // Toggle profile visibility
    setShowProfileModal(false);
  };

  if (!user) {
    return null;
  }

  const { fname, lname, email, phoneNumber, permanentAddress } = user;
  const profileInitial = user?.fname ? user.fname.charAt(0).toUpperCase() : "";

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="navbar-nav ms-auto">
          
            <li className="nav-item ms-3">
              <button
                className="nav-link btn btn-link p-0"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div
                  className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                  style={{ width: "40px", height: "40px", fontSize: "18px" }}
                >
                  {profileInitial}
                </div>
              </button>
              {showDropdown && (
                <div
                  className="dropdown-menu show"
                  style={{ position: "absolute", right: "10px" }}
                >
                  <button
                    className="dropdown-item"
                    onClick={handleViewProfile} // Toggles profile visibility
                  >
                    View Profile
                  </button>
                  <Logout />
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h2>Welcome {fname}!</h2>
            <p className="lead">
              Here's your personalized dashboard to explore PGs and Messes.
            </p>
          </div>
        </div>

        <form onSubmit={handleSearch}>
          <div className="row mb-3">
            <div className="col-md-3">
              <select className="form-select">
                <option>Select City</option>
                <option>Pune</option>
                <option>Mumbai</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                type="search"
                placeholder="Search by location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <button className="btn btn-success w-100" type="submit">
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Profile Modal */}
        {showProfileModal && (
          <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">User Profile</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowProfileModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p><strong>Name:</strong> {fname} {lname}</p>
                  <p><strong>Email:</strong> {email}</p>
                  <p><strong>Phone:</strong> {phoneNumber}</p>
                  <p><strong>Address:</strong> {permanentAddress}</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleViewProfile}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row mb-3">
          <div className="col-md-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="type"
                id="pg"
                value="PG"
                checked={searchType === "PG"}
                onChange={() => setSearchType("PG")}
              />
              <label className="form-check-label" htmlFor="pg">
                PG
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="type"
                id="mess"
                value="Mess"
                checked={searchType === "Mess"}
                onChange={() => setSearchType("Mess")}
              />
              <label className="form-check-label" htmlFor="mess">
                Mess
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle w-100"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {searchType === "PG" ? "Select Amenities" : "Select Food Options"}
              </button>
              <ul
                className="dropdown-menu p-3"
                aria-labelledby="dropdownMenuButton"
              >
                {(searchType === "PG" ? amenities : foodOptions).map((item) => (
                  <li key={item} className="dropdown-item">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`filter-${item}`}
                        onChange={() => toggleFilter(item)}
                      />
                      <label className="form-check-label" htmlFor={`filter-${item}`}>
                        {item}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <h3>Search Results:</h3> 
            {searchTriggered ? (
              <div>
                {searchResults.map((item) => (
                  <div key={item.id} className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Location: {item.location}</p>
                      <p className="card-text">Price: {item.price}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToFavorites(item)}
                      >
                        Add to Favorites
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No results to display.</p>
            )}
          </div>
        </div>

        {/* Display Profile Details Below Search Results */}
        {showProfile && (
          <div className="mt-5">
            <h3>User Profile</h3>
            <p><strong>Name:</strong> {fname} {lname}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phoneNumber}</p>
            <p><strong>Address:</strong> {permanentAddress}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerPage;
