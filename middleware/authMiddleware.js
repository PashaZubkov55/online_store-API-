 const jwt = require('jsonwebtoken')
 module.exports  = function name(req, res,next) {
    if (req.method === 'OPTIONS') {
        next()   
    }
    try {
        const token = Headers.authorization.split(' ')
        if (!token) {
           return  res.status(401).json({message: 'пользователь не авторизован !'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
        
    } catch (e) {
        res.status(401).json({message: 'пользователь не авторизован !'})
        
    }
    
}