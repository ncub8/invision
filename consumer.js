var net = require('net');
var port = 5433;
var host = '127.0.0.1';
var pattern = /^\d\+\d=$/;


var calculate = function(data){

    //grab the digits and add them
    var vals = data.match(/\d/g);
    return(parseInt(vals[0]) + parseInt(vals[1]));
}

module.exports = {

    start: function(){
        net.createServer(function(s){

            //receive data from producer
            s.on('data', function(data){
                //check data integrity, if data is what we expect, calculate, log, and send
                var val = data.toString();
                console.log("received: " + val);

                if(pattern.test(val)){
                    var calculated = calculate(val);
                    console.log("producer sent: " + val + " I calculated: " + calculated);
                    s.write(calculated.toString());

                }else{
                    console.log("producer sent something I didn't understand: " + val);
                }


            });

            //clean up closed connection
            s.on('close', function(data){
                console.log("Connection closed: " + s.remoteAddress + " " + s.remotePort);
            })

        }).listen(port, host);

        console.log("producer listening on " + host + ":" + port);
    }
}


