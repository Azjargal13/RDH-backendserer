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

//my get request on root
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

//register my name
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

//send info to this route
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
  //fetch data, can be post or get method to this link
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

// Get info of registered printers
app.get("/getRegisteredPrinter",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var myResponse;

  await fetch("http://localhost:8200/deviceMgmt/getRegisteredPrinters", {
    "method":"GET"
    })
    .then(async function (response){
      return await response.json();
    })
    .then(async function (data){
      console.log(data);
      // console.log(data.status.statusCode);
      // console.log(data.data.devices.deviceModel);
      // console.log(data.data.devices.deviceType);
      // console.log(data.data.devices.ipAddress);
      myResponse = await data;
  })
  res.send(myResponse);

})
//get printer plugins
app.get("/getPlugin",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var myResponse;

  await fetch("http://localhost:8200/deviceMgmt/getInstalledPlugins", {
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
//get Printer detailed info
app.post("/getPrinterDetails",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var myPrinterId = req.body.printerId;
  var myResponse;
  var url = "http://localhost:8200/deviceMgmt/getPrinterDetails/"+myPrinterId;
  await fetch(url, {
    "method":"GET"
  })
    .then(async function (response){
      return response.json();
    })
    .then(async function (data){
      console.log(data);
      myResponse=await data;
  })
  res.send(myResponse);
})

//Delete printer from printer list
app.post("/deletePrinter",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var myPrinterId = req.body.printerId;
  var myResponse;
  var url = "http://localhost:8200/deviceMgmt/deletePrinter/"+myPrinterId;
  await fetch(url, {
    "method":"DELETE"
  })
    .then(async function (response){
      return response.json();
    })
    .then(async function (data){
      console.log(data);
      myResponse=await data;
  })
  res.send(myResponse);
})

// Register printer
app.post("/registerPrinter",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  // var myPrinterId = req.body.printerId;
  var ip = req.body.ipAddress;
  var dType=req.body.deviceType;
  var myResponse;
  var url = "http://localhost:8200/deviceMgmt/registerPrinter";
  await fetch(url, {
    "method":"POST",
    "headers":{
      "Content-type":"application/json"
    },
    "body":JSON.stringify({
      "ipAddress":ip,
      "deviceType":dType
      })
    })
      .then(async function (response){
      return response.json();
    })
    .then(async function (data){
      console.log(data);
      myResponse=await data;
  })
  res.send(myResponse);
})

//update prnter info, PUT method
app.post("/updatePrinter",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  // var myPrinterId = req.body.printerId;
  var uname = req.body.userName;
  var pwd=req.body.password;
  var pid = req.body.printerId;
  var myResponse;
  var url = "http://localhost:8200/deviceMgmt/updatePrinter/"+pid;
  await fetch(url, {
    "method":"PUT",
    "headers":{
      "Content-type":"application/json"
    },
    "body":JSON.stringify({
      "userName":uname,
      "password":pwd
      })
    })
      .then(async function (response){
      return response.json();
    })
    .then(async function (data){
      console.log(data);
      myResponse=await data;
  })
  res.send(myResponse);
})

//managing file API handlers
//this is only test
// app.post("/saveFile",async function(req, res){
//   res.setHeader('Content-Type', 'application/json');
//   // var myPrinterId = req.body.printerId;
//   var myFile = req.files.file;
//   await myFile.mv("./savedFile/"+myFile.name);
//   res.send({
//   "message":"Test"});
// })

app.post("/sendMyFile",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  // var myPrinterId = req.body.printerId;
  var myFile = await req.files.file;
  var jid = await req.body.jobId;
  await myFile.mv("newfiles/"+ myFile.name);

  //routerFormData for adding a files
  var routerFormData= new FormData();
  await routerFormData.append("file",fs.createReadStream("newfiles/"+ myFile.name));
  
  var url = "http://localhost:8200/printJobMgmt/uploadPrintDocument/"+jid;
  await fetch(url, {
    "method":"POST",
    "body":routerFormData
    })
    .then(async (response) => {
      return response.json();
    })

    .then(async (data)=>{
      res.send(data);
    })
})
// Print Job 

