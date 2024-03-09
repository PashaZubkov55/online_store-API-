const apiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {User, Basket} = require('../models/models')

//генирация jwt токена
const genirateJwt = (id, email, role)=>{
  return jwt.sign({id,  email, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
    )
}

class UserController{
    async registration  (req, res, next){
      const {email, password, role} = req.body
      if (!email || !password) {
        return next(apiError.badRequest('не карректный Email или пароль!'))
        
      } 
      
      const candidate =  await User.findOne({where:{email}})
      if (candidate) {
        return next(apiError.badRequest('Такаой пользователь уже есть!'))
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({email, role, password: hashPassword })
      const basket = await Basket.create({UserId: user.id})
      const token = genirateJwt(user.id, user.email, user.role)
         return res.json({token})
    };

   async login  (req, res, next){
    const {email, password} = req.body
    const user = await User.findOne({where:{email}})
    if (!user) {
      return next(apiError.internall('Пользователь не найден !'))
      
    }
    // проверка пароля
    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(apiError.internall('Указан не верный пароль!'))
    }
    const token = genirateJwt( user.id, user.email, user.role)
    return res.json({token})

    };
   async auth  (req, res, next){
     const token =  genirateJwt(req.user.id, req.user.email, req.user.role)
     return   res.json({token})
       

}
}
module.exports = new UserController()