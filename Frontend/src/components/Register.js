// Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone_number: "",
    adharcard_number: "",
    dob: "",
    permanent_address: "",
    userType: "", // Customer or Owner
    customerOrOwnerType: "", // Specific type
    rid: 0, // Default role ID, set dynamically based on userType
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

  // Field-specific validation logic
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fname":
      case "lname":
        if (!value.trim()) error = `${name === "fname" ? "First" : "Last"} Name is required.`;
        else if (!/^[A-Za-z]{2,}$/.test(value.trim())) error = `${name === "fname" ? "First" : "Last"} Name must have at least 2 alphabets.`;
        break;
      case "email":
        if (!value.trim()) error = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) error = "Please enter a valid email address.";
        break;
      case "password":
        if (!value.trim()) error = "Password is required.";
        else if (
          !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,15}$/.test(value)
        ) {
          error = "Password must be 6-15 characters, with at least one uppercase letter, one digit, and one special character.";
        }
        break;
      case "phone_number":
        if (!value.trim()) error = "Contact number is required.";
        else if (!/^\d{10}$/.test(value.trim())) error = "Contact number must be exactly 10 digits.";
        break;
      case "adharcard_number":
        if (!value.trim()) error = "Aadhar Card number is required.";
        else if (!/^\d{12}$/.test(value.trim())) error = "Aadhar Card number must be exactly 12 digits.";
        break;
      // case "dob":
      //   if (!value.trim()) error = "Date of Birth is required.";
      //   else if (new Date(value) > new Date()) error = "Date of Birth cannot be in the future.";
      //   break;
      case "dob":
        if (!value.trim()) {
          error = "Date of Birth is required.";
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - selectedDate.getFullYear();
        
        if (selectedDate > today) {
          error = "Date of Birth cannot be in the future.";
        } else if (age < 16 || (age === 16 && today < new Date(selectedDate.setFullYear(selectedDate.getFullYear() + 16)))) {
          error = "Your age should be greater than 16.";
       }
      }
          break;
      case "userType":
        if (!value.trim()) error = "User Type is required.";
        break;
      case "customerOrOwnerType":
        if (!value.trim()) error = "You must select a Customer or Owner type.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent non-numeric input for specific fields
    if ((name === "phone_number" || name === "adharcard_number") && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate field on change
    validateField(name, value);
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const dob = new Date(formData.dob);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();
  
    if (dob > today || age < 16 || (age === 16 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      setErrors((prev) => ({ ...prev, dob: "Your age should be greater than 16." }));
      alert("Your age should be greater than 16 !");
      return; // Stop form submission if age is not valid
    }
    // Set role ID based on userType
    const roleId = formData.userType === "Customer" ? 1 : 2; // Example: 1 for Customer, 2 for Owner
    const finalData = { ...formData,fname: formData.fname.trim(),
      lname: formData.lname.trim(), email: formData.email.trim(), rid: roleId };

    // Add the selected `customerOrOwnerType` to the final data as `type`
    if (formData.userType === "Customer") {
      // For Customer, check if the user selected a type (Student or Other)
      if (!formData.customerOrOwnerType) {
        alert("Please select a Customer Type");
        return; // Prevent submission if no Customer Type is selected
      }
      finalData.type = formData.customerOrOwnerType; // Set the type to the selected Customer Type
    }

    if (formData.userType === "Owner") {
      // For Owner, check if the user selected a type (PG_OWNER or MESS_OWNER)
      if (!formData.customerOrOwnerType) {
        alert("Please select an Owner Type");
        return; // Prevent submission if no Owner Type is selected
      }
      finalData.type = formData.customerOrOwnerType; // Set the type to the selected Owner Type
    }

    try {
      // Select the correct API URL based on userType (Customer or Owner)
      const apiUrl =
        formData.userType === "Customer"
          ? "http://localhost:8123/SaveCustomers" // Send to Customer table
          : "http://localhost:8123/saveOwner"; // Send to Owner table

      // Send the data to the appropriate API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      const result = await response.text();
      alert(result);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center">Register</h3>
          <form onSubmit={handleFormSubmit}>
            {["fname", "lname", "email", "password", "phone_number", "adharcard_number", "dob"].map(
              (field) => (
                <div className="mb-3" key={field}>
                  <label htmlFor={field} className="form-label">
                    {field.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
                  </label>
                  <input
                    type={
                      field === "password"
                        ? "password"
                        : field === "dob"
                          ? "date"
                          : "text"
                    }
                    className="form-control"
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    required
                    // Restrict future dates for dob
                    max={field === "dob" ? new Date().toISOString().split("T")[0] : undefined}
                  />
                  {errors[field] && <small className="text-danger">{errors[field]}</small>}
                </div>
              )
            )}
            <div className="mb-3">
              <label htmlFor="userType" className="form-label">User Type</label>
              <select
                className="form-select"
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select User Type</option>
                <option value="Customer">Customer</option>
                <option value="Owner">Owner</option>
              </select>
              {errors.userType && <small className="text-danger">{errors.userType}</small>}
            </div>
            {formData.userType && (
              <div className="mb-3">
                <label className="form-label">
                  {formData.userType === "Customer" ? "Customer Type" : "Owner Type"}
                </label>
                {(formData.userType === "Customer"
                  ? ["Student", "Other"]
                  : ["PG_OWNER", "MESS_OWNER"]
                ).map((type) => (
                  <div className="form-check" key={type}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="customerOrOwnerType"
                      id={type}
                      value={type}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="form-check-label" htmlFor={type}>{type}</label>
                  </div>
                ))}
                {errors.customerOrOwnerType && <small className="text-danger">{errors.customerOrOwnerType}</small>}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="permanent_address" className="form-label">Permanent Address</label>
              <textarea
                className="form-control"
                id="permanent_address"
                name="permanent_address"
                value={formData.permanent_address}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
