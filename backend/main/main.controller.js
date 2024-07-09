const express = require("express")
const router = express.Router()
const userService = require("../user/user.service")

router.get("/",(req,res)=>{
    const cookie = req.cookies.userCookie
    if(cookie){
        
        const user = req.session.user
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