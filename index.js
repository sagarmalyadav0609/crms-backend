const express = require('express')
const { ServerConfig } = require('./src/config')
const mainRoutes = require("./src/routes")
const { Utility } = require('./src/utils/common')
const app = express()

app.use(express.json())

app.use("/", mainRoutes )
Utility.encryptedPassword('shyam@4321')

app.listen(ServerConfig.PORT,()=>{
    console.log(`server is running on ${ServerConfig.PORT}`)
})


