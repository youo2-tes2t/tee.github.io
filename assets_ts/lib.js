"use strict";
//汎用関数ライブラリ
//何らかの有用な値かどうかの判別。
//数値型：Infinity/NaN/undefinedではない、有限数かどうか。
//文字列/配列：要素が１つでも有るか。
//関数：無条件でtrue。
//BigInt：無条件でtrue。
//プロパティやメソッドを保持可能なもの：keyが１つでもあればtrue
//その他：無条件でfalse。
function isUseful(arg) {
    if (isT.num(arg))
        return isFinite(arg);
    if (isT.str(arg) || isT.array(arg))
        return (len(arg) > 0);
    if (isT.func(arg))
        return true;
    if (isT.bigInt(arg))
        return true;
    if (isT.structObj(arg))
        return (objKeys(arg).length > 0);
    return false;
}
//実引数が偶数なら真。
function isEven(n) {
    return ((n % 2) === 0);
}
//整数値かどうか
function isInteger(arg) {
    return Number.isInteger(arg);
}
//=== === === <<< isREO判定系 >>> === === ===//REO = regular expression object
//正規表現が合っているか否か。
// function __isREO__( res:_RegExpStr, str:str )
// :bool{
// 	return RegExp( res ).test( str );
// }
//+++関数名/_RegExpStrの列挙体。
// function isREO_percent( arg:str ):bool{ return __isREO__( _RegExpStr._percent, arg ); }
// function isREO_int( arg:str ):bool{ return __isREO__( _RegExpStr._int, arg ); }
// function isREO_numeric( arg:str ):bool{ return __isREO__( _RegExpStr._numeric, arg ); }
function isRegExp(val, exp) {
    return exp.test(val);
}
//=== === === <<< toType系 >>> === === ===
//文字列を受け取り、数値を返す。
//数値を受け取った場合はそのまま返す。
//文字列を受け取り、
//数値に変換出来ない情報であった場合はエラー扱い。
function castToNum(arg) {
    if (isT.num(arg))
        return arg;
    return parseFloat(arg);
}
//文字列を数値に変換。（正規表現による制限付き）
function toNum(arg) {
    return isRegExp(arg, _RegExp._numeric)
        ? parseFloat(arg)
        : Cons.err(_Err._isNotREO_numeric) || 0;
}
//第一引数から第二引数の文字列を探し出して削除した文字列を返す。
function del(target, key) {
    return target.replace(key, "");
}
//割合で掛ける。128, 50の場合は128の50%で64となる。
function percent(val, per) {
    return val * per * 0.01;
}
//第一引数を第二引数で調整を掛けた値を返す。
function adjust(argVal, param) {
    var unit = param.unit;
    var val = param.val;
    if (unit === _ComUnit._px)
        return argVal + val;
    //===
    if (unit === _ComUnit._percent)
        return percent(argVal, val);
    //===
    return Cons.err("\u60F3\u5B9A\u3057\u3066\u3044\u306A\u3044\u5358\u4F4D\uFF1A" + unit + " / " + val)
        || 0;
}
//=== === === <<< 乱数関係 >>> === === ===
//random to range Int
//２つの数値（実数は整数として扱われる）の範囲で、
//整数の値をランダムに返す。
function r2rInt(min, max) {
    var _a;
    if (min > max)
        _a = [max, min], min = _a[0], max = _a[1]; //入れ替え
    min = Math.ceil(min);
    return Math.floor(Math.random()
        * (Math.floor(max) - min + 1)
        + min);
}
//random to range Float
//２つの数値の範囲で実数値をランダムに返す。
function r2rFlort(min, max) {
    return Math.random()
        * diff(max, min)
        + Math.min(min, max);
}
//True/Falseどちらかをランダムで返す。
function ofTheTF() {
    return Math.round(Math.random()) === 1;
}
//与えられた２つの引数の内、どちらかをランダムに返す。
function ofThe2(arg0, arg1) {
    return ofTheTF() ? arg1 : arg0;
}
//数値文字列の末尾に付いた単位を判別して返す。
//「unknown」や「nothing」が付いていた場合は、
//それらも単位として見なした結果を返す。
//汎用単位系に限る。
function unitOf(arg) {
    var res = _ComUnit._unknown;
    var tail = "$";
    var toStr = function (arg) { var s = String(arg); return s.slice(1, s.length - 1); }; //###関数化すべきだし、動作未確認
    var head = toStr(_RegExp._numeric).replace(tail, "");
    var vals = objVals(_ComUnit);
    if (isRegExp(arg, _RegExp._numeric))
        return _ComUnit._nothing;
    for (var _i = 0, vals_1 = vals; _i < vals_1.length; _i++) {
        var val = vals_1[_i];
        if (RegExp(head + val + tail).test(arg))
            return val;
    }
    // for( let i=0; i<vals.length; i++ ){
    // 	if( RegExp( head + vals[ i ] + tail ).test( arg ) )
    // 		return vals[ i ];
    // }
    //---
    return res;
}
//特殊文字をエスケープする（持ってきたコードなので注意）
function escape(arg) {
    return arg.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}
