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
        .then(category => {
            res.send(201); //created https://habr.com/post/265845/
        })
        .catch(err => {
            console.log(err); //не работает, пока не понятно как пракинуть ошибку
            res.send(500); // это работает
        })
});

router.put("/category", (req, res) => {
    const id = req.query.id;
    const update = req.body;
    for (let item in update) {
        catalog.updateCategory(id, item, update[item]);
    }
    res.send(200);
});

export default router;
