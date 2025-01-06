import React, { useState } from 'react';

const AddPGForm = ({ ownerData, onSuccess }) => {
    const [formData, setFormData] = useState({
        pgName: '',
        pgAddress: '',
        pricing: '',
        description: '',
        wifi: false,
        ac: false,
        laundry: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!ownerData || !ownerData.owner || !ownerData.owner.oid) {
            alert('Owner data not available. Please log in again.');
            return;
        }

        const ownerId = ownerData.owner.oid; // Extract the owner ID (oid)

        try {
            const response = await fetch(`http://localhost:8080/addPg/${ownerId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pgName: formData.pgName,
                    pgAddress: formData.pgAddress,
                    pricing: formData.pricing,
                    description: formData.description,
                    wifi: formData.wifi,
                    ac: formData.ac,
                    laundry: formData.laundry,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('PG Registered:', result);
                alert('PG registered successfully!');
                onSuccess(result); // Update the parent component with the new PG
            } else {
                const error = await response.text();
                console.error('Error registering PG:', error);
                alert('Failed to register PG.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add PG</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">PG Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="pgName"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="pgAddress"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Pricing</label>
                    <input
                        type="number"
                        className="form-control"
                        name="pricing"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        onChange={handleChange}
                        required
                    />
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
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};

export default AddPGForm;
