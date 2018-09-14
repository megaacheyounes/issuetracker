// server.js
// where your node app starts
// init project
var express = require('express');
var app = express();
var Issue = require('./issue.js');
var mongoose = require('mongoose');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var controller = require('./controller.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//app.use(helmet.XssFilter());
app.use(express.static('public'));

controller.connect();

app.get('/', async function (req, res) {

  let postData = {
    "issue_title": "Fix error in posting data",
    "issue_text": "When we post data it has an error.",
    "created_on": "2017-01-08T06:35:14.240Z",
    "updated_on": "2017-01-08T06:35:14.240Z",
    "created_by": "Joe",
    "assigned_to": "Joe",
    "open": true,
    "status_text": "In QA"
  };

  var i = new Issue(postData);

  res.json(i);

});

app.route('/api/issues/:project')
  .get(controller.getIssues)
  .post(controller.saveIssue)
  .put(controller.updateIssue)
  .delete(controller.deleteIssue);

var port = process.env.PORT | 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});


module.exports = app;