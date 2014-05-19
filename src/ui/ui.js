/**
 * Created by hn on 14-3-17.
 */

define( function ( require, exports, modules ) {

    var kity = require( "kity"),

        // UiUitls
        $$ = require( "ui/ui-impl/ui-utils" ),

        Utils = require( "base/utils" ),

        VIEW_STATE = require( "ui/def" ).VIEW_STATE,

        Scrollbar = require( "ui/ui-impl/scrollbar/scrollbar" ),

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

                this.canvasRect = null;
                this.viewState = VIEW_STATE.NO_OVERFLOW;

                this.kfEditor = kfEditor;

                this.resizeTimer = null;

                this.toolbarWrap = createToolbarWrap( currentDocument );
                this.toolbarContainer = createToolbarContainer( currentDocument );
                this.editArea = createEditArea( currentDocument );
                this.canvasContainer = createCanvasContainer( currentDocument );
                this.scrollbarContainer = createScrollbarContainer( currentDocument );

                this.toolbarWrap.appendChild( this.toolbarContainer );
                this.container.appendChild( this.toolbarWrap );
                this.editArea.appendChild( this.canvasContainer );
                this.container.appendChild( this.editArea );
                this.container.appendChild( this.scrollbarContainer );

                this.initComponents();

                this.initServices();

                this.initEvent();

                this.updateContainerSize( this.container, this.toolbarWrap, this.editArea, this.canvasContainer );

                this.initResizeEvent();

            },

            // 组件实例化
            initComponents: function () {

                // 工具栏组件
                this.components.toolbar = new Toolbar( this, this.kfEditor, ELEMENT_LIST );
                this.components.scrollZoom = new ScrollZoom( this, this.kfEditor, this.canvasContainer );
                this.components.scrollbar = new Scrollbar( this, this.kfEditor );

            },

            updateContainerSize: function ( container, toolbar, editArea, canvasContainer ) {

                var containerBox = container.getBoundingClientRect(),
                    toolbarBox = toolbar.getBoundingClientRect();

                editArea.style.width = containerBox.width + "px";
                editArea.style.height = containerBox.bottom - toolbarBox.bottom + "px";

            },

            // 初始化服务
            initServices: function () {

                this.kfEditor.registerService( "ui.get.canvas.container", this, {
                    getCanvasContainer: this.getCanvasContainer
                } );

                this.kfEditor.registerService( "ui.update.canvas.view", this, {
                    updateCanvasView: this.updateCanvasView
                } );

                this.kfEditor.registerService( "ui.canvas.container.event", this, {
                    on: this.addEvent,
                    off: this.removeEvent,
                    trigger: this.trigger,
                    fire: this.trigger
                } );

            },

            initEvent: function () {

                Utils.addEvent( this.container, 'mousewheel', function ( e ) {
                    e.preventDefault();
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

            },

            getCanvasContainer: function () {

                return this.canvasContainer;

            },

            addEvent: function ( type, handler ) {

                Utils.addEvent( this.canvasContainer, type, handler );

            },

            removeEvent: function () {},

            trigger: function ( type ) {

                Utils.trigger( this.canvasContainer, type );

            },

            // 更新画布视窗， 决定是否出现滚动条
            updateCanvasView: function () {

                var canvas = this.kfEditor.requestService( "render.get.canvas" ),
                    contentContainer = canvas.getContentContainer(),
                    contentRect = null;

                if ( this.canvasRect === null ) {
                    this.canvasRect = canvas.node.getBoundingClientRect();
                }

                contentRect = contentContainer.getRenderBox( "paper" );

                if ( contentRect.width > this.canvasRect.width ) {

                    if ( this.viewState === VIEW_STATE.NO_OVERFLOW  ) {
                        this.toggleViewState();
                        this.kfEditor.requestService( "ui.show.scrollbar" );
                    }

                    // 更新滚动条， 参数是：滚动条所控制的内容长度
                    this.kfEditor.requestService( "ui.update.scrollbar", contentRect.width );

                } else {

                    this.kfEditor.requestService( "ui.hide.scrollbar" );

                }

            },

            toggleViewState: function () {

                this.viewState = this.viewState === VIEW_STATE.NO_OVERFLOW ? VIEW_STATE.OVERFLOW : VIEW_STATE.NO_OVERFLOW;

            }

        } );

    function createToolbarWrap ( doc ) {

        return $$.ele( doc, "div", {
            className: "kf-editor-toolbar"
        } );

    }

    function createToolbarContainer ( doc ) {

        return container = $$.ele( doc, "div", {
            className: "kf-editor-inner-toolbar"
        } );

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

    function createScrollbarContainer ( doc ) {
        var container = doc.createElement( "div" );
        container.className = "kf-editor-edit-scrollbar";
        return container;
    }

    return UIComponent;

} );