/*!
 * ====================================================
 * Kity Formula Editor - v1.0.0 - 2014-04-16
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
        getRect: function(node) {
            return node.getBoundingClientRect();
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
/**
 * Created by hn on 14-4-11.
 */
define("control/controller", [ "kity", "control/listener", "control/location", "control/input", "control/selection" ], function(require) {
    var kity = require("kity"), ListenerComponent = require("control/listener"), ControllerComponent = kity.createClass("ControllerComponent", {
        constructor: function(kfEditor) {
            this.kfEditor = kfEditor;
            this.components = {};
            this.initComponents();
        },
        initComponents: function() {
            this.components["listener"] = new ListenerComponent(this, this.kfEditor);
        }
    });
    return ControllerComponent;
});
/*!
 * 输入控制组件
 */
define("control/input", [ "kity", "base/utils", "base/common", "base/event/event" ], function(require, exports, module) {
    var kity = require("kity"), kfUtils = require("base/utils"), KEY_CODE = {
        LEFT: 37,
        RIGHT: 39,
        DELETE: 8
    };
    return kity.createClass("InputComponent", {
        constructor: function(parentComponent, kfEditor) {
            this.parentComponent = parentComponent;
            this.kfEditor = kfEditor;
            this.inputBox = this.createInputBox();
            this.initServices();
            this.initEvent();
        },
        initServices: function() {
            this.kfEditor.registerService("control.update.input", this, {
                updateInput: this.updateInput
            });
            this.kfEditor.registerService("control.insert.string", this, {
                insertStr: this.insertStr
            });
        },
        createInputBox: function() {
            var editorContainer = this.kfEditor.getContainer(), box = this.kfEditor.getDocument().createElement("input");
            box.className = "kf-editor-input-box";
            box.type = "text";
            // focus是否可信
            box.isTrusted = false;
            editorContainer.appendChild(box);
            return box;
        },
        setUntrusted: function() {
            this.inputBox.isTrusted = false;
        },
        setTrusted: function() {
            this.inputBox.isTrusted = true;
        },
        updateInput: function() {
            var latexInfo = this.kfEditor.requestService("syntax.serialization");
            this.setUntrusted();
            this.inputBox.value = latexInfo.str;
            this.inputBox.selectionStart = latexInfo.startOffset;
            this.inputBox.selectionEnd = latexInfo.endOffset;
            this.inputBox.focus();
            this.setTrusted();
        },
        insertStr: function(str) {
            var latexInfo = this.kfEditor.requestService("syntax.serialization"), originString = latexInfo.str;
            // 拼接latex字符串
            originString = originString.substring(0, latexInfo.startOffset) + " " + str + " " + originString.substring(latexInfo.endOffset);
            this.restruct(originString);
            this.updateInput();
        },
        initEvent: function() {
            var _self = this;
            kfUtils.addEvent(this.inputBox, "keydown", function(e) {
                switch (e.keyCode) {
                  case KEY_CODE.LEFT:
                    e.preventDefault();
                    _self.leftMove();
                    break;

                  case KEY_CODE.RIGHT:
                    e.preventDefault();
                    _self.rightMove();
                    break;

                  case KEY_CODE.DELETE:
                    e.preventDefault();
                    _self.delete();
                    break;
                }
            });
            // 用户输入
            kfUtils.addEvent(this.inputBox, "input", function(e) {
                _self.processingInput();
            });
            // 光标显隐控制
            kfUtils.addEvent(this.inputBox, "blur", function(e) {
                _self.kfEditor.requestService("ui.toolbar.disable");
                _self.kfEditor.requestService("ui.toolbar.close");
                _self.kfEditor.requestService("control.cursor.hide");
                _self.kfEditor.requestService("render.clear.select");
            });
            kfUtils.addEvent(this.inputBox, "focus", function(e) {
                _self.kfEditor.requestService("ui.toolbar.enable");
                if (this.isTrusted) {
                    _self.kfEditor.requestService("control.reselect");
                }
            });
            // 粘贴过滤
            kfUtils.addEvent(this.inputBox, "paste", function(e) {
                // TODO 处理粘贴
                debugger;
            });
        },
        hasRootplaceholder: function() {
            return this.kfEditor.requestService("syntax.has.root.placeholder");
        },
        leftMove: function() {
            // 当前处于"根占位符"上， 则不允许move
            if (this.hasRootplaceholder()) {
                return;
            }
            this.kfEditor.requestService("syntax.cursor.move.left");
            this.update();
        },
        rightMove: function() {
            if (this.hasRootplaceholder()) {
                return;
            }
            this.kfEditor.requestService("syntax.cursor.move.right");
            this.update();
        },
        "delete": function() {
            var isNeedRedraw = null;
            // 当前处于"根占位符"上，不允许删除操作
            if (this.hasRootplaceholder()) {
                return;
            }
            // 返回是否修要重绘
            isNeedRedraw = this.kfEditor.requestService("syntax.delete.group");
            if (isNeedRedraw) {
                this.updateInput();
                this.processingInput();
            } else {
                this.updateInput();
                this.kfEditor.requestService("control.reselect");
            }
        },
        processingInput: function() {
            this.restruct(this.inputBox.value);
        },
        // 根据给定的字符串重新进行构造公式
        restruct: function(latexStr) {
            this.kfEditor.requestService("render.draw", latexStr);
            this.kfEditor.requestService("control.reselect");
        },
        update: function() {
            // 更新输入框
            this.updateInput();
            this.kfEditor.requestService("control.reselect");
        }
    });
});
/**
 * Created by hn on 14-4-11.
 */
define("control/listener", [ "kity", "control/location", "control/input", "base/utils", "control/selection" ], function(require, exports, module) {
    var kity = require("kity"), // 光标定位
    LocationComponent = require("control/location"), // 输入控制组件
    InputComponent = require("control/input"), // 选区
    SelectionComponent = require("control/selection");
    return kity.createClass("MoveComponent", {
        constructor: function(parentComponent, kfEditor) {
            this.parentComponent = parentComponent;
            this.kfEditor = kfEditor;
            this.components = {};
            this.initComponents();
        },
        initComponents: function() {
            this.components["location"] = new LocationComponent(this, this.kfEditor);
            this.components["selection"] = new SelectionComponent(this, this.kfEditor);
            this.components["input"] = new InputComponent(this, this.kfEditor);
        }
    });
});
/*!
 * 光标定位组件
 */
