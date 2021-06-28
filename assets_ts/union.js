"use strict";
//列挙体まとめ
//union形式にconstアサーションを使用。
//=== === === ＜＜＜ 汎用 ＞＞＞ === === ===
// エラーメッセージ
var _Err = {
    _charsEmpty: "空文字です。",
    _invalidValue: "無効な値です。",
    _unexpectedVal: "予期せぬ値です。",
    _isNotRange: "範囲外の値です。"
    // ,_noLengthParam : "可変長引数で値が１つも渡されませんでした。"
    //---REO : regular expression object
    ,
    _isNotREO_percent: "パーセント文字列ではありません。",
    _isNotREO_int: "整数値情報ではありません。",
    _isNotREO_numeric: "数値情報ではありません。"
};
//型
var _Type = {
    _num: "number",
    _str: "string",
    _bool: "boolean",
    _undef: "undefined",
    _func: "function",
    _obj: "object",
    _begInt: "bigint" //組み込みオブジェクト
};
//色
var _Color = {
    _red: "red",
    _green: "green",
    _blue: "blue",
    _yellow: "yellow",
    _black: "black",
    _tomato: "tomato",
    _translucent: "rgba( 255, 255, 255, 0.5 )",
    _transpar: "rgba( 0, 0, 0, 0 )"
};
//汎用単位系（無し、不明を含む）
//正規表現における特殊文字を含むものは避ける。
var _ComUnit = {
    _nothing: "nothing" //付いていない
    ,
    _unknown: "unknown" //不明瞭
    ,
    _px: "px",
    _percent: "%"
};
//角度系単位
//Angle-Unit
var _AngUnit = {
    _degree: "deg",
    _radian: "rad"
};
//_Eventはjqueryで使われているので。
//EventKey
var _EK = {
    _load: "load"
};
//=== === === ＜＜＜ 正規表現 ＞＞＞ === === ===//コンパイルされるので\は\\とするので注意。
var _RegExp = {
    //数値と、その末尾に％が付いたもの。（実数も可）（整数桁省略不可）
    _percent: /^-?(\d{1,5})\.?\d{0,5}%$/
    //整数(空文字は無効)
    ,
    _int: /^-?\d{1,}$/
    //数値（実数を含む）(空文字は無効)（整数桁省略不可）
    ,
    _numeric: /^-?(\d{1,})\.?\d*$/
};
// const _SpChars : [//正規表現における特殊文字を羅列。
// 	"\\"//バックスラッシュ
// 	,"\""//ダブルコート
// 	,"'"//シングルコート
// 	,"^"
// 	,"$"
// 	,"*"
// 	,"+"
// 	,"-"
// 	,"?"
// 	,"."
// 	,"|"
// 	,"/"
// ]
//=== === === ＜＜＜ SVG関係 ＞＞＞ === === ===
var _SVGType = {
    _rect: "rect",
    _line: "line",
    _ellipse: "ellipse" //ellipse要素の機能を含んでいるので統合する。
    ,
    _path: "path"
};
var _SVGPart = {
    stroke: "stroke",
    fill: "fill"
};
//rectとellipseではrxとryの意味合いが微妙に違うので注意すること。
var _DOMAttr_SVG = {
    _x: "x",
    _y: "y",
    _w: "width",
    _h: "height",
    _cx: "cx",
    _cy: "cy",
    _rx: "rx",
    _ry: "ry",
    _x1: "x1",
    _y1: "y1",
    _x2: "x2",
    _y2: "y2",
    _d: "d"
    //---
    ,
    _fillColor: "fill",
    _strokeColor: "stroke",
    _strokeWidth: "stroke-width"
};
//Anchor-Handle
var _AncHndl = {
    _head: "head",
    _tail: "tail"
};
//=== === === ＜＜＜ 固定文字列 ＞＞＞ === === ===
var _NameSpace = {
    _svg: "http://www.w3.org/2000/svg"
};
// ////=== === === ＜＜＜ その他 ＞＞＞ === === ===
//数値整形用の関数
var _NForm = {
    //正数はそのまま、負数は０にして返す。
    _notNega: function (arg) {
        return (arg < 0) ? 0 : arg;
    }
};
