// Hero.js
import React from 'react';

const Hero = () => {
    // Function to scroll to the Features section
    const handleExploreClick = () => {
        const featuresSection = document.getElementById('features-section');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-light text-dark text-center py-5">
            <div className="container">
                <h1 className="display-4">Welcome to PG Explorer</h1>
                <p className="lead">Find your perfect PG or Mess with ease.</p>
                <button className="btn btn-primary btn-lg" onClick={handleExploreClick}>
                    Explore Now
                </button>
            </div>
        </div>
    );
};

export default Hero;
