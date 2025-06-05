const express = require('express');
const router = express.Router();
const instructionController = require('../controllers/instructionController');

// Получить список всех .md файлов
router.get('/instructions', instructionController.getAllInstructions);

// Получить содержимое конкретного файла
router.get('/instructions/:filename', instructionController.getInstruction);

// Загрузить новый файл (POST)
router.post('/instructions/upload', instructionController.uploadInstruction);

module.exports = router;