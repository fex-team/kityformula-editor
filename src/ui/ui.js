/**
 * Created by hn on 14-3-17.
 */

define( function ( require, exports, modules ) {

    var kity = require( "kity"),

        Utils = require( "base/utils" ),

        UIComponent = kity.createClass( 'UIComponent', {

            constructor: function ( kfEditor ) {

                var container = kfEditor.getContainer(),
                    currentDocument = container.ownerDocument;

                this.kfEditor = kfEditor;

                this.resizeTimer = null;

                this.toolbarContainer = createToolbarContainer( currentDocument );
                this.canvasContainer = createCanvasContainer( currentDocument );

                container.appendChild( this.toolbarContainer );
                container.appendChild( this.canvasContainer );

                this.initToolbar();
                this.initCanvas();

                this.initServices();

                this.initResizeEvent();

            },

            initToolbar: function () {

            },

            initCanvas: function () {

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
                    }, 100 );

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

    function createCanvasContainer ( doc ) {
        var area = doc.createElement( "div" );
        area.className = "kf-editor-canvas-container";
        return area;
    }

    return UIComponent;

} );