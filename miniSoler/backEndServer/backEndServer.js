const express = require('express')
const fetch = require('node-fetch')
const fileUpload = require('express-fileupload');

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

app.get("/", function (req, res) {
    // res.setHeader('Content-Type', 'application/json');
	// res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //
  //   var responseJSON = {
  //       message: "Received empty request from Client. Connect FrontEnd, BackEnd and Printing Services.",
  //   };

    res.send("Hello World");
})

app.post("/register", function (req, res) {
  res.setHeader('Content-Type', 'application/json');
	// res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var dataJson = {
      "name1":req.body.name1,
      "name2":req.body.name2,
      "message":"Welcome! " + req.body.name1
    }
    // var register = req.body.name1 + " " + req.body.name2 ;
    res.send(dataJson);
})

app.post("/valuesToSend", async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
	// res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "X-Requested-With");

  var dataJson = {
    "firstName":req.body.firstName,
    "lastName":req.body.lastName,
    "homeTown":req.body.homeTown,
    "state":req.body.state
  }

  await fetch("http://10.20.164.155:3000/testData", {
    "method":"POST",
    "headers":{
      "Content-type":"application/json"
    },
    "body":JSON.stringify(dataJson)

  })
    .then(function (response){
      return response.json();
    })
    .then(function (data){
      console.log(data);
      res.send(data);
  })
})




// app.get("/getData", function (req, res) {
//   res.setHeader('Content-Type', 'application/json');
// 	// res.header("Access-Control-Allow-Origin", "*");
//   //   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     // var dataJson = {
//     //   "name1":req.body.name1,
//     //   "name2":req.body.name2
//     // }
//     var myData;
//     fetch("http://10.20.164.155:3000/testServer")
//     .then(function (response)){
//       return response.json();
//     }
//     .then(function(data)){
//       myData=data.message;
//     }
//     // var register = req.body.name1 + " " + req.body.name2 ;
//     res.send(mydata);
// })

//
// app.post("/welcome", function (req, res) {
//   res.setHeader('Content-Type', 'application/json');
// 	// res.header("Access-Control-Allow-Origin", "*");
//   //   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     var dataJson = {
//       "name1":req.body.name1,
//       "name2":req.body.name2
//     }
//     var register = "Welcome dear "+  ;
//     res.send(dataJson);
// })


//Server listening at port 3000
app.listen(3001, () => console.log('Hello World! Example app listening on port 3001!'))
