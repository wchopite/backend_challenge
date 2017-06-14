var express = require('express');
var router = express.Router();

// Utilities service
var utilities = require("../services/utilities.js");

var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {  

  utilities.getBerlinClockRep(moment(),function(err, resp){

    res.json(resp);
  });
});

router.post('/', function(req, res, next) {

  utilities.getBerlinClockRep(req.body.date,function(err, resp){

    res.json(resp);
  });
});

router.get('/graph', function(req,res, next){

  utilities.getBerlinClockRep(req.body.date,function(err, resp){

    var COLOR = {
      "red": "#FF0000",
      "yellow": "#FFFF00",
      "grey": "#6E6E6E",
    };

    var c_width = 300,
        c_height = 300,
        r_width = 50,
        r_height = 50,
        margin = 10;    

    var Canvas = require('canvas')
      , Image = Canvas.Image
      , canvas = new Canvas(c_width, c_height)
      , ctx = canvas.getContext('2d');

    ctx.lineWidth = 3;
    ctx.strokeStyle="#000";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    // seconds
    ctx.fillStyle = (resp.sec == 1) ? COLOR.red: COLOR.yellow;
    ctx.fillRect( ( (c_width/2)- (r_width/2) ) , margin, r_width, r_height);

    // five_hours
    var fh_number_rec_to_fill = resp.five_hour/300;

    for(var i=0; i<4; i++) {
      
      ctx.fillStyle = ( ((i+1) <= fh_number_rec_to_fill) && fh_number_rec_to_fill != 0 ) ? COLOR.red: COLOR.grey;
      ctx.fillRect( ( (c_width/4) - (margin*4) ) + (r_width*i) + (margin*i), 70, r_width, r_height);
    }

    // one_hour
    var oh_number_rec_to_fill = resp.one_hour/60;

    for(var i=0; i<4; i++) {
      
      ctx.fillStyle = ( ((i+1) <= oh_number_rec_to_fill) && oh_number_rec_to_fill != 0 ) ? 'red': 'grey';
      ctx.fillRect( ( (c_width/4) - (margin*4) ) + (r_width*i) + (margin*i), 130, r_width, r_height);
    }

    // five_minute
    var fm_number_rec_to_fill = resp.five_min/5;    

    for(var i=0; i<11; i++) {
      
      if( ((i+1) <= fm_number_rec_to_fill) && fm_number_rec_to_fill != 0 ) {

        if( (i+1) == 3 || (i+1) == 6 || (i+1) == 9)
          ctx.fillStyle = COLOR.red;
        else
          ctx.fillStyle = COLOR.yellow;
      }
      else {

        ctx.fillStyle = COLOR.grey;
      }
      
      ctx.fillRect( ( (c_width/11) - (margin*(11/6)) ) + ( (r_width/2)*i) + ((margin/10)*i), 190, r_width/2, r_height/2);
    }

    // one_min
    var om_number_rec_to_fill = resp.one_min;

    for(var i=0; i<4; i++) {
      
      ctx.fillStyle = ( ((i+1) <= om_number_rec_to_fill) && om_number_rec_to_fill != 0 ) ? COLOR.yellow: COLOR.grey;
      ctx.fillRect( ( (c_width/4) - (margin*4) ) + (r_width*i) + (margin*i), 230, r_width, r_height);
    }

    var stream = canvas.createPNGStream();
    res.type("png");
    stream.pipe(res);    
  });
});

module.exports = router;
