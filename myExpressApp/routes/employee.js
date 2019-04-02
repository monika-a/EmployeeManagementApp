var express = require('express');
var AWS = require("aws-sdk");

var router = express.Router();

AWS.config.update({
  region: "ap-south-1",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Employees";

function generateEmpId() {
  generateEmpId.counter++;
}
generateEmpId.counter = 111;

//POST - Start
router.post('/', async(req, res, next) => {

  item = req.body;  
  //Scan the table to check if duplicate record exists
  var scanParams = {
    TableName: table,
    FilterExpression: "#firstname = :fname_val and #surname = :sname_val and #email = :email_val",
    ExpressionAttributeNames: {
      "#firstname": "firstname",
      "#surname": "surname",
      "#email": "email",
    },
    ExpressionAttributeValues: {
      ":fname_val": item.firstname,
      ":sname_val": item.surname,
      ":email_val": item.email
    }
  }

  console.log("Scanning Employees table.");
  docClient.scan(scanParams, onScan);

  function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        res.send(err.code);
    } else {
        console.log("Scan succeeded.");
        
        // continue scanning if we have more employees, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(scanParams, onScan);
        }
        if (data.Count) {
          res.send("Employee Record already exists");
        }
        else
        {
          item.id = generateEmpId.counter;
          
          var createParams = {
            TableName: table,
            Item: item
          };
          
          docClient.put(createParams, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                res.send(err.code);
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
                generateEmpId();
                res.send(createParams.Item);
            }
          });        
        }
    }
  }  
});
//POST - End

//GET - Start
router.get('/:id', async(req, res, next) => {

  const id = parseInt(req.params.id);
  var params = {
    TableName: table,
    Key:{
       "id": id
    }
  };

  docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        res.send(err.code);
    } else {
        console.log("GetItem:", JSON.stringify(data, null, 2));

        if (data.Item == undefined) {
            console.log("Invalid Key");
            res.send("Invalid Employee Id");
        } else {            
            res.send(data.Item);
        }
    }  
  });

});
//GET - End

//PUT - Start
router.put('/:id', async(req, res, next) => {
  
  const id = parseInt(req.params.id);
  
  var params = {
    TableName: table,
    Key:{
      "id": id
    },
    UpdateExpression: "SET firstname = :fname, surname = :sname, email = :email, dob = :dob, gender = :gender",
    ConditionExpression: "attribute_exists(id)", 
    ExpressionAttributeValues: {
        ":fname": req.body.firstname,
        ":sname": req.body.surname,
        ":email": req.body.email,
        ":dob": req.body.dob,
        ":gender": req.body.gender
    },
    ReturnValues:"ALL_NEW"
  };

  docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));

        if (err.code == "ConditionalCheckFailedException") { 
          res.send("Invalid Employee Id");
        }
        else {
          res.send(err.code);
        }

    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        res.send(data.Item);
    }  
  });
  
});
//PUT - End

//DELETE - Start
router.delete('/:id', async(req, res, next) => {
    
  const id = parseInt(req.params.id);

  var params = {
    TableName: table,
    Key:{
       "id": id
    },
    ConditionExpression: "attribute_exists(id)"
  };

  docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        
        if (err.code == "ConditionalCheckFailedException") { 
          res.send("Invalid Employee Id");
        }
        else {
          res.send(err.code);
        }

    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        res.send(data);
    }
  });

});
//DELETE - End

module.exports = router;