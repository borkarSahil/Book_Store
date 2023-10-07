import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// /books already written in index.js

// Route for Save a new Book
router.post("/", async (req, res) => {
    try {
// IF title,author,publishedYear is not given send message
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        )
        {
            return res.status(400).send({
                message: 'Send All Fields : title,author,publishYear'
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// Route to get All Books from database
router.get('/', async (req,res) => {
    try {
        // {} to get all books
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length ,
            data : books
        });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

// Route to get One Book from database
router.get('/:id', async (req,res) => {
    try {
        // useParams to get id
        const {id} = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

// Route for Update the Book
// To update get the book by its id and then update
router.put('/:id', async (req,res) => {
    try {
        
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        )
        {
            return res.status(400).send({
                message: 'Send All Fields : title,author,publishYear'
            });
        }

        const {id} = req.params;       
        const result = await Book.findByIdAndUpdate(id, req.body); 

        if(!result) {
            return res.status(404).json({message: "Book Not Found"});
        }

        return res.status(200).send({ message: "Book Updated Successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

// Route to Delete a Book
router.delete("/:id", async (req, res) => {
    try {

        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        
        if(!result) {
            return res.status(404).json({message: "Book Not Found"});
        }

        return res.status(200).send({ message: "Book Deletion Successful" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

export default router;