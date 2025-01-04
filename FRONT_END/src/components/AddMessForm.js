import React, { useState } from 'react';

const AddMessForm = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="container mt-5">
            <h2>Add Mess</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Mess Name</label>
                    <input type="text" className="form-control" name="name" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Pricing</label>
                    <input type="text" className="form-control" name="pricing" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" onChange={handleChange} />
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
