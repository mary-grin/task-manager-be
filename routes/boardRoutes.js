const isAuth = require("../middlewares/isAuth");
const { addBoard, editBoard, deleteBoard, getAllBoards } = require('../controllers/boardController');
const { addTask, editTask, deleteTask } = require('../controllers/taskController');

const express = require('express');
const router = express.Router();

router.post('/', isAuth, addBoard);
router.get('/', isAuth, getAllBoards);
router.patch('/:id', isAuth, editBoard);
router.delete('/:id', isAuth, deleteBoard);

router.post('/:id', isAuth, addTask);
router.patch('/:id/:idTask', isAuth, editTask);
router.delete('/:id/:idTask', isAuth, deleteTask);

module.exports = router;
