require('dotenv').config()
const express = require('express')
const sequelize = require('./db')


const port = process.env.PORT || 5000


const app = express()

const start  =  async ()=>{
    try {
        await sequelize.authenticate()
        await  sequelize.sync()
        app.listen(port,()=> console.log('run server...',port))
    } catch (error) {
        console.log(error.message)
    }
}

start()