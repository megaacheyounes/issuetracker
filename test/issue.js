var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var mocha = require('mocha');

var controller = require('../controller.js');
var Issue = require('../issue.js');
var server = require('../server.js');

describe('issues', () => {
  beforeEach((done) => {
    Issue.remove({}, (err) => {
      done();
    });
  });
});

describe('/GET issues', () => {
  it('get all issues', (done) => {
    chai.request(server).get('/api/issues/1').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    })
  });
});


describe('/POST issue', () => {

  it('should save the issue', (done) => {

    let postData = {
      "issue_title": "Fix error in posting data",
      "issue_text": "When we post data it has an error.",
      "created_by": "Joe",
      "assigned_to": "Joe",
      "open": true,
      "status_text": "In QA"
    };

    chai.request(server).post('/api/issues/1').send(postData).end((err, res) => {

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('_id');
      res.body.should.have.property('updated_on');
      res.body.should.have.property('created_on');

      done();
    });
  });
})


describe('/PUT issue', () => {

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

  it('should update issue', (done) => {

    let updateData = {
      "issue_title": 'new title'
    }

    new Issue(postData).save((err, issue) => {
      updateData._id = issue._id;
      chai.request(server).put('/api/issues/1').send(updateData).end((req, res) => {

        res.should.have.status(200);
        res.body.should.be.a('string').eql('successfully updated');
        done();
      });


    });
  });

  it('it should say no fields to update', (done) => {

    new Issue(postData).save((err, issue) => {

      chai.request(server).put('/api/issues/1').send({
        _id: issue._id
      }).end((req, res) => {

        res.should.have.status(200);
        res.body.should.be.a('string').eql('no updated field sent');
        done();

      });

      done();
    });
  });
});

describe('/DELETE issue', () => {

  it('should delete the issue', (done) => {

    let postData = {
      "issue_title": "Fix error in posting data",
      "issue_text": "When we post data it has an error.",
      "created_by": "Joe",
      "assigned_to": "Joe",
      "open": true,
      "status_text": "In QA"
    };

    new Issue(postData).save((err, issue) => {

      chai.request(server).delete('/api/issues/1').send({
        _id: issue._id
      }).end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.a('string').eql("deleted " + issue._id);
        done();
      });
    });

  });
});