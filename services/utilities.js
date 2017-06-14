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
  }

};