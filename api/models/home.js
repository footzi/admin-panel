import Test from '../Schemes/Test.js';

class HomeModel {
    async getAllNotes() {
        return await Test.findAll({raw: true})
            .then(notes => notes)
    }
}

export default HomeModel;