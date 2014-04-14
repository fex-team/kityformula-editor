/**
 * Created by hn on 14-3-31.
 */

define( function ( require ) {

    var kity = require( "kity" ),

        PREFIX = "kf-editor-ui-",

        // UiUitls
        $$ = require( "ui/ui-impl/ui-utils" ),

        BOX_TYPE = require( "ui/ui-impl/def/box-type" ),

        ITEM_TYPE = require( "ui/ui-impl/def/item-type" ),

        Button = require( "ui/ui-impl/button" ),

        List = require( "ui/ui-impl/list" ),

        Box = kity.createClass( "Box", {

            constructor: function ( doc, options ) {

                this.options = options;

                this.options.type = this.options.type || BOX_TYPE.DETACHED;

                this.doc = doc;

                this.overlapButtonObject = null;

                this.overlapIndex = -1;

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

            setSelectHandler: function ( onselectHandler ) {
                this.onselectHandler = onselectHandler;
            },

            setChangeHandler: function ( changeHandler ) {
                this.onchangeHandler = changeHandler;
            },

            onchangeHandler: function ( index ) {},

            createGroupContainer: function () {

                return $$.ele( this.doc, "div", {
                    className: PREFIX + "box-container"
                } );

            },

            createItemGroup: function () {

                var groups = this.createGroup();

                switch ( this.options.type ) {

                    case BOX_TYPE.DETACHED:
                        return groups;

                    case BOX_TYPE.OVERLAP:
                        return this.createOverlapGroup( groups );

                }

                return null;

            },

            hide: function () {
                this.overlapButtonObject && this.overlapButtonObject.hideMount();
            },

            getOverlapContent: function () {

                // 只有重叠式才可以获取重叠内容
                if ( this.options.type !== BOX_TYPE.OVERLAP ) {
                    return null;
                }

                return this.options.group[ this.overlapIndex ].content;

            },

            createOverlapGroup: function ( groups ) {

                var list = this.getGroupList(),
                    _self = this,
                    overlapContainer = createOverlapContainer( this.doc),
                    overlapButtonObject = createOverlapButton( this.doc ),
                    overlapListObject = createOverlapList( this.doc, list );

                this.overlapButtonObject = overlapButtonObject;

                // 组合选择组件
                overlapButtonObject.mount( overlapListObject );

                overlapButtonObject.initEvent();
                overlapListObject.initEvent();

                // 切换面板
                overlapListObject.setSelectHandler( function ( index, oldIndex ) {

                    _self.overlapIndex = index;

                    overlapButtonObject.setLabel( list.items[index] + " ▼" );
                    overlapButtonObject.hideMount();

                    // 切换内容
                    groups[ oldIndex ].style.display = "none";
                    groups[ index ].style.display = "block";

                    _self.onchangeHandler( index );

                } );

                overlapContainer.appendChild( overlapButtonObject.getNode() );

                kity.Utils.each( groups, function ( group, index ) {

                    if ( index > 0 ) {
                        group.style.display = "none";
                    }

                    overlapContainer.appendChild( group );

                } );

                overlapListObject.select( 0 );

                return [ overlapContainer ];

            },

            // 获取group的list列表, 该类表满足box的group参数格式
            getGroupList: function () {

                var lists = [];

                kity.Utils.each( this.options.group, function ( group, index ) {

                    lists.push( group.title );

                } );

                return {
                    width: 150,
                    items: lists
                };

            },

            createGroup: function () {

                var doc = this.doc,
                    groups = [],
                    groupNode = null,
                    groupTitle = null,
                    itemType = BOX_TYPE.DETACHED === this.options.type ? ITEM_TYPE.BIG : ITEM_TYPE.SMALL,
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

                    kity.Utils.each( createItems( doc, group.content, itemType ), function ( item ) {

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

            constructor: function ( type, doc, options ) {

                this.type = type;
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

            getContent: function () {



            },

            createContent: function () {

                switch ( this.type ) {

                    case ITEM_TYPE.BIG:
                        return this.createBigContent();

                    case ITEM_TYPE.SMALL:
                        return this.createSmallContent();

                }

            },

            createBigContent: function () {

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

            createSmallContent: function () {

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


    function createItems ( doc, group, type ) {

        var items = [];

        kity.Utils.each( group, function ( itemVal, i ) {

            items.push( new BoxItem( type, doc, itemVal) );

        } );

        return items;

    }

    // 为重叠式box创建容器
    function createOverlapContainer ( doc ) {

        return $$.ele( doc, "div", {
            className: PREFIX + "overlap-container"
        } );

    }

    function createOverlapButton ( doc ) {

        return new Button( doc, {
            sign: false,
            className: "overlap-button",
            label: ""
        } );

    }

    function createOverlapList ( doc, list ) {
        return new List( doc, list );
    }

    return Box;

} );