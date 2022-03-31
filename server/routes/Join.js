import express from 'express'
import pkg from '../controllers/JoinTestController.js';
const router = express.Router();
router.get('/', pkg);
export default router;