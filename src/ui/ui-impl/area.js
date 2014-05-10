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
                this.disabled = true;

                this.panelIndex = 0;

                this.element = this.createArea();
                this.container = this.createContainer();
                this.panel = this.createPanel();
                this.buttonContainer = this.createButtonContainer();
                this.button = this.createButton();
                this.mountPoint = this.createMountPoint();
                this.moveDownButton = this.createMoveDownButton();
                this.moveUpButton = this.createMoveUpButton();

                this.boxObject = this.createBox();
                this.mergeElement();
                this.mount();

                this.setListener();
                this.initEvent();

                this.updateContent();

            },

            initEvent: function () {

                var _self = this;

                $$.on( this.button, "mousedown", function ( e ) {

                    e.preventDefault();
                    e.stopPropagation();

                    if ( e.which !== 1 || _self.disabled ) {
                        return;
                    }

                    _self.showMount();
                    _self.toolbar.notify( "closeOther", _self );

                } );

                $$.on( this.moveDownButton, "mousedown", function ( e ) {

                    e.preventDefault();
                    e.stopPropagation();

                    if ( e.which !== 1 || _self.disabled ) {
                        return;
                    }

                    _self.nextPanel();
                    _self.toolbar.notify( "closeOther", _self );

                } );

                $$.on( this.moveUpButton, "mousedown", function ( e ) {

                    e.preventDefault();
                    e.stopPropagation();

                    if ( e.which !== 1 || _self.disabled ) {
                        return;
                    }

                    _self.prevPanel();
                    _self.toolbar.notify( "closeOther", _self );

                } );

                $$.delegate( this.container, ".kf-editor-ui-area-item", "mousedown", function ( e ) {

                    e.preventDefault();

                    if ( e.which !== 1 || _self.disabled ) {
                        return;
                    }

                    $$.publish( "data.select", this.getAttribute( "data-value" ) );

                } );

                this.boxObject.initEvent();

            },

            disable: function () {
                this.disabled = true;
                this.boxObject.disable();
                this.element.classList.remove( PREFIX + "enabled" );
            },

            enable: function () {
                this.disabled = false;
                this.boxObject.enable();
                this.element.classList.add( PREFIX + "enabled" );
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
                this.panel.innerHTML = "";

                kity.Utils.each( items, function ( item ) {

                    var contents = item.content;

                    kity.Utils.each( contents, function ( currentContent, index ) {

                        currentContent = currentContent.item;

                        newContent.push( '<div class="'+ PREFIX +'area-item" data-value="'+ currentContent.val +'"><div class="'+ PREFIX +'area-item-content">'+ currentContent.show +'</div></div>' );

                    } );

                } );

                this.panel.innerHTML = newContent.join( "" );

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

            createMoveDownButton: function () {

                return $$.ele( this.doc, "div", {
                    className: PREFIX + "movedown-button",
                    content: "▼"
                } );

            },

            createMoveUpButton: function () {

                return $$.ele( this.doc, "div", {
                    className: PREFIX + "moveup-button",
                    content: "▲"
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

                return $$.ele( this.doc, "div", {
                    className: PREFIX + "area-container"
                } );

            },

            createPanel: function () {

                return $$.ele( this.doc, "div", {
                    className: PREFIX + "area-panel"
                } );

            },

            createButtonContainer: function () {
                return $$.ele( this.doc, "div", {
                    className: PREFIX + "area-button-container"
                } );
            },

            mergeElement: function () {

                this.buttonContainer.appendChild( this.moveUpButton );
                this.buttonContainer.appendChild( this.moveDownButton );
                this.buttonContainer.appendChild( this.button );

                this.container.appendChild( this.panel );

                this.element.appendChild( this.container );
                this.element.appendChild( this.buttonContainer );
                this.element.appendChild( this.mountPoint );

            },

            nextPanel: function () {

                var panelBounding = getRect( this.panel ),
                    containerBounding = getRect( this.container ),
                    containerHeight = containerBounding.height;

                if ( panelBounding.height < containerBounding.height ) {
                    return;
                }

                if ( ( this.panelIndex + 1 ) * containerHeight >= panelBounding.height ) {
                    return;
                }

                this.panelIndex++;

                this.panel.style.top = -this.panelIndex * containerHeight + "px";

            },

            prevPanel: function () {

                var panelBounding = getRect( this.panel ),
                    containerBounding = getRect( this.container ),
                    containerHeight = containerBounding.height;

                if ( panelBounding.height < containerBounding.height ) {
                    return;
                }

                if ( this.panelIndex - 1 < 0 ) {
                    return;
                }

                this.panelIndex--;

                this.panel.style.top = - this.panelIndex * containerHeight + "px";

            },

            setToolbar: function ( toolbar ) {
                this.toolbar = toolbar;
                this.boxObject.setToolbar( toolbar );
            },

            attachTo: function ( container ) {
                container.appendChild( this.element );
            }

        } );

    return Area;

    function getRect ( node ) {
        return node.getBoundingClientRect();
    }

} );