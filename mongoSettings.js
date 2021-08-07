const mongoose = require("mongoose")

const Schema = mongoose.Schema

// установка схемы

const todoScheme = new Schema({
    name: {
        type: String
    },
    status: {
        type: String
    }
}, { versionKey: false })

const Todo = mongoose.model("Todo", todoScheme)

const url = "mongodb://localhost:27017/todo"

mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})



module.exports = {Todo}