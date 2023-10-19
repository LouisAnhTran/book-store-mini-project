import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [book,setBook]=useState({title: null,desc: null, cover: null, price: null});

  const navigate=useNavigate();

  const handleChange=(e)=>{
    setBook(prev=>({...prev,[e.target.name]: e.target.value}))
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books",book)
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form">
      <h1>Add a new book</h1>
      <input type='text' placeholder='book title' name='title' onChange={handleChange}/>
      <input type='text' placeholder='book desc' name='desc' onChange={handleChange}/>
      <input type='text' placeholder='book cover' name='cover' onChange={handleChange}/>
      <input type='number' placeholder='price' name='price' onChange={handleChange}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Add