module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());

  var nedb = require('nedb');  
  var userDB = new nedb({ filename: 'users-alt', autoload: true });
  
  
  usersRouter.post('/', function(req, res) {
    console.log('usersRouter.post /');
    // look for the most recently created record and use it to set the id
    // field  of our incoming record, which is required by Ember Data
    userDB.find({}).sort({
      id: -1
    }).limit(1).exec(function(err, users) {
      if (users.length != 0) {
        req.body.user.id = users[0].id + 1;
      }else {
        req.body.user.id = 1;
      }
      // Insert the new record into our datastore, and return the newly
      // created record to Ember Data
      userDB.insert(req.body.user, function(err, newUser) {
        res.status(201);
        res.send(
          JSON.stringify({
            user: newUser
          })
        );
      });
    });
  });

  usersRouter.get('/', function(req, res) {
    console.log('usersRouter.get /');
    userDB.find(req.query).exec(function(error, users) {
      res.send({
        users: users
      });
    });
  });

  usersRouter.get('/:id', function(req, res) {
    console.log('usersRouter.get /:id');
    res.send({
      'users': {
        id: req.params.id
      }
    });
  });

  usersRouter.put('/:id', function(req, res) {
    res.send({
      'users': {
        id: req.params.id
      }
    });
  });

  usersRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/alt/users', usersRouter);
};
