import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import { PORT, MONGODBURL } from "./config.js";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

import cors from 'cors';

// console.log(MONGODBURL);
const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
// Approach 1 : Allow all Origins with Default of cors(*)
app.use(cors());

// Approach 2 : Allow Custom Origins
// app.use(
//     cors(
//         {
//             origin: 'http://localhost:5173',
//             methods: ['GET', 'POST', 'PUT', 'DELETE'],
//             allowHeaders: ['Content-Type'],
//         }
//     )
// )

// HTTP Method
app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to the MERN Stack Project');
})

// we will write after /books 
app.use('/books', booksRoute);


mongoose
    .connect(MONGODBURL)
    .then( () => {
        // APP WILL ONLY RUN IF IT IS CONNECTED TO DATABASE
        console.log('App connected to database');
        app.listen(PORT, ()=> {
            console.log(`App is listening on ${PORT}`);
        });
    })
    .catch( (error) => {
        console.log(error);
    });