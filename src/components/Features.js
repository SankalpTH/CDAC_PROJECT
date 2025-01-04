// Features.js
import React from 'react';

const Features = () => {
    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center mb-4">Our Features</h1>
                    <p className="lead text-center">
                        Discover the features that make PG Explorer the best platform for finding PG and mess accommodations.
                    </p>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <img src="https://via.placeholder.com/400x200" className="card-img-top" alt="Feature 1" />
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
                                <img src="https://via.placeholder.com/400x200" className="card-img-top" alt="Feature 2" />
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
                                <img src="https://via.placeholder.com/400x200" className="card-img-top" alt="Feature 3" />
                                <div className="card-body">
                                    <h5 className="card-title">User Reviews & Ratings</h5>
                                    <p className="card-text">
                                        Read reviews and ratings from other users to make an informed decision before booking.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <img src="https://via.placeholder.com/400x200" className="card-img-top" alt="Feature 4" />
                                <div className="card-body">
                                    <h5 className="card-title">Save Favorites</h5>
                                    <p className="card-text">
                                        Save your favorite PGs and messes to easily compare and revisit them later.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card mb-4">
                                <img src="https://via.placeholder.com/400x200" className="card-img-top" alt="Feature 5" />
                                <div className="card-body">
                                    <h5 className="card-title">Easy Booking</h5>
                                    <p className="card-text">
                                        Once you’ve found your ideal PG or mess, easily book your spot through the platform.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card mb-4">
                                <img src="https://via.placeholder.com/400x200" className="card-img-top" alt="Feature 6" />
                                <div className="card-body">
                                    <h5 className="card-title">Affordable Pricing</h5>
                                    <p className="card-text">
                                        Find PGs and messes within your budget, with transparent pricing and no hidden fees.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
