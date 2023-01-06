const express = require('express')
const app = express()
const configureDB = require('./config/database')
require('dotenv').config()
const cors = require('cors')
const router=require('./config/routes')

const port = 4010
app.use(express.json())
app.use(cors())
app.use('/upload',express.static('upload'))
configureDB()
app.use(router)

app.listen(port, () => {
    console.log('server running on port', port)
})