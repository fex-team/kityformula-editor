/*!
 * ====================================================
 * kityformula-editor - v1.0.0 - 2014-03-14
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
/*!
 * 装配器
 */
define("assembly", [], function(require, exports, module) {
    var CONSTRUCT_MAPPING = {};
    function Assembly(container, config) {
        this.formula = new kf.Formula(container, config);
    }
    Assembly.prototype.generateBy = function(data) {
        var tree = data.tree;
        if (typeof tree === "string") {
            this.formula.appendExpression(new kf.TextExpression(tree));
        } else {
            this.formula.appendExpression(generateExpression(tree));
        }
    };
    Assembly.prototype.regenerateBy = function(data) {
        this.formula.clear();
        return this.generateBy(data);
    };
    /**
     * 根据提供的树信息生成表达式
     * @param tree 中间格式的解析树
     * @return {kf.Expression} 生成的表达式
     */
    function generateExpression(tree) {
        var currentOperand = null, exp = null, operand = tree.operand || [], constructor = null, constructorProxy;
        // 处理操作数
        for (var i = 0, len = operand.length; i < len; i++) {
            currentOperand = operand[i];
            if (!currentOperand || typeof currentOperand !== "object") {
                continue;
            }
            operand[i] = arguments.callee(currentOperand);
        }
        constructor = getConstructor(tree.name);
        if (!constructor) {
            throw new Error("operator type error: not found " + tree.operator);
        }
        constructorProxy = function() {};
        constructorProxy.prototype = constructor.prototype;
        exp = new constructorProxy();
        constructor.apply(exp, operand);
        // 调用配置函数
        for (var fn in tree.callFn) {
            if (!tree.callFn.hasOwnProperty(fn) || !exp[fn]) {
                continue;
            }
            exp[fn].apply(exp, tree.callFn[fn]);
        }
        if (tree.attr) {
            exp.setAttr(tree.attr);
        }
        return exp;
    }
    /**
     * 根据操作符获取对应的构造器
     */
    function getConstructor(name) {
        return CONSTRUCT_MAPPING[name] || kf[name.replace(/^[a-z]/i, function(match) {
            return match.toUpperCase();
        }).replace(/-([a-z])/gi, function(match, char) {
            return char.toUpperCase();
        }) + "Expression"];
    }
    return {
        use: function(container, config) {
            return new Assembly(container, config);
        }
    };
});
/**
 * 类型检测器
 */
define("impl/latex/base/checker", [], function(require, exports, module) {});
/**
 * latex实现工具包
 */
define("impl/latex/base/latex-utils", [ "impl/latex/base/rpn", "impl/latex/base/utils", "impl/latex/define/type", "impl/latex/base/tree", "impl/latex/handler/combination" ], function(require, exports, module) {
    return {
        toRPNExpression: require("impl/latex/base/rpn"),
        generateTree: require("impl/latex/base/tree")
    };
});
/**
 * 逆波兰表达式转换函数
 */
define("impl/latex/base/rpn", [ "impl/latex/base/utils", "impl/latex/base/checker", "impl/latex/define/operator", "impl/latex/define/func", "impl/latex/handler/func", "impl/latex/define/type" ], function(require) {
    var Utils = require("impl/latex/base/utils");
    return function(units) {
        var signStack = [], TYPE = require("impl/latex/define/type"), currentUnit = null;
        // 先处理函数
        units = processFunction(units);
        while (currentUnit = units.shift()) {
            if (Utils.isArray(currentUnit)) {
                signStack.push(arguments.callee(currentUnit));
                continue;
            }
            signStack.push(currentUnit);
        }
        return signStack;
    };
    /**
     * “latex函数”处理器
     * @param units 单元组
     * @returns {Array} 处理过后的单元组
     */
    function processFunction(units) {
        var processed = [], currentUnit = null;
        while (currentUnit = units.shift()) {
            if (typeof currentUnit === "object" && currentUnit.sign === false) {
                // 预先处理不可作为独立符号的函数
                processed.push(currentUnit.handler(currentUnit, processed, units));
            } else {
                processed.push(currentUnit);
            }
        }
        return processed;
    }
});
/**
 * 从单元组构建树
 */
