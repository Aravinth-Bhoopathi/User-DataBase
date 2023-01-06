const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({  
    destination: (req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname)
    }
})

const imageFile = multer({storage})

const userController = require('../app/controller/userController')
const {authentication} = require('../app/middleware/authentication')
const adminController = require('../app/controller/adminController')
const {authorization} = require('../app/middleware/authorization')

router.post('/api/user/register', imageFile.single('file'), userController.register)
router.post('/api/user/login', userController.login)
router.get('/api/user/account', authentication, userController.account)

router.post('/api/admin/login', adminController.login)
router.get('/api/admin/list', authorization, adminController.list)
router.put('/api/admin/update/:id', authorization, adminController.update)
router.delete('/api/admin/destory/:id', authorization, adminController.destory)

module.exports = router