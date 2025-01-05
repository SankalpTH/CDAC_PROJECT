import React, { useState } from "react";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Validate the new password
  const validateField = (name, value) => {
    let error = "";
    if (name === "newPassword") {
      if (!value.trim()) error = "New password is required.";
      else if (
        !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,15}$/.test(value)
      ) {
        error =
          "New password must be 6-15 characters, with at least one uppercase letter, one digit, and one special character.";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate the new password field dynamically
    if (name === "newPassword") {
      validateField(name, value);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Check for errors in new password field
    if (errors.newPassword) {
      setMessage(errors.newPassword);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // If token-based authentication is used
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (response.ok) {
        setMessage("Password successfully changed.");
      } else if (response.status === 401) {
        setMessage("Incorrect old password. Please try again.");
      } else {
        throw new Error("Unexpected server error.");
      }
    } catch (error) {
      console.error("Error in change password:", error);
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
              {errors.newPassword && <small className="text-danger">{errors.newPassword}</small>}
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
