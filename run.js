var consumer = require('./consumer');
var producer = require('./producer');
//var producer2 = require('./producer');

consumer.start();
producer.start("one");
producer.start("two");
