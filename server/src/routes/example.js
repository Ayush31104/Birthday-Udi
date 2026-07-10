const express = require('express');
const router = express.Router();
const { getAll, create } = require('../controllers/exampleController');

router.get('/', getAll);
router.post('/', create);

module.exports = router;
