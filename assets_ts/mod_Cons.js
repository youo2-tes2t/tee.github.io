"use strict";
//コンソール出力を制御。
var Cons;
(function (Cons) {
    //出力の有無。
    var flg_output = true;
    //エラー時に停止させるかどうか。###実装してない
    var flg_stop = false;
    //出力回数の制限。0以下で無出力。
    var limit_log = 32, limit_err = 32;
    //出力回数のカウント。
    var cnt_log = 0, cnt_err = 0;
    //通常のログ
    function log(a0) {
        var a1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            a1[_i - 1] = arguments[_i];
        }
        if (flg_output === false)
            return;
        cnt_log++;
        if (cnt_log > limit_log)
            return;
        a1.unshift(a0);
        a1.map(function (arg) {
            console.log(arg);
        });
    }
    Cons.log = log;
    //この関数の呼び出し元の関数がhogeとして、それが
    //値を返す関数で、エラー処理の為にreturn errLog( mes );
    //と書いておけば、val = hoge( * )|0;
    //のように記述出来る。
    //toType系関数での利用を推奨。
    function err(argMes) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (flg_output === false)
            return;
        cnt_err++;
        if (cnt_err < limit_err)
            console.log(argMes);
        return undef;
    }
    Cons.err = err;
})(Cons || (Cons = {})); //module化ここまで
