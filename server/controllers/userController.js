const User = require('../models/users')
const jwt  = require('jsonwebtoken');
const { generatePassword, checkPassword } = require('../helpers')
const axios = require('axios')


module.exports = {

    signup: function(req,res){
        generatePassword(req.body.email, req.body.password)
        .then(function(passwordhasGenerate) {
            let saveUSer = new User({
                name:  req.body.name,
                gender: req.body.gender,
                phoneNumber: req.body.phone,
                address : req.body.address,
                email:   req.body.email,
                password: passwordhasGenerate
            })
            return saveUSer
        })
        .then(function(saveUSer) {
            saveUSer.save()
            .then(function(data){

                res.status(200).json({
                    data
                })
            })
            .catch(function(err){
                res.status(500).json({
                    error : err.errors
                })
            })
        })
        .catch(function(err){
            swal(`Registration Success`, '', "success")
        })
    },

    signin: function(req,res){
        User.findOne({
            email : req.body.email
        })
        .then(function(dataUser){
            user = dataUser
            return checkPassword(user.password, req.body.password, req.body.email)
        })
        .then(function(){
            let userId = user._id

            jwt.sign({
                userId : userId,
                name : user.name,
                email : user.email
            }, process.env.ACCESS_DATA, function(err,token){
                if(!err){
                    res.status(200).json({
                        userId,
                        name : user.name,
                        email: user.email,
                        token : token
                    })
                } else {
                    res.status(500).json({
                        error : err.message
                    })
                }
            })
        })
        .catch(function(){
            res.status(500).json({
                message : `email and password didn't match`
            })
        })
    },

    signinFacebook: function(req,res){
        let token = req.body.token
        let dataUser = null
        axios({
            method:'GET',
            url: `https://graph.facebook.com/me?fields=name,email&access_token=${token}'`
        })
        .then(function(response) {
            dataUser = response
            return User.find(
                { email: response.data.email }
            )
        })
        .then(function(data){
            if(data.length > 0){
                let id = data[0]._id
                jwt.sign({
                    userId : id,
                    name : data[0].name,
                    email : data[0].email
                }, process.env.ACCESS_DATA, (err, newToken) => {
                    res.status(200).json({
                        userId : id,
                        name : data[0].name,
                        email : data[0].email,
                        token : newToken
                    })
                })
            } else {

                let dataLogin = new User({
                    name: dataUser.data.name,
                    email: dataUser.data.email
                })
    
                dataLogin.save(function (err,user){
                    let id = user._id
                    if (!err) {
                        jwt.sign({
                            userId : id,
                            name : user.name,
                            email : user.email
                        }, process.env.ACCESS_DATA, (err, newToken) => {
                            res.status(200).json({
                                token : newToken
                            })
                        })
                    } else {
                       
                    }
                })
            }
        })
        .catch(function(err){
            console.log(err)
        })
    },

    update: function(req,res){
        User.findByIdAndUpdate(
            { _id : req.params.id}, 
            { 
              name:  req.body.name,
              gender: req.body.gender,
              phoneNumber: req.body.phoneNumber,
              address : req.body.address,
              email:   req.body.email,
            }
        )
        .then(function(user){
            res.status(200).json({
                message : `update user success`
            })
        })
        .catch(function(err){
            res.status(500).json({
                err
            })
        })
    },

    remove: function(req,res){
        User.findByIdAndRemove(
            { _id : req.params.id},
        )
        .then(function(user){
            res.status(200).json({
                message : `delete user ${user.name} success`
            })
        })
        .catch(function(err){
            res.status(500).json({
                err
            })
        })
    }
}