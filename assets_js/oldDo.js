// JavaScript Document
function oldDo(){
//ここから


//デバッグログの有無を指定。
this.fDebug = true;


//文字列を受け取り、DOM要素を返す
this.elem = function( argStr ){
	return document.querySelector( argStr );
}

this.normalLog = function( argMes ){
	if( this.fDebug ) console.log( argMes );
}

this.DOMHandle = function( argStr ){

}



//ここまで
}


