const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async(req, res, next) => {
    try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, "mykey123")
        const user = await User.findOne({ _id: data._id})
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}

const admin = async(req, res, next) => {
    try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, "mykey123")
        const user = await User.findOne({ _id: data._id, role:'admin'})
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}

module.exports = {
    auth,
    admin
}