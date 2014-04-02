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
                    cursor: {}
                };

                this.initCanvas();

                this.initServices();
                this.initCommands();

            },

            initCanvas: function () {

                var canvasContainer = this.kfEditor.requestService( "ui.get.canvas.container" );

                this.assembly = Assembly.use( canvasContainer, DEFAULT_OPTIONS );
                this.formula = this.assembly.formula;

            },

            initServices: function () {

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

                var formulaSpace = this.formula.container.getRenderBox(),
                    viewPort = this.formula.getViewPort();

                viewPort.center.x = formulaSpace.width / 2;
                viewPort.center.y = formulaSpace.height / 2;

                this.formula.setViewPort( viewPort );

            },

            selectGroup: function ( groupId ) {

                var groupObject = this.kfEditor.requestService( "syntax.get.group.object", groupId ),
                    isPlaceholder = this.kfEditor.requestService( "syntax.valid.placeholder", groupId );

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

            selectCurrentCursor: function () {

                var cursorInfo = this.kfEditor.requestService( "syntax.get.record.cursor" ),
                    group = this.kfEditor.requestService( "syntax.get.group.object", cursorInfo.groupId ),
                    box = null,
                    offset = -1,
                    width = 0,
                    height = group.getRenderBox().height,
                    startIndex = Math.min( cursorInfo.startOffset, cursorInfo.endOffset ),
                    endIndex = Math.max( cursorInfo.startOffset, cursorInfo.endOffset );

                this.clearSelect();

                // 更新记录
                this.record.select.lastSelect = group;

                for ( var i = startIndex, len = endIndex; i < len; i++ ) {

                    box = group.getOperand( i ).getRenderBox();

                    if ( offset == -1 ) {
                        offset = box.x;
                    }

                    width += box.width;

                }

                group.setBoxSize( width, height );
                group.selectAll();
                group.getBox().translate( offset, 0 );

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
                box = currentSelect.getRenderBox();
                currentSelect.setBoxSize( box.width, box.height );

                transform = currentSelect.getBox().getTransform();

                if ( transform ) {
                    transform.m.e = 0;
                    transform.m.f = 0;
                }

                currentSelect.getBox().setTransform( transform );

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

            getCanvasZoom: function () {
                return this.canvasZoom;
            }

        } );

    return RenderComponenet;

} );