import express from 'express';
import twig from 'twig';
import path from 'path';
import config from './config';
import Sequelize from 'sequelize';
import connectionDB from './database';
import bodyParser from 'body-parser';


//отдаем статичные файлы
app.use(express.static(path.join(__dirname, '/')));

//настройка бодипарсера
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//подключаем шаблонизатор, и нацелеваем на views
app.set('views', __dirname + '/views');
app.set('view engine', 'twig');
app.set('twig options', { 
    strict_variables: false
});
