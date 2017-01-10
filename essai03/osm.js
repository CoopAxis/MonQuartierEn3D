/**
 *
 */


var Osm = function()
{

  //this.overpass='//overpass-api.de/api/';
  this.overpass='//api.openstreetmap.fr/oapi/';

  this.lat = 48.826125291730506 ;
  this.lng = 2.3570559500472212 ;
  
  this.dlat = 0.002;
  this.dlon = 0.004;

  this.http="http:";
  if( document.location.href.indexOf("https")>=0 ) {
    http="https:";
  }

  this.loading = false ;

  //var wayjson,nodejson,ways,waynodes,nodes,waytype;
  //var latnodes=[],lonnodes=[];
  //var nodekey,nodekey2,nodekey3,nkeymax=450;

  this.getnodes = function ()
  {
	  dbg('getnodes()');

	  this.lat1= this.lat - this.dlat/2;
	  this.lon1= this.lng - this.dlon/2;
	  this.lat2= this.lat + this.dlat/2;
	  this.lon2= this.lng + this.dlon/2;

	  //nodeurl=http+overpass+"interpreter?data=[out:json];"+nodekey+"%3Bout%20skel%209999%3B";
	  var dx=0.001;
	  var lat11=this.lat1-dx,
	    lon11=this.lon1-dx;
	  var lat21=this.lat2+dx,
	    lon21= this.lon2+dx;
	  this.nodeurl=
	    this.http + this.overpass
	    +"interpreter?data=[out:json];node%28"+lat11+"%2C"+lon11+"%2C"+lat21+"%2C"+lon21+"%29%3Bout%20skel%2019999%3B";
	  this.resetnode=1;
	  this.tgetnode=1;
	  try{
	    httpGet( this.nodeurl,this.nodecallback );
	  }
	  catch (e)
	  {
  	  alert("error getnodes");
  	  this.loading = false ;
	  }
  }

  this.nodecallback = function (r)
  {
	  //alert(r);
    nodejson=JSON.parse(r);
    var msg="";
    nodes=null;
    nodes=nodejson.elements;
    msg+="len="+nodes.length;
    if(resetnode==1){latnodes=[];lonnodes=[];}
    for(var i=0;i<nodes.length;i++){
       if(i<5){
	    msg+="/ nodeid="+nodes[i].id;
	    msg+=" lat="+nodes[i].lat;
	    msg+=" lon="+nodes[i].lon;
	    }
	   var inode=nodes[i].id;
	   latnodes[inode]=nodes[i].lat;
       lonnodes[inode]=nodes[i].lon;
	   }
    //alert(msg);

    tdraw=1;//draw();

    //this.loading = false ;
  }

  this.getways = function( lat, lon, dist_lat, dist_lon )
  {
	  if(this.loading)
	  {
		  dbg('getways() Abort, already loading.');
		  return;
	  }
	  loading=true;

	  dbg('getways()');

    var latK = lonK = 1 ;

	  var lat1= lat - latK * dist_lat ;
	  var lon1= lon - lonK * dist_lon ;
	  var lat2= lat + latK * dist_lat ;
	  var lon2= lon + lonK * dist_lon ;

	  var latlon="%28"+lat1+"%2C"+lon1+"%2C"+lat2+"%2C"+lon2+"%29";
	  var keyway="(way[building]"+latlon+";way[highway~'motorway|trunk|primary|secondary|tertiary|unclassified|residential']"+latlon+")";
	  var wayurl= this.http + this.overpass+"interpreter?data=[out:json];"+keyway+"%3Bout%204999%3B";

	  try{
		  httpGet(wayurl,this.waycallback);
	  }
	  catch(e){
		  alert("error getways - "+e.toString() );
		  this.loading = false ;
	  }
  }

  this.waycallback = function(r)
  {
    dbg('waycallback()');

	  //alert(r);
    wayjson=JSON.parse(r);
    var msg="",ntest=0;
    nnode=0;
    ways=null;
    ways = wayjson.elements;
    msg+="len="+ways.length;
    for(var i=0;i<ways.length;i++)
    {
      var way=(ways[i]);
      /*msg+="/ "+way.type+" id="+way.id+" "
      waytype="none";
      if(way.tags){if(way.tags.highway){
      waytype=way.tags.highway;}}
      msg+=waytype;*/

      nnode += way.nodes.length ;
    }
    //alert("nnode="+nnode+" "+msg);
    //setTimeout("getnodes();",20);
    setTimeout( this.getnodes ,20);
  }

};

