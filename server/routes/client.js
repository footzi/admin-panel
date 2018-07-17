import express from 'express';
import HomeController from '../../client/controllers/home.js'
const router = express.Router();
const home = new HomeController;

router.get('/', home.renderPage)

export default router;