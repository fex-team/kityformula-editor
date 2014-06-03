/*!
 * ====================================================
 * kityformula-editor - v1.0.0 - 2014-06-03
 * https://github.com/HanCong03/kityformula-editor
 * GitHub: https://github.com/kitygraph/kityformula-editor.git 
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
define("assembly", [], function(require, exports, module) {
    var CONSTRUCT_MAPPING = {}, CURSOR_CHAR = "\uf155";
    function Assembly(container, config) {
        this.formula = new kf.Formula(container, config);
    }
    Assembly.prototype.generateBy = function(data) {
        var tree = data.tree, objTree = {}, selectInfo = {}, mapping = {};
        if (typeof tree === "string") {
            objTree = new kf.TextExpression(tree);
            this.formula.appendExpression(objTree);
        } else {
            this.formula.appendExpression(generateExpression(tree, deepCopy(tree), objTree, mapping, selectInfo));
            return {
                select: selectInfo,
                parsedTree: tree,
                tree: objTree,
                mapping: mapping
            };
        }
    };
    Assembly.prototype.regenerateBy = function(data) {
        this.formula.clearExpressions();
        return this.generateBy(data);
    };
    function generateExpression(originTree, tree, objTree, mapping, selectInfo) {
        var currentOperand = null, exp = null, cursorLocation = [], operand = tree.operand || [], constructor = null, constructorProxy;
        objTree.operand = [];
        if (tree.name.indexOf("text") === -1) {
            for (var i = 0, len = operand.length; i < len; i++) {
                currentOperand = operand[i];
                if (currentOperand === CURSOR_CHAR) {
                    cursorLocation.push(i);
                    if (!selectInfo.hasOwnProperty("startOffset")) {
                        selectInfo.startOffset = i;
                    }
                    selectInfo.endOffset = i;
                    if (tree.attr && tree.attr.id) {
                        selectInfo.groupId = tree.attr.id;
                    }
                    continue;
                }
                if (!currentOperand) {
                    operand[i] = createObject("empty");
                    objTree.operand.push(operand[i]);
                } else if (typeof currentOperand === "string") {
                    if (tree.name === "brackets" && i < 2) {
                        operand[i] = currentOperand;
                    } else if (tree.name === "function" && i === 0) {
                        operand[i] = currentOperand;
                    } else {
                        operand[i] = createObject("text", currentOperand);
                    }
                    objTree.operand.push(operand[i]);
                } else {
                    objTree.operand.push({});
                    operand[i] = arguments.callee(originTree.operand[i], currentOperand, objTree.operand[objTree.operand.length - 1], mapping, selectInfo);
                }
            }
            if (cursorLocation.length === 2) {
                selectInfo.endOffset -= 1;
            }
            while (i = cursorLocation.length) {
                i = cursorLocation[i - 1];
                operand.splice(i, 1);
                cursorLocation.length--;
                originTree.operand.splice(i, 1);
            }
        }
        constructor = getConstructor(tree.name);
        if (!constructor) {
            throw new Error("operator type error: not found " + tree.operator);
        }
        constructorProxy = function() {};
        constructorProxy.prototype = constructor.prototype;
        exp = new constructorProxy();
        constructor.apply(exp, operand);
        objTree.func = exp;
        for (var fn in tree.callFn) {
            if (!tree.callFn.hasOwnProperty(fn) || !exp[fn]) {
                continue;
            }
            exp[fn].apply(exp, tree.callFn[fn]);
        }
        if (tree.attr) {
            if (tree.attr.id) {
                mapping[tree.attr.id] = {
                    objGroup: exp,
                    strGroup: originTree
                };
            }
            if (tree.attr["data-root"]) {
                mapping["root"] = {
                    objGroup: exp,
                    strGroup: originTree
                };
            }
            exp.setAttr(tree.attr);
        }
        return exp;
    }
    function createObject(type, value) {
        switch (type) {
          case "empty":
            return new kf.EmptyExpression();

          case "text":
            return new kf.TextExpression(value);
        }
    }
    function getConstructor(name) {
        return CONSTRUCT_MAPPING[name] || kf[name.replace(/^[a-z]/i, function(match) {
            return match.toUpperCase();
        }).replace(/-([a-z])/gi, function(match, char) {
            return char.toUpperCase();
        }) + "Expression"];
    }
    function deepCopy(source) {
        var target = {};
        if ({}.toString.call(source) === "[object Array]") {
            target = [];
            for (var i = 0, len = source.length; i < len; i++) {
                target[i] = doCopy(source[i]);
            }
        } else {
            for (var key in source) {
                if (!source.hasOwnProperty(key)) {
                    continue;
                }
                target[key] = doCopy(source[key]);
            }
        }
        return target;
    }
    function doCopy(source) {
        if (!source) {
            return source;
        }
        if (typeof source !== "object") {
            return source;
        }
        return deepCopy(source);
    }
    return {
        use: function(container, config) {
            return new Assembly(container, config);
        }
    };
});
define("impl/latex/base/latex-utils", [ "impl/latex/base/rpn", "impl/latex/base/utils", "impl/latex/define/type", "impl/latex/base/tree", "impl/latex/handler/combination" ], function(require, exports, module) {
    return {
        toRPNExpression: require("impl/latex/base/rpn"),
        generateTree: require("impl/latex/base/tree")
    };
});
define("impl/latex/base/rpn", [ "impl/latex/base/utils", "impl/latex/define/operator", "impl/latex/define/func", "impl/latex/handler/func", "impl/latex/define/type" ], function(require) {
    var Utils = require("impl/latex/base/utils");
    return function(units) {
        var signStack = [], TYPE = require("impl/latex/define/type"), currentUnit = null;
        units = processFunction(units);
        while (currentUnit = units.shift()) {
            if (currentUnit.name === "combination" && currentUnit.operand.length === 1 && currentUnit.operand[0].name === "brackets") {
                currentUnit = currentUnit.operand[0];
            }
            if (Utils.isArray(currentUnit)) {
                signStack.push(arguments.callee(currentUnit));
                continue;
            }
            signStack.push(currentUnit);
        }
        return signStack;
    };
    function processFunction(units) {
        var processed = [], currentUnit = null;
        while ((currentUnit = units.pop()) !== undefined) {
            if (currentUnit && typeof currentUnit === "object" && (currentUnit.sign === false || currentUnit.name === "function")) {
                var tt = currentUnit.handler(currentUnit, [], processed.reverse());
                processed.unshift(tt);
                processed.reverse();
            } else {
                processed.push(currentUnit);
            }
        }
        return processed.reverse();
    }
});
define("impl/latex/base/tree", [ "impl/latex/define/type", "impl/latex/handler/combination", "impl/latex/base/utils", "impl/latex/define/operator", "impl/latex/define/func", "impl/latex/handler/func" ], function(require) {
    var TYPE = require("impl/latex/define/type"), mergeHandler = require("impl/latex/handler/combination"), Utils = require("impl/latex/base/utils");
    return function(units) {
        var currentUnit = null, nextUnit = null, tree = [];
        for (var i = 0, len = units.length; i < len; i++) {
            if (Utils.isArray(units[i])) {
                units[i] = arguments.callee(units[i]);
            }
        }
        while (currentUnit = units.shift()) {
            if (typeof currentUnit === "object" && currentUnit.handler) {
                tree.push(currentUnit.handler(currentUnit, tree, units));
            } else {
                tree.push(currentUnit);
            }
        }
        return mergeHandler(tree);
    };
});
define("impl/latex/base/utils", [ "impl/latex/define/operator", "impl/latex/handler/script", "impl/latex/define/type", "impl/latex/handler/fraction", "impl/latex/handler/sqrt", "impl/latex/handler/summation", "impl/latex/handler/integration", "impl/latex/handler/brackets", "impl/latex/handler/mathcal", "impl/latex/handler/mathfrak", "impl/latex/handler/mathbb", "impl/latex/handler/mathrm", "impl/latex/define/func", "impl/latex/handler/func", "impl/latex/handler/lib/script-extractor" ], function(require, exports, module) {
    var OPERATOR_LIST = require("impl/latex/define/operator"), FUNCTION_LIST = require("impl/latex/define/func"), FUNCTION_HANDLER = require("impl/latex/handler/func"), Utils = {
        getLatexType: function(str) {
            str = str.replace(/^\\/, "");
            if (OPERATOR_LIST[str]) {
                return "operator";
            }
            if (FUNCTION_LIST[str]) {
                return "function";
            }
            return "text";
        },
        isArray: function(obj) {
            return obj && Object.prototype.toString.call(obj) === "[object Array]";
        },
        getDefine: function(str) {
            return Utils.extend({}, OPERATOR_LIST[str.replace("\\", "")]);
        },
        getFuncDefine: function(str) {
            return {
                name: "function",
                params: str.replace(/^\\/, ""),
                handler: FUNCTION_HANDLER
            };
        },
        getBracketsDefine: function(leftBrackets, rightBrackets) {
            return Utils.extend({
                params: [ leftBrackets, rightBrackets ]
            }, OPERATOR_LIST["brackets"]);
        },
        extend: function(target, sources) {
            for (var key in sources) {
                if (sources.hasOwnProperty(key)) {
                    target[key] = sources[key];
                }
            }
            return target;
        }
    };
    return Utils;
});
define("impl/latex/define/brackets", [], function(require, exports, module) {
    var t = true;
    return {
        ".": t,
        "{": t,
        "}": t,
        "[": t,
        "]": t,
        "(": t,
        ")": t,
        "|": t
    };
});
define("impl/latex/define/func", [], function(require, exports, module) {
    return {
        sin: 1,
        cos: 1,
        arccos: 1,
        cosh: 1,
        det: 1,
        inf: 1,
        limsup: 1,
        Pr: 1,
        tan: 1,
        arcsin: 1,
        cot: 1,
        dim: 1,
        ker: 1,
        ln: 1,
        sec: 1,
        tanh: 1,
        arctan: 1,
        coth: 1,
        exp: 1,
        lg: 1,
        log: 1,
        arg: 1,
        csc: 1,
        gcd: 1,
        lim: 1,
        max: 1,
        sinh: 1,
        cos: 1,
        deg: 1,
        hom: 1,
        liminf: 1,
        min: 1,
        sup: 1
    };
});
define("impl/latex/define/operator", [ "impl/latex/handler/script", "impl/latex/define/type", "impl/latex/handler/fraction", "impl/latex/handler/sqrt", "impl/latex/handler/combination", "impl/latex/handler/summation", "impl/latex/handler/lib/script-extractor", "impl/latex/handler/integration", "impl/latex/handler/brackets", "impl/latex/define/brackets", "impl/latex/handler/mathcal", "impl/latex/handler/mathfrak", "impl/latex/handler/mathbb", "impl/latex/handler/mathrm" ], function(require, exports, module) {
    var scriptHandler = require("impl/latex/handler/script"), TYPE = require("impl/latex/define/type");
    return {
        "^": {
            name: "superscript",
            type: TYPE.OP,
            handler: scriptHandler
        },
        _: {
            name: "subscript",
            type: TYPE.OP,
            handler: scriptHandler
        },
        frac: {
            name: "fraction",
            type: TYPE.FN,
            sign: false,
            handler: require("impl/latex/handler/fraction")
        },
        sqrt: {
            name: "radical",
            type: TYPE.FN,
            sign: false,
            handler: require("impl/latex/handler/sqrt")
        },
        sum: {
            name: "summation",
            type: TYPE.FN,
            traversal: "rtl",
            handler: require("impl/latex/handler/summation")
        },
        "int": {
            name: "integration",
            type: TYPE.FN,
            traversal: "rtl",
            handler: require("impl/latex/handler/integration")
        },
        brackets: {
            name: "brackets",
            type: TYPE.FN,
            handler: require("impl/latex/handler/brackets")
        },
        mathcal: {
            name: "mathcal",
            type: TYPE.FN,
            sign: false,
            handler: require("impl/latex/handler/mathcal")
        },
        mathfrak: {
            name: "mathfrak",
            type: TYPE.FN,
            sign: false,
            handler: require("impl/latex/handler/mathfrak")
        },
        mathbb: {
            name: "mathbb",
            type: TYPE.FN,
            sign: false,
            handler: require("impl/latex/handler/mathbb")
        },
        mathrm: {
            name: "mathrm",
            type: TYPE.FN,
            sign: false,
            handler: require("impl/latex/handler/mathrm")
        }
    };
});
define("impl/latex/define/pre", [ "impl/latex/pre/int", "impl/latex/pre/quot" ], function(require, exports, module) {
    return {
        "int": require("impl/latex/pre/int"),
        quot: require("impl/latex/pre/quot")
    };
});
define("impl/latex/define/reverse", [ "impl/latex/reverse/combination", "impl/latex/reverse/fraction", "impl/latex/reverse/func", "impl/latex/reverse/integration", "impl/latex/reverse/subscript", "impl/latex/reverse/superscript", "impl/latex/reverse/script", "impl/latex/reverse/sqrt", "impl/latex/reverse/summation", "impl/latex/reverse/brackets", "impl/latex/reverse/mathcal", "impl/latex/reverse/mathfrak", "impl/latex/reverse/mathbb", "impl/latex/reverse/mathrm" ], function(require) {
    return {
        combination: require("impl/latex/reverse/combination"),
        fraction: require("impl/latex/reverse/fraction"),
        "function": require("impl/latex/reverse/func"),
        integration: require("impl/latex/reverse/integration"),
        subscript: require("impl/latex/reverse/subscript"),
        superscript: require("impl/latex/reverse/superscript"),
        script: require("impl/latex/reverse/script"),
        radical: require("impl/latex/reverse/sqrt"),
        summation: require("impl/latex/reverse/summation"),
        brackets: require("impl/latex/reverse/brackets"),
        mathcal: require("impl/latex/reverse/mathcal"),
        mathfrak: require("impl/latex/reverse/mathfrak"),
        mathbb: require("impl/latex/reverse/mathbb"),
        mathrm: require("impl/latex/reverse/mathrm")
    };
});
define("impl/latex/define/special", [], function() {
    return {
        "#": 1,
        $: 1,
        "%": 1,
        _: 1,
        "&": 1,
        "{": 1,
        "}": 1,
        "^": 1,
        "~": 1
    };
});
define("impl/latex/define/type", [], function(require, exports, module) {
    return {
        OP: 1,
        FN: 2
    };
});
define("impl/latex/handler/brackets", [ "impl/latex/define/brackets" ], function(require, exports, module) {
    var BRACKETS_TYPE = require("impl/latex/define/brackets");
    return function(info, processedStack, unprocessedStack) {
        for (var i = 0, len = info.params.length; i < len; i++) {
            if (!(info.params[i] in BRACKETS_TYPE)) {
                throw new Error("Brackets: invalid params");
            }
        }
        info.operand = info.params;
        info.params[2] = unprocessedStack.shift();
        delete info.handler;
        delete info.params;
        return info;
    };
});
define("impl/latex/handler/combination", [], function(require, exports, module) {
    return function() {
        return {
            name: "combination",
            operand: arguments[0] || []
        };
    };
});
define("impl/latex/handler/fraction", [], function(require, exports, module) {
    return function(info, processedStack, unprocessedStack) {
        var numerator = unprocessedStack.shift(), denominator = unprocessedStack.shift();
        if (numerator === undefined || denominator === undefined) {
            throw new Error("Frac: Syntax Error");
        }
        info.operand = [ numerator, denominator ];
        delete info.handler;
        return info;
    };
});
define("impl/latex/handler/func", [ "impl/latex/handler/lib/script-extractor" ], function(require, exports, module) {
    var ScriptExtractor = require("impl/latex/handler/lib/script-extractor");
    return function(info, processedStack, unprocessedStack) {
        var params = ScriptExtractor.exec(unprocessedStack);
        info.operand = [ info.params, params.expr, params.superscript, params.subscript ];
        delete info.params;
        delete info.handler;
        return info;
    };
});
define("impl/latex/handler/integration", [ "impl/latex/handler/lib/script-extractor" ], function(require, exports, module) {
    var ScriptExtractor = require("impl/latex/handler/lib/script-extractor");
    return function(info, processedStack, unprocessedStack) {
        var count = unprocessedStack.shift(), params = ScriptExtractor.exec(unprocessedStack);
        info.operand = [ params.expr, params.superscript, params.subscript ];
        info.callFn = {
            setType: [ count | 0 ]
        };
        delete info.handler;
        return info;
    };
});
define("impl/latex/handler/lib/script-extractor", [], function(require) {
    return {
        exec: function(stack) {
            var result = extractScript(stack), expr = stack.shift();
            if (expr && expr.name && expr.name.indexOf("script") !== -1) {
                throw new Error("Script: syntax error!");
            }
            result.expr = expr || null;
            return result;
        }
    };
    function extractScript(stack) {
        var scriptGroup = extract(stack), nextGroup = null, result = {
            superscript: null,
            subscript: null
        };
        if (scriptGroup) {
            nextGroup = extract(stack);
        } else {
            return result;
        }
        result[scriptGroup.type] = scriptGroup.value || null;
        if (nextGroup) {
            if (nextGroup.type === scriptGroup.type) {
                throw new Error("Script: syntax error!");
            }
            result[nextGroup.type] = nextGroup.value || null;
        }
        return result;
    }
    function extract(stack) {
        var forward = stack.shift();
        if (!forward) {
            return null;
        }
        if (forward.name === "subscript" || forward.name === "superscript") {
            return {
                type: forward.name,
                value: stack.shift()
            };
        }
        stack.unshift(forward);
        return null;
    }
});
define("impl/latex/handler/mathbb", [], function(require, exports, module) {
    return function(info, processedStack, unprocessedStack) {
        var chars = unprocessedStack.shift();
        if (typeof chars === "object" && chars.name === "combination") {
            chars = chars.operand.join("");
        }
        info.name = "text";
        info.attr = {
            _reverse: "mathbb"
        };
        info.callFn = {
            setFamily: [ "KF AMS BB" ]
        };
        info.operand = [ chars ];
        delete info.handler;
        return info;
    };
});
define("impl/latex/handler/mathcal", [], function(require, exports, module) {
    return function(info, processedStack, unprocessedStack) {
        var chars = unprocessedStack.shift();
        if (typeof chars === "object" && chars.name === "combination") {
            chars = chars.operand.join("");
        }
        info.name = "text";
        info.attr = {
            _reverse: "mathcal"
        };
        info.callFn = {
            setFamily: [ "KF AMS CAL" ]
        };
        info.operand = [ chars ];
        delete info.handler;
        return info;
    };
});
define("impl/latex/handler/mathfrak", [], function(require, exports, module) {
    return function(info, processedStack, unprocessedStack) {
        var chars = unprocessedStack.shift();
        if (typeof chars === "object" && chars.name === "combination") {
            chars = chars.operand.join("");
        }
        info.name = "text";
        info.attr = {
            _reverse: "mathfrak"
        };
        info.callFn = {
            setFamily: [ "KF AMS FRAK" ]
        };
        info.operand = [ chars ];
        delete info.handler;
        return info;
    };
});
define("impl/latex/handler/mathrm", [], function(require, exports, module) {
    return function(info, processedStack, unprocessedStack) {
        var chars = unprocessedStack.shift();
        if (typeof chars === "object" && chars.name === "combination") {
            chars = chars.operand.join("");
        }
        info.name = "text";
        info.attr = {
            _reverse: "mathrm"
        };
        info.callFn = {
            setFamily: [ "KF AMS ROMAN" ]
        };
        info.operand = [ chars ];
        delete info.handler;
        return info;
    };
});
define("impl/latex/handler/script", [], function(require, exports, module) {
    return function(info, processedStack, unprocessedStack) {
        var base = processedStack.pop(), script = unprocessedStack.shift() || null;
        if (!script) {
            throw new Error("Missing script");
        }
        base = base || "";
        if (base.name === info.name || base.name === "script") {
            throw new Error("script error");
        }
        if (base.name === "subscript") {
            base.name = "script";
            base.operand[2] = base.operand[1];
            base.operand[1] = script;
            return base;
        } else if (base.name === "superscript") {
            base.name = "script";
            base.operand[2] = script;
            return base;
        }
        info.operand = [ base, script ];
        delete info.handler;
        return info;
    };
});
define("impl/latex/handler/sqrt", [ "impl/latex/handler/combination" ], function(require, exports, module) {
    var mergeHandler = require("impl/latex/handler/combination");
    return function(info, processedStack, unprocessedStack) {
        var exponent = unprocessedStack.shift(), tmp = null, radicand = null;
        if (exponent === "[") {
            exponent = [];
            while (tmp = unprocessedStack.shift()) {
                if (tmp === "]") {
                    break;
                }
                exponent.push(tmp);
            }
            if (exponent.length === 0) {
                exponent = null;
            } else {
                exponent = mergeHandler(exponent);
            }
            radicand = unprocessedStack.shift();
        } else {
            radicand = exponent;
            exponent = null;
        }
        info.operand = [ radicand, exponent ];
        delete info.handler;
        return info;
    };
});
define("impl/latex/handler/summation", [ "impl/latex/handler/lib/script-extractor" ], function(require, exports, module) {
    var ScriptExtractor = require("impl/latex/handler/lib/script-extractor");
    return function(info, processedStack, unprocessedStack) {
        var params = ScriptExtractor.exec(unprocessedStack);
        info.operand = [ params.expr, params.superscript, params.subscript ];
        delete info.handler;
        return info;
    };
});
define("impl/latex/latex", [ "parser", "impl/latex/base/latex-utils", "impl/latex/base/rpn", "impl/latex/base/tree", "impl/latex/define/pre", "impl/latex/pre/int", "impl/latex/pre/quot", "impl/latex/serialization", "impl/latex/define/reverse", "impl/latex/define/special", "impl/latex/define/operator", "impl/latex/handler/script", "impl/latex/define/type", "impl/latex/handler/fraction", "impl/latex/handler/sqrt", "impl/latex/handler/summation", "impl/latex/handler/integration", "impl/latex/handler/brackets", "impl/latex/handler/mathcal", "impl/latex/handler/mathfrak", "impl/latex/handler/mathbb", "impl/latex/handler/mathrm", "impl/latex/reverse/combination", "impl/latex/reverse/fraction", "impl/latex/reverse/func", "impl/latex/reverse/integration", "impl/latex/reverse/subscript", "impl/latex/reverse/superscript", "impl/latex/reverse/script", "impl/latex/reverse/sqrt", "impl/latex/reverse/summation", "impl/latex/reverse/brackets", "impl/latex/reverse/mathcal", "impl/latex/reverse/mathfrak", "impl/latex/reverse/mathbb", "impl/latex/reverse/mathrm", "impl/latex/base/utils", "impl/latex/define/func", "impl/latex/handler/func" ], function(require, exports, module) {
    var Parser = require("parser").Parser, LatexUtils = require("impl/latex/base/latex-utils"), PRE_HANDLER = require("impl/latex/define/pre"), serialization = require("impl/latex/serialization"), OP_DEFINE = require("impl/latex/define/operator"), REVERSE_DEFINE = require("impl/latex/define/reverse"), SPECIAL_LIST = require("impl/latex/define/special"), Utils = require("impl/latex/base/utils");
    var leftChar = "\ufff8", rightChar = "\ufffc", clearCharPattern = new RegExp(leftChar + "|" + rightChar, "g"), leftCharPattern = new RegExp(leftChar, "g"), rightCharPattern = new RegExp(rightChar, "g");
    Parser.register("latex", Parser.implement({
        parse: function(data) {
            var units = this.split(this.format(data));
            units = this.parseToGroup(units);
            units = this.parseToStruct(units);
            return this.generateTree(units);
        },
        serialization: function(tree, options) {
            return serialization(tree, options);
        },
        expand: function(expandObj) {
            var parseObj = expandObj.parse, formatKey = null, preObj = expandObj.pre, reverseObj = expandObj.reverse;
            for (var key in parseObj) {
                if (!parseObj.hasOwnProperty(key)) {
                    continue;
                }
                formatKey = key.replace(/\\/g, "");
                OP_DEFINE[formatKey] = parseObj[key];
            }
            for (var key in reverseObj) {
                if (!reverseObj.hasOwnProperty(key)) {
                    continue;
                }
                REVERSE_DEFINE[key.replace(/\\/g, "")] = reverseObj[key];
            }
            if (preObj) {
                for (var key in preObj) {
                    if (!preObj.hasOwnProperty(key)) {
                        continue;
                    }
                    PRE_HANDLER[key.replace(/\\/g, "")] = preObj[key];
                }
            }
        },
        format: function(input) {
            input = clearEmpty(input);
            input = input.replace(clearCharPattern, "").replace(/\\{/gi, leftChar).replace(/\\}/gi, rightChar);
            for (var key in PRE_HANDLER) {
                if (PRE_HANDLER.hasOwnProperty(key)) {
                    input = PRE_HANDLER[key](input);
                }
            }
            return input;
        },
        split: function(data) {
            var units = [], pattern = /(?:\\[^a-z]\s*)|(?:\\[a-z]+\s*)|(?:[{}]\s*)|(?:[^\\{}]\s*)/gi, emptyPattern = /^\s+|\s+$/g, match = null;
            data = data.replace(emptyPattern, "");
            while (match = pattern.exec(data)) {
                match = match[0].replace(emptyPattern, "");
                if (match) {
                    units.push(match);
                }
            }
            return units;
        },
        generateTree: function(units) {
            var tree = [], currentUnit = null;
            while (currentUnit = units.shift()) {
                if (Utils.isArray(currentUnit)) {
                    tree.push(this.generateTree(currentUnit));
                } else {
                    tree.push(currentUnit);
                }
            }
            tree = LatexUtils.toRPNExpression(tree);
            return LatexUtils.generateTree(tree);
        },
        parseToGroup: function(units) {
            var group = [], groupStack = [ group ], groupCount = 0, bracketsCount = 0;
            for (var i = 0, len = units.length; i < len; i++) {
                switch (units[i]) {
                  case "{":
                    groupCount++;
                    groupStack.push(group);
                    group.push([]);
                    group = group[group.length - 1];
                    break;

                  case "}":
                    groupCount--;
                    group = groupStack.pop();
                    break;

                  case "\\left":
                    bracketsCount++;
                    groupStack.push(group);
                    group.push([ [] ]);
                    group = group[group.length - 1][0];
                    group.type = "brackets";
                    i++;
                    group.leftBrackets = units[i].replace(leftCharPattern, "{").replace(rightCharPattern, "}");
                    break;

                  case "\\right":
                    bracketsCount--;
                    i++;
                    group.rightBrackets = units[i].replace(leftCharPattern, "{").replace(rightCharPattern, "}");
                    group = groupStack.pop();
                    break;

                  default:
                    group.push(units[i].replace(leftCharPattern, "\\{").replace(rightCharPattern, "\\}"));
                    break;
                }
            }
            if (groupCount !== 0) {
                throw new Error("Group Error!");
            }
            if (bracketsCount !== 0) {
                throw new Error("Brackets Error!");
            }
            return groupStack[0];
        },
        parseToStruct: function(units) {
            var structs = [];
            for (var i = 0, len = units.length; i < len; i++) {
                if (Utils.isArray(units[i])) {
                    if (units[i].type === "brackets") {
                        structs.push(Utils.getBracketsDefine(units[i].leftBrackets, units[i].rightBrackets));
                        structs.push(this.parseToStruct(units[i]));
                    } else {
                        structs.push(this.parseToStruct(units[i]));
                    }
                } else {
                    structs.push(parseStruct(units[i]));
                }
            }
            return structs;
        }
    }));
    function parseStruct(str) {
        if (isSpecialCharacter(str)) {
            return str.substring(1);
        }
        switch (Utils.getLatexType(str)) {
          case "operator":
            return Utils.getDefine(str);

          case "function":
            return Utils.getFuncDefine(str);

          default:
            return transformSpecialCharacters(str);
        }
    }
    function transformSpecialCharacters(char) {
        if (char.indexOf("\\") === 0) {
            return char + "\\";
        }
        return char;
    }
    function isSpecialCharacter(char) {
        if (char.indexOf("\\") === 0) {
            return !!SPECIAL_LIST[char.substring(1)];
        }
        return false;
    }
    function clearEmpty(data) {
        return data.replace(/\\\s+/, "").replace(/\s*([^a-z0-9\s])\s*/gi, function(match, symbol) {
            return symbol;
        });
    }
});
define("impl/latex/pre/int", [], function(require) {
    return function(input) {
        return input.replace(/\\(i+)nt(\b|[^a-zA-Z])/g, function(match, sign, suffix) {
            return "\\int " + sign.length + suffix;
        });
    };
});
define("impl/latex/pre/quot", [], function(require) {
    return function(input) {
        return input.replace(/``/g, "\u201c");
    };
});
define("impl/latex/reverse/brackets", [], function() {
    return function(operands) {
        if (operands[0] === "{" || operands[0] === "}") {
            operands[0] = "\\" + operands[0];
        }
        if (operands[1] === "{" || operands[1] === "}") {
            operands[1] = "\\" + operands[1];
        }
        return [ "\\left", operands[0], operands[2], "\\right", operands[1] ].join(" ");
    };
});
define("impl/latex/reverse/combination", [], function() {
    var pattern = new RegExp("\uf155", "g");
    return function(operands, options) {
        if (this.attr["data-root"] || this.attr["data-placeholder"]) {
            return operands.join("");
        }
        return "{" + operands.join("") + "}";
    };
});
define("impl/latex/reverse/fraction", [], function() {
    return function(operands) {
        return "\\frac " + operands[0] + " " + operands[1];
    };
});
define("impl/latex/reverse/func", [], function() {
    return function(operands) {
        var result = [ "\\" + operands[0] ];
        if (operands[2]) {
            result.push("^" + operands[2]);
        }
        if (operands[3]) {
            result.push("_" + operands[3]);
        }
        if (operands[1]) {
            result.push(" " + operands[1]);
        }
        return result.join("");
    };
});
define("impl/latex/reverse/integration", [], function() {
    return function(operands) {
        var result = [ "\\int " ];
        if (this.callFn && this.callFn.setType) {
            result = [ "\\" ];
            for (var i = 0, len = this.callFn.setType; i < len; i++) {
                result.push("i");
            }
            result.push("nt ");
        }
        if (operands[1]) {
            result.push("^" + operands[1]);
        }
        if (operands[2]) {
            result.push("_" + operands[2]);
        }
        if (operands[0]) {
            result.push(" " + operands[0]);
        }
        return result.join("");
    };
});
define("impl/latex/reverse/mathbb", [], function() {
    return function(operands) {
        return "\\mathbb{" + operands[0] + "}";
    };
});
define("impl/latex/reverse/mathcal", [], function() {
    return function(operands) {
        return "\\mathcal{" + operands[0] + "}";
    };
});
define("impl/latex/reverse/mathfrak", [], function() {
    return function(operands) {
        return "\\mathfrak{" + operands[0] + "}";
    };
});
define("impl/latex/reverse/mathrm", [], function() {
    return function(operands) {
        return "\\mathrm{" + operands[0] + "}";
    };
});
define("impl/latex/reverse/script", [], function() {
    return function(operands) {
        return operands[0] + "^" + operands[1] + "_" + operands[2];
    };
});
define("impl/latex/reverse/sqrt", [], function() {
    return function(operands) {
        var result = [ "\\sqrt" ];
        if (operands[1]) {
            result.push("[" + operands[1] + "]");
        }
        result.push(" " + operands[0]);
        return result.join("");
    };
});
define("impl/latex/reverse/subscript", [], function() {
    return function(operands) {
        return operands[0] + "_" + operands[1];
    };
});
define("impl/latex/reverse/summation", [], function() {
    return function(operands) {
        var result = [ "\\sum " ];
        if (operands[1]) {
            result.push("^" + operands[1]);
        }
        if (operands[2]) {
            result.push("_" + operands[2]);
        }
        if (operands[0]) {
            result.push(" " + operands[0]);
        }
        return result.join("");
    };
});
define("impl/latex/reverse/superscript", [], function() {
    return function(operands) {
        return operands[0] + "^" + operands[1];
    };
});
define("impl/latex/serialization", [ "impl/latex/define/reverse", "impl/latex/reverse/combination", "impl/latex/reverse/fraction", "impl/latex/reverse/func", "impl/latex/reverse/integration", "impl/latex/reverse/subscript", "impl/latex/reverse/superscript", "impl/latex/reverse/script", "impl/latex/reverse/sqrt", "impl/latex/reverse/summation", "impl/latex/reverse/brackets", "impl/latex/reverse/mathcal", "impl/latex/reverse/mathfrak", "impl/latex/reverse/mathbb", "impl/latex/reverse/mathrm", "impl/latex/define/special" ], function(require) {
    var reverseHandlerTable = require("impl/latex/define/reverse"), SPECIAL_LIST = require("impl/latex/define/special"), specialCharPattern = /(\\(?:[\w]+)|(?:[^a-z]))\\/gi;
    return function(tree, options) {
        return reverseParse(tree, options);
    };
    function reverseParse(tree, options) {
        var operands = [], reverseHandlerName = null, originalOperands = null;
        if (typeof tree !== "object") {
            if (isSpecialCharacter(tree)) {
                return "\\" + tree + " ";
            }
            return tree.replace(specialCharPattern, function(match, group) {
                return group + " ";
            });
        }
        if (tree.name === "combination" && tree.operand.length === 1 && tree.operand[0].name === "combination") {
            tree = tree.operand[0];
        }
        originalOperands = tree.operand;
        for (var i = 0, len = originalOperands.length; i < len; i++) {
            if (originalOperands[i]) {
                operands.push(reverseParse(originalOperands[i]));
            } else {
                operands.push(originalOperands[i]);
            }
        }
        if (tree.attr && tree.attr._reverse) {
            reverseHandlerName = tree.attr._reverse;
        } else {
            reverseHandlerName = tree.name;
        }
        return reverseHandlerTable[reverseHandlerName].call(tree, operands, options);
    }
    function isSpecialCharacter(char) {
        return !!SPECIAL_LIST[char];
    }
});
define("parser", [], function(require, exports, module) {
    var CONF = {}, IMPL_POLL = {}, Utils = {
        extend: function(target, sources) {
            var source = null;
            sources = [].slice.call(arguments, 1);
            for (var i = 0, len = sources.length; i < len; i++) {
                source = sources[i];
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        target[key] = source[key];
                    }
                }
            }
        },
        setData: function(container, key, value) {
            if (typeof key === "string") {
                container[key] = value;
            } else if (typeof key === "object") {
                for (value in key) {
                    if (key.hasOwnProperty(value)) {
                        container[value] = key[value];
                    }
                }
            } else {
                throw new Error("invalid option");
            }
        }
    };
    var Parser = {
        use: function(type) {
            if (!IMPL_POLL[type]) {
                throw new Error("unknown parser type");
            }
            return this.proxy(IMPL_POLL[type]);
        },
        config: function(key, value) {
            Utils.setData(CONF, key, value);
            return this;
        },
        register: function(type, parserImpl) {
            IMPL_POLL[type.toLowerCase()] = parserImpl;
            return this;
        },
        implement: function(parser) {
            var impl = function() {}, constructor = parser.constructor || function() {}, result = function() {
                ParserInterface.call(this);
                constructor.call(this);
            };
            impl.prototype = ParserInterface.prototype;
            result.prototype = new impl();
            delete parser.constructor;
            for (var key in parser) {
                if (key !== "constructor" && parser.hasOwnProperty(key)) {
                    result.prototype[key] = parser[key];
                }
            }
            return result;
        },
        proxy: function(parserImpl) {
            return new ParserProxy(parserImpl);
        }
    };
    function ParserProxy(parserImpl) {
        this.impl = new parserImpl();
        this.conf = {};
    }
    Utils.extend(ParserProxy.prototype, {
        config: function(key, value) {
            Utils.setData(this.conf, key, value);
        },
        set: function(key, value) {
            this.impl.set(key, value);
        },
        parse: function(data) {
            var result = {
                config: {},
                tree: this.impl.parse(data)
            };
            Utils.extend(result.config, CONF, this.conf);
            return result;
        },
        serialization: function(tree, options) {
            return this.impl.serialization(tree, options);
        },
        expand: function(obj) {
            this.impl.expand(obj);
        }
    });
    function ParserInterface() {
        this.conf = {};
    }
    Utils.extend(ParserInterface.prototype, {
        set: function(key, value) {
            Utils.extend(this.conf, key, value);
        },
        parse: function(data) {
            throw new Error("Abstract function");
        }
    });
    module.exports = {
        Parser: Parser,
        ParserInterface: ParserInterface
    };
});

/**
 * 模块暴露
 */

( function ( global ) {

    define( 'kf.start', function ( require ) {

        var Parser = require( "parser" ).Parser;

        // 初始化组件
        require( "impl/latex/latex" );

        global.kf.Parser = Parser;
        global.kf.Assembly = require( "assembly" );

    } );

    // build环境中才含有use
    try {
        use( 'kf.start' );
    } catch ( e ) {
    }

} )( this );
})();
