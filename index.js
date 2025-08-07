import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import route from './routes/userRoute.js'
import morgan from 'morgan'


dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const MONGOURL = process.env.MONGO_URL


app.use(express.json());

 app.use(morgan('dev'));

app.get('/', (req, res) =>{

     res.status(200).json({message: "Home!"})

})
app.use('/user', route)

mongoose.connect(MONGOURL)
.then(() => { console.log('Database Connection Successfully')})
.catch((err) => console.error(`connection error: ${err}`))

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
