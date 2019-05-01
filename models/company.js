    const mongoose = require('mongoose')
    const Schema = mongoose.Schema

    const companySchema = new Schema({
        name : String,
        logo : String,
        address: String,
        city: String,
        telephone: Number,
        createdAt: Date,
        updatedAt: Date,
        drivers : {type: Schema.Types.ObjectId, ref: 'Driver'},
        cars : {type: Schema.Types.ObjectId, ref: 'Car'}
    },{timestamps: true})

    const Company = mongoose.model('Company', companySchema)
    module.exports = Company;
