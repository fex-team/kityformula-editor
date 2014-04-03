/*!
 * ====================================================
 * Kity Formula - v1.0.0 - 2014-04-03
 * https://github.com/kitygraph/formula
 * GitHub: https://github.com/kitygraph/formula.git 
 * Copyright (c) 2014 Baidu Kity Group; Licensed MIT
 * ====================================================
 */

(function () {
/**
 * cmd 内部定义
 * build用
 */

// 模块存储
var _modules = {};

function define ( id, deps, factory ) {

    _modules[ id ] = {

        exports: {},
        value: null,
        factory: null

    };

    if ( arguments.length === 2 ) {

        factory = deps;

    }

    if ( _modules.toString.call( factory ) === '[object Object]' ) {

        _modules[ id ][ 'value' ] = factory;

    } else if ( typeof factory === 'function' ) {

        _modules[ id ][ 'factory' ] = factory;

    } else {

        throw new Error( 'define函数未定义的行为' );

    }

}

function require ( id ) {

    var module = _modules[ id ],
        exports = null;

    if ( !module ) {

        return null;

    }

    if ( module.value ) {

        return module.value;

    }

    exports = module.factory.call( null, require, module.exports, module );

    // return 值不为空， 则以return值为最终值
    if ( exports ) {

        module.exports = exports;

    }

    module.value = module.exports;

    return module.value;

}

function use ( id ) {

    return require( id );

}
/**
 * 字符类
 */
define("char/char", [ "kity", "char/data", "char/data/number/0", "char/data/number/1", "char/data/number/2", "char/data/number/3", "char/data/number/4", "char/data/number/5", "char/data/number/6", "char/data/number/7", "char/data/number/8", "char/data/number/9", "char/data/character/a", "char/data/character/b", "char/data/character/c", "char/data/character/d", "char/data/character/e", "char/data/character/f", "char/data/character/g", "char/data/character/h", "char/data/character/i", "char/data/character/j", "char/data/character/k", "char/data/character/l", "char/data/character/m", "char/data/character/n", "char/data/character/o", "char/data/character/p", "char/data/character/q", "char/data/character/r", "char/data/character/s", "char/data/character/t", "char/data/character/u", "char/data/character/v", "char/data/character/w", "char/data/character/x", "char/data/character/y", "char/data/character/z", "char/data/character/ua", "char/data/character/ub", "char/data/character/uc", "char/data/character/ud", "char/data/character/ue", "char/data/character/uf", "char/data/character/ug", "char/data/character/uh", "char/data/character/ui", "char/data/character/uj", "char/data/character/uk", "char/data/character/ul", "char/data/character/um", "char/data/character/un", "char/data/character/uo", "char/data/character/up", "char/data/character/uq", "char/data/character/ur", "char/data/character/us", "char/data/character/ut", "char/data/character/uu", "char/data/character/uv", "char/data/character/uw", "char/data/character/ux", "char/data/character/uy", "char/data/character/uz", "char/data/symbol/base/l-parentheses", "char/data/symbol/base/r-parentheses", "char/data/symbol/base/negative", "char/data/symbol/relational/eq", "char/data/symbol/base/positive", "char/data/symbol/base/vertical", "char/data/symbol/base/slash", "char/data/symbol/base/exclamation", "char/data/symbol/base/l-brackets", "char/data/symbol/base/r-brackets", "char/data/symbol/base/colon", "char/data/symbol/base/quotation", "char/data/symbol/relational/lt", "char/data/symbol/relational/gt", "char/data/symbol/base/point", "char/data/symbol/base/l-braces", "char/data/symbol/base/r-braces", "char/data/symbol/base/comma", "char/data/symbol/base/times", "char/data/symbol/base/div", "char/data/symbol/base/pm", "char/data/symbol/base/mp", "char/data/symbol/base/ast", "char/data/symbol/base/cdot", "char/data/symbol/base/cdots", "char/data/symbol/base/ddots", "char/data/symbol/base/ldots", "char/data/symbol/base/vdots", "char/data/symbol/base/wedge", "char/data/symbol/base/vee", "char/data/symbol/base/mid", "char/data/symbol/relational/approx", "char/data/symbol/relational/equiv", "char/data/symbol/relational/geq", "char/data/symbol/relational/gg", "char/data/symbol/relational/leq", "char/data/symbol/relational/ll", "char/data/symbol/relational/sim", "char/data/symbol/relational/simeq", "char/data/symbol/set/cap", "char/data/symbol/set/cup", "char/data/symbol/set/in", "char/data/symbol/set/ni", "char/data/symbol/set/sqcap", "char/data/symbol/set/sqcup", "char/data/symbol/set/sqsubset", "char/data/symbol/set/sqsubseteq", "char/data/symbol/set/sqsupset", "char/data/symbol/set/sqsupseteq", "char/data/symbol/set/subset", "char/data/symbol/set/subseteq", "char/data/symbol/set/supset", "char/data/symbol/set/supseteq", "char/data/symbol/not/ncong", "char/data/symbol/not/neq", "char/data/symbol/not/nequiv", "char/data/symbol/not/nge", "char/data/symbol/not/ngt", "char/data/symbol/not/nlt", "char/data/symbol/not/nle", "char/data/symbol/not/nsim", "char/data/symbol/not/nsubseteq", "char/data/symbol/not/nsupseteq", "char/data/symbol/not/nin", "char/data/symbol/base/infty", "char/data/symbol/base/to", "char/data/greek/alpha", "char/data/greek/beta", "char/data/greek/gamma", "char/data/greek/delta", "char/data/greek/epsilon", "char/data/greek/varepsilon", "char/data/greek/zeta", "char/data/greek/eta", "char/data/greek/theta", "char/data/greek/iota", "char/data/greek/kappa", "char/data/greek/lambda", "char/data/greek/mu", "char/data/greek/nu", "char/data/greek/xi", "char/data/greek/pi", "char/data/greek/rho", "char/data/greek/sigma", "char/data/greek/tau", "char/data/greek/upsilon", "char/data/greek/phi", "char/data/greek/varphi", "char/data/greek/chi", "char/data/greek/psi", "char/data/greek/omega", "char/data/roman/ua", "char/data/roman/ub", "char/data/greek/u-gamma", "char/data/greek/u-delta", "char/data/roman/ue", "char/data/roman/uz", "char/data/roman/uh", "char/data/greek/u-theta", "char/data/roman/ui", "char/data/roman/uk", "char/data/greek/u-lambda", "char/data/roman/um", "char/data/roman/un", "char/data/greek/u-xi", "char/data/roman/uo", "char/data/greek/u-pi", "char/data/roman/up", "char/data/greek/u-sigma", "char/data/roman/ut", "char/data/greek/u-upsilon", "char/data/greek/u-phi", "char/data/roman/ux", "char/data/greek/u-psi", "char/data/greek/u-omega", "char/data/roman/a", "char/data/roman/b", "char/data/roman/c", "char/data/roman/d", "char/data/roman/e", "char/data/roman/f", "char/data/roman/g", "char/data/roman/h", "char/data/roman/i", "char/data/roman/j", "char/data/roman/k", "char/data/roman/l", "char/data/roman/m", "char/data/roman/n", "char/data/roman/o", "char/data/roman/p", "char/data/roman/q", "char/data/roman/r", "char/data/roman/s", "char/data/roman/t", "char/data/roman/u", "char/data/roman/v", "char/data/roman/w", "char/data/roman/x", "char/data/roman/y", "char/data/roman/z", "char/data/roman/uc", "char/data/roman/ud", "char/data/roman/uf", "char/data/roman/ug", "char/data/roman/uj", "char/data/roman/ul", "char/data/roman/uq", "char/data/roman/ur", "char/data/roman/us", "char/data/roman/uu", "char/data/roman/uv", "char/data/roman/uw", "char/data/roman/uy", "signgroup", "def/gtype" ], function(require, exports, module) {
    var kity = require("kity"), CHAR_DATA = require("char/data");
    return kity.createClass("Char", {
        base: require("signgroup"),
        constructor: function(value, type) {
            var currentData;
            // 默认是标准字体
            type = type || "std";
            currentData = CHAR_DATA[type][value];
            if (!currentData) {
                currentData = CHAR_DATA["std"][value];
            }
            if (!currentData) {
                throw new Error("invalid character: " + value);
            }
            this.callBase();
            this.value = value;
            this.contentShape = new kity.Group();
            this.box = new kity.Rect(currentData.size[0] + currentData.offset.x * 2, currentData.size[1]).fill("transparent");
            this.char = new kity.Path(currentData.path).fill("black");
            this.char.translate(currentData.offset.x, currentData.offset.y);
            this.contentShape.addShape(this.box);
            this.contentShape.addShape(this.char);
            this.addShape(this.contentShape);
        },
        getBaseWidth: function() {
            return this.char.getWidth();
        },
        getBaseHeight: function() {
            return this.char.getHeight();
        },
        getBoxWidth: function() {
            return this.box.getWidth();
        }
    });
});
/**
 * 字符与pathdata映射
 */
define("char/data", [ "char/data/number/0", "char/data/number/1", "char/data/number/2", "char/data/number/3", "char/data/number/4", "char/data/number/5", "char/data/number/6", "char/data/number/7", "char/data/number/8", "char/data/number/9", "char/data/character/a", "char/data/character/b", "char/data/character/c", "char/data/character/d", "char/data/character/e", "char/data/character/f", "char/data/character/g", "char/data/character/h", "char/data/character/i", "char/data/character/j", "char/data/character/k", "char/data/character/l", "char/data/character/m", "char/data/character/n", "char/data/character/o", "char/data/character/p", "char/data/character/q", "char/data/character/r", "char/data/character/s", "char/data/character/t", "char/data/character/u", "char/data/character/v", "char/data/character/w", "char/data/character/x", "char/data/character/y", "char/data/character/z", "char/data/character/ua", "char/data/character/ub", "char/data/character/uc", "char/data/character/ud", "char/data/character/ue", "char/data/character/uf", "char/data/character/ug", "char/data/character/uh", "char/data/character/ui", "char/data/character/uj", "char/data/character/uk", "char/data/character/ul", "char/data/character/um", "char/data/character/un", "char/data/character/uo", "char/data/character/up", "char/data/character/uq", "char/data/character/ur", "char/data/character/us", "char/data/character/ut", "char/data/character/uu", "char/data/character/uv", "char/data/character/uw", "char/data/character/ux", "char/data/character/uy", "char/data/character/uz", "char/data/symbol/base/l-parentheses", "char/data/symbol/base/r-parentheses", "char/data/symbol/base/negative", "char/data/symbol/relational/eq", "char/data/symbol/base/positive", "char/data/symbol/base/vertical", "char/data/symbol/base/slash", "char/data/symbol/base/exclamation", "char/data/symbol/base/l-brackets", "char/data/symbol/base/r-brackets", "char/data/symbol/base/colon", "char/data/symbol/base/quotation", "char/data/symbol/relational/lt", "char/data/symbol/relational/gt", "char/data/symbol/base/point", "char/data/symbol/base/l-braces", "char/data/symbol/base/r-braces", "char/data/symbol/base/comma", "char/data/symbol/base/times", "char/data/symbol/base/div", "char/data/symbol/base/pm", "char/data/symbol/base/mp", "char/data/symbol/base/ast", "char/data/symbol/base/cdot", "char/data/symbol/base/cdots", "char/data/symbol/base/ddots", "char/data/symbol/base/ldots", "char/data/symbol/base/vdots", "char/data/symbol/base/wedge", "char/data/symbol/base/vee", "char/data/symbol/base/mid", "char/data/symbol/relational/approx", "char/data/symbol/relational/equiv", "char/data/symbol/relational/geq", "char/data/symbol/relational/gg", "char/data/symbol/relational/leq", "char/data/symbol/relational/ll", "char/data/symbol/relational/sim", "char/data/symbol/relational/simeq", "char/data/symbol/set/cap", "char/data/symbol/set/cup", "char/data/symbol/set/in", "char/data/symbol/set/ni", "char/data/symbol/set/sqcap", "char/data/symbol/set/sqcup", "char/data/symbol/set/sqsubset", "char/data/symbol/set/sqsubseteq", "char/data/symbol/set/sqsupset", "char/data/symbol/set/sqsupseteq", "char/data/symbol/set/subset", "char/data/symbol/set/subseteq", "char/data/symbol/set/supset", "char/data/symbol/set/supseteq", "char/data/symbol/not/ncong", "char/data/symbol/not/neq", "char/data/symbol/not/nequiv", "char/data/symbol/not/nge", "char/data/symbol/not/ngt", "char/data/symbol/not/nlt", "char/data/symbol/not/nle", "char/data/symbol/not/nsim", "char/data/symbol/not/nsubseteq", "char/data/symbol/not/nsupseteq", "char/data/symbol/not/nin", "char/data/symbol/base/infty", "char/data/symbol/base/to", "char/data/greek/alpha", "char/data/greek/beta", "char/data/greek/gamma", "char/data/greek/delta", "char/data/greek/epsilon", "char/data/greek/varepsilon", "char/data/greek/zeta", "char/data/greek/eta", "char/data/greek/theta", "char/data/greek/iota", "char/data/greek/kappa", "char/data/greek/lambda", "char/data/greek/mu", "char/data/greek/nu", "char/data/greek/xi", "char/data/greek/pi", "char/data/greek/rho", "char/data/greek/sigma", "char/data/greek/tau", "char/data/greek/upsilon", "char/data/greek/phi", "char/data/greek/varphi", "char/data/greek/chi", "char/data/greek/psi", "char/data/greek/omega", "char/data/roman/ua", "char/data/roman/ub", "char/data/greek/u-gamma", "char/data/greek/u-delta", "char/data/roman/ue", "char/data/roman/uz", "char/data/roman/uh", "char/data/greek/u-theta", "char/data/roman/ui", "char/data/roman/uk", "char/data/greek/u-lambda", "char/data/roman/um", "char/data/roman/un", "char/data/greek/u-xi", "char/data/roman/uo", "char/data/greek/u-pi", "char/data/roman/up", "char/data/greek/u-sigma", "char/data/roman/ut", "char/data/greek/u-upsilon", "char/data/greek/u-phi", "char/data/roman/ux", "char/data/greek/u-psi", "char/data/greek/u-omega", "char/data/roman/a", "char/data/roman/b", "char/data/roman/c", "char/data/roman/d", "char/data/roman/e", "char/data/roman/f", "char/data/roman/g", "char/data/roman/h", "char/data/roman/i", "char/data/roman/j", "char/data/roman/k", "char/data/roman/l", "char/data/roman/m", "char/data/roman/n", "char/data/roman/o", "char/data/roman/p", "char/data/roman/q", "char/data/roman/r", "char/data/roman/s", "char/data/roman/t", "char/data/roman/u", "char/data/roman/v", "char/data/roman/w", "char/data/roman/x", "char/data/roman/y", "char/data/roman/z", "char/data/roman/uc", "char/data/roman/ud", "char/data/roman/uf", "char/data/roman/ug", "char/data/roman/uj", "char/data/roman/ul", "char/data/roman/uq", "char/data/roman/ur", "char/data/roman/us", "char/data/roman/uu", "char/data/roman/uv", "char/data/roman/uw", "char/data/roman/uy" ], function(require, exports, module) {
    return {
        // 标准字体
        std: {
            // number
            0: require("char/data/number/0"),
            1: require("char/data/number/1"),
            2: require("char/data/number/2"),
            3: require("char/data/number/3"),
            4: require("char/data/number/4"),
            5: require("char/data/number/5"),
            6: require("char/data/number/6"),
            7: require("char/data/number/7"),
            8: require("char/data/number/8"),
            9: require("char/data/number/9"),
            // character
            a: require("char/data/character/a"),
            b: require("char/data/character/b"),
            c: require("char/data/character/c"),
            d: require("char/data/character/d"),
            e: require("char/data/character/e"),
            f: require("char/data/character/f"),
            g: require("char/data/character/g"),
            h: require("char/data/character/h"),
            i: require("char/data/character/i"),
            j: require("char/data/character/j"),
            k: require("char/data/character/k"),
            l: require("char/data/character/l"),
            m: require("char/data/character/m"),
            n: require("char/data/character/n"),
            o: require("char/data/character/o"),
            p: require("char/data/character/p"),
            q: require("char/data/character/q"),
            r: require("char/data/character/r"),
            s: require("char/data/character/s"),
            t: require("char/data/character/t"),
            u: require("char/data/character/u"),
            v: require("char/data/character/v"),
            w: require("char/data/character/w"),
            x: require("char/data/character/x"),
            y: require("char/data/character/y"),
            z: require("char/data/character/z"),
            A: require("char/data/character/ua"),
            B: require("char/data/character/ub"),
            C: require("char/data/character/uc"),
            D: require("char/data/character/ud"),
            E: require("char/data/character/ue"),
            F: require("char/data/character/uf"),
            G: require("char/data/character/ug"),
            H: require("char/data/character/uh"),
            I: require("char/data/character/ui"),
            J: require("char/data/character/uj"),
            K: require("char/data/character/uk"),
            L: require("char/data/character/ul"),
            M: require("char/data/character/um"),
            N: require("char/data/character/un"),
            O: require("char/data/character/uo"),
            P: require("char/data/character/up"),
            Q: require("char/data/character/uq"),
            R: require("char/data/character/ur"),
            S: require("char/data/character/us"),
            T: require("char/data/character/ut"),
            U: require("char/data/character/uu"),
            V: require("char/data/character/uv"),
            W: require("char/data/character/uw"),
            X: require("char/data/character/ux"),
            Y: require("char/data/character/uy"),
            Z: require("char/data/character/uz"),
            // symbol
            "(": require("char/data/symbol/base/l-parentheses"),
            ")": require("char/data/symbol/base/r-parentheses"),
            "-": require("char/data/symbol/base/negative"),
            "=": require("char/data/symbol/relational/eq"),
            "+": require("char/data/symbol/base/positive"),
            "|": require("char/data/symbol/base/vertical"),
            "/": require("char/data/symbol/base/slash"),
            "!": require("char/data/symbol/base/exclamation"),
            "[": require("char/data/symbol/base/l-brackets"),
            "]": require("char/data/symbol/base/r-brackets"),
            ":": require("char/data/symbol/base/colon"),
            "'": require("char/data/symbol/base/quotation"),
            "<": require("char/data/symbol/relational/lt"),
            ">": require("char/data/symbol/relational/gt"),
            ".": require("char/data/symbol/base/point"),
            "{": require("char/data/symbol/base/l-braces"),
            "}": require("char/data/symbol/base/r-braces"),
            ",": require("char/data/symbol/base/comma"),
            "\\times\\": require("char/data/symbol/base/times"),
            "\\div\\": require("char/data/symbol/base/div"),
            "\\pm\\": require("char/data/symbol/base/pm"),
            "\\mp\\": require("char/data/symbol/base/mp"),
            "\\ast\\": require("char/data/symbol/base/ast"),
            "\\cdot\\": require("char/data/symbol/base/cdot"),
            "\\cdots\\": require("char/data/symbol/base/cdots"),
            "\\ddots\\": require("char/data/symbol/base/ddots"),
            "\\ldots\\": require("char/data/symbol/base/ldots"),
            "\\vdots\\": require("char/data/symbol/base/vdots"),
            "\\wedge\\": require("char/data/symbol/base/wedge"),
            "\\vee\\": require("char/data/symbol/base/vee"),
            "\\mid\\": require("char/data/symbol/base/mid"),
            // relational symbol
            "\\approx\\": require("char/data/symbol/relational/approx"),
            "\\eq\\": require("char/data/symbol/relational/eq"),
            "\\equiv\\": require("char/data/symbol/relational/equiv"),
            "\\geq\\": require("char/data/symbol/relational/geq"),
            "\\gg\\": require("char/data/symbol/relational/gg"),
            "\\gt\\": require("char/data/symbol/relational/gt"),
            "\\leq\\": require("char/data/symbol/relational/leq"),
            "\\ll\\": require("char/data/symbol/relational/ll"),
            "\\lt\\": require("char/data/symbol/relational/lt"),
            "\\sim\\": require("char/data/symbol/relational/sim"),
            "\\simeq\\": require("char/data/symbol/relational/simeq"),
            //set symbol
            "\\cap\\": require("char/data/symbol/set/cap"),
            "\\cup\\": require("char/data/symbol/set/cup"),
            "\\in\\": require("char/data/symbol/set/in"),
            "\\ni\\": require("char/data/symbol/set/ni"),
            "\\sqcap\\": require("char/data/symbol/set/sqcap"),
            "\\sqcup\\": require("char/data/symbol/set/sqcup"),
            "\\sqsubset\\": require("char/data/symbol/set/sqsubset"),
            "\\sqsubseteq\\": require("char/data/symbol/set/sqsubseteq"),
            "\\sqsupset\\": require("char/data/symbol/set/sqsupset"),
            "\\sqsupseteq\\": require("char/data/symbol/set/sqsupseteq"),
            "\\subset\\": require("char/data/symbol/set/subset"),
            "\\subseteq\\": require("char/data/symbol/set/subseteq"),
            "\\supset\\": require("char/data/symbol/set/supset"),
            "\\supseteq\\": require("char/data/symbol/set/supseteq"),
            // not symbol
            "\\ncong\\": require("char/data/symbol/not/ncong"),
            "\\neq\\": require("char/data/symbol/not/neq"),
            "\\nequiv\\": require("char/data/symbol/not/nequiv"),
            "\\nge\\": require("char/data/symbol/not/nge"),
            "\\ngt\\": require("char/data/symbol/not/ngt"),
            "\\nlt\\": require("char/data/symbol/not/nlt"),
            "\\nle\\": require("char/data/symbol/not/nle"),
            "\\nsim\\": require("char/data/symbol/not/nsim"),
            "\\nsubseteq\\": require("char/data/symbol/not/nsubseteq"),
            "\\nsupseteq\\": require("char/data/symbol/not/nsupseteq"),
            "\\nin\\": require("char/data/symbol/not/nin"),
            // arrow symbol
            "\\infty\\": require("char/data/symbol/base/infty"),
            "∞": require("char/data/symbol/base/infty"),
            "\\to\\": require("char/data/symbol/base/to"),
            // greek
            "α": require("char/data/greek/alpha"),
            "\\alpha\\": require("char/data/greek/alpha"),
            "β": require("char/data/greek/alpha"),
            "\\beta\\": require("char/data/greek/beta"),
            "γ": require("char/data/greek/gamma"),
            "\\gamma\\": require("char/data/greek/gamma"),
            "δ": require("char/data/greek/delta"),
            "\\delta\\": require("char/data/greek/delta"),
            "ϵ": require("char/data/greek/epsilon"),
            "\\epsilon\\": require("char/data/greek/epsilon"),
            "ε": require("char/data/greek/varepsilon"),
            "\\varepsilon\\": require("char/data/greek/varepsilon"),
            "ζ": require("char/data/greek/zeta"),
            "\\zeta\\": require("char/data/greek/zeta"),
            "η": require("char/data/greek/eta"),
            "\\eta\\": require("char/data/greek/eta"),
            "θ": require("char/data/greek/theta"),
            "\\theta\\": require("char/data/greek/theta"),
            "ι": require("char/data/greek/iota"),
            "\\iota\\": require("char/data/greek/iota"),
            "κ": require("char/data/greek/kappa"),
            "\\kappa\\": require("char/data/greek/kappa"),
            "λ": require("char/data/greek/lambda"),
            "\\lambda\\": require("char/data/greek/lambda"),
            "μ": require("char/data/greek/mu"),
            "\\mu\\": require("char/data/greek/mu"),
            "ν": require("char/data/greek/nu"),
            "\\nu\\": require("char/data/greek/nu"),
            "ξ": require("char/data/greek/xi"),
            "\\xi\\": require("char/data/greek/xi"),
            "ο": require("char/data/character/o"),
            "\\omicron\\": require("char/data/character/o"),
            "π": require("char/data/greek/pi"),
            "\\pi\\": require("char/data/greek/pi"),
            "ρ": require("char/data/greek/rho"),
            "\\rho\\": require("char/data/greek/rho"),
            "σ": require("char/data/greek/sigma"),
            "\\sigma\\": require("char/data/greek/sigma"),
            "τ": require("char/data/greek/tau"),
            "\\tau\\": require("char/data/greek/tau"),
            "υ": require("char/data/greek/upsilon"),
            "\\upsilon\\": require("char/data/greek/upsilon"),
            "ф": require("char/data/greek/phi"),
            "\\phi\\": require("char/data/greek/phi"),
            "φ": require("char/data/greek/varphi"),
            "\\varphi\\": require("char/data/greek/varphi"),
            "χ": require("char/data/greek/chi"),
            "\\chi\\": require("char/data/greek/chi"),
            "ψ": require("char/data/greek/psi"),
            "\\psi\\": require("char/data/greek/psi"),
            "ω": require("char/data/greek/omega"),
            "\\omega\\": require("char/data/greek/omega"),
            "Α": require("char/data/roman/ua"),
            "\\Alpha\\": require("char/data/roman/ua"),
            "Β": require("char/data/roman/ub"),
            "\\Beta\\": require("char/data/roman/ub"),
            "Γ": require("char/data/greek/u-gamma"),
            "\\Gamma\\": require("char/data/greek/u-gamma"),
            "Δ": require("char/data/greek/u-delta"),
            "\\Delta\\": require("char/data/greek/u-delta"),
            "Ε": require("char/data/roman/ue"),
            "\\Epsilon\\": require("char/data/roman/ue"),
            "Ζ": require("char/data/roman/uz"),
            "\\Zeta\\": require("char/data/roman/uz"),
            "Η": require("char/data/roman/uh"),
            "\\Eta\\": require("char/data/roman/uh"),
            "Θ": require("char/data/greek/u-theta"),
            "\\Theta\\": require("char/data/greek/u-theta"),
            "Ι": require("char/data/roman/ui"),
            "\\Iota\\": require("char/data/roman/ui"),
            "Κ": require("char/data/roman/uk"),
            "\\Kappa\\": require("char/data/roman/uk"),
            "Λ": require("char/data/greek/u-lambda"),
            "\\Lambda\\": require("char/data/greek/u-lambda"),
            "Μ": require("char/data/roman/um"),
            "\\Mu\\": require("char/data/roman/um"),
            "Ν": require("char/data/roman/un"),
            "\\Nu\\": require("char/data/roman/un"),
            "Ξ": require("char/data/greek/u-xi"),
            "\\Xi\\": require("char/data/greek/u-xi"),
            "Ο": require("char/data/roman/uo"),
            "\\Omicron\\": require("char/data/roman/uo"),
            "Π": require("char/data/greek/u-pi"),
            "\\Pi\\": require("char/data/greek/u-pi"),
            "Ρ": require("char/data/roman/up"),
            "\\Rho\\": require("char/data/roman/up"),
            "Σ": require("char/data/greek/u-sigma"),
            "\\Sigma\\": require("char/data/greek/u-sigma"),
            "Τ": require("char/data/roman/ut"),
            "\\Tau\\": require("char/data/roman/ut"),
            "Υ": require("char/data/greek/u-upsilon"),
            "\\Upsilon\\": require("char/data/greek/u-upsilon"),
            "Φ": require("char/data/greek/u-phi"),
            "\\Phi\\": require("char/data/greek/u-phi"),
            "Χ": require("char/data/roman/ux"),
            "\\Chi\\": require("char/data/roman/ux"),
            "Ψ": require("char/data/greek/u-psi"),
            "\\Psi\\": require("char/data/greek/u-psi"),
            "Ω": require("char/data/greek/u-omega"),
            "\\Omega\\": require("char/data/greek/u-omega")
        },
        // 罗马字体
        roman: {
            a: require("char/data/roman/a"),
            b: require("char/data/roman/b"),
            c: require("char/data/roman/c"),
            d: require("char/data/roman/d"),
            e: require("char/data/roman/e"),
            f: require("char/data/roman/f"),
            g: require("char/data/roman/g"),
            h: require("char/data/roman/h"),
            i: require("char/data/roman/i"),
            j: require("char/data/roman/j"),
            k: require("char/data/roman/k"),
            l: require("char/data/roman/l"),
            m: require("char/data/roman/m"),
            n: require("char/data/roman/n"),
            o: require("char/data/roman/o"),
            p: require("char/data/roman/p"),
            q: require("char/data/roman/q"),
            r: require("char/data/roman/r"),
            s: require("char/data/roman/s"),
            t: require("char/data/roman/t"),
            u: require("char/data/roman/u"),
            v: require("char/data/roman/v"),
            w: require("char/data/roman/w"),
            x: require("char/data/roman/x"),
            y: require("char/data/roman/y"),
            z: require("char/data/roman/z"),
            A: require("char/data/roman/ua"),
            B: require("char/data/roman/ub"),
            C: require("char/data/roman/uc"),
            D: require("char/data/roman/ud"),
            E: require("char/data/roman/ue"),
            F: require("char/data/roman/uf"),
            G: require("char/data/roman/ug"),
            H: require("char/data/roman/uh"),
            I: require("char/data/roman/ui"),
            J: require("char/data/roman/uj"),
            K: require("char/data/roman/uk"),
            L: require("char/data/roman/ul"),
            M: require("char/data/roman/um"),
            N: require("char/data/roman/un"),
            O: require("char/data/roman/uo"),
            P: require("char/data/roman/up"),
            Q: require("char/data/roman/uq"),
            R: require("char/data/roman/ur"),
            S: require("char/data/roman/us"),
            T: require("char/data/roman/ut"),
            U: require("char/data/roman/uu"),
            V: require("char/data/roman/uv"),
            W: require("char/data/roman/uw"),
            X: require("char/data/roman/ux"),
            Y: require("char/data/roman/uy"),
            Z: require("char/data/roman/uz")
        }
    };
});
/**
 * 字符data: a
 */
define("char/data/character/a", [], {
    path: "M3.094,17.367c-0.664,0-1.229-0.18-1.693-0.539s-0.814-0.824-1.049-1.395S0,14.254,0,13.605   c0-0.75,0.148-1.539,0.445-2.367S1.15,9.643,1.67,8.936s1.131-1.281,1.834-1.723s1.438-0.662,2.203-0.662   c0.461,0,0.879,0.139,1.254,0.416s0.66,0.643,0.855,1.096c0.102-0.352,0.225-0.615,0.369-0.791s0.369-0.264,0.674-0.264   c0.18,0,0.332,0.055,0.457,0.164s0.188,0.262,0.188,0.457c0,0.094-0.008,0.156-0.023,0.188L7.793,14.59   c-0.109,0.453-0.164,0.836-0.164,1.148c0,0.703,0.242,1.055,0.727,1.055c0.352,0,0.648-0.182,0.891-0.545s0.422-0.736,0.539-1.119   s0.246-0.875,0.387-1.477c0.039-0.109,0.098-0.164,0.176-0.164h0.281c0.047,0,0.086,0.023,0.117,0.07s0.047,0.102,0.047,0.164   c-0.258,1.086-0.555,1.965-0.891,2.637s-0.871,1.008-1.605,1.008c-0.539,0-1.01-0.16-1.412-0.48s-0.643-0.75-0.721-1.289   c-0.422,0.508-0.898,0.93-1.43,1.266S3.656,17.367,3.094,17.367z M3.141,16.793c0.391,0,0.779-0.111,1.166-0.334   s0.74-0.506,1.061-0.85s0.594-0.691,0.82-1.043c0.016,0,0.023-0.016,0.023-0.047l1.324-5.262C7.434,8.672,7.229,8.17,6.92,7.752   S6.191,7.125,5.66,7.125c-0.805,0-1.512,0.449-2.121,1.348s-1.08,1.949-1.412,3.152s-0.498,2.199-0.498,2.988   c0,0.555,0.123,1.057,0.369,1.506S2.625,16.793,3.141,16.793z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 字符data: b
 */
define("char/data/character/b", [], {
    path: "M2.953,17.367c-0.648,0-1.195-0.18-1.641-0.539S0.537,16,0.322,15.422S0,14.254,0,13.652c0-0.813,0.074-1.395,0.223-1.746   l2.32-9.293C2.621,2.262,2.66,2.047,2.66,1.969c0-0.289-0.512-0.434-1.535-0.434c-0.047,0-0.09-0.029-0.129-0.088   S0.938,1.328,0.938,1.266l0.094-0.375C1.063,0.789,1.129,0.738,1.23,0.738L4.371,0.48c0.156,0,0.234,0.078,0.234,0.234L2.813,7.969   c0.875-0.945,1.785-1.418,2.73-1.418c0.664,0,1.229,0.18,1.693,0.539s0.814,0.822,1.049,1.389s0.352,1.178,0.352,1.834   c0,0.742-0.145,1.523-0.434,2.344s-0.697,1.592-1.225,2.314s-1.137,1.303-1.828,1.74S3.727,17.367,2.953,17.367z M2.977,16.793   c0.813,0,1.52-0.451,2.121-1.354s1.066-1.959,1.395-3.17s0.492-2.199,0.492-2.965c0-0.578-0.115-1.086-0.346-1.523   S6.027,7.125,5.496,7.125c-0.57,0-1.119,0.217-1.646,0.65s-0.994,0.959-1.4,1.576l-0.645,2.625V12   c-0.25,0.945-0.387,1.77-0.41,2.473c0,0.594,0.129,1.129,0.387,1.605S2.438,16.793,2.977,16.793z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 9, 27 ]
});
/**
 * 字符data: c
 */
define("char/data/character/c", [], {
    path: "M1.699,14.25c0,0.695,0.176,1.293,0.527,1.793s0.863,0.75,1.535,0.75c0.945,0,1.852-0.227,2.719-0.68   s1.586-1.066,2.156-1.84c0.016-0.031,0.063-0.047,0.141-0.047c0.086,0,0.164,0.039,0.234,0.117s0.105,0.152,0.105,0.223   c0,0.047-0.008,0.078-0.023,0.094c-0.406,0.555-0.891,1.035-1.453,1.441s-1.18,0.719-1.852,0.938s-1.363,0.328-2.074,0.328   c-0.727,0-1.373-0.176-1.939-0.527s-1.004-0.834-1.313-1.447S0,14.113,0,13.395c0-0.805,0.17-1.617,0.51-2.438   s0.807-1.564,1.4-2.232s1.271-1.197,2.033-1.588s1.549-0.586,2.361-0.586c0.43,0,0.861,0.074,1.295,0.223S8.387,7.146,8.66,7.447   S9.07,8.129,9.07,8.59c0,0.391-0.119,0.736-0.357,1.037S8.16,10.078,7.77,10.078c-0.227,0-0.422-0.074-0.586-0.223   s-0.246-0.34-0.246-0.574c0-0.344,0.121-0.637,0.363-0.879S7.836,8.039,8.18,8.039h0.094C8.109,7.711,7.846,7.477,7.482,7.336   S6.719,7.125,6.281,7.125c-0.93,0-1.744,0.398-2.443,1.195s-1.23,1.756-1.594,2.877S1.699,13.336,1.699,14.25z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 字符data: d
 */
define("char/data/character/d", [], {
    path: "M3.094,17.367c-0.664,0-1.229-0.18-1.693-0.539s-0.814-0.824-1.049-1.395S0,14.254,0,13.605   c0-0.75,0.148-1.539,0.445-2.367S1.15,9.643,1.67,8.936s1.131-1.281,1.834-1.723s1.438-0.662,2.203-0.662   c0.461,0,0.879,0.139,1.254,0.416s0.66,0.643,0.855,1.096l1.371-5.449c0.078-0.352,0.117-0.566,0.117-0.645   c0-0.289-0.512-0.434-1.535-0.434c-0.047,0-0.09-0.029-0.129-0.088S7.582,1.328,7.582,1.266l0.094-0.375   c0.031-0.102,0.098-0.152,0.199-0.152l3.141-0.258c0.156,0,0.234,0.078,0.234,0.234L7.793,14.566c0,0.102-0.027,0.297-0.082,0.586   s-0.082,0.484-0.082,0.586c0,0.703,0.242,1.055,0.727,1.055c0.352,0,0.648-0.182,0.891-0.545s0.422-0.736,0.539-1.119   s0.246-0.875,0.387-1.477c0.039-0.109,0.098-0.164,0.176-0.164h0.281c0.047,0,0.086,0.023,0.117,0.07s0.047,0.102,0.047,0.164   c-0.258,1.086-0.555,1.965-0.891,2.637s-0.871,1.008-1.605,1.008c-0.539,0-1.01-0.16-1.412-0.48s-0.643-0.75-0.721-1.289   c-0.422,0.508-0.898,0.93-1.43,1.266S3.656,17.367,3.094,17.367z M3.141,16.793c0.391,0,0.779-0.111,1.166-0.334   s0.74-0.506,1.061-0.85s0.594-0.691,0.82-1.043c0.016,0,0.023-0.023,0.023-0.07l1.324-5.238C7.434,8.672,7.229,8.17,6.92,7.752   S6.191,7.125,5.66,7.125c-0.805,0-1.512,0.449-2.121,1.348s-1.08,1.949-1.412,3.152s-0.498,2.199-0.498,2.988   c0,0.555,0.123,1.057,0.369,1.506S2.625,16.793,3.141,16.793z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 字符data: e
 */
define("char/data/character/e", [], {
    path: "M3.598,17.367c-1.125,0-2.006-0.42-2.643-1.26S0,14.266,0,13.102c0-1.125,0.275-2.191,0.826-3.199s1.303-1.818,2.256-2.432   s1.988-0.92,3.105-0.92c0.68,0,1.266,0.18,1.758,0.539s0.738,0.859,0.738,1.5c0,1.305-0.645,2.135-1.934,2.49   c-1.29,0.355-2.844,0.533-4.665,0.533H2.038c-0.234,0.945-0.362,1.77-0.386,2.473c0,0.719,0.166,1.35,0.498,1.893   s0.83,0.814,1.494,0.814c0.945,0,1.852-0.227,2.719-0.68s1.586-1.066,2.156-1.84c0.016-0.031,0.063-0.047,0.141-0.047   c0.086,0,0.164,0.039,0.234,0.117S9,14.496,9,14.566c0,0.047-0.008,0.078-0.023,0.094c-0.406,0.555-0.891,1.035-1.453,1.441   s-1.18,0.719-1.852,0.938S4.309,17.367,3.598,17.367z M2.18,11.039c0.936,0,1.793-0.041,2.573-0.123s1.489-0.305,2.128-0.668   S7.84,9.332,7.84,8.59c0-0.281-0.08-0.535-0.24-0.762c-0.16-0.227-0.369-0.4-0.626-0.521S6.437,7.125,6.132,7.125   c-1.006,0-1.842,0.381-2.508,1.143S2.476,9.953,2.18,11.039z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 9, 27 ]
});
/**
 * 字符data: f
 */
define("char/data/character/f", [], {
    path: "M0.966,21.094c0.297,0.242,0.676,0.363,1.138,0.363c0.485,0,0.915-0.465,1.291-1.395c0.125-0.359,0.334-1.26,0.628-2.701   s0.542-2.725,0.745-3.85l1.126-5.93H3.879c-0.141,0-0.211-0.09-0.211-0.27l0.094-0.375c0.031-0.102,0.094-0.152,0.188-0.152h2.086   l0.293-1.582c0.258-1.289,0.5-2.207,0.727-2.754c0.227-0.602,0.584-1.121,1.072-1.559s1.041-0.656,1.658-0.656   c0.547,0,1.035,0.135,1.465,0.404s0.645,0.662,0.645,1.178c0,0.375-0.119,0.701-0.357,0.979s-0.541,0.416-0.908,0.416   c-0.242,0-0.447-0.072-0.615-0.217S9.762,2.66,9.762,2.426c0-0.313,0.115-0.6,0.346-0.861s0.498-0.393,0.803-0.393   c-0.289-0.242-0.68-0.363-1.172-0.363c-0.203,0-0.404,0.084-0.604,0.252S8.793,1.41,8.707,1.605   c-0.102,0.25-0.359,1.449-0.773,3.598L7.629,6.785h2.426c0.063,0,0.113,0.029,0.152,0.088s0.059,0.111,0.059,0.158l-0.094,0.387   c-0.023,0.109-0.09,0.164-0.199,0.164H7.477l-1.103,5.93c-0.165,0.938-0.333,1.803-0.505,2.596   c-0.172,0.793-0.427,1.668-0.763,2.625S4.351,20.479,3.85,21.1c-0.5,0.621-1.091,0.932-1.772,0.932   c-0.329,0-0.655-0.059-0.98-0.176c-0.325-0.117-0.589-0.295-0.792-0.533C0.102,21.084,0,20.793,0,20.449   c0-0.367,0.125-0.691,0.377-0.973s0.562-0.422,0.931-0.422c0.243,0,0.445,0.072,0.606,0.217s0.242,0.334,0.242,0.568   c0,0.32-0.12,0.609-0.359,0.867C1.557,20.965,1.28,21.094,0.966,21.094z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 字符data: g
 */
define("char/data/character/g", [], {
    path: "M0,20.637c0-0.352,0.123-0.664,0.369-0.938s0.545-0.41,0.896-0.41c0.234,0,0.434,0.072,0.598,0.217s0.246,0.338,0.246,0.58   c0,0.258-0.082,0.498-0.246,0.721s-0.371,0.373-0.621,0.451c0.438,0.133,1.125,0.199,2.063,0.199c0.742,0,1.418-0.283,2.027-0.85   s1.008-1.221,1.195-1.963l0.715-2.906c-0.883,0.93-1.793,1.395-2.73,1.395c-0.969,0-1.727-0.365-2.273-1.096   s-0.82-1.604-0.82-2.619c0-0.742,0.145-1.516,0.434-2.32S2.547,9.545,3.07,8.854s1.131-1.248,1.822-1.67s1.412-0.633,2.162-0.633   c0.469,0,0.891,0.135,1.266,0.404s0.664,0.623,0.867,1.061c0.148-0.672,0.484-1.008,1.008-1.008c0.18,0,0.332,0.055,0.457,0.164   s0.188,0.262,0.188,0.457c0,0.094-0.008,0.156-0.023,0.188L8.109,18.715c-0.172,0.664-0.508,1.246-1.008,1.746   s-1.094,0.887-1.781,1.16s-1.367,0.41-2.039,0.41c-0.875,0-1.641-0.082-2.297-0.246S0,21.238,0,20.637z M4.559,16.559   c0.383,0,0.766-0.107,1.148-0.322s0.734-0.488,1.055-0.82s0.594-0.67,0.82-1.014l1.301-5.191C8.789,8.641,8.584,8.15,8.268,7.74   s-0.736-0.615-1.26-0.615c-0.641,0-1.211,0.275-1.711,0.826S4.391,9.148,4.078,9.891c-0.242,0.617-0.475,1.379-0.697,2.285   s-0.334,1.648-0.334,2.227c0,0.547,0.125,1.043,0.375,1.488S4.051,16.559,4.559,16.559z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 字符data: h
 */
define("char/data/character/h", [], {
    path: "M0,16.746c0-0.078,0.008-0.141,0.023-0.188l3.48-13.945c0.078-0.352,0.117-0.566,0.117-0.645   c0-0.289-0.512-0.434-1.535-0.434c-0.039,0-0.082-0.029-0.129-0.088s-0.07-0.119-0.07-0.182l0.105-0.375   C2.023,0.789,2.086,0.738,2.18,0.738L5.32,0.48h0.07C5.414,0.488,5.441,0.498,5.473,0.51S5.52,0.535,5.52,0.551   c0.031,0.094,0.047,0.148,0.047,0.164L3.668,8.344c0.438-0.547,0.957-0.982,1.559-1.307s1.25-0.486,1.945-0.486   c0.805,0,1.449,0.221,1.934,0.662S9.832,8.273,9.832,9.07c0,0.664-0.145,1.455-0.434,2.373S8.734,13.41,8.273,14.59   c-0.203,0.547-0.305,1.035-0.305,1.465c0,0.492,0.184,0.738,0.551,0.738c0.445,0,0.836-0.172,1.172-0.516s0.609-0.76,0.82-1.248   s0.371-0.947,0.48-1.377c0.039-0.109,0.094-0.164,0.164-0.164h0.281c0.117,0,0.176,0.078,0.176,0.234   c-0.133,0.57-0.336,1.131-0.609,1.682s-0.627,1.016-1.061,1.395s-0.924,0.568-1.471,0.568S7.465,17.18,7.09,16.805   s-0.563-0.832-0.563-1.371c0-0.281,0.055-0.586,0.164-0.914c0.469-1.242,0.854-2.344,1.154-3.305s0.451-1.781,0.451-2.461   c0-0.461-0.09-0.848-0.27-1.16s-0.48-0.469-0.902-0.469c-0.867,0-1.623,0.275-2.268,0.826s-1.193,1.275-1.646,2.174l-1.629,6.527   c-0.047,0.211-0.16,0.383-0.34,0.516s-0.371,0.199-0.574,0.199c-0.18,0-0.336-0.059-0.469-0.176S0,16.926,0,16.746z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 字符data: i
 */
define("char/data/character/i", [], {
    path: "M1.207,15.434c0-0.344,0.055-0.648,0.164-0.914l1.945-5.191c0.195-0.523,0.305-1.012,0.328-1.465   c0-0.492-0.191-0.738-0.574-0.738c-0.625,0-1.133,0.314-1.523,0.943S0.848,9.43,0.621,10.266c-0.039,0.117-0.094,0.176-0.164,0.176   H0.176C0.059,10.441,0,10.359,0,10.195C0.242,9.25,0.623,8.406,1.143,7.664S2.32,6.551,3.117,6.551   c0.555,0,1.018,0.186,1.389,0.557s0.557,0.834,0.557,1.389c0,0.336-0.055,0.641-0.164,0.914l-1.945,5.18   c-0.227,0.609-0.34,1.098-0.34,1.465c0,0.492,0.195,0.738,0.586,0.738c0.438,0,0.818-0.17,1.143-0.51s0.59-0.742,0.797-1.207   s0.373-0.939,0.498-1.424c0.055-0.109,0.113-0.164,0.176-0.164h0.281c0.117,0,0.176,0.078,0.176,0.234   c-0.133,0.57-0.336,1.131-0.609,1.682S5.033,16.42,4.6,16.799s-0.928,0.568-1.482,0.568c-0.547,0-1.002-0.186-1.365-0.557   S1.207,15.98,1.207,15.434z M3.938,2.583c0-0.326,0.127-0.612,0.381-0.856s0.545-0.367,0.873-0.367   c0.242,0,0.441,0.074,0.598,0.221c0.156,0.148,0.234,0.346,0.234,0.594c0,0.319-0.129,0.602-0.387,0.851   C5.379,3.274,5.094,3.398,4.781,3.398c-0.227,0-0.424-0.076-0.592-0.227C4.021,3.02,3.938,2.824,3.938,2.583z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 7, 27 ]
});
/**
 * 字符data: j
 */
define("char/data/character/j", [], {
    path: "M1.214,21.281c0.234,0.117,0.531,0.176,0.891,0.176c0.688,0,1.282-0.313,1.783-0.938s0.841-1.313,1.021-2.063l2.287-9.129   c0.109-0.438,0.164-0.82,0.164-1.148c0-0.289-0.053-0.537-0.158-0.744S6.91,7.125,6.645,7.125c-0.719,0-1.332,0.314-1.84,0.943   s-0.938,1.385-1.289,2.268c-0.031,0.07-0.078,0.105-0.141,0.105H3.094c-0.047,0-0.088-0.033-0.123-0.1s-0.053-0.115-0.053-0.146   C3.301,9.219,3.805,8.367,4.43,7.641s1.379-1.09,2.262-1.09c0.398,0,0.764,0.094,1.096,0.281s0.592,0.447,0.779,0.779   s0.281,0.697,0.281,1.096c0,0.242-0.023,0.477-0.07,0.703l-2.288,9.117c-0.165,0.656-0.467,1.248-0.91,1.775   c-0.442,0.527-0.98,0.947-1.613,1.26c-0.634,0.313-1.275,0.469-1.924,0.469c-0.517,0-0.986-0.117-1.408-0.352S0,21.09,0,20.613   c0-0.352,0.124-0.66,0.371-0.926c0.248-0.266,0.552-0.398,0.914-0.398c0.235,0,0.436,0.072,0.601,0.217s0.248,0.338,0.248,0.58   c0,0.281-0.088,0.533-0.265,0.756S1.473,21.211,1.214,21.281z M7.652,2.583c0-0.326,0.127-0.612,0.381-0.856   s0.541-0.367,0.861-0.367c0.258,0,0.463,0.076,0.615,0.227c0.152,0.152,0.229,0.348,0.229,0.588c0,0.202-0.057,0.398-0.17,0.589   S9.299,3.107,9.1,3.224C8.9,3.34,8.695,3.398,8.484,3.398c-0.234,0-0.432-0.076-0.592-0.227C7.732,3.02,7.652,2.824,7.652,2.583z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 字符data: k
 */
define("char/data/character/k", [], {
    path: "M0,16.746c0-0.078,0.008-0.141,0.023-0.188l3.48-13.945c0.078-0.352,0.117-0.566,0.117-0.645   c0-0.289-0.512-0.434-1.535-0.434c-0.039,0-0.082-0.029-0.129-0.088s-0.07-0.119-0.07-0.182l0.105-0.375   C2.023,0.789,2.086,0.738,2.18,0.738L5.32,0.48h0.07C5.414,0.488,5.441,0.498,5.473,0.51S5.52,0.535,5.52,0.551   c0.031,0.094,0.047,0.148,0.047,0.164l-2.52,10.148c0.578-0.227,1.328-0.822,2.25-1.787S6.895,7.449,7.324,7.09   s1.02-0.539,1.77-0.539c0.445,0,0.824,0.145,1.137,0.434s0.469,0.648,0.469,1.078c0,0.375-0.119,0.705-0.357,0.99   S9.789,9.48,9.398,9.48c-0.227,0-0.422-0.074-0.586-0.223s-0.246-0.34-0.246-0.574c0-0.344,0.121-0.637,0.363-0.879   s0.535-0.363,0.879-0.363C9.629,7.23,9.375,7.125,9.047,7.125c-0.594,0-1.148,0.203-1.664,0.609S6.221,8.75,5.443,9.563   s-1.361,1.336-1.752,1.57c0.594,0.07,1.139,0.193,1.635,0.369s0.92,0.439,1.271,0.791s0.527,0.797,0.527,1.336   c0,0.148-0.031,0.363-0.094,0.645c-0.125,0.453-0.199,0.926-0.223,1.418c0,0.734,0.258,1.102,0.773,1.102   c0.578,0,1.014-0.299,1.307-0.896s0.553-1.346,0.779-2.244c0.039-0.109,0.094-0.164,0.164-0.164h0.293   c0.047,0,0.086,0.023,0.117,0.07s0.047,0.102,0.047,0.164c-0.242,0.984-0.574,1.838-0.996,2.561s-1.008,1.084-1.758,1.084   c-0.656,0-1.186-0.223-1.588-0.668s-0.604-1.004-0.604-1.676c0-0.305,0.031-0.578,0.094-0.82c0.055-0.172,0.082-0.348,0.082-0.527   c0-0.625-0.273-1.1-0.82-1.424S3.527,11.73,2.824,11.66l-1.242,4.992c-0.047,0.211-0.16,0.383-0.34,0.516s-0.371,0.199-0.574,0.199   c-0.18,0-0.336-0.059-0.469-0.176S0,16.926,0,16.746z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 字符data: l
 */
define("char/data/character/l", [], {
    path: "M0,15.211c0-0.289,0.031-0.527,0.094-0.715L3.07,2.613c0.086-0.391,0.129-0.605,0.129-0.645   c0-0.289-0.516-0.434-1.547-0.434c-0.047,0-0.09-0.029-0.129-0.088S1.465,1.328,1.465,1.266l0.094-0.375   C1.59,0.789,1.656,0.738,1.758,0.738L4.898,0.48c0.156,0,0.234,0.078,0.234,0.234L1.688,14.566c0,0.07-0.029,0.258-0.088,0.563   s-0.088,0.508-0.088,0.609c0,0.703,0.242,1.055,0.727,1.055c0.344,0,0.637-0.186,0.879-0.557s0.42-0.744,0.533-1.119   s0.24-0.863,0.381-1.465c0.039-0.109,0.098-0.164,0.176-0.164h0.281c0.047,0,0.086,0.023,0.117,0.07s0.047,0.102,0.047,0.164   c-0.266,1.086-0.561,1.965-0.885,2.637s-0.85,1.008-1.576,1.008c-0.625,0-1.146-0.205-1.564-0.615S0,15.828,0,15.211z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 6, 27 ]
});
/**
 * 字符data: m
 */
define("char/data/character/m", [], {
    path: "M1.184,16.746c0-0.094,0.008-0.164,0.023-0.211L3,9.328C3.117,8.859,3.176,8.477,3.176,8.18S3.121,7.633,3.012,7.43   S2.715,7.125,2.449,7.125c-0.352,0-0.646,0.18-0.885,0.539S1.145,8.408,1.02,8.818s-0.258,0.893-0.398,1.447   c-0.039,0.117-0.094,0.176-0.164,0.176H0.176C0.059,10.441,0,10.359,0,10.195c0.188-0.758,0.357-1.361,0.51-1.811   S0.9,7.518,1.225,7.131s0.748-0.58,1.271-0.58c0.383,0,0.738,0.09,1.066,0.27s0.594,0.426,0.797,0.738S4.664,8.215,4.664,8.59   C5.188,7.926,5.74,7.42,6.322,7.072s1.26-0.521,2.033-0.521c0.477,0,0.918,0.084,1.324,0.252s0.73,0.424,0.973,0.768   s0.363,0.754,0.363,1.23c1.063-1.5,2.352-2.25,3.867-2.25c0.805,0,1.449,0.221,1.934,0.662s0.727,1.061,0.727,1.857   c0,0.664-0.145,1.455-0.434,2.373s-0.664,1.967-1.125,3.146c-0.203,0.547-0.305,1.035-0.305,1.465c0,0.492,0.184,0.738,0.551,0.738   c0.445,0,0.836-0.172,1.172-0.516s0.609-0.76,0.82-1.248s0.371-0.947,0.48-1.377c0.039-0.109,0.094-0.164,0.164-0.164h0.293   c0.047,0,0.086,0.023,0.117,0.07s0.047,0.102,0.047,0.164c-0.133,0.57-0.336,1.131-0.609,1.682s-0.627,1.016-1.061,1.395   s-0.924,0.568-1.471,0.568s-1.008-0.188-1.383-0.563s-0.563-0.832-0.563-1.371c0-0.281,0.055-0.586,0.164-0.914   c0.469-1.242,0.854-2.344,1.154-3.305s0.451-1.781,0.451-2.461c0-0.461-0.09-0.848-0.27-1.16s-0.48-0.469-0.902-0.469   c-1.578,0-2.883,1.008-3.914,3.023c-0.031,0.125-0.055,0.223-0.07,0.293l-1.535,6.164c-0.063,0.227-0.18,0.41-0.352,0.551   s-0.367,0.211-0.586,0.211c-0.195,0-0.355-0.055-0.48-0.164s-0.188-0.262-0.188-0.457c0-0.094,0.008-0.164,0.023-0.211l1.535-6.176   c0.156-0.586,0.234-1.121,0.234-1.605c0-0.469-0.09-0.857-0.27-1.166S8.746,7.125,8.309,7.125c-1.555,0-2.859,1-3.914,3   l-1.605,6.48c-0.063,0.227-0.18,0.41-0.352,0.551s-0.367,0.211-0.586,0.211c-0.195,0-0.355-0.055-0.48-0.164   S1.184,16.941,1.184,16.746z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 20, 27 ]
});
/**
 * 字符data: n
 */
define("char/data/character/n", [], {
    path: "M1.184,16.746c0-0.094,0.008-0.164,0.023-0.211L3,9.328C3.117,8.859,3.176,8.477,3.176,8.18S3.121,7.633,3.012,7.43   S2.715,7.125,2.449,7.125c-0.352,0-0.646,0.18-0.885,0.539S1.145,8.408,1.02,8.818s-0.258,0.893-0.398,1.447   c-0.039,0.117-0.094,0.176-0.164,0.176H0.176C0.059,10.441,0,10.359,0,10.195c0.188-0.758,0.357-1.361,0.51-1.811   S0.9,7.518,1.225,7.131s0.748-0.58,1.271-0.58c0.305,0,0.582,0.049,0.832,0.146s0.477,0.238,0.68,0.422s0.363,0.398,0.48,0.645   S4.664,8.285,4.664,8.59C5.188,7.926,5.74,7.42,6.322,7.072s1.26-0.521,2.033-0.521c0.805,0,1.449,0.221,1.934,0.662   s0.727,1.061,0.727,1.857c0,0.664-0.145,1.455-0.434,2.373S9.918,13.41,9.457,14.59c-0.211,0.57-0.316,1.059-0.316,1.465   c0,0.492,0.188,0.738,0.563,0.738c0.633,0,1.154-0.332,1.564-0.996s0.713-1.379,0.908-2.145c0.039-0.109,0.094-0.164,0.164-0.164   h0.281c0.117,0,0.176,0.078,0.176,0.234c-0.133,0.57-0.336,1.131-0.609,1.682s-0.627,1.016-1.061,1.395s-0.928,0.568-1.482,0.568   c-0.539,0-0.996-0.188-1.371-0.563s-0.563-0.832-0.563-1.371c0-0.281,0.055-0.586,0.164-0.914c0.469-1.242,0.854-2.344,1.154-3.305   S9.48,9.434,9.48,8.754c0-0.461-0.09-0.848-0.27-1.16S8.73,7.125,8.309,7.125c-1.563,0-2.859,0.992-3.891,2.977l-1.629,6.504   c-0.063,0.227-0.18,0.41-0.352,0.551s-0.367,0.211-0.586,0.211c-0.195,0-0.355-0.055-0.48-0.164S1.184,16.941,1.184,16.746z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 13, 27 ]
});
/**
 * 字符data: o
 */
define("char/data/character/o", [], {
    path: "M3.715,17.367c-0.727,0-1.373-0.176-1.939-0.527s-1.004-0.834-1.313-1.447S0,14.113,0,13.395   c0-1.07,0.293-2.139,0.879-3.205S2.25,8.25,3.234,7.57s2.02-1.02,3.105-1.02c0.578,0,1.09,0.102,1.535,0.305   s0.83,0.484,1.154,0.844s0.572,0.779,0.744,1.26s0.258,1.006,0.258,1.576c0,1.07-0.291,2.137-0.873,3.199s-1.363,1.934-2.344,2.613   S4.801,17.367,3.715,17.367z M3.762,16.793c0.938,0,1.756-0.398,2.455-1.195s1.23-1.756,1.594-2.877s0.545-2.139,0.545-3.053   c0-0.688-0.178-1.283-0.533-1.787S6.953,7.125,6.281,7.125c-0.93,0-1.744,0.398-2.443,1.195s-1.23,1.756-1.594,2.877   s-0.545,2.139-0.545,3.053c0,0.695,0.176,1.293,0.527,1.793S3.09,16.793,3.762,16.793z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 字符data: p
 */
define("char/data/character/p", [], {
    path: "M0.37,21.967c-0.039,0-0.082-0.027-0.129-0.082s-0.07-0.105-0.07-0.152l0.105-0.387c0.023-0.109,0.086-0.164,0.188-0.164   c0.508,0,0.859-0.043,1.055-0.129s0.348-0.324,0.457-0.715L4.683,9.534c0-0.023,0.029-0.188,0.088-0.492s0.088-0.531,0.088-0.68   c0-0.297-0.055-0.547-0.164-0.75S4.397,7.307,4.132,7.307c-0.273,0-0.514,0.115-0.721,0.346s-0.375,0.5-0.504,0.809   S2.659,9.129,2.55,9.54s-0.188,0.713-0.234,0.908c-0.039,0.117-0.098,0.176-0.176,0.176H1.858c-0.117,0-0.176-0.082-0.176-0.246   C1.87,9.62,2.04,9.016,2.192,8.567S2.583,7.7,2.907,7.313s0.748-0.58,1.271-0.58c0.547,0,1.021,0.16,1.424,0.48   s0.643,0.75,0.721,1.289c0.992-1.18,2.016-1.77,3.07-1.77c0.664,0,1.229,0.18,1.693,0.539s0.814,0.822,1.049,1.389   s0.352,1.178,0.352,1.834c0,1.008-0.256,2.064-0.768,3.17s-1.207,2.029-2.086,2.771s-1.83,1.113-2.854,1.113   c-0.469,0-0.891-0.139-1.266-0.416s-0.66-0.643-0.855-1.096l-1.102,4.395c-0.047,0.148-0.07,0.285-0.07,0.41   c0,0.227,0.52,0.34,1.559,0.34c0.055,0,0.102,0.027,0.141,0.082s0.059,0.113,0.059,0.176L5.14,21.827   c-0.016,0.094-0.102,0.141-0.258,0.141H0.37z M6.827,16.975c0.617,0,1.182-0.279,1.693-0.838s0.938-1.25,1.277-2.074   s0.598-1.65,0.773-2.479s0.264-1.527,0.264-2.098c0-0.578-0.115-1.086-0.346-1.523S9.878,7.307,9.347,7.307   c-0.578,0-1.131,0.217-1.658,0.65S6.69,8.917,6.276,9.534c0,0.008,0,0.02,0,0.035S6.269,9.6,6.253,9.616l-1.301,5.227   c0.094,0.578,0.299,1.078,0.615,1.5S6.304,16.975,6.827,16.975z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 13, 27 ]
});
/**
 * 字符data: q
 */
define("char/data/character/q", [], {
    path: "M2.496,21.547l0.094-0.393c0.023-0.111,0.086-0.167,0.188-0.167c0.602,0,1.059-0.047,1.371-0.14s0.52-0.327,0.621-0.701   l1.055-4.187c-0.906,0.938-1.816,1.406-2.73,1.406c-0.664,0-1.229-0.18-1.693-0.539s-0.814-0.824-1.049-1.395S0,14.254,0,13.605   c0-1,0.254-2.055,0.762-3.164s1.203-2.035,2.086-2.777s1.828-1.113,2.836-1.113c0.5,0,0.941,0.152,1.324,0.457   S7.672,7.703,7.852,8.18c0.109-0.211,0.367-0.535,0.773-0.973S9.316,6.551,9.48,6.551c0.039,0,0.076,0.012,0.111,0.035   S9.656,6.637,9.68,6.668s0.035,0.07,0.035,0.117L6.363,20.239c-0.055,0.141-0.082,0.277-0.082,0.41c0,0.226,0.523,0.339,1.57,0.339   c0.055,0,0.1,0.023,0.135,0.071c0.035,0.047,0.053,0.111,0.053,0.19l-0.094,0.393c-0.016,0.095-0.105,0.143-0.27,0.143H2.684   C2.559,21.785,2.496,21.706,2.496,21.547z M3.141,16.793c0.57,0,1.127-0.227,1.67-0.68s0.994-0.969,1.354-1.547l1.348-5.309   C7.41,8.672,7.205,8.17,6.896,7.752s-0.729-0.627-1.26-0.627c-0.805,0-1.512,0.455-2.121,1.365s-1.076,1.963-1.4,3.158   s-0.486,2.184-0.486,2.965c0,0.555,0.123,1.057,0.369,1.506S2.625,16.793,3.141,16.793z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 字符data: r
 */
define("char/data/character/r", [], {
    path: "M1.184,16.746c0-0.094,0.008-0.164,0.023-0.211L3,9.328C3.117,8.859,3.176,8.477,3.176,8.18S3.121,7.633,3.012,7.43   S2.715,7.125,2.449,7.125c-0.352,0-0.646,0.18-0.885,0.539S1.145,8.408,1.02,8.818s-0.258,0.893-0.398,1.447   c-0.039,0.117-0.094,0.176-0.164,0.176H0.176C0.059,10.441,0,10.359,0,10.195c0.188-0.758,0.357-1.361,0.51-1.811   S0.9,7.518,1.225,7.131s0.748-0.58,1.271-0.58c0.555,0,1.031,0.166,1.43,0.498s0.633,0.764,0.703,1.295   c0.859-1.195,1.879-1.793,3.059-1.793c0.5,0,0.939,0.137,1.318,0.41s0.568,0.648,0.568,1.125c0,0.227-0.053,0.451-0.158,0.674   S9.162,9.158,8.971,9.287S8.559,9.48,8.309,9.48c-0.227,0-0.424-0.074-0.592-0.223s-0.252-0.34-0.252-0.574   c0-0.195,0.055-0.393,0.164-0.592s0.252-0.357,0.428-0.475s0.361-0.176,0.557-0.176C8.371,7.23,8.043,7.125,7.629,7.125   c-1.203,0-2.25,0.887-3.141,2.66l-1.699,6.82c-0.063,0.227-0.18,0.41-0.352,0.551s-0.367,0.211-0.586,0.211   c-0.195,0-0.355-0.055-0.48-0.164S1.184,16.941,1.184,16.746z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 字符data: s
 */
define("char/data/character/s", [], {
    path: "M0.727,15.551c0.164,0.422,0.508,0.734,1.031,0.938s1.066,0.305,1.629,0.305c0.852,0,1.625-0.229,2.32-0.686   s1.043-1.1,1.043-1.928c0-0.414-0.15-0.76-0.451-1.037s-0.662-0.467-1.084-0.568L3.75,12.258c-0.523-0.117-0.959-0.381-1.307-0.791   s-0.521-0.881-0.521-1.412c0-1.047,0.4-1.893,1.201-2.537S4.859,6.551,5.93,6.551c0.43,0,0.861,0.074,1.295,0.223   s0.787,0.373,1.061,0.674s0.41,0.682,0.41,1.143c0,0.359-0.094,0.67-0.281,0.932S7.961,9.914,7.617,9.914   c-0.188,0-0.352-0.063-0.492-0.188S6.914,9.438,6.914,9.234c0-0.281,0.107-0.52,0.322-0.715s0.467-0.293,0.756-0.293   C7.875,7.852,7.607,7.574,7.189,7.395s-0.854-0.27-1.307-0.27c-0.68,0-1.285,0.191-1.816,0.574S3.27,8.602,3.27,9.258   c0,0.328,0.115,0.609,0.346,0.844s0.506,0.387,0.826,0.457l1.301,0.258c0.68,0.156,1.246,0.461,1.699,0.914s0.68,1.016,0.68,1.688   c0,0.586-0.162,1.158-0.486,1.717s-0.732,1.018-1.225,1.377c-0.836,0.57-1.859,0.855-3.07,0.855c-0.852,0-1.621-0.191-2.309-0.574   S0,15.836,0,15.07c0-0.43,0.113-0.793,0.34-1.09s0.547-0.445,0.961-0.445c0.242,0,0.443,0.072,0.604,0.217s0.24,0.334,0.24,0.568   c0,0.352-0.121,0.648-0.363,0.891s-0.539,0.363-0.891,0.363C0.813,15.574,0.758,15.566,0.727,15.551z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 9, 27 ]
});
/**
 * 字符data: t
 */
define("char/data/character/t", [], {
    path: "M0.914,15.211c0-0.18,0.031-0.41,0.094-0.691L2.73,7.582H0.188c-0.047,0-0.09-0.029-0.129-0.088S0,7.375,0,7.313   l0.094-0.375c0.031-0.102,0.098-0.152,0.199-0.152H2.93l0.984-3.914C3.977,2.652,4.092,2.475,4.26,2.338s0.365-0.205,0.592-0.205   c0.18,0,0.336,0.057,0.469,0.17S5.52,2.566,5.52,2.754c0,0.102-0.008,0.168-0.023,0.199L4.535,6.785h2.496   c0.055,0,0.1,0.025,0.135,0.076s0.053,0.107,0.053,0.17L7.125,7.418c0,0.109-0.063,0.164-0.188,0.164h-2.59L2.59,14.59   c-0.109,0.453-0.164,0.836-0.164,1.148c0,0.703,0.238,1.055,0.715,1.055c0.492,0,0.943-0.166,1.354-0.498s0.76-0.74,1.049-1.225   s0.531-0.98,0.727-1.488c0.031-0.063,0.078-0.094,0.141-0.094h0.281c0.117,0,0.176,0.078,0.176,0.234   c-0.367,0.961-0.871,1.809-1.512,2.543s-1.395,1.102-2.262,1.102c-0.617,0-1.135-0.205-1.553-0.615S0.914,15.828,0.914,15.211z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 8, 27 ]
});
/**
 * 字符data: u
 */
define("char/data/character/u", [], {
    path: "M1.875,14.566c0-0.367,0.043-0.771,0.129-1.213s0.189-0.85,0.311-1.225s0.305-0.898,0.551-1.57s0.396-1.082,0.451-1.23   c0.219-0.586,0.328-1.074,0.328-1.465c0-0.492-0.184-0.738-0.551-0.738c-0.625,0-1.139,0.32-1.541,0.961s-0.713,1.367-0.932,2.18   c-0.039,0.117-0.094,0.176-0.164,0.176H0.176C0.059,10.441,0,10.359,0,10.195C0.242,9.25,0.623,8.406,1.143,7.664   s1.186-1.113,1.998-1.113c0.555,0,1.018,0.186,1.389,0.557s0.557,0.834,0.557,1.389c0,0.297-0.063,0.602-0.188,0.914   c-0.063,0.172-0.221,0.594-0.475,1.266s-0.447,1.23-0.58,1.676s-0.242,0.875-0.328,1.289s-0.129,0.824-0.129,1.23   c0,0.547,0.113,1.004,0.34,1.371s0.594,0.551,1.102,0.551c1.023,0,1.91-0.641,2.66-1.922c0.016-0.063,0.029-0.123,0.041-0.182   s0.021-0.115,0.029-0.17l1.758-6.984c0.047-0.219,0.16-0.398,0.34-0.539s0.379-0.211,0.598-0.211c0.188,0,0.342,0.057,0.463,0.17   s0.182,0.268,0.182,0.463v0.188L9.141,14.59c-0.109,0.453-0.164,0.836-0.164,1.148c0,0.703,0.242,1.055,0.727,1.055   c0.352,0,0.648-0.182,0.891-0.545s0.422-0.736,0.539-1.119s0.246-0.875,0.387-1.477c0.039-0.109,0.098-0.164,0.176-0.164h0.281   c0.047,0,0.086,0.023,0.117,0.07s0.047,0.102,0.047,0.164c-0.258,1.086-0.555,1.965-0.891,2.637s-0.871,1.008-1.605,1.008   c-0.492,0-0.932-0.143-1.318-0.428s-0.65-0.662-0.791-1.131c-0.344,0.469-0.752,0.846-1.225,1.131s-0.982,0.428-1.529,0.428   c-0.898,0-1.607-0.248-2.127-0.744S1.875,15.441,1.875,14.566z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 13, 27 ]
});
/**
 * 字符data: A
 */
define("char/data/character/ua", [], {
    path: "M0.211,17.133C0.07,17.133,0,17.043,0,16.863l0.094-0.375c0.031-0.102,0.094-0.152,0.188-0.152   c1.227,0,2.156-0.527,2.789-1.582c0-0.016,0.016-0.031,0.047-0.047l8.637-14.496C11.84,0.07,11.969,0,12.141,0h0.281   c0.18,0,0.27,0.07,0.27,0.211l1.512,15.574c0.055,0.234,0.25,0.385,0.586,0.451s0.734,0.1,1.195,0.1   c0.063,0,0.113,0.029,0.152,0.088s0.059,0.111,0.059,0.158l-0.094,0.387c-0.039,0.109-0.137,0.164-0.293,0.164h-5.543   c-0.141,0-0.211-0.09-0.211-0.27l0.094-0.375c0.031-0.102,0.094-0.152,0.188-0.152c1.188,0,1.813-0.215,1.875-0.645l-0.41-4.102   H5.777l-1.992,3.34c-0.125,0.203-0.188,0.418-0.188,0.645c0,0.273,0.119,0.469,0.357,0.586s0.502,0.176,0.791,0.176   c0.055,0,0.1,0.025,0.135,0.076s0.053,0.107,0.053,0.17L4.84,16.969c-0.016,0.109-0.102,0.164-0.258,0.164H0.211z M6.258,10.793   h5.473l-0.738-7.945L6.258,10.793z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 17, 27 ]
});
/**
 * 字符data: B
 */
define("char/data/character/ub", [], {
    path: "M0.223,17.133c-0.148,0-0.223-0.09-0.223-0.27l0.094-0.375c0.008-0.023,0.035-0.055,0.082-0.094s0.086-0.059,0.117-0.059   c0.656,0,1.182-0.047,1.576-0.141s0.65-0.324,0.768-0.691L5.93,2.273C5.977,2.156,6,2.039,6,1.922c0-0.258-0.633-0.387-1.898-0.387   c-0.047,0-0.09-0.029-0.129-0.088S3.914,1.328,3.914,1.266l0.094-0.375c0.031-0.102,0.098-0.152,0.199-0.152h8.227   c1.109,0,2.1,0.287,2.971,0.861s1.307,1.393,1.307,2.455c0,0.781-0.25,1.492-0.75,2.133s-1.139,1.164-1.916,1.57   S12.5,8.434,11.742,8.566c0.586,0,1.166,0.148,1.74,0.445s1.039,0.703,1.395,1.219s0.533,1.074,0.533,1.676   c0,0.734-0.193,1.42-0.58,2.057s-0.906,1.193-1.559,1.67s-1.355,0.846-2.109,1.107S9.688,17.133,9,17.133H0.223z M4.324,16.125   c0,0.141,0.262,0.211,0.785,0.211h3.434c0.789,0,1.555-0.217,2.297-0.65s1.338-1.012,1.787-1.734s0.674-1.479,0.674-2.268   s-0.234-1.449-0.703-1.98s-1.09-0.797-1.863-0.797H6.094l-1.676,6.691C4.355,15.816,4.324,15.992,4.324,16.125z M6.246,8.32h3.64   c0.764,0,1.509-0.195,2.235-0.586s1.32-0.922,1.785-1.594c0.464-0.672,0.696-1.391,0.696-2.156c0-0.711-0.217-1.297-0.649-1.758   c-0.433-0.461-1.004-0.691-1.714-0.691H8.926c-0.437,0-0.72,0.043-0.849,0.129C7.949,1.75,7.833,1.984,7.732,2.367L6.246,8.32z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 17, 27 ]
});
/**
 * 字符data: C
 */
define("char/data/character/uc", [], {
    path: "M2.086,11.906c0,1.461,0.426,2.648,1.277,3.563s2.008,1.371,3.469,1.371c1,0,1.959-0.26,2.877-0.779   s1.709-1.211,2.373-2.074s1.113-1.775,1.348-2.736c0.031-0.094,0.09-0.141,0.176-0.141h0.281c0.055,0,0.096,0.02,0.123,0.059   s0.041,0.09,0.041,0.152c-0.195,0.844-0.542,1.645-1.038,2.402s-1.097,1.432-1.8,2.021s-1.474,1.053-2.311,1.389   s-1.689,0.504-2.557,0.504c-1.243,0-2.348-0.283-3.313-0.85s-1.712-1.344-2.24-2.332S0,12.359,0,11.133   c0-1.328,0.291-2.646,0.874-3.955s1.374-2.486,2.375-3.533c1.001-1.047,2.143-1.877,3.424-2.49c1.282-0.613,2.592-0.92,3.929-0.92   c0.821,0,1.575,0.193,2.263,0.58s1.228,0.932,1.619,1.635l1.853-2.168c0.031-0.031,0.071-0.047,0.118-0.047h0.152   c0.109,0,0.164,0.074,0.164,0.223l-1.605,6.457c-0.023,0.109-0.082,0.164-0.176,0.164H14.59c-0.117,0-0.176-0.082-0.176-0.246   c0.063-0.375,0.094-0.797,0.094-1.266c0-1.258-0.311-2.328-0.932-3.211s-1.525-1.324-2.713-1.324c-1.289,0-2.48,0.324-3.574,0.973   S5.258,3.52,4.477,4.605S3.102,6.873,2.695,8.15S2.086,10.68,2.086,11.906z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 17, 27 ]
});
/**
 * 字符data: D
 */
define("char/data/character/ud", [], {
    path: "M0.223,17.133c-0.148,0-0.223-0.09-0.223-0.27l0.094-0.375c0.008-0.023,0.035-0.055,0.082-0.094s0.086-0.059,0.117-0.059   c0.656,0,1.182-0.047,1.576-0.141s0.65-0.324,0.768-0.691L5.93,2.273C5.977,2.156,6,2.039,6,1.922c0-0.258-0.633-0.387-1.898-0.387   c-0.047,0-0.09-0.029-0.129-0.088S3.914,1.328,3.914,1.266l0.094-0.375c0.031-0.102,0.098-0.152,0.199-0.152h8.273   c1.109,0,2.072,0.271,2.889,0.814s1.439,1.275,1.869,2.197s0.645,1.918,0.645,2.988c0,1.234-0.252,2.467-0.756,3.697   s-1.205,2.359-2.104,3.387s-1.918,1.836-3.059,2.426s-2.328,0.885-3.563,0.885H0.223z M4.395,16.125   c0,0.141,0.262,0.211,0.785,0.211h2.859c0.867,0,1.719-0.186,2.555-0.557s1.586-0.881,2.25-1.529   c0.594-0.594,1.127-1.381,1.6-2.361s0.836-1.996,1.09-3.047s0.381-2.021,0.381-2.912c0-0.867-0.162-1.631-0.486-2.291   s-0.803-1.176-1.436-1.547s-1.383-0.557-2.25-0.557H9c-0.438,0-0.721,0.043-0.85,0.129s-0.244,0.32-0.346,0.703l-3.316,13.23   C4.426,15.816,4.395,15.992,4.395,16.125z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 18, 27 ]
});
/**
 * 字符data: E
 */
define("char/data/character/ue", [], {
    path: "M0.211,17.133C0.07,17.133,0,17.043,0,16.863l0.094-0.375c0.031-0.102,0.098-0.152,0.199-0.152   c0.648,0,1.172-0.049,1.57-0.146s0.656-0.326,0.773-0.686L5.93,2.273C5.977,2.156,6,2.039,6,1.922c0-0.258-0.633-0.387-1.898-0.387   c-0.047,0-0.09-0.029-0.129-0.088S3.914,1.328,3.914,1.266l0.094-0.375c0.031-0.102,0.094-0.152,0.188-0.152h12.656   c0.055,0,0.1,0.025,0.135,0.076s0.053,0.107,0.053,0.17l-0.621,4.992c0,0.141-0.063,0.211-0.188,0.211h-0.223   c-0.141,0-0.211-0.086-0.211-0.258c0.109-0.711,0.164-1.32,0.164-1.828c0-0.789-0.18-1.373-0.539-1.752s-0.811-0.609-1.354-0.691   s-1.279-0.123-2.209-0.123H9.047c-0.43,0-0.711,0.043-0.844,0.129s-0.25,0.32-0.352,0.703L6.387,8.227h1.922   c0.602,0,1.09-0.031,1.465-0.094s0.68-0.182,0.914-0.357s0.438-0.443,0.609-0.803s0.328-0.82,0.469-1.383   c0.023-0.109,0.086-0.164,0.188-0.164h0.211c0.055,0,0.105,0.027,0.152,0.082s0.07,0.105,0.07,0.152l-1.512,6   c-0.023,0.109-0.09,0.164-0.199,0.164h-0.211c-0.125,0-0.188-0.086-0.188-0.258c0.156-0.641,0.234-1.121,0.234-1.441   c0-0.492-0.209-0.799-0.627-0.92S8.906,9.023,8.203,9.023H6.188l-1.652,6.574c-0.063,0.219-0.094,0.395-0.094,0.527   c0,0.141,0.266,0.211,0.797,0.211h2.965c1.141,0,2.066-0.09,2.777-0.27s1.299-0.469,1.764-0.867s0.863-0.896,1.195-1.494   s0.74-1.486,1.225-2.666c0.031-0.094,0.098-0.141,0.199-0.141h0.211c0.063,0,0.115,0.02,0.158,0.059s0.064,0.09,0.064,0.152   c0,0.031-0.008,0.055-0.023,0.07l-2.402,5.789c-0.023,0.109-0.09,0.164-0.199,0.164H0.211z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 18, 27 ]
});
/**
 * 字符data: F
 */
define("char/data/character/uf", [], {
    path: "M0.211,17.133C0.07,17.133,0,17.043,0,16.863l0.094-0.375c0.031-0.102,0.098-0.152,0.199-0.152   c0.648,0,1.172-0.049,1.57-0.146c0.398-0.098,0.656-0.326,0.773-0.685L5.93,2.273C5.977,2.156,6,2.039,6,1.922   c0-0.258-0.633-0.387-1.898-0.387c-0.047,0-0.09-0.029-0.129-0.088S3.914,1.328,3.914,1.266l0.094-0.375   c0.031-0.102,0.094-0.152,0.188-0.152h12.316c0.055,0,0.1,0.025,0.135,0.076s0.053,0.107,0.053,0.17l-0.621,4.992   c0,0.141-0.063,0.211-0.188,0.211h-0.223c-0.141,0-0.211-0.086-0.211-0.258c0.109-0.711,0.164-1.336,0.164-1.875   c0-0.789-0.17-1.365-0.51-1.729s-0.77-0.586-1.289-0.668s-1.232-0.123-2.139-0.123H9.047c-0.43,0-0.711,0.043-0.844,0.129   s-0.25,0.32-0.352,0.703L6.316,8.543h1.816c0.797,0,1.4-0.064,1.811-0.193s0.73-0.377,0.961-0.744s0.443-0.934,0.639-1.699   c0.023-0.117,0.09-0.176,0.199-0.176h0.211c0.125,0,0.188,0.082,0.188,0.246l-1.488,6.007c-0.023,0.109-0.086,0.164-0.188,0.164   h-0.211c-0.148,0-0.223-0.089-0.223-0.269c0.18-0.717,0.27-1.201,0.27-1.451c0-0.483-0.203-0.786-0.609-0.906   C9.285,9.4,8.742,9.34,8.063,9.34H6.117l-1.582,6.259c-0.016,0.062-0.023,0.148-0.023,0.257c0,0.195,0.082,0.316,0.246,0.362   c0.18,0.04,0.457,0.069,0.832,0.088c0.375,0.02,0.824,0.029,1.348,0.029c0.063,0,0.113,0.029,0.152,0.088s0.059,0.111,0.059,0.158   l-0.094,0.387c-0.039,0.109-0.133,0.164-0.281,0.164H0.211z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 17, 27 ]
});
/**
 * 字符data: G
 */
define("char/data/character/ug", [], {
    path: "M2.109,11.824c0,0.75,0.111,1.43,0.334,2.039s0.551,1.141,0.984,1.594s0.951,0.797,1.553,1.031s1.273,0.352,2.016,0.352   c1.031,0,1.984-0.254,2.859-0.762c0.445-0.281,0.764-0.545,0.955-0.791s0.385-0.615,0.58-1.107l0.48-2.016   c0.031-0.125,0.047-0.211,0.047-0.258c0-0.195-0.086-0.316-0.258-0.363c-0.336-0.078-1.09-0.117-2.262-0.117   c-0.141,0-0.211-0.09-0.211-0.27l0.094-0.387c0.039-0.094,0.137-0.141,0.293-0.141h6c0.125,0,0.188,0.078,0.188,0.234l-0.094,0.387   c0,0.117-0.066,0.176-0.199,0.176c-0.532,0-0.919,0.045-1.161,0.135c-0.243,0.09-0.415,0.322-0.516,0.697l-0.504,1.992   l-0.668,2.719c-0.023,0.109-0.09,0.164-0.199,0.164c-0.117,0-0.297-0.195-0.54-0.586s-0.399-0.691-0.469-0.902   c-0.555,0.68-1.294,1.182-2.216,1.506s-1.88,0.486-2.873,0.486c-1.235,0-2.332-0.281-3.29-0.844   c-0.958-0.563-1.702-1.34-2.234-2.332S0,12.359,0,11.133c0-1.328,0.291-2.646,0.874-3.955s1.374-2.486,2.375-3.533   c1.001-1.047,2.143-1.877,3.424-2.49c1.282-0.613,2.592-0.92,3.929-0.92c0.813,0,1.562,0.193,2.246,0.58s1.222,0.932,1.613,1.635   l1.853-2.168c0.031-0.031,0.071-0.047,0.118-0.047h0.152c0.109,0,0.164,0.074,0.164,0.223l-1.605,6.457   c-0.023,0.109-0.082,0.164-0.176,0.164h-0.41c-0.109,0-0.164-0.082-0.164-0.246c0.063-0.375,0.094-0.797,0.094-1.266   c0-1.258-0.311-2.328-0.932-3.211s-1.525-1.324-2.713-1.324c-1.281,0-2.471,0.324-3.568,0.973S5.246,3.506,4.488,4.564   S3.145,6.793,2.73,8.074S2.109,10.605,2.109,11.824z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 17, 27 ]
});
/**
 * 字符data: H
 */
define("char/data/character/uh", [], {
    path: "M0.211,17.133C0.07,17.133,0,17.043,0,16.863l0.094-0.375c0.031-0.102,0.098-0.152,0.199-0.152   c0.648,0,1.172-0.049,1.57-0.146s0.656-0.326,0.773-0.686L5.93,2.273C5.977,2.156,6,2.039,6,1.922c0-0.258-0.633-0.387-1.898-0.387   c-0.047,0-0.09-0.029-0.129-0.088S3.914,1.328,3.914,1.266l0.094-0.375c0.016-0.102,0.105-0.152,0.27-0.152h6   c0.055,0,0.1,0.025,0.135,0.076s0.053,0.107,0.053,0.17l-0.094,0.375c-0.023,0.117-0.09,0.176-0.199,0.176   c-0.641,0-1.16,0.049-1.559,0.146S7.961,2.008,7.852,2.367L6.387,8.203h7.219l1.465-5.93c0.047-0.117,0.07-0.234,0.07-0.352   c0-0.258-0.629-0.387-1.887-0.387c-0.055,0-0.102-0.029-0.141-0.088s-0.059-0.119-0.059-0.182l0.094-0.375   c0.016-0.102,0.105-0.152,0.27-0.152h6c0.055,0,0.1,0.025,0.135,0.076s0.053,0.107,0.053,0.17l-0.094,0.375   c-0.023,0.117-0.086,0.176-0.188,0.176c-0.648,0-1.168,0.047-1.559,0.141S17.117,2,16.992,2.367l-3.316,13.23   c-0.031,0.156-0.047,0.277-0.047,0.363c0,0.25,0.625,0.375,1.875,0.375c0.063,0,0.115,0.027,0.158,0.082s0.064,0.109,0.064,0.164   l-0.105,0.387c-0.039,0.109-0.133,0.164-0.281,0.164H9.363c-0.063,0-0.115-0.027-0.158-0.082s-0.064-0.117-0.064-0.188l0.105-0.375   c0.031-0.102,0.094-0.152,0.188-0.152c0.656,0,1.184-0.047,1.582-0.141s0.656-0.324,0.773-0.691L13.395,9H6.188l-1.652,6.598   c-0.031,0.156-0.047,0.277-0.047,0.363c0,0.25,0.625,0.375,1.875,0.375c0.063,0,0.113,0.029,0.152,0.088s0.059,0.111,0.059,0.158   L6.48,16.969c-0.039,0.109-0.137,0.164-0.293,0.164H0.211z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 20, 27 ]
});
/**
 * 字符data: I
 */
define("char/data/character/ui", [], {
    path: "M0.188,17.133c-0.125,0-0.188-0.09-0.188-0.27l0.094-0.375c0.031-0.102,0.094-0.152,0.188-0.152   c0.664,0,1.209-0.049,1.635-0.146s0.697-0.326,0.814-0.686l3.293-13.23c0.008-0.023,0.02-0.07,0.035-0.141S6.086,2,6.094,1.945   c0-0.164-0.078-0.27-0.234-0.316C5.57,1.566,4.984,1.535,4.102,1.535c-0.141,0-0.211-0.09-0.211-0.27l0.094-0.375   c0.039-0.102,0.133-0.152,0.281-0.152h6.223c0.047,0,0.09,0.029,0.129,0.088s0.059,0.111,0.059,0.158l-0.094,0.375   c-0.023,0.117-0.086,0.176-0.188,0.176c-0.672,0-1.221,0.049-1.646,0.146S8.055,2.008,7.945,2.367l-3.316,13.23   c-0.031,0.156-0.047,0.27-0.047,0.34c0,0.156,0.082,0.258,0.246,0.305c0.281,0.063,0.863,0.094,1.746,0.094   c0.063,0,0.113,0.029,0.152,0.088s0.059,0.111,0.059,0.158l-0.094,0.387c-0.039,0.109-0.133,0.164-0.281,0.164H0.188z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 字符data: J
 */
define("char/data/character/uj", [], {
    path: "M0.809,15.574c0.141,0.477,0.42,0.844,0.838,1.102s0.877,0.387,1.377,0.387c0.742,0,1.422-0.371,2.039-1.113   s1.023-1.516,1.219-2.32L9.117,2.273c0.031-0.125,0.047-0.211,0.047-0.258c0-0.195-0.098-0.316-0.293-0.363   C8.52,1.574,7.77,1.535,6.621,1.535c-0.125,0-0.188-0.09-0.188-0.27l0.094-0.375c0.016-0.102,0.102-0.152,0.258-0.152h6.047   c0.063,0,0.115,0.029,0.158,0.088s0.064,0.111,0.064,0.158l-0.094,0.375c-0.023,0.117-0.09,0.176-0.199,0.176   c-0.563,0-0.973,0.045-1.23,0.135s-0.438,0.322-0.539,0.697L8.133,13.77c-0.18,0.719-0.531,1.373-1.055,1.963   s-1.154,1.055-1.893,1.395S3.719,17.637,3,17.637c-0.797,0-1.496-0.232-2.098-0.697S0,15.852,0,15.07   c0-0.516,0.131-0.953,0.393-1.313s0.635-0.539,1.119-0.539c0.273,0,0.506,0.086,0.697,0.258s0.287,0.391,0.287,0.656   c0,0.398-0.145,0.742-0.434,1.031s-0.633,0.434-1.031,0.434c-0.039-0.008-0.074-0.014-0.105-0.018S0.855,15.574,0.809,15.574z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 14, 27 ]
});
/**
 * 字符data: K
 */
define("char/data/character/uk", [], {
    path: "M0.211,17.133C0.07,17.133,0,17.043,0,16.863l0.094-0.375c0.031-0.102,0.098-0.152,0.199-0.152   c0.648,0,1.172-0.049,1.57-0.146s0.656-0.326,0.773-0.686L5.93,2.273C5.977,2.156,6,2.039,6,1.922c0-0.258-0.633-0.387-1.898-0.387   c-0.047,0-0.09-0.029-0.129-0.088S3.914,1.328,3.914,1.266l0.094-0.375c0.016-0.102,0.105-0.152,0.27-0.152h6   c0.055,0,0.1,0.025,0.135,0.076s0.053,0.107,0.053,0.17l-0.094,0.375c-0.023,0.117-0.09,0.176-0.199,0.176   c-0.641,0-1.16,0.049-1.559,0.146S7.961,2.008,7.852,2.367l-1.969,7.922l9.48-7.418c0.039-0.078,0.115-0.166,0.229-0.264   s0.203-0.193,0.27-0.287s0.1-0.211,0.1-0.352c0-0.289-0.23-0.434-0.691-0.434c-0.055,0-0.102-0.029-0.141-0.088   S15.07,1.328,15.07,1.266l0.094-0.375c0.016-0.102,0.105-0.152,0.27-0.152h4.324c0.055,0,0.1,0.025,0.135,0.076   s0.053,0.107,0.053,0.17l-0.094,0.375c-0.023,0.117-0.09,0.176-0.199,0.176c-1.102,0-2.34,0.535-3.715,1.605   c-0.047,0.016-0.078,0.031-0.094,0.047l-4.992,3.914l3.551,8.473c0.211,0.352,0.434,0.566,0.668,0.645s0.594,0.117,1.078,0.117   c0.063,0,0.115,0.029,0.158,0.088s0.064,0.111,0.064,0.158l-0.094,0.387c-0.039,0.109-0.137,0.164-0.293,0.164h-5.156   c-0.148,0-0.223-0.09-0.223-0.27l0.094-0.375c0.047-0.102,0.113-0.152,0.199-0.152c0.914,0,1.371-0.23,1.371-0.691   c0-0.047-0.002-0.086-0.006-0.117s-0.01-0.063-0.018-0.094L9.27,8.344l-3.633,2.813l-1.102,4.441   c-0.031,0.156-0.047,0.277-0.047,0.363c0,0.25,0.625,0.375,1.875,0.375c0.063,0,0.113,0.029,0.152,0.088s0.059,0.111,0.059,0.158   L6.48,16.969c-0.039,0.109-0.137,0.164-0.293,0.164H0.211z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 20, 27 ]
});
/**
 * 字符data: L
 */
define("char/data/character/ul", [], {
    path: "M0.211,17.133C0.07,17.133,0,17.043,0,16.863l0.094-0.375c0.031-0.102,0.098-0.152,0.199-0.152   c0.648,0,1.172-0.049,1.57-0.146s0.656-0.326,0.773-0.686L5.93,2.273C5.977,2.156,6,2.039,6,1.922c0-0.258-0.633-0.387-1.898-0.387   c-0.047,0-0.09-0.029-0.129-0.088S3.914,1.328,3.914,1.266l0.094-0.375c0.016-0.102,0.105-0.152,0.27-0.152h6.574   c0.047,0,0.09,0.029,0.129,0.088s0.059,0.111,0.059,0.158l-0.094,0.375c-0.023,0.117-0.086,0.176-0.188,0.176   c-1.156,0-1.918,0.039-2.285,0.117C8.145,1.746,7.938,1.984,7.852,2.367l-3.316,13.23c-0.063,0.219-0.094,0.395-0.094,0.527   c0,0.141,0.266,0.211,0.797,0.211h2.297c1.172,0,2.137-0.215,2.895-0.645s1.361-1.014,1.811-1.752s0.881-1.697,1.295-2.877   c0.023-0.109,0.09-0.164,0.199-0.164h0.211c0.063,0,0.113,0.025,0.152,0.076s0.059,0.104,0.059,0.158   c0,0.016-0.008,0.039-0.023,0.07l-2.063,5.766c-0.023,0.109-0.086,0.164-0.188,0.164H0.211z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 15, 27 ]
});
/**
 * 字符data: M
 */
define("char/data/character/um", [], {
    path: "M0.223,17.133c-0.148,0-0.223-0.09-0.223-0.27l0.094-0.375c0.008-0.023,0.035-0.055,0.082-0.094s0.086-0.059,0.117-0.059   c1.422,0,2.262-0.504,2.52-1.512L5.93,2.273C5.977,2.156,6,2.039,6,1.922c0-0.258-0.633-0.387-1.898-0.387   c-0.047,0-0.09-0.029-0.129-0.088S3.914,1.328,3.914,1.266l0.094-0.375c0.031-0.102,0.098-0.152,0.199-0.152h3.938   c0.148,0,0.234,0.074,0.258,0.223l1.781,13.91l8.754-13.91c0.078-0.148,0.207-0.223,0.387-0.223h3.82   c0.055,0,0.1,0.025,0.135,0.076s0.053,0.107,0.053,0.17l-0.094,0.375c-0.023,0.117-0.09,0.176-0.199,0.176   c-0.641,0-1.16,0.049-1.559,0.146s-0.652,0.326-0.762,0.686l-3.316,13.23c-0.031,0.156-0.047,0.277-0.047,0.363   c0,0.25,0.625,0.375,1.875,0.375c0.063,0,0.113,0.029,0.152,0.088s0.059,0.111,0.059,0.158l-0.094,0.387   c-0.039,0.109-0.137,0.164-0.293,0.164h-5.801c-0.063,0-0.115-0.027-0.158-0.082s-0.064-0.117-0.064-0.188l0.105-0.375   c0.031-0.102,0.094-0.152,0.188-0.152c0.656,0,1.184-0.047,1.582-0.141s0.656-0.324,0.773-0.691l3.48-13.992L9.48,16.898   c-0.086,0.156-0.223,0.234-0.41,0.234c-0.195,0-0.305-0.078-0.328-0.234L6.797,1.652L3.457,14.93   c-0.031,0.188-0.047,0.328-0.047,0.422c0,0.398,0.164,0.662,0.492,0.791s0.73,0.193,1.207,0.193c0.063,0,0.115,0.029,0.158,0.088   s0.064,0.111,0.064,0.158l-0.094,0.387c-0.039,0.109-0.137,0.164-0.293,0.164H0.223z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 24, 27 ]
});
/**
 * 字符data: N
 */
define("char/data/character/un", [], {
    path: "M0.211,17.133C0.07,17.133,0,17.043,0,16.863l0.094-0.375c0.031-0.102,0.098-0.152,0.199-0.152   c1.422,0,2.262-0.504,2.52-1.512L6.094,1.652C5.727,1.574,5.063,1.535,4.102,1.535c-0.047,0-0.09-0.029-0.129-0.088   S3.914,1.328,3.914,1.266l0.094-0.375c0.031-0.102,0.094-0.152,0.188-0.152h3.867c0.102,0,0.168,0.051,0.199,0.152l5.203,12.902   l2.707-10.84c0.039-0.258,0.059-0.402,0.059-0.434c0-0.406-0.162-0.672-0.486-0.797s-0.74-0.188-1.248-0.188   c-0.047,0-0.09-0.029-0.129-0.088s-0.059-0.119-0.059-0.182l0.094-0.375c0.016-0.102,0.102-0.152,0.258-0.152h4.758   c0.055,0,0.1,0.025,0.135,0.076s0.053,0.107,0.053,0.17l-0.094,0.375c-0.023,0.117-0.086,0.176-0.188,0.176   c-1.414,0-2.246,0.504-2.496,1.512l-3.48,13.922c-0.023,0.109-0.09,0.164-0.199,0.164h-0.258c-0.094,0-0.16-0.055-0.199-0.164   L6.82,2.367C6.797,2.266,6.746,2.172,6.668,2.086L3.457,14.93c-0.031,0.188-0.047,0.328-0.047,0.422   c0,0.398,0.164,0.662,0.492,0.791s0.73,0.193,1.207,0.193c0.063,0,0.115,0.029,0.158,0.088s0.064,0.111,0.064,0.158l-0.094,0.387   c-0.047,0.109-0.145,0.164-0.293,0.164H0.211z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 20, 27 ]
});
/**
 * 字符data: O
 */
define("char/data/character/uo", [], {
    path: "M5.972,17.637c-1.179,0-2.223-0.277-3.132-0.832c-0.91-0.555-1.61-1.316-2.102-2.285S0,12.477,0,11.297   C0,10,0.277,8.695,0.831,7.383C1.386,6.07,2.155,4.871,3.138,3.785c0.984-1.086,2.102-1.949,3.355-2.59s2.535-0.961,3.847-0.961   c1.187,0,2.23,0.283,3.132,0.85s1.593,1.334,2.073,2.303s0.72,2.047,0.72,3.234c0,1.289-0.273,2.59-0.82,3.902   s-1.312,2.514-2.295,3.604c-0.983,1.09-2.098,1.947-3.343,2.572S7.284,17.637,5.972,17.637z M6.141,16.992   c1.188,0,2.279-0.365,3.275-1.096s1.855-1.68,2.578-2.848s1.279-2.406,1.67-3.715s0.586-2.51,0.586-3.604   c0-0.859-0.152-1.662-0.457-2.408s-0.764-1.344-1.377-1.793s-1.361-0.674-2.244-0.674c-0.867,0-1.699,0.207-2.496,0.621   S6.148,2.43,5.484,3.094c-0.68,0.703-1.273,1.553-1.781,2.549S2.811,7.678,2.549,8.76s-0.393,2.139-0.393,3.17   c0,1.367,0.334,2.553,1.002,3.557S4.82,16.992,6.141,16.992z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 17, 27 ]
});
/**
 * 字符data: P
 */
define("char/data/character/up", [], {
    path: "M0.223,16.957c-0.148,0-0.223-0.09-0.223-0.27l0.094-0.375c0.008-0.023,0.035-0.055,0.082-0.094s0.086-0.059,0.117-0.059   c0.656,0,1.182-0.047,1.576-0.141s0.65-0.324,0.768-0.691L5.93,2.098C5.977,1.98,6,1.863,6,1.746c0-0.258-0.633-0.387-1.898-0.387   c-0.047,0-0.09-0.029-0.129-0.088S3.914,1.152,3.914,1.09l0.094-0.375c0.031-0.102,0.098-0.152,0.199-0.152h7.957   c0.742,0,1.465,0.135,2.168,0.404s1.275,0.68,1.717,1.23s0.662,1.205,0.662,1.963c0,0.766-0.209,1.479-0.627,2.139   s-0.975,1.225-1.67,1.693s-1.432,0.824-2.209,1.066s-1.533,0.363-2.268,0.363H6.047l-1.488,5.906   c-0.016,0.094-0.031,0.18-0.047,0.258s-0.023,0.145-0.023,0.199c0,0.25,0.625,0.375,1.875,0.375c0.063,0,0.113,0.029,0.152,0.088   s0.059,0.111,0.059,0.158L6.48,16.793c-0.039,0.109-0.137,0.164-0.293,0.164H0.223z M6.164,8.754h3.382   c0.71,0,1.385-0.105,2.025-0.316c0.64-0.211,1.17-0.531,1.591-0.961c0.273-0.273,0.519-0.637,0.737-1.09   c0.218-0.453,0.386-0.92,0.503-1.4c0.117-0.48,0.176-0.932,0.176-1.354c0-0.82-0.304-1.404-0.913-1.752   c-0.609-0.348-1.366-0.521-2.271-0.521H8.996c-0.437,0-0.72,0.043-0.849,0.129s-0.244,0.32-0.345,0.703L6.164,8.754z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 17, 27 ]
});
/**
 * 字符data: Q
 */
define("char/data/character/uq", [], {
    path: "M5.977,17.637c-1.18,0-2.225-0.277-3.135-0.832S1.23,15.488,0.738,14.52S0,12.477,0,11.297C0,10,0.277,8.695,0.832,7.383   s1.324-2.512,2.309-3.598s2.104-1.949,3.357-2.59s2.537-0.961,3.85-0.961c1.188,0,2.232,0.283,3.135,0.85s1.594,1.334,2.074,2.303   s0.721,2.047,0.721,3.234c0,1.438-0.314,2.854-0.943,4.248s-1.494,2.631-2.596,3.709s-2.316,1.883-3.645,2.414   c0,0.695,0.125,1.301,0.375,1.816s0.68,0.773,1.289,0.773c0.438,0,0.855-0.119,1.254-0.357s0.738-0.547,1.02-0.926   s0.484-0.791,0.609-1.236c0.023-0.109,0.094-0.164,0.211-0.164c0.063,0,0.113,0.025,0.152,0.076s0.059,0.104,0.059,0.158v0.07   c-0.133,0.508-0.313,1.035-0.539,1.582s-0.494,1.037-0.803,1.471s-0.68,0.797-1.113,1.09s-0.916,0.439-1.447,0.439   c-1.297,0-1.945-0.816-1.945-2.449c0-0.234,0.023-0.586,0.07-1.055s0.07-0.813,0.07-1.031C7.59,17.508,6.797,17.637,5.977,17.637z    M4.523,16.055c0-0.641,0.245-1.217,0.734-1.729c0.489-0.512,1.048-0.768,1.674-0.768c0.713,0,1.214,0.238,1.504,0.715   C8.726,14.75,8.914,15.383,9,16.172c1.055-0.602,1.984-1.475,2.789-2.619s1.418-2.393,1.84-3.744s0.633-2.664,0.633-3.938   c0-0.859-0.148-1.674-0.445-2.443s-0.756-1.391-1.377-1.863s-1.373-0.709-2.256-0.709c-0.859,0-1.688,0.217-2.484,0.65   s-1.547,1.002-2.25,1.705C4.777,3.93,4.182,4.783,3.662,5.771s-0.92,2.033-1.201,3.135s-0.422,2.141-0.422,3.117   c0,1.063,0.21,2.023,0.631,2.883c0.42,0.859,1.082,1.473,1.985,1.84C4.567,16.574,4.523,16.344,4.523,16.055z M5.121,16.031   c0,0.656,0.344,0.984,1.031,0.984c0.711,0,1.461-0.176,2.25-0.527v-0.363c0-0.617-0.105-1.104-0.316-1.459   s-0.602-0.533-1.172-0.533c-0.461,0-0.875,0.195-1.242,0.586S5.121,15.547,5.121,16.031z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 17, 27 ]
});
/**
 * 字符data: R
 */
define("char/data/character/ur", [], {
    path: "M0.223,17.133c-0.148,0-0.223-0.09-0.223-0.27l0.094-0.375c0.008-0.023,0.035-0.055,0.082-0.094s0.086-0.059,0.117-0.059   c0.656,0,1.182-0.047,1.576-0.141s0.65-0.324,0.768-0.691L5.93,2.273C5.977,2.156,6,2.039,6,1.922c0-0.258-0.633-0.387-1.898-0.387   c-0.047,0-0.09-0.029-0.129-0.088S3.914,1.328,3.914,1.266l0.094-0.375c0.031-0.102,0.098-0.152,0.199-0.152h6.973   c0.602,0,1.203,0.068,1.805,0.205s1.156,0.348,1.664,0.633s0.926,0.658,1.254,1.119s0.492,1.008,0.492,1.641   c0,1.164-0.533,2.154-1.6,2.971s-2.252,1.373-3.557,1.67c0.414,0.156,0.787,0.369,1.119,0.639s0.592,0.586,0.779,0.949   s0.281,0.76,0.281,1.189c0,0.18-0.008,0.309-0.023,0.387l-0.246,2.133c-0.078,0.844-0.117,1.324-0.117,1.441   c0,0.43,0.066,0.762,0.199,0.996s0.395,0.352,0.785,0.352c0.5,0,0.938-0.234,1.313-0.703s0.633-0.98,0.773-1.535   c0.031-0.094,0.098-0.141,0.199-0.141h0.211c0.133,0,0.199,0.074,0.199,0.223v0.07c-0.117,0.445-0.303,0.871-0.557,1.277   s-0.568,0.738-0.943,0.996s-0.781,0.387-1.219,0.387c-0.875,0-1.621-0.207-2.238-0.621s-0.926-1.047-0.926-1.898   c0-0.266,0.039-0.563,0.117-0.891l0.527-2.133c0.063-0.219,0.094-0.449,0.094-0.691c0-0.664-0.242-1.195-0.727-1.594   S9.766,9.211,9.07,9.211H6.094l-1.605,6.387c-0.031,0.156-0.047,0.277-0.047,0.363c0,0.25,0.625,0.375,1.875,0.375   c0.063,0,0.113,0.029,0.152,0.088s0.059,0.111,0.059,0.158l-0.094,0.387c-0.039,0.109-0.137,0.164-0.293,0.164H0.223z M6.246,8.637   H8.93c0.992,0,1.896-0.178,2.713-0.533S13.1,7.217,13.564,6.51s0.697-1.572,0.697-2.596c0-1.586-1.184-2.379-3.551-2.379H9   c-0.438,0-0.721,0.043-0.85,0.129s-0.244,0.32-0.346,0.703L6.246,8.637z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 17, 27 ]
});
/**
 * 字符data: S
 */
define("char/data/character/us", [], {
    path: "M0.176,17.637C0.059,17.637,0,17.566,0,17.426l1.395-5.605c0.031-0.094,0.09-0.141,0.176-0.141h0.281   c0.109,0,0.164,0.074,0.164,0.223c-0.109,0.415-0.18,0.911-0.211,1.49c0,1.149,0.393,2.011,1.178,2.586s1.775,0.862,2.971,0.862   c0.734,0,1.434-0.217,2.098-0.651s1.201-1,1.611-1.7c0.41-0.7,0.615-1.414,0.615-2.141c0-0.586-0.156-1.102-0.469-1.548   s-0.75-0.743-1.313-0.891L5.555,9.112C5.039,8.972,4.594,8.74,4.219,8.416C3.844,8.092,3.557,7.701,3.357,7.244   c-0.199-0.457-0.299-0.946-0.299-1.47c0-0.726,0.162-1.427,0.486-2.103C3.869,2.997,4.301,2.405,4.84,1.897   C5.379,1.39,6.002,0.986,6.709,0.686c0.707-0.301,1.408-0.451,2.104-0.451c0.742,0,1.418,0.144,2.027,0.431s1.07,0.733,1.383,1.339   l1.371-1.723c0.031-0.031,0.07-0.046,0.117-0.046h0.141c0.109,0,0.164,0.074,0.164,0.223l-1.383,5.559   c-0.023,0.109-0.082,0.164-0.176,0.164h-0.281C12.059,6.18,12,6.102,12,5.945c0.086-0.477,0.129-0.927,0.129-1.349   c0-1.134-0.281-2.021-0.844-2.662s-1.41-0.962-2.543-0.962c-0.672,0-1.336,0.188-1.992,0.563S5.563,2.409,5.156,3.031   S4.547,4.303,4.547,4.983c0,0.563,0.16,1.052,0.48,1.466S5.77,7.141,6.293,7.282l2.953,0.797c0.523,0.141,0.973,0.385,1.348,0.733   c0.375,0.348,0.664,0.762,0.867,1.243s0.305,0.991,0.305,1.53c0,0.735-0.156,1.46-0.469,2.175c-0.313,0.716-0.756,1.373-1.33,1.97   c-0.574,0.598-1.213,1.065-1.916,1.401c-0.703,0.336-1.434,0.504-2.191,0.504c-0.852,0-1.637-0.141-2.355-0.422   s-1.285-0.734-1.699-1.359L0.434,17.59c-0.031,0.031-0.07,0.047-0.117,0.047H0.176z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 15, 27 ]
});
/**
 * 字符data: T
 */
define("char/data/character/ut", [], {
    path: "M0.727,16.863l0.094-0.375c0.031-0.102,0.094-0.152,0.188-0.152c1.344,0,2.223-0.047,2.637-0.141   c0.328-0.094,0.547-0.324,0.656-0.691l3.281-13.23c0.055-0.18,0.098-0.355,0.129-0.527c0-0.141-0.266-0.211-0.797-0.211H5.426   c-0.82,0-1.494,0.098-2.021,0.293S2.459,2.301,2.15,2.66S1.584,3.447,1.377,3.943s-0.459,1.189-0.756,2.08   C0.598,6.133,0.535,6.188,0.434,6.188H0.223C0.074,6.188,0,6.109,0,5.953C0,5.938,0.008,5.91,0.023,5.871l1.688-4.98   c0.031-0.102,0.094-0.152,0.188-0.152h13.992c0.055,0,0.1,0.025,0.135,0.076s0.053,0.107,0.053,0.17L15.27,5.977   c0,0.141-0.066,0.211-0.199,0.211h-0.211c-0.148,0-0.223-0.086-0.223-0.258c0.195-0.992,0.293-1.816,0.293-2.473   c0-0.805-0.23-1.326-0.691-1.564s-1.145-0.357-2.051-0.357h-1.477c-0.438,0-0.721,0.041-0.85,0.123S9.613,1.977,9.504,2.367   l-3.316,13.23c-0.016,0.047-0.023,0.125-0.023,0.234c0,0.211,0.098,0.34,0.293,0.387c0.383,0.078,1.223,0.117,2.52,0.117   c0.047,0,0.09,0.029,0.129,0.088s0.059,0.111,0.059,0.158L9.07,16.969c-0.016,0.109-0.102,0.164-0.258,0.164H0.938   C0.797,17.133,0.727,17.043,0.727,16.863z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 17, 27 ]
});
/**
 * 字符data: U
 */
define("char/data/character/uu", [], {
    path: "M1.805,13.77c0,0.906,0.256,1.645,0.768,2.215s1.205,0.855,2.08,0.855c0.711,0,1.387-0.146,2.027-0.439   s1.221-0.689,1.74-1.189s0.961-1.066,1.324-1.699s0.619-1.273,0.768-1.922l2.191-8.637C12.734,2.75,12.75,2.605,12.75,2.52   c0-0.406-0.162-0.672-0.486-0.797s-0.74-0.188-1.248-0.188c-0.047,0-0.09-0.029-0.129-0.088s-0.059-0.119-0.059-0.182l0.094-0.375   c0.016-0.102,0.105-0.152,0.27-0.152h4.816c0.055,0,0.102,0.029,0.141,0.088s0.059,0.111,0.059,0.158l-0.105,0.375   c-0.023,0.117-0.086,0.176-0.188,0.176c-1.406,0-2.238,0.504-2.496,1.512l-2.18,8.684c-0.172,0.719-0.473,1.438-0.902,2.156   s-0.941,1.357-1.535,1.916s-1.252,1.004-1.975,1.336s-1.471,0.498-2.244,0.498c-0.859,0-1.641-0.195-2.344-0.586   s-1.252-0.932-1.646-1.623S0,13.961,0,13.102c0-0.484,0.066-0.973,0.199-1.465l2.32-9.363c0.047-0.117,0.07-0.234,0.07-0.352   c0-0.258-0.629-0.387-1.887-0.387c-0.055,0-0.102-0.029-0.141-0.088S0.504,1.328,0.504,1.266l0.094-0.375   c0.016-0.102,0.105-0.152,0.27-0.152h6c0.055,0,0.1,0.025,0.135,0.076s0.053,0.107,0.053,0.17L6.961,1.359   C6.938,1.477,6.875,1.535,6.773,1.535c-0.648,0-1.168,0.047-1.559,0.141S4.566,2,4.441,2.367l-2.332,9.316   C1.906,12.582,1.805,13.277,1.805,13.77z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 17, 27 ]
});
/**
 * 字符data: V
 */
define("char/data/character/uv", [], {
    path: "M3.835,17.426L1.888,2.039c-0.07-0.211-0.262-0.348-0.575-0.41C1,1.566,0.625,1.535,0.188,1.535   C0.063,1.535,0,1.445,0,1.266l0.094-0.375c0.016-0.102,0.102-0.152,0.258-0.152h5.477c0.047,0,0.092,0.027,0.135,0.082   C6.006,0.875,6.028,0.93,6.028,0.984L5.922,1.359C5.898,1.477,5.836,1.535,5.734,1.535c-0.454,0-0.86,0.039-1.22,0.117   C4.155,1.73,3.952,1.906,3.905,2.18L5.547,15l7.541-12.047c0.141-0.242,0.211-0.469,0.211-0.68c0-0.258-0.111-0.445-0.334-0.563   c-0.223-0.117-0.479-0.176-0.768-0.176c-0.063,0-0.116-0.027-0.159-0.082s-0.064-0.117-0.064-0.188l0.105-0.375   c0.016-0.102,0.109-0.152,0.282-0.152h4.257c0.063,0,0.113,0.029,0.152,0.088s0.059,0.111,0.059,0.158l-0.094,0.375   c-0.023,0.117-0.086,0.176-0.188,0.176c-1.165,0-2.08,0.527-2.744,1.582c-0.032,0.016-0.047,0.031-0.047,0.047L4.82,17.426   c-0.11,0.141-0.239,0.211-0.387,0.211H4.128C3.964,17.637,3.866,17.566,3.835,17.426z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 17, 27 ]
});
/**
 * 字符data: W
 */
define("char/data/character/uw", [], {
    path: "M2.813,17.426L1.758,2.063C1.68,1.711,1.16,1.535,0.199,1.535c-0.039,0-0.082-0.029-0.129-0.088S0,1.328,0,1.266   l0.105-0.375c0.016-0.102,0.102-0.152,0.258-0.152h5.332c0.055,0,0.1,0.025,0.135,0.076s0.053,0.107,0.053,0.17L5.789,1.359   c0,0.117-0.063,0.176-0.188,0.176c-1.188,0-1.813,0.223-1.875,0.668L4.57,14.566l6.141-10.805l-0.117-1.699   c-0.07-0.352-0.582-0.527-1.535-0.527c-0.133,0-0.199-0.09-0.199-0.27l0.094-0.375c0.016-0.102,0.105-0.152,0.27-0.152h5.332   c0.047,0,0.09,0.029,0.129,0.088s0.059,0.111,0.059,0.158l-0.094,0.375c-0.023,0.117-0.09,0.176-0.199,0.176   c-1.195,0-1.824,0.223-1.887,0.668l0.855,12.363l6.609-11.613c0.109-0.203,0.164-0.387,0.164-0.551c0-0.32-0.145-0.545-0.434-0.674   s-0.617-0.193-0.984-0.193c-0.125,0-0.188-0.09-0.188-0.27l0.094-0.375c0.016-0.102,0.102-0.152,0.258-0.152h4.254   c0.055,0,0.1,0.025,0.135,0.076s0.053,0.107,0.053,0.17l-0.094,0.375c-0.023,0.117-0.086,0.176-0.188,0.176   c-1.039,0-1.879,0.535-2.52,1.605l-8.121,14.285c-0.086,0.141-0.211,0.211-0.375,0.211h-0.176c-0.172,0-0.258-0.07-0.258-0.211   L10.781,4.793L3.609,17.426c-0.086,0.141-0.207,0.211-0.363,0.211H3.059C2.895,17.637,2.813,17.566,2.813,17.426z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 24, 27 ]
});
/**
 * 字符data: X
 */
define("char/data/character/ux", [], {
    path: "M0.223,17.133c-0.148,0-0.223-0.09-0.223-0.27l0.094-0.375c0.008-0.023,0.035-0.055,0.082-0.094s0.086-0.059,0.117-0.059   c1.391,0,2.598-0.535,3.621-1.605l0.07-0.047L9.34,8.93L6.434,2.039C6.27,1.828,6.016,1.691,5.672,1.629s-0.754-0.094-1.23-0.094   c-0.141,0-0.211-0.09-0.211-0.27l0.094-0.375c0.039-0.102,0.133-0.152,0.281-0.152h5.602c0.047,0,0.09,0.029,0.129,0.088   s0.059,0.111,0.059,0.158l-0.094,0.375c-0.023,0.117-0.09,0.176-0.199,0.176c-0.281,0-0.574,0.051-0.879,0.152   S8.73,1.945,8.66,2.156l2.191,5.156l4.078-4.406c0.008-0.031,0.063-0.119,0.164-0.264s0.152-0.291,0.152-0.439   c0-0.227-0.088-0.395-0.264-0.504s-0.385-0.164-0.627-0.164c-0.063,0-0.115-0.027-0.158-0.082s-0.064-0.117-0.064-0.188   l0.105-0.375c0.039-0.102,0.133-0.152,0.281-0.152h4.828c0.063,0,0.113,0.029,0.152,0.088s0.059,0.111,0.059,0.158l-0.094,0.375   c-0.023,0.117-0.086,0.176-0.188,0.176c-1.391,0-2.609,0.535-3.656,1.605l-0.047,0.047l-4.465,4.805l3.34,7.84   c0.172,0.219,0.426,0.357,0.762,0.416s0.738,0.088,1.207,0.088c0.063,0,0.113,0.029,0.152,0.088s0.059,0.111,0.059,0.158   l-0.094,0.387c-0.016,0.109-0.102,0.164-0.258,0.164h-5.59c-0.148,0-0.223-0.09-0.223-0.27l0.094-0.375   c0.008-0.023,0.035-0.055,0.082-0.094s0.086-0.059,0.117-0.059c0.258,0,0.547-0.051,0.867-0.152s0.52-0.258,0.598-0.469   L9.621,9.598l-4.992,5.379c-0.008,0.031-0.061,0.117-0.158,0.258s-0.146,0.285-0.146,0.434c0,0.227,0.092,0.395,0.275,0.504   s0.389,0.164,0.615,0.164c0.063,0,0.113,0.029,0.152,0.088s0.059,0.111,0.059,0.158l-0.094,0.387   c-0.039,0.109-0.137,0.164-0.293,0.164H0.223z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 20, 27 ]
});
/**
 * 字符data: Y
 */
define("char/data/character/uy", [], {
    path: "M1.44,16.863l0.105-0.375c0.031-0.102,0.094-0.152,0.188-0.152c0.866,0,1.448-0.039,1.745-0.117   c0.148-0.031,0.253-0.08,0.316-0.146c0.063-0.066,0.117-0.164,0.164-0.293s0.09-0.229,0.129-0.299l1.218-4.898L2.143,2.039   c-0.148-0.211-0.388-0.348-0.72-0.41c-0.332-0.063-0.732-0.094-1.2-0.094c-0.063,0-0.115-0.027-0.158-0.082S0,1.336,0,1.266   l0.105-0.375c0.039-0.102,0.133-0.152,0.281-0.152h5.586c0.062,0,0.115,0.029,0.158,0.088s0.064,0.111,0.064,0.158L6.101,1.359   c-0.023,0.117-0.09,0.176-0.199,0.176c-1.023,0-1.534,0.184-1.534,0.551l2.787,7.512l5.797-6.668   c0.023-0.078,0.098-0.203,0.222-0.375c0.125-0.172,0.188-0.344,0.188-0.516c0-0.336-0.277-0.504-0.832-0.504   c-0.148,0-0.222-0.09-0.222-0.27l0.094-0.375c0.039-0.102,0.136-0.152,0.292-0.152h4.286c0.063,0,0.111,0.025,0.146,0.076   s0.053,0.107,0.053,0.17l-0.094,0.375c-0.023,0.117-0.09,0.176-0.199,0.176c-1.226,0-2.287,0.527-3.185,1.582l-0.047,0.035   l-0.047,0.035l-6.429,7.395l-1.253,4.992c0,0.031-0.008,0.094-0.023,0.188s-0.023,0.16-0.023,0.199c0,0.25,0.625,0.375,1.874,0.375   c0.055,0,0.1,0.025,0.135,0.076s0.053,0.107,0.053,0.17l-0.094,0.387c-0.016,0.109-0.102,0.164-0.258,0.164H1.663   c-0.063,0-0.115-0.027-0.158-0.082S1.44,16.934,1.44,16.863z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 18, 27 ]
});
/**
 * 字符data: Z
 */
define("char/data/character/uz", [], {
    path: "M0,16.969c0-0.242,0.055-0.418,0.164-0.527L13.336,1.535H9.785c-0.898,0-1.67,0.078-2.314,0.234S6.271,2.176,5.807,2.52   S4.939,3.318,4.6,3.885S3.957,5.164,3.691,6.023C3.668,6.133,3.605,6.188,3.504,6.188H3.281c-0.141,0-0.211-0.078-0.211-0.234   c0-0.016,0.008-0.043,0.023-0.082l1.512-4.98c0.031-0.102,0.094-0.152,0.188-0.152h10.758c0.125,0,0.188,0.059,0.188,0.176   c0,0.219-0.055,0.387-0.164,0.504L2.426,16.289h3.715c1.086,0,1.98-0.102,2.684-0.305s1.293-0.523,1.77-0.961   s0.871-0.98,1.184-1.629s0.633-1.5,0.961-2.555c0.031-0.094,0.098-0.141,0.199-0.141h0.211c0.063,0,0.113,0.025,0.152,0.076   s0.059,0.1,0.059,0.146c0,0.031-0.008,0.055-0.023,0.07l-1.863,5.977c-0.023,0.109-0.09,0.164-0.199,0.164H0.188   C0.063,17.133,0,17.078,0,16.969z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data: v
 */
define("char/data/character/v", [], {
    path: "M1.898,14.449c0-0.359,0.047-0.775,0.141-1.248s0.191-0.863,0.293-1.172s0.252-0.734,0.451-1.277S3.16,9.734,3.316,9.328   c0.219-0.586,0.328-1.074,0.328-1.465c0-0.492-0.184-0.738-0.551-0.738c-0.625,0-1.139,0.32-1.541,0.961s-0.713,1.367-0.932,2.18   c-0.039,0.117-0.094,0.176-0.164,0.176H0.176C0.059,10.441,0,10.359,0,10.195C0.242,9.25,0.623,8.406,1.143,7.664   s1.186-1.113,1.998-1.113c0.555,0,1.018,0.186,1.389,0.557s0.557,0.834,0.557,1.389c0,0.297-0.063,0.602-0.188,0.914   c-0.195,0.516-0.416,1.105-0.662,1.77s-0.445,1.299-0.598,1.904S3.41,14.238,3.41,14.73c0,0.594,0.145,1.086,0.434,1.477   s0.719,0.586,1.289,0.586c1.313,0,2.441-1.145,3.387-3.434c0.531-1.375,0.797-2.398,0.797-3.07c0-0.453-0.07-0.82-0.211-1.102   S8.781,8.617,8.555,8.32s-0.34-0.512-0.34-0.645c0-0.305,0.119-0.572,0.357-0.803s0.502-0.346,0.791-0.346   c0.375,0,0.637,0.172,0.785,0.516s0.223,0.73,0.223,1.16c0,0.711-0.125,1.559-0.375,2.543s-0.535,1.867-0.855,2.648   c-0.266,0.648-0.584,1.271-0.955,1.869s-0.82,1.098-1.348,1.5s-1.111,0.604-1.752,0.604c-0.961,0-1.732-0.246-2.314-0.738   S1.898,15.41,1.898,14.449z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 字符data: w
 */
define("char/data/character/w", [], {
    path: "M1.898,14.402c0-0.5,0.072-1.033,0.217-1.6s0.303-1.082,0.475-1.547s0.414-1.107,0.727-1.928   c0.219-0.586,0.328-1.074,0.328-1.465c0-0.492-0.184-0.738-0.551-0.738c-0.625,0-1.139,0.32-1.541,0.961s-0.713,1.367-0.932,2.18   c-0.039,0.117-0.094,0.176-0.164,0.176H0.176C0.059,10.441,0,10.359,0,10.195C0.242,9.25,0.623,8.406,1.143,7.664   s1.186-1.113,1.998-1.113c0.555,0,1.018,0.186,1.389,0.557s0.557,0.834,0.557,1.389c0,0.297-0.063,0.602-0.188,0.914   c-0.188,0.5-0.408,1.092-0.662,1.775s-0.451,1.307-0.592,1.869s-0.211,1.098-0.211,1.605c0,0.641,0.16,1.156,0.48,1.547   s0.793,0.586,1.418,0.586c0.82,0,1.523-0.656,2.109-1.969v-0.375c0-0.477,0.063-0.973,0.188-1.488L9,7.535   c0.047-0.219,0.16-0.398,0.34-0.539s0.379-0.211,0.598-0.211c0.188,0,0.342,0.057,0.463,0.17s0.182,0.268,0.182,0.463v0.188   l-1.359,5.426c-0.156,0.594-0.246,1.16-0.27,1.699c0,0.594,0.146,1.086,0.439,1.477s0.725,0.586,1.295,0.586   c1.172,0,2.129-0.91,2.871-2.73c0.227-0.563,0.447-1.223,0.662-1.98s0.322-1.355,0.322-1.793c0-0.453-0.07-0.82-0.211-1.102   s-0.324-0.57-0.551-0.867s-0.34-0.512-0.34-0.645c0-0.305,0.119-0.572,0.357-0.803s0.502-0.346,0.791-0.346   c0.375,0,0.637,0.172,0.785,0.516s0.223,0.73,0.223,1.16c0,0.461-0.074,1.063-0.223,1.805s-0.322,1.449-0.521,2.121   s-0.412,1.293-0.639,1.863c-0.891,2.25-2.086,3.375-3.586,3.375c-0.656,0-1.254-0.131-1.793-0.393s-0.93-0.674-1.172-1.236   c-0.633,1.086-1.418,1.629-2.355,1.629c-0.68,0-1.271-0.104-1.775-0.311s-0.902-0.535-1.195-0.984S1.898,15.066,1.898,14.402z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data: x
 */
define("char/data/character/x", [], {
    path: "M1.013,16.488c0.313,0.203,0.723,0.305,1.231,0.305c0.5,0,0.941-0.24,1.324-0.721s0.645-0.998,0.785-1.553l1.078-4.324   c0.18-0.734,0.27-1.254,0.27-1.559c0-0.414-0.107-0.77-0.322-1.066S4.853,7.125,4.447,7.125c-0.516,0-0.991,0.16-1.424,0.48   c-0.434,0.32-0.793,0.721-1.079,1.201s-0.491,0.967-0.616,1.459c-0.039,0.117-0.094,0.176-0.164,0.176H0.871   c-0.109,0-0.164-0.082-0.164-0.246c0.148-0.594,0.402-1.17,0.762-1.729S2.27,7.449,2.793,7.09s1.09-0.539,1.699-0.539   c0.578,0,1.092,0.158,1.541,0.475S6.801,7.773,6.988,8.32c0.266-0.5,0.604-0.92,1.016-1.26c0.411-0.34,0.866-0.51,1.367-0.51   c0.571,0,1.084,0.131,1.538,0.393c0.454,0.262,0.681,0.65,0.681,1.166c0,0.375-0.122,0.697-0.365,0.967s-0.55,0.404-0.919,0.404   c-0.228,0-0.426-0.074-0.595-0.223c-0.169-0.148-0.253-0.34-0.253-0.574c0-0.305,0.108-0.576,0.324-0.814   c0.216-0.238,0.473-0.381,0.771-0.428c-0.289-0.211-0.699-0.316-1.23-0.316c-0.492,0-0.928,0.238-1.307,0.715s-0.639,1-0.779,1.57   l-1.078,4.313c-0.18,0.625-0.27,1.145-0.27,1.559c0,0.406,0.109,0.76,0.328,1.061s0.527,0.451,0.926,0.451   c0.734,0,1.389-0.33,1.964-0.99c0.574-0.66,0.959-1.377,1.155-2.15c0.039-0.109,0.094-0.164,0.164-0.164h0.293   c0.047,0,0.086,0.023,0.117,0.07s0.047,0.102,0.047,0.164c-0.148,0.594-0.404,1.172-0.768,1.734s-0.805,1.021-1.324,1.377   s-1.084,0.533-1.693,0.533c-0.375,0-0.736-0.074-1.084-0.223s-0.643-0.359-0.885-0.633s-0.418-0.578-0.527-0.914   c-0.25,0.5-0.585,0.92-1.004,1.26c-0.418,0.34-0.878,0.51-1.379,0.51c-0.563,0-1.074-0.129-1.532-0.387   C0.229,16.723,0,16.332,0,15.809c0-0.375,0.122-0.695,0.365-0.961s0.55-0.398,0.919-0.398c0.243,0,0.445,0.072,0.606,0.217   S2.133,15,2.133,15.234c0,0.297-0.108,0.568-0.324,0.814C1.593,16.295,1.328,16.441,1.013,16.488z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 字符data: y
 */
define("char/data/character/y", [], {
    path: "M1.23,20.473c0.141,0.313,0.373,0.555,0.697,0.727s0.674,0.258,1.049,0.258c0.961,0,1.787-0.455,2.479-1.365   s1.17-1.912,1.436-3.006l0.188-0.773c-0.719,0.703-1.492,1.055-2.32,1.055c-0.883,0-1.584-0.248-2.104-0.744   s-0.779-1.182-0.779-2.057c0-0.367,0.043-0.771,0.129-1.213s0.189-0.85,0.311-1.225s0.305-0.898,0.551-1.57s0.396-1.082,0.451-1.23   c0.219-0.586,0.328-1.074,0.328-1.465c0-0.492-0.184-0.738-0.551-0.738c-0.625,0-1.139,0.32-1.541,0.961s-0.713,1.367-0.932,2.18   c-0.039,0.117-0.094,0.176-0.164,0.176H0.176C0.059,10.441,0,10.359,0,10.195C0.242,9.25,0.623,8.406,1.143,7.664   s1.186-1.113,1.998-1.113c0.555,0,1.018,0.186,1.389,0.557s0.557,0.834,0.557,1.389c0,0.297-0.063,0.602-0.188,0.914   c-0.063,0.172-0.221,0.594-0.475,1.266s-0.447,1.23-0.58,1.676s-0.242,0.875-0.328,1.289s-0.129,0.824-0.129,1.23   c0,0.547,0.113,1.004,0.34,1.371s0.586,0.551,1.078,0.551c1,0,1.871-0.605,2.613-1.816l1.875-7.441   c0.047-0.219,0.16-0.398,0.34-0.539s0.379-0.211,0.598-0.211c0.188,0,0.342,0.057,0.463,0.17s0.182,0.268,0.182,0.463v0.188   L8.473,17.18c-0.219,0.844-0.596,1.635-1.131,2.373s-1.189,1.336-1.963,1.793s-1.582,0.686-2.426,0.686   c-0.406,0-0.799-0.08-1.178-0.24s-0.686-0.396-0.92-0.709s-0.352-0.676-0.352-1.09c0-0.43,0.113-0.793,0.34-1.09   s0.547-0.445,0.961-0.445c0.234,0,0.432,0.068,0.592,0.205s0.24,0.322,0.24,0.557c0,0.344-0.123,0.643-0.369,0.896   s-0.537,0.381-0.873,0.381c-0.023-0.008-0.047-0.014-0.07-0.018S1.27,20.473,1.23,20.473z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 字符data: z
 */
define("char/data/character/z", [], {
    path: "M0.164,17.367C0.055,17.367,0,17.305,0,17.18c0-0.031,0.008-0.063,0.023-0.094c0.43-0.75,0.947-1.467,1.553-2.15   s1.295-1.375,2.068-2.074s1.547-1.402,2.32-2.109s1.402-1.334,1.887-1.881H7.629c-0.234,0-0.498-0.043-0.791-0.129   S6.266,8.564,6,8.467s-0.512-0.178-0.738-0.24s-0.453-0.094-0.68-0.094c-0.438,0-0.855,0.098-1.254,0.293S2.684,8.906,2.59,9.281   C2.551,9.398,2.496,9.457,2.426,9.457H2.133c-0.109,0-0.164-0.082-0.164-0.246C2.164,8.5,2.527,7.879,3.059,7.348   s1.137-0.797,1.816-0.797c0.313,0,0.576,0.076,0.791,0.229s0.467,0.389,0.756,0.709s0.506,0.535,0.65,0.645   s0.346,0.164,0.604,0.164c0.328,0,0.609-0.117,0.844-0.352s0.461-0.521,0.68-0.861s0.359-0.518,0.422-0.533h0.293   c0.109,0,0.164,0.063,0.164,0.188c0,0.031-0.008,0.063-0.023,0.094c-0.43,0.75-0.967,1.486-1.611,2.209s-1.309,1.395-1.992,2.016   s-1.443,1.313-2.279,2.074s-1.508,1.424-2.016,1.986c0.016-0.008,0.033-0.014,0.053-0.018s0.045-0.006,0.076-0.006   c0.094-0.031,0.242-0.047,0.445-0.047c0.258,0,0.498,0.031,0.721,0.094s0.467,0.143,0.732,0.24s0.545,0.189,0.838,0.275   s0.557,0.129,0.791,0.129c0.641,0,1.24-0.197,1.799-0.592s0.908-0.893,1.049-1.494c0.039-0.109,0.098-0.164,0.176-0.164h0.281   c0.117,0,0.176,0.078,0.176,0.234c-0.094,0.414-0.258,0.842-0.492,1.283s-0.514,0.832-0.838,1.172s-0.697,0.615-1.119,0.826   S5.98,17.367,5.52,17.367c-0.313,0-0.566-0.068-0.762-0.205s-0.432-0.359-0.709-0.668s-0.504-0.531-0.68-0.668   s-0.396-0.205-0.662-0.205c-0.297,0-0.572,0.08-0.826,0.24s-0.49,0.375-0.709,0.645s-0.383,0.479-0.492,0.627   s-0.184,0.227-0.223,0.234H0.164z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 希腊字符data: alpha
 */
define("char/data/greek/alpha", [], {
    path: "M10.153,13.101c1.488-1.968,2.112-3.84,2.424-4.896c0.096-0.432,0.12-0.504,0.336-0.504c0.072,0,0.264,0,0.264,0.216   c0,0.024-0.576,3.048-3.024,5.977c0,1.464,0,3,0.744,3c0.576,0,1.128-0.528,1.344-1.128c0.072-0.192,0.096-0.264,0.288-0.264   c0.072,0,0.24,0,0.24,0.216c0,0.312-0.648,1.656-1.944,1.656c-1.032,0-1.776-0.672-2.112-2.017c-1.704,1.44-3.48,2.017-4.968,2.017   C1.296,17.373,0,15.477,0,13.389C0,9.98,3.145,6.548,6.289,6.548c2.544,0,3.864,2.184,3.864,4.512V13.101z M8.593,13.917   c0-0.6,0.024-1.224,0.024-1.824c0-2.016,0-5.064-2.328-5.064c-1.08,0-2.424,0.744-3.408,2.424c-0.744,1.32-1.272,3.769-1.272,4.8   c0,1.128,0.48,2.64,2.184,2.64c0.84,0,2.736-0.216,4.849-2.112C8.617,14.517,8.593,14.396,8.593,13.917z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 14, 27 ]
});
/**
 * 希腊字符data: beta
 */
define("char/data/greek/beta", [], {
    path: "M10.114,7.436c0.384,0.288,0.744,0.624,1.032,1.08c0.504,0.768,0.72,1.68,0.72,2.592c0,3.576-3.24,6.265-6.673,6.265   c-1.416,0-2.736-1.104-2.976-2.448l-1.68,6.72c-0.024,0.12-0.144,0.144-0.312,0.144c-0.12,0-0.264-0.048-0.216-0.24L3.801,6.5   C4.425,4.004,6.394,0.211,9.49,0.211c2.184,0,3.408,1.512,3.408,2.952C12.898,5.06,11.842,6.524,10.114,7.436z M9.442,0.691   c-2.328,0-4.344,2.832-5.136,5.977L2.745,12.98c-0.096,0.36-0.096,0.672-0.096,0.888c0,1.632,0.912,3.024,2.664,3.024   c1.656,0,3.528-1.152,4.32-2.928c0.456-1.032,0.84-2.16,0.84-3.552c0-1.2-0.336-2.016-1.104-2.64   C8.794,7.94,8.242,8.084,7.618,8.084c-0.408,0-1.728,0.072-1.728-0.576c0-0.768,1.44-0.72,1.944-0.72   c0.528,0,1.152,0.12,1.608,0.288c1.56-0.888,2.208-2.809,2.208-4.128C11.65,1.892,11.17,0.691,9.442,0.691z M7.521,7.268   c-0.504,0-0.864,0.048-1.104,0.216c0.432,0.144,0.744,0.12,1.08,0.12c0.456,0,0.84-0.048,1.224-0.192   C8.386,7.316,7.954,7.268,7.521,7.268z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 14, 27 ]
});
/**
 * 希腊字符data: chi
 */
define("char/data/greek/chi", [], {
    path: "M12.601,7.076c0.24-0.264,0.312-0.264,0.384-0.264c0.12,0,0.24,0.072,0.24,0.24c0,0.096-0.024,0.12-0.216,0.336   l-5.688,6.48c0.408,1.488,0.96,3.408,1.584,5.016c1.056,2.665,1.44,2.665,1.752,2.665c0.384,0,1.008-0.336,1.272-1.008   c0.072-0.192,0.096-0.288,0.288-0.288c0.12,0,0.264,0.048,0.264,0.216c0,0.336-0.624,1.56-1.992,1.56   c-2.04,0-2.544-1.176-2.928-2.088c-0.36-0.888-0.36-0.936-1.536-4.632L3.24,18.477c-0.624,0.72-2.112,2.496-2.784,3.168   c-0.072,0.072-0.144,0.12-0.24,0.12C0.12,21.765,0,21.717,0,21.525c0-0.024,0-0.12,0.216-0.384l5.665-6.433   c-0.648-2.328-0.936-3.336-1.512-4.8c-0.432-1.152-1.104-2.88-1.8-2.88c-0.216,0-0.96,0.144-1.32,1.08   C1.224,8.204,1.176,8.324,0.984,8.324c-0.144,0-0.264-0.072-0.264-0.216c0-0.312,0.648-1.56,1.992-1.56   c0.84,0,1.656,0.288,2.088,0.672c0.336,0.336,0.528,0.504,1.272,2.568c0.6,1.68,0.456,1.488,1.104,3.48L12.601,7.076z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 14, 27 ]
});
/**
 * 希腊字符data: delta
 */
define("char/data/greek/delta", [], {
    path: "M3.864,2.54c0-2.448,2.353-2.448,2.76-2.448c0.408,0,0.744,0,1.873,0.24c0.84,0.192,1.2,0.264,1.2,0.72   c0,0.384-0.36,0.888-0.864,0.888c-0.312,0-0.864-0.312-1.08-0.456c-0.72-0.408-1.176-0.672-1.92-0.672   c-1.056,0-1.368,0.72-1.368,1.128c0,1.152,1.44,3,2.328,4.128c0.6,0.792,1.608,2.112,1.608,4.272c0,3.192-1.92,7.081-4.752,7.081   c-1.92,0-3.648-1.44-3.648-4.008c0-2.809,2.208-6,5.281-6.745C4.464,5.084,3.864,3.716,3.864,2.54z M1.392,14.084   c0,2.232,1.344,2.856,2.28,2.856c2.136,0,3.145-3.769,3.145-5.641c0-1.56-0.36-2.28-1.272-4.176   C2.28,7.988,1.392,12.524,1.392,14.084z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 希腊字符data: epsilon
 */
define("char/data/greek/epsilon", [], {
    path: "M1.896,11.737c-0.216,0.96-0.264,1.584-0.264,2.04c0,2.328,1.344,3.168,2.616,3.168c0.72,0,1.608-0.288,2.52-0.888   c0.12-0.096,0.168-0.12,0.24-0.12c0.144,0,0.216,0.144,0.216,0.288c0,0.24-1.512,1.2-3.048,1.2C1.8,17.426,0,15.625,0,12.961   c0-3.768,3.24-6.12,6.193-6.12h0.816c0.432,0,0.696,0,0.696,0.312c0,0.384-0.36,0.384-0.768,0.384H6.241   c-2.136,0-3.552,1.32-4.152,3.504h3.888c0.432,0,0.672,0,0.672,0.312c0,0.384-0.408,0.384-0.768,0.384H1.896z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 8, 27 ]
});
/**
 * 希腊字符data: eta
 */
define("char/data/greek/eta", [], {
    path: "M7.993,21.477c-0.192,0.72-0.696,0.816-0.912,0.816c-0.36,0-0.648-0.24-0.648-0.6c0-0.144,0.048-0.288,0.072-0.408   l2.784-11.041c0.12-0.456,0.216-0.84,0.216-1.536c0-0.96-0.336-1.68-1.296-1.68c-0.936,0-1.752,0.384-2.376,0.96   C4.944,8.756,4.345,9.956,4.296,10.1l-0.792,3.168l-0.528,2.16c-0.12,0.48-0.336,1.32-0.384,1.44   c-0.192,0.36-0.528,0.504-0.816,0.504c-0.36,0-0.624-0.264-0.624-0.6c0-0.12,0.264-1.248,0.432-1.873   c0.12-0.432,0.384-1.512,0.48-1.968l0.672-2.592c0.168-0.744,0.408-1.68,0.408-2.208c0-0.72-0.192-1.104-0.744-1.104   c-0.96,0-1.416,1.416-1.776,2.833c-0.144,0.552-0.168,0.576-0.36,0.576C0.096,10.436,0,10.316,0,10.22s0.336-1.56,0.768-2.424   c0.456-0.912,1.008-1.248,1.704-1.248c1.056,0,2.041,0.744,2.112,2.112c0.432-0.6,1.56-2.112,3.696-2.112   c1.824,0,2.664,1.08,2.664,2.52c0,0.648-0.072,0.937-0.192,1.417L7.993,21.477z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 希腊字符data: gamma
 */
define("char/data/greek/gamma", [], {
    path: "M10.249,10.196c0.72-1.632,1.56-3.264,1.608-3.313c0.048-0.096,0.168-0.096,0.216-0.096c0.216,0,0.24,0.168,0.24,0.192   c0,0.072-0.336,0.72-0.504,1.104c-1.896,3.769-3.264,7.729-3.336,8.305c-0.12,0.96-0.264,2.016-0.84,4.128   c-0.264,0.96-0.48,1.752-0.84,1.752c-0.192,0-0.264-0.216-0.264-0.408c0-0.672,0.792-3.648,1.249-5.137   c0.144-0.48,0.312-0.984,0.312-2.496c0-2.376-0.48-6.097-3.816-6.097c-1.656,0-3.192,1.176-3.696,2.665   c-0.12,0.312-0.12,0.36-0.336,0.36c-0.072,0-0.24,0-0.24-0.216c0-0.624,1.608-4.393,4.561-4.393c1.752,0,2.568,1.272,3.048,2.472   c0.912,2.16,0.96,4.008,1.008,5.185C9.409,12.092,9.889,11.012,10.249,10.196z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 13, 27 ]
});
/**
 * 希腊字符data: iota
 */
define("char/data/greek/iota", [], {
    path: "M1.944,17.373C0.6,17.373,0,16.365,0,15.429c0-0.816,0.552-1.752,0.768-2.592c0.168-0.6,0.144-0.408,0.312-1.032   c0.096-0.288,0.696-2.472,0.72-2.568C1.944,8.78,2.184,7.628,2.352,7.172c0.144-0.384,0.48-0.624,0.864-0.624   c0.312,0,0.624,0.216,0.624,0.6c0,0.192-0.912,4.056-2.112,7.321c-0.12,0.336-0.384,1.056-0.384,1.632   c0,0.744,0.36,0.792,0.648,0.792c1.008,0,2.952-0.768,3.72-3.096c0.072-0.216,0.12-0.312,0.312-0.312   c0.144,0,0.24,0.096,0.24,0.216C6.265,14.493,4.608,17.373,1.944,17.373z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 7, 27 ]
});
/**
 * 希腊字符data: kappa
 */
define("char/data/greek/kappa", [], {
    path: "M8.4,13.604c0,0.264-0.072,0.552-0.12,0.792c-0.096,0.36-0.192,0.888-0.192,1.344c0,0.84,0.264,1.152,0.792,1.152   c1.224,0,1.752-1.776,2.064-2.928c0.096-0.384,0.12-0.48,0.336-0.48c0.144,0,0.24,0.096,0.24,0.216   c0,0.096-0.312,1.416-0.816,2.352c-0.36,0.624-0.912,1.32-1.896,1.32c-1.176,0-2.112-0.888-2.112-2.329   c0-0.144,0-0.408,0.096-0.864c0.072-0.264,0.072-0.336,0.072-0.504c0-1.176-1.032-1.944-4.08-2.088   c-0.048,0.144-1.032,4.152-1.176,4.656c-0.12,0.504-0.264,1.128-0.984,1.128c-0.36,0-0.624-0.264-0.624-0.6   c0-0.144,0-0.192,0.072-0.48l2.232-8.905c0.192-0.768,0.72-0.84,0.936-0.84c0.312,0,0.624,0.216,0.624,0.6l-0.912,3.816   c0.984-0.312,1.68-0.84,3.072-2.064c1.056-0.888,2.472-2.112,3.912-2.112c0.84,0,0.888,0.624,0.888,0.768   c0,0.456-0.432,1.176-1.2,1.176c-0.24,0-0.792-0.12-0.792-0.768c0-0.168,0.024-0.36,0.12-0.504c-0.912,0.36-1.44,0.744-2.88,1.992   c-0.6,0.504-1.488,1.248-2.28,1.68C5.376,11.204,8.4,11.42,8.4,13.604z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 希腊字符data: lambda
 */
define("char/data/greek/lambda", [], {
    path: "M10.969,15.981c0.096,0.288,0.264,0.72,0.48,0.984c0.096,0.096,0.12,0.12,0.12,0.216c0,0.192-0.168,0.192-0.264,0.192   h-0.456c-0.672,0-0.72,0-0.96-0.216c-0.336-0.312-0.456-0.648-0.576-1.008c-0.744-2.017-1.512-4.225-2.136-6.097   c-2.184,2.592-5.617,6.792-6,7.152c-0.144,0.144-0.408,0.192-0.504,0.192C0.288,17.397,0,17.109,0,16.773   c0-0.312,0.192-0.504,0.48-0.792l6.241-6.313c0.192-0.192,0.216-0.216,0.216-0.24c0-0.048-2.472-7.225-2.712-7.681   C3.84,1.051,3.552,1.003,3.192,0.956c-0.12-0.024-0.264-0.048-0.264-0.24c0-0.24,0.264-0.24,0.408-0.24   c0.312,0,2.208,0,2.808,1.704L10.969,15.981z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 希腊字符data: mu
 */
define("char/data/greek/mu", [], {
    path: "M1.656,21.069c-0.168,0.672-0.312,1.224-1.008,1.224c-0.36,0-0.648-0.24-0.648-0.6c0-0.144,0.048-0.288,0.072-0.408   l3.48-13.897c0.192-0.768,0.72-0.84,0.937-0.84c0.312,0,0.624,0.216,0.624,0.6c0,0.144-0.192,0.912-0.312,1.368l-1.08,4.32   c-0.096,0.408-0.312,1.248-0.312,1.944c0,1.128,0.432,2.112,1.776,2.112c1.512,0,2.448-1.296,2.736-1.704   c0.312-0.384,0.312-0.432,0.432-0.912l1.68-6.672c0.192-0.72,0.696-0.816,0.912-0.816c0.36,0,0.648,0.24,0.648,0.6   c0,0.096-0.264,1.128-0.408,1.704c-0.12,0.432-0.384,1.512-0.48,1.968l-0.672,2.592c-0.168,0.72-0.384,1.584-0.384,2.136   c0,0.48,0.048,1.104,0.744,1.104c0.984,0,1.44-1.512,1.8-2.928c0.096-0.36,0.12-0.48,0.336-0.48c0.144,0,0.24,0.096,0.24,0.216   c0,0.096-0.336,1.56-0.72,2.376c-0.432,0.864-1.008,1.296-1.728,1.296c-0.84,0-1.848-0.504-2.088-1.776   c-0.552,0.744-1.608,1.776-3.145,1.776c-0.816,0-1.704-0.216-2.304-0.768L1.656,21.069z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 13, 27 ]
});
/**
 * 希腊字符data: nu
 */
define("char/data/greek/nu", [], {
    path: "M1.632,16.413c3.192-1.056,6.48-4.032,7.896-9.049c0.048-0.168,0.216-0.816,0.912-0.816c0.312,0,0.624,0.216,0.624,0.6   c0,0.096-0.432,3.048-3.528,6.241c-2.808,2.88-6.457,3.744-6.792,3.744H0.24c-0.168,0-0.24-0.144-0.24-0.24L2.112,8.42   c0.024-0.096,0.072-0.384,0.072-0.48c0-0.264-0.072-0.432-1.2-0.432c-0.336,0-0.528,0-0.528-0.24c0-0.432,0.24-0.456,0.504-0.48   c0.36-0.024,2.616-0.24,2.784-0.24c0.192,0,0.264,0.144,0.264,0.24L1.632,16.413z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 希腊字符data: omega
 */
define("char/data/greek/omega", [], {
    path: "M12.601,13.82c-0.864,1.944-2.016,3.553-3.84,3.553c-1.752,0-2.472-1.272-2.664-2.616   c-0.504,0.912-1.752,2.616-3.745,2.616c-1.8,0-2.352-1.776-2.352-3.265c0-2.304,0.864-4.968,2.088-6.864   c0.192-0.288,0.312-0.6,0.696-0.6c0.216,0,0.312,0.264,0.312,0.432c0,0.048-0.168,0.288-0.408,0.648   c-0.432,0.6-1.992,2.784-1.992,5.28c0,1.368,0.432,2.784,2.041,2.784c1.536,0,2.832-1.488,3.288-2.376   c-0.024-0.504,0.288-2.4,0.624-2.928c0.12-0.192,0.312-0.288,0.48-0.288c0.312,0,0.408,0.216,0.408,0.48   c0,0.624-0.552,2.184-0.816,2.808c0.264,1.344,0.84,2.304,2.352,2.304c1.248,0,2.352-1.128,3.024-2.448   c0.384-0.744,0.912-2.112,0.912-2.976c0-1.128-0.456-1.776-0.816-2.184c-0.192-0.216-0.288-0.36-0.288-0.576   c0-0.48,0.552-1.08,1.032-1.08c0.84,0,1.032,0.888,1.032,1.584C13.969,9.428,13.225,12.428,12.601,13.82z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 14, 27 ]
});
/**
 * 希腊字符data: phi
 */
define("char/data/greek/phi", [], {
    path: "M7.777,6.5c2.664,0.168,4.488,1.896,4.488,4.32c0,3.024-3.12,6.384-7.225,6.601l-0.888,3.576   c-0.096,0.312-0.24,0.888-0.288,0.936c-0.048,0.096-0.144,0.096-0.216,0.096c-0.24,0-0.24-0.144-0.24-0.192   c0-0.096,0.192-0.888,0.528-2.16c0.192-0.744,0.36-1.512,0.552-2.256C1.992,17.277,0,15.693,0,13.101c0-3,3.024-6.241,6.961-6.577   c0.048,0,0.216-0.024,0.24-0.072c0.024-0.024,0.048-0.048,0.12-0.36l1.296-5.16c0.096-0.408,0.12-0.456,0.336-0.456   c0.072,0,0.24,0,0.24,0.216L7.777,6.5z M7.105,7.004C3.648,7.22,1.464,10.58,1.464,13.604c0,2.64,1.968,3.264,3.144,3.336   L7.105,7.004z M5.161,16.917c3.744-0.288,5.641-3.889,5.641-6.601c0-2.353-1.584-3.24-3.168-3.336L5.161,16.917z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 13, 27 ]
});
/**
 * 希腊字符data: pi
 */
define("char/data/greek/pi", [], {
    path: "M4.2,13.508c-0.24,0.96-0.24,1.008-0.624,2.232c-0.288,1.008-0.48,1.632-1.176,1.632c-0.216,0-0.648-0.12-0.648-0.625   c0-0.144,0-0.192,0.192-0.576c1.968-4.201,2.568-6.289,3.096-8.089H3.672c-0.6,0-1.848,0-3.096,1.968   c-0.12,0.144-0.144,0.216-0.312,0.216C0.12,10.268,0,10.22,0,10.076S0.768,8.66,1.392,7.964c1.104-1.176,1.92-1.176,2.472-1.176   h7.897c0.432,0,0.888,0,0.888,0.528c0,0.768-0.792,0.768-1.104,0.768H8.857c-0.504,2.16-0.504,3.864-0.504,4.008   c0,0.168,0,2.232,0.648,3.889c0.168,0.36,0.168,0.408,0.168,0.528c0,0.408-0.432,0.864-0.936,0.864   c-0.984,0-0.984-2.592-0.984-2.928c0-1.92,0.408-3.672,1.056-6.361H5.592L4.2,13.508z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 13, 27 ]
});
/**
 * 希腊字符data: psi
 */
define("char/data/greek/psi", [], {
    path: "M6.697,16.893c0.72,0,2.568,0,4.584-2.256c1.536-1.728,2.016-3.504,2.016-4.369c0-1.248-0.648-1.896-0.864-2.112   c-0.096-0.096-0.264-0.264-0.264-0.552c0-0.48,0.528-1.056,1.104-1.056c0.24,0,0.96,0.168,0.96,1.608   c0,1.224-0.576,3.36-0.816,3.984c-0.408,1.032-1.128,2.136-1.92,3c-2.16,2.232-4.056,2.232-4.944,2.232   c-0.096,0.432-1.08,4.464-1.176,4.56c-0.048,0.096-0.144,0.096-0.192,0.096c-0.072,0-0.264,0-0.264-0.216   c0-0.096,0.168-0.768,0.552-2.208c0.192-0.744,0.36-1.512,0.552-2.256c-2.16-0.168-4.08-1.056-4.08-3.36   c0-0.552,0-1.08,1.296-4.489c0.408-1.056,0.408-1.584,0.408-1.68c0-0.768-0.408-0.792-0.624-0.792   c-0.888,0-1.848,0.888-2.424,2.977c-0.096,0.336-0.12,0.432-0.336,0.432C0.096,10.436,0,10.316,0,10.22   c0-0.192,0.888-3.672,3.096-3.672c1.128,0,1.896,0.864,1.896,1.944c0,0.432-0.12,0.744-0.432,1.608   c-1.128,2.977-1.128,3.528-1.128,4.057c0,1.44,0.744,2.448,2.736,2.688l3.96-15.889c0.096-0.36,0.12-0.48,0.336-0.48   c0.072,0,0.264,0,0.264,0.216c0,0.024-0.096,0.336-0.096,0.36L6.697,16.893z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 15, 27 ]
});
/**
 * 希腊字符data: rho
 */
define("char/data/greek/rho", [], {
    path: "M2.424,11.924c0.792-3.192,3.36-5.376,5.473-5.376c1.656,0,3.216,1.272,3.216,3.84c0,3.625-3.072,6.985-5.785,6.985   c-0.936,0-1.824-0.504-2.304-1.705c-0.768,2.953-1.44,5.833-1.536,6.049c-0.144,0.336-0.48,0.576-0.84,0.576   c-0.36,0-0.648-0.24-0.648-0.6c0-0.144,0.048-0.288,0.072-0.408L2.424,11.924z M8.497,14.037c0.408-1.008,1.056-3.384,1.056-4.608   c0-1.416-0.6-2.4-1.68-2.4c-0.36,0-2.712,0.12-3.937,4.896c-0.072,0.36-0.672,2.64-0.672,2.784c0,0.288,0.408,2.184,2.04,2.184   C6.529,16.893,7.777,15.693,8.497,14.037z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 希腊字符data: sigma
 */
define("char/data/greek/sigma", [], {
    path: "M8.617,8.084c0.576,0.792,0.792,1.704,0.792,2.64c0,3.601-3.096,6.649-5.928,6.649c-2.16,0-3.48-1.705-3.48-3.745   c0-2.832,2.592-6.84,6.192-6.84h5.305c0.432,0,0.888,0,0.888,0.528c0,0.768-0.792,0.768-1.104,0.768H8.617z M6.745,14.685   c0.84-1.392,1.224-3.408,1.224-4.249c0-1.848-1.152-2.352-2.184-2.352c-3.528,0-4.393,4.776-4.393,6.217   c0,1.656,0.888,2.592,2.112,2.592C4.584,16.893,5.88,16.101,6.745,14.685z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 13, 27 ]
});
/**
 * 希腊字符data: tau
 */
define("char/data/greek/tau", [], {
    path: "M4.632,16.389c-0.072,0.36-0.192,1.008-0.936,1.008c-0.48,0-0.648-0.336-0.648-0.6c0-0.072,0-0.12,0.12-0.48l2.496-8.233   H3.672c-0.6,0-1.848,0-3.096,1.968c-0.12,0.144-0.144,0.216-0.312,0.216C0.12,10.268,0,10.22,0,10.076S0.768,8.66,1.392,7.964   c1.104-1.176,1.92-1.176,2.472-1.176h6.601c0.432,0,0.888,0,0.888,0.528c0,0.768-0.792,0.768-1.104,0.768H6.265L4.632,16.389z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 希腊字符data: theta
 */
define("char/data/greek/theta", [], {
    path: "M2.76,17.373c-2.52,0-2.76-3.721-2.76-4.825C0,7.268,3.577,0.235,6.937,0.235c1.968,0,2.736,2.376,2.736,4.824   C9.673,10.508,6.024,17.373,2.76,17.373z M2.208,9.164C1.824,10.748,1.44,12.38,1.44,13.94c0,2.376,0.6,2.952,1.344,2.952   c1.008,0,1.848-1.128,2.544-2.352c0.864-1.512,1.368-3.024,1.968-5.376H2.208z M7.465,8.444c0.696-2.688,0.768-3.888,0.768-4.752   c0-2.305-0.528-2.977-1.32-2.977c-1.056,0-1.896,1.152-2.688,2.592C3.264,5.012,2.76,7.028,2.4,8.444H7.465z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 希腊字符data: 大写delta
 */
define("char/data/greek/u-delta", [], {
    path: "M16.609,16.729c0.024,0.048,0.12,0.264,0.12,0.288c0,0.096-0.024,0.12-0.456,0.12H0.456C0.024,17.138,0,17.114,0,17.018   c0-0.024,0.096-0.24,0.12-0.288L7.896,0.552c0.168-0.336,0.192-0.384,0.48-0.384c0.192,0,0.288,0,0.48,0.408L16.609,16.729z    M1.104,15.793h13.321L7.776,1.992L1.104,15.793z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 17, 27 ]
});
/**
 * 希腊字符data: 大写gamma
 */
define("char/data/greek/u-gamma", [], {
    path: "M11.785,6.097h-0.432c-0.36-3-0.552-4.68-4.2-4.68H4.512c-0.96,0-1.008,0.12-1.008,0.936V15.41   c0,0.864,0.048,1.104,1.872,1.104h0.528v0.624C4.92,17.09,3.769,17.09,2.784,17.09c-0.744,0-2.088,0-2.784,0.048v-0.624   c1.656,0,1.92,0,1.92-1.08V2.497c0-1.08-0.264-1.08-1.92-1.08V0.792h11.209L11.785,6.097z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 希腊字符data: 大写lambda
 */
define("char/data/greek/u-lambda", [], {
    path: "M12.481,15.673c0.288,0.84,0.72,0.84,1.776,0.84v0.624c-0.552-0.048-1.656-0.048-2.256-0.048c-0.744,0-1.968,0-2.665,0.048   v-0.624c0.504,0,1.512,0,1.512-0.672c0-0.072,0-0.12-0.12-0.456L6.552,2.712L2.568,14.833c-0.072,0.24-0.12,0.384-0.12,0.552   c0,0.168,0.072,1.08,1.344,1.128v0.624C3.216,17.09,2.28,17.09,1.68,17.09c-0.432,0-1.272,0.024-1.68,0.048v-0.624   c0.792-0.024,1.584-0.312,2.016-1.584L6.744,0.576c0.12-0.384,0.144-0.408,0.384-0.408s0.264,0.024,0.384,0.408L12.481,15.673z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 15, 27 ]
});
/**
 * 希腊字符data: 大写omega
 */
define("char/data/greek/u-omega", [], {
    path: "M0,13.226h0.6c0.24,1.056,0.417,1.672,0.529,1.848c0.208,0.288,0.681,0.448,1.418,0.48c0.16,0,0.36,0,0.601,0h1.995   c-0.257-0.768-0.674-1.576-1.25-2.424s-1.126-1.576-1.646-2.184C1.724,10.338,1.264,9.61,0.864,8.762   c-0.4-0.848-0.6-1.696-0.6-2.544c0-1.616,0.704-3.02,2.111-4.212c1.408-1.192,3.143-1.788,5.206-1.788   c2.063,0,3.799,0.592,5.209,1.776c1.409,1.184,2.114,2.592,2.114,4.224c0,0.848-0.203,1.696-0.607,2.544   c-0.405,0.848-0.865,1.576-1.38,2.184s-1.062,1.336-1.64,2.184s-0.995,1.656-1.251,2.424h1.995c0.993,0,1.602-0.092,1.826-0.276   s0.44-0.756,0.649-1.716c0.032-0.144,0.056-0.255,0.072-0.336h0.6L14.4,17.138h-4.183c-0.353,0-0.593-0.04-0.721-0.12   c-0.128-0.08-0.192-0.272-0.192-0.576c0-0.688,0.164-1.496,0.493-2.424c0.329-0.928,0.686-1.78,1.071-2.556   s0.742-1.648,1.071-2.616c0.329-0.968,0.493-1.836,0.493-2.604c0-1.728-0.489-3.072-1.468-4.032C9.986,1.25,8.863,0.77,7.596,0.77   H7.572c-1.268,0-2.39,0.484-3.369,1.452C3.225,3.19,2.736,4.506,2.736,6.17c0,1.008,0.261,2.148,0.782,3.42   c0.521,1.272,1.043,2.512,1.564,3.72c0.521,1.208,0.782,2.252,0.782,3.132c0,0.304-0.064,0.496-0.192,0.576   c-0.128,0.081-0.385,0.12-0.769,0.12H0.768L0,13.226z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 希腊字符data: 大写phi
 */
define("char/data/greek/u-phi", [], {
    path: "M7.633,15.41c0,0.864,0.048,1.104,1.872,1.104h0.528v0.624C9.049,17.09,7.897,17.09,6.889,17.09s-2.184,0-3.168,0.048   v-0.624h0.528c1.824,0,1.872-0.24,1.872-1.104v-1.368C2.448,13.706,0,11.401,0,8.929C0,6.553,2.353,4.177,6.121,3.84V2.473   c0-0.864-0.048-1.104-1.872-1.104H3.72V0.744c0.984,0.048,2.16,0.048,3.168,0.048s2.16,0,3.145-0.048v0.624H9.505   c-1.824,0-1.872,0.24-1.872,1.104V3.84c3.792,0.336,6.168,2.688,6.168,5.113c0,2.328-2.28,4.752-6.168,5.088V15.41z M6.121,4.249   C4.032,4.464,1.776,5.665,1.776,8.953c0,3.192,2.184,4.44,4.344,4.68V4.249z M7.633,13.633c1.8-0.168,4.392-1.176,4.392-4.704   c0-3.433-2.496-4.513-4.392-4.681V13.633z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 14, 27 ]
});
/**
 * 希腊字符data: 大写Pi
 */
define("char/data/greek/u-pi", [], {
    path: "M12.241,15.434c0,1.08,0.264,1.08,1.92,1.08v0.624c-0.696-0.048-1.968-0.048-2.712-0.048c-0.744,0-2.017,0-2.712,0.048   v-0.624c1.656,0,1.92,0,1.92-1.08V1.417H3.504v14.017c0,1.08,0.264,1.08,1.92,1.08v0.624C4.729,17.09,3.456,17.09,2.712,17.09   c-0.744,0-2.016,0-2.712,0.048v-0.624c1.656,0,1.92,0,1.92-1.08V2.497c0-1.08-0.264-1.08-1.92-1.08V0.792h14.161v0.624   c-1.656,0-1.92,0-1.92,1.08V15.434z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 15, 27 ]
});
/**
 * 希腊字符data: 大写psi
 */
define("char/data/greek/u-psi", [], {
    path: "M8.233,13.609c2.832-0.6,3.504-3.552,3.528-6.097c0.024-2.472,0.528-3.72,2.112-3.72h0.624c0.408,0,0.528,0,0.528,0.192   c0,0.144-0.048,0.144-0.288,0.192c-1.224,0.24-1.464,1.8-1.464,2.904c0,1.368-0.048,6.408-5.041,6.937v1.392   c0,0.864,0.048,1.104,1.872,1.104h0.528v0.624C9.649,17.09,8.497,17.09,7.489,17.09c-1.008,0-2.184,0-3.168,0.048v-0.624h0.528   c1.824,0,1.872-0.24,1.872-1.104v-1.392c-4.176-0.48-4.968-4.152-4.992-6.385c-0.024-3.216-0.936-3.36-1.608-3.48   C0,4.152,0,4.009,0,3.984c0-0.192,0.12-0.192,0.504-0.192h0.624c1.488,0,2.088,1.176,2.112,3.457c0,1.248,0.048,5.665,3.48,6.36   V2.473c0-0.864-0.048-1.104-1.872-1.104H4.32V0.744c0.984,0.048,2.161,0.048,3.168,0.048c1.008,0,2.16,0,3.145-0.048v0.624h-0.528   c-1.824,0-1.872,0.24-1.872,1.104V13.609z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 希腊字符data: 大写Sigma
 */
define("char/data/greek/u-sigma", [], {
    path: "M1.104,16.322h6.625c3.889,0,5.257-0.792,5.641-4.681h0.432l-0.576,5.497H0.528c-0.36,0-0.504,0-0.504-0.168   c0-0.048,0-0.072,0.168-0.288l5.353-6.865L0,1.272c0-0.504,0.024-0.528,0.528-0.528h12.697l0.576,5.305h-0.432   c-0.408-3.816-1.608-4.681-5.592-4.681H1.968l4.729,7.273c0.024,0.048,0.12,0.192,0.12,0.288c0,0.072,0,0.12-0.168,0.312   L1.104,16.322z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 14, 27 ]
});
/**
 * 希腊字符data: 大写theta
 */
define("char/data/greek/u-theta", [], {
    path: "M7.513,17.522C3.504,17.522,0,13.85,0,8.977S3.457,0.36,7.537,0.36c3.984,0,7.513,3.696,7.513,8.617   C15.049,13.777,11.617,17.522,7.513,17.522z M13.297,8.977c0-5.641-3.072-8.233-5.785-8.233c-2.616,0-5.76,2.521-5.76,8.233   c0,5.544,3.048,8.137,5.784,8.137C10.177,17.114,13.297,14.593,13.297,8.977z M12.025,10.417h-0.432V9.601H3.457v0.816H3.024V7.441   h0.432v0.816h8.137V7.441h0.432V10.417z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 希腊字符data: 大写Upsilon
 */
define("char/data/greek/u-upsilon", [], {
    path: "M8.329,15.41c0,0.864,0.048,1.104,1.873,1.104h0.528v0.624C9.721,17.09,8.545,17.09,7.537,17.09   c-1.008,0-2.184,0-3.192,0.048v-0.624h0.528c1.824,0,1.872-0.24,1.872-1.104V8.665c0-1.44-0.24-6.937-3.84-6.937   c-0.768,0-2.184,0.408-2.4,2.184C0.48,4.104,0.48,4.177,0.264,4.177C0.024,4.177,0,4.104,0,3.865C0,2.616,0.816,0.36,2.928,0.36   c3.648,0,4.417,4.632,4.608,5.88h0.024c0.168-1.224,0.912-5.88,4.561-5.88c2.088,0,2.928,2.232,2.928,3.504   c0,0.24-0.024,0.312-0.264,0.312c-0.216,0-0.216-0.072-0.24-0.264c-0.216-1.752-1.632-2.184-2.4-2.184   c-1.296,0-2.352,0.72-3.024,2.28c-0.648,1.56-0.792,3.6-0.792,4.656V15.41z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 希腊字符data: 大写Xi
 */
define("char/data/greek/u-xi", [], {
    path: "M0,13.562h0.432c0.048,0.96,0.096,1.68,0.24,2.016c0.144,0.312,1.032,0.312,1.896,0.312h8.017c0.624,0,1.728,0,1.872-0.288   c0.168-0.336,0.192-0.96,0.264-2.04h0.432l-0.168,3.576H0.168L0,13.562z M12.889,1.272c0.024,0.696,0.096,2.112,0.144,2.856h-0.432   c-0.024-0.456-0.072-1.44-0.24-1.824c-0.144-0.24-1.224-0.24-1.8-0.24H2.592c-0.24,0-1.608,0-1.752,0.216   C0.624,2.568,0.576,3.697,0.552,4.128H0.12l0.024-0.456C0.168,2.977,0.24,1.561,0.288,0.816h12.577L12.889,1.272z M10.945,10.225   h-0.432v-0.96H2.64v0.96H2.208V7.057H2.64v0.96h7.873v-0.96h0.432V10.225z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 14, 27 ]
});
/**
 * 希腊字符data: upsilon
 */
define("char/data/greek/upsilon", [], {
    path: "M9.529,14.805c-0.624,0.912-1.92,2.568-3.912,2.568c-1.776,0-3.72-0.696-3.72-3.097c0-0.624,0-1.248,1.344-4.776   c0.408-1.056,0.408-1.56,0.408-1.68c0-0.768-0.384-0.792-0.624-0.792c-0.888,0-1.824,0.864-2.424,2.977   c-0.096,0.336-0.12,0.432-0.336,0.432C0.096,10.436,0,10.316,0,10.22c0-0.192,0.888-3.672,3.096-3.672   c1.176,0,1.896,0.912,1.896,1.92c0,0.456-0.12,0.768-0.408,1.56c-0.936,2.424-1.224,3.576-1.224,4.512   c0,0.696,0.168,1.296,0.6,1.752c0.624,0.6,1.584,0.6,1.728,0.6c3.072,0,5.017-5.016,5.017-6.625c0-1.248-0.624-1.896-0.84-2.112   C9.745,8.06,9.577,7.892,9.577,7.604c0-0.48,0.528-1.056,1.104-1.056c0.216,0,0.96,0.144,0.96,1.608   C11.641,8.924,11.233,12.309,9.529,14.805z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 希腊字符data: 变体epsilon
 */
define("char/data/greek/varepsilon", [], {
    path: "M0.552,14.517c0,1.704,1.968,2.088,3.456,2.088c2.856,0,3.48-0.96,3.745-1.417c0.096-0.144,0.144-0.216,0.264-0.216   s0.216,0.096,0.216,0.216c0,0.336-1.272,2.448-4.44,2.448C1.488,17.637,0,16.317,0,14.661c0-1.176,0.816-2.472,2.208-3.264   c-0.408-0.288-0.984-0.84-0.984-1.729c0-1.776,2.544-3.384,5.232-3.384c1.656,0,3.048,0.912,3.048,1.344c0,0.288-0.312,0.6-0.6,0.6   c-0.168,0-0.24-0.072-0.384-0.168c-1.008-0.744-1.873-0.744-2.28-0.744c-2.136,0-4.489,0.864-4.489,2.352   c0,0.528,0.288,1.08,1.032,1.44c0.84-0.36,1.56-0.432,2.16-0.432c1.224,0,1.68,0.168,1.68,0.6c0,0.696-1.248,0.696-1.872,0.696   c-0.456,0-1.272,0-2.04-0.312C1.152,12.477,0.552,13.701,0.552,14.517z M4.752,11.492c0.864,0,0.912,0,1.32-0.192   c-0.384-0.096-0.504-0.144-1.176-0.144c-0.168,0-0.792,0-1.44,0.216C3.937,11.492,4.32,11.492,4.752,11.492z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 希腊字符data: 变体phi
 */
define("char/data/greek/varphi", [], {
    path: "M4.176,21.794c-0.192,0.48-0.624,0.576-0.864,0.576c-0.048,0-0.624-0.024-0.624-0.6c0-0.096,0-0.144,0.12-0.504   l1.248-4.057C2.112,16.777,0,15.313,0,12.625c0-2.28,1.824-5.784,2.472-5.784c0.048,0,0.24,0,0.24,0.192   c0,0.048,0,0.096-0.264,0.408c-1.392,1.728-1.896,4.296-1.896,4.944c0,1.608,1.152,3.072,3.913,3.6   c1.344-4.512,2.808-9.385,6.265-9.385c2.016,0,2.664,1.776,2.664,3.24c0,3.792-3.625,7.585-7.561,7.585   c-0.432,0-0.672-0.024-0.816-0.048C4.92,17.857,4.248,21.578,4.176,21.794z M12.793,10.393c0-1.32-0.72-2.496-2.28-2.496   c-2.088,0-3.912,2.208-4.68,5.28c-0.144,0.528-0.552,2.784-0.552,2.832c0,0.12,0.36,0.12,0.768,0.12   C9.721,16.129,12.793,13.129,12.793,10.393z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 14, 27 ]
});
/**
 * 希腊字符data: xi
 */
define("char/data/greek/xi", [], {
    path: "M7.177,17.829c0.768,0.336,1.176,0.936,1.176,1.68c0,1.032-0.936,2.521-2.472,2.521c-1.296,0-2.544-0.888-2.544-1.152   c0-0.144,0.12-0.24,0.24-0.24c0.096,0,0.12,0.024,0.288,0.168c0.864,0.648,1.656,0.744,2.016,0.744c0.84,0,1.224-0.816,1.224-1.32   c0-0.384-0.192-0.672-0.432-0.84c-0.168-0.096-1.152-0.504-1.752-0.72l-2.16-0.864C1.896,17.445,0,16.701,0,14.613   c0-1.296,1.056-3.745,3.528-5.089C2.88,9.164,1.92,8.372,1.92,6.932c0-1.561,1.272-3.601,4.152-4.44   C5.929,2.18,5.905,1.843,5.905,1.507c0-0.192,0-1.08,0.384-1.08c0.12,0,0.24,0.096,0.24,0.24c0,0.072-0.096,0.408-0.096,0.84   c0,0.528,0.024,0.576,0.144,0.864c0.672-0.12,1.032-0.12,1.512-0.12c0.768,0,1.92,0,1.92,0.6c0,0.696-1.464,0.696-2.064,0.696   c-0.504,0-1.08,0-1.512-0.504c-1.896,0.888-2.76,2.76-2.76,4.081c0,0.72,0.24,1.488,0.816,1.968   c0.864-0.288,1.512-0.288,1.992-0.288c1.032,0,1.896,0.072,1.896,0.6c0,0.696-1.416,0.696-2.16,0.696c-0.432,0-1.056,0-1.704-0.192   C4.44,9.884,4.225,9.836,4.177,9.836c-0.504,0-3.024,2.088-3.024,4.152c0,1.44,1.44,2.016,2.064,2.256l2.521,1.008L7.177,17.829z    M6.313,9.62c1.032,0,1.248-0.072,1.512-0.192c-0.528-0.12-0.576-0.144-1.368-0.144c-0.288,0-0.816,0-1.392,0.144   C5.497,9.62,5.737,9.62,6.313,9.62z M7.969,3.067c1.008,0,1.2-0.072,1.488-0.192c-0.48-0.12-0.552-0.144-1.344-0.144   c-0.312,0-0.744,0-1.152,0.12C7.225,3.067,7.513,3.067,7.969,3.067z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 希腊字符data: zeta
 */
define("char/data/greek/zeta", [], {
    path: "M5.665,16.725c0.888,0.288,2.28,0.768,2.28,2.448c0,1.248-1.056,2.856-2.592,2.856c-1.2,0-2.232-0.912-2.232-1.152   c0-0.048,0.048-0.24,0.24-0.24c0.12,0,0.168,0.048,0.264,0.144c0.6,0.6,1.248,0.768,1.728,0.768c0.888,0,1.392-0.936,1.392-1.632   c0-1.152-0.936-1.464-1.92-1.8c-0.312-0.12-1.08-0.384-1.392-0.48C2.184,17.205,0,16.437,0,13.148C0,8.66,3.504,4.172,6.289,2.731   C6,2.228,6,1.724,6,1.507c0-0.192,0-1.08,0.384-1.08c0.12,0,0.24,0.096,0.24,0.24c0,0.072-0.096,0.408-0.096,0.84   c0,0.36,0.072,0.696,0.216,1.008c0.624-0.264,1.032-0.264,1.512-0.264c0.768,0,1.848,0.024,1.848,0.6   c0,0.696-1.464,0.696-2.064,0.696c-0.456,0-1.008,0-1.44-0.408c-2.952,1.704-5.376,6.097-5.376,9.385c0,1.8,0.816,2.88,2.232,3.432   L5.665,16.725z M8.065,3.067c1.008,0,1.2-0.072,1.488-0.192c-0.48-0.12-0.552-0.144-1.32-0.144c-0.408,0-0.744,0-1.104,0.168   C7.393,3.067,7.561,3.067,8.065,3.067z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 数字data: 0
 */
define("char/data/number/0", [], {
    path: "M4.945,17.637c-1.023,0-1.867-0.256-2.531-0.768s-1.168-1.174-1.512-1.986s-0.58-1.674-0.709-2.584S0,10.441,0,9.457   c0-2.25,0.34-4.193,1.02-5.83s1.988-2.455,3.926-2.455c1.32,0,2.35,0.43,3.088,1.289s1.229,1.904,1.471,3.135   s0.363,2.518,0.363,3.861c0,0.984-0.061,1.93-0.182,2.836s-0.354,1.766-0.697,2.578s-0.85,1.477-1.518,1.992   S5.961,17.637,4.945,17.637z M4.945,17.063c0.695,0,1.254-0.285,1.676-0.855s0.727-1.279,0.914-2.127s0.303-1.668,0.346-2.461   s0.064-1.635,0.064-2.525c0-1.203-0.051-2.311-0.152-3.322S7.418,3.836,6.973,3S5.852,1.746,4.945,1.746   C4.031,1.746,3.35,2.164,2.9,3S2.176,4.76,2.074,5.771S1.922,7.891,1.922,9.094c0,0.891,0.021,1.732,0.064,2.525   s0.162,1.615,0.357,2.467s0.502,1.561,0.92,2.127S4.242,17.063,4.945,17.063z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 数字data: 1
 */
define("char/data/number/1", [], {
    path: "M0.152,17.133v-0.797c1.945,0,2.918-0.254,2.918-0.762V2.871C2.234,3.293,1.211,3.504,0,3.504V2.707   c1.898,0,3.34-0.512,4.324-1.535h0.316c0.047,0,0.09,0.02,0.129,0.059s0.059,0.082,0.059,0.129v14.215   c0,0.508,0.977,0.762,2.93,0.762v0.797H0.152z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 8, 27 ]
});
/**
 * 数字data: 2
 */
define("char/data/number/2", [], {
    path: "M0,17.133v-0.645c0-0.016,0.023-0.047,0.07-0.094l3.609-4.066c0.82-0.914,1.457-1.654,1.91-2.221s0.852-1.223,1.195-1.969   s0.516-1.518,0.516-2.314c0-1.055-0.289-1.961-0.867-2.719S5.047,1.969,4.008,1.969c-0.734,0-1.381,0.24-1.939,0.721   S1.125,3.777,0.914,4.512c0.063-0.016,0.152-0.023,0.27-0.023c0.211,0,0.408,0.051,0.592,0.152s0.326,0.244,0.428,0.428   S2.355,5.449,2.355,5.66c0,0.203-0.051,0.396-0.152,0.58S1.961,6.568,1.781,6.674S1.402,6.832,1.184,6.832   c-0.336,0-0.617-0.117-0.844-0.352S0,5.973,0,5.66c0-0.609,0.111-1.182,0.334-1.717s0.539-1.018,0.949-1.447   s0.879-0.758,1.406-0.984s1.088-0.34,1.682-0.34c0.914,0,1.752,0.191,2.514,0.574s1.369,0.928,1.822,1.635s0.68,1.521,0.68,2.443   c0,0.719-0.146,1.381-0.439,1.986S8.281,8.973,7.828,9.48S6.766,10.584,6,11.268s-1.262,1.135-1.488,1.354l-2.754,2.707h2.449   c1.117,0,2.051-0.01,2.801-0.029s1.145-0.049,1.184-0.088c0.188-0.203,0.379-0.938,0.574-2.203h0.621l-0.621,4.125H0z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 数字data: 3
 */
define("char/data/number/3", [], {
    path: "M1.031,14.953c0.328,0.625,0.842,1.105,1.541,1.441s1.436,0.504,2.209,0.504c0.945,0,1.625-0.395,2.039-1.184   s0.621-1.699,0.621-2.73c0-0.625-0.086-1.236-0.258-1.834s-0.459-1.094-0.861-1.488S5.406,9.07,4.781,9.07H3.094   c-0.109,0-0.164-0.055-0.164-0.164v-0.27c0-0.094,0.055-0.141,0.164-0.141l1.371-0.094c0.563,0,1.037-0.213,1.424-0.639   s0.67-0.949,0.85-1.57s0.27-1.197,0.27-1.729c0-0.758-0.188-1.385-0.563-1.881S5.516,1.84,4.781,1.84   c-0.633,0-1.242,0.117-1.828,0.352s-1.035,0.598-1.348,1.09c0.031-0.016,0.098-0.023,0.199-0.023c0.32,0,0.588,0.111,0.803,0.334   S2.93,4.082,2.93,4.395c0,0.32-0.107,0.592-0.322,0.814S2.125,5.543,1.805,5.543s-0.594-0.113-0.82-0.34s-0.34-0.496-0.34-0.809   c0-0.672,0.207-1.254,0.621-1.746s0.941-0.861,1.582-1.107s1.293-0.369,1.957-0.369s1.328,0.129,1.992,0.387   s1.217,0.633,1.658,1.125S9.117,3.77,9.117,4.465c0,0.656-0.156,1.281-0.469,1.875s-0.736,1.1-1.271,1.518S6.27,8.574,5.66,8.754   c0.727,0.109,1.402,0.357,2.027,0.744s1.129,0.887,1.512,1.5s0.574,1.275,0.574,1.986c0,0.867-0.23,1.656-0.691,2.367   s-1.076,1.27-1.846,1.676s-1.58,0.609-2.432,0.609c-0.789,0-1.555-0.158-2.297-0.475s-1.346-0.771-1.811-1.365S0,14.512,0,13.723   c0-0.359,0.117-0.652,0.352-0.879s0.531-0.34,0.891-0.34c0.227,0,0.434,0.051,0.621,0.152s0.336,0.246,0.445,0.434   s0.164,0.398,0.164,0.633c0,0.359-0.119,0.658-0.357,0.896s-0.529,0.357-0.873,0.357C1.148,14.977,1.078,14.969,1.031,14.953z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 数字data: 4
 */
define("char/data/number/4", [], {
    path: "M3.973,17.133v-0.797c1.523,0,2.285-0.254,2.285-0.762v-2.426H0v-0.797L7.277,1.289c0.055-0.078,0.125-0.117,0.211-0.117   h0.363c0.141,0,0.211,0.074,0.211,0.223v10.957h2.379v0.797H8.063v2.426c0,0.328,0.229,0.537,0.686,0.627s0.99,0.135,1.6,0.135   v0.797H3.973z M0.727,12.352h5.649V3.715L0.727,12.352z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 数字data: 5
 */
define("char/data/number/5", [], {
    path: "M0.844,14.297c-0.016-0.016-0.025-0.023-0.029-0.023s-0.01,0-0.018,0c0.227,0.758,0.662,1.385,1.307,1.881   s1.361,0.744,2.15,0.744c0.617,0,1.127-0.137,1.529-0.41s0.719-0.635,0.949-1.084s0.391-0.945,0.48-1.488s0.135-1.088,0.135-1.635   c0-0.688-0.021-1.258-0.064-1.711s-0.15-0.883-0.322-1.289C6.781,8.836,6.52,8.453,6.176,8.133s-0.746-0.48-1.207-0.48   c-0.57,0-1.047,0.084-1.43,0.252S2.855,8.26,2.637,8.467S2.215,8.898,2.027,9.141S1.719,9.512,1.664,9.527h-0.27   c-0.125,0-0.188-0.074-0.188-0.223V1.359c0-0.047,0.02-0.09,0.059-0.129s0.082-0.059,0.129-0.059h0.07   c1.078,0.516,2.199,0.773,3.363,0.773c1.18,0,2.309-0.258,3.387-0.773h0.07c0.047,0,0.09,0.014,0.129,0.041   c0.039,0.028,0.059,0.061,0.059,0.1v0.271c0,0.016-0.008,0.035-0.023,0.059S8.426,1.686,8.426,1.702   c-0.531,0.659-1.191,1.177-1.98,1.554S4.828,3.82,3.961,3.82c-0.711,0-1.383-0.102-2.016-0.307V8.32   C2.336,7.922,2.793,7.615,3.316,7.4s1.074-0.322,1.652-0.322c0.672,0,1.283,0.15,1.834,0.451S7.818,8.23,8.197,8.73   s0.672,1.064,0.879,1.693s0.311,1.256,0.311,1.881c0,0.93-0.227,1.807-0.68,2.631s-1.072,1.48-1.857,1.969s-1.65,0.732-2.596,0.732   c-0.797,0-1.52-0.203-2.168-0.609s-1.158-0.945-1.529-1.617S0,14.008,0,13.219c0-0.313,0.105-0.574,0.316-0.785   s0.477-0.316,0.797-0.316c0.313,0,0.574,0.105,0.785,0.316s0.316,0.473,0.316,0.785s-0.105,0.574-0.316,0.785   S1.426,14.32,1.113,14.32c-0.047-0.008-0.09-0.014-0.129-0.018S0.898,14.297,0.844,14.297z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 数字data: 6
 */
define("char/data/number/6", [], {
    path: "M0.773,14.449c-0.289-0.727-0.49-1.506-0.604-2.338S0,10.379,0,9.41c0-0.93,0.137-1.883,0.41-2.859S1.08,4.684,1.6,3.879   s1.17-1.457,1.951-1.957s1.66-0.75,2.637-0.75c0.859,0,1.574,0.221,2.145,0.662s0.855,1.084,0.855,1.928   c0,0.195-0.047,0.373-0.141,0.533S8.828,4.578,8.672,4.664S8.344,4.793,8.156,4.793c-0.305,0-0.557-0.1-0.756-0.299   S7.102,4.051,7.102,3.762c0-0.297,0.101-0.547,0.303-0.75c0.201-0.203,0.45-0.305,0.745-0.305c0.023,0,0.044,0.002,0.064,0.006   c0.019,0.004,0.041,0.01,0.064,0.018C7.902,2.137,7.204,1.84,6.182,1.84c-0.765,0-1.458,0.27-2.078,0.81   c-0.62,0.54-1.094,1.201-1.422,1.983c-0.414,1.025-0.62,2.555-0.62,4.589C2.336,8.54,2.744,7.974,3.287,7.527   C3.83,7.079,4.445,6.855,5.133,6.855c0.703,0,1.342,0.148,1.916,0.445S8.113,7.996,8.52,8.496s0.717,1.07,0.932,1.711   s0.322,1.309,0.322,2.004c0,0.953-0.205,1.844-0.615,2.672s-0.99,1.494-1.74,1.998s-1.598,0.756-2.543,0.756   s-1.77-0.301-2.473-0.902S1.156,15.371,0.773,14.449z M4.893,16.898c0.818,0,1.433-0.23,1.842-0.69s0.67-1.017,0.784-1.668   c0.113-0.651,0.169-1.418,0.169-2.3v-0.07c0-0.663-0.021-1.232-0.064-1.709c-0.043-0.476-0.146-0.946-0.31-1.41   C7.149,8.586,6.88,8.204,6.506,7.904c-0.375-0.3-0.873-0.451-1.497-0.451c-0.663,0-1.211,0.217-1.644,0.649   c-0.433,0.433-0.75,0.974-0.953,1.621c-0.203,0.648-0.304,1.303-0.304,1.966c0,0.211,0.008,0.371,0.023,0.48   c0,0.016-0.002,0.033-0.006,0.053s-0.01,0.041-0.018,0.064c0,0.694,0.078,1.393,0.234,2.095c0.156,0.703,0.442,1.297,0.859,1.785   S4.183,16.898,4.893,16.898z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 数字data: 7
 */
define("char/data/number/7", [], {
    path: "M2.859,16.582c0-1.164,0.133-2.313,0.399-3.445c0.266-1.133,0.651-2.248,1.157-3.346c0.505-1.098,1.094-2.131,1.767-3.1   L8.438,3.48H5.543c-1.211,0-2.221,0.006-3.029,0.018s-1.248,0.045-1.318,0.1C1.008,3.816,0.816,4.551,0.621,5.801H0l0.738-4.887   h0.621v0.07c0,0.461,1.441,0.691,4.324,0.691h4.418V2.25c0,0.078-0.016,0.117-0.047,0.117L6.832,6.984   c-0.82,1.219-1.336,2.568-1.547,4.049s-0.316,3.33-0.316,5.549c0,0.297-0.102,0.547-0.307,0.75   c-0.204,0.203-0.452,0.305-0.742,0.305c-0.298,0-0.55-0.102-0.754-0.305C2.961,17.129,2.859,16.879,2.859,16.582z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 数字data: 8
 */
define("char/data/number/8", [], {
    path: "M0,13.488c0-0.992,0.322-1.859,0.967-2.602S2.434,9.539,3.434,9.07L2.426,8.402c-0.547-0.367-0.98-0.84-1.301-1.418   s-0.48-1.188-0.48-1.828c0-0.563,0.111-1.086,0.334-1.57s0.539-0.91,0.949-1.277S2.799,1.66,3.311,1.465s1.041-0.293,1.588-0.293   c0.703,0,1.381,0.146,2.033,0.439s1.18,0.713,1.582,1.26s0.604,1.172,0.604,1.875c0,0.805-0.27,1.516-0.809,2.133   s-1.23,1.148-2.074,1.594l1.488,0.984c0.609,0.383,1.104,0.904,1.482,1.564s0.568,1.361,0.568,2.104   c0,0.852-0.229,1.623-0.686,2.314s-1.064,1.23-1.822,1.617s-1.547,0.58-2.367,0.58c-0.602,0-1.189-0.094-1.764-0.281   s-1.105-0.471-1.594-0.85s-0.867-0.822-1.137-1.33S0,14.105,0,13.488z M1.195,13.488c0,0.641,0.173,1.219,0.521,1.734   s0.808,0.924,1.381,1.225s1.172,0.451,1.796,0.451c0.593,0,1.172-0.121,1.737-0.363s1.027-0.596,1.387-1.061   c0.358-0.465,0.538-1.002,0.538-1.611c0-0.461-0.132-0.902-0.395-1.324c-0.264-0.422-0.601-0.762-1.011-1.02L4.031,9.457   c-0.82,0.398-1.498,0.953-2.033,1.664S1.195,12.621,1.195,13.488z M2.883,6.258l2.801,1.828c0.688-0.391,1.252-0.871,1.693-1.441   s0.662-1.203,0.662-1.898c0-0.539-0.15-1.033-0.451-1.482S6.898,2.465,6.422,2.215S5.43,1.84,4.875,1.84   c-0.492,0-0.982,0.098-1.471,0.293s-0.891,0.479-1.207,0.85s-0.475,0.814-0.475,1.33c0,0.383,0.105,0.742,0.316,1.078   S2.531,6.016,2.883,6.258z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 数字data: 9
 */
define("char/data/number/9", [], {
    path: "M1.535,16.08c0.454,0.546,1.241,0.818,2.36,0.818c0.72,0,1.362-0.252,1.925-0.756s0.986-1.119,1.268-1.846   c0.172-0.43,0.307-0.908,0.405-1.436c0.098-0.527,0.159-1.029,0.182-1.506s0.036-1.07,0.036-1.781   c-0.274,0.683-0.679,1.249-1.215,1.696c-0.536,0.448-1.156,0.671-1.86,0.671c-0.923,0-1.737-0.252-2.441-0.757   C1.49,10.68,0.948,10.016,0.569,9.19C0.189,8.365,0,7.495,0,6.58c0-0.962,0.211-1.857,0.633-2.687S1.65,2.404,2.42,1.911   s1.635-0.739,2.596-0.739c1.234,0,2.207,0.438,2.918,1.313s1.195,1.928,1.453,3.158s0.387,2.467,0.387,3.709   c0,0.891-0.121,1.824-0.363,2.801s-0.609,1.877-1.102,2.701s-1.107,1.494-1.846,2.01s-1.588,0.773-2.549,0.773   c-0.93,0-1.719-0.212-2.367-0.637s-0.973-1.073-0.973-1.945c0-0.296,0.102-0.545,0.305-0.748s0.453-0.304,0.75-0.304   c0.188,0,0.361,0.045,0.521,0.134s0.285,0.212,0.375,0.367c0.09,0.156,0.135,0.338,0.135,0.548c0,0.194-0.047,0.372-0.141,0.531   c-0.094,0.16-0.219,0.282-0.375,0.368c-0.156,0.085-0.328,0.128-0.516,0.128H1.535z M4.752,11.344c0.986,0,1.718-0.447,2.196-1.342   s0.716-1.869,0.716-2.924c0-0.211-0.008-0.371-0.023-0.48c0.008-0.016,0.014-0.031,0.018-0.047S7.664,6.52,7.664,6.504   c0-1.195-0.19-2.271-0.57-3.229C6.715,2.318,6.024,1.84,5.022,1.84c-0.846,0-1.486,0.23-1.92,0.691S2.385,3.559,2.256,4.23   C2.127,4.902,2.063,5.668,2.063,6.527v0.07c0,0.859,0.051,1.623,0.152,2.291c0.102,0.668,0.351,1.244,0.746,1.729   C3.356,11.102,3.953,11.344,4.752,11.344z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 罗马字符data: a
 */
define("char/data/roman/a", [], {
    path: "M7.681,14.377c0,1.056,0,2.304,0.984,2.304c0.312,0,0.96-0.192,0.96-1.656v-1.368h0.432v1.344   c0,1.896-1.272,2.232-1.776,2.232c-1.056,0-1.728-0.96-1.776-2.017c-0.528,1.368-1.752,2.112-3.072,2.112   C2.16,17.33,0,16.802,0,14.954c0-0.912,0.432-2.112,1.944-2.952c1.344-0.72,3.048-0.912,4.464-0.96V9.985   c0-2.016-1.32-3.072-2.52-3.072c-0.84,0-2.136,0.432-2.641,1.944C1.32,8.833,1.44,8.809,1.536,8.809   c0.408,0,0.864,0.264,0.864,0.864c0,0.672-0.552,0.864-0.864,0.864c-0.144,0-0.864-0.048-0.864-0.936   c0-1.584,1.368-3.072,3.264-3.072c0.816,0,1.848,0.24,2.736,1.032c1.008,0.936,1.008,1.776,1.008,3.36V14.377z M6.409,11.401   c-0.768,0.048-2.088,0.144-3.24,0.792c-1.392,0.768-1.704,2.04-1.704,2.76c0,1.104,0.936,1.992,2.136,1.992   c1.32,0,2.808-1.056,2.808-3.145V11.401z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 罗马字符data: b
 */
define("char/data/roman/b", [], {
    path: "M2.856,8.353c0.72-0.936,1.776-1.728,3.265-1.728c2.424,0,4.584,2.256,4.584,5.328c0,3.264-2.424,5.376-4.825,5.376   c-1.392,0-2.424-0.768-3.12-1.896l-0.696,1.704H1.632V2.665c0-1.152-0.216-1.296-1.632-1.296V0.744L2.856,0.48V8.353z M2.904,14.33   c0,0.432,0,0.48,0.264,0.936c0.768,1.392,1.848,1.68,2.592,1.68c0.576,0,3.409-0.264,3.409-5.017c0-4.536-2.473-4.92-3.192-4.92   c-0.456,0-1.8,0.12-2.736,1.56C2.904,9.073,2.904,9.145,2.904,9.577V14.33z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 罗马字符data: c
 */
define("char/data/roman/c", [], {
    path: "M4.729,6.961c-1.416,0-3.192,1.32-3.192,4.968c0,3.552,1.848,4.968,3.384,4.968c1.032,0,2.4-0.48,3.024-2.424   c0.096-0.312,0.12-0.336,0.288-0.336s0.192,0.072,0.192,0.168c0,0.264-0.744,3.024-3.72,3.024C2.256,17.33,0,15.146,0,11.953   c0-3.072,2.16-5.424,4.705-5.424c1.848,0,3.48,1.296,3.48,3c0,0.84-0.696,0.912-0.864,0.912c-0.312,0-0.864-0.192-0.864-0.864   c0-0.84,0.672-0.84,1.128-0.84C7.057,7.417,5.665,6.961,4.729,6.961z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 9, 27 ]
});
/**
 * 罗马字符data: d
 */
define("char/data/roman/d", [], {
    path: "M9.073,0.48v14.737c0,1.152,0.216,1.296,1.632,1.296v0.624L7.801,17.33v-1.752c-0.12,0.168-1.176,1.752-3.216,1.752   C2.232,17.33,0,15.122,0,11.977c0-3.168,2.376-5.352,4.825-5.352c1.944,0,2.928,1.536,3.024,1.656V2.665   c0-1.152-0.216-1.296-1.632-1.296V0.744L9.073,0.48z M7.801,9.505c0-0.432,0-0.504-0.312-1.008   c-0.552-0.864-1.44-1.488-2.544-1.488c-0.624,0-3.408,0.288-3.408,4.993c0,4.584,2.496,4.944,3.192,4.944   c0.456,0,1.272-0.12,2.088-0.84c0.552-0.48,0.984-1.128,0.984-1.848V9.505z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 罗马字符data: e
 */
define("char/data/roman/e", [], {
    path: "M1.536,11.497c0,1.128,0,2.544,0.744,3.769c0.648,1.056,1.68,1.632,2.712,1.632c1.248,0,2.568-0.816,3.096-2.448   c0.096-0.288,0.12-0.336,0.288-0.336c0.048,0,0.192,0,0.192,0.168c0,0.504-1.056,3.048-3.744,3.048C2.28,17.33,0,15.025,0,11.905   c0-2.952,2.016-5.376,4.561-5.376c2.736,0,4.032,2.136,4.032,4.584c0,0.24,0,0.288-0.096,0.384H1.536z M7.297,11.137   c-0.024-2.688-1.128-4.225-2.76-4.225c-0.96,0-2.809,0.768-2.977,4.225H7.297z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 9, 27 ]
});
/**
 * 罗马字符data: f
 */
define("char/data/roman/f", [], {
    path: "M3.145,15.434c0,1.08,0.288,1.08,2.016,1.08v0.624C4.513,17.09,3.289,17.09,2.592,17.09c-0.624,0-1.728,0-2.304,0.048   v-0.624c1.536,0,1.632-0.12,1.632-1.032V7.441H0V6.817h1.92V3.96c0-2.544,1.872-3.672,3.24-3.672c0.96,0,1.824,0.552,1.824,1.464   c0,0.624-0.48,0.816-0.816,0.816c-0.336,0-0.816-0.192-0.816-0.816c0-0.6,0.504-0.768,0.696-0.816   c-0.24-0.168-0.6-0.264-0.912-0.264c-1.032,0-2.04,1.248-2.04,3.24v2.904h2.784v0.624H3.145V15.434z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 7, 27 ]
});
/**
 * 罗马字符data: g
 */
define("char/data/roman/g", [], {
    path: "M1.728,14.089c0,0.84,0.504,1.512,1.249,1.632c0.12,0.024,1.104,0.024,1.656,0.024c1.848,0,5.4,0,5.4,3.264   c0,1.8-2.376,3.024-5.016,3.024c-2.736,0-5.017-1.272-5.017-3c0-1.2,0.984-2.16,2.232-2.472c-0.816-0.504-1.056-1.416-1.056-2.04   c0-0.12,0-1.104,0.72-1.944c-0.24-0.24-1.032-1.104-1.032-2.472c0-1.992,1.632-3.48,3.528-3.48c0.768,0,1.632,0.24,2.352,0.888   c0.672-0.624,1.512-1.08,2.472-1.08c0.768,0,1.128,0.48,1.128,0.936c0,0.312-0.192,0.552-0.552,0.552   c-0.312,0-0.528-0.216-0.528-0.528c0-0.384,0.216-0.48,0.312-0.504c-0.12-0.072-0.264-0.072-0.36-0.072   c-0.552,0-1.536,0.24-2.208,0.96c0.72,0.744,0.912,1.704,0.912,2.328c0,1.992-1.632,3.48-3.528,3.48   c-0.96,0-1.752-0.408-2.208-0.768C1.728,13.345,1.728,13.874,1.728,14.089z M9.073,19.034c0-2.232-2.736-2.232-4.704-2.232   c-1.632,0-1.873,0-2.473,0.408c-0.528,0.384-0.936,1.08-0.936,1.824c0,1.32,1.656,2.592,4.057,2.592   C7.417,21.626,9.073,20.354,9.073,19.034z M6.504,10.105c0-0.48,0-3.072-2.112-3.072c-2.112,0-2.112,2.592-2.112,3.072   s0,3.072,2.112,3.072C6.504,13.177,6.504,10.585,6.504,10.105z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 罗马字符data: h
 */
define("char/data/roman/h", [], {
    path: "M9.169,15.481c0,0.936,0.096,1.032,1.632,1.032v0.624c-0.576-0.048-1.656-0.048-2.28-0.048s-1.68,0-2.256,0.048v-0.624   c1.536,0,1.632-0.12,1.632-1.032V9.745c0-1.152-0.192-2.736-1.968-2.736c-1.68,0-3.024,1.656-3.024,3.864v4.608   c0,0.936,0.096,1.032,1.632,1.032v0.624C3.96,17.09,2.88,17.09,2.256,17.09s-1.68,0-2.256,0.048v-0.624   c1.536,0,1.632-0.12,1.632-1.032V2.665c0-1.152-0.216-1.296-1.632-1.296V0.744L2.856,0.48v8.521H2.88   c0.288-0.792,1.248-2.376,3.216-2.376c2.832,0,3.072,1.992,3.072,3.216V15.481z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 罗马字符data: i
 */
define("char/data/roman/i", [], {
    path: "M3.005,6.625v8.88c0,0.864,0.048,1.008,1.464,1.008v0.624C3.917,17.09,2.933,17.09,2.357,17.09c-0.6,0-1.632,0-2.208,0.048   v-0.624c1.536,0,1.632-0.12,1.632-1.032V8.809c0-1.152-0.192-1.296-1.536-1.296V6.889L3.005,6.625z M2.069,3.336   c-0.552,0-0.984-0.456-0.984-0.984c0-0.552,0.456-0.984,0.984-0.984c0.552,0,0.984,0.456,0.984,0.984   C3.053,2.904,2.597,3.336,2.069,3.336z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 5, 27 ]
});
/**
 * 罗马字符data: j
 */
define("char/data/roman/j", [], {
    path: "M5.041,6.625v11.833c0,2.04-1.224,3.552-2.88,3.552c-1.224,0-2.28-0.624-2.28-1.584c0-0.528,0.336-0.888,0.864-0.888   c0.552,0,0.864,0.408,0.864,0.864c0,0.672-0.6,0.84-0.768,0.864c0.528,0.336,1.176,0.36,1.344,0.36   c1.416,0,1.632-1.872,1.632-3.072V8.833c0-1.152-0.192-1.32-1.776-1.32V6.889L5.041,6.625z M4.057,3.336   c-0.552,0-0.984-0.456-0.984-0.984c0-0.552,0.456-0.984,0.984-0.984c0.552,0,0.984,0.456,0.984,0.984   C5.041,2.904,4.585,3.336,4.057,3.336z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 7, 27 ]
});
/**
 * 罗马字符data: k
 */
define("char/data/roman/k", [], {
    path: "M8.544,15.242c0.72,1.056,0.984,1.272,2.112,1.272v0.624c-0.408-0.024-1.296-0.048-1.728-0.048c-0.6,0-1.632,0-2.208,0.048   v-0.624c0.288,0,0.72-0.072,0.72-0.504c0-0.312-0.24-0.648-0.528-1.08l-2.424-3.601l-1.656,1.512v2.64   c0,0.936,0.096,1.032,1.632,1.032v0.624C3.888,17.09,2.832,17.09,2.232,17.09s-1.656,0-2.232,0.048v-0.624   c1.536,0,1.632-0.12,1.632-1.032V2.665c0-1.152-0.216-1.296-1.632-1.296V0.744L2.856,0.48v11.761L6.48,8.929   c0.024,0,0.504-0.456,0.504-0.937c0-0.336-0.24-0.528-0.576-0.552V6.817c0.648,0.048,1.68,0.048,2.352,0.048l1.176-0.024   c0.024-0.024,0.072-0.024,0.216-0.024v0.624C9.529,7.465,8.665,7.585,7.296,8.737c-0.216,0.192-1.92,1.752-1.92,1.8   c0,0.072,0.12,0.216,0.144,0.264L8.544,15.242z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 罗马字符data: l
 */
define("char/data/roman/l", [], {
    path: "M2.856,15.481c0,0.936,0.096,1.032,1.632,1.032v0.624C3.913,17.09,2.856,17.09,2.232,17.09c-0.6,0-1.656,0-2.232,0.048   v-0.624c1.536,0,1.632-0.12,1.632-1.032V2.665c0-1.152-0.216-1.296-1.632-1.296V0.744L2.856,0.48V15.481z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 5, 27 ]
});
/**
 * 罗马字符data: m
 */
define("char/data/roman/m", [], {
    path: "M15.434,15.481c0,0.936,0.096,1.032,1.632,1.032v0.624c-0.576-0.048-1.656-0.048-2.28-0.048s-1.68,0-2.256,0.048v-0.624   c1.536,0,1.632-0.12,1.632-1.032V9.745c0-1.152-0.192-2.736-1.968-2.736c-1.68,0-3.024,1.656-3.024,3.864v4.608   c0,0.936,0.096,1.032,1.632,1.032v0.624c-0.576-0.048-1.656-0.048-2.28-0.048s-1.68,0-2.256,0.048v-0.624   c1.536,0,1.632-0.12,1.632-1.032V9.745c0-1.152-0.192-2.736-1.968-2.736c-1.68,0-3.024,1.656-3.024,3.864v4.608   c0,0.936,0.096,1.032,1.632,1.032v0.624C3.96,17.09,2.88,17.09,2.256,17.09s-1.68,0-2.256,0.048v-0.624   c1.536,0,1.632-0.12,1.632-1.032V8.809c0-1.152-0.216-1.296-1.632-1.296V6.889l2.833-0.264v2.424h0.024   c0.36-0.96,1.344-2.424,3.24-2.424c1.344,0,2.76,0.432,3.048,2.4h0.024c0.432-1.296,1.56-2.4,3.192-2.4   c2.856,0,3.072,2.016,3.072,3.216V15.481z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 18, 27 ]
});
/**
 * 罗马字符data: n
 */
define("char/data/roman/n", [], {
    path: "M9.169,15.481c0,0.936,0.096,1.032,1.632,1.032v0.624c-0.576-0.048-1.656-0.048-2.28-0.048s-1.68,0-2.256,0.048v-0.624   c1.536,0,1.632-0.12,1.632-1.032V9.745c0-1.152-0.192-2.736-1.968-2.736c-1.68,0-3.024,1.656-3.024,3.864v4.608   c0,0.936,0.096,1.032,1.632,1.032v0.624C3.96,17.09,2.88,17.09,2.256,17.09s-1.68,0-2.256,0.048v-0.624   c1.536,0,1.632-0.12,1.632-1.032V8.809c0-1.152-0.216-1.296-1.632-1.296V6.889l2.833-0.264v2.424h0.024   c0.36-0.96,1.344-2.424,3.24-2.424c2.832,0,3.072,1.992,3.072,3.216V15.481z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 罗马字符data: o
 */
define("char/data/roman/o", [], {
    path: "M4.849,17.33C2.232,17.33,0,15.025,0,12.001c0-3.072,2.232-5.473,4.849-5.473s4.848,2.4,4.848,5.473   C9.697,15.025,7.465,17.33,4.849,17.33z M7.465,15.337c0.648-1.152,0.696-2.592,0.696-3.528c0-0.744,0-2.328-0.744-3.456   c-0.576-0.84-1.488-1.44-2.568-1.44c-1.224,0-2.16,0.768-2.64,1.561c-0.624,1.08-0.672,2.328-0.672,3.336   c0,1.056,0.072,2.4,0.672,3.48c0.552,0.936,1.512,1.608,2.64,1.608C5.761,16.897,6.792,16.441,7.465,15.337z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 罗马字符data: p
 */
define("char/data/roman/p", [], {
    path: "M4.536,21.818C3.96,21.77,2.88,21.77,2.256,21.77c-0.625,0-1.68,0-2.256,0.048v-0.624c1.536,0,1.632-0.12,1.632-1.032   V8.809c0-1.152-0.216-1.296-1.632-1.296V6.889l2.856-0.264v1.752c0.672-0.96,1.848-1.752,3.289-1.752   c2.472,0,4.561,2.304,4.561,5.328c0,3.264-2.424,5.376-4.825,5.376c-1.272,0-2.28-0.648-2.976-1.656v4.489   c0,0.936,0.096,1.032,1.632,1.032V21.818z M2.904,14.354c0,0.384,0,0.528,0.312,1.056c0.72,1.128,1.656,1.536,2.52,1.536   c1.896,0,3.433-2.232,3.433-4.969c0-2.736-1.44-4.92-3.192-4.92c-1.2,0-2.016,0.72-2.136,0.816   C2.904,8.761,2.904,9.265,2.904,9.601V14.354z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 罗马字符data: q
 */
define("char/data/roman/q", [], {
    path: "M9.073,20.162c0,0.936,0.096,1.032,1.632,1.032v0.624c-0.576-0.048-1.656-0.048-2.28-0.048s-1.68,0-2.256,0.048v-0.624   c1.536,0,1.632-0.12,1.632-1.032v-4.776c-0.312,0.528-1.344,1.944-3.192,1.944C2.208,17.33,0,15.122,0,11.977   c0-3.168,2.352-5.352,4.8-5.352c1.608,0,2.616,1.104,3.168,2.376l0.72-2.376h0.384V20.162z M7.849,10.489   c0-1.248-0.96-3.433-2.88-3.433c-1.848,0-3.432,2.136-3.432,4.945c0,2.664,1.392,4.944,3.192,4.944c0.576,0,1.44-0.192,2.184-1.032   c0.072-0.072,0.936-1.032,0.936-2.064V10.489z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 罗马字符data: r
 */
define("char/data/roman/r", [], {
    path: "M2.409,15.53c0,1.08,0.288,1.08,2.017,1.08v0.624c-0.648-0.048-1.873-0.048-2.568-0.048c-0.624,0-1.728,0-2.304,0.048   V16.61c1.536,0,1.632-0.12,1.632-1.032V8.906c0-1.152-0.216-1.296-1.632-1.296V6.985l2.784-0.264v2.616h0.024   c0.24-0.84,1.032-2.616,2.856-2.616c0.816,0,1.584,0.48,1.584,1.248c0,0.672-0.528,0.84-0.816,0.84c-0.36,0-0.816-0.24-0.816-0.816   c0-0.624,0.528-0.792,0.528-0.792C5.529,7.129,5.361,7.105,5.193,7.105c-1.8,0-2.785,2.16-2.785,4.464V15.53z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 8, 27 ]
});
/**
 * 罗马字符data: s
 */
define("char/data/roman/s", [], {
    path: "M6.816,9.697c0,0.408,0,0.48-0.216,0.48c-0.072,0-0.192-0.024-0.216-0.144c-0.048-0.768-0.192-3.168-2.76-3.168   c-2.424,0-2.76,1.32-2.76,1.944c0,1.464,1.68,1.8,3,2.088c1.008,0.192,1.848,0.36,2.568,1.104c0.312,0.288,0.96,0.936,0.96,2.16   c0,1.872-1.272,3.168-3.648,3.168c-1.344,0-2.184-0.624-2.664-1.272c-0.144,0.24-0.504,0.816-0.648,1.032   c-0.12,0.192-0.144,0.216-0.264,0.216C0.024,17.306,0,17.282,0,16.85v-3.456c0-0.48,0.024-0.504,0.216-0.504   c0.192,0,0.192,0.024,0.264,0.36c0.432,2.112,1.176,3.696,3.264,3.696c2.208,0,2.784-1.296,2.784-2.304   c0-0.864-0.528-1.392-0.84-1.68c-0.504-0.432-1.032-0.528-2.544-0.84C2.448,11.977,0,11.473,0,9.313   c0-1.392,0.96-2.784,3.624-2.784c0.408,0,1.488,0.024,2.256,0.84c0.072-0.096,0.288-0.336,0.36-0.432   c0.288-0.36,0.312-0.384,0.408-0.384c0.144,0,0.168,0.024,0.168,0.456V9.697z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 8, 27 ]
});
/**
 * 罗马字符data: t
 */
define("char/data/roman/t", [], {
    path: "M3.36,14.233c0,2.184,0.96,2.664,1.656,2.664c1.008,0,1.656-1.104,1.656-2.76v-1.344h0.432v1.368   c0,1.776-0.816,3.168-2.232,3.168c-2.784,0-2.784-2.688-2.784-3.144V7.441H0V7.057c2.04-0.048,2.88-2.208,2.928-4.68H3.36v4.44   h3.36v0.624H3.36V14.233z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 8, 27 ]
});
/**
 * 罗马字符data: u
 */
define("char/data/roman/u", [], {
    path: "M9.169,6.625v8.592c0,1.152,0.216,1.296,1.632,1.296v0.624L7.945,17.33v-2.232H7.921c-0.192,0.504-0.984,2.232-3.024,2.232   c-1.728,0-2.328-0.624-2.64-0.936c-0.624-0.672-0.624-1.704-0.624-3.312V8.473C1.608,7.513,0.96,7.513,0,7.513V6.889l2.904-0.264   v7.896c0,1.248,0.168,2.424,2.136,2.424c1.776,0,2.856-1.752,2.856-3.769V8.809c0-1.152-0.216-1.296-1.632-1.296V6.889L9.169,6.625   z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 罗马字符data: A
 */
define("char/data/roman/ua", [], {
    path: "M13.489,15.625c0.312,0.888,0.744,0.888,2.017,0.888v0.624c-0.576-0.048-1.776-0.048-2.4-0.048   c-0.744,0-1.992,0-2.688,0.048v-0.624c0.456,0,1.488,0,1.488-0.648c0-0.096,0-0.144-0.12-0.432l-1.44-4.081H4.056L2.784,14.93   c-0.048,0.144-0.096,0.264-0.096,0.48c0,0.288,0.168,1.056,1.296,1.104v0.624C3.408,17.09,2.448,17.09,1.848,17.09   c-0.456,0-1.417,0-1.848,0.048v-0.624c0.84,0,1.8-0.264,2.256-1.56L7.344,0.552c0.12-0.312,0.168-0.384,0.408-0.384   c0.24,0,0.288,0.072,0.408,0.384L13.489,15.625z M4.272,10.729h5.857L7.2,2.473L4.272,10.729z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 罗马字符data: B
 */
define("char/data/roman/ub", [], {
    path: "M8.202,0.744c3.096,0,5.064,2.041,5.064,4.033c0,1.824-1.608,3.36-3.913,3.816c2.568,0.168,4.537,2.016,4.537,4.177   c0,2.184-1.992,4.368-5.064,4.368H0.569v-0.624c1.656,0,1.92,0,1.92-1.08V2.448c0-1.08-0.264-1.08-1.92-1.08V0.744H8.202z    M7.458,8.425c2.592,0,4.056-1.824,4.056-3.648c0-1.488-1.056-3.409-3.432-3.409H5.009c-0.96,0-1.008,0.12-1.008,0.936v6.121H7.458   z M8.129,16.514c2.616,0,3.984-2.016,3.984-3.769c0-1.752-1.2-3.936-3.672-3.936h-4.44v6.769c0,0.816,0.048,0.936,1.008,0.936   H8.129z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 14, 27 ]
});
/**
 * 罗马字符data: C
 */
define("char/data/roman/uc", [], {
    path: "M13.801,6.529c0,0.432,0,0.48-0.264,0.48c-0.216,0-0.216-0.048-0.264-0.336c-0.456-3.336-2.424-5.688-5.137-5.688   c-2.328,0-6.313,1.68-6.313,7.945c0,6.24,3.913,7.968,6.36,7.968c2.592,0,4.993-2.064,5.185-5.424   c0.024-0.216,0.024-0.288,0.216-0.288c0.216,0,0.216,0.096,0.216,0.336c0,2.76-2.28,6.001-5.953,6.001   C3.72,17.522,0,13.921,0,8.929C0,3.984,3.72,0.36,7.825,0.36c1.848,0,3.289,0.864,4.464,2.352l1.056-2.016   c0.168-0.288,0.192-0.312,0.288-0.312c0.144,0,0.168,0.024,0.168,0.456V6.529z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 14, 27 ]
});
/**
 * 罗马字符data: D
 */
define("char/data/roman/ud", [], {
    path: "M8.454,0.194c3.912,0,6.96,3.792,6.96,8.329c0,4.513-3.096,8.065-6.96,8.065H0.821v-0.624c1.656,0,1.92,0,1.92-1.08V1.898   c0-1.08-0.264-1.08-1.92-1.08V0.194H8.454z M7.974,15.963c2.28,0,3.648-1.296,4.224-2.04c0.456-0.648,1.44-2.016,1.44-5.401   c0-6.528-3.672-7.705-5.665-7.705H5.285c-0.96,0-1.008,0.12-1.008,0.936v13.273c0,0.816,0.048,0.936,1.008,0.936H7.974z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 罗马字符data: E
 */
define("char/data/roman/ue", [], {
    path: "M12.481,17.138H0v-0.624c1.656,0,1.92,0,1.92-1.08V2.497c0-1.08-0.264-1.08-1.92-1.08V0.792h12.145l0.576,5.304h-0.432   c-0.336-3.192-0.768-4.68-4.488-4.68H4.512c-0.96,0-1.008,0.12-1.008,0.936v5.977H5.76c2.256,0,2.473-0.816,2.473-2.809h0.432   v6.241H8.233c0-1.992-0.216-2.808-2.473-2.808H3.504v6.625c0,0.816,0.048,0.936,1.008,0.936h3.336c4.225,0,4.537-1.92,5.064-5.449   h0.432L12.481,17.138z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 14, 27 ]
});
/**
 * 罗马字符data: F
 */
define("char/data/roman/uf", [], {
    path: "M12.409,6.097h-0.432c-0.336-3.192-0.744-4.68-4.369-4.68H4.512c-0.96,0-1.008,0.12-1.008,0.936v6.289h2.16   c2.232,0,2.448-0.792,2.448-2.809h0.432v6.241H8.113c0-2.016-0.216-2.808-2.448-2.808h-2.16v6.145c0,0.864,0.048,1.104,1.872,1.104   h0.528v0.624C4.92,17.09,3.769,17.09,2.784,17.09c-0.744,0-2.088,0-2.784,0.048v-0.624c1.656,0,1.92,0,1.92-1.08V2.497   c0-1.08-0.264-1.08-1.92-1.08V0.792h11.833L12.409,6.097z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 13, 27 ]
});
/**
 * 罗马字符data: G
 */
define("char/data/roman/ug", [], {
    path: "M14.12,17.079c0,0.432-0.024,0.456-0.144,0.456s-0.792-0.672-1.2-1.656c-0.744,1.368-2.64,2.064-4.584,2.064   c-4.224,0-7.873-3.672-7.873-8.593c0-4.945,3.72-8.569,7.825-8.569c1.848,0,3.289,0.864,4.464,2.352l1.056-2.016   c0.168-0.288,0.192-0.312,0.288-0.312c0.144,0,0.168,0.024,0.168,0.456V6.95c0,0.432,0,0.48-0.264,0.48   c-0.216,0-0.216-0.048-0.264-0.336c-0.456-3.336-2.424-5.688-5.137-5.688c-2.328,0-6.313,1.68-6.313,7.945   c0,6.264,4.056,7.968,6.529,7.968c0.744,0,3.864-0.216,3.864-2.856v-1.584c0-0.864-0.048-1.128-2.112-1.128h-0.72v-0.624   c0.912,0.024,2.784,0.048,3.457,0.048c0.648,0,1.944,0,2.52-0.048v0.624c-1.488,0-1.56,0.12-1.56,1.032V17.079z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 罗马字符data: H
 */
define("char/data/roman/uh", [], {
    path: "M12.241,15.434c0,1.08,0.264,1.08,1.92,1.08v0.624c-0.696-0.048-1.968-0.048-2.712-0.048c-0.744,0-2.017,0-2.712,0.048   v-0.624c1.656,0,1.92,0,1.92-1.08V8.929H3.504v6.504c0,1.08,0.264,1.08,1.92,1.08v0.624C4.729,17.09,3.456,17.09,2.712,17.09   c-0.744,0-2.016,0-2.712,0.048v-0.624c1.656,0,1.92,0,1.92-1.08V2.448c0-1.08-0.264-1.08-1.92-1.08V0.744   c0.696,0.048,1.968,0.048,2.712,0.048c0.744,0,2.016,0,2.712-0.048v0.624c-1.656,0-1.92,0-1.92,1.08v5.857h7.152V2.448   c0-1.08-0.264-1.08-1.92-1.08V0.744c0.696,0.048,1.968,0.048,2.712,0.048c0.744,0,2.016,0,2.712-0.048v0.624   c-1.656,0-1.92,0-1.92,1.08V15.434z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 15, 27 ]
});
/**
 * 罗马字符data: I
 */
define("char/data/roman/ui", [], {
    path: "M3.601,15.434c0,1.08,0.288,1.08,2.016,1.08v0.624C4.849,17.09,3.625,17.09,2.809,17.09c-0.816,0-2.041,0-2.809,0.048   v-0.624c1.729,0,2.016,0,2.016-1.08V2.448c0-1.08-0.288-1.08-2.016-1.08V0.744c0.768,0.048,1.992,0.048,2.809,0.048   c0.816,0,2.04,0,2.808-0.048v0.624c-1.728,0-2.016,0-2.016,1.08V15.434z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 6, 27 ]
});
/**
 * 罗马字符data: J
 */
define("char/data/roman/uj", [], {
    path: "M5.809,2.497c0-0.864-0.048-1.128-1.92-1.128H3.313V0.744c1.008,0.048,2.112,0.048,3.12,0.048   c0.6,0,2.304-0.048,2.352-0.048v0.624c-0.744,0-1.296,0-1.392,0.456C7.345,1.968,7.345,2.641,7.345,3.048v10.081   c0,0.816,0,0.864-0.024,1.032c-0.288,2.016-2.016,3.36-3.888,3.36C1.464,17.522,0,16.058,0,14.45c0-0.696,0.456-1.056,1.032-1.056   c0.6,0,1.008,0.432,1.008,1.008c0,0.72-0.576,1.032-1.032,1.032c-0.096,0-0.216-0.024-0.312-0.048   c0.624,1.464,2.064,1.752,2.688,1.752c1.224,0,2.424-1.32,2.424-3.528V2.497z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 9, 27 ]
});
/**
 * 罗马字符data: K
 */
define("char/data/roman/uk", [], {
    path: "M12.985,15.266c0.72,1.104,1.08,1.248,2.232,1.248v0.624c-0.552-0.048-1.536-0.048-2.112-0.048   c-0.792,0-1.896,0-2.664,0.048v-0.624c0.312,0,0.984,0,0.984-0.624c0-0.24-0.168-0.552-0.312-0.792L6.577,8.137l-3.072,3.048v4.249   c0,1.08,0.264,1.08,1.92,1.08v0.624C4.729,17.09,3.456,17.09,2.712,17.09c-0.744,0-2.016,0-2.712,0.048v-0.624   c1.656,0,1.92,0,1.92-1.08V2.448c0-1.08-0.264-1.08-1.92-1.08V0.744c0.696,0.048,1.968,0.048,2.712,0.048   c0.744,0,2.016,0,2.712-0.048v0.624c-1.656,0-1.92,0-1.92,1.08v8.137l7.969-7.993c0.096-0.144,0.192-0.408,0.192-0.576   c0-0.168-0.096-0.6-0.72-0.648V0.744c0.624,0.048,1.752,0.048,2.4,0.048c0.48,0,1.08-0.024,1.56-0.048v0.624   c-1.344,0.048-2.256,0.72-3.12,1.56L7.633,7.081L12.985,15.266z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 罗马字符data: L
 */
define("char/data/roman/ul", [], {
    path: "M11.209,17.138H0v-0.624c1.656,0,1.92,0,1.92-1.08V2.448c0-1.08-0.264-1.08-1.92-1.08V0.744   c0.696,0.048,2.04,0.048,2.784,0.048c0.984,0,2.136,0,3.12-0.048v0.624H5.376c-1.824,0-1.872,0.24-1.872,1.104v13.105   c0,0.816,0.048,0.936,1.008,0.936h2.232c4.104,0,4.417-3.072,4.608-5.449h0.432L11.209,17.138z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 罗马字符data: M
 */
define("char/data/roman/um", [], {
    path: "M8.929,15.193l5.185-14.065c0.144-0.36,0.168-0.384,0.672-0.384h3.048v0.624c-1.656,0-1.92,0-1.92,1.08v12.985   c0,1.08,0.264,1.08,1.92,1.08v0.624c-0.648-0.048-1.968-0.048-2.664-0.048c-0.696,0-1.992,0-2.64,0.048v-0.624   c1.656,0,1.92,0,1.92-1.08V1.344h-0.024L8.737,16.753c-0.096,0.24-0.144,0.384-0.336,0.384s-0.24-0.144-0.336-0.384L2.424,1.464   H2.4v13.321c0,0.6,0,1.728,1.92,1.728v0.624C3.769,17.09,2.76,17.09,2.16,17.09s-1.608,0-2.16,0.048v-0.624   c1.92,0,1.92-1.128,1.92-1.728V2.448c0-1.08-0.264-1.08-1.92-1.08V0.744h3.072c0.504,0,0.528,0.024,0.672,0.384L8.929,15.193z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 18, 27 ]
});
/**
 * 罗马字符data: N
 */
define("char/data/roman/un", [], {
    path: "M11.761,14.209V3.097c0-0.6,0-1.729-1.92-1.729V0.744c0.552,0.048,1.56,0.048,2.16,0.048s1.608,0,2.16-0.048v0.624   c-1.92,0-1.92,1.128-1.92,1.729V16.61c0,0.456,0,0.528-0.24,0.528c-0.12,0-0.192,0-0.36-0.288L2.736,2.28   C2.568,2.041,2.568,1.992,2.4,1.848v12.938c0,0.6,0,1.728,1.92,1.728v0.624C3.769,17.09,2.76,17.09,2.16,17.09s-1.608,0-2.16,0.048   v-0.624c1.92,0,1.92-1.128,1.92-1.728V1.512C1.848,1.488,1.416,1.368,0.456,1.368H0V0.744h3.048c0.456,0,0.48,0.024,0.648,0.288   L11.761,14.209z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 15, 27 ]
});
/**
 * 罗马字符data: O
 */
define("char/data/roman/uo", [], {
    path: "M7.513,17.522C3.504,17.522,0,13.85,0,8.977S3.457,0.36,7.537,0.36c3.984,0,7.513,3.696,7.513,8.617   C15.049,13.777,11.617,17.522,7.513,17.522z M13.225,8.665c0-5.593-3.168-7.873-5.712-7.873C5.088,0.792,1.824,3,1.824,8.665   c0,5.688,2.976,8.425,5.712,8.425C10.177,17.09,13.225,14.45,13.225,8.665z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 罗马字符data: P
 */
define("char/data/roman/up", [], {
    path: "M3.143,15.425c0,1.08,0.264,1.08,1.92,1.08v0.624c-0.696-0.048-1.968-0.048-2.712-0.048s-2.016,0-2.712,0.048v-0.624   c1.656,0,1.92,0,1.92-1.08V2.44c0-1.08-0.264-1.08-1.92-1.08V0.736h7.345c3.144,0,5.353,2.112,5.353,4.393S10.08,9.425,6.983,9.425   h-3.84V15.425z M6.527,8.921c2.928,0,3.984-1.608,3.984-3.792c0-1.992-0.888-3.769-3.984-3.769H4.103   c-0.96,0-1.008,0.12-1.008,0.936v6.625H6.527z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 14, 27 ]
});
/**
 * 罗马字符data: Q
 */
define("char/data/roman/uq", [], {
    path: "M12.625,19.994c0.768,0,2.064-0.48,2.232-2.785c0-0.048,0.024-0.216,0.144-0.216c0.168,0,0.168,0.168,0.168,0.408   c0,0.672-0.12,4.416-2.664,4.416c-2.064,0-2.329-1.752-2.736-4.68c-0.912,0.312-1.68,0.384-2.232,0.384   C3.457,17.522,0,13.777,0,8.977C0,4.104,3.457,0.36,7.537,0.36c3.984,0,7.513,3.696,7.513,8.617c0,3.6-1.944,6.721-4.8,7.945   C10.705,18.722,11.209,19.994,12.625,19.994z M5.761,15.578c0-0.912,0.648-1.92,1.8-1.92c1.561,0,2.136,1.44,2.497,2.665   c1.608-1.032,3.216-3.289,3.216-7.345c0-5.617-3.072-8.185-5.761-8.185c-2.592,0-5.736,2.472-5.736,8.185   c0,4.464,1.968,7.128,4.464,7.92C5.977,16.585,5.761,16.129,5.761,15.578z M7.561,14.042c-0.912,0-1.416,0.792-1.416,1.536   c0,0.528,0.312,1.512,1.392,1.512c0.408,0,1.176-0.048,2.136-0.552C9.481,15.41,9.097,14.042,7.561,14.042z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 罗马字符data: R
 */
define("char/data/roman/ur", [], {
    path: "M11.353,12.77c0.048,0.528,0.096,0.888,0.168,1.392c0.144,1.464,0.288,2.976,1.608,2.976c0.744,0,1.44-0.528,1.56-2.088   c0-0.096,0.024-0.24,0.216-0.24c0.216,0,0.216,0.168,0.216,0.312c0,0.408-0.264,2.4-2.041,2.4c-0.528,0-1.752-0.096-2.664-1.081   c-0.72-0.816-0.72-1.632-0.72-3.24c0-1.632,0-2.28-0.96-3.216C8.401,9.673,7.633,9.121,6.265,9.121H3.457v6.313   c0,1.08,0.264,1.08,1.92,1.08v0.624C4.681,17.09,3.432,17.09,2.688,17.09c-0.744,0-1.992,0-2.688,0.048v-0.624   c1.656,0,1.92,0,1.92-1.08V2.448c0-1.08-0.264-1.08-1.92-1.08V0.744h6.457c3.36,0,5.905,2.041,5.905,4.296   c0,1.92-1.92,3.457-4.201,3.913C11.017,9.817,11.209,11.569,11.353,12.77z M10.537,5.041c0-2.976-2.328-3.672-4.32-3.672H4.464   c-0.96,0-1.008,0.12-1.008,0.936v6.433h2.736C7.993,8.737,10.537,8.137,10.537,5.041z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 罗马字符data: S
 */
define("char/data/roman/us", [], {
    path: "M9.409,5.713c0,0.408,0,0.48-0.216,0.48c-0.168,0-0.192-0.024-0.264-0.456c-0.36-3-1.944-4.8-4.488-4.8   c-2.04,0-3.288,1.704-3.288,3.264c0,0.768,0.24,1.536,0.912,2.28c0.6,0.648,1.152,0.816,2.448,1.152   c1.344,0.336,1.392,0.336,1.56,0.408c1.152,0.288,2.232,0.576,3.24,2.112c0.264,0.432,0.72,1.392,0.72,2.64   c0,2.544-1.849,4.729-4.465,4.729c-1.152,0-3.168-0.336-4.368-1.92c-0.456,0.912-0.456,0.96-0.48,1.032   c-0.336,0.744-0.384,0.864-0.552,0.864C0.024,17.498,0,17.474,0,17.042v-4.848c0-0.48,0.024-0.504,0.216-0.504   c0.168,0,0.192,0.024,0.216,0.408c0.168,3.36,2.568,4.8,5.136,4.8c2.088,0,3.313-1.848,3.313-3.576c0-1.344-0.72-2.784-2.088-3.36   c-0.24-0.096-1.44-0.408-2.16-0.6c-1.92-0.504-2.76-0.696-3.648-1.8C0.168,6.553,0,5.497,0,4.752C0,2.304,1.968,0.36,4.417,0.36   c1.512,0,2.904,0.6,3.816,1.92l0.72-1.584C9.049,0.48,9.097,0.384,9.241,0.384S9.409,0.408,9.409,0.84V5.713z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 11, 27 ]
});
/**
 * 罗马字符data: T
 */
define("char/data/roman/ut", [], {
    path: "M14.666,6.121h-0.432c-0.312-3.984-0.672-4.68-4.344-4.68c-0.432,0-1.128,0-1.32,0.024   C8.137,1.561,8.137,1.848,8.137,2.376v13.009c0,0.864,0.072,1.128,2.064,1.128h0.672v0.624c-1.152-0.024-2.352-0.048-3.528-0.048   c-1.176,0-2.376,0.024-3.528,0.048v-0.624h0.672c1.992,0,2.064-0.264,2.064-1.128V2.376c0-0.552,0-0.84-0.456-0.912   C5.905,1.44,5.208,1.44,4.776,1.44c-3.696,0-4.032,0.696-4.344,4.68H0l0.408-5.304h13.849L14.666,6.121z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 15, 27 ]
});
/**
 * 罗马字符data: U
 */
define("char/data/roman/uu", [], {
    path: "M11.737,3.097c0-0.6,0-1.729-1.92-1.729V0.744c0.552,0.048,1.584,0.048,2.184,0.048s1.608,0,2.16-0.048v0.624   c-0.696,0-1.92,0.144-1.92,1.488v9.121c0,2.353-1.8,5.545-4.92,5.545c-2.785,0-5.401-2.424-5.401-5.881V2.448   c0-1.08-0.264-1.08-1.92-1.08V0.744c0.696,0.048,1.968,0.048,2.712,0.048c0.744,0,2.016,0,2.712-0.048v0.624   c-1.656,0-1.92,0-1.92,1.08v9.313c0,0.84,0.096,2.328,0.864,3.48c0.672,1.008,1.776,1.656,3,1.656c2.28,0,4.368-2.04,4.368-5.256   V3.097z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 15, 27 ]
});
/**
 * 罗马字符data: V
 */
define("char/data/roman/uv", [], {
    path: "M8.473,17.138c-0.12,0.336-0.144,0.384-0.408,0.384s-0.288-0.048-0.408-0.384L1.944,2.232C1.656,1.464,1.392,1.368,0,1.368   V0.744c0.576,0.048,1.704,0.048,2.328,0.048c0.792,0,1.92,0,2.688-0.048v0.624c-0.504,0-1.464,0-1.464,0.648   c0,0.12,0.048,0.24,0.12,0.408l4.945,12.937l4.728-12.313c0.072-0.192,0.144-0.36,0.144-0.624c0-0.144-0.048-0.984-1.248-1.056   V0.744c0.552,0.048,1.536,0.048,2.112,0.048c0.6,0,1.224,0,1.776-0.048v0.624c-1.608,0.024-1.992,1.056-2.208,1.584L8.473,17.138z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 17, 27 ]
});
/**
 * 罗马字符data: W
 */
define("char/data/roman/uw", [], {
    path: "M16.01,17.114c-0.12,0.36-0.12,0.408-0.336,0.408c-0.192,0-0.264-0.048-0.36-0.384l-4.08-13.009L7.153,17.138   c-0.096,0.336-0.168,0.384-0.36,0.384c-0.216,0-0.216-0.048-0.336-0.408L1.776,2.28C1.536,1.512,1.44,1.368,0,1.368V0.744   c0.576,0.048,1.632,0.048,2.256,0.048c0.744,0,1.944,0,2.64-0.048v0.624c-0.48,0-1.536,0-1.536,0.672c0,0.048,0,0.096,0.12,0.432   L7.393,14.93l3.528-11.209c0.024-0.072,0.072-0.216,0.072-0.312c0-0.072-0.384-1.32-0.48-1.536   c-0.24-0.432-0.528-0.504-1.632-0.504V0.744c0.552,0.048,1.632,0.048,2.232,0.048c0.744,0,1.944,0,2.64-0.048v0.624   c-0.456,0-1.512,0-1.512,0.672c0,0.096,0.024,0.192,0.096,0.432l3.912,12.481l3.72-11.857c0.096-0.264,0.12-0.36,0.12-0.528   c0-0.576-0.456-1.176-1.536-1.2V0.744c0.576,0.048,1.632,0.048,2.232,0.048c0.432,0,1.272-0.024,1.68-0.048v0.624   c-1.392,0.048-1.752,0.888-1.968,1.536L16.01,17.114z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 23, 27 ]
});
/**
 * 罗马字符data: X
 */
define("char/data/roman/ux", [], {
    path: "M13.729,15.722c0.48,0.672,0.72,0.792,2.256,0.792v0.624c-0.576-0.048-1.776-0.048-2.4-0.048c-0.792,0-1.968,0-2.736,0.048   v-0.624c0.84-0.048,1.056-0.456,1.056-0.648c0-0.072,0-0.144-0.192-0.408L7.537,9.361l-3.84,5.569   c-0.12,0.168-0.24,0.336-0.24,0.648c0,0.384,0.216,0.864,0.96,0.936v0.624c-0.6-0.048-1.728-0.048-2.376-0.048   c-0.576,0-1.488,0-2.04,0.048v-0.624c0.456,0,2.016-0.024,3.048-1.512l4.176-6.072L2.592,2.161c-0.528-0.744-0.96-0.792-2.28-0.792   V0.744c0.576,0.048,1.776,0.048,2.4,0.048c0.792,0,1.968,0,2.736-0.048v0.624C4.656,1.392,4.393,1.8,4.393,2.017   c0,0.072,0.024,0.144,0.192,0.408l3.552,5.185l3.168-4.584c0.168-0.24,0.288-0.432,0.288-0.72c0-0.384-0.192-0.864-0.96-0.936   V0.744c0.6,0.048,1.584,0.048,2.376,0.048c0.576,0,1.488,0,2.04-0.048v0.624c-1.968,0.024-2.688,1.056-3.048,1.56L8.449,8.041   L13.729,15.722z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 罗马字符data: Y
 */
define("char/data/roman/uy", [], {
    path: "M9.025,10.585v4.752c0,1.176,0.216,1.176,1.944,1.176v0.624c-0.696-0.048-1.968-0.048-2.712-0.048s-1.992,0-2.688,0.048   v-0.624c1.656,0,1.92,0,1.92-1.08v-4.849L2.185,2.136C1.752,1.44,1.368,1.368,0,1.368V0.744c0.576,0.048,1.776,0.048,2.4,0.048   c0.792,0,1.968,0,2.736-0.048v0.624c-0.336,0-1.176,0-1.176,0.48c0,0.168,0.024,0.192,0.192,0.48l4.729,7.561l4.32-6.937   c0.192-0.312,0.312-0.504,0.312-0.792c0-0.456-0.312-0.769-0.912-0.792V0.744c0.576,0.048,1.536,0.048,2.136,0.048   s1.224,0,1.776-0.048v0.624c-0.432,0-1.728,0.024-2.665,1.512L9.025,10.585z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 17, 27 ]
});
/**
 * 罗马字符data: Z
 */
define("char/data/roman/uz", [], {
    path: "M1.824,16.466H6c4.584,0,4.752-2.448,4.969-5.593h0.432l-0.336,6.265H0.528c-0.48,0-0.528,0-0.528-0.312   c0-0.168,0-0.192,0.168-0.456L9.457,1.368h-3.96c-3.888,0-4.608,1.944-4.752,4.681H0.312l0.24-5.305h10.201   c0.504,0,0.528,0.024,0.528,0.48L1.824,16.466z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 罗马字符data: v
 */
define("char/data/roman/v", [], {
    path: "M5.952,16.922c-0.144,0.36-0.168,0.408-0.384,0.408c-0.216,0-0.24-0.048-0.384-0.408l-3.48-8.737   C1.416,7.441,0.912,7.441,0,7.441V6.817c0.528,0.048,1.272,0.048,1.92,0.048c0.6,0,1.656,0,2.232-0.048v0.624   c-0.36,0-1.152,0-1.152,0.576c0,0.096,0,0.144,0.144,0.456L6,15.673l2.64-6.672c0.144-0.336,0.144-0.384,0.144-0.6   c0-0.624-0.336-0.912-0.936-0.96V6.817c0.48,0.048,1.272,0.048,1.776,0.048c0.456,0,1.056-0.024,1.512-0.048v0.624   C9.745,7.489,9.361,8.449,9.145,8.977L5.952,16.922z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 罗马字符data: w
 */
define("char/data/roman/w", [], {
    path: "M10.993,16.946c-0.096,0.312-0.168,0.384-0.36,0.384c-0.168,0-0.264-0.048-0.384-0.408L7.752,9.673L5.28,16.922   c-0.12,0.36-0.216,0.408-0.384,0.408c-0.192,0-0.264-0.072-0.36-0.384L1.584,8.305C1.32,7.513,1.056,7.441,0,7.441V6.817   c0.504,0.048,1.32,0.048,1.848,0.048c0.6,0,1.608,0,2.184-0.048v0.624c-0.384,0-1.2,0-1.2,0.624c0,0.072,0,0.12,0.12,0.432   l2.376,6.937l2.208-6.433c-0.504-1.512-0.504-1.56-1.824-1.56V6.817c0.552,0.048,1.176,0.048,1.776,0.048   c0.576,0,1.584,0,2.136-0.048v0.624c-0.384,0-1.2,0-1.2,0.624c0,0.096,0.072,0.288,0.12,0.456l2.448,7.081l2.256-6.529   c0.048-0.168,0.096-0.384,0.096-0.552c0-0.6-0.408-1.032-1.152-1.08V6.817c0.408,0.048,1.44,0.048,1.896,0.048   c0.48,0,0.96-0.024,1.44-0.048v0.624c-0.36,0.024-1.32,0.072-1.8,1.488L10.993,16.946z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 罗马字符data: x
 */
define("char/data/roman/x", [], {
    path: "M9.292,15.722c0.576,0.744,0.936,0.792,2.136,0.792v0.624c-0.528-0.048-1.296-0.048-1.944-0.048   c-0.6,0-1.632,0-2.208,0.048v-0.624c0.384-0.024,0.672-0.216,0.672-0.552c0-0.168-0.288-0.528-0.48-0.792l-2.088-2.712   l-1.992,2.448c-0.216,0.288-0.408,0.552-0.408,0.984c0,0.552,0.384,0.6,0.528,0.624v0.624C3.075,17.09,2.019,17.09,1.539,17.09   c-0.432,0-1.272,0.024-1.68,0.048v-0.624c0.648-0.024,1.776-0.12,2.856-1.416c0.264-0.336,2.352-2.904,2.352-3   c0-0.072-0.12-0.216-0.168-0.264l-2.76-3.576c-0.576-0.72-0.864-0.816-2.16-0.816V6.817c0.528,0.048,1.296,0.048,1.944,0.048   c0.6,0,1.632,0,2.208-0.048v0.624C3.723,7.465,3.483,7.705,3.483,7.993c0,0.12,0,0.168,0.216,0.432l2.112,2.76l1.776-2.256   c0.12-0.168,0.36-0.432,0.36-0.864c0-0.336-0.192-0.576-0.528-0.624V6.817c0.552,0.048,1.296,0.048,1.944,0.048   c0.432,0,1.272-0.024,1.68-0.048v0.624c-1.056,0.024-1.968,0.408-2.76,1.32c-0.672,0.792-1.488,1.848-2.208,2.785L9.292,15.722z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 13, 27 ]
});
/**
 * 罗马字符data: y
 */
define("char/data/roman/y", [], {
    path: "M4.848,19.466c-0.48,1.2-1.344,2.544-2.736,2.544c-1.08,0-2.064-0.696-2.064-1.656c0-0.432,0.264-0.792,0.792-0.792   c0.48,0,0.768,0.36,0.768,0.768c0,0.408-0.24,0.744-0.792,0.792c0.432,0.432,1.032,0.504,1.296,0.504   c1.512,0,2.136-1.656,3.216-4.488L1.752,8.329C1.44,7.561,1.296,7.441,0,7.441V6.817c0.528,0.048,1.296,0.048,1.944,0.048   c0.6,0,1.632,0,2.208-0.048v0.624c-0.576,0-1.128,0.048-1.128,0.576c0,0.024,0,0.192,0.12,0.48L6,15.505l2.616-6.48   c0.12-0.288,0.168-0.408,0.168-0.648c0-0.192-0.024-0.864-0.936-0.936V6.817c0.48,0.048,1.272,0.048,1.776,0.048   c0.456,0,1.056-0.024,1.512-0.048v0.624c-0.336,0-1.416,0.024-2.016,1.488L4.848,19.466z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 罗马字符data: z
 */
define("char/data/roman/z", [], {
    path: "M1.512,16.706h3.072c2.928,0,3.24-1.224,3.432-3.888h0.432l-0.336,4.32H0.528C0.024,17.138,0,17.114,0,16.778l6.865-9.577   H3.937c-2.76,0-3.024,1.008-3.192,3.336H0.312l0.24-3.72h7.296c0.432,0,0.528,0,0.528,0.216c0,0.048,0,0.096-0.192,0.336   L1.512,16.706z",
    offset: {
        x: 1,
        y: 2
    },
    size: [ 9, 27 ]
});
/**
 * 字符data: *
 */
define("char/data/symbol/base/ast", [], {
    path: "M4.705,10.633l2.688-1.944c0.6-0.456,0.648-0.456,0.816-0.456c0.336,0,0.648,0.312,0.648,0.672   c0,0.36-0.192,0.456-0.576,0.648l-3.312,1.608c1.896,0.888,1.944,0.888,3.384,1.608c0.288,0.144,0.504,0.264,0.504,0.624   c0,0.336-0.312,0.672-0.648,0.672c-0.168,0-0.216-0.048-0.432-0.168l-3.072-2.232l0.36,4.033c0,0.456-0.36,0.624-0.648,0.624   c-0.192,0-0.624-0.12-0.624-0.624l0.36-4.033l-2.688,1.944c-0.6,0.456-0.648,0.456-0.816,0.456C0.312,14.065,0,13.753,0,13.394   c0-0.36,0.192-0.456,0.576-0.648l3.312-1.608L0.48,9.505C0.24,9.385,0,9.289,0,8.905c0-0.336,0.312-0.672,0.648-0.672   c0.168,0,0.216,0.048,0.432,0.168l3.072,2.232L3.816,6.913V6.601C3.745,6.289,4.057,5.977,4.44,5.977   c0.624,0,0.624,0.576,0.6,0.912L4.705,10.633z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 9, 27 ]
});
/**
 * 字符data: cdot
 */
define("char/data/symbol/base/cdot", [], {
    path: "M1.272,12.409C0.576,12.409,0,11.833,0,11.137c0-0.696,0.576-1.272,1.272-1.272c0.696,0,1.272,0.576,1.272,1.272   C2.544,11.833,1.968,12.409,1.272,12.409z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 3, 27 ]
});
/**
 * 字符data:
 */
define("char/data/symbol/base/cdots", [], {
    path: "M1.44,9.745c0.864,0,1.464,0.672,1.464,1.416c0,0.864-0.696,1.464-1.44,1.464C0.6,12.625,0,11.929,0,11.185   C0,10.369,0.624,9.745,1.44,9.745z M12.169,9.745c0.864,0,1.464,0.672,1.464,1.416c0,0.864-0.696,1.464-1.44,1.464   c-0.864,0-1.464-0.696-1.464-1.44C10.729,10.369,11.353,9.745,12.169,9.745z M22.898,9.745c0.864,0,1.464,0.672,1.464,1.416   c0,0.864-0.696,1.464-1.44,1.464c-0.864,0-1.464-0.696-1.464-1.44C21.458,10.369,22.082,9.745,22.898,9.745z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data: :
 */
define("char/data/symbol/base/colon", [], {
    path: "M0,7.992c0-0.336,0.121-0.621,0.363-0.855S0.895,6.785,1.23,6.785c0.32,0,0.6,0.119,0.838,0.357s0.357,0.521,0.357,0.85   c0,0.32-0.119,0.604-0.357,0.85S1.551,9.211,1.23,9.211c-0.336,0-0.625-0.121-0.867-0.363S0,8.32,0,7.992z M0,15.914   c0-0.336,0.121-0.621,0.363-0.855s0.531-0.352,0.867-0.352c0.32,0,0.6,0.119,0.838,0.357s0.357,0.521,0.357,0.85   c0,0.32-0.119,0.604-0.357,0.85s-0.518,0.369-0.838,0.369c-0.336,0-0.625-0.121-0.867-0.363S0,16.242,0,15.914z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 3, 27 ]
});
/**
 * 字符data: ,
 */
define("char/data/symbol/base/comma", [], {
    path: "M1.416,14.281c1.296,0,1.752,1.32,1.752,2.712c0,0.312-0.024,0.648-0.048,0.84c-0.216,1.416-0.792,2.64-1.752,3.672   c-0.216,0.216-0.336,0.336-0.432,0.336c-0.12,0-0.528-0.408-0.528-0.528c0-0.072,0.048-0.168,0.24-0.36   c1.008-1.032,1.536-2.28,1.632-3.697V16.97c-0.024,0-0.072,0.024-0.144,0.072c-0.216,0.096-0.432,0.144-0.648,0.144   c-0.84,0-1.488-0.624-1.488-1.44C0,14.953,0.576,14.281,1.416,14.281z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data:
 */
define("char/data/symbol/base/ddots", [], {
    path: "M1.44,1.92c0.864,0,1.464,0.672,1.464,1.416c0,0.864-0.696,1.464-1.44,1.464C0.6,4.801,0,4.104,0,3.36   C0,2.544,0.624,1.92,1.44,1.92z M12.169,9.121c0.864,0,1.464,0.672,1.464,1.416c0,0.864-0.696,1.464-1.44,1.464   c-0.864,0-1.464-0.696-1.464-1.44C10.729,9.745,11.353,9.121,12.169,9.121z M22.898,16.322c0.864,0,1.464,0.672,1.464,1.416   c0,0.864-0.696,1.464-1.44,1.464c-0.864,0-1.464-0.696-1.464-1.44C21.458,16.946,22.082,16.322,22.898,16.322z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data: 除号
 */
define("char/data/symbol/base/div", [], {
    path: "M15.193,10.657c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H0.84c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48   H15.193z M8.017,7.465c-0.888,0-1.536-0.744-1.536-1.512S7.104,4.44,8.017,4.44c0.888,0,1.536,0.744,1.536,1.512   S8.929,7.465,8.017,7.465z M8.017,17.834c-0.888,0-1.536-0.744-1.536-1.512s0.624-1.512,1.536-1.512   c0.888,0,1.536,0.744,1.536,1.512S8.929,17.834,8.017,17.834z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data: !
 */
define("char/data/symbol/base/exclamation", [], {
    path: "M0.914,12.598L0,1.242V1.102c0-0.305,0.125-0.564,0.375-0.779S0.91,0,1.23,0c0.305,0,0.58,0.107,0.826,0.322   s0.369,0.475,0.369,0.779v0.141L1.535,12.598c0,0.031-0.02,0.066-0.059,0.105s-0.074,0.059-0.105,0.059H1.078   C0.969,12.762,0.914,12.707,0.914,12.598z M0,15.938c0-0.336,0.121-0.621,0.363-0.855S0.895,14.73,1.23,14.73   c0.32,0,0.6,0.119,0.838,0.357s0.357,0.521,0.357,0.85c0,0.32-0.119,0.604-0.357,0.85s-0.518,0.369-0.838,0.369   c-0.336,0-0.625-0.121-0.867-0.363S0,16.266,0,15.938z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 3, 27 ]
});
/**
 * 字符data: ∞
 */
define("char/data/symbol/base/infty", [], {
    path: "M4.805,6.529c1.656,0,2.904,0.648,3.96,1.464c0.648,0.528,1.056,0.937,1.776,1.873l0.336,0.456l0.168-0.24   c0.888-1.272,2.185-2.592,3.625-3.168c0.648-0.24,1.32-0.384,1.968-0.384c0.528,0,1.056,0.096,1.512,0.264   c1.776,0.72,3.216,2.688,3.216,5.208v0.168c-0.096,1.752-0.888,3.336-1.944,4.176c-0.72,0.624-1.656,1.056-2.88,1.056   c-1.632,0-2.88-0.648-3.912-1.464c-0.648-0.528-1.056-0.936-1.776-1.872l-0.336-0.456l-0.168,0.24   c-0.888,1.272-2.184,2.592-3.625,3.168c-0.648,0.24-1.32,0.384-1.968,0.384c-0.528,0-1.056-0.096-1.512-0.264   c-1.776-0.72-3.216-2.688-3.216-5.208v-0.168c0.096-1.752,0.888-3.336,1.944-4.176C2.741,6.937,3.653,6.529,4.805,6.529z    M0.917,12.001c0,1.92,1.032,3.696,2.472,4.152c0.336,0.12,0.672,0.192,1.056,0.192c0.816,0,1.704-0.288,2.497-0.792   c0.984-0.648,1.896-1.729,2.712-3.048l-0.744-0.96c-0.408-0.528-0.84-1.08-0.96-1.224c-1.152-1.392-2.088-2.088-3.12-2.256   C4.685,8.041,4.493,8.017,4.301,8.017C2.117,8.017,0.917,10.057,0.917,12.001z M20.479,11.929c0-2.28-1.32-4.32-3.504-4.32   c-0.84,0-1.728,0.264-2.496,0.768c-1.008,0.648-1.92,1.728-2.736,3.048l0.744,0.96c0.408,0.528,0.84,1.08,0.96,1.224   c1.32,1.632,2.4,2.304,3.625,2.304C19.23,15.914,20.479,13.874,20.479,11.929z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 22, 27 ]
});
/**
 * 字符data: {
 */
define("char/data/symbol/base/l-braces", [], {
    path: "M5.065,8.953c0,1.392-0.864,2.496-2.832,3.048c0.672,0.192,1.368,0.432,1.872,0.936c0.768,0.768,0.96,1.176,0.96,2.28   v5.041c0,0.864,0,0.912,0.072,1.128c0.312,1.224,1.488,1.992,3,2.088c0.24,0.024,0.384,0.024,0.384,0.264   c0,0.264-0.192,0.264-0.456,0.264c-0.936,0-2.521-0.264-3.457-0.984c-1.152-0.912-1.152-1.68-1.152-2.688v-4.752   c0-0.864,0-0.912-0.072-1.176c-0.264-1.176-1.416-2.041-3-2.136C0.144,12.241,0,12.241,0,12.001c0-0.144,0.096-0.24,0.216-0.264   c0.528-0.024,1.44-0.072,2.28-0.768c0.96-0.792,0.96-1.56,0.96-2.496V3c0.024-1.776,2.208-3,4.608-3c0.264,0,0.456,0,0.456,0.264   c0,0.144-0.096,0.24-0.216,0.264c-2.616,0.168-3.24,1.704-3.24,2.665V8.953z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data: [
 */
define("char/data/symbol/base/l-brackets", [], {
    path: "M0,24V0h3.398v0.961H0.961v22.078h2.438V24H0z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 4, 27 ]
});
/**
 * 字符data: (
 */
define("char/data/symbol/base/l-parentheses", [], {
    path: "M5.367,23.953C4.461,23.281,3.672,22.498,3,21.604s-1.234-1.875-1.688-2.941s-0.785-2.158-0.996-3.275S0,13.141,0,12   s0.105-2.273,0.316-3.398S0.859,6.383,1.313,5.32S2.328,3.281,3,2.391s1.461-1.672,2.367-2.344C5.367,0.016,5.41,0,5.496,0h0.211   c0.047,0,0.09,0.021,0.129,0.064s0.059,0.092,0.059,0.146c0,0.086-0.023,0.152-0.07,0.199C4.801,1.324,3.965,2.408,3.316,3.662   s-1.115,2.586-1.4,3.996S1.488,10.516,1.488,12s0.143,2.932,0.428,4.342s0.752,2.742,1.4,3.996s1.484,2.338,2.508,3.252   c0.047,0.047,0.07,0.113,0.07,0.199c0,0.039-0.021,0.084-0.064,0.135S5.746,24,5.707,24H5.496C5.41,24,5.367,23.984,5.367,23.953z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 6, 27 ]
});
/**
 * 字符data:
 */
define("char/data/symbol/base/ldots", [], {
    path: "M1.44,14.305c0.864,0,1.464,0.672,1.464,1.416c0,0.864-0.696,1.464-1.44,1.464C0.6,17.186,0,16.489,0,15.746   C0,14.929,0.624,14.305,1.44,14.305z M12.169,14.305c0.864,0,1.464,0.672,1.464,1.416c0,0.864-0.696,1.464-1.44,1.464   c-0.864,0-1.464-0.696-1.464-1.44C10.729,14.929,11.353,14.305,12.169,14.305z M22.898,14.305c0.864,0,1.464,0.672,1.464,1.416   c0,0.864-0.696,1.464-1.44,1.464c-0.864,0-1.464-0.696-1.464-1.44C21.458,14.929,22.082,14.305,22.898,14.305z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data: ∧
 */
define("char/data/symbol/base/mid", [], {
    path: "M0.96,23.138c0,0.432,0,0.864-0.48,0.864S0,23.57,0,23.138V0.864C0,0.432,0,0,0.48,0s0.48,0.432,0.48,0.864V23.138z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * Created by hn on 14-3-13.
 */
define("char/data/symbol/base/mp", [], {
    path: "M8.497,20.234c0,0.36,0,0.888-0.48,0.888s-0.48-0.432-0.48-0.816v-6.697H0.84c-0.408,0-0.84,0-0.84-0.48   s0.432-0.48,0.84-0.48h6.697V6.097H0.84c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h14.329c0.408,0,0.84,0,0.84,0.48   s-0.432,0.48-0.84,0.48H8.497v6.553h6.672c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H8.497V20.234z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data: -
 */
define("char/data/symbol/base/negative", [], {
    path: "M0.774,11.691c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h12.985c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48   H0.774z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * Created by hn on 14-3-13.
 */
define("char/data/symbol/base/pm", [], {
    path: "M8.497,16.178h6.672c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H0.84c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48   h6.697V9.625H0.84c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h6.697V1.968c0-0.384,0-0.816,0.48-0.816s0.48,0.504,0.48,0.888   v6.625h6.672c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H8.497V16.178z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data: .
 */
define("char/data/symbol/base/point", [], {
    path: "M0,15.914c0-0.336,0.121-0.621,0.363-0.855s0.531-0.352,0.867-0.352c0.32,0,0.6,0.119,0.838,0.357s0.357,0.521,0.357,0.85   c0,0.32-0.119,0.604-0.357,0.85s-0.518,0.369-0.838,0.369c-0.336,0-0.625-0.121-0.867-0.363S0,16.242,0,15.914z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 3, 27 ]
});
/**
 * 字符data: +
 */
define("char/data/symbol/base/positive", [], {
    path: "M7.729,17.93c0,0.36,0,0.744-0.432,0.744c-0.408,0-0.408-0.408-0.408-0.744v-6.36h-6.36c-0.36,0-0.744,0-0.744-0.432   c0-0.408,0.408-0.408,0.744-0.408h6.36v-6.36c0-0.36,0-0.744,0.432-0.744c0.408,0,0.408,0.408,0.408,0.744v6.36h6.36   c0.36,0,0.744,0,0.744,0.432c0,0.408-0.408,0.408-0.744,0.408h-6.36V17.93z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data: '
 */
define("char/data/symbol/base/quotation", [], {
    path: "M0,8.685C0,8.637,0.016,8.512,0.048,8.31C0.08,8.108,0.096,7.983,0.096,7.934L1.08,1.683l0.024-0.169   C1.12,1.385,1.143,1.276,1.173,1.188s0.07-0.204,0.12-0.348c0.049-0.144,0.11-0.255,0.183-0.333C1.548,0.428,1.656,0.36,1.8,0.301   c0.144-0.058,0.304-0.088,0.48-0.088h0.024c0.24,0,0.44,0.068,0.6,0.204c0.16,0.136,0.24,0.324,0.24,0.564   c0,0.096-0.064,0.36-0.192,0.792L0.576,8.661c-0.08,0.24-0.184,0.36-0.312,0.36C0.088,9.021,0,8.909,0,8.685z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 4, 27 ]
});
/**
 * 字符data: }
 */
define("char/data/symbol/base/r-braces", [], {
    path: "M3.457,15.049c0-1.392,0.864-2.496,2.832-3.048c-0.672-0.192-1.368-0.432-1.872-0.936c-0.768-0.768-0.96-1.176-0.96-2.28   V3.744c0-0.864,0-0.912-0.072-1.128c-0.312-1.224-1.488-1.992-3-2.088C0.144,0.504,0,0.504,0,0.264C0,0,0.264,0,0.48,0   c0.816,0,2.472,0.24,3.433,0.984c1.152,0.912,1.152,1.68,1.152,2.688v4.752c0,0.864,0,0.912,0.072,1.176   c0.264,1.176,1.416,2.041,3,2.136c0.24,0.024,0.384,0.024,0.384,0.264c0,0.144-0.096,0.24-0.216,0.264   c-0.528,0.024-1.44,0.072-2.28,0.768c-0.96,0.792-0.96,1.56-0.96,2.496v5.473c-0.024,1.824-2.256,3-4.584,3   c-0.216,0-0.48,0-0.48-0.264c0-0.144,0.096-0.24,0.216-0.264c2.616-0.168,3.24-1.704,3.24-2.665V15.049z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data: ]
 */
define("char/data/symbol/base/r-brackets", [], {
    path: "M0,24v-0.961h2.449V0.961H0V0h3.41v24H0z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 4, 27 ]
});
/**
 * 字符data: )
 */
define("char/data/symbol/base/r-parentheses", [], {
    path: "M0.223,24C0.074,24,0,23.93,0,23.789c0-0.086,0.035-0.152,0.105-0.199c0.789-0.703,1.457-1.494,2.004-2.373   s0.994-1.834,1.342-2.865s0.596-2.078,0.744-3.141S4.418,13.078,4.418,12c0-1.086-0.074-2.158-0.223-3.217s-0.395-2.1-0.738-3.123   S2.67,3.686,2.127,2.807S0.91,1.129,0.105,0.41C0.035,0.363,0,0.297,0,0.211c0-0.055,0.02-0.104,0.059-0.146S0.152,0,0.223,0h0.211   c0.055,0,0.098,0.016,0.129,0.047C1.469,0.719,2.26,1.506,2.936,2.408S4.166,4.275,4.6,5.303s0.76,2.113,0.979,3.258   S5.906,10.852,5.906,12c0,1.133-0.107,2.271-0.322,3.416s-0.541,2.23-0.979,3.258s-0.994,1.996-1.67,2.906   s-1.467,1.701-2.373,2.373C0.531,23.984,0.488,24,0.434,24H0.223z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 6, 27 ]
});
/**
 * 字符data: /
 */
define("char/data/symbol/base/slash", [], {
    path: "M0,23.52c0-0.031,0.02-0.086,0.059-0.164L8.883,0.293C8.938,0.098,9.082,0,9.316,0c0.141,0,0.256,0.043,0.346,0.129   S9.797,0.332,9.797,0.48c0,0.039-0.002,0.07-0.006,0.094s-0.01,0.047-0.018,0.07L0.938,23.707C0.859,23.902,0.707,24,0.48,24   c-0.117,0-0.227-0.047-0.328-0.141S0,23.652,0,23.52z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 10, 27 ]
});
/**
 * 字符data: X(乘号)
 */
define("char/data/symbol/base/times", [], {
    path: "M10.561,5.713c0.264-0.264,0.36-0.36,0.552-0.36c0.288,0,0.48,0.216,0.48,0.48c0,0.168-0.096,0.264-0.12,0.312   c-0.12,0.144-0.48,0.456-0.6,0.6L6.48,11.137c1.2,1.224,5.017,4.992,5.041,5.041c0.072,0.12,0.072,0.216,0.072,0.264   c0,0.264-0.192,0.48-0.48,0.48c-0.144,0-0.312-0.12-0.36-0.144l-4.968-4.969l-4.776,4.776c-0.288,0.288-0.336,0.336-0.528,0.336   c-0.24,0-0.48-0.216-0.48-0.48c0-0.168,0.048-0.216,0.312-0.48l4.8-4.824l-4.8-4.824C0.048,6.049,0,6,0,5.833   c0-0.264,0.24-0.48,0.48-0.48c0.192,0,0.24,0.048,0.528,0.336l4.8,4.777L10.561,5.713z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 12, 27 ]
});
/**
 * 字符data: →
 */
define("char/data/symbol/base/to", [], {
    path: "M0.336,10.657h18.361c-1.224-0.912-2.016-1.872-2.64-3.072c-0.384-0.744-0.672-1.608-0.792-2.28   c0-0.072-0.024-0.12-0.024-0.168c0-0.24,0.168-0.264,0.48-0.264c0.384,0,0.432,0.048,0.504,0.336   c0.048,0.288,0.168,0.72,0.264,0.984c0.696,2.088,2.376,3.936,4.608,4.68c0.144,0.048,0.216,0.12,0.216,0.264   s-0.072,0.216-0.216,0.264c-2.208,0.744-3.912,2.592-4.608,4.68c-0.096,0.264-0.216,0.696-0.264,0.96   c-0.072,0.312-0.12,0.36-0.504,0.36c-0.36,0-0.504-0.072-0.504-0.264c0-0.144,0.072-0.336,0.144-0.6   c0.528-2.112,1.68-3.696,3.336-4.92H0.336C0.144,11.521,0,11.401,0,11.137S0.144,10.753,0.336,10.657z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 22, 27 ]
});
/**
 * 字符data:
 */
define("char/data/symbol/base/vdots", [], {
    path: "M1.44,0c0.864,0,1.464,0.672,1.464,1.417c0,0.864-0.696,1.464-1.44,1.464C0.6,2.88,0,2.185,0,1.44C0,0.624,0.624,0,1.44,0z    M1.44,9.601c0.864,0,1.464,0.672,1.464,1.416c0,0.864-0.696,1.464-1.44,1.464C0.6,12.481,0,11.785,0,11.041   C0,10.225,0.624,9.601,1.44,9.601z M1.44,19.442c0.864,0,1.464,0.672,1.464,1.416c0,0.864-0.696,1.464-1.44,1.464   C0.6,22.322,0,21.626,0,20.882C0,20.066,0.624,19.442,1.44,19.442z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data: ∨
 */
define("char/data/symbol/base/vee", [], {
    path: "M7.2,18.025c-0.144,0.336-0.216,0.504-0.528,0.504c-0.216,0-0.36-0.096-0.552-0.504L0.144,4.512C0,4.224,0,4.176,0,4.128   c0-0.264,0.216-0.48,0.48-0.48c0.168,0,0.36,0.048,0.552,0.504l5.641,12.721l5.641-12.697c0.168-0.36,0.312-0.528,0.552-0.528   c0.264,0,0.48,0.216,0.48,0.48c0,0.12-0.024,0.168-0.168,0.48L7.2,18.025z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data: |
 */
define("char/data/symbol/base/vertical", [], {
    path: "M0,22.632V0.72c0-0.464,0.16-0.696,0.48-0.696c0.32,0,0.48,0.232,0.48,0.696v21.912c0,0.448-0.16,0.672-0.48,0.672   C0.16,23.304,0,23.08,0,22.632z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 1, 27 ]
});
/**
 * 字符data: ∧
 */
define("char/data/symbol/base/wedge", [], {
    path: "M13.201,17.666c0.144,0.288,0.144,0.336,0.144,0.384c0,0.264-0.216,0.48-0.48,0.48c-0.096,0-0.336,0-0.552-0.504   L6.672,5.304L1.032,18.025c-0.192,0.456-0.384,0.504-0.552,0.504c-0.264,0-0.48-0.216-0.48-0.48c0-0.12,0.024-0.168,0.168-0.48   L6.145,4.152C6.289,3.816,6.36,3.648,6.672,3.648c0.216,0,0.36,0.096,0.552,0.504L13.201,17.666z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data: ≇
 */
define("char/data/symbol/not/ncong", [], {
    path: "M5.736,16.01h9.337c0.432,0,0.888,0,0.888,0.48s-0.432,0.48-0.84,0.48H5.185l-1.92,3.36c-0.24,0.432-0.336,0.576-0.6,0.576   c-0.288,0-0.48-0.216-0.48-0.48c0-0.144,0.048-0.192,0.144-0.408c0.264-0.432,0.696-1.176,1.752-3.048H0.84   c-0.408,0-0.84,0-0.84-0.48s0.456-0.48,0.888-0.48h3.744l2.112-3.696H0.84c-0.408,0-0.84,0-0.84-0.48c0-0.48,0.456-0.48,0.888-0.48   h6.408l2.353-4.128C8.497,6.673,8.041,6.241,7.008,5.617c-0.912-0.576-1.872-1.08-3-1.08c-1.248,0-3.216,0.72-3.336,2.736   c0,0.12-0.072,0.552-0.336,0.552C0.168,7.825,0,7.633,0,7.105c0-2.208,1.776-3.913,4.008-3.913c1.536,0,2.904,0.912,4.2,1.776   C9.745,6,10.201,6.121,10.249,6.121c0.024,0,0.048-0.024,0.216-0.288l2.304-4.008c0.144-0.264,0.264-0.456,0.528-0.456   c0.288,0,0.48,0.216,0.48,0.48c0,0.12-0.024,0.168-0.192,0.48l-2.352,4.104c0.312,0.072,0.6,0.072,0.744,0.072   c1.632,0,3.216-1.056,3.312-2.64c0.024-0.528,0.216-0.648,0.336-0.648c0.144,0,0.336,0.168,0.336,0.744   c0,2.064-1.632,3.889-3.984,3.889c-0.24,0-0.768,0-1.44-0.24L8.4,11.353h6.673c0.432,0,0.888,0,0.888,0.48   c0,0.48-0.432,0.48-0.84,0.48H7.849L5.736,16.01z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 22 0 L 22 27 L 0 27 Z"
});
/**
 * 字符data: 不等号
 */
define("char/data/symbol/not/neq", [], {
    path: "M1.376,9.745H0.56c-0.12,0-0.288,0.024-0.408-0.024c-0.048-0.024-0.096-0.072-0.12-0.12   c-0.024-0.072-0.024-0.12-0.024-0.192c0-0.144-0.048-0.384,0.096-0.504c0.144-0.096,0.384-0.048,0.552-0.048H2h4.2h1.2   c0.144,0,0.384,0.048,0.528-0.024c0.12-0.072,0.192-0.264,0.264-0.384c0.192-0.312,0.384-0.624,0.552-0.936   c0.576-0.984,1.152-1.968,1.704-2.952c0.168-0.288,0.336-0.552,0.504-0.84c0.072-0.12,0.12-0.288,0.24-0.384   c0.096-0.048,0.168-0.048,0.264-0.048c0.192,0,0.648-0.048,0.576,0.288c-0.048,0.192-0.192,0.408-0.312,0.576   c-0.192,0.36-0.408,0.744-0.624,1.104c-0.696,1.2-1.416,2.376-2.088,3.6h4.417h0.576c0.096,0,0.216,0,0.288,0.096   c0.072,0.12,0.048,0.264,0.048,0.384s0,0.24-0.072,0.312c-0.096,0.12-0.264,0.096-0.408,0.096h-1.056H9.92H9.033   c-0.144,0-0.312-0.024-0.456,0C8.48,9.793,8.408,9.865,8.36,9.961c-0.096,0.168-0.168,0.312-0.264,0.48   c-0.408,0.696-0.816,1.368-1.2,2.064h6.072h0.816c0.12,0,0.288-0.024,0.408,0.024c0.048,0.024,0.096,0.072,0.12,0.12   c0.024,0.072,0.024,0.12,0.024,0.192c0,0.144,0.048,0.384-0.096,0.504c-0.144,0.096-0.384,0.048-0.552,0.048h-1.344h-4.2h-1.2   c-0.144,0-0.384-0.048-0.528,0.024c-0.12,0.072-0.192,0.264-0.264,0.384C5.96,14.113,5.768,14.425,5.6,14.737   c-0.576,0.984-1.152,1.968-1.704,2.953c-0.168,0.288-0.336,0.552-0.504,0.84c-0.072,0.12-0.12,0.288-0.24,0.384   c-0.096,0.048-0.168,0.048-0.264,0.048c-0.192,0-0.648,0.048-0.576-0.288c0.048-0.192,0.192-0.408,0.312-0.576   c0.192-0.36,0.408-0.744,0.624-1.104c0.696-1.2,1.416-2.376,2.088-3.6H0.92H0.344c-0.096,0-0.216,0-0.288-0.096   c-0.072-0.12-0.048-0.264-0.048-0.384c0-0.12,0-0.24,0.072-0.313c0.096-0.12,0.264-0.096,0.408-0.096h1.056h2.88h0.888   c0.144,0,0.312,0.024,0.456,0c0.096-0.048,0.168-0.12,0.216-0.216c0.096-0.168,0.168-0.312,0.264-0.48   c0.408-0.696,0.816-1.368,1.2-2.064H1.376z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 22 0 L 22 27 L 0 27 Z"
});
/**
 * 字符data:
 */
define("char/data/symbol/not/nequiv", [], {
    path: "M1.784,7.921H0.68c-0.168,0-0.384,0.048-0.528-0.024c-0.048-0.024-0.096-0.072-0.12-0.12   c-0.024-0.072-0.024-0.12-0.024-0.192c0-0.144-0.048-0.384,0.096-0.504C0.272,6.985,0.56,7.033,0.728,7.033h1.584h4.969h1.392   c0.168,0,0.456,0.048,0.624-0.024c0.144-0.072,0.216-0.288,0.264-0.432c0.192-0.384,0.408-0.792,0.576-1.176   c0.552-1.2,1.152-2.376,1.729-3.553c0.168-0.312,0.312-0.624,0.456-0.936c0.072-0.12,0.12-0.312,0.24-0.408   c0.096-0.048,0.192-0.048,0.288-0.048c0.192,0,0.576-0.048,0.528,0.264c-0.024,0.216-0.168,0.432-0.264,0.624   c-0.216,0.408-0.408,0.816-0.6,1.224c-0.432,0.936-0.912,1.848-1.368,2.784c-0.264,0.552-0.504,1.128-0.816,1.68h4.44h0.576   c0.096,0,0.216,0,0.288,0.096c0.072,0.12,0.048,0.264,0.048,0.384c0,0.12,0,0.24-0.072,0.312c-0.096,0.12-0.264,0.096-0.408,0.096   h-1.032h-2.904h-0.864c-0.144,0-0.312-0.024-0.432,0.024c-0.096,0.024-0.12,0.12-0.168,0.192c-0.096,0.168-0.168,0.336-0.24,0.504   c-0.336,0.672-0.648,1.392-1.008,2.04h5.736h0.912c0.12,0,0.288-0.024,0.384,0.072c0.12,0.096,0.096,0.264,0.096,0.384   s0.024,0.264-0.072,0.336c-0.12,0.144-0.36,0.096-0.504,0.096h-1.392h-3.84H8.745c-0.168,0-0.384-0.048-0.552,0.024   C8.097,11.617,8.049,11.713,8,11.809c-0.072,0.168-0.144,0.312-0.216,0.48c-0.336,0.672-0.648,1.392-1.008,2.041h7.128h1.104   c0.168,0,0.384-0.048,0.528,0.024c0.048,0.024,0.096,0.072,0.12,0.12c0.024,0.072,0.024,0.12,0.024,0.192   c0,0.144,0.048,0.384-0.096,0.504c-0.168,0.096-0.456,0.048-0.624,0.048h-1.584H8.409H7.017c-0.168,0-0.456-0.048-0.624,0.024   c-0.144,0.072-0.216,0.288-0.264,0.432l-0.576,1.152c-0.552,1.2-1.152,2.4-1.729,3.576c-0.168,0.312-0.312,0.624-0.456,0.936   c-0.072,0.12-0.12,0.312-0.24,0.408c-0.096,0.048-0.192,0.048-0.288,0.048c-0.192,0-0.576,0.048-0.528-0.264   c0.024-0.216,0.168-0.432,0.264-0.624c0.216-0.408,0.408-0.816,0.6-1.224c0.432-0.937,0.912-1.848,1.368-2.785   c0.264-0.552,0.504-1.128,0.816-1.68H0.92H0.344c-0.096,0-0.216,0-0.288-0.096c-0.072-0.12-0.048-0.264-0.048-0.384   c0-0.12,0-0.24,0.072-0.312c0.096-0.12,0.264-0.096,0.408-0.096H1.52h2.904h0.864c0.144,0,0.312,0.024,0.432-0.024   c0.096-0.024,0.12-0.12,0.168-0.192c0.096-0.168,0.168-0.336,0.24-0.504c0.336-0.672,0.648-1.392,1.008-2.04H1.4H0.488   c-0.12,0-0.288,0.024-0.384-0.072c-0.12-0.096-0.096-0.264-0.096-0.384s-0.024-0.264,0.072-0.336   c0.12-0.144,0.36-0.096,0.504-0.096h1.392h3.84h1.128c0.168,0,0.384,0.048,0.552-0.024c0.096-0.024,0.144-0.12,0.192-0.216   c0.072-0.168,0.144-0.312,0.216-0.48c0.336-0.672,0.648-1.392,1.008-2.04H1.784z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 23 0 L 23 27 L 0 27 Z"
});
/**
 * 字符data: ≱
 */
define("char/data/symbol/not/nge", [], {
    path: "M4.393,21.602h9.433c0.432,0,0.84,0,0.84,0.48s-0.48,0.48-0.888,0.48H3.984L2.568,25.97   c-0.144,0.336-0.24,0.576-0.552,0.576c-0.288,0-0.48-0.216-0.48-0.48c0-0.24,1.2-3,1.416-3.504H0.888c-0.408,0-0.888,0-0.888-0.48   s0.408-0.48,0.84-0.48h2.497l2.616-6.24l-5.088,2.4c-0.24,0.12-0.288,0.144-0.384,0.144c-0.264,0-0.48-0.24-0.48-0.48   c0-0.192,0.072-0.36,0.48-0.552l6-2.832l2.16-5.185l-8.113-3.84C0.144,4.848,0,4.776,0,4.488s0.216-0.48,0.48-0.48   c0.168,0,0.36,0.096,0.504,0.168l8.041,3.792l3.264-7.825C12.385,0.048,12.505,0,12.649,0c0.288,0,0.48,0.216,0.48,0.48   c0,0.12-0.024,0.168-0.144,0.456L9.889,8.4l4.32,2.016c0.24,0.12,0.456,0.264,0.456,0.528c0,0.312-0.168,0.384-0.528,0.552   l-6.913,3.265L4.393,21.602z M7.777,13.441l5.28-2.496l-3.552-1.68L7.777,13.441z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 21 0 L 21 27 L 0 27 Z"
});
/**
 * 字符data: ≯
 */
define("char/data/symbol/not/ngt", [], {
    path: "M5.521,15.77l-2.952,5.785c-0.192,0.336-0.216,0.36-0.288,0.432c-0.096,0.072-0.168,0.096-0.264,0.096   c-0.264,0-0.48-0.192-0.48-0.48s2.208-4.488,2.568-5.161L2.16,17.33c-0.168,0.096-1.512,0.744-1.68,0.744   c-0.24,0-0.48-0.216-0.48-0.456c0-0.192,0.072-0.36,0.48-0.552l4.344-2.041l3.192-6.265L0.48,5.208C0.072,5.017,0,4.849,0,4.657   c0-0.24,0.24-0.456,0.48-0.456c0.096,0,0.192,0.024,0.432,0.144l7.537,3.552l3.696-7.249c0.168-0.312,0.24-0.456,0.504-0.456   c0.264,0,0.48,0.192,0.48,0.48c0,0.096,0,0.144-0.192,0.48L9.313,8.305l4.872,2.304c0.288,0.144,0.48,0.216,0.48,0.528   c0,0.264-0.168,0.408-0.456,0.528L5.521,15.77z M6.216,14.354l6.841-3.216L8.881,9.169L6.216,14.354z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 22 0 L 22 27 L 0 27 Z"
});
/**
 * 字符data:
 */
define("char/data/symbol/not/nin", [], {
    path: "M7.061,3.957c0.288-0.937,0.576-1.896,0.84-2.833l0.144-0.432C8.069,0.597,8.117,0.5,8.189,0.453   c0.12-0.072,0.288-0.048,0.432-0.048c0.12,0,0.264,0,0.336,0.096c0.096,0.096,0.048,0.264,0,0.384L8.693,1.772   c-0.24,0.816-0.48,1.608-0.72,2.424C7.829,4.653,7.685,5.109,7.565,5.565c0.552,0,1.128,0.072,1.68,0.144   c0.288,0.048,0.6,0.072,0.888,0.168c0.264,0.096,0.168,0.36,0.12,0.576c-0.024,0.096-0.048,0.216-0.12,0.288   c-0.096,0.072-0.216,0.048-0.312,0.024C9.677,6.741,9.509,6.717,9.365,6.693c-0.456-0.072-0.912-0.12-1.368-0.168   c-0.24-0.024-0.48,0-0.72-0.048l-0.36,1.2l-0.864,2.928h2.616h0.864c0.144,0,0.312-0.024,0.456,0   c0.288,0.048,0.24,0.336,0.24,0.552c0,0.144,0,0.288-0.144,0.36c-0.096,0.048-0.24,0.024-0.336,0.024H9.125H6.869H6.101   c-0.096,0-0.24-0.024-0.312,0.048c-0.096,0.072-0.096,0.24-0.144,0.336l-0.216,0.744c-0.192,0.672-0.408,1.32-0.6,1.992   c-0.096,0.336-0.24,0.672-0.288,1.032c0.984,0,1.992,0.024,2.976-0.072c0.336-0.048,0.672-0.072,1.008-0.144   c0.216-0.024,0.432-0.12,0.648-0.12c0.072,0,0.144,0.024,0.192,0.096c0.048,0.072,0.072,0.168,0.096,0.24   c0.024,0.168,0.144,0.408-0.048,0.528c-0.096,0.072-0.24,0.096-0.336,0.12c-0.24,0.048-0.48,0.096-0.72,0.12   c-0.888,0.12-1.8,0.168-2.688,0.168H4.661c-0.12,0-0.288-0.048-0.384,0.024c-0.096,0.072-0.12,0.24-0.144,0.336l-0.24,0.84   c-0.288,0.912-0.552,1.8-0.816,2.712l-0.24,0.744c-0.024,0.12-0.048,0.264-0.144,0.36c-0.096,0.096-0.216,0.096-0.336,0.096   c-0.216,0-0.576,0.024-0.528-0.288c0.024-0.168,0.096-0.336,0.144-0.504l0.288-0.96c0.216-0.768,0.456-1.512,0.672-2.28   c0.12-0.432,0.264-0.864,0.384-1.296c-0.336-0.072-0.672-0.216-0.984-0.408c-0.24-0.12-0.456-0.264-0.648-0.432   c-1.416-1.248-1.8-3.288-1.656-5.088c0.024-0.432,0.072-0.864,0.192-1.296c0.144-0.6,0.384-1.176,0.744-1.68   c0.192-0.288,0.456-0.576,0.72-0.816c0.864-0.792,2.064-1.104,3.216-1.176c0.552-0.024,1.128,0,1.704,0   C6.701,4.989,6.917,4.461,7.061,3.957z M3.917,10.605h0.768l0.336-0.048l0.144-0.312l0.24-0.768l0.912-3.024   c-0.912,0-1.848-0.048-2.736,0.24c-0.648,0.216-1.224,0.6-1.656,1.128c-0.624,0.744-0.96,1.824-0.96,2.784H3.917z M3.965,14.278   l0.816-2.736H0.964c0,1.704,0.888,3.528,2.641,3.984L3.965,14.278z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 18 0 L 18 27 L 0 27 Z"
});
/**
 * 字符data: ≰
 */
define("char/data/symbol/not/nle", [], {
    path: "M4.393,21.602h9.433c0.432,0,0.84,0,0.84,0.48s-0.48,0.48-0.888,0.48H3.984L2.568,25.97   c-0.144,0.336-0.24,0.576-0.552,0.576c-0.288,0-0.48-0.216-0.48-0.48c0-0.24,1.2-3,1.416-3.504H0.888c-0.408,0-0.888,0-0.888-0.48   s0.408-0.48,0.84-0.48h2.497l3.072-7.321l-5.905-2.784C0.24,11.377,0,11.257,0,10.945c0-0.264,0.192-0.408,0.504-0.552L9.841,6   l2.448-5.857C12.385,0.048,12.505,0,12.649,0c0.288,0,0.48,0.216,0.48,0.48c0,0.12-0.024,0.168-0.144,0.456L11.137,5.4l2.592-1.248   c0.12-0.072,0.288-0.144,0.456-0.144c0.264,0,0.48,0.192,0.48,0.48s-0.144,0.336-0.528,0.528L10.585,6.72l-2.952,7.081l6.504,3.048   c0.36,0.192,0.528,0.264,0.528,0.576c0,0.24-0.216,0.48-0.48,0.48c-0.144,0-1.176-0.504-3.288-1.512l-3.648-1.704L4.393,21.602z    M1.608,10.945l5.161,2.448l2.52-6.073L1.608,10.945z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 21 0 L 21 27 L 0 27 Z"
});
/**
 * 字符data: ≰
 */
define("char/data/symbol/not/nlt", [], {
    path: "M6.672,13.513c1.2,0.6,7.441,3.504,7.753,3.672c0.024,0.024,0.24,0.168,0.24,0.408c0,0.336-0.288,0.48-0.48,0.48   c-0.096,0-0.144,0-0.6-0.216l-0.864-0.408l-6.505-3.072c-0.528,1.056-3.648,7.297-3.864,7.537c-0.12,0.168-0.312,0.168-0.336,0.168   c-0.264,0-0.48-0.192-0.48-0.48c0-0.12,0-0.168,0.336-0.792l3.48-6.841L0.48,11.665C0.192,11.521,0,11.449,0,11.137   c0-0.264,0.168-0.384,0.456-0.528l8.689-4.08l3-5.88c0.168-0.312,0.24-0.456,0.504-0.456c0.264,0,0.48,0.192,0.48,0.48   c0,0.096,0,0.144-0.192,0.48l-2.376,4.705l3.24-1.536c0.168-0.072,0.264-0.12,0.384-0.12c0.192,0,0.48,0.144,0.48,0.48   c0,0.192-0.096,0.36-0.48,0.528L9.841,7.249L6.672,13.513z M1.608,11.137l4.177,1.968l2.664-5.185L1.608,11.137z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 21 0 L 21 27 L 0 27 Z"
});
/**
 * 字符data: ≁
 */
define("char/data/symbol/not/nsim", [], {
    path: "M4.512,18.146c-0.24,0.288-0.288,0.36-0.528,0.36c-0.336,0-0.48-0.312-0.48-0.48c0-0.096,0.024-0.216,0.288-0.528   l3.313-3.96c-1.128-0.84-2.064-1.272-3.096-1.272c-1.224,0-1.992,0.624-2.304,0.912c-0.864,0.84-0.912,1.584-0.936,2.16   c-0.024,0.24-0.12,0.72-0.384,0.72C0.288,16.057,0,15.913,0,15.097c0-2.424,1.608-4.632,4.008-4.632c1.56,0,2.808,0.96,4.08,1.944   l3.36-4.008c0.24-0.288,0.288-0.36,0.528-0.36c0.336,0,0.48,0.312,0.48,0.48c0,0.096-0.024,0.216-0.288,0.528l-3.313,3.96   c1.128,0.84,2.064,1.272,3.097,1.272c1.224,0,1.992-0.624,2.304-0.912c0.864-0.84,0.912-1.608,0.936-2.161   c0.024-0.312,0.168-0.72,0.384-0.72c0.168,0,0.384,0.216,0.384,0.96c0,2.424-1.608,4.632-4.008,4.632   c-1.561,0-2.809-0.96-4.081-1.944L4.512,18.146z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 22 0 L 22 27 L 0 27 Z"
});
/**
 * 字符data: ⊈
 */
define("char/data/symbol/not/nsubseteq", [], {
    path: "M6.36,16.873c0.48,0.072,0.912,0.072,1.08,0.072h6.385c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H7.369   c-0.144,0-0.768,0-1.392-0.12l-1.584,3.816h9.433c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H3.984L2.568,25.97   c-0.144,0.336-0.24,0.576-0.552,0.576c-0.288,0-0.48-0.216-0.48-0.48c0-0.24,1.2-3,1.416-3.504H1.32c-0.408,0-0.84,0-0.84-0.48   s0.432-0.48,0.84-0.48h2.016l1.704-4.056C2.496,16.825,0,14.377,0,10.945c0-3.889,3.313-6.937,7.345-6.937h3.312l1.632-3.865   C12.385,0.048,12.505,0,12.649,0c0.288,0,0.48,0.216,0.48,0.48c0,0.12-0.024,0.168-0.144,0.456l-1.272,3.072h2.112   c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48h-2.52L6.36,16.873z M7.417,4.968c-3.72,0-6.457,2.736-6.457,6   c0,2.808,2.016,4.992,4.44,5.688l4.873-11.689H7.417z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 21 0 L 21 27 L 0 27 Z"
});
/**
 * 字符data: ⊉
 */
define("char/data/symbol/not/nsupseteq", [], {
    path: "M11.257,5.088c1.704,0.984,3.408,3.072,3.408,5.88c0,3.888-3.312,6.937-7.344,6.937H5.929l-1.536,3.696h8.953   c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H3.984L2.568,25.97c-0.144,0.336-0.24,0.576-0.552,0.576   c-0.288,0-0.48-0.216-0.48-0.48c0-0.24,1.2-3,1.416-3.504H0.84c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h2.497l1.56-3.696   H0.84c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h4.44L10.033,5.52c-1.2-0.504-2.232-0.552-2.808-0.552H0.84   c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h6.457c1.056,0,2.136,0.192,3.121,0.648l1.872-4.513   C12.385,0.048,12.505,0,12.649,0c0.288,0,0.48,0.216,0.48,0.48c0,0.12-0.024,0.168-0.144,0.456L11.257,5.088z M6.336,16.945   c1.68,0,3.48,0,5.281-1.56c1.32-1.128,2.088-2.665,2.088-4.44c0-1.632-0.72-3.625-2.832-4.969L6.336,16.945z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 21 0 L 21 27 L 0 27 Z"
});
/**
 * 字符data: 约等于
 */
define("char/data/symbol/relational/approx", [], {
    path: "M12.001,10.201c-1.56,0-2.856-0.864-4.152-1.728C6.601,7.633,5.4,6.889,4.008,6.889c-1.248,0-3.216,0.72-3.336,2.736   c0,0.096-0.096,0.552-0.336,0.552C0.192,10.177,0,9.985,0,9.457c0-2.208,1.776-3.912,4.008-3.912c1.56,0,2.856,0.864,4.152,1.728   c1.248,0.84,2.448,1.584,3.84,1.584c1.56,0,3.24-0.984,3.336-2.64c0.024-0.552,0.24-0.648,0.336-0.648   c0.168,0,0.336,0.216,0.336,0.72C16.009,8.497,14.233,10.201,12.001,10.201z M12.001,15.793c-1.56,0-2.856-0.864-4.152-1.728   c-1.248-0.84-2.448-1.584-3.84-1.584c-1.248,0-3.216,0.72-3.336,2.736c0,0.096-0.096,0.552-0.336,0.552   C0.192,15.77,0,15.578,0,15.049c0-2.208,1.776-3.912,4.008-3.912c1.56,0,2.856,0.864,4.152,1.728   c1.248,0.84,2.448,1.584,3.84,1.584c1.56,0,3.24-0.984,3.336-2.64c0.024-0.528,0.24-0.648,0.336-0.648   c0.048,0,0.336,0.048,0.336,0.744C16.009,14.018,14.281,15.793,12.001,15.793z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 23 0 L 23 27 L 0 27 Z"
});
/**
 * 字符data: =
 */
define("char/data/symbol/relational/eq", [], {
    path: "M0.816,9.289c-0.36,0-0.816,0-0.816-0.48s0.456-0.48,0.792-0.48h14.377c0.336,0,0.792,0,0.792,0.48s-0.456,0.48-0.816,0.48   H0.816z M0.792,13.945c-0.336,0-0.792,0-0.792-0.48s0.456-0.48,0.816-0.48h14.329c0.36,0,0.816,0,0.816,0.48   s-0.456,0.48-0.792,0.48H0.792z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 16, 27 ]
});
/**
 * 字符data: equiv
 */
define("char/data/symbol/relational/equiv", [], {
    path: "M0.864,6.961C0.48,6.961,0,6.961,0,6.481s0.432-0.48,0.84-0.48h14.329c0.408,0,0.84,0,0.84,0.48s-0.456,0.48-0.864,0.48   H0.864z M0.84,11.617c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h14.329c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H0.84   z M0.84,16.273c-0.408,0-0.84,0-0.84-0.48s0.48-0.48,0.864-0.48h14.281c0.408,0,0.864,0,0.864,0.48s-0.432,0.48-0.84,0.48H0.84z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 22, 27 ],
    box: "M 0 0 L 22 0 L 22 27 L 0 27 Z"
});
/**
 * 字符data: geq
 */
define("char/data/symbol/relational/geq", [], {
    path: "M0.912,15.602C0.6,15.77,0.552,15.77,0.48,15.77C0.216,15.77,0,15.554,0,15.29c0-0.144,0.024-0.336,0.504-0.552   l12.553-5.928L0.456,2.88C0.192,2.76,0,2.641,0,2.353c0-0.264,0.192-0.48,0.48-0.48c0.048,0,0.144,0,0.48,0.168l13.225,6.24   c0.384,0.168,0.48,0.312,0.48,0.552c0,0.216-0.144,0.384-0.48,0.528L0.912,15.602z M0.84,20.426c-0.408,0-0.84,0-0.84-0.48   s0.504-0.48,0.864-0.48h12.937c0.36,0,0.864,0,0.864,0.48s-0.432,0.48-0.84,0.48H0.84z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 22, 27 ],
    box: "M 0 0 L 22 0 L 22 27 L 0 27 Z"
});
/**
 * 字符data: gg
 */
define("char/data/symbol/relational/gg", [], {
    path: "M0.624,18.722c-0.168,0-0.624,0-0.624-0.48c0-0.264,0.192-0.36,0.48-0.528l12.049-6.577L0.48,4.561   C0.192,4.393,0,4.296,0,4.033c0-0.336,0.264-0.48,0.48-0.48c0.168,0,0.336,0.096,0.432,0.144l12.649,6.913   c0.288,0.168,0.456,0.24,0.456,0.528s-0.168,0.36-0.456,0.528L0.624,18.722z M7.944,18.722c-0.168,0-0.624,0-0.624-0.48   c0-0.264,0.192-0.36,0.48-0.528l12.049-6.577L7.8,4.561C7.513,4.393,7.32,4.296,7.32,4.033c0-0.336,0.264-0.48,0.48-0.48   c0.168,0,0.336,0.096,0.432,0.144l12.649,6.913c0.288,0.168,0.456,0.24,0.456,0.528s-0.168,0.36-0.456,0.528L7.944,18.722z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 28, 27 ],
    box: "M 0 0 L 28 0 L 28 27 L 0 27 Z"
});
/**
 * 字符data: equiv
 */
define("char/data/symbol/relational/gt", [], {
    path: "M0.864,17.642c-0.336,0.144-0.36,0.168-0.408,0.168C0.168,17.81,0,17.57,0,17.378c0-0.144,0-0.312,0.48-0.528l12.361-5.712   L0.504,5.449C0.192,5.305,0,5.208,0,4.92c0-0.192,0.168-0.432,0.456-0.432c0.048,0,0.096,0.024,0.408,0.168l12.985,5.977   c0.432,0.192,0.48,0.36,0.48,0.504c0,0.168-0.024,0.312-0.48,0.528L0.864,17.642z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 15, 27 ]
});
/**
 * 字符data: leq
 */
define("char/data/symbol/relational/leq", [], {
    path: "M1.608,8.833l12.553,5.904c0.408,0.192,0.504,0.336,0.504,0.552c0,0.264-0.216,0.48-0.48,0.48c-0.072,0-0.12,0-0.432-0.168   L0.48,9.361C0.144,9.217,0,9.049,0,8.833c0-0.192,0.072-0.36,0.48-0.552l13.273-6.264c0.096-0.048,0.313-0.144,0.432-0.144   c0.288,0,0.48,0.216,0.48,0.48c0,0.288-0.192,0.408-0.456,0.528L1.608,8.833z M0.84,20.426c-0.408,0-0.84,0-0.84-0.48   s0.504-0.48,0.864-0.48h12.937c0.36,0,0.864,0,0.864,0.48s-0.432,0.48-0.84,0.48H0.84z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 22, 27 ],
    box: "M 0 0 L 22 0 L 22 27 L 0 27 Z"
});
/**
 * 字符data: ll
 */
define("char/data/symbol/relational/ll", [], {
    path: "M1.488,11.137l12.049,6.577c0.288,0.168,0.48,0.264,0.48,0.528c0,0.24-0.168,0.48-0.48,0.48c-0.096,0-0.168,0-0.456-0.168   L0.456,11.665C0.168,11.497,0,11.425,0,11.137s0.168-0.36,0.456-0.528l12.649-6.913c0.096-0.048,0.264-0.144,0.432-0.144   c0.216,0,0.48,0.144,0.48,0.48c0,0.264-0.192,0.36-0.48,0.528L1.488,11.137z M8.809,11.137l12.049,6.577   c0.288,0.168,0.48,0.264,0.48,0.528c0,0.24-0.168,0.48-0.48,0.48c-0.096,0-0.168,0-0.456-0.168L7.776,11.665   c-0.288-0.168-0.456-0.24-0.456-0.528s0.168-0.36,0.456-0.528l12.649-6.913c0.096-0.048,0.264-0.144,0.432-0.144   c0.216,0,0.48,0.144,0.48,0.48c0,0.264-0.192,0.36-0.48,0.528L8.809,11.137z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 15, 27 ]
});
/**
 * 字符data: <
 */
define("char/data/symbol/relational/lt", [], {
    path: "M1.488,11.161l12.361,5.688c0.432,0.192,0.48,0.36,0.48,0.504c0,0.264-0.192,0.456-0.456,0.456   c-0.048,0-0.096-0.024-0.408-0.168L0.48,11.665C0.024,11.449,0,11.305,0,11.137c0-0.144,0.048-0.312,0.48-0.504l12.985-5.977   c0.336-0.144,0.36-0.168,0.408-0.168c0.264,0,0.456,0.192,0.456,0.456c0,0.144-0.048,0.312-0.48,0.504L1.488,11.161z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 21, 27 ],
    box: "M 0 0 L 21 0 L 21 27 L 0 27 Z"
});
/**
 * 字符data: leq
 */
define("char/data/symbol/relational/sim", [], {
    path: "M11.977,13.945c-1.632,0-2.88-1.104-4.104-2.208c-1.176-1.032-2.328-2.064-3.84-2.064c-1.464,0-3.264,1.056-3.36,3.696   c0,0.072-0.072,0.552-0.336,0.552c-0.024,0-0.336,0-0.336-0.768c0-2.184,1.416-4.824,4.032-4.824c1.632,0,2.88,1.104,4.104,2.208   c1.176,1.032,2.328,2.064,3.84,2.064c1.68,0,3.264-1.32,3.36-3.624c0.024-0.456,0.216-0.624,0.336-0.624   c0.192,0,0.336,0.24,0.336,0.768C16.009,11.305,14.593,13.945,11.977,13.945z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 22, 27 ],
    box: "M 0 0 L 22 0 L 22 27 L 0 27 Z"
});
/**
 * 字符data: simeq
 */
define("char/data/symbol/relational/simeq", [], {
    path: "M12.001,11.137c-1.608,0-2.88-0.984-4.152-1.992c-1.248-0.96-2.4-1.8-3.84-1.8c-1.296,0-3.216,0.864-3.336,3.216   c0,0.072-0.072,0.552-0.336,0.552C0.312,11.113,0,11.089,0,10.369c0-2.256,1.656-4.368,4.008-4.368c1.608,0,2.88,0.984,4.152,1.992   c1.248,0.96,2.4,1.8,3.84,1.8c1.56,0,3.24-1.128,3.336-3.12c0.024-0.552,0.24-0.648,0.336-0.648c0.168,0,0.336,0.216,0.336,0.744   C16.009,9.025,14.353,11.137,12.001,11.137z M15.145,15.313c0.408,0,0.864,0,0.864,0.48s-0.432,0.48-0.84,0.48H0.84   c-0.408,0-0.84,0-0.84-0.48s0.48-0.48,0.864-0.48H15.145z",
    offset: {
        x: 3,
        y: 2
    },
    size: [ 22, 27 ],
    box: "M 0 0 L 22 0 L 22 27 L 0 27 Z"
});
/**
 * 字符data: cap
 */
define("char/data/symbol/set/cap", [], {
    path: "M13.345,16.802c0,0.432,0,0.864-0.48,0.864s-0.48-0.432-0.48-0.864V8.137c0-0.648,0-2.184-1.848-3.36   C9.265,3.96,7.752,3.745,6.672,3.745c-1.8,0-5.712,0.768-5.712,4.368v8.689c0,0.432,0,0.864-0.48,0.864S0,17.234,0,16.802V7.993   c0-3.528,3.552-5.208,6.672-5.208c3,0,6.672,1.584,6.672,5.232V16.802z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 20 0 L 20 27 L 0 27 Z"
});
/**
 * 字符data: cap
 */
define("char/data/symbol/set/cup", [], {
    path: "M13.345,12.458c0,3.528-3.552,5.208-6.672,5.208c-3,0-6.672-1.584-6.672-5.232V3.648c0-0.432,0-0.864,0.48-0.864   s0.48,0.432,0.48,0.864v8.665c0,0.648,0,2.184,1.848,3.36c1.272,0.816,2.784,1.032,3.864,1.032c1.8,0,5.712-0.768,5.712-4.368   V3.648c0-0.432,0-0.864,0.48-0.864s0.48,0.432,0.48,0.864V12.458z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 20 0 L 20 27 L 0 27 Z"
});
/**
 * 字符data: in
 */
define("char/data/symbol/set/in", [], {
    path: "M0.984,11.617c0.288,3.216,3.048,5.521,6.433,5.521h3.745c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H7.369   c-4.104,0-7.369-3.12-7.369-6.96s3.264-6.96,7.369-6.96h3.792c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H7.417   c-3.384,0-6.145,2.304-6.433,5.521h10.177c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H0.984z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 19 0 L 19 27 L 0 27 Z"
});
/**
 * 字符data: ni
 */
define("char/data/symbol/set/ni", [], {
    path: "M0.84,5.137c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h3.792c4.104,0,7.369,3.12,7.369,6.96s-3.264,6.96-7.369,6.96   H0.84c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h3.745c3.384,0,6.145-2.304,6.433-5.521H0.84c-0.408,0-0.84,0-0.84-0.48   s0.432-0.48,0.84-0.48h10.177c-0.288-3.216-3.048-5.521-6.433-5.521H0.84z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 19 0 L 19 27 L 0 27 Z"
});
/**
 * 字符data: sqcap
 */
define("char/data/symbol/set/sqcap", [], {
    path: "M13.057,16.273c0,0.432,0,0.864-0.48,0.864c-0.48,0-0.48-0.504-0.48-0.864V3.745H0.96v12.529c0,0.432,0,0.864-0.48,0.864   S0,16.634,0,16.273V3.648c0-0.792,0.072-0.864,0.84-0.864h11.377c0.768,0,0.84,0.072,0.84,0.864V16.273z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 20 0 L 20 27 L 0 27 Z"
});
/**
 * 字符data: sqcup
 */
define("char/data/symbol/set/sqcup", [], {
    path: "M13.057,16.273c0,0.792-0.072,0.864-0.864,0.864H0.864C0.096,17.138,0,17.042,0,16.273V3.648c0-0.432,0-0.864,0.48-0.864   s0.48,0.432,0.48,0.864v12.529h11.137V3.648c0-0.432,0-0.864,0.48-0.864c0.48,0,0.48,0.432,0.48,0.864V16.273z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 20 0 L 20 27 L 0 27 Z"
});
/**
 * 字符data: ⊏
 */
define("char/data/symbol/set/sqsubset", [], {
    path: "M0.96,5.161v11.977h12.841c0.408,0,0.864,0,0.864,0.48s-0.432,0.48-0.84,0.48H0.84c-0.768,0-0.84-0.096-0.84-0.84V5.064   c0-0.792,0.096-0.864,0.864-0.864h12.961c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H0.96z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 21 0 L 21 27 L 0 27 Z"
});
/**
 * 字符data: ⊑
 */
define("char/data/symbol/set/sqsubseteq", [], {
    path: "M0.84,20.426c-0.408,0-0.84,0-0.84-0.48s0.48-0.48,0.864-0.48h13.417c0.36,0,0.864,0,0.864,0.48s-0.432,0.48-0.84,0.48   H0.84z M1.224,2.833V14.81h13.057c0.408,0,0.864,0,0.864,0.48s-0.432,0.48-0.84,0.48H1.104c-0.768,0-0.84-0.072-0.84-0.864V2.736   c0-0.768,0.096-0.864,0.864-0.864h13.177c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H1.224z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 22 0 L 22 27 L 0 27 Z"
});
/**
 * 字符data: ⊏
 */
define("char/data/symbol/set/sqsupset", [], {
    path: "M15.625,17.603c0,0.768-0.096,0.84-0.84,0.84H0.84c-0.408,0-0.84,0-0.84-0.48s0.456-0.48,0.864-0.48h13.801V5.506H0.84   c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h13.945c0.768,0,0.84,0.096,0.84,0.84V17.603z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 21 0 L 21 27 L 0 27 Z"
});
/**
 * 字符data: ⊒
 */
define("char/data/symbol/set/sqsupseteq", [], {
    path: "M14.881,14.905c0,0.792-0.072,0.864-0.84,0.864H0.84c-0.408,0-0.84,0-0.84-0.48s0.48-0.48,0.864-0.48h13.057V2.833H0.84   c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h13.201c0.768,0,0.84,0.072,0.84,0.864V14.905z M14.281,19.466   c0.408,0,0.864,0,0.864,0.48s-0.432,0.48-0.84,0.48H0.84c-0.408,0-0.84,0-0.84-0.48s0.504-0.48,0.864-0.48H14.281z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 22 0 L 22 27 L 0 27 Z"
});
/**
 * 字符data: ⊂
 */
define("char/data/symbol/set/subset", [], {
    path: "M7.417,5.137c-3.744,0-6.457,2.784-6.457,6s2.712,6,6.457,6h6.409c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H7.369   c-4.104,0-7.369-3.12-7.369-6.96s3.264-6.96,7.369-6.96h6.457c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H7.417z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 21 0 L 21 27 L 0 27 Z"
});
/**
 * 字符data: ⊆
 */
define("char/data/symbol/set/subseteq", [], {
    path: "M7.417,2.833c-3.72,0-6.457,2.736-6.457,6c0,3.168,2.665,5.977,6.457,5.977h6.409c0.408,0,0.84,0,0.84,0.48   s-0.432,0.48-0.84,0.48H7.369C3.313,15.77,0,12.673,0,8.809c0-3.792,3.24-6.937,7.369-6.937h6.457c0.408,0,0.84,0,0.84,0.48   s-0.432,0.48-0.84,0.48H7.417z M13.825,19.466c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H1.32c-0.408,0-0.84,0-0.84-0.48   s0.432-0.48,0.84-0.48H13.825z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 21 0 L 21 27 L 0 27 Z"
});
/**
 * 字符data: ⊃
 */
define("char/data/symbol/set/supset", [], {
    path: "M0.84,5.137c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h6.457c4.104,0,7.369,3.12,7.369,6.96s-3.264,6.96-7.369,6.96   H0.84c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h6.409c3.745,0,6.457-2.784,6.457-6s-2.712-6-6.457-6H0.84z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 21 0 L 21 27 L 0 27 Z"
});
/**
 * 字符data: ⊇
 */
define("char/data/symbol/set/supseteq", [], {
    path: "M0.84,2.833c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h6.457c4.057,0,7.369,3.096,7.369,6.96   c0,3.792-3.24,6.937-7.369,6.937H0.84c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h6.409c3.72,0,6.457-2.736,6.457-6   c0-3.168-2.664-5.977-6.457-5.977H0.84z M0.84,20.426c-0.408,0-0.84,0-0.84-0.48s0.432-0.48,0.84-0.48h12.505   c0.408,0,0.84,0,0.84,0.48s-0.432,0.48-0.84,0.48H0.84z",
    offset: {
        x: 3,
        y: 2
    },
    box: "M 0 0 L 21 0 L 21 27 L 0 27 Z"
});
/**
 * 罗马文本
 */
define("char/roman", [ "kity", "char/char", "char/data", "signgroup", "def/gtype" ], function(require, exports, module) {
    var kity = require("kity"), Char = require("char/char");
    return kity.createClass("RomanText", {
        base: require("signgroup"),
        constructor: function(content) {
            this.callBase();
            this.chars = null;
            this.contentText = content || "";
            this.contentShape = new kity.Group();
            initContentShape.call(this);
            this.addShape(this.contentShape);
        },
        getBaseWidth: function() {
            return this.getWidth();
        },
        getBaseHeight: function() {
            var chars = this.contentShape.getItems(), currentChar = null, index = 0, height = 0;
            while (currentChar = chars[index]) {
                height = Math.max(height, currentChar.getBaseHeight());
                index++;
            }
            return height;
        },
        addedCall: function() {
            var offset = 0;
            kity.Utils.each(this.chars, function(charData, index) {
                var charShape = this.contentShape.getItem(index);
                charShape.translate(offset, 0);
                offset += charShape.getBoxWidth() + 1;
            }, this);
        }
    });
    function initContentShape() {
        var match = null, content = this.contentText, chars = [];
        while (match = /^([^\\]*)(\\[^\\]+\\)([\s\S]*)/.exec(content)) {
            content = match[3];
            chars = chars.concat(match[1].split(""));
            chars.push(match[2]);
        }
        chars = chars.concat(content.split(""));
        // 字符数组
        this.chars = chars;
        kity.Utils.each(chars, function(charData, index) {
            var charShape = new Char(charData, "roman");
            this.contentShape.addShape(charShape);
        }, this);
    }
});
/**
 * 文本
 */
define("char/text", [ "kity", "char/char", "char/data", "signgroup", "def/gtype" ], function(require, exports, module) {
    var kity = require("kity"), Char = require("char/char");
    return kity.createClass("Text", {
        base: require("signgroup"),
        constructor: function(content) {
            this.callBase();
            this.chars = null;
            this.contentText = content || "";
            this.contentShape = new kity.Group();
            initContentShape.call(this);
            this.addShape(this.contentShape);
        },
        getBaseHeight: function() {
            var chars = this.contentShape.getItems(), currentChar = null, index = 0, height = 0;
            while (currentChar = chars[index]) {
                height = Math.max(height, currentChar.getBaseHeight());
                index++;
            }
            return height;
        },
        addedCall: function() {
            var offset = 0;
            kity.Utils.each(this.chars, function(charData, index) {
                var charShape = this.contentShape.getItem(index);
                charShape.translate(offset, 0);
                offset += charShape.getBoxWidth();
            }, this);
        }
    });
    function initContentShape() {
        var match = null, content = this.contentText, chars = [];
        while (match = /^([^\\]*)(\\[^\\]+\\)([\s\S]*)/.exec(content)) {
            content = match[3];
            chars = chars.concat(match[1].split(""));
            chars.push(match[2]);
        }
        chars = chars.concat(content.split(""));
        // 字符数组
        this.chars = chars;
        kity.Utils.each(chars, function(charData, index) {
            var charShape = new Char(charData);
            this.contentShape.addShape(charShape);
        }, this);
    }
});
/**
 * 定义公式中各种对象的类型
 */
define("def/gtype", [], function() {
    return {
        UNKNOWN: -1,
        EXP: 0,
        COMPOUND_EXP: 1,
        OP: 2
    };
});
/**
 * 分数表达式
 */
define("expression/compound-exp/binary-exp/fraction", [ "kity", "operator/binary-opr/fraction", "operator/binary-opr/up-down", "expression/compound-exp/binary-exp/up-down", "expression/compound-exp/binary" ], function(require, exports, modules) {
    var kity = require("kity"), FractionOperator = require("operator/binary-opr/fraction");
    return kity.createClass("FractionExpression", {
        base: require("expression/compound-exp/binary-exp/up-down"),
        constructor: function(upOperand, downOperand) {
            this.callBase(upOperand, downOperand);
            this.setFlag("Fraction");
            this.setOperator(new FractionOperator());
        },
        addedCall: function() {
            this.callBase();
            var renderBox = this.expContent.getRenderBox();
            this.setBoxSize(renderBox.width + 6, renderBox.height + 6);
            this.expContent.translate(3, 3);
        }
    });
});
/**
 * 左右结合二元表达式
 * @abstract
 */
define("expression/compound-exp/binary-exp/left-right", [ "kity", "expression/compound-exp/binary", "expression/compound" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("LeftRightExpression", {
        base: require("expression/compound-exp/binary"),
        getLeftOperand: function() {
            return this.getFirstOperand();
        },
        setLeftOperand: function(operand) {
            return this.setFirstOperand(operand);
        },
        getRightOperand: function() {
            return this.getLastOperand();
        },
        setRightOperand: function(operand) {
            return this.setLastOperand(operand);
        }
    });
});
/**
 * “平行”表达式
 */
define("expression/compound-exp/binary-exp/parallel", [ "kity", "operator/binary-opr/parallel", "operator/binary-opr/left-right", "expression/compound-exp/binary-exp/left-right", "expression/compound-exp/binary" ], function(require, exports, modules) {
    var kity = require("kity"), ParallelOperator = require("operator/binary-opr/parallel");
    return kity.createClass("ParallelExpression", {
        base: require("expression/compound-exp/binary-exp/left-right"),
        constructor: function(leftOperand, rightOperand) {
            this.callBase(leftOperand, rightOperand);
            this.setFlag("Parallel");
            this.setOperator(new ParallelOperator());
        }
    });
});
/**
 * 方根表达式
 */
define("expression/compound-exp/binary-exp/radical", [ "kity", "operator/binary-opr/radical", "operator/binary", "expression/compound-exp/binary", "expression/compound" ], function(require, exports, modules) {
    var kity = require("kity"), RadicalOperator = require("operator/binary-opr/radical");
    return kity.createClass("RadicalExpression", {
        base: require("expression/compound-exp/binary"),
        /**
         * 构造开方表达式
         * @param radicand 被开方数
         * @param exponent 指数
         */
        constructor: function(radicand, exponent) {
            this.callBase(radicand, exponent);
            this.setFlag("Radicand");
            this.setOperator(new RadicalOperator());
        },
        setRadicand: function(operand) {
            return this.setFirstOperand(operand);
        },
        getRadicand: function() {
            return this.getFirstOperand();
        },
        setExponent: function(operand) {
            return this.setLastOperand(operand);
        },
        getExponent: function() {
            return this.getLastOperand();
        }
    });
});
/**
 * 下标表达式
 */
define("expression/compound-exp/binary-exp/subscript", [ "kity", "expression/compound-exp/script", "operator/script", "expression/compound" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("SubscriptExpression", {
        base: require("expression/compound-exp/script"),
        constructor: function(operand, subscript) {
            this.callBase(operand, null, subscript);
            this.setFlag("Subscript");
        }
    });
});
/**
 * 减法表达式
 */
define("expression/compound-exp/binary-exp/subtraction", [ "kity", "operator/binary-opr/subtraction", "char/data", "operator/binary-opr/left-right", "expression/compound-exp/binary-exp/left-right", "expression/compound-exp/binary" ], function(require, exports, modules) {
    var kity = require("kity"), SubtractionOperator = require("operator/binary-opr/subtraction");
    return kity.createClass("SubtractionExpression", {
        base: require("expression/compound-exp/binary-exp/left-right"),
        constructor: function(leftOperand, rightOperand) {
            this.callBase(leftOperand, rightOperand);
            this.setFlag("Subtraction");
            this.setOperator(new SubtractionOperator());
        }
    });
});
/**
 * 上标表达式
 */
define("expression/compound-exp/binary-exp/superscript", [ "kity", "expression/compound-exp/script", "operator/script", "expression/compound" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("SuperscriptExpression", {
        base: require("expression/compound-exp/script"),
        constructor: function(operand, superscript) {
            this.callBase(operand, superscript, null);
            this.setFlag("Superscript");
        }
    });
});
/**
 * 上下结合二元表达式
 * @abstract
 */
define("expression/compound-exp/binary-exp/up-down", [ "kity", "expression/compound-exp/binary", "expression/compound" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("UpDownExpression", {
        base: require("expression/compound-exp/binary"),
        getUpOperand: function() {
            return this.getFirstOperand();
        },
        setUpOperand: function(operand) {
            return this.setFirstOperand(operand);
        },
        getDownOperand: function() {
            return this.getLastOperand();
        },
        setDownOperand: function(operand) {
            return this.setLastOperand(operand);
        }
    });
});
/**
 * 二元操作表达式
 * @abstract
 */
define("expression/compound-exp/binary", [ "kity", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("BinaryExpression", {
        base: require("expression/compound"),
        constructor: function(firstOperand, lastOperand) {
            this.callBase();
            this.setFirstOperand(firstOperand);
            this.setLastOperand(lastOperand);
        },
        setFirstOperand: function(operand) {
            return this.setOperand(operand, 0);
        },
        getFirstOperand: function() {
            return this.getOperand(0);
        },
        setLastOperand: function(operand) {
            return this.setOperand(operand, 1);
        },
        getLastOperand: function() {
            return this.getOperand(1);
        }
    });
});
/**
 * 自动增长括号表达式
 */
define("expression/compound-exp/brackets", [ "kity", "operator/brackets", "char/data", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), BracketsOperator = require("operator/brackets");
    return kity.createClass("BracketsExpression", {
        base: require("expression/compound"),
        /**
         * 构造函数调用方式：
         *  new Constructor( 左括号, 右括号, 表达式 )
         *  或者
         *  new Constructor( 括号, 表达式 ), 该构造函数转换成上面的构造函数，是： new Constructor( 括号, 括号, 表达式 )
         * @param left 左括号
         * @param right 右括号
         * @param exp 表达式
         */
        constructor: function(left, right, exp) {
            this.callBase();
            this.setFlag("Brackets");
            // 参数整理
            if (arguments.length === 2) {
                exp = right;
                right = left;
            }
            this.leftSymbol = left;
            this.rightSymbol = right;
            this.setOperator(new BracketsOperator());
            this.setOperand(exp, 0);
        },
        getLeftSymbol: function() {
            return this.leftSymbol;
        },
        getRightSymbol: function() {
            return this.rightSymbol;
        }
    });
});
/**
 * 组合表达式
 * 可以组合多个表达式
 */
define("expression/compound-exp/combination", [ "kity", "operator/combination", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), CombinationOperator = require("operator/combination");
    return kity.createClass("CombinationExpression", {
        base: require("expression/compound"),
        constructor: function() {
            this.callBase();
            this.setFlag("Combination");
            this.setOperator(new CombinationOperator());
            kity.Utils.each(arguments, function(operand, index) {
                this.setOperand(operand, index);
            }, this);
        }
    });
});
/**
 * 函数表达式
 */
define("expression/compound-exp/func", [ "kity", "operator/func", "char/roman", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), FunctionOperator = require("operator/func");
    return kity.createClass("FunctionExpression", {
        base: require("expression/compound"),
        /**
         * function表达式构造函数
         * @param funcName function名称
         * @param funcExp function表达式
         * @param sup 上标
         * @param sub 下标
         */
        constructor: function(funcName, funcExp, sup, sub) {
            this.callBase();
            this.setFlag("Func");
            this.setOperator(new FunctionOperator(funcName));
            this.setFuncExp(funcExp);
            this.setSuperscript(sup);
            this.setSubscript(sub);
        },
        setFuncExp: function(funcExp) {
            return this.setOperand(funcExp, 0);
        },
        getFuncExp: function() {
            return this.getOperand(0);
        },
        setSuperscript: function(sub) {
            return this.setOperand(sub, 1);
        },
        getSuperscript: function() {
            return this.getOperand(1);
        },
        setSubscript: function(sub) {
            return this.setOperand(sub, 2);
        },
        getSubscript: function() {
            return this.getOperand(2);
        }
    });
});
/**
 * 积分表达式
 */
define("expression/compound-exp/integration", [ "kity", "operator/integration", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), IntegrationOperator = require("operator/integration"), IntegrationExpression = kity.createClass("IntegrationExpression", {
        base: require("expression/compound"),
        /**
             * 构造积分表达式
             * @param integrand 被积函数
             * @param supOperand 上限
             * @param subOperand 下限
             */
        constructor: function(integrand, superscript, subscript) {
            this.callBase();
            this.setFlag("Integration");
            this.setOperator(new IntegrationOperator());
            this.setIntegrand(integrand);
            this.setSuperscript(superscript);
            this.setSubscript(subscript);
        },
        setIntegrand: function(integrand) {
            return this.setOperand(integrand, 0);
        },
        setType: function(type) {
            this.getOperator().setType(type);
        },
        resetType: function() {
            this.getOperator().resetType();
        },
        getIntegrand: function() {
            return this.getOperand(0);
        },
        setSuperscript: function(superscript) {
            return this.setOperand(superscript, 1);
        },
        getSuperscript: function() {
            return this.getOperand(1);
        },
        setSubscript: function(subscript) {
            return this.setOperand(subscript, 2);
        },
        getSubscript: function() {
            return this.getOperand(2);
        }
    });
    kity.Utils.extend(IntegrationExpression, IntegrationOperator.types);
    return IntegrationExpression;
});
/**
 * 上标表达式
 */
define("expression/compound-exp/script", [ "kity", "operator/script", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), ScriptOperator = require("operator/script");
    return kity.createClass("ScriptExpression", {
        base: require("expression/compound"),
        constructor: function(operand, superscript, subscript) {
            this.callBase();
            this.setFlag("Script");
            this.setOperator(new ScriptOperator());
            this.setOpd(operand);
            this.setSuperscript(superscript);
            this.setSubscript(subscript);
        },
        setOpd: function(operand) {
            this.setOperand(operand, 0);
        },
        setSuperscript: function(sup) {
            this.setOperand(sup, 1);
        },
        setSubscript: function(sub) {
            this.setOperand(sub, 2);
        },
        getOpd: function() {
            this.getOperand(0);
        },
        getSuperscript: function() {
            this.getOperand(1);
        },
        getSubscript: function() {
            this.getOperand(2);
        }
    });
});
/**
 * 求和表达式
 * @abstract
 */
define("expression/compound-exp/summation", [ "kity", "operator/summation", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), SummationOperator = require("operator/summation");
    return kity.createClass("SummationExpression", {
        base: require("expression/compound"),
        /**
         * 构造求和表达式
         * @param exp 求和主题表达式
         * @param upOperand 上标
         * @param downOperand 下标
         */
        constructor: function(exp, superscript, subscript) {
            this.callBase();
            this.setFlag("Summation");
            this.setExp(exp);
            this.setSuperscript(superscript);
            this.setSubscript(subscript);
            this.setOperator(new SummationOperator());
        },
        setExp: function(exp) {
            this.setOperand(exp, 0);
        },
        setSuperscript: function(sup) {
            this.setOperand(sup, 1);
        },
        setSubscript: function(sub) {
            this.setOperand(sub, 2);
        }
    });
});
/**
 * 复合表达式
 * @abstract
 */
define("expression/compound", [ "kity", "def/gtype", "expression/expression", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity"), GTYPE = require("def/gtype"), Expression = require("expression/expression");
    return kity.createClass("CompoundExpression", {
        base: require("expression/expression"),
        constructor: function() {
            this.callBase();
            this.type = GTYPE.COMPOUND_EXP;
            this.operands = [];
            this.operator = null;
            this.operatorBox = new kity.Group();
            this.operatorBox.setAttr("data-type", "kf-editor-exp-op-box");
            this.operandBox = new kity.Group();
            this.operandBox.setAttr("data-type", "kf-editor-exp-operand-box");
            this.setChildren(0, this.operatorBox);
            this.setChildren(1, this.operandBox);
        },
        // 操作符存储在第1位置
        setOperator: function(operator) {
            if (operator === undefined) {
                return this;
            }
            if (this.operator) {
                this.operator.remove();
            }
            this.operatorBox.addShape(operator);
            this.operator = operator;
            this.operator.setParentExpression(this);
            // 表达式关联到操作符
            operator.expression = this;
            return this;
        },
        getOperator: function() {
            return this.operator;
        },
        // 操作数存储位置是从1开始
        setOperand: function(operand, index, isWrap) {
            // 不包装操作数
            if (isWrap === false) {
                this.operands[index] = operand;
                return this;
            }
            operand = Expression.wrap(operand);
            if (this.operands[index]) {
                this.operands[index].remove();
            }
            this.operands[index] = operand;
            this.operandBox.addShape(operand);
            return this;
        },
        getOperand: function(index) {
            return this.operands[index];
        },
        getOperands: function() {
            return this.operands;
        },
        addedCall: function() {
            this.operator.applyOperand.apply(this.operator, this.operands);
            this.updateBoxSize();
            return this;
        }
    });
});
/**
 * 空表达式
 * 该表达式主要用途是用于站位
 */
define("expression/empty", [ "kity", "expression/expression", "def/gtype", "signgroup" ], function(require, exports, module) {
    var kity = require("kity"), Expression = require("expression/expression"), EmptyExpression = kity.createClass("EmptyExpression", {
        base: Expression,
        constructor: function() {
            this.callBase();
            this.setFlag("Empty");
        }
    });
    // 注册打包函数
    Expression.registerWrap("empty", function(operand) {
        if (operand === null || operand === undefined) {
            return new EmptyExpression();
        }
    });
    return EmptyExpression;
});
/**
 * 基础表达式， 该类是表达式和操作数的高层抽象
 * @abstract
 */
define("expression/expression", [ "kity", "def/gtype", "signgroup" ], function(require, exports, module) {
    var kity = require("kity"), GTYPE = require("def/gtype"), // 打包函数列表
    WRAP_FN = [], // 注册的打包函数的名称与其在注册器列表中的索引之间的对应关系
    WRAP_FN_INDEX = {}, Expression = kity.createClass("Expression", {
        base: require("signgroup"),
        constructor: function() {
            this.callBase();
            this.type = GTYPE.EXP;
            this.children = [];
            this.box.fill("transparent").setAttr("data-type", "kf-editor-exp-box");
            this.box.setAttr("data-type", "kf-editor-exp-bg-box");
            this.expContent = new kity.Group();
            this.expContent.setAttr("data-type", "kf-editor-exp-content-box");
            this.addShape(this.expContent);
        },
        getChildren: function() {
            return this.children;
        },
        getChild: function(index) {
            return this.children[index] || null;
        },
        setFlag: function(flag) {
            this.setAttr("data-flag", flag || "Expression");
        },
        setChildren: function(index, exp) {
            // 首先清理掉之前的表达式
            if (this.children[index]) {
                this.children[index].remove();
            }
            this.children[index] = exp;
            this.expContent.addShape(exp);
        },
        getBaseWidth: function() {
            return this.getWidth();
        },
        getBaseHeight: function() {
            return this.getHeight();
        },
        updateBoxSize: function() {
            var renderBox = this.expContent.getRenderBox();
            this.setBoxSize(renderBox.width, renderBox.height);
        },
        getBox: function() {
            return this.box;
        }
    });
    // 表达式自动打包
    kity.Utils.extend(Expression, {
        registerWrap: function(name, fn) {
            WRAP_FN_INDEX[name] = WRAP_FN.length;
            WRAP_FN.push(fn);
        },
        revokeWrap: function(name) {
            var fn = null;
            if (name in WRAP_FN_INDEX) {
                fn = WRAP_FN[WRAP_FN_INDEX[name]];
                WRAP_FN[WRAP_FN_INDEX[name]] = null;
                delete WRAP_FN_INDEX[name];
            }
            return fn;
        },
        // 打包函数
        wrap: function(operand) {
            var result = undefined;
            kity.Utils.each(WRAP_FN, function(fn) {
                if (!fn) {
                    return;
                }
                result = fn(operand);
                if (result) {
                    return false;
                }
            });
            return result;
        }
    });
    return Expression;
});
/**
 * 罗马文本表达式
 */
define("expression/roman", [ "char/roman", "kity", "char/char", "signgroup", "expression/expression", "def/gtype" ], function(require, exports, module) {
    var RomanText = require("char/roman"), kity = require("kity");
    return kity.createClass("RomanTextExpression", {
        base: require("expression/expression"),
        constructor: function(content) {
            this.callBase();
            this.setFlag("RomanText");
            this.content = content + "";
            this.setChildren(0, new RomanText(this.content));
        }
    });
});
/**
 * Text表达式
 */
define("expression/text", [ "char/text", "kity", "char/char", "signgroup", "expression/expression", "def/gtype" ], function(require, exports, module) {
    var Text = require("char/text"), kity = require("kity"), Expression = require("expression/expression"), TextExpression = kity.createClass("TextExpression", {
        base: require("expression/expression"),
        constructor: function(content) {
            this.callBase();
            this.setFlag("Text");
            this.content = content + "";
            this.setChildren(0, new Text(this.content));
        },
        // 对于文本的基础高度， 需要重定义
        getBaseHeight: function() {
            return this.getChild(0).getBaseHeight();
        },
        addedCall: function() {
            this.updateBoxSize();
            return this;
        }
    });
    // 注册文本表达式的打包函数
    Expression.registerWrap("text", function(operand) {
        var operandType = typeof operand;
        if (operandType === "number" || operandType === "string") {
            operand = new TextExpression(operand);
        }
        return operand;
    });
    return TextExpression;
});
/**
 * 公式对象，表达式容器
 */
define("formula", [ "kity", "def/gtype", "fpaper" ], function(require, exports, module) {
    var kity = require("kity"), GTYPE = require("def/gtype"), DEFAULT_OPTIONS = {
        fontsize: 20,
        autoresize: true,
        padding: [ 0 ]
    }, EXPRESSION_INTERVAL = 10, ExpressionWrap = kity.createClass("ExpressionWrap", {
        constructor: function(exp, config) {
            this.wrap = new kity.Group();
            this.bg = new kity.Rect(0, 0, 0, 0).fill("transparent");
            this.exp = exp;
            this.config = config;
            this.wrap.setAttr("data-type", "kf-exp-wrap");
            this.bg.setAttr("data-type", "kf-exp-wrap-bg");
            this.wrap.addShape(this.bg);
            this.wrap.addShape(this.exp);
        },
        getWrapShape: function() {
            return this.wrap;
        },
        getExpression: function() {
            return this.exp;
        },
        getBackground: function() {
            return this.bg;
        },
        resize: function() {
            var padding = this.config.padding, expBox = this.exp.getRenderBox();
            if (padding.length === 1) {
                padding[1] = padding[0];
            }
            this.bg.setSize(padding[1] * 2 + expBox.width, padding[0] * 2 + expBox.height);
            this.exp.translate(padding[1], padding[0]);
        }
    });
    return kity.createClass("Formula", {
        base: require("fpaper"),
        constructor: function(container, config) {
            this.callBase(container);
            this.expressions = [];
            this.config = kity.Utils.extend({}, DEFAULT_OPTIONS, config);
            this.zoom = (this.config.fontsize || 20) / 20;
            if ("width" in this.config) {
                this.setWidth(this.config.width);
            }
            if ("height" in this.config) {
                this.setHeight(this.config.height);
            }
        },
        insertExpression: function(expression, index) {
            var expWrap = this.wrap(expression);
            // clear zoom
            this.container.resetTransform();
            this.expressions.splice(index, 0, expWrap.getWrapShape());
            this.addShape(expWrap.getWrapShape());
            notifyExpression.call(this, expWrap.getExpression());
            expWrap.resize();
            correctOffset.call(this);
            this.resetZoom();
            this.config.autoresize && this.resize();
        },
        appendExpression: function(expression) {
            this.insertExpression(expression, this.expressions.length);
        },
        resize: function() {
            var renderBox = this.container.getRenderBox();
            this.node.setAttribute("width", renderBox.width);
            this.node.setAttribute("height", renderBox.height);
        },
        resetZoom: function() {
            var zoomLevel = this.zoom / this.getBaseZoom();
            if (zoomLevel !== 0) {
                this.container.setAnchor(0, 0);
                this.container.scale(zoomLevel);
            }
        },
        wrap: function(exp) {
            return new ExpressionWrap(exp, this.config);
        },
        clear: function() {
            this.callBase();
            this.expressions = [];
        },
        clearExpressions: function() {
            kity.Utils.each(this.expressions, function(exp, i) {
                exp.remove();
            });
            this.expressions = [];
        }
    });
    // 调整表达式之间的偏移
    function correctOffset() {
        var exprOffset = 0;
        kity.Utils.each(this.expressions, function(expr) {
            var box = null;
            if (!expr) {
                return;
            }
            expr.setTransform(new kity.Matrix(1, 0, 0, 1, 0, 0));
            box = expr.getRenderBox();
            expr.translate(0 - box.x, exprOffset);
            exprOffset += box.height + EXPRESSION_INTERVAL;
        });
        return this;
    }
    // 通知表达式已接入到paper
    function notifyExpression(expression) {
        var len = 0, childGroup = null;
        if (!expression) {
            return;
        }
        if (expression.getType() === GTYPE.EXP) {
            for (var i = 0, len = expression.getChildren().length; i < len; i++) {
                notifyExpression(expression.getChild(i));
            }
        } else if (expression.getType() === GTYPE.COMPOUND_EXP) {
            // 操作数处理
            for (var i = 0, len = expression.getOperands().length; i < len; i++) {
                notifyExpression(expression.getOperand(i));
            }
            // 处理操作符
            notifyExpression(expression.getOperator());
        }
        expression.addedCall && expression.addedCall();
    }
});
/**
 * 公式专用paper
 */
define("fpaper", [ "kity" ], function(require, exports, module) {
    var kity = require("kity");
    return kity.createClass("FPaper", {
        base: kity.Paper,
        constructor: function(container) {
            this.callBase(container);
            this.container = new kity.Group();
            this.container.setAttr("data-type", "kf-container");
            this.background = new kity.Group();
            this.background.setAttr("data-type", "kf-bg");
            this.baseZoom = 1;
            this.zoom = 1;
            this.base("addShape", this.background);
            this.base("addShape", this.container);
        },
        getZoom: function() {
            return this.zoom;
        },
        getBaseZoom: function() {
            return this.baseZoom;
        },
        addShape: function(shape, pos) {
            return this.container.addShape(shape, pos);
        },
        getBackground: function() {
            return this.background;
        },
        removeShape: function(pos) {
            return this.container.removeShape(pos);
        },
        clear: function() {
            return this.container.clear();
        }
    });
});
/**
 * kity库封包
 */
define("kity", [], function(require, exports, module) {
    if (!window.kity) {
        throw new Error("Missing Kity Graphic Lib");
    }
    return window.kity;
});
/**
 * 分数操作符
 */
define("operator/binary-opr/fraction", [ "kity", "operator/binary-opr/up-down", "operator/binary" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("FractionOperator", {
        base: require("operator/binary-opr/up-down"),
        constructor: function() {
            this.callBase("Fraction");
        },
        applyOperand: function(upOperand, downOperand) {
            var upWidth = upOperand.getWidth(), downWidth = downOperand.getWidth(), upHeight = upOperand.getHeight(), downHeight = downOperand.getHeight(), maxWidth = Math.max(upWidth, downWidth), maxHeight = Math.max(upHeight, downHeight), operatorShape = generateOperator(maxWidth);
            this.addOperatorShape(operatorShape);
            upOperand.translate((maxWidth - upWidth) / 2, maxHeight - upHeight);
            operatorShape.translate(0, maxHeight);
            downOperand.translate((maxWidth - downWidth) / 2, maxHeight + operatorShape.getHeight());
        }
    });
    function generateOperator(width) {
        return new kity.Rect(width, 1).fill("black");
    }
});
/**
 * 左右结合二元操作符
 * @abstract
 */
define("operator/binary-opr/left-right", [ "kity", "operator/binary", "operator/operator" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("LeftRightOperator", {
        base: require("operator/binary"),
        applyOperand: function(leftOperand, rightOperand) {
            var operator = this, operatorBox = operator.getRenderBox(), // 操作数特殊处理
            leftOperandBox = leftOperand.getRenderBox(), rightOperandBox = rightOperand.getRenderBox(), // 偏移量
            offset = 0, // 操作对象最大高度
            maxHeight = Math.max(leftOperandBox.height, rightOperandBox.height, operatorBox.height);
            // 左操作数
            leftOperand.translate(offset, (maxHeight - leftOperandBox.height) / 2);
            // 操作符
            offset += leftOperandBox.width + leftOperandBox.x;
            operator.translate(offset, (maxHeight - operatorBox.height) / 2);
            // 右操作数
            offset += operatorBox.width + operatorBox.x;
            rightOperand.translate(offset, (maxHeight - rightOperandBox.height) / 2);
        }
    });
});
/**
 * 负正操作符
 */
define("operator/binary-opr/minus-plus", [ "kity", "operator/binary-opr/left-right", "operator/binary" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("MinusPlusOperator", {
        base: require("operator/binary-opr/left-right"),
        constructor: function() {
            this.callBase("Mp");
            // 绘制符号图形
            this.addOperatorShape(new kity.Path(pathData).fill("black").translate(5, 2));
        }
    });
});
/**
 * 乘法操作符
 */
define("operator/binary-opr/multiplication", [ "kity", "char/data", "char/data/number/0", "char/data/number/1", "char/data/number/2", "char/data/number/3", "char/data/number/4", "char/data/number/5", "char/data/number/6", "char/data/number/7", "char/data/number/8", "char/data/number/9", "char/data/character/a", "char/data/character/b", "char/data/character/c", "char/data/character/d", "char/data/character/e", "char/data/character/f", "char/data/character/g", "char/data/character/h", "char/data/character/i", "char/data/character/j", "char/data/character/k", "char/data/character/l", "char/data/character/m", "char/data/character/n", "char/data/character/o", "char/data/character/p", "char/data/character/q", "char/data/character/r", "char/data/character/s", "char/data/character/t", "char/data/character/u", "char/data/character/v", "char/data/character/w", "char/data/character/x", "char/data/character/y", "char/data/character/z", "char/data/character/ua", "char/data/character/ub", "char/data/character/uc", "char/data/character/ud", "char/data/character/ue", "char/data/character/uf", "char/data/character/ug", "char/data/character/uh", "char/data/character/ui", "char/data/character/uj", "char/data/character/uk", "char/data/character/ul", "char/data/character/um", "char/data/character/un", "char/data/character/uo", "char/data/character/up", "char/data/character/uq", "char/data/character/ur", "char/data/character/us", "char/data/character/ut", "char/data/character/uu", "char/data/character/uv", "char/data/character/uw", "char/data/character/ux", "char/data/character/uy", "char/data/character/uz", "char/data/symbol/base/l-parentheses", "char/data/symbol/base/r-parentheses", "char/data/symbol/base/negative", "char/data/symbol/relational/eq", "char/data/symbol/base/positive", "char/data/symbol/base/vertical", "char/data/symbol/base/slash", "char/data/symbol/base/exclamation", "char/data/symbol/base/l-brackets", "char/data/symbol/base/r-brackets", "char/data/symbol/base/colon", "char/data/symbol/base/quotation", "char/data/symbol/relational/lt", "char/data/symbol/relational/gt", "char/data/symbol/base/point", "char/data/symbol/base/l-braces", "char/data/symbol/base/r-braces", "char/data/symbol/base/comma", "char/data/symbol/base/times", "char/data/symbol/base/div", "char/data/symbol/base/pm", "char/data/symbol/base/mp", "char/data/symbol/base/ast", "char/data/symbol/base/cdot", "char/data/symbol/base/cdots", "char/data/symbol/base/ddots", "char/data/symbol/base/ldots", "char/data/symbol/base/vdots", "char/data/symbol/base/wedge", "char/data/symbol/base/vee", "char/data/symbol/base/mid", "char/data/symbol/relational/approx", "char/data/symbol/relational/equiv", "char/data/symbol/relational/geq", "char/data/symbol/relational/gg", "char/data/symbol/relational/leq", "char/data/symbol/relational/ll", "char/data/symbol/relational/sim", "char/data/symbol/relational/simeq", "char/data/symbol/set/cap", "char/data/symbol/set/cup", "char/data/symbol/set/in", "char/data/symbol/set/ni", "char/data/symbol/set/sqcap", "char/data/symbol/set/sqcup", "char/data/symbol/set/sqsubset", "char/data/symbol/set/sqsubseteq", "char/data/symbol/set/sqsupset", "char/data/symbol/set/sqsupseteq", "char/data/symbol/set/subset", "char/data/symbol/set/subseteq", "char/data/symbol/set/supset", "char/data/symbol/set/supseteq", "char/data/symbol/not/ncong", "char/data/symbol/not/neq", "char/data/symbol/not/nequiv", "char/data/symbol/not/nge", "char/data/symbol/not/ngt", "char/data/symbol/not/nlt", "char/data/symbol/not/nle", "char/data/symbol/not/nsim", "char/data/symbol/not/nsubseteq", "char/data/symbol/not/nsupseteq", "char/data/symbol/not/nin", "char/data/symbol/base/infty", "char/data/symbol/base/to", "char/data/greek/alpha", "char/data/greek/beta", "char/data/greek/gamma", "char/data/greek/delta", "char/data/greek/epsilon", "char/data/greek/varepsilon", "char/data/greek/zeta", "char/data/greek/eta", "char/data/greek/theta", "char/data/greek/iota", "char/data/greek/kappa", "char/data/greek/lambda", "char/data/greek/mu", "char/data/greek/nu", "char/data/greek/xi", "char/data/greek/pi", "char/data/greek/rho", "char/data/greek/sigma", "char/data/greek/tau", "char/data/greek/upsilon", "char/data/greek/phi", "char/data/greek/varphi", "char/data/greek/chi", "char/data/greek/psi", "char/data/greek/omega", "char/data/roman/ua", "char/data/roman/ub", "char/data/greek/u-gamma", "char/data/greek/u-delta", "char/data/roman/ue", "char/data/roman/uz", "char/data/roman/uh", "char/data/greek/u-theta", "char/data/roman/ui", "char/data/roman/uk", "char/data/greek/u-lambda", "char/data/roman/um", "char/data/roman/un", "char/data/greek/u-xi", "char/data/roman/uo", "char/data/greek/u-pi", "char/data/roman/up", "char/data/greek/u-sigma", "char/data/roman/ut", "char/data/greek/u-upsilon", "char/data/greek/u-phi", "char/data/roman/ux", "char/data/greek/u-psi", "char/data/greek/u-omega", "char/data/roman/a", "char/data/roman/b", "char/data/roman/c", "char/data/roman/d", "char/data/roman/e", "char/data/roman/f", "char/data/roman/g", "char/data/roman/h", "char/data/roman/i", "char/data/roman/j", "char/data/roman/k", "char/data/roman/l", "char/data/roman/m", "char/data/roman/n", "char/data/roman/o", "char/data/roman/p", "char/data/roman/q", "char/data/roman/r", "char/data/roman/s", "char/data/roman/t", "char/data/roman/u", "char/data/roman/v", "char/data/roman/w", "char/data/roman/x", "char/data/roman/y", "char/data/roman/z", "char/data/roman/uc", "char/data/roman/ud", "char/data/roman/uf", "char/data/roman/ug", "char/data/roman/uj", "char/data/roman/ul", "char/data/roman/uq", "char/data/roman/ur", "char/data/roman/us", "char/data/roman/uu", "char/data/roman/uv", "char/data/roman/uw", "char/data/roman/uy", "operator/binary-opr/left-right", "operator/binary" ], function(require, exports, modules) {
    var kity = require("kity"), CHAR_DATA = require("char/data");
    return kity.createClass("MultiplicationOperator", {
        base: require("operator/binary-opr/left-right"),
        constructor: function() {
            var opData = CHAR_DATA.std["\\times\\"], opShape = null;
            this.callBase("Multiplication");
            opShape = new kity.Path(opData.path).fill("black");
            opShape.translate(opData.offset.x, opData.offset.y);
            // 绘制符号图形
            this.addOperatorShape(opShape);
        }
    });
});
/**
 * "平行"操作符
 */
define("operator/binary-opr/parallel", [ "kity", "operator/binary-opr/left-right", "operator/binary" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("ParallelOperator", {
        base: require("operator/binary-opr/left-right"),
        constructor: function() {
            var pathData = "M0.96,23.186c0,0.384,0,0.816-0.48,0.816S0,23.498,0,23.114V0.888C0,0.528,0,0,0.48,0s0.48,0.432,0.48,0.816V23.186z    M5.64,23.114c0,0.36,0,0.888-0.48,0.888s-0.48-0.432-0.48-0.816V0.816C4.68,0.432,4.68,0,5.16,0s0.48,0.504,0.48,0.888V23.114z", opShape = new kity.Path(pathData).fill("black");
            this.callBase("Parallel");
            opShape.translate(11.5, 0);
            // 绘制符号图形
            this.addOperatorShape(opShape);
        }
    });
});
/**
 * 开方操作符
 */
define("operator/binary-opr/radical", [ "kity", "operator/binary", "operator/operator" ], function(require, exports, modules) {
    var kity = require("kity"), // 符号图形属性
    // 线条宽度
    SHAPE_DATA_WIDTH = .5, // 计算公式
    radians = 2 * Math.PI / 360, sin20 = Math.sin(20 * radians), cos20 = Math.cos(20 * radians), tan20 = Math.tan(20 * radians), atan20 = Math.atan(20 * radians);
    return kity.createClass("RadicalOperator", {
        base: require("operator/binary"),
        constructor: function() {
            this.callBase("Radical");
        },
        applyOperand: function(radicand, exponent) {
            generateOperator.call(this, radicand, exponent);
        }
    });
    // 根据给定的操作数生成操作符的pathData
    // radicand 表示被开方数
    // exponent 表示指数
    function generateOperator(radicand, exponent) {
        var decoration = generateDecoration(radicand), vLine = generateVLine(radicand), hLine = generateHLine(radicand);
        this.addOperatorShape(decoration);
        this.addOperatorShape(vLine);
        this.addOperatorShape(hLine);
        adjustmentPosition.call(this, mergeShape(decoration, vLine, hLine), this.operatorShape, radicand, exponent);
    }
    // 生成根号中的左边装饰部分
    function generateDecoration(radicand) {
        var shape = new kity.Path(), // 命名为a以便于精简表达式
        a = SHAPE_DATA_WIDTH, h = radicand.getHeight() / 3, drawer = shape.getDrawer();
        // 根号尾部左上角开始
        drawer.moveTo(0, cos20 * a * 6);
        drawer.lineBy(sin20 * a, cos20 * a);
        drawer.lineBy(cos20 * a * 3, -sin20 * a * 3);
        drawer.lineBy(tan20 * h, h);
        drawer.lineBy(sin20 * a * 3, -cos20 * a * 3);
        drawer.lineBy(-sin20 * h, -h);
        drawer.close();
        return shape.fill("black");
    }
    // 根据操作数生成根号的竖直线部分
    function generateVLine(operand) {
        var shape = new kity.Path(), // 表达式高度, 2 是字符集的底部填充高度
        h = operand.getHeight() - 2, drawer = shape.getDrawer();
        drawer.moveTo(tan20 * h, 0);
        drawer.lineTo(0, h);
        drawer.lineBy(sin20 * SHAPE_DATA_WIDTH * 3, cos20 * SHAPE_DATA_WIDTH * 3);
        drawer.lineBy(tan20 * h + sin20 * SHAPE_DATA_WIDTH * 3, -(h + 3 * SHAPE_DATA_WIDTH * cos20));
        drawer.close();
        return shape.fill("black");
    }
    // 根据操作数生成根号的水平线部分
    function generateHLine(operand) {
        // 表达式宽度
        var w = operand.getWidth() + 2 * SHAPE_DATA_WIDTH;
        return new kity.Rect(w, 2 * SHAPE_DATA_WIDTH).fill("black");
    }
    // 合并根号的各个部分， 并返回根号的关键点位置数据
    function mergeShape(decoration, vLine, hLine) {
        var decoBox = decoration.getRenderBox(), vLineBox = vLine.getRenderBox();
        vLine.translate(decoBox.width - sin20 * SHAPE_DATA_WIDTH * 3, 0);
        decoration.translate(0, vLineBox.height - decoBox.height);
        vLineBox = vLine.getRenderBox();
        hLine.translate(vLineBox.x + vLineBox.width - SHAPE_DATA_WIDTH / cos20, 0);
        // 返回关键点数据
        return {
            x: vLineBox.x + vLineBox.width - SHAPE_DATA_WIDTH / cos20,
            y: 0
        };
    }
    // 调整整个根号表达式的各个部分： 位置、操作符、被开方数、指数
    function adjustmentPosition(position, operator, radicand, exponent) {
        var exponentBox = null, opOffset = {
            x: 0,
            y: 0
        }, opBox = operator.getRenderBox();
        exponent.setAnchor(0, 0);
        exponent.scale(.7);
        exponentBox = exponent.getRenderBox();
        if (exponentBox.width > 0 && exponentBox.height > 0) {
            opOffset.y = exponentBox.height - opBox.height / 2;
            // 指数不超出根号， 则移动指数
            if (opOffset.y < 0) {
                exponent.translate(0, -opOffset.y);
                opOffset.y = 0;
            }
            opOffset.x = exponentBox.width + opBox.height / 2 * tan20 - position.x;
        }
        operator.translate(opOffset.x, opOffset.y);
        radicand.translate(opOffset.x + position.x + SHAPE_DATA_WIDTH, opOffset.y + 2 * SHAPE_DATA_WIDTH);
    }
});
/**
 * 减法操作符
 */
define("operator/binary-opr/subtraction", [ "kity", "char/data", "char/data/number/0", "char/data/number/1", "char/data/number/2", "char/data/number/3", "char/data/number/4", "char/data/number/5", "char/data/number/6", "char/data/number/7", "char/data/number/8", "char/data/number/9", "char/data/character/a", "char/data/character/b", "char/data/character/c", "char/data/character/d", "char/data/character/e", "char/data/character/f", "char/data/character/g", "char/data/character/h", "char/data/character/i", "char/data/character/j", "char/data/character/k", "char/data/character/l", "char/data/character/m", "char/data/character/n", "char/data/character/o", "char/data/character/p", "char/data/character/q", "char/data/character/r", "char/data/character/s", "char/data/character/t", "char/data/character/u", "char/data/character/v", "char/data/character/w", "char/data/character/x", "char/data/character/y", "char/data/character/z", "char/data/character/ua", "char/data/character/ub", "char/data/character/uc", "char/data/character/ud", "char/data/character/ue", "char/data/character/uf", "char/data/character/ug", "char/data/character/uh", "char/data/character/ui", "char/data/character/uj", "char/data/character/uk", "char/data/character/ul", "char/data/character/um", "char/data/character/un", "char/data/character/uo", "char/data/character/up", "char/data/character/uq", "char/data/character/ur", "char/data/character/us", "char/data/character/ut", "char/data/character/uu", "char/data/character/uv", "char/data/character/uw", "char/data/character/ux", "char/data/character/uy", "char/data/character/uz", "char/data/symbol/base/l-parentheses", "char/data/symbol/base/r-parentheses", "char/data/symbol/base/negative", "char/data/symbol/relational/eq", "char/data/symbol/base/positive", "char/data/symbol/base/vertical", "char/data/symbol/base/slash", "char/data/symbol/base/exclamation", "char/data/symbol/base/l-brackets", "char/data/symbol/base/r-brackets", "char/data/symbol/base/colon", "char/data/symbol/base/quotation", "char/data/symbol/relational/lt", "char/data/symbol/relational/gt", "char/data/symbol/base/point", "char/data/symbol/base/l-braces", "char/data/symbol/base/r-braces", "char/data/symbol/base/comma", "char/data/symbol/base/times", "char/data/symbol/base/div", "char/data/symbol/base/pm", "char/data/symbol/base/mp", "char/data/symbol/base/ast", "char/data/symbol/base/cdot", "char/data/symbol/base/cdots", "char/data/symbol/base/ddots", "char/data/symbol/base/ldots", "char/data/symbol/base/vdots", "char/data/symbol/base/wedge", "char/data/symbol/base/vee", "char/data/symbol/base/mid", "char/data/symbol/relational/approx", "char/data/symbol/relational/equiv", "char/data/symbol/relational/geq", "char/data/symbol/relational/gg", "char/data/symbol/relational/leq", "char/data/symbol/relational/ll", "char/data/symbol/relational/sim", "char/data/symbol/relational/simeq", "char/data/symbol/set/cap", "char/data/symbol/set/cup", "char/data/symbol/set/in", "char/data/symbol/set/ni", "char/data/symbol/set/sqcap", "char/data/symbol/set/sqcup", "char/data/symbol/set/sqsubset", "char/data/symbol/set/sqsubseteq", "char/data/symbol/set/sqsupset", "char/data/symbol/set/sqsupseteq", "char/data/symbol/set/subset", "char/data/symbol/set/subseteq", "char/data/symbol/set/supset", "char/data/symbol/set/supseteq", "char/data/symbol/not/ncong", "char/data/symbol/not/neq", "char/data/symbol/not/nequiv", "char/data/symbol/not/nge", "char/data/symbol/not/ngt", "char/data/symbol/not/nlt", "char/data/symbol/not/nle", "char/data/symbol/not/nsim", "char/data/symbol/not/nsubseteq", "char/data/symbol/not/nsupseteq", "char/data/symbol/not/nin", "char/data/symbol/base/infty", "char/data/symbol/base/to", "char/data/greek/alpha", "char/data/greek/beta", "char/data/greek/gamma", "char/data/greek/delta", "char/data/greek/epsilon", "char/data/greek/varepsilon", "char/data/greek/zeta", "char/data/greek/eta", "char/data/greek/theta", "char/data/greek/iota", "char/data/greek/kappa", "char/data/greek/lambda", "char/data/greek/mu", "char/data/greek/nu", "char/data/greek/xi", "char/data/greek/pi", "char/data/greek/rho", "char/data/greek/sigma", "char/data/greek/tau", "char/data/greek/upsilon", "char/data/greek/phi", "char/data/greek/varphi", "char/data/greek/chi", "char/data/greek/psi", "char/data/greek/omega", "char/data/roman/ua", "char/data/roman/ub", "char/data/greek/u-gamma", "char/data/greek/u-delta", "char/data/roman/ue", "char/data/roman/uz", "char/data/roman/uh", "char/data/greek/u-theta", "char/data/roman/ui", "char/data/roman/uk", "char/data/greek/u-lambda", "char/data/roman/um", "char/data/roman/un", "char/data/greek/u-xi", "char/data/roman/uo", "char/data/greek/u-pi", "char/data/roman/up", "char/data/greek/u-sigma", "char/data/roman/ut", "char/data/greek/u-upsilon", "char/data/greek/u-phi", "char/data/roman/ux", "char/data/greek/u-psi", "char/data/greek/u-omega", "char/data/roman/a", "char/data/roman/b", "char/data/roman/c", "char/data/roman/d", "char/data/roman/e", "char/data/roman/f", "char/data/roman/g", "char/data/roman/h", "char/data/roman/i", "char/data/roman/j", "char/data/roman/k", "char/data/roman/l", "char/data/roman/m", "char/data/roman/n", "char/data/roman/o", "char/data/roman/p", "char/data/roman/q", "char/data/roman/r", "char/data/roman/s", "char/data/roman/t", "char/data/roman/u", "char/data/roman/v", "char/data/roman/w", "char/data/roman/x", "char/data/roman/y", "char/data/roman/z", "char/data/roman/uc", "char/data/roman/ud", "char/data/roman/uf", "char/data/roman/ug", "char/data/roman/uj", "char/data/roman/ul", "char/data/roman/uq", "char/data/roman/ur", "char/data/roman/us", "char/data/roman/uu", "char/data/roman/uv", "char/data/roman/uw", "char/data/roman/uy", "operator/binary-opr/left-right", "operator/binary" ], function(require, exports, module) {
    var kity = require("kity"), CHAR_DATA = require("char/data");
    return kity.createClass("SubtractionOperator", {
        base: require("operator/binary-opr/left-right"),
        constructor: function() {
            var opData = CHAR_DATA.std["-"], opShape = null;
            this.callBase("Subtraction");
            opShape = new kity.Path(opData.path).fill("black");
            opShape.translate(opData.offset.x, opData.offset.y);
            // 绘制符号图形
            this.addOperatorShape(opShape);
        }
    });
});
/**
 * 上下结合二元操作符
 * @abstract
 */
define("operator/binary-opr/up-down", [ "kity", "operator/binary", "operator/operator" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("UpDownOperator", {
        base: require("operator/binary"),
        applyOperand: function(upOperand, downOperand) {
            throw new Error("applyOperand is abstract");
        }
    });
});
/**
 * 二元操作符抽象类
 * @abstract
 */
define("operator/binary", [ "kity", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("BinaryOperator", {
        base: require("operator/operator"),
        setParentExpression: function(exp) {
            this.callBase(exp);
        }
    });
});
/**
 * 小括号操作符：()
 */
define("operator/brackets", [ "kity", "char/data", "char/data/number/0", "char/data/number/1", "char/data/number/2", "char/data/number/3", "char/data/number/4", "char/data/number/5", "char/data/number/6", "char/data/number/7", "char/data/number/8", "char/data/number/9", "char/data/character/a", "char/data/character/b", "char/data/character/c", "char/data/character/d", "char/data/character/e", "char/data/character/f", "char/data/character/g", "char/data/character/h", "char/data/character/i", "char/data/character/j", "char/data/character/k", "char/data/character/l", "char/data/character/m", "char/data/character/n", "char/data/character/o", "char/data/character/p", "char/data/character/q", "char/data/character/r", "char/data/character/s", "char/data/character/t", "char/data/character/u", "char/data/character/v", "char/data/character/w", "char/data/character/x", "char/data/character/y", "char/data/character/z", "char/data/character/ua", "char/data/character/ub", "char/data/character/uc", "char/data/character/ud", "char/data/character/ue", "char/data/character/uf", "char/data/character/ug", "char/data/character/uh", "char/data/character/ui", "char/data/character/uj", "char/data/character/uk", "char/data/character/ul", "char/data/character/um", "char/data/character/un", "char/data/character/uo", "char/data/character/up", "char/data/character/uq", "char/data/character/ur", "char/data/character/us", "char/data/character/ut", "char/data/character/uu", "char/data/character/uv", "char/data/character/uw", "char/data/character/ux", "char/data/character/uy", "char/data/character/uz", "char/data/symbol/base/l-parentheses", "char/data/symbol/base/r-parentheses", "char/data/symbol/base/negative", "char/data/symbol/relational/eq", "char/data/symbol/base/positive", "char/data/symbol/base/vertical", "char/data/symbol/base/slash", "char/data/symbol/base/exclamation", "char/data/symbol/base/l-brackets", "char/data/symbol/base/r-brackets", "char/data/symbol/base/colon", "char/data/symbol/base/quotation", "char/data/symbol/relational/lt", "char/data/symbol/relational/gt", "char/data/symbol/base/point", "char/data/symbol/base/l-braces", "char/data/symbol/base/r-braces", "char/data/symbol/base/comma", "char/data/symbol/base/times", "char/data/symbol/base/div", "char/data/symbol/base/pm", "char/data/symbol/base/mp", "char/data/symbol/base/ast", "char/data/symbol/base/cdot", "char/data/symbol/base/cdots", "char/data/symbol/base/ddots", "char/data/symbol/base/ldots", "char/data/symbol/base/vdots", "char/data/symbol/base/wedge", "char/data/symbol/base/vee", "char/data/symbol/base/mid", "char/data/symbol/relational/approx", "char/data/symbol/relational/equiv", "char/data/symbol/relational/geq", "char/data/symbol/relational/gg", "char/data/symbol/relational/leq", "char/data/symbol/relational/ll", "char/data/symbol/relational/sim", "char/data/symbol/relational/simeq", "char/data/symbol/set/cap", "char/data/symbol/set/cup", "char/data/symbol/set/in", "char/data/symbol/set/ni", "char/data/symbol/set/sqcap", "char/data/symbol/set/sqcup", "char/data/symbol/set/sqsubset", "char/data/symbol/set/sqsubseteq", "char/data/symbol/set/sqsupset", "char/data/symbol/set/sqsupseteq", "char/data/symbol/set/subset", "char/data/symbol/set/subseteq", "char/data/symbol/set/supset", "char/data/symbol/set/supseteq", "char/data/symbol/not/ncong", "char/data/symbol/not/neq", "char/data/symbol/not/nequiv", "char/data/symbol/not/nge", "char/data/symbol/not/ngt", "char/data/symbol/not/nlt", "char/data/symbol/not/nle", "char/data/symbol/not/nsim", "char/data/symbol/not/nsubseteq", "char/data/symbol/not/nsupseteq", "char/data/symbol/not/nin", "char/data/symbol/base/infty", "char/data/symbol/base/to", "char/data/greek/alpha", "char/data/greek/beta", "char/data/greek/gamma", "char/data/greek/delta", "char/data/greek/epsilon", "char/data/greek/varepsilon", "char/data/greek/zeta", "char/data/greek/eta", "char/data/greek/theta", "char/data/greek/iota", "char/data/greek/kappa", "char/data/greek/lambda", "char/data/greek/mu", "char/data/greek/nu", "char/data/greek/xi", "char/data/greek/pi", "char/data/greek/rho", "char/data/greek/sigma", "char/data/greek/tau", "char/data/greek/upsilon", "char/data/greek/phi", "char/data/greek/varphi", "char/data/greek/chi", "char/data/greek/psi", "char/data/greek/omega", "char/data/roman/ua", "char/data/roman/ub", "char/data/greek/u-gamma", "char/data/greek/u-delta", "char/data/roman/ue", "char/data/roman/uz", "char/data/roman/uh", "char/data/greek/u-theta", "char/data/roman/ui", "char/data/roman/uk", "char/data/greek/u-lambda", "char/data/roman/um", "char/data/roman/un", "char/data/greek/u-xi", "char/data/roman/uo", "char/data/greek/u-pi", "char/data/roman/up", "char/data/greek/u-sigma", "char/data/roman/ut", "char/data/greek/u-upsilon", "char/data/greek/u-phi", "char/data/roman/ux", "char/data/greek/u-psi", "char/data/greek/u-omega", "char/data/roman/a", "char/data/roman/b", "char/data/roman/c", "char/data/roman/d", "char/data/roman/e", "char/data/roman/f", "char/data/roman/g", "char/data/roman/h", "char/data/roman/i", "char/data/roman/j", "char/data/roman/k", "char/data/roman/l", "char/data/roman/m", "char/data/roman/n", "char/data/roman/o", "char/data/roman/p", "char/data/roman/q", "char/data/roman/r", "char/data/roman/s", "char/data/roman/t", "char/data/roman/u", "char/data/roman/v", "char/data/roman/w", "char/data/roman/x", "char/data/roman/y", "char/data/roman/z", "char/data/roman/uc", "char/data/roman/ud", "char/data/roman/uf", "char/data/roman/ug", "char/data/roman/uj", "char/data/roman/ul", "char/data/roman/uq", "char/data/roman/ur", "char/data/roman/us", "char/data/roman/uu", "char/data/roman/uv", "char/data/roman/uw", "char/data/roman/uy", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity"), SYMBOL_DATA = require("char/data");
    return kity.createClass("BracketsOperator", {
        base: require("operator/operator"),
        constructor: function() {
            this.callBase("Brackets");
        },
        applyOperand: function(exp) {
            generate.call(this, exp);
        }
    });
    function generate(exp) {
        var left = this.getParentExpression().getLeftSymbol(), right = this.getParentExpression().getRightSymbol(), leftPath = SYMBOL_DATA.std[left].path, rightPath = SYMBOL_DATA.std[right].path, group = new kity.Group(), leftOp = new kity.Path(leftPath).fill("black"), rightOp = new kity.Path(rightPath).fill("black"), expSpaceSize = exp.getRenderBox(), leftOpSize = null, rightOpSize = null, leftZoom = 1, rightZoom = 1, // 左右空间大小
        SPACE = 2, offset = 0;
        this.addOperatorShape(group.addShape(leftOp).addShape(rightOp));
        leftOpSize = leftOp.getRenderBox();
        rightOpSize = rightOp.getRenderBox();
        leftZoom = expSpaceSize.height ? expSpaceSize.height / leftOpSize.height : 1;
        rightZoom = expSpaceSize.height ? expSpaceSize.height / rightOpSize.height : 1;
        if (leftZoom > 1) {
            leftOp.setAnchor(0, 0).scale(1 + (leftZoom - 1) / 2, leftZoom);
        }
        if (rightZoom > 1) {
            rightOp.setAnchor(0, 0).scale(1 + (rightZoom - 1) / 2, rightZoom);
        }
        // 重新获取大小
        leftOpSize = leftOp.getRenderBox();
        rightOpSize = rightOp.getRenderBox();
        offset += SPACE;
        leftOp.translate(offset, 0);
        offset += SPACE + leftOpSize.width;
        exp.translate(offset, 0);
        offset += SPACE + expSpaceSize.width;
        rightOp.translate(offset, 0);
    }
});
/**
 * 组合操作符
 * 操作多个表达式组合在一起
 */
define("operator/combination", [ "kity", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("CombinationOperator", {
        base: require("operator/operator"),
        constructor: function() {
            this.callBase("Combination");
        },
        applyOperand: function() {
            // 偏移量
            var offset = 0, // 操作数
            operands = arguments, // 操作对象最大高度
            maxHeight = 0, cached = [];
            kity.Utils.each(operands, function(operand) {
                var box = operand.getRenderBox();
                cached.push(box);
                maxHeight = Math.max(box.height, maxHeight);
            });
            kity.Utils.each(operands, function(operand, index) {
                var box = cached[index];
                operand.translate(offset - box.x, (maxHeight - (box.y + box.height)) / 2);
                offset += box.width;
            });
        }
    });
});
/**
 * 函数操作符
 */
define("operator/func", [ "kity", "char/roman", "char/char", "signgroup", "operator/operator", "def/gtype" ], function(require, exports, modules) {
    var kity = require("kity"), RomanText = require("char/roman");
    return kity.createClass("FunctionOperator", {
        base: require("operator/operator"),
        constructor: function(funcName) {
            this.callBase("Function: " + funcName);
            this.funcName = funcName;
        },
        /*
         * 积分操作符应用操作数
         * @param integrand 被积函数
         * @param supOperand 上限
         * @param subOperand 下限
         */
        applyOperand: function(funcExp, supOperand, subOperand) {
            generateOperator.call(this);
            adjustmentPosition.call(this, this.operatorShape, funcExp, supOperand, subOperand);
        }
    });
    /* 返回操作符对象 */
    function generateOperator() {
        var textShape = new RomanText(this.funcName);
        this.addOperatorShape(textShape);
        textShape.addedCall();
        return this.operatorShape;
    }
    function adjustmentPosition(operatorShape, funcExp, supOperand, subOperand) {
        supOperand.setAnchor(0, 0).scale(.7);
        subOperand.setAnchor(0, 0).scale(.7);
        var opBox = operatorShape.getRenderBox(), supBox = supOperand.getRenderBox(), subBox = subOperand.getRenderBox(), expBox = funcExp.getRenderBox(), maxScriptHeight = Math.max(supBox.height, subBox.height), maxWidth = Math.max(opBox.width, subBox.width, supBox.width);
        supOperand.translate((maxWidth - supBox.width) / 2, maxScriptHeight - supBox.height);
        operatorShape.translate((maxWidth - opBox.width) / 2, maxScriptHeight);
        subOperand.translate((maxWidth - subBox.width) / 2, maxScriptHeight + opBox.height);
        funcExp.translate(maxWidth + 5, (maxScriptHeight * 2 + opBox.height - expBox.height) / 2);
    }
});
/**
 * 积分操作符：∫
 */
define("operator/integration", [ "kity", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("IntegrationOperator", {
        base: require("operator/operator"),
        constructor: function(type) {
            this.callBase("Integration");
            // 默认是普通单重积分
            this.type = type || 1;
        },
        setType: function(type) {
            this.type = type | 0;
        },
        // 重置类型
        resetType: function() {
            this.type = 1;
        },
        /*
         * 积分操作符应用操作数
         * @param integrand 被积函数
         * @param supOperand 上限
         * @param subOperand 下限
         */
        applyOperand: function(integrand, supOperand, subOperand) {
            generateOperator.call(this);
            adjustmentPosition.call(this, this.operatorShape, integrand, supOperand, subOperand);
        }
    });
    /* 返回操作符对象 */
    function generateOperator() {
        var pathData = "M1.318,48.226c0,0,0.044,0.066,0.134,0.134c0.292,0.313,0.626,0.447,1.006,0.447c0.246,0.022,0.358-0.044,0.604-0.268   c0.782-0.782,1.497-2.838,2.324-6.727c0.514-2.369,0.938-4.693,1.586-8.448C8.559,24.068,9.9,17.878,11.978,9.52   c0.917-3.553,1.922-7.576,3.866-8.983C16.247,0.246,16.739,0,17.274,0c1.564,0,2.503,1.162,2.592,2.57   c0,0.827-0.424,1.386-1.273,1.386c-0.671,0-1.229-0.514-1.229-1.251c0-0.805,0.514-1.095,1.185-1.274   c0.022,0-0.291-0.29-0.425-0.379c-0.201-0.134-0.514-0.224-0.737-0.224c-0.067,0-0.112,0-0.157,0.022   c-0.469,0.134-0.983,0.939-1.453,2.234c-0.537,1.475-0.961,3.174-1.631,6.548c-0.424,2.101-0.693,3.464-1.229,6.727   c-1.608,9.185-2.949,15.487-5.006,23.756c-0.514,2.034-0.849,3.24-1.207,4.335c-0.559,1.698-1.162,2.95-1.811,3.799   c-0.514,0.715-1.385,1.408-2.436,1.408c-1.363,0-2.391-1.185-2.458-2.592c0-0.804,0.447-1.363,1.273-1.363   c0.671,0,1.229,0.514,1.229,1.251C2.503,47.757,1.989,48.047,1.318,48.226z", group = new kity.Group(), opShape = new kity.Path(pathData).fill("black"), tmpShape = null;
        this.addOperatorShape(group);
        group.addShape(opShape);
        for (var i = 1; i < this.type; i++) {
            tmpShape = new kity.Use(opShape).translate(opShape.getWidth() / 2 * i, 0);
            group.addShape(tmpShape);
        }
        tmpShape = null;
        return group;
    }
    function adjustmentPosition(operatorShape, integrandExp, supOperand, subOperand) {
        //        var operatorBox = operatorShape.getRenderBox(),
        //            integrandBox = integrand.getRenderBox(),
        //            supBox = null,
        //            subBox = null,
        //            expBox = null,
        //            // 被积函数的偏移
        //            offset = {
        //                x: operatorBox.width,
        //                y: 0
        //            },
        //            // 表达式左边部分最大宽度
        //            leftMaxWidth = 0,
        //            maxHeight = 0;
        //
        //        if ( supOperand ) {
        //
        //            supOperand.setAnchor( 0, 0 ).scale( 0.7 );
        //            subOperand.setAnchor( 0, 0 ).scale( 0.7 );
        //
        //            supBox = supOperand.getRenderBox();
        //            subBox = subOperand.getRenderBox();
        //
        //            // 上限偏移
        //            offset.x += 2;
        //            supOperand.translate( offset.x, 2 );
        //
        //            leftMaxWidth = offset.x + supBox.width;
        //
        //            // 符号偏移
        //            offset.y += supBox.height / 2;
        //            offset.x += supBox.width;
        //            operatorShape.translate( 0, offset.y );
        //
        //            // 下限偏移
        //            subOperand.translate( operatorBox.width - 8, offset.y + operatorBox.height - subBox.height + 6 );
        //
        //            leftMaxWidth = Math.max( leftMaxWidth, operatorBox.width - 8 + subBox.width );
        //
        //        }
        //
        //        /* 被积函数和操作符及上下限的偏移 */
        //
        //        // 被积函数偏移
        //        maxHeight = Math.max( operatorBox.height, integrandBox.height );
        //        integrand.translate( leftMaxWidth + 2, ( maxHeight - integrandBox.height ) / 2 + offset.y - integrandBox.y );
        //
        //        // 操作符偏移
        //        maxHeight = ( maxHeight - operatorBox.height ) / 2;
        //        operatorShape.translate( 0, maxHeight );
        //        supOperand.translate( 0, maxHeight );
        //        subOperand.translate( 0, maxHeight );
        //
        //        /* 操作符边框的调整， 包裹住所有内容 */
        //        // 获取整个表达式经过调整后的大小
        //        expBox = this.parentExpression.getRenderBox();
        //
        //        // 要保证符号上下的空间是相同的
        //        var diff = expBox.height - offset.y - operatorBox.height;
        //
        //        this.box.setWidth( expBox.width );
        //
        //        // 下部空间大于上部空间， 调整整个空间
        //        if ( diff > offset.y ) {
        //
        //            diff = diff - offset.y;
        //
        //            // 移动整个空间中的内容
        //            this.box.setHeight( expBox.height + diff );
        //            supOperand.translate( 0, diff );
        //            subOperand.translate( 0, diff );
        //            operatorShape.translate( 0, diff );
        //            integrand.translate( 0, diff );
        //
        //        } else {
        //        // 仅调整边框大小
        //
        //            this.box.setHeight( expBox.height + offset.y - diff );
        //
        //        }
        supOperand.setAnchor(0, 0).scale(.7);
        subOperand.setAnchor(0, 0).scale(.7);
        var expBox = integrandExp.getRenderBox(), subBox = subOperand.getRenderBox(), supBox = supOperand.getRenderBox(), opBox = operatorShape.getRenderBox(), maxScriptSize = {
            width: Math.max(subBox.width, supBox.width),
            height: Math.max(subBox.height, supBox.height)
        }, maxLeftWidth = Math.max(opBox.width, maxScriptSize.width), offset = {
            x: 0,
            y: 0
        }, // 左右两部分的高度diff
        leftHeight = subBox.height / 3 + supBox.height / 3 + opBox.height, // 表达式在Y轴上的偏移
        expOffsetY = 0;
        // 调整左右两边的高度, 使之不会出现负偏移
        if (leftHeight < expBox.height) {
            offset.y = (expBox.height - leftHeight) / 2;
        } else {
            expOffsetY = (leftHeight - expBox.height) / 2;
        }
        offset.x = opBox.width + 1;
        supOperand.translate(offset.x, offset.y);
        offset.y += supBox.height / 3;
        operatorShape.translate(0, offset.y);
        offset.y += opBox.height - subBox.height * 2 / 3;
        subOperand.translate(opBox.width - 9, offset.y);
        // 左边部分所占空间大小
        offset.x = Math.max(opBox.width + 1 + supBox.width, opBox.width + subBox.width - 9);
        integrandExp.translate(offset.x + 5, expOffsetY);
    }
});
/**
 * 操作符抽象类
 * @abstract
 */
define("operator/operator", [ "kity", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity"), GTYPE = require("def/gtype");
    return kity.createClass("Operator", {
        base: require("signgroup"),
        constructor: function(operatorName) {
            this.callBase();
            this.type = GTYPE.OP;
            // 该操作符所属的表达式
            this.parentExpression = null;
            // 操作符名称
            this.operatorName = operatorName;
            // 操作符图形
            this.operatorShape = new kity.Group();
            this.addShape(this.operatorShape);
        },
        applyOperand: function() {
            throw new Error("applyOperand is abstract");
        },
        setParentExpression: function(exp) {
            this.parentExpression = exp;
        },
        getParentExpression: function() {
            return this.parentExpression;
        },
        clearParentExpression: function() {
            this.parentExpression = null;
        },
        // 提供给具体实现类附加其绘制的操作符图形的接口
        addOperatorShape: function(shpae) {
            return this.operatorShape.addShape(shpae);
        },
        getOperatorShape: function() {
            return this.operatorShape;
        }
    });
});
/**
 * 上下标操作符
 */
define("operator/script", [ "kity", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, module) {
    var kity = require("kity");
    return kity.createClass("SubtractionOperator", {
        base: require("operator/operator"),
        constructor: function(operatorName) {
            this.callBase(operatorName || "Script");
        },
        applyOperand: function(operand, sup, sub) {
            sub.setAnchor(0, 0).scale(.7);
            sup.setAnchor(0, 0).scale(.7);
            // 基础空间大小
            var operandBox = {
                width: operand.getWidth(),
                height: operand.getBaseHeight()
            }, supBox = {
                width: sup.getWidth() || sub.getWidth(),
                height: sup.getBaseHeight() || sub.getBaseHeight()
            }, subBox = {
                width: sub.getWidth() || supBox.width,
                height: sub.getBaseHeight() || supBox.height
            }, // 占用空间大小
            operandSpaceSize = operand.getRenderBox(), supSpaceSize = {
                width: sup.getWidth() || sub.getWidth(),
                height: sup.getHeight() || sub.getHeight()
            }, subSpaceSize = {
                width: sub.getWidth() || supSpaceSize.width,
                height: sub.getHeight() || supSpaceSize.height
            }, // 基础空间到占用空间的偏移
            operandOffset = {
                height: (operandSpaceSize.height - operandBox.height) / 2
            }, supOffset = {
                height: (supSpaceSize.height - supBox.height) / 2
            }, subOffset = {
                height: (subSpaceSize.height - subBox.height) / 2
            }, offset = 0, boxSize = {
                width: Math.max(supSpaceSize.width, subSpaceSize.width) + 1 + operandSpaceSize.width,
                height: Math.max(supSpaceSize.height, subSpaceSize.height) * 2 + operandBox.height / 3
            }, operandTranslate = supBox.height + supOffset.height - operandOffset.height - operandBox.height / 3, subTranslate = operandTranslate + operandSpaceSize.height - operandOffset.height - operandBox.height / 3;
            var diff = boxSize.height - (subTranslate + subSpaceSize.height);
            if (diff > 0) {
                // 扩展顶部空间
                offset += diff;
                operandTranslate += diff;
                subTranslate += diff;
            } else {
                // 扩展底部空间
                boxSize.height -= diff;
            }
            sup.translate(operandSpaceSize.width + 1, offset);
            operand.translate(0, operandTranslate);
            sub.translate(operandSpaceSize.width + 1, subTranslate);
            this.setBoxSize(boxSize.width, boxSize.height);
        }
    });
});
/**
 * 求和操作符：∑
 */
define("operator/summation", [ "kity", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("SummationOperator", {
        base: require("operator/operator"),
        constructor: function() {
            this.callBase("Summation");
        },
        applyOperand: function(exp, superscript, subscript) {
            superscript.setAnchor(0, 0).scale(.7);
            subscript.setAnchor(0, 0).scale(.7);
            var supBox = superscript.getRenderBox(), subBox = subscript.getRenderBox(), expBox = exp.getRenderBox(), operatorShape = generateOperator(), scriptMaxHeight = Math.max(supBox.height, subBox.height), opBoxShape = null, opBox = null, leftOffset = 0, rightOffset = 0, leftHeight = 0, rightHeight = 0, maxHeight = null;
            this.addOperatorShape(operatorShape);
            opBoxShape = generateBox(operatorShape.getRenderBox(), supBox, subBox);
            this.addOperatorShape(opBoxShape);
            opBox = operatorShape.getRenderBox();
            // 计算相关数据
            leftHeight = opBoxShape.getHeight();
            rightHeight = expBox.height;
            maxHeight = Math.max(leftHeight, rightHeight);
            leftOffset = (maxHeight - leftHeight) / 2;
            rightOffset = (maxHeight - rightHeight) / 2;
            superscript.translate((opBox.width - supBox.width) / 2, leftOffset);
            operatorShape.translate(0, scriptMaxHeight + leftOffset);
            subscript.translate((opBox.width - subBox.width) / 2, scriptMaxHeight + opBox.height + leftOffset);
            // 主表达式偏移
            exp.translate(Math.max(opBoxShape.getWidth(), supBox.width, subBox.width), rightOffset);
        }
    });
    function generateOperator() {
        var pathData = "M0.672,33.603c-0.432,0-0.648,0-0.648-0.264c0-0.024,0-0.144,0.24-0.432l12.433-14.569L0,0.96c0-0.264,0-0.72,0.024-0.792   C0.096,0.024,0.12,0,0.672,0h28.371l2.904,6.745h-0.6C30.531,4.8,28.898,3.72,28.298,3.336c-1.896-1.2-3.984-1.608-5.28-1.8   c-0.216-0.048-2.4-0.384-5.617-0.384H4.248l11.185,15.289c0.168,0.24,0.168,0.312,0.168,0.36c0,0.12-0.048,0.192-0.216,0.384   L3.168,31.515h14.474c4.608,0,6.96-0.624,7.464-0.744c2.76-0.72,5.305-2.352,6.241-4.848h0.6l-2.904,7.681H0.672z", operator = new kity.Path(pathData).fill("black"), operatorShape = new kity.Group();
        return operatorShape.addShape(operator);
    }
    function generateBox(expBox, supBox, subBox) {
        // 获取上下标的最大高度， 使得上下标的位置能够对齐
        var scriptHeight = Math.max(supBox.height, subBox.height), maxWidth = Math.max(expBox.width + 5, supBox.width, subBox.width);
        return new kity.Rect(maxWidth, scriptHeight * 2 + expBox.height).fill("transparent");
    }
});
/**
 * Created by hn on 13-12-3.
 */
define("signgroup", [ "kity", "def/gtype" ], function(require, exports, module) {
    var kity = require("kity"), GTYPE = require("def/gtype");
    return kity.createClass("SignGroup", {
        base: kity.Group,
        constructor: function() {
            this.callBase();
            this.type = GTYPE.UNKNOWN;
            this.box = new kity.Rect(0, 0, 0, 0);
            this.addShape(this.box);
            this.zoom = 1;
        },
        setZoom: function(zoom) {
            this.zoom = zoom;
        },
        getZoom: function() {
            return this.zoom;
        },
        setBoxSize: function(w, h) {
            return this.box.setSize(w, h);
        },
        setBoxWidth: function(w) {
            return this.box.setWidth(w);
        },
        setBoxHeight: function(h) {
            return this.box.setHeight(h);
        },
        getType: function() {
            return this.type;
        },
        addedCall: function() {}
    });
});

/**
 * 模块暴露
 */

( function ( global ) {

    define( 'kf.start', function ( require ) {

        global.kf = {

            // base
            Formula: require( "formula" ),
            Operator: require( "operator/operator" ),

            // expression
            Expression: require( "expression/expression" ),
            CompoundExpression: require( "expression/compound" ),
            TextExpression: require( "expression/text" ),
            RomanTextExpression: require( "expression/roman" ),
            EmptyExpression: require( "expression/empty" ),
            CombinationExpression: require( "expression/compound-exp/combination" ),
            FunctionExpression: require( "expression/compound-exp/func" ),

            FractionExpression: require( "expression/compound-exp/binary-exp/fraction" ),
            IntegrationExpression: require( "expression/compound-exp/integration" ),
            RadicalExpression: require( "expression/compound-exp/binary-exp/radical" ),
            ScriptExpression: require( "expression/compound-exp/script" ),
            SuperscriptExpression: require( "expression/compound-exp/binary-exp/superscript" ),
            SubscriptExpression: require( "expression/compound-exp/binary-exp/subscript" ),
            SubtractionExpression: require( "expression/compound-exp/binary-exp/subtraction" ),
            SummationExpression: require( "expression/compound-exp/summation" ),
            ParallelExpression: require( "expression/compound-exp/binary-exp/parallel"),

            // Brackets expressoin
            BracketsExpression: require( "expression/compound-exp/brackets" ),

        };

    } );

    // build环境中才含有use
    try {
        use( 'kf.start' );
    } catch ( e ) {
    }

} )( this );
})();
