const express = require('express');
const router = express.Router();
const tabController = require('../controllers/tabController');

router.get('/tabs', tabController.getAllTabs);
router.post('/tabs', tabController.createTab);

module.exports = router;