import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../Header";

import "./index.css";

const Home = () => {
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    window.location.href = "/login";
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading"> Welcome to Our Bookstore</h1>
          <p className="home-description">
            Welcome to our bookstore, a sanctuary for book lovers seeking
            literary treasures and immersive reading experiences. Explore our
            vast collection of books spanning diverse genres, from thrilling
            mysteries to insightful biographies, and let the pages transport you
            to captivating worlds. Discover new authors, expand your knowledge,
            and indulge in the timeless pleasure of getting lost in a good book.
          </p>
          <Link to="/books">
            <button className="btn btn-primary mt-3">Shop Now</button>
          </Link>
        </div>
        <img
          src="https://img.freepik.com/free-photo/woman-wearing-headphones-around-neck-reading-book_23-2148397143.jpg?size=626&ext=jpg&ga=GA1.2.1966209160.1678292237&semt=ais"
          alt="Welcome to Our Bookstore"
          className="home-desktop-img"
        />
      </div>
    </>
  );
};

export default Home;
