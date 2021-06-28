// JavaScript Document

const o = new oldDo( true );

var svg = o.elem( "#svgtest" );

let win_W = window.document.documentElement.clientWidth;
let win_H = window.document.documentElement.offsetHeight;

svg.setAttribute( "width", String( win_W ) );
svg.setAttribute( "height", String( win_H ) );


var $svg = Snap( '#svgtest' );
var circle = $svg.circle(100,100,100).attr({fill:'#e66'});
var text = $svg.text(100,100,'てすてす').attr({fill:'#eee'});
var elements = $svg.group(circle,text);

elements.drag();

