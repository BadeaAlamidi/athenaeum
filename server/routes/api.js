import express from 'express';

import {getAllTags, getBookTags} from '../controllers/Tags.js'
import {getBooks, getBook, deleteBook, addBook, editBook} from '../controllers/Books.js'
import getTaggedBooks from '../controllers/JoinTestController.js'
import { getBookAuthors, getAllAuthors } from '../controllers/Authors.js';

const router = express.Router();

// router.get('/:order(word1|word2|word3)?:direction(asec|desc)?', pkg);
router.get('/books', getBooks);

router.get('/book/:id', getBook);
router.get('/tags', getAllTags);
router.get('/authors', getAllAuthors);
router.get('/taggedbooks',getTaggedBooks);
router.get('/bookauthors/:bookId', getBookAuthors);
router.get('/booktags/:bookId', getBookTags);

router.post('/delete/book', deleteBook);

router.post("/add/book", addBook);
router.patch("/edit/book/:id", editBook);

export default router;
