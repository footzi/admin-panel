import Categories from "../Schemes/Categories";

class CategoriesModel {
    async getAllCategories() {
        return await Categories.findAll({ raw: true })
            .then(categories => categories)
            .catch(e => e);
    }
}

export default CategoriesModel;
