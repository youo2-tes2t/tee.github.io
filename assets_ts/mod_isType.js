"use strict";
//=== === === <<< is判定系 >>> === === ===
var isT;
(function (isT) {
    //関数の引数の型チェック等に利用。
    //undefinedの場合はfalseとなる。
    function def(arg) {
        return (arg !== void 0);
    }
    isT.def = def;
    ;
    function unDef(arg) {
        return (arg === undef);
    }
    isT.unDef = unDef;
    ;
    //数値型かどうか
    function num(arg) {
        return (typeof arg === _Type._num);
    }
    isT.num = num;
    ;
    //文字列型かどうか
    function str(arg) {
        return (typeof arg === _Type._str);
    }
    isT.str = str;
    ;
    //関数かどうか
    function func(arg) {
        return (arg instanceof Function);
    }
    isT.func = func;
    ;
    function bigInt(arg) {
        return (typeof arg === _Type._begInt);
    }
    isT.bigInt = bigInt;
    ;
    //配列かどうか
    function array(arg) {
        return (arg instanceof Array);
    }
    isT.array = array;
    ;
    //オブジェクト
    //	（プロパティやメソッドを保持可能なもの。
    //	配列や関数は除く。）
    //かどうか
    function structObj(arg) {
        return (typeof arg === _Type._obj)
            && (array(arg) === false)
            && (func(arg) === false);
    }
    isT.structObj = structObj;
    ;
    function nuMixS(arg) {
        return (num(arg) || str(arg));
    }
    isT.nuMixS = nuMixS;
    ;
})(isT || (isT = {}));
; //module化ここまで