var printJsonData =
 {
  "printJobSettings": {
    "jobSettings": {
      "jobName": "Job1",
      "inputSource": "AccurioProConductor",
      "jobType": "Print",
      "colorIntent": "COLOR",
      "highChromaSetting": false,
      "docName": "8.5x11_P5.pdf",
      "bannerPage": false,
      "jobID": "0000z",
      "descriptionComments": "Printing Test"
    },
    "basicJobSettings": {
      "copies": 1,
      "collateSetting": true,
      "offsetSetting": false,
      "offsetOutputCopiesSetting": false,
      "offsetOutputPagesSetting": false,
      "offsetOutputCopies": 1,
      "offsetOutputPages": 1,
      "outputMethod": "Print",
      "storeInBoxFilename": "",
      "storeInBoxNumber": 1,
      "layoutSettings": {
        "twoInOneSetting": false,
        "impositionMarginSetting": false,
        "twoINONEType": "2In1",
        "printType": "One-Sided",
        "leftRight": 0,
        "upDown": 0
      }
    },
    "frontCoverSheetSettings": {
      "coverSheetSetting": false,
      "paperSource": "Tray1",
      "paperSize": "Noset",
      "paperType": "Noset",
      "paperColor": "Noset",
      "paperProfileName": "Noset",
      "paperWeight": "0",
      "coverSheetType": "Blank",
      "glossySetting": false,
      "continousSheetNumber": 1,
      "paperProfileId": "-1"
    },
    "backCoverSheetSettings": {
      "coverSheetSetting": false,
      "paperSource": "Tray1",
      "paperSize": "Noset",
      "paperType": "Noset",
      "paperColor": "Noset",
      "paperProfileName": "Noset",
      "paperWeight": "0",
      "coverSheetType": "Blank",
      "glossySetting": false,
      "continousSheetNumber": 1,
      "paperProfileId": "-1"
    },
    "frontCoverSheetPISettings": {
      "numberOfSheets": 1,
      "pITray": "PI-Tray1",
      "pICover": false
    },
    "backCoverSheetPISettings": {
      "numberOfSheets": 1,
      "pITray": "PI-Tray1",
      "pICover": false
    },
    "finishingSettings": {
      "bindingPosition": "Auto",
      "stapleSetting": false,
      "staplePosition": "OFF",
      "punchSetting": false,
      "punchPosition": "2",
      "foldSetting": false,
      "foldingType": "OFF",
      "saddleStitchSetting": false,
      "saddleStitch": "OFF",
      "spineCornerSetting": false,
      "spineCornerForming": "OFF",
      "trimSetting": false
    },
    "creaseSettings": {
      "creaseSetting": false,
      "crease": "Multifold",
      "perfectBindCreasePosition": "OFF",
      "creaseLines": 1,
      "creaseLinePositions": [
        7.112,
        8.128,
        9.144,
        10.16
      ]
    },
    "slitSettings": {
      "slitSetting": false,
      "slitSettingMode": "1",
      "topSlitPosition": 8,
      "bottomSlitPosition": 8,
      "bodySlitPosition": 0,
      "perfectBindingSlit": false
    },
    "mediaSettings": {
      "paperSource": "Auto",
      "paperSize": "Noset",
      "paperWidth": 90.8,
      "paperHeight": 132.7,
      "paperColor": "Noset",
      "paperProfileName": "Noset",
      "paperType": "Noset",
      "paperWeight": "0",
      "isPerforatedPaper": false,
      "paperFeedDirection": "Auto",
      "paperProfileId": "-1"
    },
    "interSheetSettings": {
      "chapterSetting": false,
      "chaperPages": 1,
      "perPageSetting": false,
      "sheetInsertionSetting": [
        {
          "printType": "SameasBody",
          "numberOfSheets": 1,
          "bindPosition": "Auto",
          "finishingStapling": "CONT",
          "paperSource": "SameasBody",
          "paperType": "Noset",
          "paperweight": 0,
          "paperColor": "Noset",
          "isPerforatedPaper": true,
          "tabType": "None",
          "holePunchPerPageSetting": "SameAsBody",
          "doubleSided": false,
          "staple": "SameasBody",
          "paperProfileName": "Noset",
          "pageNumbers": 1,
          "glossyMode": "Off",
          "paperProfileId": "-1"
        }
      ]
    },
    "perfectBindSettings": {
      "perfectBindSetting": false,
      "perfectBindCoverPrintMode": "Blank",
      "coverDuplexSetting": false,
      "coverPaperWeight": "Noset",
      "coverTray": "Tray1",
      "coverWidth": 215.9,
      "coverLength": 279,
      "backCoverSpineWidth": 9.9
    },
    "ringBindingSettings": {
      "ringBindingSetting": false,
      "frontCoverPrintSide": "Noset",
      "backCoverPrintSide": "Noset"
    },
    "padPrintSettings": {
      "padPrintSetting": false,
      "offsetPads": false,
      "addPadBackCover": false,
      "jobCopiesPerPad": 1,
      "backCoverPaperSource": "Tray1"
    },
    "outputSettings": {
      "outputOrder": "FaceDown1N",
      "outputTray": "Auto",
      "pilePermission": false,
      "externalFinisher": false,
      "divideOutput": false,
      "pagePerSection": 1
    },
    "imageQualitySettings": {
      "printOptions": "BW",
      "resolution": "1200",
      "tonerSaveSetting": false,
      "tonerSave": "OFF",
      "printDensity": "Level6",
      "smoothingSetting": false,
      "smoothing": "OFF",
      "emphasisMode": false,
      "imageQuality": "OFF",
      "glossySettings": false,
      "deviceToneCurveSetting": false,
      "screeningSettings": {
        "screenMode": "Noset",
        "fixedScreenType": "Engine",
        "controllerScreenMode": "Text",
        "engineScreenImage": "Dot1",
        "engineScreenTextGraphics": "Dot1",
        "cieColorSetting": false,
        "customScreeningSettings": {
          "screenAngleCyan": "15",
          "screenFrequencyCyan": "120",
          "screenDotShapeCyan": "Round",
          "screenAngleMagenta": "75",
          "screenFrequencyMagenta": "120",
          "screenDotShapeMagenta": "Round",
          "screenAngleYellow": "0",
          "screenFrequencyYellow": "120",
          "screenDotShapeYellow": "Round",
          "screenAngleBlack": "45",
          "screenFrequencyBlack": "120",
          "screenDotShapeBlack": "Round"
        }
      },
      "imageShiftSettings": {
        "imageShiftSetting": "OFF",
        "imageshiftmode": "Controller",
        "frontLeftRightShift": 0,
        "frontUpDownShift": 0,
        "backLeftRightShift": 0,
        "backUpDownShift": 0
      },
      "outliningSettings": {
        "fineLinePrecision": "OFF",
        "applyPrecisionTo": "Text",
        "textOutlining": false,
        "emphasisMode": false,
        "automaticTrapping": false,
        "preventBlur": false
      },
      "qualityOptimization": {
        "autoImageAdjustment": "Off",
        "colorPatchPosition": 0,
        "colorValidation": false
      },
      "colorMode": {
        "cyanMapSetting": false,
        "cyanMapValue": "0",
        "yellowMapSetting": false,
        "yellowMapValue": "0",
        "magentaMapSetting": false,
        "magentaMapValue": "0",
        "blackMapSetting": false,
        "blackMapValue": "0",
        "separationOutput": false
      },
      "colorManagement": {
        "colorManagementSetting": false,
        "colorConfiguration": "Noset",
        "printerProfile": {
          "printerProfileType": "Noset",
          "paperTypeLink": false
        },
        "otherSettings": {
          "toneCurveImage": "Noset",
          "toneCurveTextGraphics": "Noset",
          "greyCompensation": "OFF",
          "greyReplacementCMYK": "OFF",
          "spotColor": false,
          "compositeOverprint": "OFF",
          "useCMYKProfile": false,
          "pdfOuputintent": false,
          "alternateColorTable": "Noset"
        },
        "cmykConversion": {
          "cmykConversionType": "OFF",
          "cmykDeviceLinkImage": "Noset",
          "cmykDeviceLinkText": "Noset",
          "cmykDeviceLinkGraphics": "Noset",
          "cmykTargetProfile": "Noset",
          "cmykPaperSimulation": false
        }
      }
    },
    "ekcSettings": {
      "eKCPasswordSetting": false,
      "departmentKey": "OFF",
      "departmentName": ""
    },
    "customerInformation": {
      "companyName": "abc",
      "firstName": "abc",
      "lastName": "qwe",
      "address1": "sdb6",
      "address2": "3rd floor",
      "city": "chennai",
      "state": "tamilnadu",
      "postalCode": "265348",
      "country": "india",
      "phone": "123456789",
      "fax": "5246",
      "emailAddress": "123@hcl.com"
    },
    "jobInfoPrintingSettings": {
      "jobInfoPrinting": false,
      "infoPrintingPosition": "Left",
      "numberOfLines": 3,
      "fontSize": 7,
      "backgroundTransparency": false,
      "enableDateTime": false,
      "enableJobName": false,
      "enableUserName": false,
      "enablePrinterName": false,
      "enableROMVersion": false,
      "enableCalibrationTime": false,
      "enableRGBColorConversion": false,
      "enableCMYKColorConversion": false,
      "enableToneCurveName": false,
      "enableBlackHandling": false,
      "enableCompositeOverPrint": false,
      "enableSpotColor": false,
      "enableAlternateTable": false,
      "enableScreeningScreening": false,
      "enableDocumentID": false,
      "jobInfoComments": ""
    }
  },
  "metadataInfo": {
    "totalNumberOfPages": 10,
    "orientation": "Portrait",
    "paperSize": "No value set",
    "customPaperSize": "Noset",
    "specialPagesList": [
      {
        "pageNumber": "1",
        "pageOrientation": "Portrait",
        "pageSize": "A4",
        "customPageSize": "Noset"
      },
      {
        "pageNumber": "2",
        "pageOrientation": "Landscape",
        "pageSize": "A4",
        "customPageSize": "Noset"
      }
    ]
  }
};

