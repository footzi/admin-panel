import Catalog from "../../api/models/catalog.js";
const catalog = new Catalog();

class CatalogController {
    renderPage(req, res) {
        catalog.getAllCategories().then(categories => {
            res.render("catalog", { categories });
        });
    }
}

export default CatalogController;
