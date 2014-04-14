/*!
 * ====================================================
 * Kityformula-Editor - v1.0.0 - 2014-04-14
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
 * Created by hn on 14-3-17.
 */
define("base/common", [], function(require) {
    // copy保护
    var MAX_COPY_DEEP = 10, commonUtils = {
        extend: function(target, source) {
            var isDeep = false;
            if (typeof target === "boolean") {
                isDeep = target;
                target = source;
                source = [].splice.call(arguments, 2);
            } else {
                source = [].splice.call(arguments, 1);
            }
            if (!target) {
                throw new Error("Utils: extend, target can not be empty");
            }
            commonUtils.each(source, function(src) {
                if (src && typeof src === "object" || typeof src === "function") {
                    copy(isDeep, target, src);
                }
            });
            return target;
        },
        isArray: function(obj) {
            return obj && {}.toString.call(obj) === "[object Array]";
        },
        isString: function(obj) {
            return typeof obj === "string";
        },
        proxy: function(fn, context) {
            return function() {
                return fn.apply(context, arguments);
            };
        },
        each: function(obj, fn) {
            if (!obj) {
                return;
            }
            if ("length" in obj && typeof obj.length === "number") {
                for (var i = 0, len = obj.length; i < len; i++) {
                    if (fn.call(null, obj[i], i, obj) === false) {
                        break;
                    }
                }
            } else {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (fn.call(null, obj[key], key, obj) === false) {
                            break;
                        }
                    }
                }
            }
        }
    };
    function copy(isDeep, target, source, count) {
        count = count | 0;
        if (count > MAX_COPY_DEEP) {
            return source;
        }
        count++;
        commonUtils.each(source, function(value, index, origin) {
            if (isDeep) {
                if (!value || typeof value !== "object" && typeof value !== "function") {
                    target[index] = value;
                } else {
                    target[index] = target[index] || (commonUtils.isArray(value) ? [] : {});
                    target[index] = copy(isDeep, target[index], value, count);
                }
            } else {
                target[index] = value;
            }
        });
        return target;
    }
    return commonUtils;
});
/**
 * Created by hn on 14-3-17.
 */
define("base/event/event", [ "base/event/kfevent", "base/common" ], function(require, exports, modules) {
    var EVENT_LISTENER = {}, eid = 0, Utils = this, BEFORE_RESULT = true, KFEvent = require("base/event/kfevent"), commonUtils = require("base/common"), EVENT_HANDLER = function(e) {
        var type = e.type, target = e.target, eid = this.__kfe_eid, hasAutoTrigger = /^(?:before|after)/.test(type), HANDLER_LIST = EVENT_LISTENER[eid][type];
        if (!hasAutoTrigger) {
            EventListener.trigger(target, "before" + type);
            if (BEFORE_RESULT === false) {
                BEFORE_RESULT = true;
                return false;
            }
        }
        commonUtils.each(HANDLER_LIST, function(handler, index) {
            if (!handler) {
                return;
            }
            if (handler.call(target, e) === false) {
                BEFORE_RESULT = false;
                return BEFORE_RESULT;
            }
        });
        if (!hasAutoTrigger) {
            EventListener.trigger(target, "after" + type);
        }
    };
    var EventListener = {
        addEvent: function(target, type, handler) {
            var hasHandler = true, eventCache = null;
            if (!target.__kfe_eid) {
                hasHandler = false;
                target.__kfe_eid = generateId();
                EVENT_LISTENER[target.__kfe_eid] = {};
            }
            eventCache = EVENT_LISTENER[target.__kfe_eid];
            if (!eventCache[type]) {
                hasHandler = false;
                eventCache[type] = [];
            }
            eventCache[type].push(handler);
            if (hasHandler) {
                return;
            }
            target.addEventListener(type, EVENT_HANDLER, false);
        },
        trigger: function(target, type, e) {
            e = e || KFEvent.createEvent(type, e);
            target.dispatchEvent(e);
        }
    };
    function generateId() {
        return ++eid;
    }
    return EventListener;
});
/**
 * Created by hn on 14-3-17.
 */
define("base/event/kfevent", [], function(require) {
    return {
        createEvent: function(type, e) {
            var evt = document.createEvent("Event");
            evt.initEvent(type, true, true);
            return evt;
        }
    };
});
/*!
 * 基础工具包
 */
define("base/utils", [ "base/common", "base/event/event", "base/event/kfevent" ], function(require) {
    var Utils = {}, commonUtils = require("base/common");
    commonUtils.extend(Utils, commonUtils, require("base/event/event"));
    return Utils;
});
/*!
 * 编辑器主体结构
 */
define("editor/editor", [ "kity", "base/utils", "base/common", "base/event/event" ], function(require) {
    var kity = require("kity"), Utils = require("base/utils"), defaultOpt = {
        controller: {
            zoom: true,
            maxzoom: 5,
            minzoom: .5
        },
        formula: {
            fontsize: 50,
            autoresize: false
        }
    };
    var COMPONENTS = {};
    var KFEditor = kity.createClass("KFEditor", {
        constructor: function(container, opt) {
            this.options = Utils.extend(true, {}, defaultOpt, opt);
            this.container = container;
            this.services = {};
            this.commands = {};
            this.initComponents();
        },
        getContainer: function() {
            return this.container;
        },
        getOptions: function() {
            return this.options;
        },
        initComponents: function() {
            var _self = this;
            Utils.each(COMPONENTS, function(component) {
                new component(_self);
            });
        },
        requestService: function(serviceName, args) {
            var serviceObject = getService.call(this, serviceName);
            return serviceObject.service[serviceObject.key].apply(serviceObject.provider, [].slice.call(arguments, 1));
        },
        request: function(serviceName) {
            var serviceObject = getService.call(this, serviceName);
            return serviceObject.service;
        },
        registerService: function(serviceName, provider, serviceObject) {
            var key = null;
            for (key in serviceObject) {
                if (serviceObject[key] && serviceObject.hasOwnProperty(key)) {
                    serviceObject[key] = Utils.proxy(serviceObject[key], provider);
                }
            }
            this.services[serviceName] = {
                provider: provider,
                key: key,
                service: serviceObject
            };
        },
        registerCommand: function(commandName, executor, execFn) {
            this.commands[commandName] = {
                executor: executor,
                execFn: execFn
            };
        },
        execCommand: function(commandName, args) {
            var commandObject = this.commands[commandName];
            if (!commandObject) {
                throw new Error("KFEditor: not found command, " + commandName);
            }
            return commandObject.execFn.apply(commandObject.executor, [].slice.call(arguments, 1));
        }
    });
    function getService(serviceName) {
        var serviceObject = this.services[serviceName];
        if (!serviceObject) {
            throw new Error("KFEditor: not found service, " + serviceName);
        }
        return serviceObject;
    }
    Utils.extend(KFEditor, {
        registerComponents: function(name, component) {
            COMPONENTS[name] = component;
        }
    });
    return KFEditor;
});
/**
 * Created by hn on 14-3-31.
 */
define("jquery", [], function() {
    return window.jQuery;
});
/**
 * Created by hn on 14-3-18.
 */
define("kf-ext/def", [], function() {
    return {
        selectColor: "rgba(42, 106, 189, 0.2)",
        allSelectColor: "rgba(42, 106, 189, 0.6)"
    };
});
/**
 * 占位符表达式， 扩展KF自有的Empty表达式
 */
define("kf-ext/expression/placeholder", [ "kity", "kf", "kf-ext/operator/placeholder", "kf-ext/def" ], function(require, exports, module) {
    var kity = require("kity"), kf = require("kf"), PlaceholderOperator = require("kf-ext/operator/placeholder");
    return kity.createClass("PlaceholderExpression", {
        base: kf.CompoundExpression,
        constructor: function() {
            this.callBase();
            this.setFlag("Placeholder");
            this.box.setAttr("data-type", null);
            this.setOperator(new PlaceholderOperator());
        },
        select: function() {
            this.getOperator().select();
        },
        selectAll: function() {
            this.getOperator().selectAll();
        },
        unselect: function() {
            this.getOperator().unselect();
        }
    });
});
/**
 * 公式扩展接口
 */
define("kf-ext/extension", [ "kf", "kity", "kf-ext/def", "kf-ext/expression/placeholder", "kf-ext/operator/placeholder" ], function(require) {
    var kf = require("kf"), kity = require("kity"), SELECT_COLOR = require("kf-ext/def").selectColor, ALL_SELECT_COLOR = require("kf-ext/def").allSelectColor;
    function ext(parser) {
        kf.PlaceholderExpression = require("kf-ext/expression/placeholder");
        kf.Expression.prototype.select = function() {
            this.box.fill(SELECT_COLOR);
        };
        kf.Expression.prototype.selectAll = function() {
            this.box.fill(ALL_SELECT_COLOR);
        };
        kf.Expression.prototype.unselect = function() {
            this.box.fill("transparent");
        };
        // 扩展解析和逆解析
        parser.getKFParser().expand({
            parse: {
                placeholder: {
                    name: "placeholder",
                    handler: function(info) {
                        delete info.handler;
                        info.operand = [];
                        return info;
                    },
                    sign: false
                }
            },
            reverse: {
                placeholder: function() {
                    return "\\placeholder";
                }
            }
        });
    }
    return {
        ext: ext
    };
});
/**
 * 占位符操作符
 */
