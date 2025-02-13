import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PGDetails = () => {
  const { pgId } = useParams();
  const [pgDetails, setPgDetails] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showOwner, setShowOwner] = useState(false);

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.uid;

  useEffect(() => {
    axios.get(`http://localhost:8120/crud/getSinglePg/${pgId}`)
      .then((response) => setPgDetails(response.data))
      .catch((error) => console.error("Error fetching PG details:", error));
  }, [pgId]);

  const handleAddToFavorite = () => {
    if (!userId) {
      alert("Please log in to add favorites.");
      return;
    }
    axios.post(`http://localhost:8120/basic/api/Favourite/AddPgToFavourite?uid=${userId}&pgId=${pgId}`)
      .then(() => {
        setIsFavorite(true);
        alert("PG added to favorites successfully!");
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          setIsFavorite(true);
          alert("This PG is already in your favorites!");
        } else {
          console.error("Error adding to favorite:", error);
          alert("PG added to favorites.");
        }
      });
  };

  if (!pgDetails) return <p className="text-center fw-bold fs-5">Loading...</p>;

  const imageArray = pgDetails.images
    ? [pgDetails.images.image1, pgDetails.images.image2, pgDetails.images.image3, pgDetails.images.image4].filter(img => img)
    : [];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);

  const googleMapsUrl = pgDetails.gLink.startsWith("http") ? pgDetails.gLink : `https://${pgDetails.gLink}`;

  return (
    <div className="container my-5 p-4 border rounded shadow-lg bg-white" style={{ maxWidth: "600px" }}>
      {/* Image Section */}
      <div className="text-center mb-4">
        {imageArray.length > 0 ? (
          <>
            <img
              src={`data:image/jpeg;base64,${imageArray[currentImageIndex]}`}
              alt="PG Image"
              className="img-fluid rounded"
              style={{ width: "500px", height: "350px", objectFit: "cover" }}
              onError={(e) => (e.target.src = "/fallback.jpg")}
            />
            <div className="d-flex justify-content-between mt-2">
              <button className="btn btn-dark btn-sm" onClick={prevImage}>◀ Prev</button>
              <button className="btn btn-dark btn-sm" onClick={nextImage}>Next ▶</button>
            </div>
          </>
        ) : (
          <p>No images available</p>
        )}
      </div>

      {/* PG Details */}
      <h2 className="text-center fw-bold text-primary">{pgDetails.pgName}</h2>
      <p className="text-center text-danger fw-bold fs-4">₹{pgDetails.pricing} / month</p>
      <p className="text-center text-muted">
        <strong>Amenities:</strong> {pgDetails.wifi ? "Wi-Fi, " : ""}{pgDetails.ac ? "AC, " : ""}{pgDetails.laundry ? "Laundry" : ""}
      </p>
      <p className="text-center fw-semibold"><strong>Location:</strong> {pgDetails.pgAddress}</p>

      {/* Buttons Section */}
      <div className="text-center mt-3">
        <button
          className={`btn fw-bold ${isFavorite ? "btn-success" : "btn-warning"}`}
          onClick={handleAddToFavorite}
          disabled={isFavorite}
        >
          {isFavorite ? "Added to Favorites ✔" : "Add to Favorite ❤️"}
        </button>
      </div>

      {/* Show Owner Details Button */}
      <div className="text-center mt-3">
        <button
          className="btn btn-primary fw-bold"
          onClick={() => setShowOwner(!showOwner)}
        >
          {showOwner ? "Hide Owner Details" : "Show Owner Details 📞"}
        </button>
      </div>

      {/* Owner Details Section */}
      {showOwner && (
        <div className="mt-4 p-3 bg-light rounded border">
          <h5 className="text-center fw-bold text-dark">Owner Details</h5>
          <div className="border p-3 rounded shadow-sm">
            <p className="fw-bold text-primary">👤 {pgDetails.owner.user.fname} {pgDetails.owner.user.lname}</p>
            <p className="text-dark">📞 <strong>Contact:</strong> {pgDetails.owner.user.phoneNumber}</p>
            <p className="text-dark"><strong>Description:</strong> {pgDetails.description}</p>
          </div>
        </div>
      )}

      {/* Google Maps Button */}
      <div className="text-center mt-4">
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success fw-bold">
          Show on Map 📍
        </a>
      </div>
    </div>
  );
};

export default PGDetails;
