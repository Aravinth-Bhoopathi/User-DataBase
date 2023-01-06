const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchmea = new Schema({
    name : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true,
        unique : true,
        minlength : 10,
        maxlength : 10
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate : {
            validator : function(value){
                return isEmail(value)
            },
            message : function(){
                return 'invalid email format'
            }
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        maxlength : 128
    },
    country : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    file:{
        type:String,
        required:true
    }
}, {timestamps : true})

userSchmea.pre('save', function(next){
    const user = this
    bcrypt.genSalt(10)
        .then((salt) => {
            bcrypt.hash(user.password, salt)
                .then((encrypted) => {
                    user.password = encrypted
                    next()
                })
        })
})

const User = mongoose.model('User', userSchmea)
module.exports = User