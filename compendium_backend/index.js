const express = require('express')
const db = require('./db')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.json("Hello World")
})

app.get("/image", (req,res)=>{
    const q = "SELECT * FROM posts"
    db.query(q, (err, data)=>{
        if (err) return res.json(err)
            return res.json(data)
    })
})

app.listen(8800, ()=>{
    console.log("Connect to backend!")
})