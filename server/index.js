require('dotenv').config()
const express = require("express");
const sequelize = require('./db');
const models = require('./models/models')

const PORT = 4001;

// Создаём приложение для сервера
const app = express();
// Включаем поддержку JSON 
app.use(express.json());

const start = async () => {
    try {
        // Подключаемся к БД
        await sequelize.authenticate();
        await sequelize.sync();

        // Запускаем сервер
        app.listen(PORT, () => console.log('Server started on PORT: ' + PORT));
    } catch (e) {
        console.error(e);
    }
}

start()



