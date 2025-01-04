const express = require('express'), 
      app = express(),
      { Kafka } = require('kafkajs'),
      bodyparser = require('body-parser'); 

app.use(bodyparser.json())
app.use(express.urlencoded({extended: true}));

const kafka = new Kafka ({
    clientId : 'big', 
    brokers: ['kafka:9092']
})

const kproducer = kafka.producer(); 

app.post('/',async function(req,res){
    console.log(req.body.message)
    incomingMessage =req.body.message;
    var humidity = incomingMessage.humidity; 
    var temperature = incomingMessage.temperature; 
    console.log('Pushing message through')

        // await kproducer.connect()
        // await kproducer.send({
        //   topic: 'test-topic',
        //   messages: [
        //     { value: 'Hello KafkaJS user!' },
        //   ],
        // })   
    res.sendStatus(200); 
})



app.listen(process.env.PORT || '8080', async function() {
    console.log("relayStation OK")
});
