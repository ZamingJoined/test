let news = [
    {
        title:"news number 1",
        disciptions:"discription",
        id:0,
        user_link:"",
        user_id:"",
        key_tags:[
            "news","test","admin"
        ],
        link:"/n/0",
        username:"admin"
    }
]
let id = 1
function getNews(){
    return news
}
function findById(id_){
    for(let i =0;i < news.length;i++){
        if(id_ == news[i].id){
            return news[i]
        }
    }
    return null
}
function addNews(title,disciptions,user_link,user_id,key_tags,username){
    const maket = {
        title:title,
        disciptions:disciptions,
        id:id,
        user_link:user_link,
        user_id:user_id,
        key_tags:key_tags,
        link:"/n/"+id,
        username:username
        
    }
    news.push(maket)
    id++
    return maket
}
function delNews(id){
    news.forEach(elem=>{
        if(elem.id == id){
            delete elem
            return true
        }
    })
    return false

}

module.exports = {
    addNews,getNews,delNews,findById
}