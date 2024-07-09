const express = require("express")
const router = express.Router()
const userService = require("./user.service")
const users = require("./user.model")
const newsModel = require("../news/news.model")

router.use(express.urlencoded({extended:true}))
router.get("/register",(req,res)=>{
    res.render("register")
})
router.post("/register",(req,res)=>{
    const name = req.body.name
    const pass = req.body.pass
    if(name === ""|| pass === "" || name === undefined || pass === undefined){
        console.log("err")
        res.send("error").status(404)
    }
    else if(name && pass){
        const id = userService.addUser(name,pass)
        
        req.session.user = {name:name,pass:pass,id:id}
        res.cookie("userCookie",{
            id:id,
            link:"/user/"+name
        },{
            maxAge:(1000*60*60*7),
            httpOnly:true
        })
        res.redirect("/user/"+name)
    }
    else{
        res.send("error 404").status(404)
    }
})
router.get("/user/:username",(req,res)=>{
    const username = req.params.username
    const cookie = req.cookies.userCookie
    const userSession = req.session.user
    // console.log("sessions data :",req.session.users)
    
    const user = userService.findUser(cookie.id)
    if(user){// если пользователья существует
        if(username === user.name){
            if(!req.session.news){
                req.session.news = []
            }
            const news = req.session.news
            
            res.render("profile",{name:username,news:news})
            
        }
        else if(username !== user.name){
            const seeUser = userService.findUserByUsername(username)
            console.log(seeUser ,"see user is her")
            if(seeUser != null){
                res.send(seeUser).status(400)
            }else{
                res.send("user not founded").status(404)
            }
        }
        else{
            res.send("error 404").status(404)
        }
    }
    else{
        console.log(false)
        res.send("error code 4").status(404)
    }
})

router.get("/login",(req,res)=>{
    res.render('login')
})
router.post("/login",(req,res)=>{
    const name = req.body.name
    const pass = req.body.pass
    if(name && pass){
        if(name != "" && pass != ""){
            const user = userService.login(name,pass)
            if(user){
                res.cookie("userCookie",{
                    id:user.id,
                    link:"/user/"+user.name
                },{
                    httpOnly:true,
                    maxAge:(1000*60*60*24*7)
                })
                req.session.user = user
                res.redirect(req.cookies.userCookie.link)
            }
            else{
                res.send("такого пользователья не существует").status(400)
            }
        }
        else{
            res.send("заполните поля").status(400)
        }
    }else{
        res.send("пожалуиста повторите попытку").status(404)
    }
})
router.get("/addNews",(req,res)=>{
    const user = req.session.user
    if(user){
        res.cookie("userCookie",{
            id:user.id,
            link:"/user/"+user.name
        },{
            httpOnly:true,
            maxAge:(1000 * 60 * 60 * 24 * 7)
        })
        res.render("addNews")
    }
    else{
        res.redirect("/login")
    }
})
router.post("/addNews",(req,res)=>{
    const title = req.body.title
    const disciption = req.body.discriptions
    const tags = req.body.tags
    const tagsList = tags.split(",")
    const user = req.session.user
    const userLink = req.cookies.userCookie.link
    const news = newsModel.addNews(title,disciption,userLink,user.id,tagsList,user.name)
    if(!req.session.news){
        req.session.news = []
    }
    req.session.news.push(news)
    res.redirect("/n/" + news.id)
})


module.exports = router