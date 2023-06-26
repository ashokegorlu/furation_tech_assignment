import { Link } from "react-router-dom";
import "./index.css";

const BookItem = (props) => {
  const { eachBookItem } = props;
  const { id, title, imgLink, author, rate } = eachBookItem;
  return (
    <li className="list m-2 shadow pl-3">
      <Link to={`/books/${id}`} className="">
        <img src={imgLink} alt={title} className="image" />
      </Link>
      <p className="m-0 p-0">{author}</p>
      <p className="rate">Rs.{rate}</p>
    </li>
  );
};
export default BookItem;
