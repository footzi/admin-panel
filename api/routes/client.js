import express from "express";
import HomeController from "../../client/controllers/home.js";
import CatalogController from "../../client/controllers/catalog.js";
const router = express.Router();
const home = new HomeController();
const catalog = new CatalogController();

router.get("/", home.renderPage);
router.get("/catalog", catalog.renderPage);

export default router;
