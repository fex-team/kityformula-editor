/*！
 * 删除控制
 */

define( function ( require, exports, module ) {

    var kity = require( "kity" );

    return kity.createClass( "DeleteComponent", {

        constructor: function ( parentComponent, kfEditor ) {

            this.parentComponent = parentComponent;
            this.kfEditor = kfEditor;

        },

        deleteGroup: function () {

            var cursorInfo = this.parentComponent.getCursorRecord(),
                objTree = this.parentComponent.getObjectTree(),
                // 当前的树信息
                currentTree = objTree.mapping[ cursorInfo.groupId ].strGroup;

            // 选区长度为0, 则删除前一个组
            if ( cursorInfo.startOffset === cursorInfo.endOffset ) {

                // 已经到最前， 需要进一步处理
                if ( cursorInfo.startOffset === 0 ) {

                    // 根节点时， 直接退出， 不做任何处理
                    if ( this.parentComponent.isRootTree( currentTree ) ) {
                        return false;
                    }

                    // 不是根节点时， 选中当前容器的父容器
                    cursorInfo = this.selectParentContainer( cursorInfo.groupId );
                    this.parentComponent.updateCursor( cursorInfo );

                    return false;

                } else {

                    // 还有更多剩余内容， 则直接删除前一个组

                    if ( currentTree.operand.length > 1 ) {

                        cursorInfo = this.deletePrevGroup( currentTree, cursorInfo );

                    // 无内容， 则替换成占位符
                    } else {

                        // 更新光标位置
                        cursorInfo.startOffset = 0;
                        cursorInfo.endOffset = 1;

                        // 替换成占位符
                        currentTree.operand[ 0 ] = {
                            name: "placeholder",
                            operand: []
                        };

                        this.parentComponent.updateCursor( cursorInfo );

                        return true;

                    }

                }

            // 当前是选区
            } else {

                // 当前选中占位符的情况
                if ( this.parentComponent.isSelectPlaceholder() ) {

                    // 如果是根节点， 则不允许删除
                    if ( this.parentComponent.isRootTree( currentTree ) ) {

                        return false;

                    // 否则，更新选区到选中该容器
                    } else {

                        cursorInfo = this.selectParentContainer( cursorInfo.groupId );
                        this.parentComponent.updateCursor( cursorInfo );

                        return false;

                    }

                // 其他选区正常删除
                } else {
                    cursorInfo = this.deleteSelection( currentTree, cursorInfo );
                }

            }

            this.parentComponent.updateCursor( cursorInfo );

            // 选区长度为0， 则可以判定当前公式发生了改变
            if ( cursorInfo.startOffset === cursorInfo.endOffset ) {
                return true;
            }

            return false;

        },

        // 删除前一个节点, 返回更新后的光标信息
        deletePrevGroup: function ( tree, cursorInfo ) {

            // 待删除的组
            var index = cursorInfo.startOffset - 1,
                group = tree.operand[ index ];

            // 叶子节点可以直接删除
            if ( this.parentComponent.isLeafTree( group ) ) {

                tree.operand.splice( index, 1 );
                cursorInfo.startOffset -= 1;
                cursorInfo.endOffset -= 1;

            // 否则， 选中该节点
            } else {

                cursorInfo.startOffset -= 1;

            }

            return cursorInfo;

        },

        // 删除选区内容
        deleteSelection: function ( tree, cursorInfo ) {

            // 更新树
            tree.operand.splice( cursorInfo.startOffset, cursorInfo.endOffset - cursorInfo.startOffset );
            cursorInfo.endOffset = cursorInfo.startOffset;

            return cursorInfo;

        },

        // 选中给定ID节点的父容器
        selectParentContainer: function ( groupId ) {

            var currentGroupNode = this.parentComponent.getGroupObject( groupId ).node,
                parentContainerInfo = this.kfEditor.requestService( "position.get.group", currentGroupNode ),
                // 当前组在父容器中的索引
                index = this.kfEditor.requestService( "position.get.index", parentContainerInfo.groupObj, currentGroupNode );

            // 返回新的光标信息
            return {
                groupId: parentContainerInfo.id,
                startOffset: index,
                endOffset: index + 1
            };

        }

    } );


} );