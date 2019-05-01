const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carSchema = new Schema({
  
        name: String,
        model: Number,
        year: Number,
        image: String
    
},{timestamps: true})

const Car = mongoose.model('Car', carSchema)
module.exports = Car;
