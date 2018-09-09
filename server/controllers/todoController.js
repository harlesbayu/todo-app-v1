const Todo = require('../models/todo')
const User = require('../models/users')
const axios = require('axios')

module.exports = {

    findAll: function(req,res){
        User.findById(req.id)
        .populate("todoList")
        .then(function(task){
            res.status(200).json({
                task
            })
        })
        .catch(function(err){
            res.status(500).json({
                err
            })
        })
    },

    create: function(req,res){

        let saveTask = new Todo({
            name : req.body.name,
            description: req.body.description,
            dueDate : req.body.dueDate
        })

        saveTask.save()
        .then(function(task){

            User.findByIdAndUpdate(
                { _id : req.id}, 
                { $push : { todoList : task._id } } 
            )
            .then(()=>{})
            .catch(()=>{})

            res.status(200).json({
                task
            })
        })
        .catch(function(err){
            res.status(500).json({
                err
            })
        })
    },

    update: function(req,res){
        
        Todo.findByIdAndUpdate(
            { _id : req.params.id}, 
            { 
             name : req.body.name,
             description: req.body.description,
             dueDate : req.body.dueDate
            }
        )
        .then(function(task){
            res.status(200).json({
                message : `update ${task.name} success`
            })
        })
        .catch(function(err){
            res.status(500).json({
                err
            })
        })
    },

    remove: function(req,res){
        Todo.findByIdAndRemove(
            { _id : req.params.id},
        )
        .then(function(task){
            res.status(200).json({
                message : `delete task ${task.name} success`
            })
        })
        .catch(function(err){
            res.status(500).json({
                err
            })
        })
    },

    complete: function(req,res){
        Todo.findByIdAndUpdate(
            { _id : req.params.id},
            { status : true }
        )
        .then(function(task){
            res.status(200).json({
                message : `Task ${task.name} complete`
            })
        })
        .catch(function(err){
            res.status(500).json({
                err
            })
        })
    },

    uncomplete: function(req,res){
        Todo.findByIdAndUpdate(
            { _id : req.params.id},
            { status : false }
        )
        .then(function(task){
            res.status(200).json({
                message : `Task ${task.name} uncomplete`
            })
        })
        .catch(function(err){
            res.status(500).json({
                err
            })
        })
    },

    quotes: function(req,res){
        axios({
            method:'GET',
            url: `https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1`,
            headers: {
                "X-Mashape-Key" : "yNfcz8MegVmshlOefZQ1WUGmvFiQp1BVuPmjsnpRYhoTrL1ND2",
                "Accept" : "application/json"
            }
        })
        .then(function(response) {
            res.status(200).json({
                quotes : response.data[0].quote
            })
        })
        .catch(function(err){})
    }
}