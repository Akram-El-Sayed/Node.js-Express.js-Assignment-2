const express = require('express')
const userRoutes = require('./routes/userRoutes')

const app = express()

const PORT = 5050
app.use(express.json())
app.use('/users',userRoutes)

app.use((error,request,response,next)=>{
    response.status(error.status).join({message: error.message})
})

app.listen(PORT,()=>{
    console.log(`Server Running on PORT:${PORT}`)
})