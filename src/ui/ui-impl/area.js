/*!
 * 特殊字符区域
 */

define( function ( require ) {

    var kity = require( "kity" ),

        PREFIX = "kf-editor-ui-",

        // UiUitls
        $$ = require( "ui/ui-impl/ui-utils" ),

        Box = require( "ui/ui-impl/box" ),

        Area = kity.createClass( "Area", {

            constructor: function ( doc, options ) {

                this.options = options;

                this.doc = doc;
                this.toolbar = null;

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

            initEvent: function () {

                var _self = this;

                $$.on( this.button, "click", function () {

                    _self.showMount();

                } );

                $$.delegate( this.container, ".kf-editor-ui-area-item", "mousedown", function ( e ) {

                    e.preventDefault();

                    if ( e.which !== 1 ) {
                        return;
                    }

                    $$.publish( "data.select", this.getAttribute( "data-value" ) );

                } );

                this.boxObject.initEvent();

            },

            setListener: function () {

                var _self = this;

                this.boxObject.setSelectHandler( function ( val ) {
                    // 发布
                    $$.publish( "data.select", val );
                    _self.hide();
                } );

                // 内容面板切换
                this.boxObject.setChangeHandler( function ( index ) {
                    _self.updateContent();
                } );

            },

            createArea: function () {

                var areaNode = $$.ele( this.doc, "div", {
                        className: PREFIX + "area"
                    });

                if ( "width" in this.options ) {
                    areaNode.style.width = this.options.width + "px";
                }

                return areaNode;

            },

            updateContent: function () {

                var items = this.boxObject.getOverlapContent(),
                    newContent = [];

                // 清空原有内容
                this.container.innerHTML = "";

                kity.Utils.each( items, function ( item, index ) {

                    item = item.item;

                    newContent.push( '<div class="'+ PREFIX +'area-item" data-value="'+ item.val +'"><div class="'+ PREFIX +'area-item-content">'+ item.show +'</div></div>' );

                } );

                this.container.innerHTML = newContent.join( "" );

            },

            // 挂载
            mount: function () {

                this.boxObject.mountTo( this.mountPoint );

            },

            showMount: function () {
                this.mountPoint.style.display = "block";
            },

            hideMount: function () {
                this.mountPoint.style.display = "none";
            },

            hide: function () {
                this.hideMount();
                this.boxObject.hide();
            },

            createButton: function () {

                return $$.ele( this.doc, "div", {
                    className: PREFIX + "area-button",
                    content: "▼"
                } );

            },

            createMountPoint: function () {

                return $$.ele( this.doc, "div", {
                    className: PREFIX + "area-mount"
                } );

            },

            createBox: function () {

                return new Box( this.doc, this.options.box );

            },

            createContainer: function () {

                var node = $$.ele( this.doc, "div", {
                    className: PREFIX + "area-container"
                } );

                return node;

            },

            mergeElement: function () {

                this.element.appendChild( this.container );
                this.element.appendChild( this.button );
                this.element.appendChild( this.mountPoint );

            },

            setToolbar: function ( toolbar ) {
                this.toolbar = toolbar;
            },

            attachTo: function ( container ) {
                container.appendChild( this.element );
            }

        } );

    return Area;

} );