define("kf-ext/operator/placeholder", [ "kity", "kf-ext/def", "kf" ], function(require, exports, modules) {
    var kity = require("kity"), SELECT_COLOR = require("kf-ext/def").selectColor, ALL_SELECT_COLOR = require("kf-ext/def").allSelectColor;
    return kity.createClass("PlaceholderOperator", {
        base: require("kf").Operator,
        constructor: function() {
            this.opShape = null;
            this.callBase("Placeholder");
        },
        applyOperand: function() {
            this.setBoxSize(17, 27);
            this.opShape = generateOPShape();
            this.addOperatorShape(this.opShape);
        },
        select: function() {
            this.opShape.fill(SELECT_COLOR);
        },
        selectAll: function() {
            this.opShape.fill(ALL_SELECT_COLOR);
        },
        unselect: function() {
            this.opShape.fill("transparent");
        }
    });
    function generateOPShape() {
        var w = 13, h = 17, shape = null;
        shape = new kity.Rect(w, h, 0, 0).stroke("black").fill("transparent").translate(2, 6);
        shape.setAttr("stroke-dasharray", "1, 2");
        return shape;
    }
});
/**
 * Created by hn on 14-3-12.
 */
define("kf", [], function() {
    return window.kf;
});
/**
 * 数学公式Latex语法解析器
 */
define("kity", [], function() {
    return window.kity;
});
/**
 * 定义了一个转换对照表
 */
define("parse/def", [], function() {
    return {
        radical: true,
        fraction: true,
        summation: true,
        integration: true,
        placeholder: true,
        script: true,
        superscript: true,
        subscript: true,
        brackets: true
    };
});
/**
 * 数学公式解析器
 */
define("parse/parser", [ "kf", "kity", "parse/def", "kf-ext/extension", "kf-ext/def", "kf-ext/expression/placeholder" ], function(require) {
    var KFParser = require("kf").Parser, kity = require("kity"), COMPARISON_TABLE = require("parse/def"), PID_PREFIX = "_kf_editor_", GROUP_TYPE = "kf-editor-group", V_GROUP_TYPE = "kf-editor-virtual-group", PID = 0;
    var Parser = kity.createClass("Parser", {
        constructor: function(kfEditor) {
            this.kfEditor = kfEditor;
            this.callBase();
            // kityformula 解析器
            this.kfParser = KFParser.use("latex");
            this.initKFormulExtension();
            this.pid = generateId();
            this.groupRecord = 0;
            this.tree = null;
            this.isResetId = true;
            this.initServices();
        },
        parse: function(str, isResetId) {
            var parsedResult = null;
            this.isResetId = !!isResetId;
            if (this.isResetId) {
                this.resetGroupId();
            }
            parsedResult = this.kfParser.parse(str);
            // 对解析出来的结果树做适当的处理，使得编辑器能够更容易地识别当前表达式的语义
            supplementTree(this, parsedResult.tree);
            return parsedResult;
        },
        // 序列化， parse的逆过程
        serialization: function(tree) {
            return this.kfParser.serialization(tree);
        },
        initServices: function() {
            this.kfEditor.registerService("parser.parse", this, {
                parse: this.parse
            });
            this.kfEditor.registerService("parser.latex.serialization", this, {
                serialization: this.serialization
            });
        },
        getKFParser: function() {
            return this.kfParser;
        },
        // 初始化KF扩展
        initKFormulExtension: function() {
            require("kf-ext/extension").ext(this);
        },
        resetGroupId: function() {
            this.groupRecord = 0;
        },
        getGroupId: function() {
            return this.pid + "_" + ++this.groupRecord;
        }
    });
    // 把解析树丰富成公式编辑器的语义树, 该语义化的树同时也是合法的解析树
    function supplementTree(parser, tree, parentTree) {
        var currentOperand = null, // 只有根节点才没有parentTree
        isRoot = !parentTree;
        tree.attr = tree.attr || {};
        tree.attr.id = parser.getGroupId();
        // 组类型已经存在则不用再处理
        if (!tree.attr["data-type"]) {
            tree.attr["data-type"] = GROUP_TYPE;
            if (COMPARISON_TABLE[tree.name]) {
                tree.attr["data-type"] = V_GROUP_TYPE;
            }
        }
        if (isRoot) {
            // 如果isResetId为false， 表示当前生成的是子树
            // 则不做data-root标记， 同时更改该包裹的类型为V_GROUP_TYPE
            if (!parser.isResetId) {
                tree.attr["data-type"] = V_GROUP_TYPE;
            } else {
                tree.attr["data-root"] = "true";
            }
        }
        if (tree.name === "brackets") {
            tree.attr["data-brackets"] = "true";
        }
        for (var i = 0, len = tree.operand.length; i < len; i++) {
            currentOperand = tree.operand[i];
            if (!currentOperand) {
                tree.operand[i] = currentOperand;
            } else {
                if (COMPARISON_TABLE[tree.name]) {
                    if (typeof currentOperand === "string") {
                        // brackets树的前两个节点不用处理
                        if (tree.name !== "brackets" || i > 1) {
                            tree.operand[i] = {
                                name: "combination",
                                operand: [ currentOperand ],
                                attr: {
                                    id: parser.getGroupId(),
                                    "data-type": GROUP_TYPE
                                }
                            };
                        }
                    } else {
                        // 包裹函数的参数
                        if (currentOperand.name !== "combination") {
                            tree.operand[i] = {
                                name: "combination",
                                operand: [ null ],
                                attr: {
                                    id: parser.getGroupId(),
                                    "data-type": GROUP_TYPE
                                }
                            };
                            // 占位符特殊处理
                            if (currentOperand.name === "placeholder") {
                                tree.operand[i].operand[0] = {
                                    name: "combination",
                                    operand: [ currentOperand ],
                                    attr: {
                                        id: parser.getGroupId(),
                                        "data-type": GROUP_TYPE,
                                        "data-placeholder": "true"
                                    }
                                };
                                currentOperand.attr = {
                                    id: parser.getGroupId()
                                };
                            } else {
                                tree.operand[i].operand[0] = supplementTree(parser, currentOperand, tree.operand[i]);
                            }
                        } else {
                            currentOperand.attr = {
                                "data-type": GROUP_TYPE
                            };
                            tree.operand[i] = supplementTree(parser, currentOperand, tree);
                        }
                    }
                } else {
                    if (typeof currentOperand === "string") {
                        tree.operand[i] = currentOperand;
                    } else {
                        //                        // 重置组类型
                        //                        if ( !isRoot && tree.operand.length === 1 ) {
                        //                            tree.attr[ "data-type" ] = V_GROUP_TYPE;
                        //                        }
                        // 占位符附加包裹
                        if (currentOperand.name === "placeholder") {
                            tree.operand[i] = {
                                name: "combination",
                                operand: [ currentOperand ],
                                attr: {
                                    id: parser.getGroupId(),
                                    "data-type": GROUP_TYPE,
                                    "data-placeholder": "true"
                                }
                            };
                            currentOperand.attr = {
                                id: parser.getGroupId()
                            };
                        } else {
                            tree.operand[i] = supplementTree(parser, currentOperand, tree);
                        }
                    }
                }
            }
        }
        return tree;
    }
    function generateId() {
        return PID_PREFIX + ++PID;
    }
    return Parser;
});
/*!
 * 定位模块
 */
define("position/position", [ "kity" ], function(require) {
    var kity = require("kity"), // 表达式的内容组"标签"
    CONTENT_DATA_TYPE = "kf-editor-exp-content-box", PositionComponenet = kity.createClass("PositionComponenet", {
        constructor: function(kfEditor) {
            this.kfEditor = kfEditor;
            this.initServices();
        },
        initServices: function() {
            this.kfEditor.registerService("position.get.group", this, {
                getGroupByTarget: this.getGroupByTarget
            });
            this.kfEditor.registerService("position.get.parent.group", this, {
                getParentGroupByTarget: this.getParentGroupByTarget
            });
            this.kfEditor.registerService("position.get.wrap", this, {
                getWrap: this.getWrap
            });
            this.kfEditor.registerService("position.get.group.info", this, {
                getGroupInfoByNode: this.getGroupInfoByNode
            });
            this.kfEditor.registerService("position.get.parent.info", this, {
                getParentInfoByNode: this.getParentInfoByNode
            });
        },
        getGroupByTarget: function(target) {
            var groupDom = getGroup(target, false, false);
            if (groupDom) {
                return this.kfEditor.requestService("syntax.get.group.content", groupDom.id);
            }
            return null;
        },
        getParentGroupByTarget: function(target) {
            var groupDom = getGroup(target, true, false);
            if (groupDom) {
                return this.kfEditor.requestService("syntax.get.group.content", groupDom.id);
            }
            return null;
        },
        getWrap: function(node) {
            return getGroup(node, true, true);
        },
        /**
             * 给定一个节点， 获取其节点所属的组及其在该组内的偏移
             * @param target 目标节点
             */
        getGroupInfoByNode: function(target) {
            var result = null, oldTarget = null;
            oldTarget = target;
            while (target = getGroup(target, true, false)) {
                if (target.getAttribute("data-type") === "kf-editor-group") {
                    break;
                }
                oldTarget = target;
            }
            result = {
                group: this.kfEditor.requestService("syntax.get.group.content", target.id)
            };
            result.index = result.group.content.indexOf(oldTarget);
            return result;
        },
        /**
             * 给定一个节点， 获取其节点所属的直接包含组及其在该直接包含组内的偏移
             * @param target 目标节点
             */
        getParentInfoByNode: function(target) {
            var group = getGroup(target, true, false);
            group = this.kfEditor.requestService("syntax.get.group.content", group.id);
            return {
                group: group,
                index: group.content.indexOf(target)
            };
        }
    });
    /**
     * 获取给定节点元素所属的组
     * @param node 当前点击的节点
     * @param isAllowVirtual 是否允许选择虚拟组
     * @param isAllowWrap 是否允许选择目标节点的最小包裹单位
     * @returns {*}
     */
    function getGroup(node, isAllowVirtual, isAllowWrap) {
        var tagName = null;
        if (!node.ownerSVGElement) {
            return null;
        }
        node = node.parentNode;
        tagName = node.tagName.toLowerCase();
        if (node && tagName !== "body" && tagName !== "svg") {
            if (node.getAttribute("data-type") === "kf-editor-group") {
                return node;
            }
            if (isAllowVirtual && node.getAttribute("data-type") === "kf-editor-virtual-group") {
                return node;
            }
            if (isAllowWrap && node.getAttribute("data-flag") !== null) {
                return node;
            }
            return getGroup(node, isAllowVirtual, isAllowWrap);
        } else {
            return null;
        }
    }
    function getWrap(isAllowWrap) {}
    return PositionComponenet;
});
/**
 * Created by hn on 14-3-17.
 */
