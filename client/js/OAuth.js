
$("#prodBtn").click(prodLogin);
$("#sandBtn").click(sandLogin);

var apiVersion = 'v37.0',
    clientId = '3MVG9d8..z.hDcPLnWCSDehAozHKldMsHr_eVHWmvravfAhyB1j9cWSOgm3nDViIY7PUWRxGnp0GwvO.9VTz5',
    loginUrl = 'https://login.salesforce.com/',
    redirectURI = "http://localhost:8081/oauthcallback.html",
    proxyURL = 'http://localhost:8081/proxy/' ;
 
 //   $("#prodBtn").click();
 prodLogin();  
function prodLogin()
{
    var accountCookie = $.cookie("AccToken");
    if(accountCookie && accountCookie.length > 0){
        window.location = 'home';
    }else{
        loginUrl = 'https://login.salesforce.com/'; 
        login();
     
    }
}

function sandLogin()
{
    loginUrl = 'https://test.salesforce.com/';
    login();
}
function login() {
    var url = loginUrl + 'services/oauth2/authorize?display=page&response_type=token' +
        '&client_id=' + encodeURIComponent(clientId) +
        '&redirect_uri=' + encodeURIComponent(redirectURI);
    console.log('url',url);   
    window.open(url,"_self");
    //popupCenter(url, 'login', 700, 600);
}

function oauthCallback(response) {
    if (response && response.access_token) { 
        console.log(response);
        $.cookie("AccToken",response.access_token ) ;
        $.cookie("APIVer", apiVersion) ;
        $.cookie("InstURL",  response.instance_url) ; 
        $.cookie("idURL",  response.id) ;
        
        // $.ajax({
        //     url: 'https://loans-default-dev-ed.lightning.force.com/_slds/fonts/v2.3.0/SalesforceSans-Regular.woff2',
        //     headers: { 'Authorization': 'Bearer '+$.cookie("AccToken") }
        // });
        

        //  $.ajax({
        //     type: "GET",
        //     headers: { 'Authorization': 'Bearer '+$.cookie("AccToken") },
        //     url: "https://loans-default-dev-ed.lightning.force.com/_slds/fonts/v2.3.0/SalesforceSans-Regular.woff2",                        
        //     processData: false
        //  })
        //  .done(function(result) 
        //  {
        //     var myObj = result;
        //     console.log("myObj",myObj);
        //  })

        strngBrks = response.id.split('/');
		$.cookie("LoggeduserId",  strngBrks[strngBrks.length - 1]) ;

        window.location = 'home';
        
    } else {
        alert("AuthenticationError: No Token");
    }
}
 

function popupCenter(url, title, w, h) {
    // Handles dual monitor setups
    var parentLeft = window.screenLeft ? window.screenLeft : window.screenX;
    var parentTop = window.screenTop ? window.screenTop : window.screenY;
    var left = parentLeft + (window.innerWidth / 2) - (w / 2);
    var top = parentTop + (window.innerHeight / 2) - (h / 2);
    return window.open(url, title, 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}