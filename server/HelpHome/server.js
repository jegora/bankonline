import express from 'express'
import routes from './src/routes/user-routes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const PORT = 3000
 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/koorsuch', { useNewUrlParser: true })
    .then(()=>{
        console.log('MonogDB connection established')
    })
    .catch(error=>{
        console.log('MongoDB connection error: ' + error)
    })

console.log('server start')
app.use(cors())
app.options('*', cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

routes(app)
 
app.listen(PORT, () => {
    console.log(`you are server is running on ${PORT}`);
})