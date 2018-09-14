
var Issue = require('./issue.js');
var mongoose = require('mongoose');

let connect = ()=>{  mongoose.connect(process.env.DB)};

let getIssues = (req,res)=>{
  connect();
  var issue_title=req.query.issue_title;
  var issue_text=req.query.issue_text;
  var created_on=req.query.created_on;
  var updated_on=req.query.updated_on;
  var open=req.query.open;
  var created_by=req.query.created_by;
  var assigned_to=req.query.assigned_to;
  var status_text=req.query.status_text;
  var _id=req.query._id;

  Issue.find({
    _id,
    issue_title,
    issue_text,
    created_on,
    updated_on,
    open,
    created_by,
    assigned_to,
    status_text,
  }).lean().exec((err,issues)=>{
    if(err)
      return  res.status(400).json('failed to GET'); 
    res.json(issues);
  }) 
  
}

let saveIssue = (req,res)=>{
    connect();

  var issue_title=req.query.issue_title;
  var issue_text=req.query.issue_text;
  var created_by=req.query.created_by;
  var assigned_to=req.query.assigned_to;
  var status_text=req.query.status_text;
  var created_on=req.query.created_on;
  var updated_on=req.query.updated_on;
  var open=req.query.open;
  var _id=req.query._id;

  
  var postData={ 
    _id,
    issue_title,
    issue_text,
    created_by,
    assigned_to,
    status_text,
    open,
    created_on,
    updated_on
  }
 var i= new Issue(postData);
  i.save((err)=>{
   if(err )
     res.status(400).json('failed to save ')
    
  }) 
  
}


let updateIssue =async (req,res)=>{
    connect();

  var issue_title=req.query.issue_title;
  var issue_text=req.query.issue_text;
  var created_by=req.query.created_by;
  var assigned_to=req.query.assigned_to;
  var status_text=req.query.status_text;
  var created_on=req.query.created_on;
  var updated_on=req.query.updated_on;
  var open=req.query.open;
  var _id=req.query._id;
  
  var postData={ 
    _id,
    issue_title,
    issue_text,
    created_by,
    assigned_to,
    status_text,
    open,
    created_on,
    updated_on
  }
  
  if(postData==={})
    return res.status(400).json('no updated field sent');
  
  var issue=await Issue.findbyId(_id);
  
  var r=await Object.assign(issue,postData).save();
  
  if(r.err)
    return res.status(501).json('could not update'+issue._id);
  
  return res.json('updated successfully'); 
  
}

let deleteIssue = (req,res)=>{
  connect();
  
  var _id=req.query._id;
  
  if(!_id)
    return res.staus(400).json('_id error');
  
  Issue.remove({_id},(err,r)=>{
   if(err)
     return res.status(501).json('could not delete '+_id);

  return res.json('deleteed '+_id);

  });
  
  
}

module.exports = { getIssues, saveIssue , updateIssue , deleteIssue };