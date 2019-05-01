const mongoose = require('mongoose')
const Schema = mongoose.Schema

const driverSchema = new Schema({
        name: String,
        age: Number,
        image: String,
    cars : [
        {
            name : {type: Schema.Types.ObjectId, ref: 'Car'},
            picked: Date,
            dropped: Date,
            fuel: String,
            condition: String
    }]
},{timestamps: true})

const Driver = mongoose.model('Driver', driverSchema)
module.exports = Driver;
