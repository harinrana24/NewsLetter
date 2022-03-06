const express = require("express")
const request = require("request")
const bodyParser = require("body-parser")
const https = require("https")
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/signup.html")
})

app.post("/", function (req, res) {

   const data = {
     members:[
       {
         email_address: req.body.emails,
         status: "subscribed",
         merge_fields: {
           FNAME: req.body.first,
           LNAME: req.body.last
         }
       }
     ]
   }

const jsondata = JSON.stringify(data);
const url = "https://us14.api.mailchimp.com/3.0/lists/85910a963f"
const option = {
  method:"post",
  auth:"harin:db45668a7e1e2db38f571ea7f6bbb5d8-us14"
}
const request = https.request(url, option, function(response){
  if (response.statusCode === 200){
    res.sendfile(__dirname+"/success.html")
  }else{
    res.sendfile(__dirname+"/failure.html")
  }
response.on("data", function(data){
  console.log(JSON.parse(data))
   })
 })
 app.post("/failure", function(req, res){
   res.redirect("/")
 })

request.write(jsondata)
request.end()
})




// API key
// db45668a7e1e2db38f571ea7f6bbb5d8-us14
//
// unique id
// 85910a963f
// 85910a963f
