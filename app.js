const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const app = express()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

// app.listen(3000, function() {
//     console.log("Server is running on port 3000")
// })

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
    var firstName = req.body.fName
    var lastName = req.body.lName
    var email = req.body.email
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    };
    var jsonData = JSON.stringify(data)
    // var baseUrl = 'https://usX.api.mailchimp.com/3.0/lists/'
    // var listId = '6b039de4c1'
    // var serverId = "us4"
    var options = {
        url: 'https://us4.api.mailchimp.com/3.0/lists/6b039de4c1',
        method: 'POST',
        headers: {
            "Authorization": "jordan1 2bb3d5d092c1e48f7b9567c35bdf1b1e-us4"
        },
        body: jsonData
    }
    request(options, function(error, response, body) {
        if(error) {
            res.sendFile(__dirname + "/failure.html")
        }else {
            if(response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html")
            }
        }
    })
})

app.post("/failure", function(req, res) {
    res.redirect("/");
})
app.listen(process.env.PORT, function() {
    console.log("Server is running on port 3000")
})
// var apiKey= "2bb3d5d092c1e48f7b9567c35bdf1b1e-us4"

// listId = 6b039de4c1