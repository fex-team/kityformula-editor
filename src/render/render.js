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

                this.kfEditor.registerService( "render.select.group", this, {
                    selectGroup: this.selectGroup
                } );

                this.kfEditor.registerService( "render.select.group.all", this, {
                    selectAllGroup: this.selectAllGroup
                } );

                this.kfEditor.registerService( "render.reselect", this, {
                    reselect: this.reselect
                } );

                this.kfEditor.registerService( "render.clear.select", this, {
                    clearSelect: this.clearSelect
                } );

                this.kfEditor.registerService( "render.canvas.zoom", this, {
                    setCanvasZoom: this.setCanvasZoom
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

            },

            initCommands: function () {

                this.kfEditor.registerCommand( "render", this, this.render );

            },

            relocation: function () {

                var formulaSpace = this.formula.container.getRenderBox(),
                    viewPort = this.formula.getViewPort();

                viewPort.center.x = formulaSpace.width / 2;
                viewPort.center.y = formulaSpace.height / 2;

                this.formula.setViewPort( viewPort );

            },

            selectGroup: function ( group ) {

                // 处理占位符
                if ( group.groupObj.getAttribute( "data-placeholder" ) !== null ) {
                    group = {
                        id: group.content[ 0 ].id
                    };
                }

                var groupObject = this.kfEditor.requestService( "syntax.get.group.object", group.id );

                this.clearSelect();

                this.record.select.lastSelect = groupObject;

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

            reselect: function () {

                var cursorInfo = this.kfEditor.requestService( "syntax.get.record.cursor" ),
                    groupObject = null;

                if ( !cursorInfo || !cursorInfo.hasOwnProperty( "index" ) ) {
                    // 未找到光标的记录信息
                    throw new Error( 'render: not found cursor!' );
                }

                groupObject = this.kfEditor.requestService( "syntax.get.group.object", cursorInfo.groupId );

                this.clearSelect();

                this.record.select.lastSelect = groupObject;
                groupObject.select();

            },

            clearSelect: function () {

                if ( this.record.select.lastSelect ) {
                      this.record.select.lastSelect.unselect();
                }

            },

            render: function ( latexStr ) {

                var parsedTree = this.kfEditor.requestService( "parser.parse", latexStr),
                    objTree = this.assembly.regenerateBy( parsedTree );

                // 更新语法模块所维护的树
                this.kfEditor.requestService( "syntax.update.objtree", objTree );
                this.relocation();

            },

            setCanvasZoom: function ( zoom ) {

                var viewPort = this.formula.getViewPort();
                viewPort.zoom = zoom;
                this.formula.setViewPort( viewPort );

            },

            insertString: function ( str ) {

                this.kfEditor.requestService( "syntax.insert.string", str )
                var tt = this.kfEditor.requestService( "syntax.serialization" );
                this.render( tt );

            },

            insertGroup: function ( str ) {

                this.kfEditor.requestService( "syntax.insert.group", str )
                var tt = this.kfEditor.requestService( "syntax.serialization" );
                this.render( tt );

            }

        } );

    return RenderComponenet;

} );