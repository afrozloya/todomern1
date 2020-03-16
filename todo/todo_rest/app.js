const express = require('express')
const userRouter = require('./routers/user')
const todoRouter = require('./routers/todo')
const port = 3000
require('./db/db')
const app = express()
app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use(userRouter)
app.use(todoRouter)
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})