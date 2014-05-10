/**
 * Created by hn on 14-3-17.
 */

define( function ( require ) {

    var kity = require( "kity" ),

        Assembly = require( "kf" ).Assembly,

        DEFAULT_OPTIONS = {
            autoresize: false,
            fontsize: 30,
            padding: [ 20, 50 ]
        },

        RenderComponenet = kity.createClass( 'RenderComponent', {

            constructor: function ( kfEditor ) {

                this.kfEditor = kfEditor;
                this.assembly = null;
                this.formula = null;

                this.canvasZoom = 1;

                this.record = {
                    select: {},
                    cursor: {},
                    // 画布信息
                    canvas: {}
                };

                this.initCanvas();

                this.initServices();
                this.initCommands();

            },

            initCanvas: function () {

                var canvasContainer = this.kfEditor.requestService( "ui.get.canvas.container" ),
                    viewBox = null;

                this.assembly = Assembly.use( canvasContainer, DEFAULT_OPTIONS );
                this.formula = this.assembly.formula;

                viewBox = this.formula.getViewBox();
                this.formula.setViewBox( -viewBox.width / 2, -viewBox.height / 2, viewBox.width, viewBox.height );

            },

            initServices: function () {

                this.kfEditor.registerService( "render.get.canvas", this, {
                    getCanvas: this.getCanvas
                } );

                this.kfEditor.registerService( "render.get.content.size", this, {
                    getContentSize: this.getContentSize
                } );

                this.kfEditor.registerService( "render.clear.canvas.transform", this, {
                    clearCanvasTransform: this.clearCanvasTransform
                } );

                this.kfEditor.registerService( "render.revert.canvas.transform", this, {
                    revertCanvasTransform: this.revertCanvasTransform
                } );

                this.kfEditor.registerService( "render.relocation", this, {
                    relocation: this.relocation
                } );

                this.kfEditor.registerService( "render.select.group.content", this, {
                    selectGroupContent: this.selectGroupContent
                } );

                this.kfEditor.registerService( "render.select.group", this, {
                    selectGroup: this.selectGroup
                } );

                this.kfEditor.registerService( "render.select.group.all", this, {
                    selectAllGroup: this.selectAllGroup
                } );

                this.kfEditor.registerService( "render.tint.current.cursor", this, {
                    tintCurrentGroup: this.tintCurrentGroup
                } );

                this.kfEditor.registerService( "render.select.current.cursor", this, {
                    selectCurrentCursor: this.selectCurrentCursor
                } );

                this.kfEditor.registerService( "render.reselect", this, {
                    reselect: this.reselect
                } );

                this.kfEditor.registerService( "render.clear.select", this, {
                    clearSelect: this.clearSelect
                } );

                this.kfEditor.registerService( "render.set.canvas.zoom", this, {
                    setCanvasZoom: this.setCanvasZoom
                } );

                this.kfEditor.registerService( "render.get.canvas.zoom", this, {
                    getCanvasZoom: this.getCanvasZoom
                } );

                this.kfEditor.registerService( "render.get.paper.offset", this, {
                    getPaperOffset: this.getPaperOffset
                } );

                this.kfEditor.registerService( "render.draw", this, {
                    render: this.render
                } );

                this.kfEditor.registerService( "render.insert.string", this, {
                    insertString: this.insertString
                } );

                this.kfEditor.registerService( "render.insert.group", this, {
                    insertGroup: this.insertGroup
                } );

                this.kfEditor.registerService( "render.get.paper", this, {
                    getPaper: this.getPaper
                } );

            },

            initCommands: function () {

                this.kfEditor.registerCommand( "render", this, this.render );

                this.kfEditor.registerCommand( "getPaper", this, this.getPaper );

            },

            relocation: function () {

                var formulaSpace = this.formula.container.getRenderBox();

                this.formula.container.setTranslate( -formulaSpace.width / 2, -formulaSpace.height / 2);

            },

            selectGroup: function ( groupId ) {

                var groupObject = this.kfEditor.requestService( "syntax.get.group.object", groupId );

                this.clearSelect();

                if ( groupObject.node.getAttribute( "data-root" ) ) {
                    // 根节点不着色
                    return;
                }

                this.record.select.lastSelect = groupObject;

                groupObject.select();

            },

            selectGroupContent: function ( group ) {

                // 处理占位符
                if ( group.groupObj.getAttribute( "data-placeholder" ) !== null ) {
                    group = {
                        id: group.content[ 0 ].id
                    };
                }

                var groupObject = this.kfEditor.requestService( "syntax.get.group.object", group.id );

                this.clearSelect();

                this.record.select.lastSelect = groupObject;

                if ( groupObject.node.getAttribute( "data-root" ) ) {
                    // 根节点不着色
                    return;
                }

                groupObject.select();

            },

            selectAllGroup: function ( group ) {

                // 处理占位符
                if ( group.groupObj.getAttribute( "data-placeholder" ) !== null ) {
                    group = {
                        id: group.content[ 0 ].id
                    };
                }

                var groupObject = this.kfEditor.requestService( "syntax.get.group.object", group.id );

                this.clearSelect();

                this.record.select.lastSelect = groupObject;

                groupObject.selectAll();

            },

            /**
             * 根据当前光标信息绘制选区
             */
            selectCurrentCursor: function () {

                var cursorInfo = this.kfEditor.requestService( "syntax.get.record.cursor" ),
                    group = this.kfEditor.requestService( "syntax.get.group.object", cursorInfo.groupId ),
                    box = null,
                    offset = -1,
                    width = 0,
                    startIndex = Math.min( cursorInfo.startOffset, cursorInfo.endOffset ),
                    endIndex = Math.max( cursorInfo.startOffset, cursorInfo.endOffset );

                this.clearSelect();

                // 更新记录
                this.record.select.lastSelect = group;

                for ( var i = startIndex, len = endIndex; i < len; i++ ) {

                    box = group.getOperand( i ).getRenderBox( group );

                    if ( offset == -1 ) {
                        offset = box.x;
                    }

                    width += box.width;

                }

                group.setBoxWidth( width );
                group.selectAll();
                group.getBox().setTranslate( offset, 0 );

            },

            /**
             * 根据当前的光标信息，对当前光标所在的容器进行着色
             */
            tintCurrentGroup: function () {

                var groupId = this.kfEditor.requestService( "syntax.get.record.cursor" ).groupId,
                    groupObject = this.kfEditor.requestService( "syntax.get.group.object", groupId ),
                    isPlaceholder = this.kfEditor.requestService( "syntax.is.placeholder.node", groupId );

                this.clearSelect();

                if ( groupObject.node.getAttribute( "data-root" ) ) {
                    // 根节点不着色
                    return;
                }

                // 占位符着色
                if ( isPlaceholder ) {
                    // 替换占位符包裹组为占位符本身
                    groupObject = this.kfEditor.requestService( "syntax.get.group.object", groupObject.operands[ 0 ].node.id );
                }

                this.record.select.lastSelect = groupObject;

                groupObject.select();

            },

            reselect: function () {

                var cursorInfo = this.kfEditor.requestService( "syntax.get.record.cursor" ),
                    groupObject = null;

                groupObject = this.kfEditor.requestService( "syntax.get.group.object", cursorInfo.groupId );

                this.clearSelect();

                this.record.select.lastSelect = groupObject;

                if ( groupObject.node.getAttribute( "data-root" ) ) {
                    // 根节点不着色
                    return;
                }
                groupObject.select();

            },

            clearSelect: function () {

                var box = null,
                    transform = null,
                    currentSelect = this.record.select.lastSelect;

                if ( !currentSelect ) {
                    return;
                }

                currentSelect.unselect();
                box = currentSelect.getRenderBox( currentSelect );
                currentSelect.setBoxWidth( box.width );

                currentSelect.getBox().setTranslate( 0, 0 );

            },

            getPaper: function () {
                return this.formula;
            },

            render: function ( latexStr ) {

                var parsedTree = this.kfEditor.requestService( "parser.parse", latexStr, true ),
                    objTree = this.assembly.regenerateBy( parsedTree );

                // 更新语法模块所维护的树
                this.kfEditor.requestService( "syntax.update.objtree", objTree );
                this.relocation();

            },

            setCanvasZoom: function ( zoom ) {

                var viewPort = this.formula.getViewPort();

                this.canvasZoom = zoom;
                viewPort.zoom = zoom;

                this.formula.setViewPort( viewPort );

            },

            getCanvas: function () {
                return this.formula;
            },

            getContentSize: function () {

                return this.formula.container.getRenderBox();

            },

            /**
             * 清除编辑器里内容的偏移
             */
            clearCanvasTransform: function () {

                var canvasInfo = this.record.canvas,
                    viewPort = this.formula.getViewPort();

                canvasInfo.viewBox = this.formula.getViewBox();
                canvasInfo.viewPortZoom = viewPort.zoom;
                canvasInfo.contentOffset = this.formula.container.getTranslate();

                viewPort.zoom = 1;

                this.formula.setViewPort( viewPort );
                this.formula.node.removeAttribute( "viewBox" );
                this.formula.container.setTranslate( 0, 0 );

            },

            /**
             * 恢复被clearCanvasTransform清除的偏移， 该方法仅针对上一次清除有效，
             * 且该方法应该只有在调用clearCanvasTransform后才可以调用该方法，并且两者之间应该配对出现
             * @returns {boolean}
             */
            revertCanvasTransform: function () {

                var canvasInfo = this.record.canvas,
                    viewBox = canvasInfo.viewBox,
                    viewPort = null;

                if ( !viewBox ) {
                    return false;
                }

                this.formula.setViewBox( viewBox.x, viewBox.y, viewBox.width, viewBox.height );
                this.formula.container.setTranslate( canvasInfo.contentOffset );

                viewPort = this.formula.getViewPort();
                viewPort.zoom = canvasInfo.viewPortZoom;

                this.formula.setViewPort( viewPort );

                canvasInfo.viewBox = null;
                canvasInfo.viewPortZoom = null;
                canvasInfo.contentOffset = null;

            },

            getCanvasZoom: function () {
                return this.canvasZoom;
            }

        } );

    return RenderComponenet;

} );