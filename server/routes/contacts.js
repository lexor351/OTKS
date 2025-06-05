const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Получение всех контактов
router.get('/contacts', contactController.getAllContacts);

// Создание нового контакта
router.post('/contacts', contactController.createContact);

module.exports = router;