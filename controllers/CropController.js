const crop = require('../models/crop');

// save crops
exports.postcrops = (req,res,next) => {
    let data= req.body.data;
    console.log(data, 'check')
    crop.insertMany(data).then((result)=>{
        console.log(result, 'resss')
        res.status(200).json({message: 'Crop added successfully!!!'});
    }).catch((err)=> {
        console.log(err);
    })
}

// fetch crops
exports.croplist = async (req,res,next) => {
    await crop.find().then((result) => {
        console.log(result, 'result')
        res.status(200).json({final: result});
    })
}

// update user
// exports. = async (req,res,next) => {
//     let obj = req.body.data;
//     let userId = req.body.id;
//     console.log(req.body, 'body')
//     await user.updateOne({_id:userId},{$set: obj}).then((result) => {
//         console.log(result, 'result');
//         res.status(200).json({final: result});
//     })
// }

// update user
exports.deleteCrop = async (req,res,next) => {
    let cropId = req.body.id;
    console.log('Entered Route', cropId)
    await crop.deleteOne({_id:cropId}).then((result) => {
        console.log(result, 'result');
        res.status(200).json({final: result});
    })
}
