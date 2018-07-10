import Sequelize from 'sequelize';
import connectionDB from '../../server/database';

const Test = connectionDB.define('test', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },            
    categoryId: {
        type: Sequelize.INTEGER,
    },
    name: Sequelize.STRING,
})

export default Test;