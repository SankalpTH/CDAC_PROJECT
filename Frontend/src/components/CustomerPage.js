import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logout from "./Logout";


const CustomerPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [searchType, setSearchType] = useState("PG");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [pgList, setPgList] = useState([]); // Store PGs from API

  const amenities = ["Wi-Fi", "AC", "Laundry"];
  const foodOptions = ["Veg", "Non-Veg"];


  // Fetch user details from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("No user data found. Redirecting to login...");
      navigate("/login");
    }
  }, [navigate]);

  // Fetch all PGs
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/getAllPg")
  //     .then((response) => {
  //       setPgList(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching PGs:", error);
  //     });
  // }, []);

  // Fetch cities from the database
  useEffect(() => {
    axios
      .get("http://localhost:8120/crud/getAll")
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, []);

  // Handle Search
  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   setSearchTriggered(true);

  //   try {
  //     const filterData = {
  //       areaName: searchQuery,
  //       cityId: cities.find((city) => city.city_name === selectedCity)?.city_id || 0,
  //       wifi: selectedFilters.includes("Wi-Fi"),
  //       ac: selectedFilters.includes("AC"),
  //       laundry: selectedFilters.includes("Laundry"),
  //     };

  //     const response = await axios.post("http://localhost:8123/searchPg", filterData);
  //     setSearchResults(response.data);
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //     alert("An error occurred while fetching search results.");
  //   }
  // };
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchTriggered(true);
  
    try {
      let filterData;
  
      if (searchType === "PG") {
        filterData = {
          areaName: searchQuery,
          cityId: cities.find((city) => city.city_name === selectedCity)?.city_id || 0,
          wifi: selectedFilters.includes("Wi-Fi"),
          ac: selectedFilters.includes("AC"),
          laundry: selectedFilters.includes("Laundry"),
        };
      } else if (searchType === "Mess") {
        filterData = {
          messType: selectedFilters.length ? selectedFilters[0] : "Veg", // Defaults to Veg
          areaName: searchQuery,
          cityId: cities.find((city) => city.city_name === selectedCity)?.city_id || 0,
        };
      }
      console.log(filterData)
      const response = await axios.post(
        searchType === "PG" ? "http://localhost:8120/crud/searchPg" : "http://localhost:8120/crud/searchMess",
        filterData
      );
  
      setSearchResults(response.data);
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
      alert(`${item.name} added to favorites!`);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("An error occurred while adding to favorites.");
    }
  };

  if (!user) {
    return null;
  }



  const { fname, lname, email, phoneNumber, permanentAddress } = user;
  const profileInitial = user?.fname ? user.fname.charAt(0).toUpperCase() : "";
 
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
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
                    onClick={() => {
                      setShowProfileModal(true);
                      setShowDropdown(false);
                    }}
                  >
                    View Profile
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/favorites")} // Navigate to View Favorites
                  >
                    View Favorites
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

        {/* Search Form */}
        <form onSubmit={handleSearch}>
          <div className="row mb-3">
            <div className="col-md-3">
              <select className="form-select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} required>
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.city_id} value={city.city_name}>{city.city_name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                type="search"
                placeholder="Search by area"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <button className="btn btn-success w-100" type="submit">Search</button>
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
                  <Link to="/change-password" className="btn btn-link">Change Password</Link>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowProfileModal(false)}
                  >
                    Close
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
                        value={item}
                        onChange={() => toggleFilter(item)}
                        checked={selectedFilters.includes(item)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`filter-${item}`}
                      >
                        {item}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-2">
              Selected: {selectedFilters.length ? selectedFilters.join(", ") : "None"}
            </p>
            {console.log(selectedFilters)}
          </div>
        </div>

        {searchTriggered && (
          <>
            <h4>Search Results:</h4>
            <div className="row">
              {searchResults.length > 0 ? (
                searchResults.map((pg) => (
                  <div key={pg.pgId} className="col-md-4">
                    <Link to={`/pg/${pg.pgId}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <div className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{pg.pgName}</h5>
                          <p className="card-text">Price: ₹{pg.pricing}</p>
                          <p className="card-text">
                            Amenities: {pg.wifi ? "Wi-Fi, " : ""}
                            {pg.ac ? "AC, " : ""}
                            {pg.laundry ? "Laundry" : ""}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p>No results found.</p>
              )}
            </div>
          </>
        )}

      </div>
      {/* <h4>Available PGs:</h4>   */}
      <div className="row">
        {pgList.map((pg) => (
          <div key={pg.pgId} className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{pg.pgName}</h5>
                <p className="card-text">Price: ₹{pg.pricing}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </>

  );
};











export default CustomerPage;