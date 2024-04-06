const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId
    }
    ,
    email: {
        type: String,
        required: true
    }
    ,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    
},{timestamps: true})

module.exports = mongoose.model('user', userSchema)