define("render/render", [ "kity", "kf" ], function(require) {
    var kity = require("kity"), Assembly = require("kf").Assembly, DEFAULT_OPTIONS = {
        autoresize: false,
        fontsize: 30,
        padding: [ 20, 50 ]
    }, RenderComponenet = kity.createClass("RenderComponent", {
        constructor: function(kfEditor) {
            this.kfEditor = kfEditor;
            this.assembly = null;
            this.formula = null;
            this.canvasZoom = 1;
            this.record = {
                select: {},
                cursor: {}
            };
            this.initCanvas();
            this.initServices();
            this.initCommands();
        },
        initCanvas: function() {
            var canvasContainer = this.kfEditor.requestService("ui.get.canvas.container");
            this.assembly = Assembly.use(canvasContainer, DEFAULT_OPTIONS);
            this.formula = this.assembly.formula;
        },
        initServices: function() {
            this.kfEditor.registerService("render.relocation", this, {
                relocation: this.relocation
            });
            this.kfEditor.registerService("render.select.group.content", this, {
                selectGroupContent: this.selectGroupContent
            });
            this.kfEditor.registerService("render.select.group", this, {
                selectGroup: this.selectGroup
            });
            this.kfEditor.registerService("render.select.group.all", this, {
                selectAllGroup: this.selectAllGroup
            });
            this.kfEditor.registerService("render.select.current.cursor", this, {
                selectCurrentCursor: this.selectCurrentCursor
            });
            this.kfEditor.registerService("render.reselect", this, {
                reselect: this.reselect
            });
            this.kfEditor.registerService("render.clear.select", this, {
                clearSelect: this.clearSelect
            });
            this.kfEditor.registerService("render.set.canvas.zoom", this, {
                setCanvasZoom: this.setCanvasZoom
            });
            this.kfEditor.registerService("render.get.canvas.zoom", this, {
                getCanvasZoom: this.getCanvasZoom
            });
            this.kfEditor.registerService("render.get.paper.offset", this, {
                getPaperOffset: this.getPaperOffset
            });
            this.kfEditor.registerService("render.draw", this, {
                render: this.render
            });
            this.kfEditor.registerService("render.insert.string", this, {
                insertString: this.insertString
            });
            this.kfEditor.registerService("render.insert.group", this, {
                insertGroup: this.insertGroup
            });
            this.kfEditor.registerService("render.get.paper", this, {
                getPaper: this.getPaper
            });
        },
        initCommands: function() {
            this.kfEditor.registerCommand("render", this, this.render);
            this.kfEditor.registerCommand("getPaper", this, this.getPaper);
        },
        relocation: function() {
            var formulaSpace = this.formula.container.getRenderBox(), viewPort = this.formula.getViewPort();
            viewPort.center.x = formulaSpace.width / 2;
            viewPort.center.y = formulaSpace.height / 2;
            this.formula.setViewPort(viewPort);
        },
        selectGroup: function(groupId) {
            var groupObject = this.kfEditor.requestService("syntax.get.group.object", groupId), isPlaceholder = this.kfEditor.requestService("syntax.valid.placeholder", groupId);
            this.clearSelect();
            if (groupObject.node.getAttribute("data-root")) {
                // 根节点不着色
                return;
            }
            // 占位符着色
            if (isPlaceholder) {
                // 替换占位符包裹组为占位符本身
                groupObject = this.kfEditor.requestService("syntax.get.group.object", groupObject.operands[0].node.id);
            }
            this.record.select.lastSelect = groupObject;
            groupObject.select();
        },
        selectGroupContent: function(group) {
            // 处理占位符
            if (group.groupObj.getAttribute("data-placeholder") !== null) {
                group = {
                    id: group.content[0].id
                };
            }
            var groupObject = this.kfEditor.requestService("syntax.get.group.object", group.id);
            this.clearSelect();
            this.record.select.lastSelect = groupObject;
            if (groupObject.node.getAttribute("data-root")) {
                // 根节点不着色
                return;
            }
            groupObject.select();
        },
        selectAllGroup: function(group) {
            // 处理占位符
            if (group.groupObj.getAttribute("data-placeholder") !== null) {
                group = {
                    id: group.content[0].id
                };
            }
            var groupObject = this.kfEditor.requestService("syntax.get.group.object", group.id);
            this.clearSelect();
            this.record.select.lastSelect = groupObject;
            groupObject.selectAll();
        },
        selectCurrentCursor: function() {
            var cursorInfo = this.kfEditor.requestService("syntax.get.record.cursor"), group = this.kfEditor.requestService("syntax.get.group.object", cursorInfo.groupId), box = null, offset = -1, width = 0, height = group.getRenderBox().height, startIndex = Math.min(cursorInfo.startOffset, cursorInfo.endOffset), endIndex = Math.max(cursorInfo.startOffset, cursorInfo.endOffset);
            this.clearSelect();
            // 更新记录
            this.record.select.lastSelect = group;
            for (var i = startIndex, len = endIndex; i < len; i++) {
                box = group.getOperand(i).getRenderBox();
                if (offset == -1) {
                    offset = box.x;
                }
                width += box.width;
            }
            group.setBoxSize(width, height);
            group.selectAll();
            group.getBox().translate(offset, 0);
        },
        reselect: function() {
            var cursorInfo = this.kfEditor.requestService("syntax.get.record.cursor"), groupObject = null;
            groupObject = this.kfEditor.requestService("syntax.get.group.object", cursorInfo.groupId);
            this.clearSelect();
            this.record.select.lastSelect = groupObject;
            if (groupObject.node.getAttribute("data-root")) {
                // 根节点不着色
                return;
            }
            groupObject.select();
        },
        clearSelect: function() {
            var box = null, transform = null, currentSelect = this.record.select.lastSelect;
            if (!currentSelect) {
                return;
            }
            currentSelect.unselect();
            box = currentSelect.getRenderBox();
            currentSelect.setBoxSize(box.width, box.height);
            transform = currentSelect.getBox().getTransform();
            if (transform) {
                transform.m.e = 0;
                transform.m.f = 0;
            }
            currentSelect.getBox().setTransform(transform);
        },
        getPaper: function() {
            return this.formula;
        },
        render: function(latexStr) {
            var parsedTree = this.kfEditor.requestService("parser.parse", latexStr, true), objTree = this.assembly.regenerateBy(parsedTree);
            // 更新语法模块所维护的树
            this.kfEditor.requestService("syntax.update.objtree", objTree);
            this.relocation();
        },
        setCanvasZoom: function(zoom) {
            var viewPort = this.formula.getViewPort();
            this.canvasZoom = zoom;
            viewPort.zoom = zoom;
            this.formula.setViewPort(viewPort);
        },
        getCanvasZoom: function() {
            return this.canvasZoom;
        }
    });
    return RenderComponenet;
});
/*！
 * 光标控制
 */
