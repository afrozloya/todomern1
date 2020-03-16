const mongoose = require('mongoose')
const validator = require('validator')
const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["new", "inprogress", "complete"]
    }

})
const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo