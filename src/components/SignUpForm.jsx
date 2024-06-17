import { useState, useEffect } from "react";
import axios from "axios";

export default function SignUpForm({ token, setToken }) {
  const [inputFields, setInputFields] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("a short message");
    try {
      const response = await axios.post(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          username: inputFields.username,
          password: inputFields.password,
        }
      );
      setErrors(validateValues(inputFields));
      setSubmitting(true);
      setToken(response.data.token);
    } catch (error) {
      setErrors(error.message);
    }
  };

  const validateValues = (inputFields) => {
    let errors = {};
    if (inputFields.username.length < 8) {
      errors.username = "Please provide a username with at least 8 characters";
    }
    if (inputFields.password.length < 12) {
      errors.password = "Please provide a password with at least 12 characters";
    }
    return errors;
  };

  const handleChange = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>SignUpForm</h2>
      {Object.keys(errors).length === 0 && submitting ? (
        <span className="success">Successfully submitted ✓</span>
      ) : null}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            name="username"
            type="text"
            value={inputFields.username}
            onChange={handleChange}
          />
        </label>
        {errors.username ? <p className="error">{errors.username}</p> : null}
        <label>
          Password:{" "}
          <input
            name="password"
            type="password"
            value={inputFields.password}
            onChange={handleChange}
          />
        </label>
        {errors.password ? <p className="error">{errors.password}</p> : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
