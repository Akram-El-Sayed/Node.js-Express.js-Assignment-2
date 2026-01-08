const express = require('express')
const userRoutes = require('./routes/userRoutes')
const dotenv = require('dotenv')
dotenv.config();

const app = express()

const PORT = process.env.PORT ?? 3000;
app.use(express.json())
app.use('/users',userRoutes)
app.use('/uploads' , express.static('uploads'))

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Server Error"
  });
});

app.listen(PORT,()=>{
    console.log(`Server Running on PORT:${PORT}`)
})