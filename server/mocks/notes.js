module.exports = function(app) {
  var express = require('express');
  var notesRouter = express.Router();
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  var nedb = require('nedb');  
  var noteDB = new nedb({ filename: 'notes', autoload: true });

  notesRouter.get('/', function(req, res) {
    noteDB.find(req.query).exec(function(error, notes) {
      res.send({
        notes: notes
      });
    });
  });

  notesRouter.post('/', function(req, res) {
    console.log('notesRouter.post /');
    // look for the most recently created record and use it to set the id
    // field  of our incoming record, which is required by Ember Data
    noteDB.find({}).sort({
      id: -1
    }).limit(1).exec(function(err, notes) {
      if (notes.length != 0) {
        req.body.note.id = notes[0].id + 1;
      }else {
        req.body.note.id = 1;
      }
      // Insert the new record into our datastore, and return the newly
      // created record to Ember Data
      noteDB.insert(req.body.note, function(err, newNote) {
        res.status(201);
        res.send(
          JSON.stringify({
            note: newNote
          })
        );
      });
    });
  });

  notesRouter.get('/:id', function(req, res) {
    res.send({
      'notes': {
        id: req.params.id
      }
    });
  });

  notesRouter.put('/:id', function(req, res) {
    console.log('notesRouter.put');
    var id = parseInt(req.params.id);
    console.log("id: ", id);
    console.log("req.body.note: ", req.body.note);
    noteDB.update({id: id}, {$set: req.body.note},
      function(err, numReplaced, newNotes) {
        console.log("err: ", err);
        console.log("numReplaced: ", numReplaced);
        console.log("newNotes: ", newNotes);
        res.send({
          'notes': {
            id: req.params.id
          }
        });
      }
    )
  });

  notesRouter.delete('/:id', function(req, res) {
    var id = parseInt(req.params.id);
    noteDB.remove({id: id}, function(err, numRemoved) {
      res.status(204).end();
    });
  });

  app.use('/api/notes', notesRouter);
};
