const express = require('express')
const  { chats } = require("./db/data")
const dotenv = require("dotenv")
const connectDB = require('./Config/db')
const colors =  require('colors')
const userRoutes = require('./routes/userRoutes')
const { notFound , errorHandler } =  require('./Middleware/errorMiddleware')


const app = express()

dotenv.config()
connectDB()

app.use(express.json())


const PORT = process.env.PORT || 5000

app.get('/',(req, res)=>{
    res.send("Running")
})

app.use('/api/user', userRoutes)


app.listen(5000,()=>
{
    console.log(`Server is running on localhost@${PORT}`.bgMagenta.bold)
})