define("syntax/move", [ "kity" ], function(require, exports, module) {
    var kity = require("kity"), DIRECTION = {
        LEFT: "left",
        RIGHT: "right"
    };
    return kity.createClass("MoveComponent", {
        constructor: function(parentComponent, kfEditor) {
            this.parentComponent = parentComponent;
            this.kfEditor = kfEditor;
        },
        leftMove: function() {
            var cursorInfo = this.parentComponent.getCursorRecord();
            cursorInfo = updateCursorGoLeft.call(this, cursorInfo);
            // cursorInfo 为null则不用处理
            if (cursorInfo) {
                this.parentComponent.updateCursor(cursorInfo.groupId, cursorInfo.startOffset, cursorInfo.endOffset);
            }
        },
        rightMove: function() {
            var cursorInfo = this.parentComponent.getCursorRecord();
            cursorInfo = updateCursorGoRight.call(this, cursorInfo);
            // cursorInfo 为null则不用处理
            if (cursorInfo) {
                this.parentComponent.updateCursor(cursorInfo.groupId, cursorInfo.startOffset, cursorInfo.endOffset);
            }
        }
    });
    function updateCursorGoLeft(cursorInfo) {
        var prevGroupNode = null, syntaxComponent = this.parentComponent, containerInfo = null;
        if (cursorInfo.startOffset === cursorInfo.endOffset) {
            containerInfo = syntaxComponent.getGroupContent(cursorInfo.groupId);
            if (isPlaceholderNode(containerInfo.groupObj)) {
                return locateOuterIndex(this, containerInfo.groupObj, DIRECTION.LEFT);
            }
            if (cursorInfo.startOffset > 0) {
                prevGroupNode = containerInfo.content[cursorInfo.startOffset - 1];
                if (isGroupNode(prevGroupNode)) {
                    cursorInfo = locateIndex(this, prevGroupNode, DIRECTION.LEFT);
                } else {
                    cursorInfo.startOffset -= 1;
                    cursorInfo.endOffset = cursorInfo.startOffset;
                }
            } else {
                cursorInfo = locateOuterIndex(this, containerInfo.groupObj, DIRECTION.LEFT);
            }
        } else {
            cursorInfo.startOffset = Math.min(cursorInfo.startOffset, cursorInfo.endOffset);
            // 收缩
            cursorInfo.endOffset = cursorInfo.startOffset;
        }
        return cursorInfo;
    }
    function updateCursorGoRight(cursorInfo) {
        var nextGroupNode = null, syntaxComponent = this.parentComponent, containerInfo = null;
        if (cursorInfo.startOffset === cursorInfo.endOffset) {
            containerInfo = syntaxComponent.getGroupContent(cursorInfo.groupId);
            if (isPlaceholderNode(containerInfo.groupObj)) {
                return locateOuterIndex(this, containerInfo.groupObj, DIRECTION.RIGHT);
            }
            if (cursorInfo.startOffset < containerInfo.content.length) {
                nextGroupNode = containerInfo.content[cursorInfo.startOffset];
                // 进入容器内部
                if (isGroupNode(nextGroupNode)) {
                    cursorInfo = locateIndex(this, nextGroupNode, DIRECTION.RIGHT);
                } else {
                    cursorInfo.startOffset += 1;
                    cursorInfo.endOffset = cursorInfo.startOffset;
                }
            } else {
                cursorInfo = locateOuterIndex(this, containerInfo.groupObj, DIRECTION.RIGHT);
            }
        } else {
            cursorInfo.endOffset = Math.max(cursorInfo.startOffset, cursorInfo.endOffset);
            // 收缩
            cursorInfo.startOffset = cursorInfo.endOffset;
        }
        return cursorInfo;
    }
    /**
     * 组内寻址, 入组
     */
    function locateIndex(moveComponent, groupNode, dir) {
        switch (dir) {
          case DIRECTION.LEFT:
            return locateLeftIndex(moveComponent, groupNode);

          case DIRECTION.RIGHT:
            return locateRightIndex(moveComponent, groupNode);
        }
        throw new Error("undefined move direction!");
    }
    /**
     * 组外寻址, 出组
     */
    function locateOuterIndex(moveComponent, groupNode, dir) {
        switch (dir) {
          case DIRECTION.LEFT:
            return locateOuterLeftIndex(moveComponent, groupNode);

          case DIRECTION.RIGHT:
            return locateOuterRightIndex(moveComponent, groupNode);
        }
        throw new Error("undefined move direction!");
    }
    // 左移内部定位
    function locateLeftIndex(moveComponent, groupNode) {
        var syntaxComponent = moveComponent.parentComponent, groupInfo = null, groupElement = null;
        if (isPlaceholderNode(groupNode) || isEmptyNode(groupNode)) {
            return locateOuterLeftIndex(moveComponent, groupNode);
        }
        if (isGroupNode(groupNode)) {
            groupInfo = syntaxComponent.getGroupContent(groupNode.id);
            // 容器内部中末尾的元素
            groupElement = groupInfo.content[groupInfo.content.length - 1];
            // 空检测
            if (isEmptyNode(groupElement)) {
                // 做跳出处理
                return locateOuterLeftIndex(moveComponent, groupElement);
            }
            // 待定位的组本身就是一个容器, 则检测其内部结构是否还包含容器
            if (isContainerNode(groupNode)) {
                // 进入到占位符包裹容器内
                if (isPlaceholderNode(groupElement)) {
                    return {
                        groupId: groupElement.id,
                        startOffset: 0,
                        endOffset: 0
                    };
                } else if (isContainerNode(groupElement) && groupInfo.content.length === 1) {
                    return locateLeftIndex(moveComponent, groupElement);
                }
                return {
                    groupId: groupNode.id,
                    startOffset: groupInfo.content.length,
                    endOffset: groupInfo.content.length
                };
            } else {
                while (!isContainerNode(groupElement) && !isEmptyNode(groupElement) && !isPlaceholderNode(groupElement)) {
                    groupInfo = syntaxComponent.getGroupContent(groupElement.id);
                    groupElement = groupInfo.content[groupInfo.content.length - 1];
                }
                if (isEmptyNode(groupElement)) {
                    return locateOuterLeftIndex(moveComponent, groupElement);
                }
                if (isPlaceholderNode(groupElement)) {
                    return {
                        groupId: groupElement.id,
                        startOffset: groupInfo.content.length,
                        endOffset: groupInfo.content.length
                    };
                }
                return locateLeftIndex(moveComponent, groupElement);
            }
        }
        return null;
    }
    // 左移外部定位
    function locateOuterLeftIndex(moveComponent, groupNode) {
        var kfEditor = moveComponent.kfEditor, syntaxComponent = moveComponent.parentComponent, outerGroupInfo = null, groupInfo = null;
        // 根容器， 不用再跳出
        if (isRootNode(groupNode)) {
            return null;
        }
        outerGroupInfo = kfEditor.requestService("position.get.parent.info", groupNode);
        while (outerGroupInfo.index === 0) {
            if (isRootNode(outerGroupInfo.group.groupObj)) {
                return {
                    groupId: outerGroupInfo.group.id,
                    startOffset: 0,
                    endOffset: 0
                };
            }
            // 如果父组是一个容器， 并且该容器包含不止一个节点， 则跳到父组开头
            if (isContainerNode(outerGroupInfo.group.groupObj) && outerGroupInfo.group.content.length > 1) {
                return {
                    groupId: outerGroupInfo.group.id,
                    startOffset: 0,
                    endOffset: 0
                };
            }
            outerGroupInfo = kfEditor.requestService("position.get.parent.info", outerGroupInfo.group.groupObj);
        }
        groupNode = outerGroupInfo.group.content[outerGroupInfo.index - 1];
        // 定位到的组是一个容器， 则定位到容器尾部
        if (isGroupNode(groupNode)) {
            // 容器节点
            if (isContainerNode(groupNode)) {
                // 进入容器内部
                return locateLeftIndex(moveComponent, groupNode);
            } else {
                return locateLeftIndex(moveComponent, groupNode);
            }
            return {
                groupId: groupNode.id,
                startOffset: groupInfo.content.length,
                endOffset: groupInfo.content.length
            };
        }
        if (isEmptyNode(groupNode)) {
            return locateOuterLeftIndex(moveComponent, groupNode);
        }
        return {
            groupId: outerGroupInfo.group.id,
            startOffset: outerGroupInfo.index,
            endOffset: outerGroupInfo.index
        };
    }
    // 右移内部定位
    function locateRightIndex(moveComponent, groupNode) {
        var syntaxComponent = moveComponent.parentComponent, groupInfo = null, groupElement = null;
        if (isGroupNode(groupNode)) {
            groupInfo = syntaxComponent.getGroupContent(groupNode.id);
            // 容器内部中末尾的元素
            groupElement = groupInfo.content[0];
            // 待定位的组本身就是一个容器, 则检测其内部结构是否还包含容器
            if (isContainerNode(groupNode)) {
                // 内部元素仍然是一个容器
                if (isContainerNode(groupElement)) {
                    // 递归处理
                    return locateRightIndex(moveComponent, groupElement);
                }
                return {
                    groupId: groupNode.id,
                    startOffset: 0,
                    endOffset: 0
                };
            } else {
                while (!isContainerNode(groupElement) && !isPlaceholderNode(groupElement) && !isEmptyNode(groupElement)) {
                    groupInfo = syntaxComponent.getGroupContent(groupElement.id);
                    groupElement = groupInfo.content[0];
                }
                // 定位到占位符内部
                if (isPlaceholderNode(groupElement)) {
                    return {
                        groupId: groupElement.id,
                        startOffset: 0,
                        endOffset: 0
                    };
                } else if (isEmptyNode(groupElement)) {
                    return locateOuterRightIndex(moveComponent, groupElement);
                } else {
                    return locateRightIndex(moveComponent, groupElement);
                }
            }
        }
        return null;
    }
    // 右移外部定位
    function locateOuterRightIndex(moveComponent, groupNode) {
        var kfEditor = moveComponent.kfEditor, syntaxComponent = moveComponent.parentComponent, outerGroupInfo = null, groupInfo = null;
        // 根容器， 不用再跳出
        if (isRootNode(groupNode)) {
            return null;
        }
        outerGroupInfo = kfEditor.requestService("position.get.parent.info", groupNode);
        // 仍然需要回溯
        while (outerGroupInfo.index === outerGroupInfo.group.content.length - 1) {
            if (isRootNode(outerGroupInfo.group.groupObj)) {
                return {
                    groupId: outerGroupInfo.group.id,
                    startOffset: outerGroupInfo.group.content.length,
                    endOffset: outerGroupInfo.group.content.length
                };
            }
            // 如果父组是一个容器， 并且该容器包含不止一个节点， 则跳到父组末尾
            if (isContainerNode(outerGroupInfo.group.groupObj) && outerGroupInfo.group.content.length > 1) {
                return {
                    groupId: outerGroupInfo.group.id,
                    startOffset: outerGroupInfo.group.content.length,
                    endOffset: outerGroupInfo.group.content.length
                };
            }
            outerGroupInfo = kfEditor.requestService("position.get.parent.info", outerGroupInfo.group.groupObj);
        }
        groupNode = outerGroupInfo.group.content[outerGroupInfo.index + 1];
        // 空节点处理
        if (isEmptyNode(groupNode)) {
            return locateOuterRightIndex(moveComponent, groupNode);
        }
        // 定位到的组是一个容器， 则定位到容器内部开头位置上
        if (isContainerNode(groupNode)) {
            return {
                groupId: groupNode.id,
                startOffset: 0,
                endOffset: 0
            };
        }
        return {
            groupId: outerGroupInfo.group.id,
            startOffset: outerGroupInfo.index + 1,
            endOffset: outerGroupInfo.index + 1
        };
    }
    function isRootNode(node) {
        return !!node.getAttribute("data-root");
    }
    function isContainerNode(node) {
        return node.getAttribute("data-type") === "kf-editor-group";
    }
    function isGroupNode(node) {
        var dataType = node.getAttribute("data-type");
        return dataType === "kf-editor-group" || dataType === "kf-editor-virtual-group";
    }
    function isPlaceholderNode(node) {
        return !!node.getAttribute("data-placeholder");
    }
    function isEmptyNode(node) {
        return node.getAttribute("data-flag") === "Empty";
    }
});
/*!
 * 语法控制单元
 */
