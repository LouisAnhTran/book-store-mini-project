import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: null,
    desc: null,
    cover: null,
    price: null,
  });

  const navigate = useNavigate();

  console.log(useLocation().pathname.split('/')[2]);

  const id=useLocation().pathname.split('/')[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/books/${id}`, book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useState(()=>{
    const handle=async ()=>{
      try {
        const data=await axios.get(`http://localhost:8800/books/${id}`);
        console.log(data.data.data[0]);
        setBook(data.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    handle();
  },[])


  return (
    <div className="form">
      <h1>Update a new book</h1>
      <input
        type="text"
        placeholder="book title"
        name="title"
        value={book.title}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="book desc"
        name="desc"
        value={book.desc}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="book cover"
        name="cover"
        value={book.cover}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="price"
        name="price"
        value={book.price}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Update;
