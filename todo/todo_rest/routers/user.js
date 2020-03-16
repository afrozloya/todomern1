const express = require('express')
const User = require('../models/User')
const auth = require("../middleware/auth")
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = jwt.sign({_id: user._id, role:user.role}, "mykey123")
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email, password} )
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = jwt.sign({_id: user._id, role:user.role}, "mykey123")
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/users/me', auth.auth, async(req, res) => {
    res.send(req.user)
})
module.exports = router