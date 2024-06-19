import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/book");
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      age,
      name,
      password,
      email,
    };

    const resp = await fetch("http://localhost:4000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(resp);

    if (resp.error && resp.success === false) {
      setError(resp.error);
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>iTravel Registration</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name-input"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <input
            type="number"
            id="age-input"
            placeholder="Enter your age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            required
          />
          <input
            type="email"
            id="email-input"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            type="password"
            id="password-input"
            placeholder="Enter a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default RegistrationForm;
