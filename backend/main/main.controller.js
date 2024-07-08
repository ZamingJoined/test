const express = require("express")
const router = express.Router()
const userService = require("../user/user.service")

router.get("/",(req,res)=>{
    const cookie = req.cookies.userCookie
    if(cookie){
        if(!req.session.users){
            req.session.users = userService.getUsers
        }
        const users = req.session.users
        const user = userService.findUser(users,cookie.id)
        if(user){
            if(user.id === cookie.id){
                res.render("./main/registered",{cookie:cookie})
            }
            else{
                res.cookie("userCookie",null)
                res.render("./main/notRegistered")//если это случиться то это баг,аномалия из сервиса
            }
        }else{
            res.cookie("userCookie",null)
            res.render("./main/notRegistered")
        }
    }
    else{
        res.render("./main/notRegistered")
    }
})

module.exports = router