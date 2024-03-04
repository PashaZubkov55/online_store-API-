const uuid = require('uuid')
const path = require('path')
const{Device} = require('../models/models')
const ApiError = require('../error/ApiError')
class DeviceController{
   async getAll  (req, res){
        const device = await Device.findAll()
        return res.json(device)
   }

 async  create  (req, res,next){
    try {
        const {name, price, brandId, typeId , info} = req.body
    //передача изображение
     const {img} = req.files
     const fileName = uuid.v4() + '.jpg'
     img.mv(path.resolve(__dirname,'..','static', fileName)) //перемещение файла в нужную папку
     
     const divice = await Device.create({name, price, brandId, typeId , img: fileName})
     
     return res.json(divice)

    } catch (err) {
        next(ApiError.badRequest(err.message))
    }

    



   }
  async getDevice(req, res){

   }
}
module.exports = new DeviceController()