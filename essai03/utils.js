/**
 * 
 */

var pi180 = Math.PI / 180 ;

function degtorad(degrees)
{
	return degrees * pi180;
}
/*function degreesToRadians(deg) {
	return deg * pi180;
}*/
function radiansToDegrees(rad) {
	return rad / pi180;
}

var xmlhttp;

function httpGet(url,callback)
{
  xmlhttp = new XMLHttpRequest();

  if ("withCredentials" in xmlhttp)
  {
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    //alert("withCredentials");
    xmlhttp.open("GET", url, true);
  }
  else if (typeof XDomainRequest != "undefined")
  {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xmlhttp = new XDomainRequest();
	//alert("XDomainRequest");
    xmlhttp.open("GET", url);
  }
  else
  {
    // Otherwise, CORS is not supported by the browser.
    xmlhttp = null;
    alert("cors crossdomain not supported by browser");
    return;
  }

  xmlhttp.onreadystatechange = function()
  {
    //console.log("onreadystatechange() "+xmlhttp.readyState+" "+xmlhttp.status);
    if(xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      callback(xmlhttp.responseText);
    }
    else
    {
      //console.log("onreadystatechange() Abort, no callback called");
    }
  }

  //xmlhttp.open("GET", theUrl, false);
  xmlhttp.send();
}

function dbg(msg)
{
  console.log(msg);
}

