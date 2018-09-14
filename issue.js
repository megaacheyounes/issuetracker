var mongoose  =require('mongoose'); 
var issueSchema = new mongoose.Schema({
  issue_title: {type:String ,required:true},
  issue_text: {type:String ,required:true},
  created_on:{type:Date , default:Date.now()},
  created_by: {type:String,required:true},
  assigned_to : {type:String} , 
  status_text : {type:String},
  open: {type:Boolean},
  updated_on:{type:Date},
  project:String
});

issueSchema.methods.updateDate = ()=>{
  this.update_at(Date.now());
};

module.exports = mongoose.model('issue',issueSchema);