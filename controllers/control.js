var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://test:passandtestit@cluster0-polpl.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true });

//create a schema, that is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

app.get('/todo', function(req, res){
    //get data from Mongodb and pass it to the view
    Todo.find({}, function(err, data){
        if(err) throw err;
        res.render('todos', {todoData:data}); 
    });   
      
    });

app.post('/todo', urlencodedParser, function(req, res){
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);

    });    
  

    });

app.delete('/todo/:item', function(req, res){
   //delete the requested item from mongodb
   Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
       if(err) throw err;
       res.json(data);
   });       

});

};
