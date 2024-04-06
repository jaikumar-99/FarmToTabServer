const users = require('../models/user');

// save users
exports.postUsers = (req,res,next) => {
    let data= req.body.data;
    console.log(data, 'check')
    users.insertMany(data).then((result)=>{
        console.log(result, 'resss')
        res.status(200).json({message: 'User added successfully!!!'});
    }).catch((err)=> {
        console.log(err);
    })
}

// fetch users
exports.getUsers = async (req,res,next) => {
    await users.find().then((result) => {
        console.log(result, 'result')
        res.status(200).json({final: result});
    })
}

// update user
exports.updateUsers = async (req,res,next) => {
    let obj = req.body.data;
    let userId = req.body.id;
    console.log(req.body, 'body')
    await users.updateOne({_id:userId},{$set: obj}).then((result) => {
        console.log(result, 'result');
        res.status(200).json({final: result});
    })
}

// delete user
exports.deleteUser = async (req,res,next) => {
    let userId = req.body.id;
    console.log('Entered Route', userId)
    await users.deleteOne({_id:userId}).then((result) => {
        console.log(result, 'result');
        res.status(200).json({final: result});
    })
}
