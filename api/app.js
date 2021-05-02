const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { List, Task } = require('./db/models');
/*Route Handlers*/

app.use(bodyParser.json());
/*List Routes*/

/**
 * Get /lists
 * Purpose :Get all lists
 */
app.get('/lists', (req, res) => {
  List.find({}).then((lists) => {
    res.send(lists);
  });
});

app.post('/lists', (req, res) => {
  let title = req.body.title;

  let newList = new List({ title });

  newList.save().then((listDoc) => {
    res.send(listDoc);
  });
});

app.patch('/lists/:id', (req, res) => {
  List.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then(() => {
    res.sendStatus(200);
  });
});

app.delete('/lists/:id', (req, res) => {
  List.findOneAndRemove({
    _id: req.params.id
  }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/lists/:listId/tasks', (req, res) => {
  //we want to return whole task
  Task.find({
    _listId: req.params.listId
  }).then((tasks) => {
    res.send(tasks);
  });
});

app.post('/lists/:listId/tasks', (req, res) => {
  //we want to return whole task
  let newTask = new Task({
    _listId: req.params.listId,
    title: req.body.title
  });
  newTask.save().then((newTaskDoc) => {
    res.send(newTaskDoc);
  });
});

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
  //we want to return whole task
  Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
      _listId: req.params.listId
    },
    {
      $set: req.body
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
  //we want to return whole task
  Task.findOneAndRemove({
    _id: req.params.taskId,
    _listId: req.params.listId
  }).then(() => {
    res.sendStatus(200);
  });
});

app.get('/lists/:listId/tasks/:taskId', (req, res) => {
  //we want to return whole task
  Task.findOne({
    _id: req.params.taskId,
    _listId: req.params.listId
  }).then((tasks) => {
    res.send(tasks);
  });
});

app.listen(3000, () => {
  console.log('server is running on port 3000');
});
