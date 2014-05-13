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
                this.maxPanelIndex = 0;
                this.containerHeight = 0;

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

            initContainerHeight: function () {
                this.containerHeight = getRect( this.container ).height;
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

            checkMaxPanelIndex: function () {

                var panelBounding = null;

                if ( this.containerHeight === 0 ) {
                    return;
                }

                panelBounding = getRect( this.panel );

                this.maxPanelIndex = Math.ceil( panelBounding.height / this.containerHeight );

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

                this.panelIndex = 0;
                this.panel.style.top = 0;
                this.panel.innerHTML = newContent.join( "" );

                this.checkMaxPanelIndex();
                this.updatePanelButtonState();

            },

            // 挂载
            mount: function () {

                this.boxObject.mountTo( this.mountPoint );

            },

            showMount: function () {
                this.mountPoint.style.display = "block";
                this.boxObject.updateSize();
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

            disablePanelUp: function () {
                this.disabledUp = true;
                this.moveUpButton.classList.add( "kf-editor-ui-disabled" );
            },

            enablePanelUp: function () {
                this.disabledUp = false;
                this.moveUpButton.classList.remove( "kf-editor-ui-disabled" );
            },

            disablePanelDown: function () {
                this.disabledDown = true;
                this.moveDownButton.classList.add( "kf-editor-ui-disabled" );
            },

            enablePanelDown: function () {
                this.disabledDown = false;
                this.moveDownButton.classList.remove( "kf-editor-ui-disabled" )
            },

            updatePanelButtonState: function () {

                if ( this.panelIndex === 0 ) {
                    this.disablePanelUp();
                } else {
                    this.enablePanelUp();
                }

                if ( this.panelIndex + 1 >= this.maxPanelIndex ) {
                    this.disablePanelDown();
                } else {
                    this.enablePanelDown();
                }

            },

            nextPanel: function () {

                if ( this.disabledDown ) {
                    return;
                }

                if ( this.panelIndex + 1 >= this.maxPanelIndex ) {
                    return;
                }

                this.panelIndex++;

                this.panel.style.top = -this.panelIndex * this.containerHeight + "px";

                this.updatePanelButtonState();

            },

            prevPanel: function () {

                if ( this.disabledUp ) {
                    return;
                }

                if ( this.panelIndex === 0 ) {
                    return;
                }

                this.panelIndex--;

                this.panel.style.top = - this.panelIndex * this.containerHeight + "px";

                this.updatePanelButtonState();

            },

            setToolbar: function ( toolbar ) {
                this.toolbar = toolbar;
                this.boxObject.setToolbar( toolbar );
            },

            attachTo: function ( container ) {
                container.appendChild( this.element );
                this.initContainerHeight();
                this.checkMaxPanelIndex();
                this.updatePanelButtonState();
            }

        } );

    return Area;

    function getRect ( node ) {
        return node.getBoundingClientRect();
    }

} );