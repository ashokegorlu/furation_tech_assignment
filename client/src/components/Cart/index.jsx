import Cookies from "js-cookie";

import React, { useState, useEffect } from "react";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./index.css";
import Header from "../Header";

import { useParams } from "react-router-dom";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    window.location.href = "/login";
  }
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const getCartData = async () => {
      const url = `http://localhost:3000/cart/${id}`;
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
        setCartData(data);
        SetIsLoading(false);
      }
    };
    getCartData();
  }, []);
  console.log(cartData);

  const eachBookDetail = () => {
    const { img_link, author, rate } = cartData;

    return (
      <div className="cart-container pl-5 pr-5">
        <div className="shadow cart-card ml-5 mr-5 pl-5 pr-5">
          <div className="d-flex flex-row">
            <img className="m-1 image-cart" src={img_link} alt={author} />
            <p className="pt-5">{author}</p>
          </div>
          <p>1</p>
          <p className="bold">Rs.{rate}</p>
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
