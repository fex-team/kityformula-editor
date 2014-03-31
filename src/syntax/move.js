/*！
 * 光标控制
 */

define( function ( require, exports, module ) {

    var kity = require( "kity" ),
        DIRECTION = {
            LEFT: 'left',
            RIGHT: 'right'
        };

    return kity.createClass( "MoveComponent", {

        constructor: function ( parentComponent, kfEditor ) {

            this.parentComponent = parentComponent;
            this.kfEditor = kfEditor;

        },

        leftMove: function () {

            var cursorInfo = this.parentComponent.getCursorRecord();

            cursorInfo = updateCursorGoLeft.call( this, cursorInfo );

            // cursorInfo 为null则不用处理
            if ( cursorInfo ) {
                this.parentComponent.updateCursor( cursorInfo.groupId, cursorInfo.startOffset, cursorInfo.endOffset );
            }

        },

        rightMove: function () {

            var cursorInfo = this.parentComponent.getCursorRecord();

            cursorInfo = updateCursorGoRight.call( this, cursorInfo );

            // cursorInfo 为null则不用处理
            if ( cursorInfo ) {
                this.parentComponent.updateCursor( cursorInfo.groupId, cursorInfo.startOffset, cursorInfo.endOffset );
            }

        }

    } );


    function updateCursorGoLeft ( cursorInfo ) {

        var prevGroupNode = null,
            syntaxComponent = this.parentComponent,
            containerInfo = null;

        if ( cursorInfo.startOffset === cursorInfo.endOffset ) {

            containerInfo = syntaxComponent.getGroupContent( cursorInfo.groupId );

            if ( cursorInfo.startOffset > 0 ) {

                prevGroupNode = containerInfo.content[ cursorInfo.startOffset - 1 ];

                if ( isGroupNode( prevGroupNode ) ) {
                    cursorInfo = locateIndex( this, prevGroupNode, DIRECTION.LEFT );
                } else {
                    cursorInfo.startOffset -= 1;
                    cursorInfo.endOffset = cursorInfo.startOffset;
                }

            // 跳出当前容器， 回溯
            } else {

                cursorInfo = locateOuterIndex( this, containerInfo.groupObj, DIRECTION.LEFT );

            }

        } else {

            cursorInfo.startOffset = Math.min( cursorInfo.startOffset, cursorInfo.endOffset );
            // 收缩
            cursorInfo.endOffset = cursorInfo.startOffset;

        }

        return cursorInfo;

    }

    function updateCursorGoRight ( cursorInfo ) {

        var nextGroupNode = null,
            syntaxComponent = this.parentComponent,
            containerInfo = null;

        if ( cursorInfo.startOffset === cursorInfo.endOffset ) {

            containerInfo = syntaxComponent.getGroupContent( cursorInfo.groupId );

            if ( cursorInfo.startOffset < containerInfo.content.length ) {

                nextGroupNode = containerInfo.content[ cursorInfo.startOffset ];

                // 进入容器内部
                if ( isGroupNode( nextGroupNode ) ) {
                    cursorInfo = locateIndex( this, nextGroupNode, DIRECTION.RIGHT );
                } else {
                    cursorInfo.startOffset += 1;
                    cursorInfo.endOffset = cursorInfo.startOffset;
                }

            // 跳出当前容器， 回溯
            } else {

                cursorInfo = locateOuterIndex( this, containerInfo.groupObj, DIRECTION.RIGHT );

            }

        } else {

            cursorInfo.endOffset = Math.max( cursorInfo.startOffset, cursorInfo.endOffset );
            // 收缩
            cursorInfo.startOffset = cursorInfo.endOffset;

        }

        return cursorInfo;

    }

    /**
     * 组内寻址, 入组
     */
    function locateIndex ( moveComponent, groupNode, dir ) {

        switch ( dir ) {

            case DIRECTION.LEFT:
                return locateLeftIndex( moveComponent, groupNode );

            case DIRECTION.RIGHT:
                return locateRightIndex( moveComponent, groupNode );

        }

        throw new Error( "undefined move direction!" );

    }

    /**
     * 组外寻址, 出组
     */
    function locateOuterIndex ( moveComponent, groupNode, dir ) {

        switch ( dir ) {

            case DIRECTION.LEFT:
                return locateOuterLeftIndex( moveComponent, groupNode );

            case DIRECTION.RIGHT:
                return locateOuterRightIndex( moveComponent, groupNode );

        }

        throw new Error( "undefined move direction!" );

    }

    // 左移内部定位
    function locateLeftIndex ( moveComponent, groupNode ) {

        var syntaxComponent = moveComponent.parentComponent,
            groupInfo = null,
            groupElement = null;

        if ( isPlaceholderNode( groupNode ) ) {
            return locateOuterLeftIndex( moveComponent, groupNode );
        }

        if ( isGroupNode( groupNode ) ) {

            groupInfo = syntaxComponent.getGroupContent( groupNode.id );
            // 容器内部中末尾的元素
            groupElement = groupInfo.content[ groupInfo.content.length - 1 ];

            // 空检测
            if ( isEmptyNode( groupElement ) ) {

                // 做跳出处理
                return locateOuterLeftIndex( moveComponent, groupElement );

            }

            // 待定位的组本身就是一个容器, 则检测其内部结构是否还包含容器
            if ( isContainerNode( groupNode ) ) {

                // 内部元素仍然是一个容器
                if ( isContainerNode( groupElement ) ) {
                    // 递归处理
                    return locateLeftIndex( moveComponent, groupElement );
                }

                return {
                    groupId: groupNode.id,
                    startOffset: groupInfo.content.length,
                    endOffset: groupInfo.content.length
                };

            // 仅是一个组， 进入组内部处理, 找到目标容器
            } else {

                while ( !isContainerNode( groupElement ) ) {
                    groupInfo = syntaxComponent.getGroupContent( groupElement.id );
                    groupElement = groupInfo.content[ groupInfo.content.length - 1 ];
                }

                return locateLeftIndex( moveComponent, groupElement );

            }

        }

        return null;

    }

    // 左移外部定位
    function locateOuterLeftIndex ( moveComponent, groupNode ) {

        var kfEditor = moveComponent.kfEditor,
            syntaxComponent = moveComponent.parentComponent,
            outerGroupInfo = null,
            groupInfo = null;

        // 根容器， 不用再跳出
        if ( isRootNode( groupNode ) ) {
            return null;
        }

        outerGroupInfo = kfEditor.requestService( "position.get.parent.info", groupNode );

        while ( outerGroupInfo.index === 0 ) {
            outerGroupInfo = kfEditor.requestService( "position.get.parent.info", outerGroupInfo.group.groupObj );
        }

        groupNode = outerGroupInfo.group.content[ outerGroupInfo.index - 1 ];

        // 定位到的组是一个容器， 则定位到容器尾部
        if ( isContainerNode( groupNode ) ) {

            groupInfo = syntaxComponent.getGroupContent( groupNode.id );

            return {
                groupId: groupNode.id,
                startOffset: groupInfo.content.length,
                endOffset: groupInfo.content.length
            };

        }

        return {
            groupId: outerGroupInfo.group.id,
            startOffset: outerGroupInfo.index,
            endOffset: outerGroupInfo.index
        };

    }

    // 右移内部定位
    function locateRightIndex ( moveComponent, groupNode ) {

        var syntaxComponent = moveComponent.parentComponent,
            groupInfo = null,
            groupElement = null;

        if ( isGroupNode( groupNode ) ) {

            groupInfo = syntaxComponent.getGroupContent( groupNode.id );
            // 容器内部中末尾的元素
            groupElement = groupInfo.content[ 0 ];

            // 待定位的组本身就是一个容器, 则检测其内部结构是否还包含容器
            if ( isContainerNode( groupNode ) ) {

                // 内部元素仍然是一个容器
                if ( isContainerNode( groupElement ) ) {
                    // 递归处理
                    return locateRightIndex( moveComponent, groupElement );
                }

                return {
                    groupId: groupNode.id,
                    startOffset: 0,
                    endOffset: 0
                };

                // 仅是一个组， 进入组内部处理, 找到目标容器
            } else {

                while ( !isContainerNode( groupElement ) ) {
                    groupInfo = syntaxComponent.getGroupContent( groupElement.id );
                    groupElement = groupInfo.content[ 0 ];
                }

                return locateRightIndex( moveComponent, groupElement );

            }

        }

        return null;

    }

    // 右移外部定位
    function locateOuterRightIndex ( moveComponent, groupNode ) {

        var kfEditor = moveComponent.kfEditor,
            syntaxComponent = moveComponent.parentComponent,
            outerGroupInfo = null,
            groupInfo = null;

        // 根容器， 不用再跳出
        if ( isRootNode( groupNode ) ) {
            return null;
        }

        outerGroupInfo = kfEditor.requestService( "position.get.parent.info", groupNode );

        // 仍然需要回溯
        while ( outerGroupInfo.index === outerGroupInfo.group.content.length - 1 ) {
            outerGroupInfo = kfEditor.requestService( "position.get.parent.info", outerGroupInfo.group.groupObj );
        }

        groupNode = outerGroupInfo.group.content[ outerGroupInfo.index + 1 ];

        // 空节点处理
        if ( isEmptyNode( groupNode ) ) {
            return locateOuterRightIndex( moveComponent, groupNode );
        }

        // 定位到的组是一个容器， 则定位到容器内部开头位置上
        if ( isContainerNode( groupNode ) ) {

            return {
                groupId: groupNode.id,
                startOffset: 0,
                endOffset: 0
            };

        }

        return {
            groupId: outerGroupInfo.group.id,
            startOffset: outerGroupInfo.index + 1,
            endOffset: outerGroupInfo.index + 1
        };

    }

    function isRootNode ( node ) {

        return !!node.getAttribute( "data-root" );

    }

    function isContainerNode ( node ) {
        return node.getAttribute( "data-type" ) === "kf-editor-group"
    }

    function isGroupNode ( node ) {
        var dataType = node.getAttribute( "data-type" );
        return dataType === "kf-editor-group" || dataType === "kf-editor-virtual-group";
    }

    function isPlaceholderNode ( node ) {
        return !!node.getAttribute( "data-placeholder" ) || node.getAttribute( "data-flag" ) === "Placeholder";
    }

    function isEmptyNode ( node ) {
        return node.getAttribute( "data-flag" ) === "Empty";
    }

} );