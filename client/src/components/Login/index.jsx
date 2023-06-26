import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("r");

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    window.location.href = "/";
  }

  const handleForm = async (event) => {
    event.preventDefault();

    const url = "http://localhost:3000/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const token = data.token;

    if (response.ok) {
      Cookies.set("jwt_token", token, { expires: 1 });
      window.location.href = "/";
    } else {
      setShowSubmitError(true);
      setErrorMsg(data.message);
    }
  };

  return (
    <div className="main-container">
      <div className="image-container">
        <img
          src="https://img.freepik.com/premium-vector/school-children-reading-books-library-female-librarian-bookshelves-pupils-illustration-education-literature-knowledge-concept-banner-website-landing-web-page_179970-2183.jpg?w=2000"
          alt="bookstore"
          className="bookstore-image"
        />
      </div>

      <div className="registration-container">
        <h1 className="text-primary logo">
          Fu
          <span className="text-dark"> bookstore</span>
        </h1>
        <form className="shadow pl-5 pr-5 pt-2 pb-2" onSubmit={handleForm}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>

            <input
              id="username"
              required
              type="text"
              className="form-control"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              required
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to="/Register">Registration</Link>
          <span className="pl-2 pr-2">|</span>
          <Link to="/">ForgetPassword</Link>
          <div className="text-center">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
          {showSubmitError && <p className="text-danger">*{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};
export default Login;
