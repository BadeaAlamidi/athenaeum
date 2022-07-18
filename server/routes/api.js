import express from 'express';

import {getBooks, getBook} from '../controllers/Books.js'
import {getAllTags, getBookTags} from '../controllers/Tags.js'
import getTaggedBooks from '../controllers/JoinTestController.js'
import { getBookAuthors } from '../controllers/Authors.js';

const router = express.Router();

// router.get('/:order(word1|word2|word3)?:direction(asec|desc)?', pkg);
router.get('/books', getBooks);
router.get('/book/:id', getBook);
router.get('/tags', getAllTags);
router.get('/taggedbooks',getTaggedBooks);
router.get('/bookauthors/:bookId', getBookAuthors);

export default router;