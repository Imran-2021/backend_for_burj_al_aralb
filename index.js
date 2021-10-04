const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
app.use(cors())

const uri = "mongodb+srv://dbuser:imran12345@cluster0.s3qss.mongodb.net/burjdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

client.connect(err => {
  const collection = client.db("burjdb").collection("burjbdc");

  //get data -
  app.get('/user', (req, res)=>{
    console.log(req.headers.authorization);
    collection.find({email:req.query.email})
    .toArray((err, result)=>{
      res.send(result);
    })
  })

  //post data - 
  app.post("/allInfo",(req,res)=>{
    const product = req.body;
    // console.log(product);
    collection.insertOne(product)
    .then(data=>{
      res.send(data.insertedCount>0);
    //   res.redirect('/')
    //   console.log(data);
    })
  })

  //update data - 

  //delete data - 

  console.log("database Connected");
});

app.get("/",(req,res)=>{
    res.send("wait and see brother ... !!! ")
})

app.listen(3002,()=>{
    console.log("done !!");
})
