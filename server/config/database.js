const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const configureDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/user-data-app')
        .then(() => {
            console.log('connect to db')
        })
        .catch(() => {
            console.log('error connecting to db')
        })
}

module.exports = configureDB