// server.js
// where your node app starts
// init project
var express = require('express');
var app = express();
var Issue = require('./issue.js');
var mongoose = require('mongoose');
var helmet=require('helmet');
var bodyParser = require('body-parser');
var controller = require('./controller.js');


app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               



//app.use(helmet.XssFilter());
app.use(express.static('public'));


app.get('/', function(request, response) {
  response.json('api/issues/:project');
});

app.route('/api/issues/:project')
  .get(controller.getIssues)
  .post(controller.saveIssue)
  .put(controller.updateIssue)
  .delete(controller.deleteIssue);


var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port listener.address().port');
});
