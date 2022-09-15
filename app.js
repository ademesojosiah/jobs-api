require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDB = require('./db/connect')

const authenticateUser = require('./middlewares/authentication')



//import my routers
const jobsRouter = require('./routes/jobs')
const authRouter = require('./routes/auth')






// error handler 
const notFoundMidleware = require('./middlewares/notFound')
const errorHandlerMiddleware = require('./middlewares/errorHandler')


// to get request body
app.use(express.json())

//extra packages




//routes
app.use('/api/v1/auth',authRouter )
app.use('/api/v1/jobs',authenticateUser ,jobsRouter)



//routes

app.get('/',(req,res)=>{
    res.send('jobs api')
})



//for routes not found 
app.use(notFoundMidleware)

//errorHandling middleware
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3003

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI) 
        app.listen(port,()=>{
            console.log(`server listening to server port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start()