app.post("/printJob",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  // var myPrinterId = req.body.printerId;
  printJsonData.printJobSettings.jobSettings.jobName = req.body.jobName;
  printJsonData.printJobSettings.jobSettings.docName = req.body.docName;
  printJsonData.printJobSettings.jobSettings.jobID = req.body.jobID;
  
  var url = "http://localhost:8200/printJobMgmt/printJob/1?checkConstraints=true&bypassOptionalConstraints=true";
  await fetch(url, {
    "method":"POST",
    "headers":{
      "Content-Type":"application/json"
    },
    "body":JSON.stringify(printJsonData)
    })
    .then(async (response) => {
      return response.json();
    })

    .then(async (data)=>{
      res.send(data);
    })
})


app.post("/quickPrint",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  // var myPrinterId = req.body.printerId;
  // printJsonData.printJobSettings.jobSettings.jobName = req.body.jobName;
  // printJsonData.printJobSettings.jobSettings.docName = req.body.docName;
  // printJsonData.printJobSettings.jobSettings.jobID = req.body.jobID;
  // res.setHeader('Content-Type', 'application/json');
  // var myPrinterId = req.body.printerId;
  var myFile = await req.files.file;
  var jid = await req.body.jobId;
  await myFile.mv("../savedFile/"+ myFile.name);
  var myData="";
  // console.log(myFile.name);
  // console.log(jid);
  //routerFormData for adding a files
  var routerFormData= new FormData();
  await routerFormData.append("file",fs.createReadStream("../savedFile/"+ myFile.name));

  var url = "http://localhost:8200/printJobMgmt/uploadPrintDocument/"+jid;
  await fetch(url, {
    "method":"POST",
    "body":routerFormData
    })
    .then(async (response) => {
      return response.json();
    })

    .then(async (data)=>{
      myData=data;
      // res.send(data);
    })
    
    if (myData.status.statusCode == 200)
    {
          printJsonData.printJobSettings.jobSettings.jobName = myFile.name;
          printJsonData.printJobSettings.jobSettings.docName = myFile.name;
          printJsonData.printJobSettings.jobSettings.jobID = "undefined";
          
          var url1 = "http://localhost:8200/printJobMgmt/printJob/1?checkConstraints=true&bypassOptionalConstraints=true";
          await fetch(url1, {
            "method":"POST",
            "headers":{
              "Content-Type":"application/json"
            },
            "body":JSON.stringify(printJsonData)
            })
            .then(async (response) => {
              return response.json();
            })

            .then(async (data)=>{
              res.send(data);
            })
      }
    res.send(myData);
})
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
app.get("/getUploadedFiles",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var myResponse;
  var fileArray=[];
  const uploadedFileFolder = "../savedFile/";


  await fs.readdir(uploadedFileFolder, (err, files) => {
      files.forEach((file) => {
        fileArray.push(file);
        
        console.log(file);
      });
      res.send({"details": fileArray});
    })
    // console.log(fileArray);
    
  // await fetch("http://localhost:3001", {
  //   "method":"GET"
  //   })
  //   .then(async function (response){
  //     return await response.json();
  //   })
  //   .then(async function (data){
  //     console.log(data);
  //     myResponse = await data;
  // })
  // res.send(myResponse);

})

