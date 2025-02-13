import React, { useState } from "react";

const ImageUploader = () => {
    const [images, setImages] = useState([null, null, null, null]);

    const handleImageChange = (event, index) => {
        const file = event.target.files[0];

        if (file) {
            if (!file.type.includes("jpeg")) {
                alert("Only JPG files are allowed!");
                event.target.value = ""; // Reset input
                return;
            }

            const newImages = [...images];
            newImages[index] = URL.createObjectURL(file); // Preview image
            setImages(newImages);
        }
    };

    return (
        <div className="mb-3">
            <label className="form-label">Upload PG Images (JPG Only)</label>
            {[0, 1, 2, 3].map((index) => (
                <div key={index} className="mb-2">
                    <input
                        type="file"
                        accept="image/jpeg"
                        onChange={(e) => handleImageChange(e, index)}
                    />
                    {images[index] && <img src={images[index]} alt="Preview" width="100" />}
                </div>
            ))}
        </div>
    );
};

export default ImageUploader;