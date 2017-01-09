
var xmlhttp;

function httpGet(url,callback)
{
  xmlhttp = new XMLHttpRequest();
  if ("withCredentials" in xmlhttp) {
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    //alert("withCredentials");
	xmlhttp.open("GET", url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xmlhttp = new XDomainRequest();
	//alert("XDomainRequest");
    xmlhttp.open("GET", url);
  } else {
    // Otherwise, CORS is not supported by the browser.
    xmlhttp = null;
	alert("cors crossdomain not supported by browser");
	return;
  }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {callback(xmlhttp.responseText);
        }
    }
    //xmlhttp.open("GET", theUrl, false);
    xmlhttp.send();
}

