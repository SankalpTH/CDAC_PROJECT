import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Step 1: Request OTP via email
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("OTP has been sent to your email.");
        setIsOtpSent(true);
      } else if (response.status === 404) {
        setMessage("Email not found. Please try again.");
      } else {
        throw new Error("Unexpected server error.");
      }
    } catch (error) {
      // console.error("Error in sending OTP:", error);
      setMessage("Failed to process the request. Please try again later.");
    }
  };

  // Step 2: Verify OTP entered by user
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setMessage("Please enter the OTP.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        setMessage("OTP verified successfully. You can now reset your password.");
      } else if (response.status === 400) {
        setMessage("Invalid OTP. Please try again.");
      } else {
        throw new Error("Unexpected server error.");
      }
    } catch (error) {
      //console.error("Error in OTP verification:", error);
      setMessage("Failed to verify OTP. Please try again later.");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center">Forgot Password</h3>
          {!isOtpSent ? (
            <form onSubmit={handleForgotPassword}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mb-3 w-100">
                Submit
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  Enter OTP
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mb-3 w-100">
                Verify OTP
              </button>
            </form>
          )}
          {message && <p className="mt-3 text-center">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
