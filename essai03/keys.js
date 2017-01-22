/**
 * 
 */

var Keys = function()
{
	this.keys = new Array(256);
	this.keys0=new Array(256);
	this.tkeys=new Array(256);
	this.tkey=0;
	this.pkeys=new Array(256);

	/* for event keydown & keyup */
	var that = this ;

	this.resetkeys = function(){
		for(var i=0;i<256;i++){
			this.keys[i]=0;this.keys0[i]=0;this.tkeys[i]=0;
		}
	}

	this.keydown = function(e){
		var key=eval(e.which || e.keyCode)
		var t=timer();
		if(key>0 && key<256){
			that.keys[key]=1;
			that.tkeys[key]=t;
			that.keys0[key]=1;
		}
	}
	this.keyup = function(e){
		var key=eval(e.which || e.keyCode)
		if(key>0 && key<256){
			that.keys[key]=0;
			that.keys0[key]=0;
		}
	}

	this.up = function() {
		return this.keys[vk_up] == 1 ? true : false ;
	}
	this.down = function() {
		return this.keys[vk_down] == 1 ? true : false ;
	}
	this.left = function() {
		return this.keys[vk_left] == 1 ? true : false ;
	}
	this.right = function() {
		return this.keys[vk_right] == 1 ? true : false ;
	}
	this.vk_page_up = function() {
		return this.keys[vk_page_up] == 1 ? true : false ;
	}
	this.vk_page_down = function() {
		return this.keys[vk_page_down] == 1 ? true : false ;
	}
	this.vk_3 = function() {
		if( this.keys[vk_3] == 1 ){
			this.keys[vk_3]=0;
			return true ;
		}
		return false ;
	}
	this.vk_h = function() {
		if( this.keys[vk_h] == 1 ){
			this.keys[vk_h] = 0 ;
			return true ;
		}
		return false ;
	}
	this.vk_g = function() {
		if( this.keys[vk_g] == 1 ){
			this.keys[vk_g] = 0 ;
			return true ;
		}
		return false ;
	}
	this.vk_m = function() {
		return this.keys[vk_m] == 1 ? true : false ;
	}

	this.resetkeys();

}
