/**
 * Created by hn on 14-3-31.
 */

define( function ( require ) {

    var kity = require( "kity" ),

        PREFIX = "kf-editor-ui-",

        // UiUitls
        $$ = require( "ui/ui-impl/ui-utils" ),

        Button = kity.createClass( "Button", {

            constructor: function ( doc, options ) {

                this.options = options;

                // 事件状态， 是否已经初始化
                this.eventState = false;
                this.toolbar = null;
                this.displayState = false;

                this.doc = doc;

                this.element = this.createButton();
                this.disabled = true;

                // 挂载的对象
                this.mountElement = null;

                this.icon = this.createIcon();
                this.label = this.createLabel();
                this.sign = this.createSign();
                this.mountPoint = this.createMountPoint();

                this.mergeElement();

            },

            initEvent: function () {

                var _self = this;

                if ( this.eventState ) {
                    return;
                }

                this.eventState = true;

                $$.on( this.element, "mousedown", function ( e ) {

                    e.preventDefault();
                    e.stopPropagation();

                    if ( e.which !== 1 ) {
                        return;
                    }

                    if ( _self.disabled ) {
                        return;
                    }

                    _self.toggleSelect();
                    _self.toggleMountElement();

                } );

            },

            setToolbar: function ( toolbar ) {
                this.toolbar = toolbar;
            },

            toggleMountElement: function () {

                if ( this.displayState ) {
                    this.hideMount();
                } else {
                    this.showMount();
                }

            },

            setLabel: function ( labelText ) {
                this.label.innerHTML = labelText;
            },

            toggleSelect: function () {
                this.element.classList.toggle( PREFIX + "button-in" );
            },

            unselect: function () {
                this.element.classList.remove( PREFIX + "button-in" );
            },

            select: function () {
                this.element.classList.add( PREFIX + "button-in" );
            },

            show: function () {
                this.select();
                this.showMount();
            },

            hide: function () {
                this.unselect();
                this.hideMount();
            },

            showMount: function () {

                this.displayState = true;
                this.mountPoint.style.display = "block";

                var editorContainer = this.toolbar.getContainer(),
                    currentBox = null,
                    containerBox = $$.getRectBox( editorContainer ),
                    mountEleBox = this.mountElement.getPositionInfo();

                // 修正偏移
                if ( mountEleBox.right > containerBox.right ) {
                    currentBox = $$.getRectBox( this.element );
                    // 对齐到按钮的右边界
                    this.mountPoint.style.left = currentBox.right - mountEleBox.right - 1 + "px";
                }

                this.mountElement.updateSize();

            },

            hideMount: function () {
                this.displayState = false;
                this.mountPoint.style.display = "none";
            },

            getNode: function () {
                return this.element;
            },

            mount: function ( element ) {
                this.mountElement = element;
                element.mountTo( this.mountPoint );
            },

            createButton: function () {

                var buttonNode = $$.ele( this.doc, "div", {
                    className: PREFIX + "button"
                } );

                // 附加className
                if ( this.options.className ) {
                    buttonNode.className += " " + PREFIX + this.options.className;
                }

                return buttonNode;

            },

            createIcon: function () {

                if ( !this.options.icon ) {
                    return null;
                }

                var iconNode = $$.ele( this.doc, "div", {
                    className: PREFIX + "button-icon"
                } );

                iconNode.style.backgroundImage = "url(" + this.options.icon + ")";

                return iconNode;

            },

            createLabel: function () {

                var labelNode = $$.ele( this.doc, "div", {
                    className: PREFIX + "button-label",
                    content: this.options.label
                } );


                return labelNode;

            },

            createSign: function () {

                if ( this.options.sign === false ) {
                    return null;
                }

                return $$.ele( this.doc, "div", {
                    className: PREFIX + "button-sign"
                } );

            },

            createMountPoint: function () {

                return $$.ele( this.doc, "div", {
                    className: PREFIX + "button-mount-point"
                } );

            },

            disable: function () {
                this.disabled = true;
                this.element.classList.remove( PREFIX + "enabled" );
            },

            enable: function () {
                this.disabled = false;
                this.element.classList.add( PREFIX + "enabled" );
            },

            mergeElement: function () {

                this.icon && this.element.appendChild( this.icon );
                this.element.appendChild( this.label );
                this.sign && this.element.appendChild( this.sign );
                this.element.appendChild( this.mountPoint );

            }

        } );

    return Button;

} );