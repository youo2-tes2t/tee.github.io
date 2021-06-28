"use strict";
// declare var require: any;
// import $ from 'jquery';
// ///<reference path="svgClass.ts"/>
var _w = "width";
var _h = "height";
var _rect = _SVGType._rect;
var _cir = _SVGType._ellipse;
//=== ===
var $gSVGParent = $("#svg_0");
var rect = new SVG_Rect();
var newBox = function (p0, p1) {
    var obj = new SVG_Rect(new D2Transform(new XYNum(p0, p1), new XYNum(7, 7), new Cent2D("50%", "50%")));
    obj.fillColor(_Color._transpar);
    obj.strokeWidth(3);
    obj.strokeColor(_Color._tomato);
    obj.setUpdate();
    obj.setParent($gSVGParent);
    return obj;
};
// const path = document.createElementNS( _NameSpace._svg, _SVGType._path )
// const $path = $( path );
var path;
var cnt = 0;
var ancs = [];
//初期化
window.addEventListener(_EK._load, function () {
    // rect.size( 50, 50 );
    // rect.ofset( 50, 50 );
    // rect.center( "50%", "50%" );
    // rect.fillColor( _Color._transpar );
    // rect.strokeColor( _Color._tomato );
    // rect.strokeWidth( 3 );
    // rect.setParent( $gSVGParent );
    // rect.setUpdate();
    // newBox( 100, 0 );
    // newBox( 200, 100 );
    // newBox( 100, 200 );
    // let attr = "M100,0"
    // attr += " C150, 0 200,50 200,100"
    // attr += " C200,150 150,200 100,200"
    // attr += " Z";
    // $path.attr( "d", attr );
    // $gSVGParent.append( $path );
    path = new SVG_Path(250, 250);
    var apA = function (ang, dist) {
        var anc = new Anchor(new Vec2D(new Angle(_AngUnit._degree, ang), dist));
        path.append(anc);
        return anc;
    };
    // for( let i of numbers( 4 ) ){
    // 	path.append( new Anchor( 3, 3 ) );
    // }
    ancs.push(apA(0, 100));
    ancs.push(apA(90, 100));
    ancs.push(apA(180, 100));
    ancs.push(apA(270, 100));
    // Cons.log( path.toDataStr() );
    path.fillColor("rgb(255,224,224)");
    path.strokeWidth(5);
    path.strokeColor(_Color._tomato);
    path.setUpdate();
    path.setParent($gSVGParent);
    //赤い菱形の枠のパス生成。
    // const anc = ( a:num, d:num ) => new Anchor( new Vec2D( new Angle( _AngUnit._degree, a ), d ) )
    // const guide_diamond:SVG_Path = new SVG_Path( 100, 100 );//クローンの作成
    // guide_diamond.append( anc( 0, 100 ) );
    // guide_diamond.append( anc( 90, 100 ) );
    // guide_diamond.append( anc( 180, 100 ) );
    // guide_diamond.append( anc( 270, 100 ) );
    // guide_diamond.strokeColor( "rgba(255,0,0,0.2)" );
    // guide_diamond.strokeWidth( 1 );
    // guide_diamond.fillColor( _Color._transpar );
    //曲線テスト。
    // guide_diamond.getAnchors( 3 ).handle( _AncHndl._head ).setDist( new Angle( _AngUnit._degree, 90 ), 100 );
    // for( let i of range( 4 ) ){
    // guide_diamond.getAnchors( i ).setBothHndl_dist( 50 );
    // }
    // guide_diamond.getAnchors( 0 ).setBothHndl_ang( new Angle( _AngUnit._degree, 90 ) );
    // guide_diamond.setUpdate();
    // guide_diamond.setParent( $gSVGParent );
    // Cons.log( guide_diamond.toDataStr() );
    // const Hoge = {
    // 		a:"AAA"
    // 		,b:"BBB"
    // 		//---
    // 		,is:Function()
    // 	};
    // type Hoge = typeof Hoge[ keyof typeof Hoge ];
    // Hoge.is = function( arg:any ):arg is Hoge
    // 	{ return Object.values( Hoge ).includes( arg ) }
    // Hoge.is =
    // 	( arg:any ):arg is Hoge =>
    // Object.values( Hoge ).includes( arg );
    // function isEnum<T>( arg:any ):arg is T{
    // 	if( isNuMixS( arg ) === false )
    // 		return false;
    // 	return Object.values( T ).includes( arg );
    // }
    // Object.values( )
    // log( Hoge.is( Hoge.a ) );
    // const Fuga = {
    // 	a : "AAA"
    // 	,b : "BBB"
    // } as const;
    // function isEnum( val:any, name:{} ):val is typeof name{
    // 	return Object.values( name ).includes( val );
    // }
    // log( `b:${ isEnum("a",Fuga)}` );
    // log( _AngUnit.is( _AngUnit._degree ) );
    // log( Object.values( _AngUnit ) );
    // log( Object.keys( _AngUnit ).includes( _AngUnit._degree ) );
    // log( ["deg","123"].includes( _AngUnit._degree ) );
    // anc.ofs = new Vector( new Angle( _AngUnit._degree, 270 ), 50 );
    // const anc = new Anchor( new XYNum( 50, 50 ) );
    // anc.handle_absXY( _AncHndl._tail, new XYNum( 75, 45 ) );
    // log( anc.handle( _AncHndl._tail ).toXYStr() );
    //###
    for (var _i = 0, _a = range(8); _i < _a.length; _i++) {
        var i = _a[_i];
        // 	i = toRad( 360*( (i+0.5)/8 ) );
        // 	newBox( 250, 50+sin(i)*50 );
        // 	newBox( 300, 50+cos(i)*50 );
        // 	for( let j of range( 4 ) ){
        // 	}
    }
    update();
});
//メインループ
function update() {
    // let winSize = Math.max(
    // 	$gSVGParent.width() as num
    // 	, $gSVGParent.height() as num
    // );
    // $gSVGParent.attr( `viewBox", "0 0 ${100} ${100}` );
    // $gSVGParent.attr( 'x2', 50 );
    // $gSVGParent.attr( 'y2', 50 );
    // const fn = () => ( r2rInt( 0, 10 ) * 10 ) + _Unit._percent;
    // rect.center( fn() ,fn() );
    // rect.setUpdate();
    // cnt +=1;
    // cnt = cnt % 100;
    // let attr = "M100,0"
    // attr += " C150, 0 200,50 200,100"
    // attr += ` C200,150 150,200 ${100 - cnt},200`
    // attr += " Z";
    // $path.attr( "d", attr );
    // $path.attr( _DOMAttr_SVG._strokeWidth, 3 );
    // $path.attr( _DOMAttr_SVG._strokeColor, _Color._tomato );
    // $path.attr( _DOMAttr_SVG._fillColor, _Color._translucent );
    // cnt_0 = (cnt_0+1) % 360;
    // cnt_1 = (cnt_1+0.5) % 360;
    // anc_0.ofs.angle.ctor( _AngUnit._degree, cnt_0 );
    // anc_0.ofs.angle = new Angle( _AngUnit._degree, cnt_0 );
    // anc_0.ofs.setAngle( _AngUnit._degree, cnt_0 );
    // anc_1.ofs.angle.ctor( _AngUnit._degree, cnt_1 );
    // anc_1.ofs.angle = new Angle( _AngUnit._degree, cnt_1 );
    // anc_1.ofs.setAngle( _AngUnit._degree, cnt_1 );
    cnt++;
    cnt %= 360;
    var r = cos(toRad(cnt));
    for (var _i = 0, _a = range(4); _i < _a.length; _i++) {
        var i = _a[_i];
        ancs[i].linear(cnt + i * 90, 100 + r * 100);
    }
    path.strokeWidth(25 + r * 25);
    path.fillColor("rgb(" + (128 + r * 127) + ",255,255)");
    path.setUpdate();
    //=== ===
    requestAnimationFrame(update);
}
