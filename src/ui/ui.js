/**
 * Created by hn on 14-3-17.
 */

define( function ( require, exports, modules ) {

    var kity = require( "kity"),

        Utils = require( "base/utils" ),

        Toolbar = require( "ui/toolbar/toolbar" ),
        // 控制组件
        ScrollZoom = require( "ui/control/zoom" ),

        ELEMENT_LIST = require( "ui/toolbar-ele-list" ),

        UIComponent = kity.createClass( 'UIComponent', {

            constructor: function ( kfEditor ) {

                var currentDocument = null;

                this.container = kfEditor.getContainer();

                currentDocument = this.container.ownerDocument;

                // ui组件实例集合
                this.components = {};

                this.kfEditor = kfEditor;

                this.resizeTimer = null;

                this.toolbarContainer = createToolbarContainer( currentDocument );
                this.editArea = createEditArea( currentDocument );
                this.canvasContainer = createCanvasContainer( currentDocument );

                this.updateContainerSize( this.container, this.toolbarContainer, this.editArea, this.canvasContainer );

                this.container.appendChild( this.toolbarContainer );
                this.editArea.appendChild( this.canvasContainer );
                this.container.appendChild( this.editArea );

                this.initCanvas();
                this.initComponents();

                this.initServices();

                this.initResizeEvent();

            },

            // 组件实例化
            initComponents: function () {

                // 工具栏组件
                this.components.toolbar = new Toolbar( this.kfEditor, this, ELEMENT_LIST );
                this.components.scrollZoom = new ScrollZoom( this, this.kfEditor, this.canvasContainer );

            },

            initCanvas: function () {

            },

            updateContainerSize: function ( container, toolbar, editArea, canvasContainer ) {

                var containerBox = container.getBoundingClientRect();

                toolbar.style.width = containerBox.width -  12 + "px";
                toolbar.style.height = 80 + "px";

                editArea.style.marginTop = 80 + "px";
                editArea.style.width = containerBox.width + "px";
                editArea.style.height = containerBox.height - 80 + "px";

            },

            // 初始化服务
            initServices: function () {

                this.kfEditor.registerService( "ui.get.canvas.container", this, {
                    getCanvasContainer: SERVICE_LIST.getCanvasContainer
                } );

                this.kfEditor.registerService( "ui.canvas.container.event", this, {
                    on: SERVICE_LIST.addEvent,
                    off: SERVICE_LIST.removeEvent,
                    trigger: SERVICE_LIST.trigger,
                    fire: SERVICE_LIST.trigger
                } );

            },

            initResizeEvent: function () {

                var _self = this;

                this.canvasContainer.ownerDocument.defaultView.onresize = function () {

                    window.clearTimeout( _self.resizeTimer );

                    _self.resizeTimer = window.setTimeout( function () {
                        _self.kfEditor.requestService( "render.relocation" );
                    }, 80 );

                };

            }

        } ),

    SERVICE_LIST = {

        getCanvasContainer: function () {

            return this.canvasContainer;

        },

        addEvent: function ( type, handler ) {

            Utils.addEvent( this.canvasContainer, type, handler );

        },

        removeEvent: function () {},

        trigger: function ( type ) {

            Utils.trigger( this.canvasContainer, type );

        }

    };


    function createToolbarContainer ( doc ) {
        var container = doc.createElement( "div" );
        container.className = "kf-editor-toolbar";
        return container;
    }

    function createEditArea ( doc ) {
        var container = doc.createElement( "div" );
        container.className = "kf-editor-edit-area";
        container.style.width = "80%";
        container.style.height = "800px";
        return container;
    }

    function createCanvasContainer ( doc ) {
        var container = doc.createElement( "div" );
        container.className = "kf-editor-canvas-container";
        return container;
    }

    return UIComponent;

} );