import express from 'express';

import {getBooks, deleteBook} from '../controllers/Books.js'

const router = express.Router();

// router.get('/:order(word1|word2|word3)?:direction(asec|desc)?', pkg);
router.get('/books', getBooks);

router.post('/delete/book', deleteBook);

export default router;
