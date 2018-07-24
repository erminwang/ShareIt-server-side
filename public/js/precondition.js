var tryURL = localStorage.getItem('hostURL');

var urlArray = window.location.href.split('/');
var hostURL = urlArray[0] + "//" + urlArray[2];

if(!tryURL || tryURL !== hostURL) {
    localStorage.setItem('hostURL', hostURL);
    console.log(hostURL);
}


var getHostURL = function() {
    return localStorage.getItem('hostURL');
};

var getToken = function() {
    return localStorage.getItem('token');
};
