var express = require('express');
var router = express.Router();

// Utilities service
var utilities = require("../services/utilities.js");

var moment = require('moment');

/*------------------------
  Return the current time
  Custom Json for
  Berlin Clock format
 ------------------------*/
router.get('/', function(req, res, next) {  

  utilities.getBerlinClockRep(moment(),function(err, resp){

    if(err) res.status(500).end();
    else res.json(resp);
  });
});

/*---------------------------------
  Receive a ISO 8601 date and
  return a custom json for
  that date in Berlin Clock format
 ---------------------------------*/
router.post('/', function(req, res, next) {

  if(!req.body.date) {

    res.status(400);
    res.json("Debe indicar la fecha que desea convertir");
  }
  else {
    
    utilities.getBerlinClockRep(req.body.date,function(err, resp){

      if(err) res.status(500).end();
      else res.json(resp);
    });
  }
});

/*-----------------------------------
  Graphical representation for current 
  time in Berlink Clock format
 -----------------------------------*/
router.get('/graph', function(req,res, next){ 

  utilities.getBerlinClockRep(req.body.date,function(err, berlinClock){

    if(err) res.status(500).end();
    else {

      utilities.getStream(berlinClock, function(err,stream){

        if(err) res.status(500).end();
        else {
          
          res.type("png");
          stream.pipe(res);
        }
      });      
    }
  });  
});

/*-----------------------------------
  Graphical representation for a given
  date in Berlink Clock format
 -----------------------------------*/
router.post('/graph', function(req, res, next) {

  if(!req.body.date) {

    res.status(400);
    res.json("Debe indicar la fecha que desea convertir");
  }
  else {

    utilities.getBerlinClockRep(req.body.date,function(err, berlinClock){

      if(err) res.status(500).end();
      else {

        utilities.getStream(berlinClock, function(err,stream){

          if(err) res.status(500).end();
          else {
            
            res.type("png");
            stream.pipe(res);
          }
        });      
      }
    });
  }
});

module.exports = router;