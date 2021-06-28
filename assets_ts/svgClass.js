"use strict";
//declare var require: any;
// import $ = require('jquery');
//import $ from 'jquery';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SVG_Common = /** @class */ (function () {
    //+++
    //渡されたタイプのSVGDOMを生成。
    //生成したDOMからプロパティの初期値を取得。
    function SVG_Common(type) {
        this.pStrokeWidth = 0;
        this.pStrokeColor = "";
        this.pFillColor = "";
        this.p$dom = createDOM_SVG(type);
    }
    ;
    //+++
    SVG_Common.prototype.strokeWidth = function (arg) {
        if (isT.num(arg))
            this.pStrokeWidth = _NForm._notNega(arg);
        return this.pStrokeWidth;
    };
    ;
    //+++
    SVG_Common.prototype.strokeColor = function (arg) {
        if (isT.str(arg))
            this.pStrokeColor = arg;
        return this.pStrokeColor;
    };
    ;
    //+++
    SVG_Common.prototype.fillColor = function (arg) {
        if (isT.str(arg))
            this.pFillColor = arg;
        return this.pFillColor;
    };
    ;
    //タグの属性名と値を引数として、設定する。
    //値の省略により、現在の値を取得する。
    SVG_Common.prototype.getAttr = function (key) {
        return this.p$dom.attr(key)
            || "";
    };
    ;
    SVG_Common.prototype.setAttr = function (key, val) {
        this.p$dom.attr(key, val);
    };
    ;
    //親DOMの指定
    SVG_Common.prototype.setParent = function (parent) {
        parent.append(this.p$dom);
    };
    //DOMの属性値から値を取得
    //（本来であれば、インスタンスを保持していればいい
    //	だけの話なので利用非推奨）
    SVG_Common.prototype.getUpdate = function () {
        this.getUpdate_body();
        this.getUpdate_deco();
    };
    ;
    //属性値の取得更新（共通部分）
    SVG_Common.prototype.getUpdate_deco = function () {
        var ak = _DOMAttr_SVG;
        this.strokeWidth(parseInt(this.getAttr(ak._strokeWidth))); //###
        this.strokeColor(this.getAttr(ak._strokeColor));
        this.fillColor(this.getAttr(ak._fillColor));
    };
    ;
    //DOMの属性値の上書き更新
    SVG_Common.prototype.setUpdate = function () {
        this.setUpdate_body();
        this.setUpdate_deco();
    };
    ;
    //属性値の上書き更新（共通部分）
    SVG_Common.prototype.setUpdate_deco = function () {
        var ak = _DOMAttr_SVG;
        this.setAttr(ak._strokeWidth, this.pStrokeWidth);
        this.setAttr(ak._strokeColor, this.pStrokeColor);
        this.setAttr(ak._fillColor, this.pFillColor);
    };
    ;
    return SVG_Common;
}());
;
//表示させるにはsetUpdateを呼ぶ必要がある。
var SVG_Rect = /** @class */ (function (_super) {
    __extends(SVG_Rect, _super);
    //DOMの生成。
    //座標系情報が渡された場合に適応させる。
    function SVG_Rect(d2tf) {
        var _this = _super.call(this, _SVGType._rect) || this;
        _this.pD2tf = isT.def(d2tf)
            ? d2tf
            : new D2Transform();
        return _this;
    }
    ;
    //+++
    SVG_Rect.prototype.ofset = function (a0, a1) {
        if (XYNum.is(a0)) {
            this.pD2tf.pOfset = a0;
        }
        //---
        if (isT.num(a0) && isT.num(a0)) {
            this.pD2tf.pOfset = new XYNum(a0, a1);
        }
        //---
        return this.pD2tf.pOfset;
    };
    ;
    //+++
    SVG_Rect.prototype.center = function (x, y) {
        if (isT.nuMixS(x))
            this.pD2tf.pCenter.x = new Param(x);
        if (isT.nuMixS(y))
            this.pD2tf.pCenter.y = new Param(y);
        return this.pD2tf.pCenter;
    };
    ;
    //+++
    SVG_Rect.prototype.size = function (x, y) {
        if (isT.num(x) && isT.num(y)) {
            this.pD2tf.pSize
                = new XYNum(x, y)
                    .adapt(_NForm._notNega);
        }
        return this.pD2tf.pSize;
    };
    ;
    //自身のプロパティを元に表示を更新する。
    //pCenterを元にpOfsetをずらしている。
    SVG_Rect.prototype.setUpdate_body = function () {
        var a = _DOMAttr_SVG;
        var p = this.pD2tf;
        var cen = p.pCenter;
        this.setAttr(a._x, p.pOfset.x
            - ((cen.x.unit === _ComUnit._px)
                ? cen.x.val
                : adjust(p.pSize.x, cen.x)));
        this.setAttr(a._y, p.pOfset.y
            - ((cen.y.unit === _ComUnit._px)
                ? cen.y.val
                : adjust(p.pSize.y, cen.y)));
        this.setAttr(a._w, p.pSize.x);
        this.setAttr(a._h, p.pSize.y);
    };
    ;
    //サイズ情報をDOMから取得。
    //pCenterは変更しない。pCenterを元にpOfsを補正する。
    //インスタンスを保持しているのなら、利用する必要は皆無。
    //プロパティを上書きするので特別な理由がなければ利用非推奨。
    SVG_Rect.prototype.getUpdate_body = function () {
        var _this = this;
        var d2tf = new D2Transform();
        var a = _DOMAttr_SVG;
        //対象の属性名の値を取得し、Nanの場合は０とする。
        var getNum = function (key) { return parseFloat(_this.getAttr(key)) || 0; };
        d2tf.pOfset = new XYNum(getNum(a._x), getNum(a._y));
        d2tf.pSize = new XYNum(getNum(a._w), getNum(a._h));
        //---pCenterの値に応じて補正を掛ける。
        var cen = this.pD2tf.pCenter;
        d2tf.pOfset.x
            -= (cen.x.unit === _ComUnit._px)
                ? cen.x.val
                : adjust(d2tf.pSize.x, cen.x);
        d2tf.pOfset.y
            -= (cen.y.unit === _ComUnit._px)
                ? cen.y.val
                : adjust(d2tf.pSize.y, cen.y);
        this.pD2tf = d2tf;
    };
    ;
    return SVG_Rect;
}(SVG_Common));
;
var Anchor = /** @class */ (function () {
    function Anchor(arg) {
        if (arg === void 0) { arg = new Vec2D(); }
        this.ofs
            = (arg instanceof XYNum)
                ? arg.toVector()
                : arg;
        var fn = function () { return new Vec2D(); };
        this.head = fn();
        this.tail = fn();
        //###テストする
        this.head.setParent(this);
        this.tail.setParent(this);
    }
    //ハンドルの取得/上書き
    //第一引数で対象ハンドルを指定。
    //値を上書きする場合は第二引数を追加。
    //###オバロする
    Anchor.prototype.handle = function (hndl, val) {
        var obj = (hndl === _AncHndl._head)
            ? this.head
            : this.tail;
        if (val instanceof Vec2D)
            obj = val;
        return obj;
    };
    Anchor.prototype.toXYNum = function () {
        return this.ofs.toXYNum();
    };
    Anchor.prototype.setParent = function (arg) {
        this.pParent = arg;
    };
    //親がいれば、親の座標＋自身の座標を返す。
    //親がいなければ、その座標情報で返す。
    Anchor.prototype.toAbs_XYNum = function () {
        if (isT.unDef(this.pParent))
            return this.toXYNum();
        //XYNumもしくはVec2Dの場合
        return this.pParent.toAbs_XYNum().relative(this.toXYNum());
    };
    //両ハンドルに同じ長さを指定する。
    Anchor.prototype.setBothHndl_dist = function (arg) {
        arg = _NForm._notNega(arg);
        this.head.setDist(arg);
        this.tail.setDist(arg);
    };
    //+++
    Anchor.prototype.setBothHndl_ang = function (a0, a1) {
        if (isT.num(a0) && isEnum(a1, _AngUnit)) {
            var ang = new Angle(a1, a0);
            this.head.setAngle(ang);
            this.tail.setAngle(ang);
            return;
        }
        if (Angle.is(a0)) {
            this.head.setAngle(a0);
            this.tail.setAngle(a0);
            return;
        }
        if (isT.num(a0)) {
            this.head.setAngle(a0);
            this.tail.setAngle(a0);
            return;
        }
    };
    //###適当に作った。あとで汎用化する。
    //単位はdegree
    Anchor.prototype.linear = function (ang, dist) {
        var angle = function () { return new Angle(_AngUnit._degree, ang); };
        var a0 = angle();
        this.head.setAngle(a0);
        this.head.setDist(dist);
        var a1 = angle();
        a1.setAngle(180 + ang); //反転
        this.tail.setAngle(a1);
        this.tail.setDist(dist);
    };
    return Anchor;
}());
var SVG_Path = /** @class */ (function (_super) {
    __extends(SVG_Path, _super);
    //+++
    //オフセット座標を指定可能。
    function SVG_Path(x, y) {
        var _this = _super.call(this, _SVGType._path) || this;
        _this.ofs = new XYNum(x, y);
        _this.pAnchors = [];
        return _this;
    }
    //=== ===
    //パスを構成する為のアンカー情報を追加する。
    //可変長に対応。
    SVG_Path.prototype.append = function (anc) {
        var ancs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            ancs[_i - 1] = arguments[_i];
        }
        ancs.unshift(anc); //先頭に追加。
        for (var _a = 0, ancs_1 = ancs; _a < ancs_1.length; _a++) {
            var anc_2 = ancs_1[_a];
            this.pAnchors.push(anc_2);
            anc_2.setParent(this); //###追記した。テストする
        }
    };
    //DOMからパスの値を取得し、自身のプロパティを上書き。
    SVG_Path.prototype.getUpdate_body = function () {
        Cons.err("実装していません。");
    };
    //DOMの属性値を更新する。
    SVG_Path.prototype.setUpdate_body = function () {
        this.setAttr(_DOMAttr_SVG._d, this.toDataStr());
    };
    //+++
    SVG_Path.prototype.getAnchors = function (arg) {
        if (arg === undef)
            return this.pAnchors;
        if (new Vec1D(arg).isBet(this.pAnchors))
            return this.pAnchors[arg];
        return Cons.err(_Err._isNotRange)
            || new Anchor();
    };
    //###仮実装でletにした部分を直す。
    //パスデータの文字列を返す。
    //最低でもアンカーが３つ以上なければ形状を持たない。
    //	（２つで線分となる）が、エラーにならず、結果を返す。
    SVG_Path.prototype.toDataStr = function () {
        var ancs = this.pAnchors;
        var len = ancs.length;
        var sp = " "; //DOMの属性値の記述に必要なスペース
        var toStr = function (arg) { return arg.toXYStr() + sp; };
        if (len === 0)
            return "";
        //=== ====
        //パス情報の先頭。（始点であり終点）
        var data = "M"
            + toStr(ancs[0].ofs.toXYNum().relative(this.ofs));
        //アンカー情報を回して追加。
        //handle_0が現在の点のハンドルで
        //	終点のハンドルhandle_1を経由して、
        //	終点endPointまでの線分を追加するイメージ。
        for (var _i = 0, _a = range(len); _i < _a.length; _i++) {
            var id = _a[_i];
            var anc_0 = ancs[id];
            var handle_0 = anc_0.handle(_AncHndl._head).toAbs_XYNum();
            //終点側のアンカー。
            //１周したときにパス全体の最初の始点を指す。
            var anc_1 = ancs[(id + 1) % len];
            var endPoint = anc_1.toAbs_XYNum();
            var handle_1 = anc_1.handle(_AncHndl._tail).toAbs_XYNum();
            data
                += "C"
                    + toStr(handle_0)
                    + toStr(handle_1)
                    + toStr(endPoint);
        }
        data += "Z"; //パスを閉じる。
        return data;
    };
    //親は存在しない前提で実装した。
    SVG_Path.prototype.toAbs_XYNum = function () {
        return this.ofs;
    };
    return SVG_Path;
}(SVG_Common));
