const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Статические файлы (для изображений)
app.use('/uploads', express.static(path.join(__dirname,'uploads')));


// Маршруты
app.use('/api', require('./routes/instructions'));
app.use('/api', require('./routes/tabs'));
app.use('/api', require('./routes/contacts'));
app.use('/api', require('./routes/links'));

// Отдача фронтенда
app.use(express.static(path.join(__dirname, '../client/dist')));

// Все запросы, которые не подходят под /api — перенаправляем на index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));