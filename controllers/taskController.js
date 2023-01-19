const {Board} = require("../models/Board");
const errorHandler = require("../utils/errorHandler");

const addTask = async (req, res) => {
    const { name, description, isArchived, status} = req.body;
    console.log(req.body);
    const userId = req.user.userId
    const _id = req.params.id;
    try {
        await Board.updateOne({
            _id,
            createdBy: userId
        }, {
            '$push': { 
                tasks: {
                    name, 
                    description, 
                    isArchived, 
                    status
                }
            }
        });
        const board = await Board.findOne({_id});
        
        res.status(200).json(board);
    } catch (e) {
        errorHandler(res, e);
    }
}

const editTask = async (req, res) => {
    const {id, idTask} = req.params;
    const {name, description, status, isArchived} = req.body;

    try {
        await Board.updateOne({'tasks._id': idTask}, { $set: {
            'tasks.$.name': name,
            'tasks.$.description': description,
            'tasks.$.status': status,
            'tasks.$.isArchived': isArchived,
        }});
        
        const board = await Board.find({_id: id})
        res.status(200).json(board)
    } catch (e) {
        errorHandler(res, e);
    }
}

const deleteTask = async (req, res) => {
    const { id, idTask } = req.params;

    try {
        await Board.findOneAndUpdate({id}, {
            $pull: {
                tasks: {_id: idTask}
            }
        })

        const board = await Board.find({_id: id});
        res.status(200).json(board);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports = {
    addTask,
    editTask,
    deleteTask
}
