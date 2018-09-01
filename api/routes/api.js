import express from "express";
import Catalog from "../models/catalog";
const router = express.Router();
const catalog = new Catalog();

router.get("/categories", (req, res) => {
    catalog
        .getAllCategories()
        .then(categories => res.send(categories))
        .catch(e => res.send("500", e));
});

router.get("/category", (req, res) => {
    const id = req.query.id;
    catalog
        .getCategory(id)
        .then(category => res.send(category))
        .catch(e => res.send("500", e));
});

router.post("/category", (req, res) => {
    //Обработка ошибок??
    catalog
        .setCategory(req.body)
    res.send(200);
})

router.put("/category", (req, res) => {
    const id = req.query.id;
    const update = req.body;
    for (let item in update) {
        catalog.updateCategory(id, item, update[item]);
    }
    res.send(200);
});

export default router;
