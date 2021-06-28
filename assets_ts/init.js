"use strict";
var undef = undefined; //未定義を返したい場合に利用。
//デコレータの定義
//Object.prototype.toStringは[Symbol.toStringTag]が存在すれば
//	"Object"ではなく、そのプロパティの値を尊重する仕様があるので、
//	それを利用して、obj.toString()の戻り値を[object クラス名]
//	に変更する。
//	利用方法：class宣言の手前で@autotagを付ける。
var autotag = function (constructor) {
    constructor.prototype[Symbol.toStringTag] = constructor.name;
    return constructor;
};
/// <reference path="modTest" />
//console.log( Test.Test(256) );
