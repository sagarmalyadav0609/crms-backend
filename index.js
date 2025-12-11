const express = require('express')
const { ServerConfig } = require('./src/config')
const mainRoutes = require("./src/routes")
const app = express()

app.use(express.json())

app.use("/", mainRoutes )

app.listen(ServerConfig.PORT,()=>{
    console.log(`server is running on ${ServerConfig.PORT}`)
})