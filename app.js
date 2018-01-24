var express = require('express');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the settings
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

debugger;
/* Using the sessions */
app.use(session({secret: 'todotopsecret'}))


/* If there is no to do list in the session,
we create an empty one in the form of an array before continuing */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

/* The to do list and the form are displayed */
.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: req.session.todolist});
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push({"task":req.body.newtodo,"priority":"","completed":false});
    }
    res.redirect('/todo');
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        //req.session.todolist.splice(req.params.id, 1);
        req.session.todolist[req.params.id].completed=!req.session.todolist[req.params.id].completed;
    }
    res.redirect('/todo');
})

/* Deletes an item from the to do list */
.get('/todo/prio/:id', function(req, res) {
  debugger;
    if (req.params.id != '') {
      //  req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);
