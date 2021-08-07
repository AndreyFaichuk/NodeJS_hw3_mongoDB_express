const {listTodos, getTodoByID, addTodo, removeTodo, updateTodo} = require("./todos")

const express = require('express')
require('dotenv').config()

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
})

app.get("/todo", async (req, res) => {
    res.send(await listTodos())
})

app.get("/todo/:id", async (req, res) => {

    const todoId = req.params.id
    const contact = await getTodoByID(todoId)

    if (contact !== undefined){
        res.send(contact)
    } else {
        res.status(404)
        res.send({message: "Not found" })
    }
})

app.post("/todo", async (req, res, next) => {
        if(!('name' in req.body)){
            res.status(400)
            res.send({message: "Missing required name field"})
        }
        if(!('status' in req.body)){
            res.status(400)
            res.send({message: "Missing required status field"})
        } else {
            next()
        }
    },
    async (req, res) => {
        const newContact = await addTodo(req.body)

        res.status(201)
        res.send(newContact)
    })

app.delete("/todo/:id", async (req, res) => {

    const todoId = req.params.id

    await removeTodo(todoId)
    await res.send(await listTodos())
})

app.patch("/todo/:id", async (req, res, next) => {
    const todoId = req.params.id

    await updateTodo(todoId, req.body)

    await res.send(await listTodos())



})


app.listen(3000, () => console.log('Server started on port: 3000'))