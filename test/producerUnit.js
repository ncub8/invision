var should = require('chai').should();
var producer = require('../producer');
//var consumer = require('../consumer');
var net = require('net');

var chai = require('chai');
var should = require('chai').should();
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Producer object', function(){
    describe('composition', function(){
        it("should exist and be an object with the right functions", function() {
            producer.should.be.an('object');
            producer.should.have.all.keys('start');
        });
    });
});

describe('Producer connectivity', function(){


    describe('connection', function(){


        var mySpy = sinon.spy(producer, "start");


        it("should connect", function(){
            //create an echo server
            var fakeConsumer = net.createServer(function(s){
                s.on('data', function(data){
                    console.log(data.toString());
                    s.write(data);


                });
            }).listen(5433, '127.0.0.1');
            producer.start("one");
            mySpy.should.have.been.called;
            mySpy.should.have.been.calledWith("one");
            fakeConsumer.close();

        });

    })
})