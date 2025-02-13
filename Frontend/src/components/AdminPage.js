import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logout from "./Logout";

const AdminPage = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [users, setUsers] = useState([]);
  const [pgs, setPgs] = useState([]);
  const [messes, setMesses] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("No user data found. Redirecting to login...");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (isDataLoaded) {
      if (activeTab === "users") {
        axios.get("http://localhost:8120/crud/getAllUser")
          .then((response) => setUsers(response.data))
          .catch((error) => console.error("Error fetching users:", error));
      }

      if (activeTab === "pgs") {
        axios.get("http://localhost:8120/crud/getAllPg")
          .then((response) => setPgs(response.data))
          .catch((error) => console.error("Error fetching PGs:", error));
      }

      if (activeTab === "messes") {
        axios.get("http://localhost:8120/crud/getAllMess")
          .then((response) => setMesses(response.data))
          .catch((error) => console.error("Error fetching messes:", error));
      }
    }
  }, [activeTab, isDataLoaded]);

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      setIsDataLoaded(false);
      setActiveTab(null);
    } else {
      setActiveTab(tab);
      setIsDataLoaded(true);
    }
  };

  if (!user) {
    return null;
  }

  const { fname, lname, email, phoneNumber, permanentAddress } = user;
  const profileInitial = user?.fname ? user.fname.charAt(0).toUpperCase() : "";

  // Update User Function
  const updateUser = (id) => {
    navigate(`/updateUser/${id}`);
  };

  // Update PG Function
  const updatePg = (pg_id) => {
    navigate(`/updatePg/${pg_id}`);
  };

  // Update Mess Function
  const updateMess = (id) => {
    navigate(`/updateMess/${id}`);
  };

  // Delete User Function
  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:8120/crud/deleteUser/${id}`)
        .then(() => setUsers(users.filter((user) => user.id !== id)))
        .catch((error) => console.error("Error deleting user:", error));
    }
  };

  // Delete PG Function
  const deletePg = (pg_id) => {
    if (window.confirm("Are you sure you want to delete this PG?")) {
      axios.delete(`http://localhost:8120/crud/deletePg/${pg_id}`)
        .then(() => setPgs(pgs.filter((pg) => pg.pg_id !== pg_id)))
        .catch((error) => console.error("Error deleting PG:", error));
    }
  };

  // Delete Mess Function
  const deleteMess = (id) => {
    if (window.confirm("Are you sure you want to delete this mess?")) {
      axios.delete(`http://localhost:8120/deleteMess/${id}`)
        .then(() => setMesses(messes.filter((mess) => mess.id !== id)))
        .catch((error) => console.error("Error deleting mess:", error));
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ms-3">
              <button className="nav-link btn btn-link p-0" onClick={() => setShowDropdown(!showDropdown)}>
                <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center" 
                     style={{ width: "40px", height: "40px", fontSize: "18px" }}>
                  {profileInitial}
                </div>
              </button>
              {showDropdown && (
                <div className="dropdown-menu show" style={{ position: "absolute", right: "10px" }}>
                  <button className="dropdown-item" onClick={() => { setShowProfileModal(true); setShowDropdown(false); }}>
                    View Profile
                  </button>
                  <Logout />
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Profile</h5>
                <button type="button" className="btn-close" onClick={() => setShowProfileModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {fname} {lname}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phoneNumber}</p>
                <p><strong>Address:</strong> {permanentAddress}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowProfileModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mt-5">
        <h2>Welcome {fname}!</h2>
        <p className="lead">Here's your admin dashboard to manage users, PGs, and messes.</p>

        <div className="d-flex justify-content-center align-items-center" style={{ width: "50vh" }}>
          <button className="btn btn-primary me-2" onClick={() => handleTabClick("users")}>Users</button>
          <button className="btn btn-primary me-2" onClick={() => handleTabClick("pgs")}>PGs</button>
          <button className="btn btn-primary" onClick={() => handleTabClick("messes")}>Messes</button>
        </div>

        <div className="mb-3 mt-4">
          {activeTab === "users" && isDataLoaded && (
            <table className="table table-striped text-center">
              <thead>
                <tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Action</th></tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.fname} {user.lname}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.permanentAddress}</td>
                    <td className="d-flex justify-content-start">
                      <button className="btn btn-primary btn-sm me-2"
                       onClick={() => updateUser(user.id)}
                       disabled={user.role.rid === 3} // Disable delete if rid is 3
                       >
                        Update
                        </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUser(user.id)}
                        disabled={user.role.rid === 3} // Disable delete if rid is 3
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "pgs" && isDataLoaded && (
            <table className="table table-striped text-center">
              <thead>
                <tr><th>PG Name</th><th>Address</th><th>Price</th><th>Action</th></tr>
              </thead>
              <tbody>
                {pgs.map((pg) => (
                  <tr key={pg.pg_id}>
                    <td>{pg.pgName}</td>
                    <td>{pg.pgAddress}</td>
                    <td>₹{pg.pricing}</td>
                    <td className="d-flex justify-content-start">
                      <button className="btn btn-primary btn-sm me-2" onClick={() => updatePg(pg.pg_id)}>Update</button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deletePg(pg.pg_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "messes" && isDataLoaded && (
            <table className="table table-striped text-center">
              <thead>
                <tr><th>Mess Name</th><th>Address</th><th>Price</th><th>Action</th></tr>
              </thead>
              <tbody>
                {messes.map((mess) => (
                  <tr key={mess.id}>
                    <td>{mess.messName}</td>
                    <td>{mess.messAddress}</td>
                    <td>₹{mess.pricing}</td>
                    <td className="d-flex justify-content-start">
                      <button className="btn btn-primary btn-sm me-2" onClick={() => updateMess(mess.id)}>Update</button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteMess(mess.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;