// Features.js
import React from 'react';
import image1 from "../Images/image1.jpg";
import image2 from "../Images/image2.webp";
import image3 from "../Images/image3.jpeg";


const Features = () => {
    return (
        <div id="features-section" className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center mb-4">Our Features</h1>
                    <p className="lead text-center">
                        Discover the features that make PG Explorer the best platform for finding PG and mess accommodations.
                    </p>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <img src={image1} className="card-img-top" alt="Feature 1" />
                                <div className="card-body">
                                    <h5 className="card-title">Search PGs and Messes</h5>
                                    <p className="card-text">
                                        Easily search for PGs and messes in your city with filters for pricing, amenities, and more.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card mb-4">
                                <img src={image2} className="card-img-top" alt="Feature 2" />
                                <div className="card-body">
                                    <h5 className="card-title">Detailed Listings</h5>
                                    <p className="card-text">
                                        Get detailed information about each PG or mess, including photos, pricing, and available amenities.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <img src={image3} className="card-img-top" alt="Feature 4" />
                                <div className="card-body">
                                    <h5 className="card-title">Save Favorites</h5>
                                    <p className="card-text">
                                        Save your favorite PGs and messes to easily compare and revisit them later.
                                    </p>
                                </div>
                            </div>

                       
                    </div>

                    <div className="row">
                      
                        </div>

                       

                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
