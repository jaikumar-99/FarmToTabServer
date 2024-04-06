const express = require('express')

const router = express.Router();
const usercontroller = require('../controllers/userController');
// fetch users
router.get('/getuser', usercontroller.getUsers);
// add users
router.post('/addUser', usercontroller.postUsers);
// update users
router.post('/updateUser', usercontroller.updateUsers);
// delete user
router.post('/deleteUser', usercontroller.deleteUser);

module.exports = router;