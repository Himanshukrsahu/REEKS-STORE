import express from 'express';
import { createCollaboration } from '../controllers/collaborationController.js';

const router = express.Router();

router.post('/', createCollaboration);

export default router;
