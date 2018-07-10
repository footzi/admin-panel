import HomeModel from '../../api/models/home.js';
const homeApi = new HomeModel;

class HomeController {
    renderPage(req, res) {
        homeApi.getAllNotes()
            .then(notes => {
                res.render('index', {
                    test: notes
                })
            });
        
    }
}

export default HomeController;