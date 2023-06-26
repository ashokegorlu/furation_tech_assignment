import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./index.css";
import Header from "../Header";

import { useParams } from "react-router-dom";

const BookItemDetails = () => {
  const [bookData, setBookData] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    window.location.href = "/login";
  }
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const getBookData = async () => {
      const url = `http://localhost:3000/books/${id}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwtToken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      //   console.log(response.ok);
      if (response.ok) {
        setBookData(data);
        SetIsLoading(false);
      }
    };
    getBookData();
  }, []);
  console.log(bookData);

  const eachBookDetail = () => {
    const { title, img_link, author, description } = bookData;

    return (
      <div className="each-book-container">
        <div className="book-details">
          <img className="book-image" src={img_link} alt={author} />
        </div>
        <div>
          <h1 className="blog-details-title">{title}</h1>
          <p className="bold">Author:</p>
          <p className="details-author-name">{author}</p>
          <p className="bold">Description:</p>
          <p>{description}</p>
          <div>
            <Link to="/cart">
              <button className="btn btn-primary">place order</button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="book-container ">
      <Header />
      {isLoading ? (
        <div data-testid="loader">
          <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
        </div>
      ) : (
        eachBookDetail()
      )}
    </div>
  );
};

export default BookItemDetails;
