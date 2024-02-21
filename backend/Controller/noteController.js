const express = require('express');
const noteModel = require('../Model/Note')
const authorization = require('../Midleware/authorisation')

const notecontroller = express.Router();

//get all

notecontroller.get('/', async(req,res)=> {
  try {
    const note = await noteModel.find();
    res.send({note: note});
  } catch (error) {
    console.log(error)
  }
})


notecontroller.post('/',authorization, async(req,res)=> {
    const {name, title, price, rating} = req.body;
    if(!name || !title || !price || !rating){
        return res.send({msg: "please fill all the feild"})
    }
    try {
        const note = await noteModel.create({
            name: name,
            title: title,
            price: price,
            rating: rating
        });
        res.send({
            msg: "note created Sucessfully",
            note: note
        })
    } catch (error) {
        console.log(error)
    }
  })
  

  // update

  notecontroller.patch('/edit/:id',authorization, async(req, res)=>{
    const id = req.params.id
    const userId = req.userId
    try {
        const note = await noteModel.findByIdAndUpdate({_id:id,userId},{...req.body}) 
        res.send({msg:"Note updated sucessfully"})
    } catch (error) {
        console.log(error)
    }
  })


  // delete

  notecontroller.delete('/edit/:id',authorization, async(req, res)=>{
    const id = req.params.id
    const userId = req.userId
    try {
        const note = await noteModel.findByIdAndDelete({_id:id,userId}) 
        res.send({msg:"Note delete sucessfully"})
    } catch (error) {
        console.log(error)
    }
  })


  module.exports =  notecontroller