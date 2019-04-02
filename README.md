# EmployeeManagementApp

Employee Management Application with AngularJS, Nodej.s/ExpressJS and DynamoDB

Steps to Run

Prerequisites: Java Runtime Environment (JRE) version 6.x or newer, Python, AWS CLI, AWS SDK, VSCode, Node.js and npm
Open the files and folders under EmployeeManagementApp\ in VSCode

1. DynamoDB

[Ref:https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html]

a. Start DynamoDB 

\dynamodb_local_latest>java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar –sharedDb

DynamoDB local will be initialized with port 8000

b. Using AWS CLI, configure credentials to enable authorization for the applications.

>aws configure
AWS Access Key ID: "fakeMyKeyId"
AWS Secret Access Key: "fakeSecretAccessKey"
Default region name: ap-south-1
Default output format: json

c. Create Employees Table

\dynamodb>node EmployeesCreateTable.js

Below command can be used to list the items in the table

>aws dynamodb scan --table-name Employees --endpoint-url http://localhost:8000


2. ExpressJS

Install express generator
>npm install –g express-generator
	
In VSCode, open a new terminal and navigate to the myExpressApp folder and start the Node.js web server

\myExpressApp>npm start

The server listens to port 3000

3. AngularJS

Install Angular CLI

>npm install –g @angular/cli

In VSCode, open a new terminal and navigate to the empMgmtApp folder and start the web server

\empMgmtApp>ng serve --proxy-config proxy.conf.json

The server listens to port 4200

Browse http://localhost:4200