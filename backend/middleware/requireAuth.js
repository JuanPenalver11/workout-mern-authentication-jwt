
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
     //requireAuth de que el token proveido exite

  
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]
  // aqui lo que queremos divirdir el formato del token para obetener la parte que nos concierne
    // el token aparece como tal 'Bearer ya27jiujhuihacnohco' digamos. Bueno nostros queremos la segunda parte
    // para ello dividimos la autorizacion y nos quedamos con 'ya27jiujhuihacnohco'
  try {
    const {_id } = jwt.verify(token, process.env.SECRET)
 //jwt tiene un metodo para verificar si el token es correcto
    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = {requireAuth}