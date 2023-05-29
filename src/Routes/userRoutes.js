const express = require('express');

const userController = require('./../Controllers/userController');
const protectController = require('./../Controllers/protectController');

const router = express.Router();

router.use(protectController.protect);

router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.patch('/:id', userController.updateUser);
router.delete('/;id', userController.deleteUser);

module.exports = router;
