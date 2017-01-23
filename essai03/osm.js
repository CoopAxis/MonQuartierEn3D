/**
 *
 */


var Osm = function()
{

  //this.overpass='//overpass-api.de/api/';
  this.overpass='//api.openstreetmap.fr/oapi/';

  this.lat = 48.826125291730506 ;
  this.lng = 2.3570559500472212 ;
  
  this.dlat ; 
  this.dlon ;

  this.http="http:";
  if( document.location.href.indexOf("https")>=0 ) {
    this.http="https:";
  }

  // true while loading data,
  // false after error or ways and nodes loaded.
  this.loading = false ;

  this.ways = null ;
  this.nodes = null ;

  this.getnodes = function (that)
  {
	  dbg('getnodes()');

	  this.lat1= this.lat - this.dlat/2;
	  this.lon1= this.lng - this.dlon/2;
	  this.lat2= this.lat + this.dlat/2;
	  this.lon2= this.lng + this.dlon/2;

	  //nodeurl=http+overpass+"interpreter?data=[out:json];"+nodekey+"%3Bout%20skel%209999%3B";
	  var dx=0.001;
	  var	lat11 = this.lat1-dx,
			lon11 = this.lon1-dx,
			lat21 = this.lat2+dx,
			lon21 = this.lon2+dx;
	  var nodeurl = this.http + this.overpass
	    +"interpreter?data=[out:json];node%28"+lat11+"%2C"+lon11+"%2C"+lat21+"%2C"+lon21+"%29%3Bout%20skel%2019999%3B";
	  this.resetnode=1;
	  this.tgetnode=1;
	  try{
	    httpGet( nodeurl, function( r ){ that.nodecallback(that, r) } );
	  }
	  catch (e)
	  {
  	  alert("error getnodes");
  	  this.loading = false ;
	  }
  }

  this.nodecallback = function( that, r )
  {
    var nodejson=JSON.parse(r);
    this.nodes = nodejson.elements;

    dbg(' nodes.length='+this.nodes.length);
    /*
    // resetnode
    this.latnodes=[];
    this.lonnodes=[];

    for(var i=0;i<nodes.length;i++){
      if(i<5){
	      //msg+="/ nodeid="+nodes[i].id;
	      //msg+=" lat="+nodes[i].lat;
	      //msg+=" lon="+nodes[i].lon;
	    }
	    var inode=nodes[i].id;
		this.latnodes[inode]=nodes[i].lat;
		this.lonnodes[inode]=nodes[i].lon;
    }
    * */
    tdraw=1; //draw();

    this.loading = false ;

  }

	this.getways = function( lat, lon, dist_lat, dist_lon )
	{
		if(this.loading)
		{
			dbg('getways() Abort, already loading.');
			return;
		}
		this.loading=true;

		dbg('getways()');

		this.dlat = dist_lat;
		this.dlon = dist_lon;

		var latK = lonK = 1 ;

		var lat1= lat - latK * dist_lat ;
		var lon1= lon - lonK * dist_lon ;
		var lat2= lat + latK * dist_lat ;
		var lon2= lon + lonK * dist_lon ;

		var latlon="%28"+lat1+"%2C"+lon1+"%2C"+lat2+"%2C"+lon2+"%29";
		var keyway="(way[building]"+latlon+";way[highway~'motorway|trunk|primary|secondary|tertiary|unclassified|residential']"+latlon+")";
		var wayurl= this.http + this.overpass+"interpreter?data=[out:json];"+keyway+"%3Bout%204999%3B";

		try{
			var that = this ;
			httpGet(wayurl, function( r ){ that.waycallback(that, r) } );
		}
	  catch(e){
		  alert("error getways - "+e.toString() );
		  this.loading = false ;
	  }
  }

  this.waycallback = function( that, r)
  {
    dbg('waycallback()');

	  //alert(r);
    var wayjson=JSON.parse(r);
    this.ways = wayjson.elements ;
    var msg="",ntest=0;
    nnode=0;

    dbg(' ways.length='+this.ways.length);
    /*
    for(var i=0;i<this.ways.length;i++)
    {
      var way=(this.ways[i]);
      //msg+="/ "+way.type+" id="+way.id+" "
      //waytype="none";
      //if(way.tags){if(way.tags.highway){
      //waytype=way.tags.highway;}}
      //msg+=waytype;

      nnode += way.nodes.length ;
    }
    //alert("nnode="+nnode+" "+msg);
    //setTimeout("getnodes();",20);
    //setTimeout( osm.getnodes ,20);
    */
	  setTimeout( function(){ that.getnodes(that) }, 20 );
  }

};

