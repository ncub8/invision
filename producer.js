var net = require('net');
var rxp = require('./randomExpression');

var host = '127.0.0.1';
var port = 5433;




module.exports = {

    start: function(name){
        var producer = new net.Socket();

        producer.connect(port, host, function(){
            //send over math expression every one second
            setInterval(function(){
                var exp = rxp.get();
                console.log("producer " + name + " sending " + exp);
                producer.write(exp);
            }, 1000);

        });

        producer.on('data', function(data){
            console.log("producer named: " + name + " received " + data);
        });

//clean up
        producer.on('close', function(){
            console.log("Producer named " + name + " connection closed.");
        });
        return producer
    }
}
//generate random math expression





