require('dotenv').config()
const express = require('express')
const cors = require('cors')
const  fileUpload = require('express-fileupload')
const path = require('path')
const sequelize = require('./db')
const models = require('./models//models')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingmiddleware')



const port = process.env.PORT || 4000


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))

app.use(fileUpload({}))

//обработчик ошибок должен бытьпоследним
app.use(errorHandler)

app.use('/api', router)







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