define("syntax/syntax", [ "kity", "syntax/move" ], function(require) {
    var kity = require("kity"), MoveComponent = require("syntax/move"), CURSOR_CHAR = "", SyntaxComponenet = kity.createClass("SyntaxComponenet", {
        constructor: function(kfEditor) {
            this.kfEditor = kfEditor;
            // 数据记录表
            this.record = {
                // 光标位置
                cursor: {
                    group: null,
                    startOffset: -1,
                    endOffset: -1
                }
            };
            // 子组件结构
            this.components = {};
            // 对象树
            this.objTree = null;
            this.initComponents();
            this.initServices();
        },
        initComponents: function() {
            this.components["move"] = new MoveComponent(this, this.kfEditor);
        },
        initServices: function() {
            this.kfEditor.registerService("syntax.update.objtree", this, {
                updateObjTree: this.updateObjTree
            });
            this.kfEditor.registerService("syntax.get.objtree", this, {
                getObjectTree: this.getObjectTree
            });
            this.kfEditor.registerService("syntax.get.group.object", this, {
                getGroupObject: this.getGroupObject
            });
            this.kfEditor.registerService("syntax.valid.placeholder", this, {
                isPlaceholder: this.isPlaceholder
            });
            this.kfEditor.registerService("syntax.valid.brackets", this, {
                isBrackets: this.isBrackets
            });
            this.kfEditor.registerService("syntax.get.group.content", this, {
                getGroupContent: this.getGroupContent
            });
            this.kfEditor.registerService("syntax.update.record.cursor", this, {
                updateCursor: this.updateCursor
            });
            this.kfEditor.registerService("syntax.update.selection", this, {
                updateSelection: this.updateSelection
            });
            this.kfEditor.registerService("syntax.get.record.cursor", this, {
                getCursorRecord: this.getCursorRecord
            });
            this.kfEditor.registerService("syntax.get.latex.info", this, {
                getLatexInfo: this.getLatexInfo
            });
            this.kfEditor.registerService("syntax.insert.string", this, {
                insertString: this.insertString
            });
            this.kfEditor.registerService("syntax.insert.group", this, {
                insertGroup: this.insertGroup
            });
            this.kfEditor.registerService("syntax.serialization", this, {
                serialization: this.serialization
            });
            this.kfEditor.registerService("syntax.cursor.move.left", this, {
                leftMove: this.leftMove
            });
            this.kfEditor.registerService("syntax.cursor.move.right", this, {
                rightMove: this.rightMove
            });
        },
        updateObjTree: function(objTree) {
            var selectInfo = objTree.select;
            if (selectInfo && selectInfo.groupId) {
                this.updateCursor(selectInfo.groupId, selectInfo.startOffset, selectInfo.endOffset);
            }
            this.objTree = objTree;
        },
        // 验证给定ID的组是否是占位符
        isPlaceholder: function(groupId) {
            return !!this.objTree.mapping[groupId].objGroup.node.getAttribute("data-placeholder");
        },
        isBrackets: function(groupId) {
            return !!this.objTree.mapping[groupId].objGroup.node.getAttribute("data-brackets");
        },
        getObjectTree: function() {
            return this.objTree;
        },
        getGroupObject: function(id) {
            return this.objTree.mapping[id].objGroup || null;
        },
        getCursorRecord: function() {
            return kity.Utils.extend({}, this.record.cursor) || null;
        },
        getGroupContent: function(groupId) {
            var groupInfo = this.objTree.mapping[groupId], content = [], operands = groupInfo.objGroup.operands, offset = operands.length - 1, isLtr = groupInfo.strGroup.traversal !== "rtl";
            kity.Utils.each(operands, function(operand, i) {
                if (isLtr) {
                    content.push(operand.node);
                } else {
                    content[offset - i] = operand.node;
                }
            });
            return {
                id: groupId,
                traversal: groupInfo.strGroup.traversal || "ltr",
                groupObj: groupInfo.objGroup.node,
                content: content
            };
        },
        updateSelection: function(group) {
            var groupObj = this.objTree.mapping[group.id], curStrGroup = groupObj.strGroup, parentGroup = null, parentGroupObj = null, resultStr = null, startOffset = -1, endOffset = -1;
            parentGroup = group;
            parentGroupObj = groupObj;
            if (curStrGroup.name === "combination") {
                this.record.cursor = {
                    groupId: parentGroup.id,
                    startOffset: 0,
                    endOffset: curStrGroup.operand.length
                };
                // 字符内容处理
                curStrGroup.operand.unshift(CURSOR_CHAR);
                curStrGroup.operand.push(CURSOR_CHAR);
            } else {
                // 函数处理， 找到函数所处的最大范围
                while (parentGroupObj.strGroup.name !== "combination" || parentGroup.content === 1) {
                    group = parentGroup;
                    groupObj = parentGroupObj;
                    parentGroup = this.kfEditor.requestService("position.get.parent.group", groupObj.objGroup.node);
                    parentGroupObj = this.objTree.mapping[parentGroup.id];
                }
                var parentIndex = [].indexOf.call(parentGroup.content, group.groupObj);
                this.record.cursor = {
                    groupId: parentGroup.id,
                    startOffset: parentIndex,
                    endOffset: parentIndex + 1
                };
                // 在当前函数所在的位置作标记
                parentGroupObj.strGroup.operand.splice(parentIndex + 1, 0, CURSOR_CHAR);
                parentGroupObj.strGroup.operand.splice(parentIndex, 0, CURSOR_CHAR);
            }
            // 返回结构树进过序列化后所对应的latex表达式， 同时包含有当前光标定位点信息
            resultStr = this.kfEditor.requestService("parser.latex.serialization", this.objTree.parsedTree);
            startOffset = resultStr.indexOf(CURSOR_CHAR);
            resultStr = resultStr.replace(CURSOR_CHAR, "");
            endOffset = resultStr.indexOf(CURSOR_CHAR);
            parentGroupObj.strGroup.operand.splice(this.record.cursor.startOffset, 1);
            parentGroupObj.strGroup.operand.splice(this.record.cursor.endOffset, 1);
            return {
                str: resultStr,
                startOffset: startOffset,
                endOffset: endOffset
            };
        },
        getLatexInfo: function() {
            var cursor = this.record.cursor, objGroup = this.objTree.mapping[cursor.groupId], curStrGroup = objGroup.strGroup, resultStr = null, strStartIndex = -1, strEndIndex = -1, isPlaceholder = !!curStrGroup.attr["data-placeholder"];
            // 格式化偏移值， 保证在处理操作数时， 标记位置不会出错
            strStartIndex = Math.min(cursor.endOffset, cursor.startOffset);
            strEndIndex = Math.max(cursor.endOffset, cursor.startOffset);
            if (!isPlaceholder) {
                curStrGroup.operand.splice(strEndIndex, 0, CURSOR_CHAR);
                curStrGroup.operand.splice(strStartIndex, 0, CURSOR_CHAR);
                strEndIndex += 1;
            } else {
                // 找到占位符的包裹元素
                curStrGroup = this.kfEditor.requestService("position.get.parent.group", objGroup.objGroup.node);
                curStrGroup = this.objTree.mapping[curStrGroup.id].strGroup;
                curStrGroup.operand.unshift(CURSOR_CHAR);
                curStrGroup.operand.push(CURSOR_CHAR);
            }
            // 返回结构树进过序列化后所对应的latex表达式， 同时包含有当前光标定位点信息
            resultStr = this.kfEditor.requestService("parser.latex.serialization", this.objTree.parsedTree);
            if (!isPlaceholder) {
                curStrGroup.operand.splice(strEndIndex, 1);
                curStrGroup.operand.splice(strStartIndex, 1);
            } else {
                curStrGroup.operand.shift();
                curStrGroup.operand.pop();
            }
            strStartIndex = resultStr.indexOf(CURSOR_CHAR);
            // 清除掉一个符号
            resultStr = resultStr.replace(CURSOR_CHAR, "");
            strEndIndex = resultStr.lastIndexOf(CURSOR_CHAR);
            return {
                str: resultStr,
                startOffset: strStartIndex,
                endOffset: strEndIndex
            };
        },
        // 更新光标记录， 同时更新数据
        updateCursor: function(groupId, startOffset, endOffset) {
            if (endOffset === undefined) {
                endOffset = startOffset;
            }
            this.record.cursor = {
                groupId: groupId,
                startOffset: startOffset,
                endOffset: endOffset
            };
            window.tt = this.record.cursor;
        },
        serialization: function() {
            // 返回结构树进过序列化后所对应的latex表达式， 同时包含有当前光标定位点信息
            return this.kfEditor.requestService("parser.latex.serialization", this.objTree.parsedTree);
        },
        insertGroup: function(latexStr) {
            var parsedResult = this.kfEditor.requestService("parser.parse", latexStr), subtree = parsedResult.tree;
            this.insertSubtree(subtree);
        },
        leftMove: function() {
            this.components.move.leftMove();
        },
        rightMove: function() {
            this.components.move.rightMove();
        },
        insertSubtree: function(subtree) {
            var cursorInfo = this.record.cursor, // 当前光标信息所在的子树
            startOffset = 0, endOffset = 0, currentTree = null, diff = 0;
            if (this.isPlaceholder(cursorInfo.groupId)) {
                // 当前在占位符内，所以用子树替换占位符
                this.replaceTree(subtree);
            } else {
                startOffset = Math.min(cursorInfo.startOffset, cursorInfo.endOffset);
                endOffset = Math.max(cursorInfo.startOffset, cursorInfo.endOffset);
                diff = endOffset - startOffset;
                currentTree = this.objTree.mapping[cursorInfo.groupId].strGroup;
                // 插入子树
                currentTree.operand.splice(startOffset, diff, subtree);
                // 更新光标记录
                cursorInfo.startOffset += 1;
                cursorInfo.endOffset = cursorInfo.startOffset;
            }
        },
        replaceTree: function(subtree) {
            var cursorInfo = this.record.cursor, groupNode = this.objTree.mapping[cursorInfo.groupId].objGroup.node, parentInfo = this.kfEditor.requestService("position.get.parent.info", groupNode), currentTree = this.objTree.mapping[parentInfo.group.id].strGroup;
            // 替换占位符为子树
            currentTree.operand[parentInfo.index] = subtree;
            // 更新光标
            cursorInfo.groupId = parentInfo.group.id;
            cursorInfo.startOffset = parentInfo.index + 1;
            cursorInfo.endOffset = parentInfo.index + 1;
        }
    });
    return SyntaxComponenet;
});
/*!
 * 滚动缩放控制器
 */
