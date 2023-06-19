const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

mailchimp.setConfig({
    apiKey: "a330a434ea1311f3310efbe916fa9016-us8",
    server: "fec626686eX",
  });

app.get("/" , function(req , res){
    res.sendFile(__dirname + "/signUp.html");
});



app.post("/" , function(req , res){
    const nombre = req.body.firstName;
    const apellido = req.body.lastName;
    const email = req.body.emailAdress;
   
    const data = {
        members: [
            {
                email_adress: email,
                status: "subscribed", 
                merge_fields:{
                    FNAME: nombre,
                    LNAME: apellido,
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    console.log(jsonData);
});

app.listen(process.env.PORT || 3000, function(){
   console.log("Server is running"); 
});
