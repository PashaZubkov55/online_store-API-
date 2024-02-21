require('dotenv').config()
const express = require('express')
const port = process.env.PORT || 5000
const app = express()

app.listen(port,()=>{
    try {
        console.log('run server...',port)
    } catch (e) {
        console.log('error', e.message)
        
    }
})