import express from 'express';
import mongoose from "mongoose";
import indexRouter from './routes/index.js';
import categoriesRouter from './routes/categories.js';
import productsRouter from './routes/products.js';
import authRouter from './routes/auth.js'
import fileUpload from 'express-fileupload';
import cors from 'cors';

const PORT = 5000;
const DB_URL = 'mongodb+srv://user:user@cluster0.6q2vfuz.mongodb.net/?retryWrites=true&w=majority';

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/', indexRouter)
app.use('/categories', categoriesRouter)
app.use('/products', productsRouter)
app.use('/auth', authRouter)


async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log('SERVER STARTED'))
    } catch(e) {
        console.log(e)
    }
}

startApp()