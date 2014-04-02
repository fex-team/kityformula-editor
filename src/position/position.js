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

                this.kfEditor.registerService( "position.get.wrap", this, {
                    getWrap: this.getWrap
                } );

                this.kfEditor.registerService( "position.get.group.info", this, {
                    getGroupInfoByNode: this.getGroupInfoByNode
                } );

                this.kfEditor.registerService( "position.get.parent.info", this, {
                    getParentInfoByNode: this.getParentInfoByNode
                } );

            },

            getGroupByTarget: function ( target ) {

                var groupDom = getGroup( target, false, false );

                if ( groupDom ) {
                    return this.kfEditor.requestService( "syntax.get.group.content", groupDom.id );
                }

                return null;

            },

            getParentGroupByTarget: function ( target ) {

                var groupDom = getGroup( target, true, false );

                if ( groupDom ) {
                    return this.kfEditor.requestService( "syntax.get.group.content", groupDom.id );
                }

                return null;

            },

            getWrap: function ( node ) {

                return  getGroup( node, true, true );

            },

            /**
             * 给定一个节点， 获取其节点所属的组及其在该组内的偏移
             * @param target 目标节点
             */
            getGroupInfoByNode: function ( target ) {

                var result = null,
                    oldTarget = null;

                oldTarget = target;
                while ( target = getGroup( target, true, false ) ) {

                    if ( target.getAttribute( "data-type" ) === "kf-editor-group" ) {
                        break;
                    }

                    oldTarget = target

                }

                result = {
                    group: this.kfEditor.requestService( "syntax.get.group.content", target.id )
                };

                result.index = result.group.content.indexOf( oldTarget );

                return result;

            },

            /**
             * 给定一个节点， 获取其节点所属的直接包含组及其在该直接包含组内的偏移
             * @param target 目标节点
             */
            getParentInfoByNode: function ( target ) {

                var group = getGroup( target, true, false );

                group = this.kfEditor.requestService( "syntax.get.group.content", group.id );

                return {
                    group: group,
                    index: group.content.indexOf( target )
                };

            }

        } );

    /**
     * 获取给定节点元素所属的组
     * @param node 当前点击的节点
     * @param isAllowVirtual 是否允许选择虚拟组
     * @param isAllowWrap 是否允许选择目标节点的最小包裹单位
     * @returns {*}
     */
    function getGroup ( node, isAllowVirtual, isAllowWrap ) {

        var tagName = null;

        if ( !node.ownerSVGElement ) {
            return null;
        }

        node = node.parentNode;

        tagName = node.tagName.toLowerCase();

        if ( node && tagName !== "body" && tagName !== "svg" ) {

            if ( node.getAttribute( "data-type" ) === "kf-editor-group" ) {
                return node;
            }

            if ( isAllowVirtual && node.getAttribute( "data-type" ) === "kf-editor-virtual-group" ) {
                return node;
            }

            if ( isAllowWrap && node.getAttribute( "data-flag" ) !== null ) {
                return node;
            }

            return getGroup( node, isAllowVirtual, isAllowWrap );

        } else {
            return null;
        }

    }

    function getWrap ( isAllowWrap ) {

    }

    return PositionComponenet;

} );