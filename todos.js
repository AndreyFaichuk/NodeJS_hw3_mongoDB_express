const {Todo} = require("./mongoSettings")

function listTodos() {
    return (async () => (await Todo.find()))()
}

function getTodoByID(todoId) {
    return (async () => (await Todo.find({id: todoId})))()
}

function addTodo({name, status}) {
    return (async () => {

        const newTodo = new Todo({
            name: name || "no name was given",
            status: status || "no status was given"
        })

        await newTodo.save()

        return newTodo
    })()
}

function removeTodo(todoId) {
    return (async () => await Todo.deleteOne({_id: todoId}))()
}

function updateTodo(id, body) {
    return (async () => await Todo.updateOne({ _id: id}, body))()
}


module.exports = {listTodos,getTodoByID,addTodo,removeTodo, updateTodo}