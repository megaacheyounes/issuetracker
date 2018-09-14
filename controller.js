var Issue = require('./issue.js');
var mongoose = require('mongoose');
var _ = require('lodash');

let connect = () => {
mongoose.connect(process.env.DB);  

  console.log('conecting...');

}

let getIssues = (req, res) => {

  var issue_title = req.query.issue_title;
  var issue_text = req.query.issue_text;
  var created_on = req.query.created_on;
  var updated_on = req.query.updated_on;
  var open = req.query.open;
  var created_by = req.query.created_by;
  var assigned_to = req.query.assigned_to;
  var status_text = req.query.status_text;
  var _id = req.query._id;

  var project = req.params.project;
  let filter = _.pickBy({
    _id,
    issue_title,
    issue_text,
    created_on,
    updated_on,
    open,
    created_by,
    assigned_to,
    status_text,
    project
  }, _.identity);
  console.log('filter', filter);

  Issue.find().lean().exec((err, issues) => {
    if (err)
      return res.status(400).json('failed to GET');
    res.json(issues);
  })

}

let saveIssue = (req, res) => {

  var project = req.params.project;
  var issue_title = req.body.issue_title;
  var issue_text = req.body.issue_text;
  var created_by = req.body.created_by;
  var assigned_to = req.body.assigned_to;
  var status_text = req.body.status_text;
  var open = req.body.open;

  var postData = _.pickBy({
    issue_title,
    issue_text,
    created_by,
    assigned_to,
    status_text,
    open,
    project
  }, _.identity);
  console.log('postData', postData);
  var i = new Issue(postData);
  i.save((err) => {
    if (err)
      return res.status(400).json({
        msg: 'failed to save',
        err: err
      });
    return res.json(i);
  });

}


let updateIssue = async (req, res) => {

  var issue_title = req.body.issue_title;
  var issue_text = req.body.issue_text;
  var created_by = req.body.created_by;
  var assigned_to = req.body.assigned_to;
  var status_text = req.body.status_text;
  var open = req.body.open;

  var created_on = req.body.created_on;
  var updated_on = req.body.updated_on;
  var _id = req.body._id;

  var postData = _.pickBy({
    _id,
    issue_title,
    issue_text,
    created_by,
    assigned_to,
    status_text,
    open,
    created_on,
    updated_on
  }, _.identity);

  if (_.omit(postData, ['_id']) === {})
    return res.status(400).json('no updated field sent');

  var issue = await Issue.findById(_id);

  var r = await Object.assign(issue, postData).save();

  if (r.err)
    return res.status(400).json('could not update' + issue._id);

  return res.json('successfully updated');

}

let deleteIssue = (req, res) => {

  var _id = req.body._id;

  if (!_id)
    return res.status(400).json('_id error');

  Issue.remove({
    _id
  }, (err, r) => {
    if (err)
      return res.status(501).json('could not delete ' + _id);

    return res.json('deleted ' + _id);

  });


}

module.exports = {
  getIssues,
  saveIssue,
  updateIssue,
  deleteIssue,
  connect
};