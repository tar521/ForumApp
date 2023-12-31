import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import image from "./img.jpg";
import { useAuth } from "../../service/AuthContextProvider"; // Import useAuth hook

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const {  login, updateUser} = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault();
    const requestObject = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestObject),
      });

      if (response.ok) {
        const data = await response.json();
        //const { jwt } = data;
        //localStorage.setItem("jwtToken", jwt);
        updateUser(data);
        login(data);
        navigate("/directory");
      } else {
        setSuccessMessage("");

        
        setErrorMessage("Login failed. Please check your information.");
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-text-container">
        <h1>Login to your Account</h1>

        <div className="loginbox">
          <label for="username">Username</label>
          <br />
          <input
            type="text"
            id="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="loginbox">
          <label for="password">Password</label>
          <br />
          <input
            type="password"
            id="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login">
        <button onClick={(e) => handleLogin(e)}>Login</button>
          <a href="http://localhost:3000/">
            <button>Back to Home</button>
          </a>
        </div>
      </div>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div className="login-image-container">
        <img src={image} alt="login img" />
      </div>
    </div>
  );
};

export default Login;
