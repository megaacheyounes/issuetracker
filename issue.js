var mongoose = require('mongoose');
var issueSchema = new mongoose.Schema({
  issue_title: {
    type: String,
    required: true
  },
  issue_text: {
    type: String,
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now()
  },
  created_by: {
    type: String,
    required: true
  },
  assigned_to: {
    type: String,
    default: ''
  },
  status_text: {
    type: String,
    default: ''
  },
  open: {
    type: Boolean,
    default: true
  },
  updated_on: {
    type: Date,
    default: Date.now()
  },
  project: String
});

issueSchema.pre('save', (next) => {
  this.updated_on = Date.now();
  if (!this.created_on)
    this.created_on = Date.now();


  next();
});

module.exports = mongoose.model('issue', issueSchema);