define("control/location", [ "kity" ], function(require, exports, module) {
    var kity = require("kity");
    return kity.createClass("LocationComponent", {
        constructor: function(parentComponent, kfEditor) {
            this.parentComponent = parentComponent;
            this.kfEditor = kfEditor;
            // 创建光标
            this.paper = this.getPaper();
            this.cursorShape = this.createCursor();
            this.initServices();
            this.initEvent();
        },
        getPaper: function() {
            return this.kfEditor.requestService("render.get.paper");
        },
        initServices: function() {
            // 重定位光标
            this.kfEditor.registerService("control.cursor.relocation", this, {
                relocationCursor: this.updateCursor
            });
            // 清除光标
            this.kfEditor.registerService("control.cursor.hide", this, {
                hideCursor: this.hideCursor
            });
            this.kfEditor.registerService("control.reselect", this, {
                reselect: this.reselect
            });
        },
        createCursor: function() {
            var cursorShape = new kity.Rect(1, 0, 0, 0).fill("black");
            cursorShape.setAttr("style", "display: none");
            this.paper.addShape(cursorShape);
            return cursorShape;
        },
        // 光标定位监听
        initEvent: function() {
            var eventServiceObject = this.kfEditor.request("ui.canvas.container.event"), _self = this;
            eventServiceObject.on("mousedown", function(e) {
                e.preventDefault();
                _self.updateCursorInfo(e);
                _self.kfEditor.requestService("control.update.input");
                _self.reselect();
            });
        },
        updateCursorInfo: function(evt) {
            var cursorInfo = null, wrapNode = null, groupInfo = null, index = -1;
            // 有根占位符存在， 所有定位到定位到根占位符内部
            if (this.kfEditor.requestService("syntax.has.root.placeholder")) {
                this.kfEditor.requestService("syntax.update.record.cursor", {
                    groupId: this.kfEditor.requestService("syntax.get.root.group.info").id,
                    startOffset: 0,
                    endOffset: 1
                });
                return false;
            }
            wrapNode = this.kfEditor.requestService("position.get.wrap", evt.target);
            // 占位符处理, 选中该占位符
            if (wrapNode && this.kfEditor.requestService("syntax.is.placeholder.node", wrapNode.id)) {
                groupInfo = this.kfEditor.requestService("position.get.group.info", wrapNode);
                this.kfEditor.requestService("syntax.update.record.cursor", groupInfo.group.id, groupInfo.index, groupInfo.index + 1);
                return;
            }
            groupInfo = this.kfEditor.requestService("position.get.group", evt.target);
            if (groupInfo === null) {
                groupInfo = this.kfEditor.requestService("syntax.get.root.group.info");
            }
            index = this.getIndex(evt.clientX, groupInfo);
            this.kfEditor.requestService("syntax.update.record.cursor", groupInfo.id, index);
        },
        hideCursor: function() {
            this.cursorShape.setAttr("style", "display: none");
        },
        // 根据当前的光标信息， 对选区和光标进行更新
        reselect: function() {
            var cursorInfo = this.kfEditor.requestService("syntax.get.record.cursor"), groupInfo = null;
            this.hideCursor();
            // 根节点单独处理
            if (this.kfEditor.requestService("syntax.is.select.placeholder")) {
                groupInfo = this.kfEditor.requestService("syntax.get.group.content", cursorInfo.groupId);
                this.kfEditor.requestService("render.select.group", groupInfo.content[cursorInfo.startOffset].id);
                return;
            }
            if (cursorInfo.startOffset === cursorInfo.endOffset) {
                // 更新光标位置
                this.updateCursor();
                // 请求背景着色
                this.kfEditor.requestService("render.tint.current.cursor");
            } else {
                this.kfEditor.requestService("render.select.current.cursor");
            }
        },
        updateCursor: function() {
            var cursorInfo = this.kfEditor.requestService("syntax.get.record.cursor");
            if (cursorInfo.startOffset !== cursorInfo.endOffset) {
                this.hideCursor();
                return;
            }
            var groupInfo = this.kfEditor.requestService("syntax.get.group.content", cursorInfo.groupId), isBefore = cursorInfo.endOffset === 0, index = isBefore ? 0 : cursorInfo.endOffset - 1, focusChild = groupInfo.content[index], paperContainerRect = getRect(this.paper.container.node), cursorOffset = 0, focusChildRect = getRect(focusChild), cursorTransform = this.cursorShape.getTransform(), canvasZoom = this.kfEditor.requestService("render.get.canvas.zoom"), formulaZoom = this.paper.getZoom();
            this.cursorShape.setHeight(focusChildRect.height / canvasZoom / formulaZoom);
            // 计算光标偏移位置
            cursorOffset = isBefore ? focusChildRect.left - 2 : focusChildRect.left + focusChildRect.width - 2;
            cursorOffset -= paperContainerRect.left;
            // 定位光标
            cursorTransform.m.e = cursorOffset / canvasZoom / formulaZoom;
            cursorTransform.m.f = (focusChildRect.top - paperContainerRect.top) / canvasZoom / formulaZoom;
            this.cursorShape.setTransform(cursorTransform);
            this.cursorShape.setAttr("style", "display: block");
        },
        getIndex: function(distance, groupInfo) {
            var index = -1, children = groupInfo.content, boundingRect = null;
            for (var i = children.length - 1, child = null; i >= 0; i--) {
                index = i;
                child = children[i];
                boundingRect = getRect(child);
                if (boundingRect.left < distance) {
                    if (boundingRect.left + boundingRect.width / 2 < distance) {
                        index += 1;
                    }
                    break;
                }
            }
            return index;
        }
    });
    function getRect(node) {
        return node.getBoundingClientRect();
    }
});
/*!
 * 光标选区组件
 */
define("control/selection", [ "kity", "base/utils", "base/common", "base/event/event" ], function(require, exports, module) {
    var kity = require("kity"), kfUtils = require("base/utils"), // 鼠标移动临界距离
    MAX_DISTANCE = 10;
    return kity.createClass("SelectionComponent", {
        constructor: function(parentComponent, kfEditor) {
            this.parentComponent = parentComponent;
            this.kfEditor = kfEditor;
            this.isDrag = false;
            this.isMousedown = false;
            this.startPoint = {
                x: -1,
                y: -1
            };
            // 起始位置是占位符
            this.startGroupIsPlaceholder = false;
            this.startGroup = {};
            this.initEvent();
        },
        initEvent: function() {
            var eventServiceObject = this.kfEditor.request("ui.canvas.container.event"), _self = this;
            /* 选区拖拽 start */
            eventServiceObject.on("mousedown", function(e) {
                e.preventDefault();
                // 存在根占位符， 禁止拖动
                if (_self.kfEditor.requestService("syntax.has.root.placeholder")) {
                    return false;
                }
                _self.isMousedown = true;
                _self.updateStartPoint(e.clientX, e.clientY);
                _self.updateStartGroup();
            });
            eventServiceObject.on("mouseup", function(e) {
                e.preventDefault();
                _self.stopUpdateSelection();
            });
            eventServiceObject.on("mousemove", function(e) {
                e.preventDefault();
                if (!_self.isDrag) {
                    if (_self.isMousedown) {
                        // 移动的距离达到临界条件
                        if (MAX_DISTANCE < _self.getDistance(e.clientX, e.clientY)) {
                            _self.kfEditor.requestService("control.cursor.hide");
                            _self.startUpdateSelection();
                        }
                    }
                } else {
                    _self.updateSelection(e.target, e.clientX, e.clientY);
                }
            });
            /* 选区拖拽 end */
            /* 双击选区 start */
            eventServiceObject.on("dblclick", function(e) {
                _self.updateSelectionByTarget(e.target);
            });
        },
        getDistance: function(x, y) {
            var distanceX = Math.abs(x - this.startPoint.x), distanceY = Math.abs(y - this.startPoint.y);
            return Math.max(distanceX, distanceY);
        },
        updateStartPoint: function(x, y) {
            this.startPoint.x = x;
            this.startPoint.y = y;
        },
        updateStartGroup: function() {
            var cursorInfo = this.kfEditor.requestService("syntax.get.record.cursor");
            this.startGroupIsPlaceholder = this.kfEditor.requestService("syntax.is.select.placeholder");
            this.startGroup = {
                groupInfo: this.kfEditor.requestService("syntax.get.group.content", cursorInfo.groupId),
                offset: cursorInfo.startOffset
            };
        },
        startUpdateSelection: function() {
            this.isDrag = true;
            this.isMousedown = false;
            this.clearSelection();
        },
        stopUpdateSelection: function() {
            this.isDrag = false;
            this.isMousedown = false;
            this.kfEditor.requestService("control.update.input");
        },
        clearSelection: function() {
            this.kfEditor.requestService("render.clear.select");
        },
        updateSelection: function(target, x, y) {
            // 移动方向， true为右， false为左
            var dir = x > this.startPoint.x, cursorInfo = {}, unifiedGroupInfo = null, inRightArea = false, startGroupInfo = this.startGroup, currentGroupNode = null, currentGroupInfo = this.getGroupInof(x, target);
            if (currentGroupInfo.groupInfo.id === startGroupInfo.groupInfo.id) {
                cursorInfo = {
                    groupId: currentGroupInfo.groupInfo.id,
                    startOffset: startGroupInfo.offset,
                    endOffset: currentGroupInfo.offset
                };
                // 如果起始点是占位符， 要根据移动方向修正偏移
                if (this.startGroupIsPlaceholder) {
                    // 左移修正
                    if (!dir) {
                        cursorInfo.startOffset += 1;
                    } else if (cursorInfo.startOffset === cursorInfo.endOffset) {
                        cursorInfo.endOffset += 1;
                    }
                }
            } else {
                // 存在包含关系
                if (startGroupInfo.groupInfo.groupObj.contains(currentGroupInfo.groupInfo.groupObj)) {
                    cursorInfo = {
                        groupId: startGroupInfo.groupInfo.id,
                        startOffset: startGroupInfo.offset,
                        endOffset: this.getIndex(startGroupInfo.groupInfo.groupObj, target, x)
                    };
                } else if (currentGroupInfo.groupInfo.groupObj.contains(startGroupInfo.groupInfo.groupObj)) {
                    cursorInfo = {
                        groupId: currentGroupInfo.groupInfo.id,
                        startOffset: this.kfEditor.requestService("position.get.index", currentGroupInfo.groupInfo.groupObj, startGroupInfo.groupInfo.groupObj),
                        endOffset: currentGroupInfo.offset
                    };
                    // 向左移动要修正开始偏移
                    if (!dir) {
                        cursorInfo.startOffset += 1;
                    }
                } else {
                    // 获取公共容器
                    unifiedGroupInfo = this.getUnifiedGroup(startGroupInfo.groupInfo, currentGroupInfo.groupInfo);
                    // 修正偏移相同时的情况， 比如在分数中选中时
                    if (unifiedGroupInfo.startOffset === unifiedGroupInfo.endOffset) {
                        unifiedGroupInfo.endOffset += 1;
                    } else {
                        // 当前光标移动所在的组元素节点
                        currentGroupNode = unifiedGroupInfo.group.content[unifiedGroupInfo.endOffset];
                        inRightArea = this.kfEditor.requestService("position.get.area", currentGroupNode, x);
                        // 当前移动到右区域， 则更新结束偏移
                        if (inRightArea) {
                            unifiedGroupInfo.endOffset += 1;
                        }
                        // 左移动时， 修正起始偏移
                        if (!dir) {
                            unifiedGroupInfo.startOffset += 1;
                        }
                    }
                    cursorInfo = {
                        groupId: unifiedGroupInfo.group.id,
                        startOffset: unifiedGroupInfo.startOffset,
                        endOffset: unifiedGroupInfo.endOffset
                    };
                }
            }
            // 更新光标信息
            this.kfEditor.requestService("syntax.update.record.cursor", cursorInfo.groupId, cursorInfo.startOffset, cursorInfo.endOffset);
            // 仅重新选中就可以，不用更新输入框内容
            this.kfEditor.requestService("control.reselect");
        },
        updateSelectionByTarget: function(target) {
            var parentGroupInfo = this.kfEditor.requestService("position.get.parent.group", target), containerInfo = null, cursorInfo = {};
            if (parentGroupInfo === null) {
                return;
            }
            // 如果是根节点， 则直接选中其内容
            if (this.kfEditor.requestService("syntax.is.root.node", parentGroupInfo.id)) {
                cursorInfo = {
                    groupId: parentGroupInfo.id,
                    startOffset: 0,
                    endOffset: parentGroupInfo.content.length
                };
            } else {
                // 当前组可以是容器， 则选中该容器的内容
                if (!this.kfEditor.requestService("syntax.is.virtual.node", parentGroupInfo.id)) {
                    cursorInfo = {
                        groupId: parentGroupInfo.id,
                        startOffset: 0,
                        endOffset: parentGroupInfo.content.length
                    };
                } else {
                    // 获取包含父组的容器
                    containerInfo = this.kfEditor.requestService("position.get.group.info", parentGroupInfo.groupObj);
                    cursorInfo = {
                        groupId: containerInfo.group.id,
                        startOffset: containerInfo.index,
                        endOffset: containerInfo.index + 1
                    };
                }
            }
            this.kfEditor.requestService("syntax.update.record.cursor", cursorInfo);
            this.kfEditor.requestService("control.reselect");
            this.kfEditor.requestService("control.update.input");
        },
        getGroupInof: function(offset, target) {
            var groupInfo = this.kfEditor.requestService("position.get.group", target);
            if (groupInfo === null) {
                groupInfo = this.kfEditor.requestService("syntax.get.root.group.info");
            }
            var index = this.kfEditor.requestService("position.get.location.info", offset, groupInfo);
            return {
                groupInfo: groupInfo,
                offset: index
            };
        },
        getIndex: function(groupNode, targetNode, offset) {
            var index = this.kfEditor.requestService("position.get.index", groupNode, targetNode), groupInfo = this.kfEditor.requestService("syntax.get.group.content", groupNode.id), targetWrapNode = groupInfo.content[index], targetRect = kfUtils.getRect(targetWrapNode);
            if (targetRect.left + targetRect.width / 2 < offset) {
                index += 1;
            }
            return index;
        },
        /**
         * 根据给定的两个组信息， 获取其所在的公共容器及其各自的偏移
         * @param startGroupInfo 组信息
         * @param endGroupInfo 另一个组信息
         */
        getUnifiedGroup: function(startGroupInfo, endGroupInfo) {
            var bigBoundingGroup = null, targetGroup = startGroupInfo.groupObj, groupNode = null, cursorInfo = {};
            while (bigBoundingGroup = this.kfEditor.requestService("position.get.group.info", targetGroup)) {
                targetGroup = bigBoundingGroup.group.groupObj;
                if (bigBoundingGroup.group.groupObj.contains(endGroupInfo.groupObj)) {
                    break;
                }
            }
            groupNode = bigBoundingGroup.group.groupObj;
            return {
                group: bigBoundingGroup.group,
                startOffset: bigBoundingGroup.index,
                endOffset: this.kfEditor.requestService("position.get.index", groupNode, endGroupInfo.groupObj)
            };
        }
    });
});
/*!
 * 组类型
 */
