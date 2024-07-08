const crypto = require('crypto');
let id = 0
let user = require("./user.model");


function getUsers(){
    return user
}
function hashData(data){
    const hash = crypto.createHash('sha256').update(""+data).digest('hex');
    return hash
}
function addUser(name,pass){
    if(ifUsernameActive(name)){
        const maket = {
            name:name,
            pass:pass,
            id:hashData(id)
        }
        user.push(maket)
        id++
        return maket.id
    }else{
        return null
    }
}
function findUser(users,id){
    for(let i = 0;i < users.length;i++){
        // console.log(i,"cycle")
        // console.log(users[i],id.id)
        if(users[i].id == id){
            console.log("id true")
            return {
                name:users[i].name,
                pass:users[i].pass,
                id:users[i].id
            }
        }
    }
    return null
}
function findUserByUsername(username){
    for(let i =0;i < user.length;i++){
        if(user[i].name === username){
            return {
                name:user[i].name,
                id:user[i].id
            }
        }
    }
    return null
}
function ifUsernameActive(name){
    for(let i = 0;i < user.length;i++){
        if(name === user[i].name){
            return false
        }
    }
    return true
}
function login(name,pass){
    for(let i =0;i < user.length;i++){
        if(name === user[i].name && pass === user[i].pass){
            return user[i]
        }
    }
    return null
}

module.exports = {
    addUser,findUser,findUserByUsername,getUsers,login
}