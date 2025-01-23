const express = require('express'), 
      app = express(),
      { Kafka } = require('kafkajs'),
      bodyparser = require('body-parser'); 

app.use(bodyparser.json())
app.use(express.urlencoded({extended: true}));

const kafka = new Kafka ({
    clientId : 'temperatureSensors', 
    brokers: ['localhost:9092']
})

const kproducer = kafka.producer(); 

app.post('/',async function(req,res){

    topic = req.body.sensor
    delete req.body.sensor

    const producer = kafka.producer()

    await producer.connect()

    await producer.send({
        topic: topic,
        messages: [
          { value: JSON.stringify(req.body) } // Convert the JSON object to a string
        ]
      });
    await kproducer.disconnect() 
    res.sendStatus(200); 
})



app.listen(process.env.PORT || '8080', async function() {
    console.log("relayStation OK")
});
