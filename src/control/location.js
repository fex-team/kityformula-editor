/*!
 * 光标定位组件
 */

define( function ( require, exports, module ) {

    var kity = require( "kity" );

    return kity.createClass( "LocationComponent", {

        constructor: function ( parentComponent, kfEditor ) {

            this.parentComponent = parentComponent;
            this.kfEditor = kfEditor;

            // 创建光标
            this.paper = this.getPaper();
            this.cursorShape = this.createCursor();

            this.initServices();

            this.initEvent();

        },

        getPaper: function () {
            return this.kfEditor.requestService( "render.get.paper" );
        },

        initServices: function () {

            // 重定位光标
            this.kfEditor.registerService( "control.cursor.relocation", this, {
                relocationCursor: this.updateCursor
            } );

            // 清除光标
            this.kfEditor.registerService( "control.cursor.hide", this, {
                hideCursor: this.hideCursor
            } );

        },

        createCursor: function () {

            var cursorShape = new kity.Rect( 1, 0, 0, 0 ).fill( "black" );

            cursorShape.setAttr( "style", "display: none" );

            this.paper.addShape( cursorShape );

            return cursorShape;

        },

        // 光标定位监听
        initEvent: function () {

            var eventServiceObject = this.kfEditor.request( "ui.canvas.container.event" ),
                _self = this;

            eventServiceObject.on( "mousedown", function ( e ) {

                e.preventDefault();

                _self.updateCursorInfo( e );
                _self.updateCursor();
                _self.kfEditor.requestService( "render.tint.current.cursor" );
                _self.kfEditor.requestService( "control.update.input" );

            } );

        },

        updateCursorInfo: function ( evt ) {

            var cursorInfo = null,
                groupInfo = this.kfEditor.requestService( "position.get.group", evt.target ),
                index = -1;

            if ( groupInfo === null ) {
                groupInfo = this.kfEditor.requestService( "syntax.get.root.group.info" );
            }

            index = this.getIndex( evt.clientX, groupInfo );

            this.kfEditor.requestService( "syntax.update.record.cursor", groupInfo.id, index );

        },

        hideCursor: function () {
            this.cursorShape.setAttr( "style", "display: none" );
        },

        updateCursor: function () {

            var cursorInfo = this.kfEditor.requestService( "syntax.get.record.cursor" ),
                groupInfo = this.kfEditor.requestService( "syntax.get.group.content", cursorInfo.groupId ),
                isBefore = cursorInfo.endOffset === 0,
                index = isBefore ? 0 : cursorInfo.endOffset - 1,
                focusChild = groupInfo.content[ index ],
                paperContainerRect = getRect( this.paper.container.node ),
                cursorOffset = 0,
                focusChildRect = getRect( focusChild),
                cursorTransform = this.cursorShape.getTransform(),
                canvasZoom = this.kfEditor.requestService( "render.get.canvas.zoom" ),
                formulaZoom = this.paper.getZoom();

            this.cursorShape.setHeight( focusChildRect.height / canvasZoom / formulaZoom );

            // 计算光标偏移位置
            cursorOffset = isBefore ? ( focusChildRect.left - 2 ) : ( focusChildRect.left + focusChildRect.width - 2 );
            cursorOffset -= paperContainerRect.left;

            // 定位光标
            cursorTransform.m.e = cursorOffset / canvasZoom / formulaZoom ;
            cursorTransform.m.f = ( focusChildRect.top - paperContainerRect.top ) / canvasZoom / formulaZoom;

            this.cursorShape.setTransform( cursorTransform );
            this.cursorShape.setAttr( "style", "display: block" );

        },

        getIndex: function ( distance, groupInfo ) {

            var index = -1,
                children = groupInfo.content,
                boundingRect = null;

            for ( var i = children.length - 1, child = null; i >= 0; i-- ) {

                index = i;

                child = children[ i ];

                boundingRect = getRect( child );

                if ( boundingRect.left < distance ) {

                    if ( boundingRect.left + boundingRect.width / 2 < distance ) {
                        index += 1;
                    }

                    break;

                }

            }

            return index;

        }

    } );

    function getRect ( node ) {
        return node.getBoundingClientRect();
    }

} );