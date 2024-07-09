let news = require("./news.model")

function getNewsOfUser(user_id){
    let newsOfuser = []
    const getnews = news.getNews()
    getnews.forEach(element => {
        if(element.user_id == id){
            newsOfuser.push(element)
        }
    });
    return newsOfuser
}
function findByTag(tag){
    let tagNews = []
    const getnews = news.getNews()
    getnews.forEach(element => {
        for(let i = 0;i < element.key_tags.lenght;i++){
            if(element.key_tags[i] === tag){
                tagNews.push(element)
            }
        }
    });
    return tagNews
}
function findByTitle(title){
    let result = []
    const getnews = news.getNews()
    getnews.forEach(element =>{
        if(element.title === title){
            result.push(element)
        }
    })
    return result
}
module.exports = {
    findByTag,findByTitle,getNewsOfUser
}