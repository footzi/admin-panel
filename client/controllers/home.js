import HomeModel from "../../api/models/home.js";
const homeApi = new HomeModel();

class HomeController {
    renderPage(req, res) {
        homeApi.getAllNotes().then(tests => {
            res.render("home", {
                tests
            });
        });
    }
}

export default HomeController;
