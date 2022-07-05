import express from 'express';

import {getBooks} from '../controllers/Books.js'
import {getTags} from '../controllers/Tags.js'

const router = express.Router();

// router.get('/:order(word1|word2|word3)?:direction(asec|desc)?', pkg);
router.get('/books', getBooks);
router.get('/tags', getTags);

export default router;