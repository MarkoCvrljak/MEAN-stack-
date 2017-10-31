var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('MongoDB URI with your password and username', ['your_db_name']);

//get all todos
router.get('/todos', function(req, res, next){
    db.todos.find(function(err, todos){
        if(err){
            res.send(err);
        }else{
            res.json(todos);
        }
    })
});

//get single todo
router.get('/todo/:id', function(req,res,next){
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    
    }, function(err, todo){
        if(err){
            res.send(err);
        }else{
            res.json(todo);
        }
    });
});

//Save Todo
router.post('/todo', function(req,res,next){
    var todo = req.body;
    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            'error': 'invalid data'
        });
    }else{
        db.todos.save(todo, function(err, result){
            if(err){
                res.send(err);
            }else{
                res.json(result);
            }
        });
    }
});

//Update Todo
router.put('/todo/:id', function(req,res,next){
    var todo = req.body;
    var updObj = {};

    if(todo.isCompleted){
        updObj.isCompleted = todo.isCompleted;
    }

    if(todo.text){
        updObj.text = todo.text;
    }

    if(!updObj){
        res.status(400);
        res.json({
            'error': 'invalid data'
        });
    }else{
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function(err, result){
            if(err){
                res.send(err);
            }else{
                res.json(result);
            }
        });
    }
});

//delete todo
router.delete('/todo/:id', function(req,res, next){
    db.todos.remove({
        id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result){
        if(err){
            res.send(err);
        }else{
            res.json(result);
        }
    })
})


module.exports = router;