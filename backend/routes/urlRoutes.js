import express from 'express';
import {
  createShortUrl,
  getOriginalUrl,
  updateUrl,
  deleteUrl,
  getUrlStats
} from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', createShortUrl);
router.get('/shorten/:shortCode', getOriginalUrl);
router.put('/shorten/:shortCode', updateUrl);
router.delete('/shorten/:shortCode', deleteUrl);
router.get('/shorten/:shortCode/stats', getUrlStats);

export default router;
