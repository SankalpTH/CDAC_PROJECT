// Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4">
            <div className="container text-center">
                <div className="row">
                    <div className="col-md-7">
                        <h5>PG Explorer</h5>
                        <p>Your go-to platform for finding the best PGs and mess facilities.</p>
                    </div>
                    
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <p>Email: pgexplorerr@gmail.com</p>
                        <p>Phone: +123 456 7890</p>
                        <p>Address: 123 PG Explorer St, City, Country</p>
                    </div>
                </div>
                <div className="mt-3">
                    <p className="mb-0">&copy; {new Date().getFullYear()} PG Explorer. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
