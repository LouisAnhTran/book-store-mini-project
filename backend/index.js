import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from "morgan";

const app=express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"@Nasa7198",
    database:"test"
})


app.get("/",(req,res)=>{
    res.json("hello this is the backend")
})

app.get("/books",(req,res)=>{
    const query="SELECT * FROM books"
    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json({data: data});
    })
})

app.get("/books/:id",(req,res)=>{
    const query="SELECT * FROM books WHERE id=?"
    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json({data: data});
    })
})

app.post("/books",(req,res)=>{
    const q="INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)"
    const values=[req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price    
]

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json({message: "book has been created successfully"});
    })
})

app.delete("/books/:id",(req,res)=>{
    const query="DELETE FROM books WHERE id=?"

    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json({message: "delete successfully"});
    })
})

app.put("/books/:id",(req,res)=>{
    const query="UPDATE books SET `title`=?, `desc`=?, `cover`=?, `price`=? WHERE id=?";

    const values=[req.body.title,req.body.desc,req.body.cover,req.body.price,req.params.id];

    db.query(query,values,(err,data)=>{
        if(err) return res.json(err);
        return res.json({message: "update has been done"});
    })
})


app.listen(8800,()=>{
    console.log("Connected to backend")
})

