import express from 'express';
//import proxy from 'express-http-proxy';
import twig from 'twig';
import path from 'path';
import Sequelize from 'sequelize';
import config from './server/config';
import connectionDB from './server/database';
import bodyParser from 'body-parser';
import home from './server/routes/home.js';

const app = express();

//отдаем статичные файлы
app.use(express.static(path.join(__dirname, '/')));

//настройка бодипарсера
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//подключаем шаблонизатор, и нацелеваем на views
app.set('views', __dirname + '/client/pages');
app.set('view engine', 'twig');
app.set('twig options', { 
    strict_variables: false
});

//Обработка запросов
app.use('/', home)

//Синхронизаниця с БД
connectionDB.sync({
    logging: console.log
});

//подключение к БД
connectionDB
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
    })
    .catch(err => {
    console.error('Unable to connect to the database:', err);
    });

app.listen(config.PORT, () => {
    console.log(`Example app listening on port ${config.PORT}!`);
});
