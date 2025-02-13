import React, { useState } from "react";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateField = (name, value) => {
    let error = "";

    if (name === "newPassword") {
      if (!value.trim()) {
        error = "New password is required.";
      } else if (
        !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,15}$/.test(
          value
        )
      ) {
        error =
          "New password must be 6-15 characters, with at least one uppercase letter, one digit, and one special character.";
      } else if (value === formData.oldPassword) {
        error = "New password cannot be the same as the old password.";
      }
    }

    if (name === "confirmPassword") {
      if (value !== formData.newPassword) {
        error = "Confirm password must match the new password.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    validateField(name, value);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
  
    if (errors.newPassword || errors.confirmPassword) {
      setMessage("Please fix the errors before submitting.");
      return;
    }
  
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }
  
    // Retrieve user ID from localStorage
    const userId = localStorage.getItem("userId");
  
    if (!userId || isNaN(userId)) {
      setMessage("Invalid user ID. Please log in again.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/changePassword/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });
  
      const data = await response.text();
  
      if (response.ok) {
        setMessage("Password successfully changed.");
      } else {
        setMessage(data || "Unexpected error occurred.");
      }
    } catch (error) {
      setMessage("Failed to process the request. Please try again later.");
    }
  };
  
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center">Change Password</h3>
          <form onSubmit={handleChangePassword}>
            <div className="mb-3">
              <label htmlFor="oldPassword" className="form-label">
                Old Password
              </label>
              <input
                type="password"
                className="form-control"
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
              />
              {errors.newPassword && (
                <small className="text-danger">{errors.newPassword}</small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              {errors.confirmPassword && (
                <small className="text-danger">{errors.confirmPassword}</small>
              )}
            </div>
            <button type="submit" className="btn btn-primary mb-3 w-100">
              Change Password
            </button>
          </form>
          {message && <p className="mt-3 text-center">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
