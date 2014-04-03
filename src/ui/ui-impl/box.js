/**
 * Created by hn on 14-3-31.
 */

define( function ( require ) {

    var kity = require( "kity" ),

        PREFIX = "kf-editor-ui-",

        // UiUitls
        $$ = require( "ui/ui-impl/ui-utils" ),

        Box = kity.createClass( "Box", {

            constructor: function ( doc, options ) {

                this.options = options;

                this.doc = doc;

                this.element = this.createBox();
                this.groupContainer = this.createGroupContainer();
                this.itemGroups = this.createItemGroup();

                this.mergeElement();

            },

            createBox: function () {

                var boxNode = $$.ele( this.doc, "div", {
                    className: PREFIX + "box"
                } );

                if ( "width" in this.options ) {
                    boxNode.style.width = this.options.width + "px";
                }

                return boxNode;

            },

            initEvent: function () {

                var className = "." + PREFIX + "box-item",
                    _self = this;

                $$.delegate( this.groupContainer, className, "mousedown", function ( e ) {

                    e.preventDefault();

                    if ( e.which !== 1 ) {
                        return;
                    }

                    _self.onselectHandler && _self.onselectHandler( this.getAttribute( "data-value" ) );

                } );

                $$.on( this.element, "mousedown", function ( e ) {

                    e.stopPropagation();
                    e.preventDefault();

                } );

            },

            getNode: function () {
                return this.element;
            },

            onSelect: function ( onselectHandler ) {
                this.onselectHandler = onselectHandler;
            },

            createGroupContainer: function () {

                return $$.ele( this.doc, "div", {
                    className: PREFIX + "box-container"
                } );

            },

            createItemGroup: function () {

                var doc = this.doc,
                    groups = [],
                    groupNode = null,
                    groupTitle = null,
                    itemContainer = null;

                groupNode = $$.ele( this.doc, "div", {
                    className: PREFIX + "box-group"
                } );

                itemContainer = groupNode.cloneNode( false );
                itemContainer.className = PREFIX + "box-group-item-container";

                kity.Utils.each( this.options.group, function ( group, i ) {

                    groupNode = groupNode.cloneNode( false );
                    itemContainer = itemContainer.cloneNode( false );

                    groupTitle = $$.ele( doc, "div", {
                        className: PREFIX + "box-group-title",
                        content: group.title
                    } );

                    groupNode.appendChild( groupTitle );
                    groupNode.appendChild( itemContainer );

                    kity.Utils.each( createItems( doc, group.content ), function ( item ) {

                        item.appendTo( itemContainer );

                    } );

                    groups.push( groupNode );

                } );

                return groups;

            },

            mergeElement: function () {

                var groupContainer = this.groupContainer;

                this.element.appendChild( groupContainer );

                kity.Utils.each( this.itemGroups, function ( group ) {

                    groupContainer.appendChild( group );

                } );

            },

            mountTo: function ( container ) {
                container.appendChild( this.element );
            },

            appendTo: function ( container ) {
                container.appendChild( this.element );
            }

        } ),

        BoxItem = kity.createClass( "BoxItem", {

            constructor: function ( doc, options ) {

                this.doc = doc;
                this.options = options;

                this.element = this.createItem();

                // 项的label是可选的
                this.labelNode = this.createLabel();
                this.contentNode = this.createContent();

                this.mergeElement();

            },

            getNode: function () {
                return this.element;
            },

            createItem: function () {

                var itemNode = $$.ele( this.doc, "div", {
                    className: PREFIX + "box-item"
                } );

                return itemNode;

            },

            createLabel: function () {

                var labelNode = null;

                if ( !( "label" in this.options ) ) {
                    return;
                }

                labelNode = $$.ele( this.doc, "div", {
                    className: PREFIX + "box-item-label",
                    content: this.options.label
                } );

                return labelNode;

            },

            createContent: function () {

                var doc = this.doc,
                    contentNode = $$.ele( doc, "div", {
                        className: PREFIX + "box-item-content"
                    }),
                    cls = PREFIX + "box-item-val",
                    tmpContent = this.options.item,
                    tmpNode = null;

                if ( typeof tmpContent === "string" ) {
                    tmpContent = {
                        show: tmpContent,
                        val: tmpContent
                    };
                }

                tmpNode = $$.ele( doc, "div", {
                    className: cls
                } );

                tmpNode.innerHTML = tmpContent.show;
                // 附加属性到项的根节点上
                this.element.setAttribute( "data-value", tmpContent.val );

                contentNode.appendChild( tmpNode );

                return contentNode;

            },

            mergeElement: function () {

                if ( this.labelNode ) {
                    this.element.appendChild( this.labelNode );
                }

                this.element.appendChild( this.contentNode );

            },

            appendTo: function ( container ) {
                container.appendChild( this.element );
            }

        } );


    function createItems ( doc, group ) {

        var items = [];

        kity.Utils.each( group, function ( itemVal, i ) {

            items.push( new BoxItem( doc, itemVal ) );

        } );

        return items;

    }

    return Box;

} );