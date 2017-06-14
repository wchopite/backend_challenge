/**
 * [utilities description]
 */

var moment = require('moment');

module.exports = {

  /**
   * Return a Berlin Clock date Representation
   * @param  {[type]}   date        [description]
   * @param  {Function} cb          [description]
   * @return {[type]}               [description]
   */
  getBerlinClockRep: function(date, cb){
    
    var hour = moment(date).hour();
    var min = moment(date).minute();
    var sec = moment(date).second();

    var response = {
      "sec": null,
      "five_hour": null,
      "one_hour": null,
      "five_min": null,
      "one_min": null
    };

    // seconds 
    response.sec = ( (sec%2) === 0) ? 1:0;

    // hours
    response.five_hour = 300*Math.trunc(hour/5);
    response.one_hour = (hour*60) - response.five_hour;
    
    // minutes
    response.five_min = 5*Math.trunc(min/5);
    response.one_min = min - response.five_min;

    cb(null, response);
  },

  /**
   * Return a stream png from Berlin Clock Format
   * @param  {[type]}   date        [description]
   * @param  {Function} cb          [description]
   * @return {[type]}               [description]
   */
  getStream: function(berlinClockJson, cb) {
    
    // Colors for berlinClock representation
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

    // seconds
    ctx.fillStyle = (berlinClockJson.sec == 1) ? COLOR.red: COLOR.yellow;
    ctx.fillRect( ( (c_width/2)- (r_width/2) ) , margin, r_width, r_height);

    // five_hours
    var fh_number_rec_to_fill = berlinClockJson.five_hour/300;

    for(var i=0; i<4; i++) {
      
      ctx.fillStyle = ( ((i+1) <= fh_number_rec_to_fill) && fh_number_rec_to_fill != 0 ) ? COLOR.red: COLOR.grey;
      ctx.fillRect( ( (c_width/4) - (margin*4) ) + (r_width*i) + (margin*i), 70, r_width, r_height);
    }

    // one_hour
    var oh_number_rec_to_fill = berlinClockJson.one_hour/60;

    for(var i=0; i<4; i++) {
      
      ctx.fillStyle = ( ((i+1) <= oh_number_rec_to_fill) && oh_number_rec_to_fill != 0 ) ? 'red': 'grey';
      ctx.fillRect( ( (c_width/4) - (margin*4) ) + (r_width*i) + (margin*i), 130, r_width, r_height);
    }

    // five_minute
    var fm_number_rec_to_fill = berlinClockJson.five_min/5;    

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
    var om_number_rec_to_fill = berlinClockJson.one_min;

    for(var i=0; i<4; i++) {
      
      ctx.fillStyle = ( ((i+1) <= om_number_rec_to_fill) && om_number_rec_to_fill != 0 ) ? COLOR.yellow: COLOR.grey;
      ctx.fillRect( ( (c_width/4) - (margin*4) ) + (r_width*i) + (margin*i), 230, r_width, r_height);
    }

    var stream = canvas.createPNGStream();    
    cb(null,stream);
  }
};