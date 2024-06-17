import { useState } from "react";
import axios from "axios";

export default function Authenticate({ token, setToken }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const handleClick = async () => {
    console.log("handleClick moment");
    try {
      const response = await axios.get(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data.username);
      setSuccessMessage(
        `${response.data.message} Welcome, ${response.data.data.username}!`
      );
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <h2>Authenticate</h2>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </div>
  );
}
