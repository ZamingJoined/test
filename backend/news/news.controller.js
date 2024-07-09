const express = require("express")
const router = express.Router()
const newsService = require("./news.service")
const newsModel = require("./news.model")

router.get("/:newsId",(req,res)=>{
    const newsId = req.params.newsId
    const news = newsModel.findById(newsId)
    if(news){
        res.render("newsPage",{data:news})
    }
    else{
        res.send(news)
    }
})
router.get("/tag/:tag",(req,res)=>{
    const tag = req.params.tag
    const result = newsService.findByTag(tag)
    res.send(result)
})

module.exports = router