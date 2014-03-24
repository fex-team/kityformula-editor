/*!
 * 定位模块
 */


define( function ( require ) {

    var kity = require( "kity" ),

        // 表达式的内容组"标签"
        CONTENT_DATA_TYPE = "kf-editor-exp-content-box",

        PositionComponenet = kity.createClass( 'PositionComponenet', {

            constructor: function ( kfEditor ) {

                this.kfEditor = kfEditor;

                this.initServices();

            },

            initServices: function () {

                this.kfEditor.registerService( "position.get.group", this, {
                    getGroupByTarget: this.getGroupByTarget
                } );

                this.kfEditor.registerService( "position.get.parent.group", this, {
                    getParentGroupByTarget: this.getParentGroupByTarget
                } );

            },

            getGroupByTarget: function ( target ) {

                var group = null;

                if ( !target.ownerSVGElement ) {
                    return null;
                }

                group = getGroup( target, false );

                if ( group ) {
                    return this.wrap( group );
                } else {
                    return null;
                }

            },

            getParentGroupByTarget: function ( target ) {

                var group = null;

                if ( !target.ownerSVGElement ) {
                    return null;
                }

                group = getGroup( target, true );

                if ( group ) {
                    return this.wrap( group );
                } else {
                    return null;
                }

            },

            wrap: function ( group ) {

                var node = group.firstChild,
                    operands = null;

                while ( node ) {

                    if ( node.nodeType === 1 && node.getAttribute( "data-type" ) === CONTENT_DATA_TYPE ) {
                        break;
                    }

                    node = node.nextSibling;

                }

                operands = node.childNodes[ 1 ];

                if ( !operands || operands.getAttribute( "data-type" ) !== "kf-editor-exp-operand-box" ) {
                    throw new Error( "position: not found content group" );
                }

                return {
                    id: group.id,
                    groupObj: group,
                    content: operands.childNodes
                };

            }

        } );

    /**
     * 获取当前点击的节点元素所属的组
     * @param node 当前点击的节点
     * @param isAllowVirtual 是否允许选择虚拟组
     * @returns {*}
     */
    function getGroup ( node, isAllowVirtual ) {

        var tagName = null;

        node = node.parentNode;

        tagName = node.tagName.toLowerCase();

        if ( node && tagName !== "body" && tagName !== "svg" ) {

            if ( node.getAttribute( "data-type" ) === "kf-editor-group" || node.getAttribute( "data-placeholder" ) !== null || ( isAllowVirtual && node.getAttribute( "data-type" ) === "kf-editor-virtual-group" ) ) {
                return node;
            }

            return getGroup( node, isAllowVirtual );

        } else {
            return null;
        }

    }

    return PositionComponenet;

} );