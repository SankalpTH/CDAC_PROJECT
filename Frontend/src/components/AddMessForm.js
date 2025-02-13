import React, { useState, useEffect } from 'react';
import axios from "axios"; // Axios for API calls.

const AddMessForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        messName: '',
        messAddress: '',
        pricing: '',
        description: '',
        messType: '',
        gmLink:""
         // Store enum as a single value
    });

    const [cities, setCities] = useState([]); // State to store cities
    const [selectedCity, setSelectedCity] = useState(""); // Store selected city_id
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState("");
    const [images, setImages] = useState({
        image1: null,
        image2: null,
        image3: null,
        image4: null
    });

    // Fetch cities from the database
    useEffect(() => {
        axios
            .get("http://localhost:8123/city/getAll")
            .then((response) => {
                setCities(response.data); // Assuming response.data is an array of { city_id, city_name }
            })
            .catch((error) => {
                console.error("Error fetching cities:", error);
            });
    }, []);

    // Fetch areas when a city is selected
    useEffect(() => {
        if (selectedCity) {
            axios
                .get(`http://localhost:8123/api/areas/byCity/${selectedCity}`) // Using city_id instead of city_name
                .then((response) => setAreas(response.data))
                .catch((error) => console.error("Error fetching areas:", error));
        } else {
            setAreas([]);
        }
    }, [selectedCity]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // Directly set the value
        }); 
    };
    

    const handleFileChange = (e) => {
        setImages({ ...images, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log(formData);
    
        const user = JSON.parse(localStorage.getItem("user"));
    
        if (user) {
            console.log("User Data:", user);
        } else {
            console.log("No user found in localStorage.");
        }
    
        const oid2 = user.owner.oid;
        console.log("Oid2: " + oid2);
    
        if (!selectedCity) {
            alert("Please select a city.");
            return;
        }
    
        if (!selectedArea) {
            alert("Please select an area.");
            return;
        }
    
        if (!formData.messType) {
            alert("Please select a mess type.");
            return;
        }
    
        const formDataToSend = new FormData();
    
        // Add form data
        formDataToSend.append("messDetails", new Blob([JSON.stringify({
            ...formData,
            areaId: selectedArea,
            messType: formData.messType // Ensure messType is included
        })], { type: "application/json" }));
    
        // Add images
        Object.keys(images).forEach(key => {
            if (images[key]) {
                formDataToSend.append(key, images[key]);
            }
        });
    
        try {
            const response = await axios.post(`http://localhost:8123/addMess/${oid2}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            if (response.data) {
                alert("Mess added successfully!");
                onSuccess(response.data);
            }
        } catch (error) {
            console.error("Error adding mess", error);
            alert("Failed to add mess.");
        }
    };
    

    console.log(selectedArea);
    console.log(selectedCity);
    console.log("Final Data Before Sending:", formData);
    console.log(formData.messType)
    console.log(images)
    

    return (
        <div className="container mt-5">
            <h2>Add Mess</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Mess Name</label>
                    <input type="text" className="form-control" name="messName" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="messAddress" onChange={handleChange} required />
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
                    <input type="text" className="form-control" name="gmLink" placeholder="Enter Your Location Map Link" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Pricing</label>
                    <input type="number" className="form-control" name="pricing" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" onChange={handleChange} required />
                </div>

                {/* Mess Type */}
                <div className="mb-3">
                    <label className="form-label">Type</label>
                    <div>
                        <input type="radio" name="messType" value="Veg" onChange={handleChange} required /> VEG
                    </div>
                    <div>
                        <input type="radio" name="messType" value="Non_Veg" onChange={handleChange} required /> NON_VEG
                    </div>
                    <div>
                        <input type="radio" name="messType" value="Both" onChange={handleChange} required /> BOTH
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

export default AddMessForm;
