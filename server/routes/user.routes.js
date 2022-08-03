var express = require('express')
var controller = require('../controller/user.controller.js')
var router = express.Router()


router.get('/checkEmailExists/:email', controller.checkEmailExists)
router.get('/updateUserInfo/:id/:firstname/:lastname/:email', controller.updateUserInfo)
router.get('/getPass/:id', controller.getPassword)
router.get('/updatePassword/:id/:password', controller.updatePassword)
router.get('/getUsers', controller.getUsers)
router.get('/addUser/:firstname/:lastname/:email/:password', controller.addUser)
router.get('/checkLogin/:email/:password', controller.checkLogin)

module.exports = router