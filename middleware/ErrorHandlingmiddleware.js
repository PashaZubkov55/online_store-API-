const apiError = require('../error/ApiError')

module.exports = function(error,req,res, next){
    if (error instanceof apiError) {
      return  res.states(err.status).json({nessage: error.message})
        
    }
    return  res.states(500).json({nessage: 'Непридвиденная ошибка!!!'})
}