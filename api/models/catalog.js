import Categories from "../Schemes/Categories";

class CategoriesModel {
    async getAllCategories() {
        return await Categories.findAll({ raw: true })
            .then(categories => categories)
            .catch(e => e);
    }

    async getCategory(id) {
        return await Categories.findById(id, { raw: true })
            .then(category => category)
            .catch(e => e);
    }

    async setCategory(data) {
        return await Categories.create(data)
            .then(category => category)
            // .catch(err => console.log(err)) //не работает, пока не понятно как вызвать и пракинуть ошибку
    }

    async updateCategory(id, key, value) {
        return await Categories.update({ name: value }, { where: { id } }).then(
            () => {
                console.log("update ok");
            }
        );
    }
}

export default CategoriesModel;
