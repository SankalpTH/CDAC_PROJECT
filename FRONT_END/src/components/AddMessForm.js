import React, { useState } from 'react';

const AddMessForm = ({ ownerData, onSuccess }) => {
    const [formData, setFormData] = useState({
        messName: '',
        messAddress: '',
        pricing: '',
        description: '',
        type: {
            veg: false,
            nonVeg: false,
            both: false,
        },
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
        if (!ownerData || !ownerData.owner || ownerData.owner.oid) {
            alert('Owner data not available. Please log in again.');
            return;
        }

        const ownerId = ownerData.owner.oid;

        try {
            const response = await fetch(`http://localhost:8080/addMess/${ownerId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messName: formData.messName,
                    messAddress: formData.messAddress,
                    pricing: formData.pricing,
                    description: formData.description,
                    veg: formData.veg,
                    nonVeg: formData.nonVeg,
                    both: formData.both,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Mess Registered:', result);
                alert('Mess registered successfully!');
                onSuccess(result);  // Calling the onSuccess prop to add mess to the list
            } else {
                const error = await response.text();
                console.error('Error registering Mess:', error);
                alert('Failed to register Mess.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add Mess</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Mess Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Pricing</label>
                    <input
                        type="text"
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
                    <label className="form-label">Type</label>
                    <div>
                        <input
                            type="checkbox"
                            name="veg"
                            onChange={handleChange}
                        />{' '}
                        Veg
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="nonVeg"
                            onChange={handleChange}
                        />{' '}
                        Non-Veg
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="both"
                            onChange={handleChange}
                        />{' '}
                        Both
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};

export default AddMessForm;
