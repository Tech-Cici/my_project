import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { useAuthContext } from "./context/AuthContext";

const AgeVerification = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/book");
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      password,
      email,
    };

    const resp = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const respData = await resp.json();

    console.log(respData);
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }

    localStorage.setItem("token", respData.token);

    if (respData.error && respData.success === false) {
      setError(resp.error);
    } else {
      setUser(respData.user);
      navigate("/book");
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>iTravel Authentification</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            id="password-input"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <br />
          <input
            type="text"
            id="email-input"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <br />
          <button type="submit">Let's book</button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default AgeVerification;
