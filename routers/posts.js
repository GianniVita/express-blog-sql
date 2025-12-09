const express = require('express');
// Create an istance of the router application (mini-app)
const router = express.Router();
const articlesController = require('../controllers/articlesController');



//Index
router.get('/', articlesController.index);

//Show
router.get('/:id', articlesController.show);

//Store
router.post('/', articlesController.store);

//Update
router.put('/:id', articlesController.update);

//Modify
router.patch('/:id', articlesController.modify);

//Destroy
router.delete('/:id', articlesController.destroy);

module.exports = router;