define("impl/latex/base/tree", [ "impl/latex/define/type", "impl/latex/handler/combination", "impl/latex/base/utils", "impl/latex/base/checker", "impl/latex/define/operator", "impl/latex/define/func", "impl/latex/handler/func" ], function(require) {
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
                // 后操作数
                tree.push(currentUnit.handler(currentUnit, tree, units));
            } else {
                tree.push(currentUnit);
            }
        }
        return mergeHandler(tree);
    };
});
/**
 * 通用工具包
 */
define("impl/latex/base/utils", [ "impl/latex/base/checker", "impl/latex/define/operator", "impl/latex/handler/script", "impl/latex/handler/func", "impl/latex/define/type", "impl/latex/handler/fraction", "impl/latex/handler/sqrt", "impl/latex/handler/summation", "impl/latex/handler/integration", "impl/latex/handler/brackets", "impl/latex/define/func", "impl/latex/handler/lib/int-extract" ], function(require, exports, module) {
    var Checker = require("impl/latex/base/checker"), OPERATOR_LIST = require("impl/latex/define/operator"), FUNCTION_LIST = require("impl/latex/define/func"), FUNCTION_HANDLER = require("impl/latex/handler/func"), Utils = {
        // 根据输入的latex字符串， 检测出该字符串所对应的kf的类型
        getLatexType: function(str) {
            str = str.replace(/^\\/, "");
            // 操作符
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
    // 附加功能到Utils对象
    for (var key in Checker) {
        if (Checker[key] && Checker.hasOwnProperty(key)) {
            Utils[key] = Checker[key];
        }
    }
    return Utils;
});
/**
 * 定义括号类型， 对于属于括号类型的符号或表达式， 则可以应用brackets函数处理
 */
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
/**
 * 函数列表
 */
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
/**
 * 操作符列表
 */
define("impl/latex/define/operator", [ "impl/latex/handler/script", "impl/latex/handler/func", "impl/latex/handler/lib/int-extract", "impl/latex/define/type", "impl/latex/handler/fraction", "impl/latex/handler/sqrt", "impl/latex/handler/summation", "impl/latex/handler/integration", "impl/latex/handler/brackets", "impl/latex/define/brackets" ], function(require, exports, module) {
    var scriptHandler = require("impl/latex/handler/script"), funcHandler = require("impl/latex/handler/func"), TYPE = require("impl/latex/define/type");
    return {
        "^": {
            name: "superscript",
            type: TYPE.OP,
            handler: scriptHandler,
            priority: 3
        },
        _: {
            name: "subscript",
            type: TYPE.OP,
            handler: scriptHandler,
            priority: 3
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
            handler: require("impl/latex/handler/summation")
        },
        "int": {
            name: "integration",
            type: TYPE.FN,
            handler: require("impl/latex/handler/integration")
        },
        brackets: {
            name: "brackets",
            type: "TYPE.FN",
            handler: require("impl/latex/handler/brackets")
        }
    };
});
/**
 * 预处理器列表
 */
define("impl/latex/define/pre", [ "impl/latex/pre/sqrt", "impl/latex/pre/int" ], function(require, exports, module) {
    return {
        // 方根预处理器
        sqrt: require("impl/latex/pre/sqrt"),
        // 积分预处理器
        "int": require("impl/latex/pre/int")
    };
});
/**
 * 操作符类型定义
 */
define("impl/latex/define/type", [], function(require, exports, module) {
    return {
        OP: 1,
        FN: 2
    };
});
/*!
 * 括号处理器
 */
define("impl/latex/handler/brackets", [ "impl/latex/define/brackets" ], function(require, exports, module) {
    var BRACKETS_TYPE = require("impl/latex/define/brackets");
    return function(info, processedStack, unprocessedStack) {
        // 括号验证
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
/*!
 * 合并处理(特殊处理函数)
 */
define("impl/latex/handler/combination", [], function(require, exports, module) {
    return function() {
        if (arguments[0].length === 0) {
            return null;
        }
        return {
            name: "combination",
            operand: arguments[0]
        };
    };
});
/*!
 * 分数函数处理器
 */
define("impl/latex/handler/fraction", [], function(require, exports, module) {
    // 处理函数接口
    return function(info, processedStack, unprocessedStack) {
        var numerator = unprocessedStack.shift(), // 分子
        denominator = unprocessedStack.shift();
        // 分母
        if (numerator === undefined || denominator === undefined) {
            throw new Error("Frac: Syntax Error");
        }
        info.operand = [ numerator, denominator ];
        delete info.handler;
        return info;
    };
});
/*!
 * 函数表达式处理器
 */
define("impl/latex/handler/func", [ "impl/latex/handler/lib/int-extract" ], function(require, exports, module) {
    var extractFn = require("impl/latex/handler/lib/int-extract");
    // 处理函数接口
    return function(info, processedStack, unprocessedStack) {
        var params = extractFn(unprocessedStack);
        info.operand = [ info.params, params.exp, params.sup, params.sub ];
        delete info.params;
        delete info.handler;
        return info;
    };
});
/*!
 * 积分函数处理器
 */
define("impl/latex/handler/integration", [ "impl/latex/handler/lib/int-extract" ], function(require, exports, module) {
    var extractFn = require("impl/latex/handler/lib/int-extract");
    return function(info, processedStack, unprocessedStack) {
        var count = unprocessedStack.shift(), params = extractFn(unprocessedStack);
        info.operand = [ params.exp, params.sup, params.sub ];
        // 参数配置调用
        info.callFn = {
            setType: [ count | 0 ]
        };
        delete info.handler;
        return info;
    };
});
/**
 * 积分参数提取函数
 */
define("impl/latex/handler/lib/int-extract", [], function(require, exports, module) {
    return function(units) {
        var sup = units.shift() || null, sub = null, exp = null;
        if (sup !== null) {
            if (typeof sup === "string") {
                exp = sup;
                sup = null;
            } else {
                if (sup.name === "superscript") {
                    sup = units.shift() || null;
                    if (sup) {
                        sub = units.shift() || null;
                        if (sub) {
                            if (sub.name === "subscript") {
                                sub = units.shift() || null;
                                exp = units.shift() || null;
                            } else {
                                exp = sub;
                                sub = null;
                            }
                        }
                    }
                } else if (sup.name === "subscript") {
                    sub = units.shift() || null;
                    if (sub) {
                        sup = units.shift() || null;
                        if (sup) {
                            if (sup.name === "superscript") {
                                sup = units.shift() || null;
                                exp = units.shift() || null;
                            } else {
                                exp = sup;
                                sup = null;
                            }
                        }
                    }
                } else {
                    exp = sup;
                    sup = null;
                }
            }
        }
        return {
            sub: sub,
            sup: sup,
            exp: exp
        };
    };
});
/*!
 * 上下标操作符函数处理
 */
define("impl/latex/handler/script", [], function(require, exports, module) {
    // 处理函数接口
    return function(info, processedStack, unprocessedStack) {
        var base = processedStack.pop(), script = unprocessedStack.shift() || null;
        if (!script) {
            throw new Error("Missing script");
        }
        if (base.name === info.name || base.name === "script") {
            throw new Error("script error");
        }
        // 执行替换
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
        // 删除处理器
        delete info.handler;
        return info;
    };
});
/*!
 * 方根函数处理器
 */
define("impl/latex/handler/sqrt", [], function(require, exports, module) {
    // 处理函数接口
    return function(info, processedStack, unprocessedStack) {
        var exponent = unprocessedStack.shift(), // 被开方数
        radicand = unprocessedStack.shift();
        info.operand = [ radicand, exponent ];
        delete info.handler;
        return info;
    };
});
/*!
 * 求和函数处理器
 */
define("impl/latex/handler/summation", [ "impl/latex/handler/lib/int-extract" ], function(require, exports, module) {
    var extractFn = require("impl/latex/handler/lib/int-extract");
    return function(info, processedStack, unprocessedStack) {
        var params = extractFn(unprocessedStack);
        info.operand = [ params.exp, params.sup, params.sub ];
        delete info.handler;
        return info;
    };
});
/**
 * Kity Formula Latex解析器实现
 */
define("impl/latex/latex", [ "parser", "impl/latex/base/latex-utils", "impl/latex/base/rpn", "impl/latex/base/tree", "impl/latex/define/pre", "impl/latex/pre/sqrt", "impl/latex/pre/int", "impl/latex/base/utils", "impl/latex/base/checker", "impl/latex/define/operator", "impl/latex/define/func", "impl/latex/handler/func" ], function(require, exports, module) {
    var Parser = require("parser").Parser, LatexUtils = require("impl/latex/base/latex-utils"), PRE_HANDLER = require("impl/latex/define/pre"), Utils = require("impl/latex/base/utils");
    // data
    var leftChar = "￸", rightChar = "￼", clearCharPattern = new RegExp(leftChar + "|" + rightChar, "g"), leftCharPattern = new RegExp(leftChar, "g"), rightCharPattern = new RegExp(rightChar, "g");
    Parser.register("latex", Parser.implement({
        parse: function(data) {
            var units = this.split(this.format(data));
            units = this.parseToGroup(units);
            units = this.parseToStruct(units);
            return this.generateTree(units);
        },
        // 格式化输入数据
        format: function(input) {
            // 清理多余的空格
            input = clearEmpty(input);
            // 处理输入的“{”和“}”
            input = input.replace(clearCharPattern, "").replace(/\\{/gi, leftChar).replace(/\\}/gi, rightChar);
            // 预处理器处理
            for (var key in PRE_HANDLER) {
                if (PRE_HANDLER.hasOwnProperty(key)) {
                    input = PRE_HANDLER[key](input);
                }
            }
            return input;
        },
        split: function(data) {
            var units = [], pattern = /(?:\\[a-z]+\s*)|(?:[{}]\s*)|(?:[^\\{}]\s*)/gi, emptyPattern = /^\s+|\s+$/g, match = null;
            data = data.replace(emptyPattern, "");
            while (match = pattern.exec(data)) {
                match = match[0].replace(emptyPattern, "");
                if (match) {
                    units.push(match);
                }
            }
            return units;
        },
        /**
         * 根据解析出来的语法单元生成树
         * @param units 单元
         * @return 生成的树对象
         */
        generateTree: function(units) {
            var tree = [], currentUnit = null;
            // 递归处理
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

                  // left-right分组
                    case "\\left":
                    bracketsCount++;
                    groupStack.push(group);
                    // 进入两层
                    group.push([ [] ]);
                    group = group[group.length - 1][0];
                    group.type = "brackets";
                    // 读取左括号
                    i++;
                    group.leftBrackets = units[i].replace(leftCharPattern, "{").replace(rightCharPattern, "}");
                    break;

                  case "\\right":
                    bracketsCount--;
                    // 读取右括号
                    i++;
                    group.rightBrackets = units[i].replace(leftCharPattern, "{").replace(rightCharPattern, "}");
                    group = groupStack.pop();
                    break;

                  default:
                    group.push(units[i].replace(leftCharPattern, "{").replace(rightCharPattern, "}"));
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
                        // 处理自动调整大小的括号组
                        // 获取括号组定义
                        structs.push(Utils.getBracketsDefine(units[i].leftBrackets, units[i].rightBrackets));
                        // 处理内部表达式
                        structs.push(this.parseToStruct(units[i]));
                    } else {
                        // 普通组
                        structs.push(this.parseToStruct(units[i]));
                    }
                } else {
                    structs.push(parseStruct(units[i]));
                }
            }
            return structs;
        }
    }));
    /**
     * 把序列化的字符串表示法转化为中间格式的结构化表示
     */
    function parseStruct(str) {
        var type = Utils.getLatexType(str);
        switch (type) {
          case "operator":
            return Utils.getDefine(str);

          case "function":
            return Utils.getFuncDefine(str);

          default:
            // text
            return transformSpecialCharacters(str);
        }
    }
    // 转换特殊的文本字符
    function transformSpecialCharacters(char) {
        if (char.indexOf("\\") === 0) {
            return char + "\\";
        }
        return char;
    }
    function clearEmpty(data) {
        return data.replace(/\\\s+/, "").replace(/\s*([^a-z0-9\s])\s*/gi, function(match, symbol) {
            return symbol;
        });
    }
});
/**
 * “开方”预处理器
 */
define("impl/latex/pre/int", [], function(require) {
    return function(input) {
        return input.replace(/\\(i+)nt(\b|[^a-zA-Z])/g, function(match, sign, suffix) {
            return "\\int " + sign.length + suffix;
        });
    };
});
/**
 * “开方”预处理器
 */
define("impl/latex/pre/sqrt", [], function(require) {
    return function(input) {
        return input.replace(/\\sqrt\s*((?:\[[^\]]*\])?)/g, function(match, exponent) {
            return "\\sqrt{" + exponent.replace(/^\[|\]$/g, "") + "}";
        });
    };
});
/*!
 * Kity Formula 公式表示法Parser接口
 */
define("parser", [], function(require, exports, module) {
    // Parser 配置列表
    var CONF = {}, IMPL_POLL = {}, // 内部简单工具类
    Utils = {
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
                // 配置项类型错误
                throw new Error("invalid option");
            }
        }
    };
    /**
     * 解析器
     */
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
        /**
         * 注册解析器实现
         * @param type 解析器所属类型
         * @param parserImpl 解析器实现
         */
        register: function(type, parserImpl) {
            IMPL_POLL[type.toLowerCase()] = parserImpl;
            return this;
        },
        // 提供构造器的实现的默认结构
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
        /**
         * 代理给定的parser实现
         * @private
         * @param parserImpl 需代理的parser实现
         */
        proxy: function(parserImpl) {
            return new ParserProxy(parserImpl);
        }
    };
    /**
     * parser实现的代理对象， 所有实现均通过该代理对象对外提供统一接口
     * @constructor
     * @param parserImpl 需代理的对象
     */
    function ParserProxy(parserImpl) {
        this.impl = new parserImpl();
        this.conf = {};
    }
    Utils.extend(ParserProxy.prototype, {
        config: function(key, value) {
            Utils.setData(this.conf, key, value);
        },
        /**
         * 设置特定解析器实现所需的配置项，参数也可以是一个Key-Value Mapping
         * @param key 配置项名称
         * @param value 配置项值
         */
        set: function(key, value) {
            this.impl.set(key, value);
        },
        parse: function(data) {
            var result = {
                config: {},
                // 调用实现获取解析树
                tree: this.impl.parse(data)
            };
            Utils.extend(result.config, CONF, this.conf);
            return result;
        }
    });
    /**
     * 解析器所需实现的接口
     * @constructor
     */
    function ParserInterface() {
        this.conf = {};
    }
    Utils.extend(ParserInterface.prototype, {
        set: function(key, value) {
            Utils.extend(this.conf, key, value);
        },
        /**
         * 需要特定解析器实现， 该方法是解析器的核心方法，解析器的实现者应该完成该方法对给定数据进行解析
         * @param data 待解析的数据
         * @return 解析树， 具体格式庆参考Kity Formula Parser 的文档
         */
        parse: function(data) {
            throw new Error("Abstract function");
        }
    });
    // exports
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
