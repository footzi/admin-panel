import Sequelize from "sequelize";
import connectionDB from "../../server/database";

const Categories = connectionDB.define("categories", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: Sequelize.STRING,
    image_src: Sequelize.STRING,
    href: Sequelize.STRING
});

export default Categories;
