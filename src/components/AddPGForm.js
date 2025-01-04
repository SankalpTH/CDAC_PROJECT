import React, { useState } from 'react';

const AddPGForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        pricing: '',
        description: '',
        amenities: {
            wifi: false,
            ac: false,
            laundry: false,
        },
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                amenities: {
                    ...formData.amenities,
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
            <h2>Add PG</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">PG Name</label>
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
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default AddPGForm;
