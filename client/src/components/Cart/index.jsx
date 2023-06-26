import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./index.css";
import Header from "../Header";

const Cart = (props) => {
  const [bookData, setBookData] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    window.location.href = "/login";
  }
  const { id } = props;
  useEffect(() => {
    const getBookData = async () => {
      const url = `http://localhost:3000/books/${5}`;
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
    const { img_link, author, rate } = bookData;

    return (
      <div className="each-cart-container">
        <div className="cart-card ml-5 mr-5 shadow">
          <div className="d-flex flex-row">
            <img src={img_link} alt={author} className="image" />
            <p className="pt-4">{author}</p>
          </div>
          <p>1</p>
          <p className="mr-5 bold">Rs.{rate}</p>
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

export default Cart;
