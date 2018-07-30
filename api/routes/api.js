import express from "express";
import Catalog from "../models/catalog";
const router = express.Router();
const catalog = new Catalog();

const json = {
    name: "Vlad",
    female: "Cat"
};

router.get("/categories", (req, res) => {
    catalog
        .getAllCategories()
        .then(categories => res.send(categories))
        .catch(e => res.send("500", e));
});

export default router;
