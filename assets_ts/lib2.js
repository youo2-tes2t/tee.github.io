"use strict";
//汎用クラスライブラリ
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
//全てのクラスに継承させる？？
// class __Common__{
// 	deepCopy( arg:Object ){
// 		if( ( arg instance of this ) === false ){
// 			err();
// 			return;
// 		}
// 		const keys:str[] = objKeys( this );
// 		keys.map( ( key:str ) => {
// 			this[ key ] = arg[ key ];
// 		});
// 	}
// }
var XYNum = /** @class */ (function () {
    function XYNum(p0, p1) {
        if (p0 === void 0) { p0 = 0; }
        if (p1 === void 0) { p1 = 0; }
        this.x = p0;
        this.y = p1;
    }
    XYNum.is = function (arg) {
        return (arg === XYNum);
    };
    //２値が両方０かどうか。
    XYNum.prototype.isZero = function () {
        return (this.x === 0)
            && (this.y === 0);
    };
    //ラジアン単位の角度値を得る。
    //(0,0)の場合はNaNになるので、0に整形する。
    XYNum.prototype.toAtan = function (unit) {
        return atan(this.y / this.x, unit)
            || 0;
    };
    //２値それぞれの符号を反転
    XYNum.prototype.sgnInvert = function () {
        return new XYNum(-this.x, -this.y);
    };
    //座標xyをカンマ区切りの文字列にして返す。
    XYNum.prototype.toXYStr = function () {
        return String(this.x)
            + ","
            + String(this.y);
    };
    //Vectorクラスに整形したものを返す。
    //単位を受け取る。省略時はラジアン。
    XYNum.prototype.toVector = function (unit) {
        if (unit === void 0) { unit = _AngUnit._radian; }
        var dist = Math.hypot(this.x, this.y);
        var angVal = this.toAtan(unit);
        return new Vec2D(new Angle(unit, angVal), dist);
    };
    //二次元座標を受け取り、
    //自身の持つプロパティからの相対座標として返す。
    //new XYNum( 5, 5 ).relative( 1, -1 )は（6, 4 ）となる。
    XYNum.prototype.relative = function (arg) {
        return new XYNum(this.x + arg.x, this.y + arg.y);
    };
    XYNum.prototype.adapt = function (form) {
        return new XYNum(form(this.x), form(this.y));
    };
    XYNum.prototype.setParent = function (arg) {
        this.pParent = arg;
    };
    //親がいれば、親の座標＋自身の座標を返す。
    //親がいなければ、その座標情報で返す。
    XYNum.prototype.toAbs_XYNum = function () {
        if (isT.unDef(this.pParent))
            return this;
        //XYNumもしくはVec2Dの場合
        return this.pParent.toAbs_XYNum().relative(this);
    };
    return XYNum;
}());
//###全ての数値プロパティをこれに置き換える。
var Vec1D = /** @class */ (function () {
    //+++
    function Vec1D(arg) {
        if (arg === void 0) { arg = 0; }
        this.pVal = arg;
    }
    Vec1D.prototype.getVal = function () {
        return this.pVal;
    };
    Vec1D.prototype.setVal = function (arg) {
        this.pVal = arg;
    };
    Vec1D.prototype.int = function (arg) {
        this.pVal += arg;
    };
    Vec1D.prototype.scaler = function (arg) {
        this.pVal *= arg;
    };
    //+++
    Vec1D.prototype.isBet = function (a0, a1) {
        if (isT.str(a0))
            return this.isBet(0, len(a0) - 1);
        if (isT.array(a0))
            return this.isBet(0, len(a0) - 1);
        if (isT.num(a0) && isT.num(a1))
            return ((this.pVal <= max(a0, a1))
                && (this.pVal >= min(a0, a1)));
        return false;
    };
    return Vec1D;
}());
//値を一つと、その値の単位を区別情報を保持する。
//コンストラクタでは値を受け取り、
//数値型以外の場合、px扱い。
//文字列の場合、
//規定の単位の内いずれか
//である必要がある。
//単位の無い文字列は無効。
var Param = /** @class */ (function () {
    function Param(arg) {
        if (isT.num(arg)) {
            this.unit = _ComUnit._px;
            this.val = arg;
        }
        else {
            arg = arg;
            var unit = unitOf(arg);
            this.unit = unit;
            if (unit === _ComUnit._nothing)
                Cons.err("\u5358\u4F4D\u304C\u6709\u308A\u307E\u305B\u3093\uFF1A" + arg);
            this.val = (unit === _ComUnit._unknown)
                ? Cons.err("\u4E0D\u660E\u306A\u5024\u3067\u3059\uFF1A" + arg) || 0
                : parseFloat(del(arg, unit));
        }
    }
    return Param;
}());
//二次元上でのオブジェクトの原点情報を持つ。
var Cent2D = /** @class */ (function () {
    function Cent2D(x, y) {
        this.x = new Param(x);
        this.y = new Param(y);
    }
    return Cent2D;
}());
//二次元座標における位置、座標、描画の原点を保持する。
var D2Transform = /** @class */ (function () {
    function D2Transform(ofs, size, cen) {
        if (ofs === void 0) { ofs = new XYNum(0, 0); }
        if (size === void 0) { size = new XYNum(1, 1); }
        if (cen === void 0) { cen = new Cent2D("50%", "50%"); }
        this.pOfset = ofs;
        this.pSize = size;
        this.pCenter = cen;
    }
    return D2Transform;
}());
//角度と、その値の単位を保持する。
//保持する値と、その単位はsetされた時のものに依存し、
//getしても、単位が同じであれば誤差は生まれない。
var Angle = /** @class */ (function () {
    //+++
    function Angle(unit, val) {
        this.pUnit
            = unit || _AngUnit._radian;
        this.pAngle
            = val || 0;
    }
    ;
    //=== ===
    Angle.prototype.toRad = function () {
        return (this.pUnit === _AngUnit._radian)
            ? this.pAngle
            : toRad(this.pAngle);
    };
    Angle.prototype.toDeg = function () {
        return (this.pUnit === _AngUnit._degree)
            ? this.pAngle
            : toDeg(this.pAngle);
    };
    //値の取得。
    //引数で単位を指定。
    Angle.prototype.val = function (unit) {
        return (unit === _AngUnit._radian)
            ? this.toRad()
            : this.toDeg();
    };
    Angle.prototype.getAngle = function () {
        return this.pAngle;
    };
    //+++
    Angle.prototype.setAngle = function (a0, a1) {
        if (isT.num(a0)) {
            this.pAngle = a0;
            return;
        }
        if (Angle.is(a0)) {
            this.pAngle = a0.getAngle();
            this.pUnit = a0.getUnit();
            return;
        }
        if (isEnum(a0, _AngUnit) && isT.num(a1)) {
            this.pUnit = a0;
            this.pAngle = a1;
        }
    };
    //###get/setで実装する
    Angle.prototype.getUnit = function () {
        return this.pUnit;
    };
    //単位を変更し、その単位に合うよう角度値も変更する。
    Angle.prototype.setUnit = function (arg) {
        if (arg === this.pUnit)
            return;
        var val = this.val(arg);
        this.pUnit = arg;
        this.pAngle = val;
    };
    Angle.is = function (arg) {
        return (arg instanceof Angle);
    };
    return Angle;
}());
//ベクター。
//方向と量を持つ。
var Vec2D = /** @class */ (function (_super) {
    __extends(Vec2D, _super);
    //+++
    function Vec2D(a0, a1) {
        if (a0 === void 0) { a0 = new Angle(_AngUnit._radian); }
        if (a1 === void 0) { a1 = 0; }
        var _this = _super.call(this, a0.getUnit(), a0.getAngle()) || this;
        // const unit:_AngUnit = a0.getUnit();
        // this.setUnit( unit );
        // this.pAngle = a0.pAngle;
        _this.pDist = a1;
        return _this;
    }
    //二次元座標として表した時の座標値を返す。
    Vec2D.prototype.toXYNum = function () {
        var rad = this.toRad();
        var x = cos(rad) * this.pDist;
        var y = sin(rad) * this.pDist;
        return new XYNum(x, y);
    };
    Vec2D.prototype.toXYStr = function () {
        return this.toXYNum().toXYStr();
    };
    //+++
    Vec2D.prototype.setDist = function (a0, a1) {
        var value = 0;
        if (isT.num(a0))
            value = a0;
        if (isT.num(a1))
            value = a1;
        if (Angle.is(a0)) {
            this.setAngle(a0.getUnit(), a0.getAngle()); //###プロパティを直でコピーできるようにする？
        }
        this.pDist = value;
    };
    //ベクターとしての力量を持つかどうか。
    //つまり、コントロールポイントとして作用する場合に真。
    Vec2D.prototype.isAct = function () {
        return this.pDist !== 0;
    };
    Vec2D.prototype.setParent = function (arg) {
        this.pParent = arg;
    };
    //親がいれば、親の座標＋自身の座標を返す。
    //親がいなければ、その座標情報で返す。
    Vec2D.prototype.toAbs_XYNum = function () {
        if (isT.unDef(this.pParent))
            return this.toXYNum();
        //XYNumもしくはVec2Dの場合
        return this.pParent.toAbs_XYNum().relative(this.toXYNum());
    };
    return Vec2D;
}(Angle));
