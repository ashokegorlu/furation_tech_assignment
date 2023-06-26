import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import BookItem from "../BookItem";
import "./index.css";
import Header from "../Header";

const Books = () => {
  const [booksData, setBooksData] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  const [input, setInput] = useState("");

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    window.location.href = "/login";
  }

  useEffect(() => {
    const getBooksData = async () => {
      const url = "http://localhost:3000/books";
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
      if (response.ok) {
        const formatedData = data.map((eachItem) => ({
          id: eachItem.id,
          title: eachItem.title,
          imgLink: eachItem.img_link,
          author: eachItem.author,
          rate: eachItem.rate,
          description: eachItem.description,
        }));
        setBooksData(formatedData);
        SetIsLoading(false);
      } else {
        console.log("error");
      }
    };
    getBooksData();
  }, []);

  const searchedData = booksData.filter((eachBook) =>
    eachBook.author.toLowerCase().includes(input.toLowerCase())
  );
  return (
    <div className="blogs-list-container ">
      <Header />
      <div className="search-input-container d-flex flex-row justify-content-end ">
        <div className="input-container">
          <img
            alt="search icon"
            className="search-icon"
            src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
          />

          <input
            type="text"
            placeholder="Search Books"
            className="mr-5 border-input"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </div>
      </div>
      {isLoading ? (
        <div data-testid="loader">
          <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
        </div>
      ) : (
        <ul className="blogs-list pl-5 pr-5">
          {searchedData.map((eachBook) => (
            <BookItem key={eachBook.id} eachBookItem={eachBook} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Books;
{
  /* <div className="search-input-container">
              <img
                alt="search icon"
                className="search-icon"
                src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search Google"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div> */
}
