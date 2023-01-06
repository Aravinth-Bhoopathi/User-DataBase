const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {pick, omit} = require('lodash')

const userController = {}

userController.register = (req, res) => {
    const body = req.body
    body.file = req.file.path
    const data = pick(body, ['name', 'mobile', 'email', 'password', 'country', 'state',  'city', 'description', 'file'])
    const user = new User(data)
    user.save()
        .then((user) => {
            const obj = JSON.parse(JSON.stringify(user))
            res.json(omit(obj, ['password']))
        })
        .catch((error) => {
            res.json(error)
        })
}

userController.login = (req, res) => {
    const {email, password} = req.body 
    User.findOne({email : email})
        .then((user) => {
            if(user){
                bcrypt.compare(password, user.password)
                    .then((result) => {
                        if(result){
                            const tokenData = {
                                _id : user._id, 
                                name: user.name, 
                                mobile : user.mobile,
                                country : user.country,
                                state : user.state,
                                city : user.city
                            }
                            const token = jwt.sign(tokenData, process.env.JWT_SECRET)
                            res.json({token : `Bearer ${token}`})
                        } else {
                            res.json({notice : 'invalid email or password'})
                        }
                    })
            } else {
                res.json({notice : 'invalid email or password'})
            }
        })
}

userController.account = (req, res) => {
    const tokenData = req.tokenData
    User.findOne({_id : tokenData._id}, '-password')
        .then((user) => {
            res.json(user)
        })
        .catch((error) => {
            res.json(error)
        })
}

module.exports = userController