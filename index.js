const express = require('express')
const app = express()

const port = 3000
const host = "http://localhost:"

const main = require("./backend/main")

app.use("/",main)

app.set("views","./frontend/pages")
app.set("view engine","ejs")
app.use(express.static("./frontend/public"))


app.listen(port,()=>{
    console.log("server is connected",host + port)
})