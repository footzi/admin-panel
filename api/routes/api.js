import express from "express";
import Catalog from "../models/catalog";
import writeFile from '../utils/write-file';
import deleteFile from '../utils/delete-file';

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
            console.log(err); //не работает, пока не понятно как прокинуть ошибку
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

router.post('/file', (req, res) => {
    const file = req.files.file;
    const folder = req.body.folder;

    writeFile(file, folder)
        .then(fileName => res.send(200, fileName))
        .catch(err => res.send(500, err)) //Тоже пока не понятно как прокинуть ошибку
})

router.delete('/file', (req, res) => {
    const filePath = req.body.filePath;

    deleteFile(filePath)
        .then(res.send(500))
        .then(err => res.send(500, err)) //Тоже пока не понятно как прокинуть ошибку)
})

export default router;
