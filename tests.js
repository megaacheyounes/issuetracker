
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var mocha=require('mocha');
var controller = require('./controller.js');
var Issue = require('./issue.js');

describe('issues',()=>{
        beforeEach( (done)=>{
                  Issue.remove({},(err)=>{
                    done();
                  });
                  
                   });
        
        
         });
