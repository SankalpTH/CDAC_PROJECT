import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.uid;

  useEffect(() => {
    console.log("Fetching favorites for user ID:", userId);
    axios.get(`http://localhost:9124/basic/api/Favourite/GetFavouritePGs?uid=${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Ensure credentials are passed
    })
    .then((response) => {
      console.log("API Response:", response.data); // Check if data is received
      setFavorites(response.data);
    })
    .catch((error) => {
      console.error("Error fetching favorite PGs:", error);
    });
  }, []);
  
  console.log(userData);
console.log(userId);
  return (
    <div className="container mt-4">
      <h2>My Favorite PGs</h2>
      {favorites.length === 0 ? (
        <p>No favorite PGs found.</p>
      ) : (
        <div className="row">
          {favorites.map((pg) => (
            <div key={pg.pgId} className="col-md-4">
              <div className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{pg.pgName}</h5>
                  <p className="card-text"><strong>Address:</strong> {pg.pgAddress}</p>
                  {pg.gLink ? (
                    <p>
                      <a href={pg.gLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        View on Google Maps
                      </a>
                    </p>
                  ) : (
                    <p className="text-muted">Google Maps link not available</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;