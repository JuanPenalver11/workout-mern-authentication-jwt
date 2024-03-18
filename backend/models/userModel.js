const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const validator = require('validator') // npm i validator 

const Schema = mongoose.Schema;

const userModel = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});


//static signup method

userModel.statics.signup = async function (email, password){
// en este documento no tenemos acceso a User, lista de datos de mongoDb. 
// pero en su lugar podemos utilizar this. 
// al estar utilizando this no se pueden utilizar arrow functions
// por eso esta function ha sido llamada de forma "tradicional"

//validation 
if(!email || !password){ 
  throw new Error('All fields have to be field')
}
if(!validator.isEmail(email)){
  //validator has this method to check whether an email is an email
// it is going to throw true or false 
  throw new Error('Email is not valid')
}
if(!validator.isStrongPassword(password)){
  //validator has this method to check whether a password is strong
  //it throws true or false
  throw new Error('Password is not Strong')
}


  const exist = await this.findOne({email})
  if(exist){
    throw new Error('Email already exist')
  }

  const salt = await bcrypt.genSalt(10)
  //genSalta es un metodo que establece la dificultad de encodamiento
  const hash = await bcrypt.hash(password, salt)
  //hash es un metodo que mezcla al password con la salt
  const user = await this.create({email, password: hash})

  return user 

}

//static login method

userModel.statics.login = async function (email, password){
  if(!email || !password){ 
    throw new Error('All fields have to be field')
  }
  const user = await this.findOne({email})
  if(!user){
    throw new Error('Invalid email')
  }
  const match = await bcrypt.compare(password, user.password)
  //bcrypt tiene un metodo llamado compare para comparar la password en el lado del cliente 
  // con la password guardad en la base de datos. 
  //devuelve true o false 
  if(!match){
    throw new Error('Invalid password')
  }

  return user
}

module.exports = mongoose.model("User", userModel);
