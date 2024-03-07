const uuid = require('uuid')
const path = require('path')
const{Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const { JSON } = require('sequelize')
class DeviceController{
   async getAll  (req, res){
      let {brandId, typeId, limit, page  } = req.query
      page = page || 1 
      limit = limit || 9
      let offset = page * limit - limit
      let divices;
      if (!brandId && !typeId) {
        divices = await Device.findAll({limit, offset})
      }

      if (brandId && !typeId) {
        divices = await Device.findAndCountAll({where: {brandId}, limit, offset})
      }
      if (!brandId && typeId) {
        divices = await Device.findAndCountAll({where: {typeId}, limit, offset})
         
      }
     
      if (brandId && typeId) {
        divices = await Device.findAndCountAll({where: {brandId ,typeId},limit, offset})

         
      }
      return res.json(divices)
   }    

 async  create(req, res,next){
    try {
        const {name, price, brandId, typeId , info} = req.body
    //передача изображение
     const {img} = req.files
     const fileName = uuid.v4() + '.jpg'
     img.mv(path.resolve(__dirname,'..','static', fileName)) //перемещение файла в нужную папку
     
     const divice = await Device.create({name, price, brandId, typeId , img: fileName})
      // добавляем информацию о дивайсе
     if (info) {
      info = JSON.parse(info)
      info.array.forEach(i => {
        DeviceInfo.create({
          title: i.title,
          description : i.description,
          deviceId : divice.id
        })
        
      });
      
     }
     
     return res.json(divice)

    } catch (err) {
        next(ApiError.badRequest(err.message))
    }

    



   }
  async getDevice(req, res){
    const {id} = req.params
    const device = await Device.findOne(
      {
        where: {id},
        include:{
          model: DeviceInfo,
          as: 'info',
        }
      }
    )
    return res.json(device)


   }
}
module.exports = new DeviceController()