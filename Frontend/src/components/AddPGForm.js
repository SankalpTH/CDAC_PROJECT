import React, { useState, useEffect } from "react";
import axios from "axios"; 

const AddPGForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        pgName: "",
        pgAddress: "",
        pricing: "",
        description: "",
        wifi: false,
        ac: false,
        laundry: false,
        areaId: "",
        gLink:""
    });
    
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState("");
    const [images, setImages] = useState({
        image1: null,
        image2: null,
        image3: null,
        image4: null
    });

    useEffect(() => {
        axios
            .get("http://localhost:8120/crud/getAll")
            .then((response) => setCities(response.data))
            .catch((error) => console.error("Error fetching cities:", error));
    }, []);

    useEffect(() => {
        if (selectedCity) {
            axios
                .get(`http://localhost:8120/crud/byCity/${selectedCity}`)
                .then((response) => setAreas(response.data))
                .catch((error) => console.error("Error fetching areas:", error));
        } else {
            setAreas([]);
        }
    }, [selectedCity]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleFileChange = (e) => {
        setImages({ ...images, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData)
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        console.log("User Data:", user);
    } else {
        console.log("No user found in localStorage.");
    }
    const oid2 = user.owner.oid;
    console.log("Oid2 :" +oid2)

        if (!selectedCity) {
            alert("Please select a city.");
            return;
        }

        if (!selectedArea) {
            alert("Please select an area.");
            return;
        }

        const formDataToSend = new FormData();

        // Add form data
        formDataToSend.append("pgDetails", new Blob([JSON.stringify({
            ...formData,
            areaId: selectedArea
        })], { type: "application/json" }));

        // Add images
        Object.keys(images).forEach(key => {
            if (images[key]) {
                formDataToSend.append(key, images[key]);
            }
        });

        try {
            const response = await axios.post(`http://localhost:8120/crud/addPg/${oid2}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.data) {
                alert("PG added successfully!");
                onSuccess(response.data); // Call parent function to update state
            }
        } catch (error) {
            console.error("Error adding PG", error);
            alert("Failed to add PG.");
        }
    };

    

console.log(selectedArea);

console.log(formData)
    return (
        <div className="container mt-5">
            <h2>Add PG</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">PG Name</label>
                    <input type="text" className="form-control" name="pgName" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="pgAddress" onChange={handleChange} required />
                </div>

                {/* City Selection */}
                <div className="col-md-3">
                    <label className="form-label">Select City</label>
                    <select
                        className="form-select"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        required
                    >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city.city_id} value={city.city_id}>
                                {city.city_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Area Selection */}
                <div className="col-md-3">
                    <label className="form-label">Select Area</label>
                    <select
                        className="form-select"
                        value={selectedArea}
                        onChange={(e) => {
                            setSelectedArea(e.target.value);
                            setFormData((prevData) => ({
                                ...prevData,
                                areaId: e.target.value, // Set areaId in formData
                            }));
                        }}
                        required
                    >
                        <option value="">Select Area</option>
                        {areas.map((area) => (
                            <option key={area.aid} value={area.aid}>
                                {area.areaName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3 mt-3">
                    <label className="form-label">Google Map Link</label>
                    <input type="text" className="form-control" name="gLink" placeholder="Enter Your Location Map Link" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Pricing</label>
                    <input type="number" className="form-control" name="pricing" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Amenities</label>
                    <div>
                        <input type="checkbox" name="wifi" onChange={handleChange} /> WiFi
                    </div>
                    <div>
                        <input type="checkbox" name="ac" onChange={handleChange} /> AC
                    </div>
                    <div>
                        <input type="checkbox" name="laundry" onChange={handleChange} /> Laundry
                    </div>
                </div>

                {/* File Input */}
                <div className="mb-3">
                    <label className="form-label">Upload Images</label>
                    <input type="file" name="image1" accept="image/*" onChange={handleFileChange} />
                    <input type="file" name="image2" accept="image/*" onChange={handleFileChange} />
                    <input type="file" name="image3" accept="image/*" onChange={handleFileChange} />
                    <input type="file" name="image4" accept="image/*" onChange={handleFileChange} />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default AddPGForm;
