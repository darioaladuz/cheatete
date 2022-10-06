const express = require('express');
const router = express.Router();
const linksController = require('../controllers/link'); 

/* GET users listing. */
router.get('/', linksController.getAll);

router.post('/new', linksController.add);

router.delete('/delete/:id', linksController.del);

router.put('/update/:id', linksController.update);

module.exports = router;