const User = require('../model/user')
const jwt = require('jsonwebtoken')

const adminController = {}

adminController.login = (req, res) => {
    const body = req.body 
    if(body.key === process.env.JWT_ADMIN){
        const tokenData = {
            role : 'admin'
        }
        const token = jwt.sign(tokenData, process.env.JWT_ADMIN)
        res.json({token : `Bearer ${token}`})
    } else {
        res.json({error : 'invalid admin key'})
    }
}

adminController.list = (req, res) => {
    User.find()
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

adminController.destory = (req, res) => {
    const id = req.params.id 
    User.findOneAndDelete({_id : id})
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

adminController.update = (req, res) => {
    const id = req.params.id 
    const body = req.body
    User.findOneAndUpdate({_id : id}, body, {new : true, runValidators : true})
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = adminController