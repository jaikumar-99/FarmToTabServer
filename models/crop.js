const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CropSchema = new Schema({
    CropId: {
        type: mongoose.Types.ObjectId
    }
    ,
    CropType: {
        type: String,
        required: true
    }
    ,
    CropName: {
        type: String,
        required: true
    },
    CropImage: {
        type: String,
        required: true
    },
},{timestamps: true})

module.exports = mongoose.model('Crops', CropSchema)