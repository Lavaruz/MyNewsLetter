const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const https = require('https')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))


// GET
app.get('/', function(req, res){
    res.sendFile(__dirname+'/signup.html')
})

// POST
app.post('/', function(req,res){
    const fname = req.body.firstName
    const lname = req.body.lastName
    const email = req.body.email

    const data = {
        members : [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
        }]
    }
    const dataJSON = JSON.stringify(data)
    
    const url = `https://us5.api.mailchimp.com/3.0/lists/dcc923c6b6`
    const option = {
        auth: 'assamim:efd6af643404d7a8e05210725103a1dd-us5',
        method: 'POST'
    }
    const request = https.request(url, option, function(rspon){
        if (rspon.statusCode === 200){
            res.sendFile(__dirname+'/sucess.html')
        }else{
            res.sendFile(__dirname+"/failed")
        }
    })

    request.write(dataJSON)
    request.end()
})

app.post('/failed', function(req, res){
    res.redirect('/')
})

app.listen(3000, function(){
    console.log('Server running on port 3000');
})

// MAILCHIMP API KEY
// efd6af643404d7a8e05210725103a1dd-us5
// AUDIENCE ID
// c5105fea86.