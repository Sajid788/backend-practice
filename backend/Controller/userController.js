const express = require('express');
const jwt = require('jsonwebtoken');
const  userModel = require('../Model/User');
const bcrypt = require('bcrypt')

const userController = express.Router();


// Sign up

userController.post('/signup', async(req,res)=>{
   const {name, email, password} = req.body;

   if(!name || !email || !password){
    return  res.send({msg: "please fill the all feild"});
   }
   try {
    const exist = await userModel.findOne({email});
    if(exist){
     return res.send({msg:"Usre already exist, please login"})
    }
    bcrypt.hash(password, 5, async(err, hash) => {
      if(err){
        return res.send({msg:"something went wrong"})
      }
      try {
            await userModel.create({
            name: name,
            email: email,
            password: hash
        })
        res.send({msg:"user created sucessfully"});
      } catch (error) {
        console.log(error)
        res.send({msg:"something went wrong"})
      }
    });
   } catch (error) {
    console.log(error)
   }
})


// login
userController.post('/login', async(req,res)=>{
    const { email, password} = req.body;
 
    if(!email || !password){
     return  res.send({msg: "please fill the all feild"});
    }
   try {
    const user = await userModel.findOne({email});
    if(!user){
       return  res.send({msg:"singup first"}) 
    }
    bcrypt.compare(password, user.password, async(err, result)=> {
        if(result){
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            res.send({
              token:token,
              user_name:user.name,
              msg: "Login sucessfull"
            })
        }
        res.send({msg:"wrong credential"})
    });
   } catch (error) {
    console.log(error)
   }
 })
 



module.exports = userController