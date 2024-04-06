const express = require('express')

const router = express.Router();
const cropController = require('../controllers/CropController');
// fetch crops 
router.get('/getcropslist', cropController.croplist);  
// add users
router.post('/addcrop', cropController.postcrops);
// update users
// router.post('/updateUser', cropController.updateUsers);
// delete user
router.post('/deletecrop', cropController.deleteCrop);

module.exports = router;