define("ui/control/zoom", [ "base/utils", "base/common", "base/event/event", "kity" ], function(require) {
    var Utils = require("base/utils"), kity = require("kity"), DEFAULT_OPTIONS = {
        min: .5,
        max: 5
    }, ScrollZoomController = kity.createClass("ScrollZoomController", {
        constructor: function(parentComponent, kfEditor, target, options) {
            this.kfEditor = kfEditor;
            this.target = target;
            this.zoom = 1;
            this.step = .05;
            this.options = Utils.extend({}, DEFAULT_OPTIONS, options);
            this.initEvent();
        },
        initEvent: function() {
            var kfEditor = this.kfEditor, _self = this, min = this.options.min, max = this.options.max, step = this.step;
            Utils.addEvent(this.target, "mousewheel", function(e) {
                e.preventDefault();
                if (e.wheelDelta < 0) {
                    // 缩小
                    _self.zoom -= _self.zoom * step;
                } else {
                    // 放大
                    _self.zoom += _self.zoom * step;
                }
                _self.zoom = Math.max(_self.zoom, min);
                _self.zoom = Math.min(_self.zoom, max);
                kfEditor.requestService("render.set.canvas.zoom", _self.zoom);
            });
        }
    });
    return ScrollZoomController;
});
/*!
 * toolbar元素列表定义
 */
define("ui/toolbar-ele-list", [ "ui/ui-impl/def/ele-type" ], function(require) {
    var UI_ELE_TYPE = require("ui/ui-impl/def/ele-type");
    return [ {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "预设",
                icon: "assets/images/toolbar/button/pi.png"
            },
            box: {
                //                width: 400,
                group: [ {
                    title: "预设公式",
                    content: [ {
                        label: "二次公式",
                        item: {
                            show: '<img src="assets/images/toolbar/ys/1.png">',
                            val: "x=\\frac {-b\\pm\\sqrt {b^2-4ac}}{2a}"
                        }
                    }, {
                        label: "二项式定理",
                        item: {
                            show: '<img src="assets/images/toolbar/ys/2.png">',
                            val: "{\\left(x+a\\right)}^2=\\sum^n_{k=0}{\\left(^n_k\\right)x^ka^{n-k}}"
                        }
                    }, {
                        label: "勾股定理",
                        item: {
                            show: '<img src="assets/images/toolbar/ys/3.png">',
                            val: "a^2+b^2=c^2"
                        }
                    } ]
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DELIMITER
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "分数",
                icon: "assets/images/toolbar/button/frac.png"
            },
            box: {
                width: 378,
                group: [ {
                    title: "分数",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/1.png">',
                            val: "\\frac \\placeholder\\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/2.png">',
                            val: "\\placeholder/\\placeholder"
                        }
                    } ]
                }, {
                    title: "常用分数",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/c1.png">',
                            val: "\\frac {dy}{dx}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/c2.png">',
                            val: "\\frac {\\Delta y}{\\Delta x}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/c4.png">',
                            val: "\\frac {\\delta y}{\\delta x}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/c5.png">',
                            val: "\\frac \\pi 2"
                        }
                    } ]
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "上下标",
                icon: "assets/images/toolbar/button/script.png"
            },
            box: {
                width: 378,
                group: [ {
                    title: "上标和下标",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/script/1.png">',
                            val: "\\placeholder^\\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/script/2.png">',
                            val: "\\placeholder_\\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/script/3.png">',
                            val: "\\placeholder^\\placeholder_\\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/script/4.png">',
                            val: "^\\placeholder_\\placeholder\\placeholder"
                        }
                    } ]
                }, {
                    title: "常用的上标和下标",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/script/c1.png">',
                            val: "e^{-i\\omega t}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/script/c2.png">',
                            val: "x^2"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/script/c3.png">',
                            val: "^n_1Y"
                        }
                    } ]
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "根式",
                icon: "assets/images/toolbar/button/sqrt.png"
            },
            box: {
                width: 378,
                group: [ {
                    title: "根式",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/1.png">',
                            val: "\\sqrt \\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/2.png">',
                            val: "\\sqrt [\\placeholder] \\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/3.png">',
                            val: "\\sqrt [2] \\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/4.png">',
                            val: "\\sqrt [3] \\placeholder"
                        }
                    } ]
                }, {
                    title: "常用根式",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/c1.png">',
                            val: "\\frac {-b\\pm\\sqrt{b^2-4ac}}{2a}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/c2.png">',
                            val: "\\sqrt {a^2+b^2}"
                        }
                    } ]
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "括号",
                icon: "assets/images/toolbar/button/brackets.png"
            },
            box: {
                width: 378,
                group: [ {
                    title: "方括号",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/brackets/1.png">',
                            val: "\\left(\\placeholder\\right)"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/brackets/2.png">',
                            val: "\\left[\\placeholder\\right]"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/brackets/3.png">',
                            val: "\\left\\{\\placeholder\\right\\}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/brackets/4.png">',
                            val: "\\left|\\placeholder\\right|"
                        }
                    } ]
                } ]
            }
        }
    } ];
});
/*!
 * 工具条组件
 */
