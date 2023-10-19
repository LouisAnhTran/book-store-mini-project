import React, { useEffect, useState } from "react";
import axios from "axios";
import BookItem from "./BookItem";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete=async (id)=>{
    console.log("nana delete");
    try {
      await axios.delete(`http://localhost:8800/books/${id}`)
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="books">
      {books.map((book) => 
        <BookItem book={book} deleteFunc={()=>handleDelete(book.id)}></BookItem>
      )}

      <Link to='/add'><button>Add book</button></Link>
    </div>
  );
};

export default Books;
