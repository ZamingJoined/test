const express = require("express")
const router = express.Router()
const session = require('express-session')
const cookie = require('cookie-parser')

router.use(session({
    secret:"secret",
    saveUninitialized:true,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 60 * 24 * 30)
    }
}))

router.use(cookie())


const mainController = require("./main/main.controller")
const userController = require("./user/user.controller")
const newsController = require("./news/news.controller")

// вот сюда добавить маршрутизаторы
router.use("/",userController)
router.use("/",mainController)
router.use("/n",newsController)


module.exports = router