const express = require('express')
const  { chats } = require("./db/data")
const dotenv = require("dotenv")
const connectDB = require('./Config/db')
const colors =  require('colors')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const { notfound , errorHandler } =  require('./Middleware/errorMiddleware')
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messageRoutes')


const app = express()

dotenv.config()
connectDB()

app.use(express.json())

//app.use(bodyParser);


const PORT = process.env.PORT || 5000

app.get('/',(req, res)=>{
    res.send("Running")
})

app.use('/api/user', userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message', messageRoutes);

//middelwares 
app.use(notfound)
app.use(errorHandler)


app.listen(5000,()=>
{
    console.log(`Server is running on localhost@${PORT}`.bgMagenta.bold)
})