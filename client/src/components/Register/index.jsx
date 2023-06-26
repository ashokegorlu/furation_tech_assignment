import React, { useState } from "react";
import "./index.css";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);

  const hadleForm = async (event) => {
    event.preventDefault();

    const url = "http://localhost:3000/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, username, password }),
    };
    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      window.location.href = "/login";
    } else {
      setShowSubmitError(true);
      setErrorMsg(data.message);
    }
  };
  return (
    <div className="main-container">
      <div className="image-container">
        <img
          src="https://img.freepik.com/premium-vector/female-character-she-searched-books-read-from-mobile-phones-online-world-internet-world-library-library-concept-flat-style-cartoon-vector-illustration_610956-210.jpg"
          alt="bookstore"
          className="bookstore-image"
        />
      </div>
      <div className="registration-container ">
        <form className="shadow pl-5 pr-5 pt-2 pb-2" onSubmit={hadleForm}>
          <h1 className="text-primary logo">
            Fu
            <span className="text-dark"> bookstore</span>
          </h1>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control "
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              className="form-control"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          {showSubmitError && <p className="text-danger">*{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};
export default Register;
