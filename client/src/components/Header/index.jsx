import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

const Header = (props) => {
  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    window.location.href = "/login";
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    window.location.href = "/login";
  }

  //   const renderCartItemsCount = () => (
  //     <CartContext.Consumer>
  //       {(value) => {
  //         const { cartList } = value;
  //         const cartItemsCount = cartList.length;

  //         return (
  //           <>
  //             {cartItemsCount > 0 ? (
  //               <span className="cart-count-badge">{cartList.length}</span>
  //             ) : null}
  //           </>
  //         );
  //       }}
  //     </CartContext.Consumer>
  //   );

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-large-container">
          <Link to="/">
            <h1 className="text-primary logo">
              Fu
              <span className="text-dark"> bookstore</span>
            </h1>
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/books" className="nav-link">
                Books
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/cart" className="nav-link">
                Cart
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
