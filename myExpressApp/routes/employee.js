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