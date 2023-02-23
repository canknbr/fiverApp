import express from 'express';
import {deleteUser} from '../controllers/user.controller.js';
const router = express.Router();
import { verifyToken } from '../middleware/jwt.js';
router.delete('/:id',verifyToken,deleteUser);



export default router;