define("def/group-type", [], function() {
    return {
        GROUP: "kf-editor-group",
        VIRTUAL: "kf-editor-virtual-group"
    };
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
        getDocument: function() {
            return this.container.ownerDocument;
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
            this.label = null;
            this.box.setAttr("data-type", null);
            this.setOperator(new PlaceholderOperator());
        },
        setLabel: function(label) {
            this.label = label;
        },
        getLabel: function() {
            return this.label;
        },
        // 重载占位符的setAttr， 以处理根占位符节点
        setAttr: function(key, val) {
            if (key === "label") {
                this.setLabel(val);
            } else {
                if (key.label) {
                    this.setLabel(key.label);
                    // 删除label
                    delete key.label;
                }
                // 继续设置其他属性
                this.callBase(key, val);
            }
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
                    return "\\placeholder ";
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
            this.opShape = generateOpShape(this, this.parentExpression.getLabel());
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
    function generateOpShape(operator, label) {
        if (label !== null) {
            return createRootPlaceholder(operator, label);
        } else {
            return createCommonShape(operator);
        }
    }
    // 创建通用图形
    function createCommonShape(operator) {
        var w = 13, h = 17, shape = null;
        shape = new kity.Rect(w, h, 0, 0).stroke("black").fill("transparent").translate(2, 6);
        shape.setAttr("stroke-dasharray", "1, 2");
        operator.addOperatorShape(shape);
        return shape;
    }
    // 创建根占位符图形
    function createRootPlaceholder(operator, label) {
        var textShape = new kity.Text(label), shapeGroup = new kity.Group(), padding = 10, borderBoxShape = null, textBox = null;
        shapeGroup.addShape(textShape);
        operator.addOperatorShape(shapeGroup);
        textBox = textShape.getRenderBox();
        // 宽度要加上padding
        borderBoxShape = new kity.Rect(textBox.width + padding * 2, textBox.height + padding * 2, 0, 0).stroke("black").fill("transparent");
        borderBoxShape.setAttr("stroke-dasharray", "1, 2");
        textShape.setAttr({
            dx: 0 - textBox.x,
            dy: 0 - textBox.y
        });
        textShape.translate(padding, padding);
        shapeGroup.addShape(borderBoxShape);
        // 对于根占位符， 返回的不是组， 而是组容器内部的虚线框。 以方便选中变色
        return borderBoxShape;
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
 * 数学公式解析器
 */
define("parse/parser", [ "kf", "kity", "parse/vgroup-def", "parse/root-p-text", "def/group-type", "kf-ext/extension", "kf-ext/def", "kf-ext/expression/placeholder" ], function(require) {
    var KFParser = require("kf").Parser, kity = require("kity"), VGROUP_LIST = require("parse/vgroup-def"), ROOT_P_TEXT = require("parse/root-p-text"), COMBINATION_NAME = "combination", PID_PREFIX = "_kf_editor_", GROUP_TYPE = require("def/group-type"), PID = 0;
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
        if (isRoot) {
            processRootGroup(parser, tree);
        } else if (parentTree.attr["data-root"] && tree.name === "placeholder") {
            tree.attr.label = ROOT_P_TEXT;
        }
        for (var i = 0, len = tree.operand.length; i < len; i++) {
            currentOperand = tree.operand[i];
            if (isVirtualGroup(tree)) {
                // 虚拟组处理
                processVirtualGroup(parser, i, tree, currentOperand);
            } else {
                processGroup(parser, i, tree, currentOperand);
            }
        }
        return tree;
    }
    function generateId() {
        return PID_PREFIX + ++PID;
    }
    function processRootGroup(parser, tree) {
        // 如果isResetId为false， 表示当前生成的是子树
        // 则不做data-root标记， 同时更改该包裹的类型为GROUP_TYPE.VIRTUAL
        if (!parser.isResetId) {
            tree.attr["data-type"] = GROUP_TYPE.VIRTUAL;
        } else {
            tree.attr["data-root"] = "true";
        }
    }
    /**
     * 虚拟组处理
     * @param parser 解析器实例
     * @param index 当前处理的子树所在其父节点的索引位置
     * @param tree 需要处理的树父树
     * @param subtree 当前需要处理的树
     */
    function processVirtualGroup(parser, index, tree, subtree) {
        // 括号组的前两个元素不用处理
        if (tree.name === "brackets" && index < 2) {
            return;
        } else if (tree.name === "function" && index === 0) {
            return;
        }
        tree.attr["data-type"] = GROUP_TYPE.VIRTUAL;
        if (!subtree) {
            tree.operand[index] = subtree;
        } else if (typeof subtree === "string") {
            tree.operand[index] = createGroup(parser);
            tree.operand[index].operand[0] = subtree;
        } else if (isPlaceholder(subtree)) {
            tree.operand[index] = createGroup(parser);
            tree.operand[index].operand[0] = supplementTree(parser, subtree, tree.operand[index]);
        } else {
            tree.operand[index] = supplementTree(parser, subtree, tree);
        }
    }
    function processGroup(parser, index, tree, subtree) {
        tree.attr["data-type"] = GROUP_TYPE.GROUP;
        if (!subtree || typeof subtree === "string") {
            tree.operand[index] = subtree;
        } else {
            tree.operand[index] = supplementTree(parser, subtree, tree);
        }
    }
    // 判断给定的树是否是一个虚拟组
    function isVirtualGroup(tree) {
        return !!VGROUP_LIST[tree.name];
    }
    // 判断给定的树是否是一个占位符
    function isPlaceholder(tree) {
        return tree.name === "placeholder";
    }
    // 创建一个新组， 组的内容是空
    function createGroup(parser) {
        return {
            name: COMBINATION_NAME,
            attr: {
                "data-type": GROUP_TYPE.GROUP,
                id: parser.getGroupId()
            },
            operand: []
        };
    }
    return Parser;
});
/*!
 * 根占位符内容
 */
define("parse/root-p-text", [], function() {
    return "在此处键入公式";
});
/*!
 * 虚拟组列表
 */
define("parse/vgroup-def", [], function() {
    return {
        radical: true,
        fraction: true,
        summation: true,
        integration: true,
        placeholder: true,
        script: true,
        superscript: true,
        subscript: true,
        brackets: true,
        "function": true
    };
});
/*!
 * 定位模块
 */
define("position/position", [ "kity", "base/utils", "base/common", "base/event/event" ], function(require) {
    var kity = require("kity"), kfUtils = require("base/utils"), // 表达式的内容组"标签"
    CONTENT_DATA_TYPE = "kf-editor-exp-content-box", PositionComponenet = kity.createClass("PositionComponenet", {
        constructor: function(kfEditor) {
            this.kfEditor = kfEditor;
            this.initServices();
        },
        initServices: function() {
            this.kfEditor.registerService("position.get.group", this, {
                getGroupByTarget: this.getGroupByTarget
            });
            this.kfEditor.registerService("position.get.index", this, {
                getIndexByTargetInGroup: this.getIndexByTargetInGroup
            });
            this.kfEditor.registerService("position.get.location.info", this, {
                getLocationInfo: this.getLocationInfo
            });
            this.kfEditor.registerService("position.get.parent.group", this, {
                getParentGroupByTarget: this.getParentGroupByTarget
            });
            this.kfEditor.registerService("position.get.wrap", this, {
                getWrap: this.getWrap
            });
            this.kfEditor.registerService("position.get.area", this, {
                getAreaByCursorInGroup: this.getAreaByCursorInGroup
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
        /**
             * 根据给定的组节点和目标节点， 获取目标节点在组节点内部的索引
             * @param groupNode 组节点
             * @param targetNode 目标节点
             */
        getIndexByTargetInGroup: function(groupNode, targetNode) {
            var groupInfo = this.kfEditor.requestService("syntax.get.group.content", groupNode.id), index = -1;
            kity.Utils.each(groupInfo.content, function(child, i) {
                index = i;
                if (child.contains(targetNode)) {
                    return false;
                }
            });
            return index;
        },
        /**
             * 根据给定的组节点和给定的偏移值，获取当前偏移值在组中的区域值。
             * 该区域值的取值为true时， 表示在右区域， 反之则在左区域
             * @param groupNode 组节点
             * @param offset 偏移值
             */
        getAreaByCursorInGroup: function(groupNode, offset) {
            var groupRect = kfUtils.getRect(groupNode);
            return groupRect.left + groupRect.width / 2 < offset;
        },
        getLocationInfo: function(distance, groupInfo) {
            var index = -1, children = groupInfo.content, boundingRect = null;
            for (var i = children.length - 1, child = null; i >= 0; i--) {
                index = i;
                child = children[i];
                boundingRect = kfUtils.getRect(child);
                if (boundingRect.left < distance) {
                    if (boundingRect.left + boundingRect.width / 2 < distance) {
                        index += 1;
                    }
                    break;
                }
            }
            return index;
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
            var result = {}, containerNode = getGroup(target, false, false), containerInfo = null;
            if (!containerNode) {
                return null;
            }
            containerInfo = this.kfEditor.requestService("syntax.get.group.content", containerNode.id);
            for (var i = 0, len = containerInfo.content.length; i < len; i++) {
                result.index = i;
                if (containerInfo.content[i].contains(target)) {
                    break;
                }
            }
            result.group = containerInfo;
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
            this.kfEditor.registerService("render.tint.current.cursor", this, {
                tintCurrentGroup: this.tintCurrentGroup
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
            var groupObject = this.kfEditor.requestService("syntax.get.group.object", groupId);
            this.clearSelect();
            if (groupObject.node.getAttribute("data-root")) {
                // 根节点不着色
                return;
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
        /**
             * 根据当前光标信息绘制选区
             */
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
        /**
             * 根据当前的光标信息，对当前光标所在的容器进行着色
             */
        tintCurrentGroup: function() {
            var groupId = this.kfEditor.requestService("syntax.get.record.cursor").groupId, groupObject = this.kfEditor.requestService("syntax.get.group.object", groupId), isPlaceholder = this.kfEditor.requestService("syntax.is.placeholder.node", groupId);
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
 * 删除控制
 */
define("syntax/delete", [ "kity" ], function(require, exports, module) {
    var kity = require("kity");
    return kity.createClass("DeleteComponent", {
        constructor: function(parentComponent, kfEditor) {
            this.parentComponent = parentComponent;
            this.kfEditor = kfEditor;
        },
        deleteGroup: function() {
            var cursorInfo = this.parentComponent.getCursorRecord(), objTree = this.parentComponent.getObjectTree(), // 当前的树信息
            currentTree = objTree.mapping[cursorInfo.groupId].strGroup;
            // 选区长度为0, 则删除前一个组
            if (cursorInfo.startOffset === cursorInfo.endOffset) {
                // 已经到最前， 需要进一步处理
                if (cursorInfo.startOffset === 0) {
                    // 根节点时， 直接退出， 不做任何处理
                    if (this.parentComponent.isRootTree(currentTree)) {
                        return false;
                    }
                    // 不是根节点时， 选中当前容器的父容器
                    cursorInfo = this.selectParentContainer(cursorInfo.groupId);
                    this.parentComponent.updateCursor(cursorInfo);
                    return false;
                } else {
                    // 还有更多剩余内容， 则直接删除前一个组
                    if (currentTree.operand.length > 1) {
                        cursorInfo = this.deletePrevGroup(currentTree, cursorInfo);
                    } else {
                        // 更新光标位置
                        cursorInfo.startOffset = 0;
                        cursorInfo.endOffset = 1;
                        // 处理组类型， 选中该组即可
                        if (currentTree.operand[0].attr && this.parentComponent.isGroupNode(currentTree.operand[0].attr.id)) {
                            this.parentComponent.updateCursor(cursorInfo);
                            return false;
                        } else {
                            // 替换成占位符
                            currentTree.operand[0] = {
                                name: "placeholder",
                                operand: []
                            };
                            this.parentComponent.updateCursor(cursorInfo);
                            return true;
                        }
                    }
                }
            } else {
                // 当前选中占位符的情况
                if (this.parentComponent.isSelectPlaceholder()) {
                    // 如果是根节点， 则不允许删除
                    if (this.parentComponent.isRootTree(currentTree)) {
                        return false;
                    } else {
                        cursorInfo = this.selectParentContainer(cursorInfo.groupId);
                        this.parentComponent.updateCursor(cursorInfo);
                        return false;
                    }
                } else {
                    return this.deleteSelection(currentTree, cursorInfo);
                }
            }
            this.parentComponent.updateCursor(cursorInfo);
            // 选区长度为0， 则可以判定当前公式发生了改变
            if (cursorInfo.startOffset === cursorInfo.endOffset) {
                return true;
            }
            return false;
        },
        // 删除前一个节点, 返回更新后的光标信息
        deletePrevGroup: function(tree, cursorInfo) {
            // 待删除的组
            var index = cursorInfo.startOffset - 1, group = tree.operand[index];
            // 叶子节点可以直接删除
            if (this.parentComponent.isLeafTree(group)) {
                tree.operand.splice(index, 1);
                cursorInfo.startOffset -= 1;
                cursorInfo.endOffset -= 1;
            } else {
                cursorInfo.startOffset -= 1;
            }
            return cursorInfo;
        },
        // 删除选区内容
        deleteSelection: function(tree, cursorInfo) {
            // 选中的是容器内的所有内容
            if (cursorInfo.startOffset === 0 && cursorInfo.endOffset === tree.operand.length) {
                tree.operand.length = 1;
                tree.operand[0] = {
                    name: "placeholder",
                    operand: []
                };
                cursorInfo.endOffset = 1;
            } else {
                tree.operand.splice(cursorInfo.startOffset, cursorInfo.endOffset - cursorInfo.startOffset);
                cursorInfo.endOffset = cursorInfo.startOffset;
            }
            this.parentComponent.updateCursor(cursorInfo);
            return true;
        },
        // 选中给定ID节点的父容器
        selectParentContainer: function(groupId) {
            var currentGroupNode = this.parentComponent.getGroupObject(groupId).node, parentContainerInfo = this.kfEditor.requestService("position.get.group", currentGroupNode), // 当前组在父容器中的索引
            index = this.kfEditor.requestService("position.get.index", parentContainerInfo.groupObj, currentGroupNode);
            // 返回新的光标信息
            return {
                groupId: parentContainerInfo.id,
                startOffset: index,
                endOffset: index + 1
            };
        }
    });
});
/*！
 * 光标移动控制
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
                this.parentComponent.updateCursor(cursorInfo);
            }
        },
        rightMove: function() {
            var cursorInfo = this.parentComponent.getCursorRecord();
            cursorInfo = updateCursorGoRight.call(this, cursorInfo);
            // cursorInfo 为null则不用处理
            if (cursorInfo) {
                this.parentComponent.updateCursor(cursorInfo);
            }
        }
    });
    function updateCursorGoLeft(cursorInfo) {
        var prevGroupNode = null, syntaxComponent = this.parentComponent, containerInfo = null;
        containerInfo = syntaxComponent.getGroupContent(cursorInfo.groupId);
        // 当前处于占位符中
        if (syntaxComponent.isSelectPlaceholder()) {
            return locateOuterIndex(this, containerInfo.content[cursorInfo.startOffset], DIRECTION.LEFT);
        }
        if (cursorInfo.startOffset === cursorInfo.endOffset) {
            if (cursorInfo.startOffset > 0) {
                prevGroupNode = containerInfo.content[cursorInfo.startOffset - 1];
                if (isGroupNode(prevGroupNode)) {
                    cursorInfo = locateIndex(this, prevGroupNode, DIRECTION.LEFT);
                } else {
                    cursorInfo.startOffset -= 1;
                    // 非占位符处理
                    if (!isPlaceholderNode(prevGroupNode)) {
                        cursorInfo.endOffset = cursorInfo.startOffset;
                    }
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
        containerInfo = syntaxComponent.getGroupContent(cursorInfo.groupId);
        // 当前处于占位符中
        if (syntaxComponent.isSelectPlaceholder()) {
            return locateOuterIndex(this, containerInfo.content[cursorInfo.startOffset], DIRECTION.RIGHT);
        }
        if (cursorInfo.startOffset === cursorInfo.endOffset) {
            if (cursorInfo.startOffset < containerInfo.content.length) {
                nextGroupNode = containerInfo.content[cursorInfo.startOffset];
                // 进入容器内部
                if (isGroupNode(nextGroupNode)) {
                    cursorInfo = locateIndex(this, nextGroupNode, DIRECTION.RIGHT);
                } else {
                    cursorInfo.startOffset += 1;
                    // 非占位符同时更新结束偏移
                    if (!isPlaceholderNode(nextGroupNode)) {
                        cursorInfo.endOffset = cursorInfo.startOffset;
                    }
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
                        groupId: groupNode.id,
                        startOffset: groupInfo.content.length - 1,
                        endOffset: groupInfo.content.length
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
        // 如果外部组是容器， 则直接定位即可
        if (isContainerNode(outerGroupInfo.group.groupObj)) {
            return {
                groupId: outerGroupInfo.group.id,
                startOffset: outerGroupInfo.index,
                endOffset: outerGroupInfo.index
            };
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
                if (isPlaceholderNode(groupElement)) {
                    return {
                        groupId: groupNode.id,
                        startOffset: 0,
                        endOffset: 1
                    };
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
            groupInfo = syntaxComponent.getGroupContent(groupNode.id);
            // 检查内容开始元素是否是占位符
            if (syntaxComponent.isPlaceholder(groupInfo.content[0].id)) {
                return {
                    groupId: groupNode.id,
                    startOffset: 0,
                    endOffset: 1
                };
            }
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
        return node.getAttribute("data-flag") === "Placeholder";
    }
    function isEmptyNode(node) {
        return node.getAttribute("data-flag") === "Empty";
    }
});
/*!
 * 语法控制单元
 */
define("syntax/syntax", [ "kity", "syntax/move", "syntax/delete", "def/group-type" ], function(require) {
    var kity = require("kity"), MoveComponent = require("syntax/move"), DeleteComponent = require("syntax/delete"), CURSOR_CHAR = "", GROUP_TYPE = require("def/group-type"), SyntaxComponenet = kity.createClass("SyntaxComponenet", {
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
            this.components["delete"] = new DeleteComponent(this, this.kfEditor);
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
            this.kfEditor.registerService("syntax.is.root.node", this, {
                isRootNode: this.isRootNode
            });
            this.kfEditor.registerService("syntax.is.group.node", this, {
                isGroupNode: this.isGroupNode
            });
            this.kfEditor.registerService("syntax.is.virtual.node", this, {
                isVirtualNode: this.isVirtualNode
            });
            this.kfEditor.registerService("syntax.is.placeholder.node", this, {
                isPlaceholder: this.isPlaceholder
            });
            this.kfEditor.registerService("syntax.is.select.placeholder", this, {
                isSelectPlaceholder: this.isSelectPlaceholder
            });
            this.kfEditor.registerService("syntax.has.root.placeholder", this, {
                hasRootplaceholder: this.hasRootplaceholder
            });
            this.kfEditor.registerService("syntax.valid.brackets", this, {
                isBrackets: this.isBrackets
            });
            this.kfEditor.registerService("syntax.get.group.content", this, {
                getGroupContent: this.getGroupContent
            });
            this.kfEditor.registerService("syntax.get.root.group.info", this, {
                getRootGroupInfo: this.getRootGroupInfo
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
            this.kfEditor.registerService("syntax.serialization", this, {
                serialization: this.serialization
            });
            this.kfEditor.registerService("syntax.cursor.move.left", this, {
                leftMove: this.leftMove
            });
            this.kfEditor.registerService("syntax.cursor.move.right", this, {
                rightMove: this.rightMove
            });
            this.kfEditor.registerService("syntax.delete.group", this, {
                deleteGroup: this.deleteGroup
            });
        },
        updateObjTree: function(objTree) {
            var selectInfo = objTree.select;
            if (selectInfo && selectInfo.groupId) {
                this.updateCursor(selectInfo.groupId, selectInfo.startOffset, selectInfo.endOffset);
            }
            this.objTree = objTree;
        },
        // 验证给定ID的组是否是根节点
        isRootNode: function(groupId) {
            return this.objTree.mapping.root.strGroup.attr.id === groupId;
        },
        // 验证给定ID的组是否是组节点
        isGroupNode: function(groupId) {
            var type = this.objTree.mapping[groupId].strGroup.attr["data-type"];
            return type === GROUP_TYPE.GROUP || type === GROUP_TYPE.VIRTUAL;
        },
        isVirtualNode: function(groupId) {
            return this.objTree.mapping[groupId].strGroup.attr["data-type"] === GROUP_TYPE.VIRTUAL;
        },
        // 验证给定ID的组是否是占位符
        isPlaceholder: function(groupId) {
            var currentNode = this.objTree.mapping[groupId];
            if (!currentNode) {
                return false;
            }
            currentNode = currentNode.objGroup.node;
            return currentNode.getAttribute("data-flag") === "Placeholder";
        },
        isBrackets: function(groupId) {
            return !!this.objTree.mapping[groupId].objGroup.node.getAttribute("data-brackets");
        },
        // 当前是否存在“根占位符”
        hasRootplaceholder: function() {
            return this.objTree.mapping.root.strGroup.operand[0].name === "placeholder";
        },
        // 当前光标选中的是否是占位符
        isSelectPlaceholder: function() {
            var cursorInfo = this.record.cursor, groupInfo = null;
            if (cursorInfo.endOffset - cursorInfo.startOffset !== 1) {
                return false;
            }
            groupInfo = this.getGroupContent(cursorInfo.groupId);
            if (!this.isPlaceholder(groupInfo.content[cursorInfo.startOffset].id)) {
                return false;
            }
            return true;
        },
        // 给定的子树是否是一个叶子节点
        isLeafTree: function(tree) {
            return typeof tree === "string";
        },
        // 给定的子树是否是根节点
        isRootTree: function(tree) {
            return tree.attr && tree.attr["data-root"];
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
        getRootGroupInfo: function() {
            var rootGroupId = this.objTree.mapping.root.strGroup.attr.id;
            return this.getGroupContent(rootGroupId);
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
        serialization: function() {
            var cursor = this.record.cursor, objGroup = this.objTree.mapping[cursor.groupId], curStrGroup = objGroup.strGroup, resultStr = null, strStartIndex = -1, strEndIndex = -1;
            // 格式化偏移值， 保证在处理操作数时， 标记位置不会出错
            strStartIndex = Math.min(cursor.endOffset, cursor.startOffset);
            strEndIndex = Math.max(cursor.endOffset, cursor.startOffset);
            curStrGroup.operand.splice(strEndIndex, 0, CURSOR_CHAR);
            curStrGroup.operand.splice(strStartIndex, 0, CURSOR_CHAR);
            strEndIndex += 1;
            // 返回结构树进过序列化后所对应的latex表达式， 同时包含有当前光标定位点信息
            resultStr = this.kfEditor.requestService("parser.latex.serialization", this.objTree.parsedTree);
            curStrGroup.operand.splice(strEndIndex, 1);
            curStrGroup.operand.splice(strStartIndex, 1);
            strStartIndex = resultStr.indexOf(CURSOR_CHAR);
            // 选区长度为0, 则只使用一个标记位
            if (cursor.startOffset === cursor.endOffset) {
                resultStr = resultStr.replace(CURSOR_CHAR, "");
            }
            strEndIndex = resultStr.lastIndexOf(CURSOR_CHAR);
            return {
                str: resultStr,
                startOffset: strStartIndex,
                endOffset: strEndIndex
            };
        },
        // 更新光标记录， 同时更新数据
        updateCursor: function(groupId, startOffset, endOffset) {
            var tmp = null;
            // 支持一个cursorinfo对象
            if (arguments.length === 1) {
                endOffset = groupId.endOffset;
                startOffset = groupId.startOffset;
                groupId = groupId.groupId;
            }
            if (endOffset === undefined) {
                endOffset = startOffset;
            }
            if (startOffset > endOffset) {
                tmp = endOffset;
                endOffset = startOffset;
                startOffset = tmp;
            }
            this.record.cursor = {
                groupId: groupId,
                startOffset: startOffset,
                endOffset: endOffset
            };
        },
        leftMove: function() {
            this.components.move.leftMove();
        },
        rightMove: function() {
            this.components.move.rightMove();
        },
        // 根据当前光标的信息，删除组
        deleteGroup: function() {
            return this.components.delete.deleteGroup();
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
define("ui/toolbar-ele-list", [ "ui/ui-impl/def/ele-type", "ui/ui-impl/def/box-type", "kity" ], function(require) {
    var UI_ELE_TYPE = require("ui/ui-impl/def/ele-type"), BOX_TYPE = require("ui/ui-impl/def/box-type"), kity = require("kity");
    var config = [ {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "预设",
                icon: "assets/images/toolbar/button/pi.png"
            },
            box: {
                group: [ {
                    title: "预设公式",
                    items: [ {
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
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DELIMITER
    }, {
        type: UI_ELE_TYPE.AREA,
        options: {
            button: {
                icon: "assets/images/toolbar/char/button.png"
            },
            box: {
                width: 527,
                type: BOX_TYPE.OVERLAP,
                group: [ {
                    title: "基础数学",
                    items: [ {
                        title: "基础数学",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/pm.png">',
                                val: "\\pm"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/infty.png">',
                                val: "\\infty"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/eq.png">',
                                val: "="
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/sim.png">',
                                val: "\\sim"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/times.png">',
                                val: "\\times"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/div.png">',
                                val: "\\div"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/tanhao.png">',
                                val: "!"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/lt.png">',
                                val: "<"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/ll.png">',
                                val: "\\ll"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/gt.png">',
                                val: ">"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/gg.png">',
                                val: "\\gg"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/leq.png">',
                                val: "\\leq"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/geq.png">',
                                val: "\\geq"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/mp.png">',
                                val: "\\mp"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/simeq.png">',
                                val: "\\simeq"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/equiv.png">',
                                val: "\\equiv"
                            }
                        } ]
                    } ]
                }, {
                    title: "希腊字母",
                    items: []
                }, {
                    title: "求反关系运算符",
                    items: []
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
                width: 332,
                group: [ {
                    title: "分数",
                    items: [ {
                        title: "分数",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/frac/1.png">',
                                val: "\\frac \\placeholder\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/frac/2.png">',
                                val: "{\\placeholder/\\placeholder}"
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
                width: 332,
                group: [ {
                    title: "上标和下标",
                    items: [ {
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
                                val: "{^\\placeholder_\\placeholder\\placeholder}"
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
                width: 332,
                group: [ {
                    title: "根式",
                    items: [ {
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
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "积分",
                icon: "assets/images/toolbar/button/int.png"
            },
            box: {
                width: 332,
                group: [ {
                    title: "积分",
                    items: [ {
                        title: "积分",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/int/1.png">',
                                val: "\\int \\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/int/2.png">',
                                val: "\\int^\\placeholder_\\placeholder\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/int/3.png">',
                                val: "\\iint\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/int/4.png">',
                                val: "\\iint^\\placeholder_\\placeholder\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/int/5.png">',
                                val: "\\iiint\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/int/6.png">',
                                val: "\\iiint^\\placeholder_\\placeholder\\placeholder"
                            }
                        } ]
                    } ]
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "大型运算符",
                icon: "assets/images/toolbar/button/sum.png"
            },
            box: {
                width: 332,
                group: [ {
                    title: "求和",
                    items: [ {
                        title: "求和",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/large/1.png">',
                                val: "\\sum\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/large/2.png">',
                                val: "\\sum^\\placeholder_\\placeholder\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/large/3.png">',
                                val: "\\sum_\\placeholder\\placeholder"
                            }
                        } ]
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
                width: 332,
                group: [ {
                    title: "方括号",
                    items: [ {
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
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "函数",
                icon: "assets/images/toolbar/button/sin.png"
            },
            box: {
                width: 249,
                group: [ {
                    title: "函数",
                    items: [ {
                        title: "三角函数",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/func/1.png">',
                                val: "\\sin\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/2.png">',
                                val: "\\cos\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/3.png">',
                                val: "\\tan\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/4.png">',
                                val: "\\csc\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/5.png">',
                                val: "\\sec\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/6.png">',
                                val: "\\cot\\placeholder"
                            }
                        } ]
                    }, {
                        title: "常用函数",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/func/c1.png">',
                                val: "\\sin\\theta"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/c2.png">',
                                val: "\\sin{2x}"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/c3.png">',
                                val: "\\tan\\theta=\\frac {\\sin\\theta}{\\cos\\theta}"
                            }
                        } ]
                    } ]
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "极限和对数",
                icon: "assets/images/toolbar/button/lim.png"
            },
            box: {
                width: 249,
                group: [ {
                    title: "函数",
                    items: [ {
                        title: "函数",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/func/1.png">',
                                val: "\\sin\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/2.png">',
                                val: "\\cos\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/3.png">',
                                val: "\\tan\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/4.png">',
                                val: "\\csc\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/5.png">',
                                val: "\\sec\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/6.png">',
                                val: "\\cot\\placeholder"
                            }
                        } ]
                    }, {
                        title: "常用函数",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/func/c1.png">',
                                val: "\\sin\\theta"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/c2.png">',
                                val: "\\sin{2x}"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/c3.png">',
                                val: "\\tan\\theta=\\frac {\\sin\\theta}{\\cos\\theta}"
                            }
                        } ]
                    } ]
                } ]
            }
        }
    } ];
    // 初始化希腊字符配置
    (function() {
        var greekList = [ {
            title: "小写",
            values: [ "alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa", "lambda", "mu", "nu", "xi", "omicron", "pi", "rho", "sigma", "tau", "upsilon", "phi", "chi", "psi", "omega" ]
        }, {
            title: "大写",
            values: [ "Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "Mu", "Nu", "Xi", "Omicron", "Pi", "Rho", "Sigma", "Tau", "Upsilon", "Phi", "Chi", "Psi", "Omega" ]
        } ], greekConfigList = config[2].options.box.group[1].items;
        // 小写处理
        greekConfigList.push({
            title: greekList[0].title,
            content: getContents({
                path: "assets/images/toolbar/char/greek/lower/",
                values: greekList[0].values
            })
        });
        // 大写处理
        greekConfigList.push({
            title: greekList[1].title,
            content: getContents({
                path: "assets/images/toolbar/char/greek/upper/",
                values: greekList[1].values
            })
        });
    })();
    // 初始化求反运算符
    (function() {
        var greekList = [ {
            title: "求反关系运算符",
            values: [ "neq", "ncong", "nequiv", "nge", "ngt", "nin", "nle", "nlt", "nsim", "nsubseteq", "nsupseteq" ]
        } ], greekConfigList = config[2].options.box.group[2].items;
        greekConfigList.push({
            title: greekList[0].title,
            content: getContents({
                path: "assets/images/toolbar/char/not/",
                values: greekList[0].values
            })
        });
    })();
    function getContents(data) {
        var result = [], path = data.path, values = data.values;
        kity.Utils.each(values, function(value) {
            result.push({
                item: {
                    show: '<img src="' + path + value.toLowerCase() + '.png">',
                    val: "\\" + value
                }
            });
        });
        return result;
    }
    return config;
});
/*!
 * 工具条组件
 */
define("ui/toolbar/toolbar", [ "kity", "ui/ui-impl/ui", "ui/ui-impl/drapdown-box", "ui/ui-impl/delimiter", "ui/ui-impl/area", "ui/ui-impl/ui-utils", "jquery", "ui/ui-impl/def/ele-type" ], function(require) {
    var kity = require("kity"), UiImpl = require("ui/ui-impl/ui"), $$ = require("ui/ui-impl/ui-utils"), UI_ELE_TYPE = require("ui/ui-impl/def/ele-type"), Tollbar = kity.createClass("Tollbar", {
        constructor: function(kfEditor, uiComponent, elementList) {
            this.kfEditor = kfEditor;
            this.uiComponent = uiComponent;
            // 工具栏元素定义列表
            this.elementList = elementList;
            this.elements = [];
            this.initToolbarElements();
            this.initServices();
            this.initEvent();
        },
        initServices: function() {
            this.kfEditor.registerService("ui.toolbar.disable", this, {
                disableToolbar: this.disableToolbar
            });
            this.kfEditor.registerService("ui.toolbar.enable", this, {
                enableToolbar: this.enableToolbar
            });
            this.kfEditor.registerService("ui.toolbar.close", this, {
                closeToolbar: this.closeToolbar
            });
        },
        initEvent: function() {
            var _self = this;
            $$.on(this.uiComponent.toolbarContainer, "mousedown", function(e) {
                e.preventDefault();
            });
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
            this.kfEditor.requestService("control.insert.string", val);
        },
        disableToolbar: function() {
            kity.Utils.each(this.elements, function(ele) {
                ele.disable && ele.disable();
            });
        },
        enableToolbar: function() {
            kity.Utils.each(this.elements, function(ele) {
                ele.enable && ele.enable();
            });
        },
        closeToolbar: function() {
            this.closeElement();
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

          case UI_ELE_TYPE.AREA:
            return createArea(doc, options);
        }
    }
    function createDrapdownBox(doc, options) {
        return new UiImpl.DrapdownBox(doc, options);
    }
    function createDelimiter(doc) {
        return new UiImpl.Delimiter(doc);
    }
    function createArea(doc, options) {
        return new UiImpl.Area(doc, options);
    }
    return Tollbar;
});
/*!
 * 特殊字符区域
 */
define("ui/ui-impl/area", [ "kity", "ui/ui-impl/ui-utils", "jquery", "ui/ui-impl/box", "ui/ui-impl/def/box-type", "ui/ui-impl/def/item-type", "ui/ui-impl/button", "ui/ui-impl/list" ], function(require) {
    var kity = require("kity"), PREFIX = "kf-editor-ui-", // UiUitls
    $$ = require("ui/ui-impl/ui-utils"), Box = require("ui/ui-impl/box"), Area = kity.createClass("Area", {
        constructor: function(doc, options) {
            this.options = options;
            this.doc = doc;
            this.toolbar = null;
            this.disabled = true;
            this.element = this.createArea();
            this.container = this.createContainer();
            this.button = this.createButton();
            this.mountPoint = this.createMountPoint();
            this.boxObject = this.createBox();
            this.mergeElement();
            this.mount();
            this.setListener();
            this.initEvent();
            this.updateContent();
        },
        initEvent: function() {
            var _self = this;
            $$.on(this.button, "mousedown", function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (e.which !== 1 || _self.disabled) {
                    return;
                }
                _self.showMount();
                _self.toolbar.notify("closeOther", _self);
            });
            $$.delegate(this.container, ".kf-editor-ui-area-item", "mousedown", function(e) {
                e.preventDefault();
                if (e.which !== 1 || _self.disabled) {
                    return;
                }
                $$.publish("data.select", this.getAttribute("data-value"));
            });
            this.boxObject.initEvent();
        },
        disable: function() {
            this.disabled = true;
            this.boxObject.disable();
            this.element.classList.remove(PREFIX + "enabled");
        },
        enable: function() {
            this.disabled = false;
            this.boxObject.enable();
            this.element.classList.add(PREFIX + "enabled");
        },
        setListener: function() {
            var _self = this;
            this.boxObject.setSelectHandler(function(val) {
                // 发布
                $$.publish("data.select", val);
                _self.hide();
            });
            // 内容面板切换
            this.boxObject.setChangeHandler(function(index) {
                _self.updateContent();
            });
        },
        createArea: function() {
            var areaNode = $$.ele(this.doc, "div", {
                className: PREFIX + "area"
            });
            if ("width" in this.options) {
                areaNode.style.width = this.options.width + "px";
            }
            return areaNode;
        },
        updateContent: function() {
            var items = this.boxObject.getOverlapContent(), newContent = [];
            // 清空原有内容
            this.container.innerHTML = "";
            kity.Utils.each(items, function(item) {
                var contents = item.content;
                kity.Utils.each(contents, function(currentContent, index) {
                    currentContent = currentContent.item;
                    newContent.push('<div class="' + PREFIX + 'area-item" data-value="' + currentContent.val + '"><div class="' + PREFIX + 'area-item-content">' + currentContent.show + "</div></div>");
                });
            });
            this.container.innerHTML = newContent.join("");
        },
        // 挂载
        mount: function() {
            this.boxObject.mountTo(this.mountPoint);
        },
        showMount: function() {
            this.mountPoint.style.display = "block";
        },
        hideMount: function() {
            this.mountPoint.style.display = "none";
        },
        hide: function() {
            this.hideMount();
            this.boxObject.hide();
        },
        createButton: function() {
            return $$.ele(this.doc, "div", {
                className: PREFIX + "area-button",
                content: "▼"
            });
        },
        createMountPoint: function() {
            return $$.ele(this.doc, "div", {
                className: PREFIX + "area-mount"
            });
        },
        createBox: function() {
            return new Box(this.doc, this.options.box);
        },
        createContainer: function() {
            var node = $$.ele(this.doc, "div", {
                className: PREFIX + "area-container"
            });
            return node;
        },
        mergeElement: function() {
            this.element.appendChild(this.container);
            this.element.appendChild(this.button);
            this.element.appendChild(this.mountPoint);
        },
        setToolbar: function(toolbar) {
            this.toolbar = toolbar;
        },
        attachTo: function(container) {
            container.appendChild(this.element);
        }
    });
    return Area;
});
/**
 * Created by hn on 14-3-31.
 */
define("ui/ui-impl/box", [ "kity", "ui/ui-impl/ui-utils", "jquery", "ui/ui-impl/def/box-type", "ui/ui-impl/def/item-type", "ui/ui-impl/button", "ui/ui-impl/list" ], function(require) {
    var kity = require("kity"), PREFIX = "kf-editor-ui-", // UiUitls
    $$ = require("ui/ui-impl/ui-utils"), BOX_TYPE = require("ui/ui-impl/def/box-type"), ITEM_TYPE = require("ui/ui-impl/def/item-type"), Button = require("ui/ui-impl/button"), List = require("ui/ui-impl/list"), Box = kity.createClass("Box", {
        constructor: function(doc, options) {
            this.options = options;
            this.options.type = this.options.type || BOX_TYPE.DETACHED;
            this.doc = doc;
            this.overlapButtonObject = null;
            this.overlapIndex = -1;
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
        setChangeHandler: function(changeHandler) {
            this.onchangeHandler = changeHandler;
        },
        onchangeHandler: function(index) {},
        createGroupContainer: function() {
            return $$.ele(this.doc, "div", {
                className: PREFIX + "box-container"
            });
        },
        createItemGroup: function() {
            var itemGroup = this.createGroup();
            switch (this.options.type) {
              case BOX_TYPE.DETACHED:
                return itemGroup.items[0];

              case BOX_TYPE.OVERLAP:
                return this.createOverlapGroup(itemGroup);
            }
            return null;
        },
        enable: function() {
            if (this.overlapButtonObject) {
                this.overlapButtonObject.enable();
            }
        },
        disable: function() {
            if (this.overlapButtonObject) {
                this.overlapButtonObject.disable();
            }
        },
        hide: function() {
            this.overlapButtonObject && this.overlapButtonObject.hideMount();
        },
        getOverlapContent: function() {
            // 只有重叠式才可以获取重叠内容
            if (this.options.type !== BOX_TYPE.OVERLAP) {
                return null;
            }
            return this.options.group[this.overlapIndex].items;
        },
        createOverlapGroup: function(itemGroup) {
            var classifyList = itemGroup.title, _self = this, overlapContainer = createOverlapContainer(this.doc), overlapButtonObject = createOverlapButton(this.doc), overlapListObject = createOverlapList(this.doc, {
                width: 150,
                items: classifyList
            }), wrapNode = $$.ele(this.doc, "div", {
                className: PREFIX + "wrap-group"
            });
            this.overlapButtonObject = overlapButtonObject;
            // 组合选择组件
            overlapButtonObject.mount(overlapListObject);
            overlapButtonObject.initEvent();
            overlapListObject.initEvent();
            // 合并box的内容
            kity.Utils.each(itemGroup.items, function(itemArr, index) {
                var itemWrapNode = wrapNode.cloneNode(false);
                kity.Utils.each(itemArr, function(item) {
                    itemWrapNode.appendChild(item);
                });
                itemGroup.items[index] = itemWrapNode;
            });
            // 切换面板处理器
            overlapListObject.setSelectHandler(function(index, oldIndex) {
                _self.overlapIndex = index;
                overlapButtonObject.setLabel(classifyList[index] + " ▼");
                overlapButtonObject.hideMount();
                // 切换内容
                itemGroup.items[oldIndex].style.display = "none";
                itemGroup.items[index].style.display = "block";
                _self.onchangeHandler(index);
            });
            overlapContainer.appendChild(overlapButtonObject.getNode());
            kity.Utils.each(itemGroup.items, function(group, index) {
                if (index > 0) {
                    group.style.display = "none";
                }
                overlapContainer.appendChild(group);
            });
            overlapListObject.select(0);
            return [ overlapContainer ];
        },
        // 获取group的list列表, 该类表满足box的group参数格式
        getGroupList: function() {
            var lists = [];
            kity.Utils.each(this.options.group, function(group, index) {
                lists.push(group.title);
            });
            return {
                width: 150,
                items: lists
            };
        },
        createGroup: function() {
            var doc = this.doc, itemGroup = [], result = {
                title: [],
                items: []
            }, groupNode = null, groupTitle = null, itemType = BOX_TYPE.DETACHED === this.options.type ? ITEM_TYPE.BIG : ITEM_TYPE.SMALL, itemContainer = null;
            groupNode = $$.ele(this.doc, "div", {
                className: PREFIX + "box-group"
            });
            itemContainer = groupNode.cloneNode(false);
            itemContainer.className = PREFIX + "box-group-item-container";
            kity.Utils.each(this.options.group, function(group, i) {
                result.title.push(group.title || "");
                itemGroup = [];
                kity.Utils.each(group.items, function(item) {
                    groupNode = groupNode.cloneNode(false);
                    itemContainer = itemContainer.cloneNode(false);
                    groupTitle = $$.ele(doc, "div", {
                        className: PREFIX + "box-group-title",
                        content: item.title
                    });
                    groupNode.appendChild(groupTitle);
                    groupNode.appendChild(itemContainer);
                    kity.Utils.each(createItems(doc, item.content, itemType), function(boxItem) {
                        boxItem.appendTo(itemContainer);
                    });
                    itemGroup.push(groupNode);
                });
                result.items.push(itemGroup);
            });
            return result;
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
        constructor: function(type, doc, options) {
            this.type = type;
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
        getContent: function() {},
        createContent: function() {
            switch (this.type) {
              case ITEM_TYPE.BIG:
                return this.createBigContent();

              case ITEM_TYPE.SMALL:
                return this.createSmallContent();
            }
        },
        createBigContent: function() {
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
        createSmallContent: function() {
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
    function createItems(doc, group, type) {
        var items = [];
        kity.Utils.each(group, function(itemVal, i) {
            items.push(new BoxItem(type, doc, itemVal));
        });
        return items;
    }
    // 为重叠式box创建容器
    function createOverlapContainer(doc) {
        return $$.ele(doc, "div", {
            className: PREFIX + "overlap-container"
        });
    }
    function createOverlapButton(doc) {
        return new Button(doc, {
            sign: false,
            className: "overlap-button",
            label: ""
        });
    }
    function createOverlapList(doc, list) {
        return new List(doc, list);
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
            this.disabled = true;
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
                if (_self.disabled) {
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
        setLabel: function(labelText) {
            this.label.innerHTML = labelText;
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
            // 附加className
            if (this.options.className) {
                buttonNode.className += " " + PREFIX + this.options.className;
            }
            return buttonNode;
        },
        createIcon: function() {
            if (!this.options.icon) {
                return null;
            }
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
            if (this.options.sign === false) {
                return null;
            }
            return $$.ele(this.doc, "div", {
                className: PREFIX + "button-sign"
            });
        },
        createMountPoint: function() {
            return $$.ele(this.doc, "div", {
                className: PREFIX + "button-mount-point"
            });
        },
        disable: function() {
            this.disabled = true;
            this.element.classList.remove(PREFIX + "enabled");
        },
        enable: function() {
            this.disabled = false;
            this.element.classList.add(PREFIX + "enabled");
        },
        mergeElement: function() {
            this.icon && this.element.appendChild(this.icon);
            this.element.appendChild(this.label);
            this.sign && this.element.appendChild(this.sign);
            this.element.appendChild(this.mountPoint);
        }
    });
    return Button;
});
/*!
 * box类型定义
 */
define("ui/ui-impl/def/box-type", [], function(require) {
    return {
        // 分离式
        DETACHED: 1,
        // 重叠式
        OVERLAP: 2
    };
});
/*!
 * toolbar元素类型定义
 */
define("ui/ui-impl/def/ele-type", [], function(require) {
    return {
        DRAPDOWN_BOX: 1,
        AREA: 2,
        DELIMITER: 3
    };
});
/*!
 * 组元素类型定义
 */
define("ui/ui-impl/def/item-type", [], function(require) {
    return {
        BIG: 1,
        SMALL: 2
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
define("ui/ui-impl/drapdown-box", [ "kity", "ui/ui-impl/ui-utils", "jquery", "ui/ui-impl/button", "ui/ui-impl/box", "ui/ui-impl/def/box-type", "ui/ui-impl/def/item-type", "ui/ui-impl/list" ], function(require) {
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
        disable: function() {
            this.buttonElement.disable();
        },
        enable: function() {
            this.buttonElement.enable();
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
 * Created by hn on 14-3-31.
 */
define("ui/ui-impl/list", [ "kity", "ui/ui-impl/ui-utils", "jquery" ], function(require) {
    var kity = require("kity"), PREFIX = "kf-editor-ui-", // UiUitls
    $$ = require("ui/ui-impl/ui-utils"), List = kity.createClass("List", {
        constructor: function(doc, options) {
            this.options = options;
            this.doc = doc;
            this.onselectHandler = null;
            this.currentSelect = -1;
            this.element = this.createBox();
            this.itemGroups = this.createItems();
            this.mergeElement();
        },
        onselectHandler: function(index, oldIndex) {},
        setSelectHandler: function(selectHandler) {
            this.onselectHandler = selectHandler;
        },
        createBox: function() {
            var boxNode = $$.ele(this.doc, "div", {
                className: PREFIX + "list"
            }), // 创建背景
            bgNode = $$.ele(this.doc, "div", {
                className: PREFIX + "list-bg"
            });
            if ("width" in this.options) {
                boxNode.style.width = this.options.width + "px";
            }
            boxNode.appendChild(bgNode);
            return boxNode;
        },
        select: function(index) {
            var oldSelect = this.currentSelect;
            if (oldSelect === -1) {
                oldSelect = index;
            }
            this.unselect(oldSelect);
            this.currentSelect = index;
            this.itemGroups.items[index].firstChild.style.visibility = "visible";
            this.onselectHandler(index, oldSelect);
        },
        unselect: function(index) {
            this.itemGroups.items[index].firstChild.style.visibility = "hidden";
        },
        initEvent: function() {
            var className = "." + PREFIX + "list-item", _self = this;
            $$.delegate(this.itemGroups.container, className, "mousedown", function(e) {
                e.preventDefault();
                if (e.which !== 1) {
                    return;
                }
                _self.select(this.getAttribute("data-index"));
            });
            $$.on(this.element, "mousedown", function(e) {
                e.stopPropagation();
                e.preventDefault();
            });
        },
        createItems: function() {
            var doc = this.doc, groupNode = null, itemNode = null, iconNode = null, items = [], itemContainer = null;
            groupNode = $$.ele(this.doc, "div", {
                className: PREFIX + "list-item"
            });
            itemContainer = groupNode.cloneNode(false);
            itemContainer.className = PREFIX + "list-item-container";
            kity.Utils.each(this.options.items, function(itemText, i) {
                itemNode = groupNode.cloneNode(false);
                iconNode = groupNode.cloneNode(false);
                iconNode.className = PREFIX + "list-item-icon";
                iconNode.innerHTML = '<img src="assets/images/toolbar/button/tick.png">';
                itemNode.appendChild(iconNode);
                itemNode.appendChild($$.ele(doc, "text", itemText));
                itemNode.setAttribute("data-index", i);
                items.push(itemNode);
                itemContainer.appendChild(itemNode);
            });
            return {
                container: itemContainer,
                items: items
            };
        },
        mergeElement: function() {
            this.element.appendChild(this.itemGroups.container);
        },
        mountTo: function(container) {
            container.appendChild(this.element);
        }
    });
    return List;
});
/**
 * Created by hn on 14-4-1.
 */
define("ui/ui-impl/ui-utils", [ "jquery", "kity" ], function(require) {
    var $ = require("jquery"), kity = require("kity"), TOPIC_POOL = {};
    return {
        ele: function(doc, name, options) {
            var node = null;
            if (name === "text") {
                return doc.createTextNode(options);
            }
            node = doc.createElement(name);
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
define("ui/ui-impl/ui", [ "ui/ui-impl/drapdown-box", "kity", "ui/ui-impl/ui-utils", "ui/ui-impl/button", "ui/ui-impl/box", "ui/ui-impl/delimiter", "ui/ui-impl/area" ], function(require) {
    return {
        DrapdownBox: require("ui/ui-impl/drapdown-box"),
        Delimiter: require("ui/ui-impl/delimiter"),
        Area: require("ui/ui-impl/area")
    };
});
/**
 * Created by hn on 14-3-17.
 */
define("ui/ui", [ "kity", "base/utils", "base/common", "base/event/event", "ui/toolbar/toolbar", "ui/ui-impl/ui", "ui/ui-impl/ui-utils", "ui/ui-impl/def/ele-type", "ui/control/zoom", "ui/toolbar-ele-list", "ui/ui-impl/def/box-type" ], function(require, exports, modules) {
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
        updateContainerSize: function(container, toolbar, editArea, canvasContainer) {
            var containerBox = container.getBoundingClientRect();
            toolbar.style.width = containerBox.width + "px";
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
        KFEditor.registerComponents( "control", require( "control/controller" ) );

        kf.Editor = KFEditor;

    } );

    // build环境中才含有use
    try {
        use( 'kf.start' );
    } catch ( e ) {
    }

} )( this );
})();
