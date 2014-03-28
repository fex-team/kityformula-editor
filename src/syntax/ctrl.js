/*！
 * 光标控制
 */

define( function ( require, exports, module ) {

    function leftMove ( kfEditor, syntaxComponent ) {
        updateCursorGoLeft( kfEditor, syntaxComponent );
    }

    function rightMove ( kfEditor, syntaxComponent ) {
        updateCursorGoRight( kfEditor, syntaxComponent );
    }

    function updateCursorGoLeft ( kfEditor, syntaxComponent ) {

        var cursorInfo = syntaxComponent.record.cursor,
            groupObject = null,
            newCursorInfo = null,
            group = null,
            isPh = false,
            index = -1,
            prevNode = null;

        if ( cursorInfo.startOffset === cursorInfo.endOffset ) {

            group = syntaxComponent.getGroupContent( cursorInfo.groupId );

            isPh = isPlaceholderNode( group.groupObj );

            if ( !isPh && cursorInfo.startOffset > 0 ) {

                prevNode = group.content[ cursorInfo.startOffset - 1 ];

                // 更新光标到内部的最后节点上
                if ( isParentNode( prevNode ) ) {

                    group = syntaxComponent.getGroupContent( prevNode.id );

                    index = group.content.length-1;
                    // 对空节点的过滤
                    while ( group.content[ index ] && isEmptyNode ( group.content[ index ] ) ) {
                        index--;
                    }

                    // 溢出, 回溯
                    if ( index < 0 ) {

                        debugger;

                    } else {
                        group = syntaxComponent.getGroupContent( group.content[ index ].id );
                        cursorInfo.groupId = group.id;
                        cursorInfo.startOffset = group.content.length;
                    }


                } else {
                    cursorInfo.startOffset--;
                }

            } else {

                group = syntaxComponent.getGroupContent( cursorInfo.groupId );

                // 根节点， 已到末尾
                if ( isRootNode( group.groupObj ) ) {
                    return;
                }

                // 回溯到最近的组
                newCursorInfo = kfEditor.requestService( "position.get.parent.info", group.groupObj );

                // 已经遍历过当前组内的所有元素，结束当前组, 回溯到更上层的位置上
                if ( newCursorInfo.index === 0 ) {

                    newCursorInfo = kfEditor.requestService( "position.get.parent.info", newCursorInfo.group.groupObj );
                    cursorInfo.groupId = newCursorInfo.group.id;
                    cursorInfo.startOffset = newCursorInfo.index;

                // 仍然在当前组处理， 光标前移
                } else {

                    group = newCursorInfo.group.content[ newCursorInfo.index - 1 ];
                    group = syntaxComponent.getGroupContent( group.id );

                    cursorInfo.groupId = group.id;
                    cursorInfo.startOffset = group.content.length;

                }

            }

            cursorInfo.endOffset = cursorInfo.startOffset;

        } else {

            cursorInfo.endOffset = cursorInfo.startOffset;

        }

    }

    function updateCursorGoRight ( kfEditor, syntaxComponent ) {

        var cursorInfo = syntaxComponent.record.cursor,
            group = null,
            nextNode = null,
            isPh = false,
            newCursorInfo = null;

        if ( cursorInfo.startOffset === cursorInfo.endOffset ) {

            group = syntaxComponent.getGroupContent( cursorInfo.groupId );

            // 占位符检测
            isPh = isPlaceholderNode( group.groupObj );

            if ( !isPh && cursorInfo.startOffset < group.content.length ) {

                nextNode = group.content[ cursorInfo.startOffset ];

                // 是包裹元素， 更新光标到其内部第一个成员内
                if ( isParentNode( nextNode ) ) {
                    group = syntaxComponent.getGroupContent( nextNode.id );
                    // 必须是组元素才能作为光标定位容器
                    while ( !isGroupNode( group.groupObj ) ) {
                        group = syntaxComponent.getGroupContent( group.content[ 0 ].id );
                    }
                    cursorInfo.groupId = group.id;
                    cursorInfo.startOffset = 0;
                } else {
                    cursorInfo.startOffset++;
                }

            } else {

                // 根节点， 已到末尾
                if ( isRootNode( group.groupObj ) ) {
                    return;
                }

                newCursorInfo = kfEditor.requestService( "position.get.parent.info", group.groupObj );
                group = newCursorInfo.group;

                // 对空节点的过滤
                while ( group.content[ newCursorInfo.index+1 ] && isEmptyNode ( group.content[ newCursorInfo.index+1 ] ) ) {
                    newCursorInfo.index++;
                }

                // 已到当前直接属组的末尾
                if ( group.content.length <= newCursorInfo.index + 1 ) {

                    // 跳出当前直属组
                    newCursorInfo = kfEditor.requestService( "position.get.group.info", group.groupObj );

                    cursorInfo.groupId = newCursorInfo.group.id;
                    cursorInfo.startOffset = newCursorInfo.index + 1;

                } else {

                    // 继续处理当前直接属组里剩下的元素
//                    cursorInfo.groupId = group.content[ newCursorInfo.index + 1 ].id;
                    // 继续处理当前直接属组里剩下的元素
                    // 验证当前直属组里的下一个元素是否是组节点
                    group = syntaxComponent.getGroupContent( group.content[ newCursorInfo.index + 1 ].id );
                    while ( !isGroupNode( group.groupObj ) ) {
                        group = syntaxComponent.getGroupContent( group.content[ 0 ].id );
                    }
                    cursorInfo.groupId = group.id;
                    cursorInfo.startOffset = 0;
                }

            }

            cursorInfo.endOffset = cursorInfo.startOffset;

        } else {

            cursorInfo.startOffset = cursorInfo.endOffset;

        }

    }

    function isRootNode ( node ) {

        return !!node.getAttribute( "data-root" );

    }

    function isGroupNode ( node ) {
        return node.getAttribute( "data-type" ) === "kf-editor-group"
    }

    function isParentNode ( node ) {
        var dataType = node.getAttribute( "data-type" );
        return dataType === "kf-editor-group" || dataType === "kf-editor-virtual-group";
    }

    function isPlaceholderNode ( node ) {
        return !!node.getAttribute( "data-placeholder" );
    }

    function isEmptyNode ( node ) {
        return node.getAttribute( "data-flag" ) === "Empty";
    }

    return {
        leftMove: leftMove,
        rightMove: rightMove
    };

} );