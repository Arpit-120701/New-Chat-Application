const express = require('express')
const  { chats } = require("./db/data")
const dotenv = require("dotenv")



const app = express()

dotenv.config()

const PORT = process.env.PORT || 5000

app.get('/',(req, res)=>{
    res.send("Running")
})

app.get('/api/chat',(req,res)=>{
    res.send(chats)
})

app.get("/api/chat/:id",(req, res)=> {
     const singleChat = chats.find((c)=> c._id === req.params.id);
     res.send(singleChat)
})


app.listen(5000,()=>
{
    console.log(`Server is running on localhost@${PORT}`)
})