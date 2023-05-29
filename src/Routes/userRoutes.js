const express = require('express');

const userController = require('./../Controllers/userController');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUser);
router.patch('/', userController.updateUser);
router.delete('/', userController.deleteUser);

module.exports = router;