//get device informaiton
app.get("/getDeviceInfo",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var myResponse;

  await fetch("http://localhost:8200/deviceInfoMgmt/getDeviceInformation/1", {
    "method":"GET"
    })
    .then(async function (response){
      return await response.json();
    })
    .then(async function (data){
      console.log(data);
      // console.log(data.status.statusCode);
      // console.log(data.data.devices.deviceModel);
      // console.log(data.data.devices.deviceType);
      // console.log(data.data.devices.ipAddress);
      myResponse = await data;
  })
  res.send(myResponse);

})
//get color profile info
app.get("/getColorProfile",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var myResponse;

  await fetch("http://localhost:8200/deviceInfoMgmt/getColorProfiles/1", {
    "method":"GET"
    })
    .then(async function (response){
      return await response.json();
    })
    .then(async function (data){
      console.log(data);
      // console.log(data.status.statusCode);
      // console.log(data.data.devices.deviceModel);
      // console.log(data.data.devices.deviceType);
      // console.log(data.data.devices.ipAddress);
      myResponse = await data;
  })
  res.send(myResponse);

})
//get tone curves info
app.get("/getColorConfig",async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var myResponse;

  await fetch("http://localhost:8200/deviceInfoMgmt/getColorConfigurations/1", {
    "method":"GET"
    })
    .then(async function (response){
      return await response.json();
    })
    .then(async function (data){
      console.log(data);
      // console.log(data.status.statusCode);
      // console.log(data.data.devices.deviceModel);
      // console.log(data.data.devices.deviceType);
      // console.log(data.data.devices.ipAddress);
      myResponse = await data;
  })
  res.send(myResponse);

})
//Server listening at port 3000
app.listen(3001, () => console.log('Hello World! Example app listening on port 3001!'))
