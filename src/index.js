const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())
const port = process.env.PORT

const List = mongoose.model('List', {
    name: String,
    description: String,
    status: String
})

app.get('/', async (req, res) => {
    const list = await List.find()
    return res.send(list)
})

app.post('/', async (req, res) =>{
    const list = new List({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status
    })
    await list.save()
    return res.send(list)
})

app.delete('/:id', async (req, res) => {
    const list = await List.findByIdAndDelete(req.params.id)
    return res.send(list)
})

app.put('/:id', async (req, res) => {
    const list = await List.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status
    })
    return res.send(list)
})

app.listen(port, () => {
    mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@listadetarefas.alzeqz8.mongodb.net/?retryWrites=true&w=majority&appName=listaDeTarefas`)
    console.log('App is Running')
})