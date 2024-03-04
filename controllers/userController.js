const apiError = require('../error/ApiError')
class UserController{
    async registration  (req, res){

    };

   async login  (req, res){

    };
   async auth  (req, res, next){
       const {id} = req.query
     if (!id) {
       return next(apiError.badRequest('Не задан ID'))
     }
      return res.json(id)

    }
}
module.exports = new UserController()