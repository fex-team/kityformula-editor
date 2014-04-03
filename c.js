/**
 * Created by hn on 14-3-19.
 */

( function () {

    var c = {
            start: function ( editor ) {
                kfEditor = editor;

                window.kfEditor = kfEditor;

                vCursor = createVCursor( kfEditor );

                inp = document.getElementById( "hiddenInput" );

                initClick();

            }
        },
        isShowCursor = false,
        inp = null,
        isAllowInput = false,
        vCursor = null,
        lastCount = -1,
        cursorIndex = -1,
        currentStartOffset = -1,
        currentStartContainer = null,
        currentEndContainer = null,
        currentEndOffset = -1,
        ctrlStartContainer = null,
        ctrlStartOffset = null,
        currentGroup = null,
        isDrag = false,
        isMousedown = false,
        mousedownPoint = { x: 0, y: 0 },
        MAX_COUNT = 1000,
        CALL_COUNT = 0,
        CURSOR_BLINKS = null,
        // 移动阀值
        dragThreshold = 10,
        kfEditor = null;

    // init click
    function initClick  () {

        var evt = kfEditor.request( "ui.canvas.container.event" );

        evt.on( "mousedown", function ( e ) {

            e.preventDefault();

            if (e.which !== 1 ) {
                return;
            }

            isMousedown = true;
            isDrag = false;
            mousedownPoint = { x: e.clientX, y: e.clientY };

            hideCursor();

            cursorIndex = 0;

            var target = e.target,
                group = kfEditor.requestService( "position.get.group", target ),
                parentGroup = kfEditor.requestService( "position.get.parent.group", target );

            if ( !group ) {
                group = kfEditor.requestService( "syntax.get.group.content", "_kf_editor_1_1" );
            }

            if ( !parentGroup ) {
                parentGroup = group;
            }

            currentGroup = group;

            currentStartContainer = group;
            ctrlStartContainer = currentStartContainer;

            currentStartOffset = getIndex( currentStartContainer, e.clientX );
            ctrlStartOffset = currentStartOffset;

            if ( group ) {

                kfEditor.requestService( "render.select.group.content", group );

                kfEditor.requestService( "syntax.update.record.cursor", group.id, currentStartOffset );

                // group的选中
                var cursorInfo = kfEditor.requestService( "syntax.get.record.cursor" );

                var result = kfEditor.requestService( "syntax.get.latex.info" );

                updateInput( result );

                if ( cursorInfo.startOffset === cursorInfo.endOffset ) {
                    // 点击的是占位符， 则进行着色
                    if ( kfEditor.requestService( "syntax.valid.placeholder", parentGroup.id ) ) {
                        kfEditor.requestService( "render.select.group", parentGroup.id );
                    // 否则， 绘制光标
                    } else {
                        drawCursor( group, cursorInfo.startOffset );
                    }
                }

            } else {
                kfEditor.requestService( "render.clear.select" );
            }

        } );

        evt.on( "dblclick", function ( e ) {

            e.preventDefault();

            isMousedown = false;
            isDrag = false;

            hideCursor();

            var target = e.target,
                group = kfEditor.requestService( "position.get.parent.group", target );

            if ( group ) {
                kfEditor.requestService( "render.select.group.all", group );
                var result = kfEditor.requestService( "syntax.update.selection", group );
                updateInput( result );

            } else {
                kfEditor.requestService( "render.clear.select" );
            }

        } );

        evt.on( "mouseup", function ( e ) {

            e.preventDefault();

            var _isDrag = isDrag;

            isDrag = false;
            isMousedown = false;

            if ( _isDrag ) {

                var result = kfEditor.requestService( "syntax.get.latex.info" );

                updateInput( result );

            }

        } );

        inp.addEventListener( "keydown", function ( e ) {

            isMousedown = false;
            isDrag = false;

            hideCursor();

            switch ( e.keyCode ) {

                // left
                case 37:
                    e.preventDefault();
                    kfEditor.requestService( "syntax.cursor.move.left" );
                    update();
                    return;

                // right
                case 39:
                    e.preventDefault();
                    kfEditor.requestService( "syntax.cursor.move.right" );
                    update();
                    return;

            }

        }, false );

        kfEditor.registerService( "control.insert.group", null, {
            insertGroup: insertGroup
        } );

        function insertGroup ( val ) {

            var latexStr = inp.value,
                startOffset = inp.selectionStart,
                endOffset = inp.selectionEnd,
                latexInfo = null;

            kfEditor.requestService( "syntax.insert.group", val );

            latexInfo = kfEditor.requestService( "syntax.get.latex.info" );

            updateInput( latexInfo );

            kfEditor.requestService( "render.draw", latexInfo.str );

            drawCursorService();

//
//            val = "{" + val + "}"
//
//            startOffset = latexStr.substring( 0, startOffset );
//            endOffset = latexStr.substring( endOffset );
//
//            latexStr = startOffset + val + endOffset;
//
//            updateInput( {
//                str: latexStr,
//                startOffset: ( startOffset + val ).length + 1,
//                endOffset: ( startOffset + val ).length + 1
//            } );
//
//            kfEditor.requestService( "render.draw", latexStr );
//
//            drawCursorService();

        }

        function update () {

            var cursorInfo = kfEditor.requestService( "syntax.get.record.cursor" ),
                group = kfEditor.requestService( "syntax.get.group.content", cursorInfo.groupId );

            kfEditor.requestService( "render.select.group.content", group );

            var result = kfEditor.requestService( "syntax.get.latex.info" );

            updateInput( result );

            if ( cursorInfo.startOffset === cursorInfo.endOffset && !kfEditor.requestService( "syntax.valid.placeholder", cursorInfo.groupId ) ) {
                drawCursor( group, cursorInfo.startOffset );
            }

            return result;

        }

        function updateLatexValue ( latexResult ) {

            kfEditor.requestService( "render.reselect" );

            updateInput( latexResult );

            drawCursorService();

        }

        evt.on( "mousemove", function ( e ) {

            var group = null;

            e.preventDefault();

            if ( isMousedown && !isDrag && ( Math.abs( e.clientX - mousedownPoint.x ) > dragThreshold || Math.abs( e.clientY - mousedownPoint.y ) > dragThreshold ) ) {

                isDrag = true;

            }

            if ( !isDrag ) {
                return;
            }

            hideCursor();

            var group = kfEditor.requestService( "position.get.group", e.target );
            if ( !group ) {
                group = kfEditor.requestService( "syntax.get.group.content", "_kf_editor_1_1" );
            }

            currentEndContainer = kfEditor.requestService( "syntax.get.group.content", group.id );

            currentEndOffset = getMoveIndex( currentEndContainer, e.clientX );

            kfEditor.requestService( "syntax.update.record.cursor", currentEndContainer.id, currentStartOffset, currentEndOffset );
            kfEditor.requestService( "render.select.current.cursor" );

            if ( currentStartOffset === currentEndOffset ) {

                // 起点是占位符， 则选中占位符
                if ( kfEditor.requestService( "syntax.valid.placeholder", group.id ) ) {
                    kfEditor.requestService( "render.select.group", group.id );
                // 否则， 绘制光标
                } else {
                    drawCursor( currentEndContainer, currentEndOffset );
                }
            }

        } );

        inp.oninput = function ( e ) {

            cursorIndex += inp.value.length - lastCount;
            kfEditor.requestService( "render.draw", inp.value );
            kfEditor.requestService( "render.reselect" );

            drawCursorService();

        };

        function drawCursorService () {

            var cursorInfo = kfEditor.requestService( "syntax.get.record.cursor" ),
                group = kfEditor.requestService( "syntax.get.group.content", cursorInfo.groupId );

            drawCursor( group, cursorInfo.startOffset );

            kfEditor.requestService( "render.select.group", cursorInfo.groupId );

        }

        function updateInput ( result ) {

            inp.value = result.str;
            inp.selectionStart = result.startOffset;
            inp.selectionEnd = result.endOffset;
            inp.focus();

            isAllowInput = true;

        }

        inp.onblur = function () {
            isAllowInput = false;
            hideCursor();
        };

        // 修正起始容器和结束容器指向不统一的情况
        function updateContainer ( startContainer, endContainer, offset ) {

            var parent = null,
                oldChild = null,
                startIsParent = false,
                child = null;

            if ( startContainer.groupObj.contains( endContainer.groupObj ) ) {
                startIsParent = true;
                parent = startContainer;
                child = endContainer;
            } else if ( endContainer.groupObj.contains( startContainer.groupObj ) ) {
                // 结束区域更大
                parent = endContainer;
                child = startContainer;
            } else {

                parent = endContainer;
                clearCount();
                while ( parent = kfEditor.requestService( "position.get.group", parent.groupObj ) ) {
                    updateCount();

                    if ( parent.groupObj.contains( startContainer.groupObj ) ) {
                        break;
                    }

                }

                child = startContainer;

            }

            oldChild = child;
            clearCount();
            while ( child = kfEditor.requestService( "position.get.parent.group", child.groupObj ) ) {

                updateCount();
                if ( child.id === parent.id ) {
                    child = oldChild;
                    break;
                }

                oldChild = child;

            }

            currentStartContainer = parent;
            currentEndContainer = parent;

            // 起点在大的区域内
            if ( startIsParent ) {

                currentStartOffset = ctrlStartOffset;
                currentEndOffset = parent.content.indexOf( child.groupObj );

                if ( currentEndOffset >= currentStartOffset ) {
                    currentEndOffset += 1;
                }

            // 起点在小的区域内部
            } else {

                currentStartOffset = parent.content.indexOf( child.groupObj );
                currentEndOffset = getOffset( parent, offset );

                if ( offset < mousedownPoint.x ) {
                    currentStartOffset += 1;
                } else {
                    currentEndOffset += 1;
                }

            }

        }

        // 返回在索引指定的位置插入光标，也就是说该索引的位置是在当前元素“之前”
        function getIndex ( group, offset ) {

            var index = getOffset( group, offset ),
                overflow = -1,
                // 点击是否在前半段
                box = null;

            box = group.content[ index ].getBoundingClientRect();

            overflow = offset - box.left;

            if ( overflow > box.width / 2 ) {
                index += 1;
            }

            return index;

        }

        function getOffset ( group, offset ) {

            var index = -1,
                box = null;

            kity.Utils.each( group.content, function ( child, i ) {

                index = i;

                box = child.getBoundingClientRect();

                if ( box.left + box.width > offset ) {
                    return false;
                }

            } );

            return index;

        }

        function getMoveIndex ( group, offset ) {

            currentStartContainer = ctrlStartContainer;
            currentStartOffset = ctrlStartOffset;

            // 直接更新
            if ( ctrlStartContainer.id !== group.id ) {
                updateContainer( ctrlStartContainer, group, offset );
                return currentEndOffset;
            }

            var index = -1,
                box = null,
                overflow = -1;

            kity.Utils.each( group.content, function ( child, i ) {

                index = i;

                box = child.getBoundingClientRect();

                if ( box.left + box.width > offset ) {
                    return false;
                }

            } );

            box = group.content[ index ].getBoundingClientRect();

            overflow = offset - box.left;

            // 向后走
            if ( index >= ctrlStartOffset ) {

                if ( overflow > box.width / 3 ) {
                    index += 1;
                }

            // 向前走
            } else {

                // 光标还在默认边界范围内
                if ( overflow > box.width / 3 * 2 ) {
                    index += 1;
                }

            }

            return index;

        }

        function hideCursor () {
            isShowCursor = false;
            stopCursorBlinks();
            vCursor.node.style.display = 'none';
        }

        function drawCursor ( group, index ) {

            var target = null,
                isBefore = true,
                prevBox = null,
                box = null,
                cursorTransform = null;

            if ( !isAllowInput ) {
                return;
            }

            var paper = kfEditor.requestService( "render.get.paper" ),
                offset = paper.getViewPort().offset,
                offsetLeft = 0,
                canvasZoom = kfEditor.requestService( "render.get.canvas.zoom" ),
                formulaZoom = paper.getZoom();

            // 定位到最后
            if ( index === group.content.length ) {
                index -= 1;
                isBefore = false;
            }

            target = group.content[ index ];

            box = target.getBoundingClientRect();

            prevBox = group.content[ index - 1 ] || target;
            prevBox = prevBox.getBoundingClientRect();

            // 更新transform
            cursorTransform = vCursor.getTransform();

            if ( isBefore ) {
                offsetLeft = box.left - paper.container.node.getBoundingClientRect().left;
            } else {
                offsetLeft = box.left - paper.container.node.getBoundingClientRect().left + box.width;
            }

            cursorTransform.m.e = offsetLeft / canvasZoom/ formulaZoom;

            cursorTransform.m.f = ( prevBox.top - paper.container.node.getBoundingClientRect().top ) / canvasZoom / formulaZoom;

            vCursor.setHeight( prevBox.height / canvasZoom / formulaZoom );

            vCursor.setTransform( cursorTransform );
            vCursor.node.style.display = "block";

            isShowCursor = true;

            startCursorBlinks();

        }

    }

    function clearCount () {
        CALL_COUNT = 0;
    }

    function updateCount () {
        CALL_COUNT++;
        if ( CALL_COUNT > MAX_COUNT ) {
            throw new Error("stack overflow");
        }
    }


    function createVCursor ( editor ) {

        var paper = editor.execCommand( "getPaper" ),
            vCursor = new kity.Rect( 1, 27, 0, 0 ).fill( "black" );

        vCursor.node.style.display = "none";

        paper.addShape( vCursor );

        return vCursor;

    }

    function startCursorBlinks () {
        if ( CURSOR_BLINKS ) {
            window.clearInterval( CURSOR_BLINKS );
        }
        CURSOR_BLINKS = window.setInterval( toggleCursor, 800 );
    }

    function stopCursorBlinks () {
        window.clearInterval( CURSOR_BLINKS );
    }

    function toggleCursor () {
        vCursor.node.style.display = isShowCursor ? "none" : "block";
        isShowCursor = !isShowCursor;
    }

    window.c = c;

} )();