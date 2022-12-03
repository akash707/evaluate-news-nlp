var path = require('path')
const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const FormData = require('form-data');
const fetch = require("node-fetch");
const API_KEY =  process.env.API_KEY;
const app = express()
console.log("API key", API_KEY);
app.use(cors());
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    const text = req.query.text;
    const formdata = new FormData();
    formdata.append("key", API_KEY);
    formdata.append("txt", text);
    formdata.append("lang", 'en');
    
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    const url = "https://api.meaningcloud.com/sentiment-2.1";
    fetch(url, requestOptions)
      .then(response => response.json())
      .then((result) => {
          console.log("Sending", result);
          res.send(result);
      })
      .catch(error => {
          console.log('error', error);
          res.send("Could not process request at the moment, please try again later")
    });
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

