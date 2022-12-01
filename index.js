const express = require('express')
const bodyParser = require('body-parser')
// const request = require("request")
const https = require('https')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.get('/',(req, res)=>[
    res.sendFile(__dirname + '/signup.html')
])
app.post('/',(req, res)=>{
    const {firstName,lastName , email}  = req.body

    console.log(req.body)
    let data ={
        members:[
            {
                email_address: email,
                status : "subscribed",
                merge_fields:{
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    }
    let jsonData = JSON.stringify(data)
    const url = 'https://us11.api.mailchimp.com/3.0/lists/79f45b5ed0'
    const options ={
        method : "POST",
        auth:"shashikant1:5eb6f0ffdf8422ea96abea4767e42138-us11"
    }
   const request = https.request(url,options,function(response){
    if(response.statusCode=== 200){
        res.send("Successfully subscribed")
    }else{
        res.send("Error while adding email")
    }
        response.on('data',function(data){
            console.log(JSON.parse(data))

        })

    })

    // res.send(jsonData)
    request.write(jsonData)
    request.end()
    // const 
})
app.listen(process.env.PORT,function(req, res){
    console.log("Listening at 8000")
})

// eb15763f6bd71a1171bddfd4ec5cd56d-us11
// 79f45b5ed0