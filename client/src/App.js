import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Books from "./components/Books";
import Header from "./components/Header";
import BookItemDetails from "./components/BookItemDetails";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/header" element={<Header />} />
        <Route exact path="/books" element={<Books />} />
        <Route exact path="/books/:id" element={<BookItemDetails />} />
        <Route exact path="/Cart/:id" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
