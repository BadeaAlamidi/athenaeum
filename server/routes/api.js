import express from 'express';

import {getBooks} from '../controllers/Books.js'

const router = express.Router();

// router.get('/:order(word1|word2|word3)?:direction(asec|desc)?', pkg);
router.get('/books', getBooks);

export default router;