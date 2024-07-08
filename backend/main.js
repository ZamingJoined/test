const express = require("express")
const router = express.Router()
const session = require('express-session')
const cookie = require('cookie-parser')
const mainController = require("./main/main.controller")
router.use(session({
    secret:"secret",
    saveUninitialized:true,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 60 * 24 * 30)
    }
}))

router.use(cookie())



const userController = require("./user/user.controller")

// вот сюда добавить маршрутизаторы
router.use("/",userController)
router.use("/",mainController)


module.exports = router