//数値型の配列（連番でも何でもない）を生成
function numbers(arg) {
    return Array.from(new Array(arg));
}
//０からの連番の配列を生成。
//引数に負数や実数は不可。
function range(arg) {
    if (arg < 0
        || isInteger(arg) === false) {
        Cons.err(_Err._invalidValue + (":" + arg));
        arg = 0;
    }
    arg = Math.round(arg);
    return numbers(arg)
        .map(function (val, key) { return key; });
}
//第一引数～第二引数となる連番の配列を生成。
//整数に限る。
//負数に対応。第一引数>第二引数の場合は逆連番となる。
function range2(arg0, arg1) {
    var direction = (arg0 <= arg1)
        ? 1
        : -1;
    return numbers(diff(arg1, arg0) + 1)
        .map(function (val, key) { return key * direction + arg0; });
}
//２つの数値の差分を返す。
function diff(arg0, arg1) {
    return (arg0 < arg1)
        ? (arg1 - arg0)
        : (arg0 - arg1);
}
//配列とキーを受け取り、
//	配列の中にkeyと同じ値のものがあれば真。
//include
function incl(items, key) {
    return items.includes(key);
}
//degree単位の角度の値を受け取り、
//ラジアン単位の値にして返す。
function toRad(arg) {
    return (Math.PI / 180) * arg;
}
//ラジアン単位の角度の値を受け取り、
//degree単位の値にして返す。
function toDeg(arg) {
    return (180 / Math.PI) * arg;
}
//=== === === <<< 組み込み関数の簡略利用 >>> === === ===
function sin(arg) {
    return Math.sin(arg);
}
function cos(arg) {
    return Math.cos(arg);
}
function atan(arg, unit) {
    var ret = Math.atan(arg);
    if (unit === _AngUnit._degree)
        ret = toDeg(ret);
    return ret;
}
function createDOM_SVG(type) {
    return $(document.createElementNS(_NameSpace._svg, type));
}
;
function isUnDef(arg) {
    return (arg !== undefined);
}
//文字列であれば文字数、
//配列であれば要素数を返す。
function len(arg) {
    if (isT.structObj(arg))
        return Object.keys(arg).length;
    return arg.length;
}
//第一引数の値が、第二引数で指定したオブジェクトのプロパティに含まれる値であった場合、trueとなり、そのオブジェクトの型であると伝える。
function isEnum(val, name) {
    if (isT.nuMixS(val) === false)
        return false;
    return objVals(name).includes(val);
}
function objKeys(arg) {
    return Object.keys(arg);
}
function objVals(arg) {
    return Object.values(arg);
}
function max() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return Math.max.apply(Math, arg);
}
function min() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return Math.min.apply(Math, arg);
}

