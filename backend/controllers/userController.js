const User = require('../models/userModel')
const jwt = require('jsonwebtoken') //npm i jsonwebtoken


const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET,{expiresIn : '1d'} )
    //jwt tiene un metodo llamado sign in que va a generar un token, 
    // este token tiene header, payload y signature
    // header no se lo que es 
    //payload contine informacion sobre el usuario. Nunca puede contener informacion sensible
    //signature es una amalgama deheader, payload y el secret. Secret es una codigo creado que no conocer nadie
    // el jwt funciona como las cookies
    // el token es enviado al servidor, el servidor buscara al ordenador que haya enviado el token 
    // si los tokens coinciden el usurio tendra acceso 
}


//login user

const loginUser = async (require, response) => {
    const { email, password}= require.body
    try{
        const user = await User.login(email, password)
       //create token 
       const token = createToken(user._id)

       response.status(200).json({email, token})
   }catch(error){
       response.status(400).json({error: error.message})
   }
};

//signup user

const signupUser = async (require, response) => {
    const { email, password } = require.body
    try{
        const user = await User.signup(email, password)

        //create token 
        const token = createToken(user._id)

        response.status(200).json({email, token})
    }catch(error){
        response.status(400).json({error: error.message})
    }
};

module.exports = {
  loginUser,
  signupUser,
};