define("ui/toolbar/toolbar", [ "kity", "ui/ui-impl/ui", "ui/ui-impl/drapdown-box", "ui/ui-impl/delimiter", "ui/ui-impl/ui-utils", "jquery", "ui/ui-impl/def/ele-type" ], function(require) {
    var kity = require("kity"), UiImpl = require("ui/ui-impl/ui"), $$ = require("ui/ui-impl/ui-utils"), UI_ELE_TYPE = require("ui/ui-impl/def/ele-type"), Tollbar = kity.createClass("Tollbar", {
        constructor: function(kfEditor, uiComponent, elementList) {
            this.kfEditor = kfEditor;
            this.uiComponent = uiComponent;
            // 工具栏元素定义列表
            this.elementList = elementList;
            this.elements = [];
            this.initToolbarElements();
            this.initEvent();
        },
        initEvent: function() {
            var _self = this;
            // 通知所有组件关闭
            $$.on(this.kfEditor.getContainer(), "mousedown", function() {
                _self.notify("closeAll");
            });
            // 订阅数据选择主题
            $$.subscribe("data.select", function(data) {
                _self.insertSource(data);
            });
        },
        insertSource: function(val) {
            this.kfEditor.requestService("control.insert.group", val);
        },
        // 接受到关闭通知
        notify: function(type) {
            var caller = null;
            switch (type) {
              // 关闭所有组件
                case "closeAll":
              // 关闭其他组件
                case "closeOther":
                this.closeElement(arguments[1]);
                return;
            }
        },
        closeElement: function(exception) {
            kity.Utils.each(this.elements, function(ele) {
                if (ele != exception) {
                    ele.hide && ele.hide();
                }
            });
        },
        initToolbarElements: function() {
            var elements = this.elements, doc = this.uiComponent.toolbarContainer.ownerDocument, _self = this;
            kity.Utils.each(this.elementList, function(eleInfo, i) {
                var ele = createElement(eleInfo.type, doc, eleInfo.options);
                elements.push(ele);
                _self.appendElement(ele);
            });
        },
        appendElement: function(uiElement) {
            uiElement.setToolbar(this);
            uiElement.attachTo(this.uiComponent.toolbarContainer);
        }
    });
    function createElement(type, doc, options) {
        switch (type) {
          case UI_ELE_TYPE.DRAPDOWN_BOX:
            return createDrapdownBox(doc, options);

          case UI_ELE_TYPE.DELIMITER:
            return createDelimiter(doc);
        }
    }
    function createDrapdownBox(doc, options) {
        return new UiImpl.DrapdownBox(doc, options);
    }
    function createDelimiter(doc) {
        return new UiImpl.Delimiter(doc);
    }
    return Tollbar;
});
/**
 * Created by hn on 14-3-31.
 */
define("ui/ui-impl/box", [ "kity", "ui/ui-impl/ui-utils", "jquery" ], function(require) {
    var kity = require("kity"), PREFIX = "kf-editor-ui-", // UiUitls
    $$ = require("ui/ui-impl/ui-utils"), Box = kity.createClass("Box", {
        constructor: function(doc, options) {
            this.options = options;
            this.doc = doc;
            this.element = this.createBox();
            this.groupContainer = this.createGroupContainer();
            this.itemGroups = this.createItemGroup();
            this.mergeElement();
        },
        createBox: function() {
            var boxNode = $$.ele(this.doc, "div", {
                className: PREFIX + "box"
            });
            if ("width" in this.options) {
                boxNode.style.width = this.options.width + "px";
            }
            return boxNode;
        },
        initEvent: function() {
            var className = "." + PREFIX + "box-item", _self = this;
            $$.delegate(this.groupContainer, className, "mousedown", function(e) {
                e.preventDefault();
                if (e.which !== 1) {
                    return;
                }
                _self.onselectHandler && _self.onselectHandler(this.getAttribute("data-value"));
            });
            $$.on(this.element, "mousedown", function(e) {
                e.stopPropagation();
                e.preventDefault();
            });
        },
        getNode: function() {
            return this.element;
        },
        setSelectHandler: function(onselectHandler) {
            this.onselectHandler = onselectHandler;
        },
        createGroupContainer: function() {
            return $$.ele(this.doc, "div", {
                className: PREFIX + "box-container"
            });
        },
        createItemGroup: function() {
            var doc = this.doc, groups = [], groupNode = null, groupTitle = null, itemContainer = null;
            groupNode = $$.ele(this.doc, "div", {
                className: PREFIX + "box-group"
            });
            itemContainer = groupNode.cloneNode(false);
            itemContainer.className = PREFIX + "box-group-item-container";
            kity.Utils.each(this.options.group, function(group, i) {
                groupNode = groupNode.cloneNode(false);
                itemContainer = itemContainer.cloneNode(false);
                groupTitle = $$.ele(doc, "div", {
                    className: PREFIX + "box-group-title",
                    content: group.title
                });
                groupNode.appendChild(groupTitle);
                groupNode.appendChild(itemContainer);
                kity.Utils.each(createItems(doc, group.content), function(item) {
                    item.appendTo(itemContainer);
                });
                groups.push(groupNode);
            });
            return groups;
        },
        mergeElement: function() {
            var groupContainer = this.groupContainer;
            this.element.appendChild(groupContainer);
            kity.Utils.each(this.itemGroups, function(group) {
                groupContainer.appendChild(group);
            });
        },
        mountTo: function(container) {
            container.appendChild(this.element);
        },
        appendTo: function(container) {
            container.appendChild(this.element);
        }
    }), BoxItem = kity.createClass("BoxItem", {
        constructor: function(doc, options) {
            this.doc = doc;
            this.options = options;
            this.element = this.createItem();
            // 项的label是可选的
            this.labelNode = this.createLabel();
            this.contentNode = this.createContent();
            this.mergeElement();
        },
        getNode: function() {
            return this.element;
        },
        createItem: function() {
            var itemNode = $$.ele(this.doc, "div", {
                className: PREFIX + "box-item"
            });
            return itemNode;
        },
        createLabel: function() {
            var labelNode = null;
            if (!("label" in this.options)) {
                return;
            }
            labelNode = $$.ele(this.doc, "div", {
                className: PREFIX + "box-item-label",
                content: this.options.label
            });
            return labelNode;
        },
        createContent: function() {
            var doc = this.doc, contentNode = $$.ele(doc, "div", {
                className: PREFIX + "box-item-content"
            }), cls = PREFIX + "box-item-val", tmpContent = this.options.item, tmpNode = null;
            if (typeof tmpContent === "string") {
                tmpContent = {
                    show: tmpContent,
                    val: tmpContent
                };
            }
            tmpNode = $$.ele(doc, "div", {
                className: cls
            });
            tmpNode.innerHTML = tmpContent.show;
            // 附加属性到项的根节点上
            this.element.setAttribute("data-value", tmpContent.val);
            contentNode.appendChild(tmpNode);
            return contentNode;
        },
        mergeElement: function() {
            if (this.labelNode) {
                this.element.appendChild(this.labelNode);
            }
            this.element.appendChild(this.contentNode);
        },
        appendTo: function(container) {
            container.appendChild(this.element);
        }
    });
    function createItems(doc, group) {
        var items = [];
        kity.Utils.each(group, function(itemVal, i) {
            items.push(new BoxItem(doc, itemVal));
        });
        return items;
    }
    return Box;
});
/**
 * Created by hn on 14-3-31.
 */
define("ui/ui-impl/button", [ "kity", "ui/ui-impl/ui-utils", "jquery" ], function(require) {
    var kity = require("kity"), PREFIX = "kf-editor-ui-", // UiUitls
    $$ = require("ui/ui-impl/ui-utils"), Button = kity.createClass("Button", {
        constructor: function(doc, options) {
            this.options = options;
            // 事件状态， 是否已经初始化
            this.eventState = false;
            this.doc = doc;
            this.element = this.createButton();
            this.icon = this.createIcon();
            this.label = this.createLabel();
            this.sign = this.createSign();
            this.mountPoint = this.createMountPoint();
            this.mergeElement();
        },
        initEvent: function() {
            var _self = this;
            if (this.eventState) {
                return;
            }
            this.eventState = true;
            $$.on(this.element, "mousedown", function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (e.which !== 1) {
                    return;
                }
                _self.toggleSelect();
                _self.toggleMountElement();
            });
        },
        toggleMountElement: function() {
            var state = this.mountPoint.style.display || "none";
            this.mountPoint.style.display = state === "none" ? "block" : "none";
        },
        toggleSelect: function() {
            this.element.classList.toggle(PREFIX + "button-in");
        },
        unselect: function() {
            this.element.classList.remove(PREFIX + "button-in");
        },
        select: function() {
            this.element.classList.add(PREFIX + "button-in");
        },
        show: function() {
            this.select();
            this.showMount();
        },
        hide: function() {
            this.unselect();
            this.hideMount();
        },
        showMount: function() {
            this.mountPoint.style.display = "block";
        },
        hideMount: function() {
            this.mountPoint.style.display = "none";
        },
        getNode: function() {
            return this.element;
        },
        mount: function(source) {
            source.mountTo(this.mountPoint);
        },
        createButton: function() {
            var buttonNode = $$.ele(this.doc, "div", {
                className: PREFIX + "button"
            });
            return buttonNode;
        },
        createIcon: function() {
            var iconNode = $$.ele(this.doc, "div", {
                className: PREFIX + "button-icon"
            });
            iconNode.style.backgroundImage = "url(" + this.options.icon + ")";
            return iconNode;
        },
        createLabel: function() {
            var labelNode = $$.ele(this.doc, "div", {
                className: PREFIX + "button-label",
                content: this.options.label
            });
            return labelNode;
        },
        createSign: function() {
            return $$.ele(this.doc, "div", {
                className: PREFIX + "button-sign"
            });
        },
        createMountPoint: function() {
            return $$.ele(this.doc, "div", {
                className: PREFIX + "button-mount-point"
            });
        },
        mergeElement: function() {
            this.element.appendChild(this.icon);
            this.element.appendChild(this.label);
            this.element.appendChild(this.sign);
            this.element.appendChild(this.mountPoint);
        }
    });
    return Button;
});
/*!
 * toolbar元素类型定义
 */
