var express = require('express');
var router = express.Router();
const Posts = require('./../model/Posts');

/* GET Posts listing. */
router.get('/', function(req, res, next) {
  res.send('Posts Route');
});
router.post('/post', function(req, res, next){

  console.log(req.body);

  const newPost = new Posts({
    message : req.body.message,
     date : req.body.date,
     time : req.body.time
     
  });
  console.log(newPost);


  res.send(newPost);
 
});

module.exports = router;
