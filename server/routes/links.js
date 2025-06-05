const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

// Получение всех ссылок
router.get('/links', linkController.getAllLinks);

// Создание новой ссылки
router.post('/links', linkController.createLink);

module.exports = router;