define("ui/ui-impl/def/ele-type", [], function(require) {
    return {
        DRAPDOWN_BOX: 1,
        DELIMITER: 2
    };
});
/*!
 * 分割符
 */
define("ui/ui-impl/delimiter", [ "kity", "ui/ui-impl/ui-utils", "jquery" ], function(require) {
    var kity = require("kity"), PREFIX = "kf-editor-ui-", // UiUitls
    $$ = require("ui/ui-impl/ui-utils"), Delimiter = kity.createClass("Delimiter", {
        constructor: function(doc) {
            this.doc = doc;
            this.element = this.createDilimiter();
        },
        setToolbar: function(toolbar) {},
        createDilimiter: function() {
            var dilimiterNode = $$.ele(this.doc, "div", {
                className: PREFIX + "delimiter"
            });
            dilimiterNode.appendChild($$.ele(this.doc, "div", {
                className: PREFIX + "delimiter-line"
            }));
            return dilimiterNode;
        },
        attachTo: function(container) {
            container.appendChild(this.element);
        }
    });
    return Delimiter;
});
/**
 * Created by hn on 14-3-31.
 */
define("ui/ui-impl/drapdown-box", [ "kity", "ui/ui-impl/ui-utils", "jquery", "ui/ui-impl/button", "ui/ui-impl/box" ], function(require) {
    var kity = require("kity"), PREFIX = "kf-editor-ui-", // UiUitls
    $$ = require("ui/ui-impl/ui-utils"), Button = require("ui/ui-impl/button"), Box = require("ui/ui-impl/box"), DrapdownBox = kity.createClass("DrapdownBox", {
        constructor: function(doc, options) {
            this.options = options;
            this.toolbar = null;
            this.doc = doc;
            this.buttonElement = this.createButton();
            this.element = this.buttonElement.getNode();
            this.boxElement = this.createBox();
            this.buttonElement.mount(this.boxElement);
            this.initEvent();
        },
        initEvent: function() {
            var _self = this;
            // 通知工具栏互斥
            $$.on(this.element, "mousedown", function(e) {
                e.preventDefault();
                e.stopPropagation();
                _self.toolbar.notify("closeOther", _self);
            });
            this.buttonElement.initEvent();
            this.boxElement.initEvent();
            this.boxElement.setSelectHandler(function(val) {
                // 发布
                $$.publish("data.select", val);
                _self.buttonElement.hide();
            });
        },
        setToolbar: function(toolbar) {
            this.toolbar = toolbar;
        },
        createButton: function() {
            return new Button(this.doc, this.options.button);
        },
        show: function() {
            this.buttonElement.show();
        },
        hide: function() {
            this.buttonElement.hide();
        },
        createBox: function() {
            return new Box(this.doc, this.options.box);
        },
        attachTo: function(container) {
            container.appendChild(this.element);
        }
    });
    return DrapdownBox;
});
/**
 * Created by hn on 14-4-1.
 */
define("ui/ui-impl/ui-utils", [ "jquery", "kity" ], function(require) {
    var $ = require("jquery"), kity = require("kity"), TOPIC_POOL = {};
    return {
        ele: function(doc, name, options) {
            var node = doc.createElement(name);
            options.className && (node.className = options.className);
            if (options.content) {
                node.innerHTML = options.content;
            }
            return node;
        },
        on: function(target, type, fn) {
            $(target).on(type, fn);
            return this;
        },
        delegate: function(target, selector, type, fn) {
            $(target).delegate(selector, type, fn);
            return this;
        },
        publish: function(topic, args) {
            var callbackList = TOPIC_POOL[topic];
            if (!callbackList) {
                return;
            }
            args = [].slice.call(arguments, 1);
            kity.Utils.each(callbackList, function(callback) {
                callback.apply(null, args);
            });
        },
        subscribe: function(topic, callback) {
            if (!TOPIC_POOL[topic]) {
                TOPIC_POOL[topic] = [];
            }
            TOPIC_POOL[topic].push(callback);
        }
    };
});
/**
 * Created by hn on 14-3-31.
 */
define("ui/ui-impl/ui", [ "ui/ui-impl/drapdown-box", "kity", "ui/ui-impl/ui-utils", "ui/ui-impl/button", "ui/ui-impl/box", "ui/ui-impl/delimiter" ], function(require) {
    return {
        DrapdownBox: require("ui/ui-impl/drapdown-box"),
        Delimiter: require("ui/ui-impl/delimiter")
    };
});
/**
 * Created by hn on 14-3-17.
 */
define("ui/ui", [ "kity", "base/utils", "base/common", "base/event/event", "ui/toolbar/toolbar", "ui/ui-impl/ui", "ui/ui-impl/ui-utils", "ui/ui-impl/def/ele-type", "ui/control/zoom", "ui/toolbar-ele-list" ], function(require, exports, modules) {
    var kity = require("kity"), Utils = require("base/utils"), Toolbar = require("ui/toolbar/toolbar"), // 控制组件
    ScrollZoom = require("ui/control/zoom"), ELEMENT_LIST = require("ui/toolbar-ele-list"), UIComponent = kity.createClass("UIComponent", {
        constructor: function(kfEditor) {
            var currentDocument = null;
            this.container = kfEditor.getContainer();
            currentDocument = this.container.ownerDocument;
            // ui组件实例集合
            this.components = {};
            this.kfEditor = kfEditor;
            this.resizeTimer = null;
            this.toolbarContainer = createToolbarContainer(currentDocument);
            this.editArea = createEditArea(currentDocument);
            this.canvasContainer = createCanvasContainer(currentDocument);
            this.updateContainerSize(this.container, this.toolbarContainer, this.editArea, this.canvasContainer);
            this.container.appendChild(this.toolbarContainer);
            this.editArea.appendChild(this.canvasContainer);
            this.container.appendChild(this.editArea);
            this.initCanvas();
            this.initComponents();
            this.initServices();
            this.initResizeEvent();
        },
        // 组件实例化
        initComponents: function() {
            // 工具栏组件
            this.components.toolbar = new Toolbar(this.kfEditor, this, ELEMENT_LIST);
            this.components.scrollZoom = new ScrollZoom(this, this.kfEditor, this.canvasContainer);
        },
        initCanvas: function() {},
        updateContainerSize: function(container, toolbar, editArea, canvasContainer) {
            var containerBox = container.getBoundingClientRect();
            toolbar.style.width = containerBox.width - 12 + "px";
            toolbar.style.height = 80 + "px";
            editArea.style.marginTop = 80 + "px";
            editArea.style.width = containerBox.width + "px";
            editArea.style.height = containerBox.height - 80 + "px";
        },
        // 初始化服务
        initServices: function() {
            this.kfEditor.registerService("ui.get.canvas.container", this, {
                getCanvasContainer: SERVICE_LIST.getCanvasContainer
            });
            this.kfEditor.registerService("ui.canvas.container.event", this, {
                on: SERVICE_LIST.addEvent,
                off: SERVICE_LIST.removeEvent,
                trigger: SERVICE_LIST.trigger,
                fire: SERVICE_LIST.trigger
            });
        },
        initResizeEvent: function() {
            var _self = this;
            this.canvasContainer.ownerDocument.defaultView.onresize = function() {
                window.clearTimeout(_self.resizeTimer);
                _self.resizeTimer = window.setTimeout(function() {
                    _self.kfEditor.requestService("render.relocation");
                }, 80);
            };
        }
    }), SERVICE_LIST = {
        getCanvasContainer: function() {
            return this.canvasContainer;
        },
        addEvent: function(type, handler) {
            Utils.addEvent(this.canvasContainer, type, handler);
        },
        removeEvent: function() {},
        trigger: function(type) {
            Utils.trigger(this.canvasContainer, type);
        }
    };
    function createToolbarContainer(doc) {
        var container = doc.createElement("div");
        container.className = "kf-editor-toolbar";
        return container;
    }
    function createEditArea(doc) {
        var container = doc.createElement("div");
        container.className = "kf-editor-edit-area";
        container.style.width = "80%";
        container.style.height = "800px";
        return container;
    }
    function createCanvasContainer(doc) {
        var container = doc.createElement("div");
        container.className = "kf-editor-canvas-container";
        return container;
    }
    return UIComponent;
});

/**
 * 模块暴露
 */

( function ( global ) {

    define( 'kf.start', function ( require ) {

        var KFEditor = require( "editor/editor" );

        // 注册组件
        KFEditor.registerComponents( "ui", require( "ui/ui" ) );
        KFEditor.registerComponents( "parser", require( "parse/parser" ) );
        KFEditor.registerComponents( "render", require( "render/render" ) );
        KFEditor.registerComponents( "position", require( "position/position" ) );
        KFEditor.registerComponents( "syntax", require( "syntax/syntax" ) );

        kf.Editor = KFEditor;

    } );

    // build环境中才含有use
    try {
        use( 'kf.start' );
    } catch ( e ) {
    }

} )( this );
})();
