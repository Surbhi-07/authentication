const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    //create schmea
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
})

//create collection
const Empdetail = new mongoose.model('Empdetail', employeeSchema)
module.exports = Empdetail;