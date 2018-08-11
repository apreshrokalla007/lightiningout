var express = require('express'),
    http = require('http'), 
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();
    var url = require('url')
var https = require('https');
var fs = require('fs');
var cors = require('cors');
	
var logFmt = require("logfmt");
var request = require('request')

app.use(express.static(__dirname + '/client')); 

app.use(bodyParser.json());  

app.set('port', process.env.PORT || 8080);


/*Allow CORS*/
app.use(function(req, res, next) {
	 
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization,X-Authorization'); 
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
	res.setHeader('Access-Control-Max-Age', '1000');
	  
	next();
});



app.all('/proxy',  function(req, res, next) { 
    
    var url = req.header('SalesforceProxy-Endpoint');  
    request({ url: url, method: req.method, json: req.body, 
                    headers: {'Authorization': req.header('X-Authorization'), 'Content-Type' : 'application/json'}, body:req.body }).pipe(res);    
    
});
 
app.get('/' ,  function(req,res,next) {
    res.sendfile('views/index.html');
} ); 

app.get('/logoutsuccess' ,  function(req,res,next) {
    res.sendfile('views/logoutsuccess.html');
} ); 

app.get('/testapi' ,  function(req,res,next) {
    //res.sendfile('views/index.html');
   
    var apiVersion = 'v37.0',
    clientId = '3MVG9d8..z.hDcPLnWCSDehAozHKldMsHr_eVHWmvravfAhyB1j9cWSOgm3nDViIY7PUWRxGnp0GwvO.9VTz5',
    loginUrl = 'https://login.salesforce.com/',
    client_secret = "3096936461454703555",
    username = "einstein@discovery.com",
    password = "shi131984cIv5xUI0qDgaCM3iMlqKKTjZ" ;

    var param = {
        grant_type: "password",
        client_id : encodeURIComponent(clientId),
        client_secret : encodeURIComponent(client_secret),
        username:encodeURIComponent(username),
        password:encodeURIComponent(password)};

    var parameters = ''
    var postUrl = 'https://login.salesforce.com/services/oauth2/token';
        if (postUrl.indexOf('?') == -1) {
            parameters = '?'
        } else {
            parameters = '&'
        }

        for (var myKey in param) {
            parameters = parameters + myKey + '=' + param[myKey] + '&'
        }

  parameters = parameters.substring(0, parameters.length - 1)

  console.log('postUrl+parameters', postUrl + parameters)
  request.post(postUrl + parameters, function (error, response, body) {
	 if (error)console.log(' error:', error) // Print the error if one occurred
	     console.log('response', response && response.statusCode);
		 console.log( ' body:', body) // Print the HTML for the Google homepage.
		 res.send('Done');
  })


} ); 

app.get('/index*' ,  function(req,res,next) {
    res.sendfile('views/index.html');
   // res.sendfile('views/Main2.html');
} );  

app.get('/CreateDashboard.html' ,  function(req,res,next) {
    res.sendfile('views/CreateDashboard.html');
} ); 
 
app.get('/oauthcallback.html' ,  function(req,res,next) {
    res.sendfile('views/oauthcallback.html');
} ); 

app.get('/loginhome' ,  function(req,res,next) {
    res.sendfile('views/loginhome.html');
} ); 

app.get('/loginauth' ,  function(req,res,next) {
    res.sendfile('views/loginauth.html');
} ); 

app.get('/Main' ,   function(req,res,next) {
    var url_parts = url.parse(req.url, true)
    var query = url_parts.query;
    res.sendfile('views/index.html');
} );

app.get('/Main1' ,   function(req,res,next) {
    var url_parts = url.parse(req.url, true)
    var query = url_parts.query;
    res.sendfile('views/Main.html');
} );
 
app.get('/home' ,   function(req,res,next) {
    var url_parts = url.parse(req.url, true)
    var query = url_parts.query;
    res.sendfile('views/Main2.html');
} );

app.get('/authorize' ,   function(req,res,next) {
    var url_parts = url.parse(req.url, true)
    var query = url_parts.query;
    res.sendfile('views/authorize.html');
} );

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

	var options = {
      key: fs.readFileSync('./key.pem', 'utf8'),
      cert: fs.readFileSync('./server.crt', 'utf8')
   };
   
	https.createServer(options, app).listen(8081);
	console.log("Server listening for HTTPS connections on port ", 8081);