import React, { useState, useEffect } from 'react';

const AddMessForm = ({ ownerData }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        pricing: '',
        description: '',
        type: {
            veg: false,
            nonVeg: false,
            both: false,
        },
    });

    useEffect(() => {
        if (ownerData && ownerData.oid) {
            // Optional: You can use the owner data to pre-populate some fields if needed
        }
    }, [ownerData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                type: {
                    ...formData.type,
                    [name]: checked,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

   const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ownerData || !ownerData.oid) {
            alert('Owner data not available. Please log in again.');
            return;
        } 

        const { oid } = ownerData;

        try {
            const response = await fetch(`http://localhost:8080/addMess/${oid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Mess Registered:", result);
                alert("Mess registered successfully!");
            } else {
                const error = await response.text();
                console.error("Error registering Mess:", error);
                alert("Failed to register Mess.");
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add Mess</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Mess Name</label>
                    <input type="text" className="form-control" name="name" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Pricing</label>
                    <input type="text" className="form-control" name="pricing" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Type</label>
                    <div>
                        <input type="checkbox" name="veg" onChange={handleChange} /> Veg
                    </div>
                    <div>
                        <input type="checkbox" name="nonVeg" onChange={handleChange} /> Non-Veg
                    </div>
                    <div>
                        <input type="checkbox" name="both" onChange={handleChange} /> Both
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default AddMessForm;
