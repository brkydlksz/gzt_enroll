const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
    const first = req.body.firtName
    const last = req.body.lastName
    const email = req.body.email
    const data = {
        members:[
        {
          email_address : email,
          status : "subscribed",
          merge_fields:{
          FNAME: first,
          LNAME: last
          }
        }
      ]
    };
      const jsonDATA = JSON.stringify(data);
      const api = "brky:"+process.env.API_KEY;
      const url ="https://us10.api.mailchimp.com/3.0/lists/3218c6255e"
      const options = {
        method:"POST",
        auth:api
      }

    const request = https.request(url,options,function(response){
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
      }
      response.on("data", function(data){
      })
    })
    request.write(jsonDATA);
    request.end();
});



app.listen(process.env.PORT || 3000, function(){
  console.log("server starting at port 3000");
})
