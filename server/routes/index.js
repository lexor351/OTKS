const express = require('express');
const router = express.Router();

router.use('/tabs', require('./tabs'));
router.use('/contacts', require('./contacts'));
router.use('/links', require('./links'));
router.use('/api/instructions', require('./routes/instructions'));

module.exports = router;
