import React from "react";
import { Link } from "react-router-dom";

const BookItem = ({ book,deleteFunc}) => {
  return (
    <>
      <div class="book" index={book.id}>
        {book.cover && <img src={book.cover}></img>}
        <h2>{book.title}</h2>
        <h3>{book.desc}</h3>
        {book.price && <span>{book.price}</span>}
        <button onClick={deleteFunc}>Delete</button>
        <Link to={"/update/"+book.id}>
        <button>Update</button>
        </Link>
        
      </div>
    </>
  );
};

export default BookItem;
