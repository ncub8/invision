var chai = require('chai');
var should = require('chai').should();
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);



var consumer = require('../consumer');
var net = require('net');

describe('Consumer object', function(){
    describe('composition', function(){
        it("should exist and be an object with the right functions", function() {
            consumer.should.be.an('object');
            consumer.should.have.all.keys('server','start','stop');
        });
    });
});

describe('Consumer connectivity', function(){
    var fakeProducer;
    beforeEach(function(){
        fakeProducer = new net.Socket();
    });


    describe("connection", function(){
        it("should connect and send the right value", function(){
            consumer.start();
            var value;
            fakeProducer.connect(5433, '127.0.0.1', function(){
                fakeProducer.write("2+3=")
            });
            fakeProducer.on("data", function(data){
                data.toString().should.equal("5");
                fakeProducer.disconnect();
                consumer.stop();
            });
        });

    });
    describe("communication", function(){

        it("should respond with and log the appropriate values", function(){
            consumer.start();
            var mySpy = sinon.spy(console, "log");

            fakeProducer.connect(5433, '127.0.0.1', function(){
                fakeProducer.write("2+3=");
                mySpy.should.have.been.called;
                mySpy.should.have.been.calledWith("producer sent: 2+3= I calculated: 5");
            });
            fakeProducer.on("data", function(data){
                fakeProducer.disconnect();
                consumer.stop();
            });
            console.log.restore();
        });
    });


});


