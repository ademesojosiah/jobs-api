require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDB = require('./db/connect')

const authenticateUser = require('./middlewares/authentication')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')




//import my routers
const jobsRouter = require('./routes/jobs')
const authRouter = require('./routes/auth')






// error handler 
const notFoundMidleware = require('./middlewares/notFound')
const errorHandlerMiddleware = require('./middlewares/errorHandler')


// to get request body
app.use(express.json())

//extra packages

//security packages
app
app.use(rateLimiter({
    windowMs: 15* 60 * 1000, // 15 minutes
    max:100, // limit each IP to 100 requests per windowMs

}))
app.use(helmet());
app.use(cors())
app.use(xss())



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
