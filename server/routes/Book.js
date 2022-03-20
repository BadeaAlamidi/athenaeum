import express from 'express';

import pkg from '../controllers/Books.js'
const {getBooks} = pkg;

const router = express.Router();

router.get('/', pkg);

export default router;