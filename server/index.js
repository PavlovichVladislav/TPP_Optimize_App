require('dotenv').config();
const express = require("express");
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware'); 

const PORT = 4001;

// Создаём приложение для сервера
const app = express();
// Включаем поддержку JSON 
app.use(express.json());
// Включаем поддержку кросс-доменных запросов
app.use(cors());
// подключаем маршуртизацию
app.use('/api', router)
// Подключаем общую обработку ошибок 
app.use(errorHandler)

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



