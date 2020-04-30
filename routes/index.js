var express = require('express');
let json = require("./data");
const Agent = require('../model/Agent');
const Policycarrier = require('../model/Policycarrier');
const Policycategory = require('../model/Policycategory');
const Users = require('../model/User1');
const UsersAccount = require('../model/UsersAccount');
const Policyinfo = require('../model/Policyinfo');
// console.log(json)
// const fs = require('fs')
let jsonData = {}
var router = express.Router();
// fs.readFile('./routes/data.json', 'utf-8', (err, data) => {
//   if (err) throw err
  
//   jsonData = JSON.parse(data)
// })
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/save_all_agent', function(req, res, next) {
  let agentData = json.map(val => ({agent: val.agent}));
  console.log(agentData)
  Agent.collection.insertMany(agentData, function (err, docs) {
    if (err){ 
        return res.send(err);
    } else {
      res.send("Multiple documents inserted to Collection");
    }
  })
});
router.get('/save_all_useracc', function(req, res, next) {
  let agentData = json.map(val => ({account_name: val.account_name}));
  UsersAccount.collection.insert(agentData, function (err, docs) {
    if (err){ 
        return res.send(err);
    } else {
      res.send(docs);
    }
  })
});
router.get('/save_all_users', function(req, res, next) {
  let agentData = json.map(val => ({firstname: val.firstname, dob: val.dob, phone: val.phone, state: val.state,zip:val.zip,email:val.email,gender:val.gender, userType:val.userType}));
  console.log(agentData)
  Users.collection.insert(agentData, function (err, docs) {
    if (err){ 
        return res.send(err);
    } else {
      res.send(docs);
    }
  })
});
router.get('/save_all_policy_category', function(req, res, next) {
  let agentData = json.map(val => ({category_name: val.category_name}));
  console.log(agentData)
  Policycategory.collection.insert(agentData, function (err, docs) {
    if (err){ 
        return res.send(err);
    } else {
      res.send(docs);
    }
  })
});
router.get('/save_all_policy_carrier', function(req, res, next) {
  let agentData = json.map(val => ({company_name: val.company_name}));
  console.log(agentData)
  Policycarrier.collection.insert(agentData, function (err, docs) {
    if (err){ 
        return res.send(err);
    } else {
      res.send(docs);
    }
  })
});
router.get('/get_all_policy_carrier', function(req, res, next) {
  let agentData = json.map(val => ({company_name: val.company_name}));
  console.log(agentData)
  Policycarrier.find({}, function (err, docs) {
    if (err){ 
        return res.send(err);
    } else {
      res.send(docs);
    }
  })
});





router.get('/get_all_agent', function(req, res, next) {
  Agent.find({}, function (err, docs) {
    if (err){ 
        return res.send(err);
    } else {
      res.send(docs);
    }
  })
});


router.get('/save_all_policy_info', function(req, res, next) {
  let agentData = json.map(val => ({user1: val.email, company_id: val.company_name ,policy_number: val.policy_number, policy_start_date:val.policy_start_date, policy_end_date: val.policy_end_date,category_name: val.category_name}));
  console.log(agentData)
  let emails = agentData.map(val => val.user1);
  let comapanys = agentData.map(val => val.company_id);
  Users.find({email: {$in: emails}}, function (err, docs) {
    if (err){ 
        return res.send(err);
    } else {
      Policycarrier.find({company_name: {$in: comapanys}}, function (err, policy) {
        if (err){ 
            return res.send(err);
        } else {
          let policyinfo = agentData.map(val => {
            return {
              ...val,
              user1: docs.find(pol => pol.email === val.user1)._id,
              company_id: policy.find(pol => pol.company_name === val.company_id)._id,
            }
          })
          Policyinfo.collection.insert(policyinfo, function (err, info) {
            if (err){ 
                return res.send(err);
            } else {
              res.send(info);
            }
          })
        }
      })
    }
  })
});

router.get('/policy/:username', function(req, res, next) {
  console.log(req.params.username)
  console.log('hi');
  Policyinfo.collection.aggregate([
    {
        $lookup: {
            from: "user1",
            localField: "user1",
            foreignField: "_id",
            as: "userInfoData"
       
    }
  },
  { $match: { 'userInfoData.firstname': req.params.username } }
  
  ]).toArray(function (err, res1) {

    if (err)

        throw err;

    console.log(JSON.stringify(res1));
    res.send(res1);
  

});

});

router.get('/aggregatedPolicy', function(req, res, next) {
  console.log('hi');
  Policyinfo.collection.aggregate([
    {
        $lookup: {
            from: "user1",
            localField: "user1",
            foreignField: "_id",
            as: "userInfoData"
       
    }
  },
  { $group : { _id: "$user1", policy: { $push: "$policy_number" } } }
  
  
  ]).toArray(function (err, res1) {

    if (err)

        throw err;

    console.log(JSON.stringify(res1));
    res.send(res1);
  

});

});


module.exports = router;
