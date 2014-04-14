/*!
 * 光标选区组件
 */

define( function ( require, exports, module ) {

    var kity = require( "kity" ),
        kfUtils = require( "base/utils" ),

        // 鼠标移动临界距离
        MAX_DISTANCE = 10;

    return kity.createClass( "SelectionComponent", {

        constructor: function ( parentComponent, kfEditor ) {

            this.parentComponent = parentComponent;
            this.kfEditor = kfEditor;

            this.isDrag = false;
            this.isMousedown = false;

            this.startPoint = {
                x: -1,
                y: -1
            };

            this.startGroup = {};

            this.initEvent();

        },

        initEvent: function () {

            var eventServiceObject = this.kfEditor.request( "ui.canvas.container.event" ),
                _self = this;

            /* 选区拖拽 start */
            eventServiceObject.on( "mousedown", function ( e ) {

                e.preventDefault();

                _self.isMousedown = true;
                _self.updateStartPoint( e.clientX, e.clientY );
                _self.updateStartGroup();

            } );

            eventServiceObject.on( "mouseup", function ( e ) {

                e.preventDefault();

                _self.stopUpdateSelection();

            } );

            eventServiceObject.on( "mousemove", function ( e ) {

                e.preventDefault();

                if ( !_self.isDrag ) {

                    if ( _self.isMousedown ) {

                        // 移动的距离达到临界条件
                        if ( MAX_DISTANCE < _self.getDistance( e.clientX, e.clientY ) ) {
                            _self.kfEditor.requestService( "control.cursor.hide" );
                            _self.startUpdateSelection();
                        }

                    }

                } else {
                    _self.updateSelection( e.target, e.clientX, e.clientY );
                }

            } );
            /* 选区拖拽 end */

            /* 双击选区 start */
            eventServiceObject.on( "dblclick", function ( e ) {

                _self.updateSelectionByTarget( e.target );

            } );
            /* 双击选区 end */

        },

        getDistance: function ( x, y ) {

            var distanceX = Math.abs( x - this.startPoint.x ),
                distanceY = Math.abs( y - this.startPoint.y );

            return Math.max( distanceX, distanceY );

        },

        updateStartPoint: function ( x, y ) {
            this.startPoint.x = x;
            this.startPoint.y = y;
        },

        updateStartGroup: function () {

            var cursorInfo = this.kfEditor.requestService( "syntax.get.record.cursor" );

            this.startGroup = {
                groupInfo: this.kfEditor.requestService( "syntax.get.group.content", cursorInfo.groupId ),
                offset: cursorInfo.startOffset
            };

        },

        startUpdateSelection: function () {
            this.isDrag = true;
            this.isMousedown = false;
            this.clearSelection();
        },

        stopUpdateSelection: function () {

            this.isDrag = false;
            this.isMousedown = false;

            this.kfEditor.requestService( "control.update.input" );

        },

        clearSelection: function () {

            this.kfEditor.requestService( "render.clear.select" );

        },

        updateSelection: function ( target, x, y ) {

            // 移动方向， true为右， false为左
            var dir = x > this.startPoint.x,
                cursorInfo = {},
                unifiedGroupInfo = null,
                inRightArea = false,
                startGroupInfo = this.startGroup,
                currentGroupNode = null,
                currentGroupInfo = this.getGroupInof( x, target );

            if ( currentGroupInfo.groupInfo.id === startGroupInfo.groupInfo.id ) {

                cursorInfo = {
                    groupId: currentGroupInfo.groupInfo.id,
                    startOffset: startGroupInfo.offset,
                    endOffset: currentGroupInfo.offset
                };

            } else {

                // 存在包含关系
                if ( startGroupInfo.groupInfo.groupObj.contains( currentGroupInfo.groupInfo.groupObj ) ) {

                    cursorInfo = {
                        groupId: startGroupInfo.groupInfo.id,
                        startOffset: startGroupInfo.offset,
                        endOffset: this.getIndex( startGroupInfo.groupInfo.groupObj, target, x )
                    };

                } else if ( currentGroupInfo.groupInfo.groupObj.contains( startGroupInfo.groupInfo.groupObj ) ) {

                    cursorInfo = {
                        groupId: currentGroupInfo.groupInfo.id,
                        startOffset: this.kfEditor.requestService( "position.get.index", currentGroupInfo.groupInfo.groupObj, startGroupInfo.groupInfo.groupObj ),
                        endOffset: currentGroupInfo.offset
                    };

                    // 向左移动要修正开始偏移
                    if ( !dir ) {
                        cursorInfo.startOffset += 1;
                    }

                // 都不存在包含关系
                } else {

                    // 获取公共容器
                    unifiedGroupInfo = this.getUnifiedGroup( startGroupInfo.groupInfo, currentGroupInfo.groupInfo );

                    // 修正偏移相同时的情况， 比如在分数中选中时
                    if ( unifiedGroupInfo.startOffset === unifiedGroupInfo.endOffset ) {

                        unifiedGroupInfo.endOffset += 1;

                    // 根据拖拽方向修正各自的偏移
                    } else {

                        // 当前光标移动所在的组元素节点
                        currentGroupNode = unifiedGroupInfo.group.content[ unifiedGroupInfo.endOffset ];

                        inRightArea = this.kfEditor.requestService( "position.get.area", currentGroupNode, x );

                        // 当前移动到右区域， 则更新结束偏移
                        if ( inRightArea ) {
                            unifiedGroupInfo.endOffset += 1;
                        }

                        // 左移动时， 修正起始偏移
                        if ( !dir ) {
                            unifiedGroupInfo.startOffset += 1;
                        }

                    }

                    cursorInfo = {
                        groupId: unifiedGroupInfo.group.id,
                        startOffset: unifiedGroupInfo.startOffset,
                        endOffset: unifiedGroupInfo.endOffset
                    };

                }

            }

            // 更新光标信息
            this.kfEditor.requestService( "syntax.update.record.cursor", cursorInfo.groupId, cursorInfo.startOffset, cursorInfo.endOffset );

            this.kfEditor.requestService( "render.select.current.cursor" );

        },

        updateSelectionByTarget: function ( target ) {

            var groupInfo = this.kfEditor.requestService( "position.get.group", target ),
                cursorInfo = {};

            if ( groupInfo === null ) {
                return;
            }

            // 更新光标信息
            cursorInfo = {
                groupId: groupInfo.id,
                startOffset: 0,
                endOffset: groupInfo.content.length
            };

            this.kfEditor.requestService( "syntax.update.record.cursor", cursorInfo );
            this.kfEditor.requestService( "render.select.current.cursor" );
            this.kfEditor.requestService( "control.cursor.hide" );
            this.kfEditor.requestService( "control.update.input" );


        },

        getGroupInof: function ( offset, target ) {

            var groupInfo = this.kfEditor.requestService( "position.get.group", target );

            if ( groupInfo === null ) {

                groupInfo = this.kfEditor.requestService( "syntax.get.root.group.info" );

            }

            var index = this.kfEditor.requestService( "position.get.location.info", offset, groupInfo );

            return {
                groupInfo: groupInfo,
                offset: index
            };

        },

        getIndex: function ( groupNode, targetNode, offset ) {

            var index = this.kfEditor.requestService( "position.get.index", groupNode, targetNode ),
                groupInfo = this.kfEditor.requestService( "syntax.get.group.content", groupNode.id ),
                targetWrapNode = groupInfo.content[ index ],
                targetRect = kfUtils.getRect( targetWrapNode );

            if ( ( targetRect.left + targetRect.width / 2 ) < offset ) {
                index += 1;
            }

            return index;

        },

        /**
         * 根据给定的两个组信息， 获取其所在的公共容器及其各自的偏移
         * @param startGroupInfo 组信息
         * @param endGroupInfo 另一个组信息
         */
        getUnifiedGroup: function ( startGroupInfo, endGroupInfo ) {

            var bigBoundingGroup = null,
                targetGroup = startGroupInfo.groupObj,
                groupNode = null,
                cursorInfo = {};

            while ( bigBoundingGroup = this.kfEditor.requestService( "position.get.group.info", targetGroup ) ) {

                if ( bigBoundingGroup.group.groupObj.contains( endGroupInfo.groupObj ) ) {
                    break;
                }

            }

            groupNode = bigBoundingGroup.group.groupObj;

            return {
                group: bigBoundingGroup.group,
                startOffset: bigBoundingGroup.index,
                endOffset: this.kfEditor.requestService( "position.get.index", groupNode, endGroupInfo.groupObj )
            };

        }

    } );

} );