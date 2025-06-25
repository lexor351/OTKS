const express = require('express');
const router = express.Router();
const instructionController = require('../controllers/instructionController');

// Получить категории
router.get('/instructions', instructionController.getCategories);

// Получить файлы по категории
router.get('/instructions/:category', instructionController.getFilesByCategory);

// Получить содержимое конкретного файла
router.get('/instructions/:category/:filename', instructionController.getFileContent);

module.exports = router;