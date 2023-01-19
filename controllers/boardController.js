const {Board} = require('../models/Board');
const errorHandler = require('../utils/errorHandler');

const addBoard = async (req, res) => {
    const {name, description} = req.body;
    if (name) {
        const board = new Board({
            createdBy: req.user.userId,
            name,
            description
        });
        try {
            await board.save();
            res.status(200).json(board);
        } catch (e) {
            errorHandler(res, e);
        }
        
    } else {
        res.status(400).json({
            message: 'Type name for creating a board'
        });
    }
}

const getAllBoards = async (req, res) => {
    try {
        const boards = await Board.find({createdBy: req.user.userId});
    res.status(200).json(boards);
    } catch (e) {
        errorHandler(res, e)
    }
}

async function editBoard(req, res) {
    const {name, description} = req.body;
    try {
        const board = await Board
        .findByIdAndUpdate({_id: req.params.id, 
            createdBy: req.user.userId}, 
            { name, description }, 
            {returnOriginal: false});
        res.status(200).json(board);
    } catch (e) {
        errorHandler(res, e);
    }
}

const deleteBoard = async (req, res) => {
    try {
        await Board.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId });
        res.status(200).json({
            message: 'Board deleted successfully'
        });
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports = {
    addBoard,
    editBoard,
    deleteBoard,
    getAllBoards
}
