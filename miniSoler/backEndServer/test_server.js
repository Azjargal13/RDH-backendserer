const express = require('express')
const fetch = require('node-fetch')
const fileUpload = require('express-fileupload');

//filesystem-> new addition for file management
const fs=require('fs');
const FormData = require('form-data');
const app = express()

app.use(fileUpload());

// Allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//cancel job
// app.post("/cancelJob",async function(req, res){
//     res.setHeader('Content-Type', 'application/json');
//     // var myPrinterId = req.body.printerId;
//     var printerId = req.body.printerId;
//     var devicejobId=req.body.devicejobId;
//     var myResponse;
//     var url = "http://localhost:8200/printJobMgmt/cancelJob/"+printerId+"/"+devicejobId;
//     await fetch(url, {
//       "method":"GET"
//        })
//         .then(async function (response){
//         return response.json();
//       })
//       .then(async function (data){
//         console.log(data);
//         myResponse=await data;
//     })
//     res.send(myResponse);
//   })
  

//get info of all active jobs 
app.post("/getActiveJobs",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var myPid=req.body.printerId;
  var myResponse;
  var url="http://localhost:8200/printJobMgmt/getActiveJobs/"+myPid+"?jobDetails=full";
  await fetch(url, {
    "method":"GET"
    })
    .then(async function (response){
      return await response.json();
    })
    .then(async function (data){
      console.log(data);
      myResponse = await data;
  })
  res.send(myResponse);

})

//cancel job using device job id
app.post("/cancelJob",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var myPid=req.body.printerId;
  var myDeviceJID=req.body.deviceJobId;
  var myResponse;
  var url="http://localhost:8200/printJobMgmt/cancelJob/"+myPid+"/"+myDeviceJID;
  await fetch(url, {
    "method":"GET"
    })
    .then(async function (response){
      return await response.json();
    })
    .then(async function (data){
      console.log(data);
      myResponse = await data;
  })
  res.send(myResponse);

})

//cancel job using device job id
app.post("/getConstraintTable",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var myDeviceType=req.body.deviceType;
  var myResponse;
  var url="http://localhost:8200/printJobMgmt/getConstraintTable/"+myDeviceType;
  await fetch(url, {
    "method":"GET"
    })
    .then(async function (response){
      return await response.json();
    })
    .then(async function (data){
      console.log(data);
      myResponse = await data;
  })
  res.send(myResponse);

})
//Server listening at port 3002
app.listen(3002, () => console.log('Test server listening on port 3002!'))
