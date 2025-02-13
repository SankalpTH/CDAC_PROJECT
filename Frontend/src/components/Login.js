import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "./slice";
import "./Login.css";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Validation function for each field
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value.trim()) error = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          error = "Please enter a valid email address.";
        break;
      case "password":
        if (!value.trim()) error = "Password is required.";
        // else if (value.length < 6)
        //   error = "Password must be at least 6 characters.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate field on change
    validateField(name, value);
  };

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if any errors exist
    const validationErrors = Object.values(errors).filter((error) => error);
    if (validationErrors.length > 0) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8120/auth/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();

      

        dispatch(login());
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect user based on their type
        if (user.role.rid == "1") {
          navigate("/customer");
        } else if(user.role.rid == "3"){
        //  console.log("admin hitted")
          navigate("/admin");
        } else if (user.owner.type == "PG_OWNER") {
          navigate("/owner/PG");
        } else if (user.owner.type == "MESS_OWNER") {
          navigate("/owner/Mess");
        }
        else {
          // console.log("Sending login data:", formData);

          alert("Unknown user type. Please contact support.");
        }
      } else if (response.status === 401) {
        alert("Invalid email or password.");
      } else {
        throw new Error("Unexpected server error.");
      }
    } catch (error) {
      //  console.error("Error during login:", error);
      alert("Login failed. Please try again later.");
    }
  };

  // Clear form fields handler
  const handleClear = () => {
    setFormData({
      email: "",
      password: "",
    });
    setErrors({});
  };

   // Page refresh confirmation
      useEffect(() => {
          const handleBeforeUnload = (event) => {
              event.preventDefault();
              event.returnValue = ''; // Trigger confirmation dialog
          };
  
          window.addEventListener('beforeunload', handleBeforeUnload);
  
          return () => {
              window.removeEventListener('beforeunload', handleBeforeUnload);
          };
      }, []);

  return (
    <div className="login-page">
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center">Login</h3>
          <form onSubmit={handleFormSubmit}>
            {["email", "password"].map((field) => (
              <div className="mb-3" key={field}>
                <label htmlFor={field} className="form-label">
                  {field.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  className="form-control"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  required
                />
                {errors[field] && <small className="text-danger">{errors[field]}</small>}
              </div>
            ))}
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary mb-3">Login</button>
              <button
                type="button"
                className="btn btn-secondary mb-3"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-between mt-3">
            <Link to="/forgot-password" className="btn btn-link">
              Forgot Password ?
            </Link>
            <Link to="/change-password" className="btn btn-link">
              Change Password
            </Link>
          </div>
        </div>
      </div>
      {/* <p>{JSON.stringify(formData)}</p> */}
    </div>
    </div>
  );
};

export default Login;