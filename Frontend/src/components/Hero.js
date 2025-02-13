// Hero.js
import React, { useEffect, useState } from 'react';

const Hero = () => {
    const [text, setText] = useState('');
    const fullText = "Welcome to PG Explorer";
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < fullText.length) {
            const interval = setTimeout(() => {
                setText((prev) => prev + fullText[index]);
                setIndex(index + 1);
            }, 100);

            return () => clearTimeout(interval);
        }
    }, [index]);

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
                <h1 className="display-4">{text}</h1>
                <p className="lead">Find your perfect PG or Mess with ease.</p>
                <button className="btn btn-primary btn-lg" onClick={handleExploreClick}>
                    Explore Now
                </button>
            </div>
        </div>
    );
};

export default Hero;
