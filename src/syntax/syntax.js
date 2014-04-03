/*!
 * 语法控制单元
 */

define( function ( require ) {

    var kity = require( "kity" ),

        MoveComponent = require( "syntax/move" ),

        CURSOR_CHAR = "\uF155",

        SyntaxComponenet = kity.createClass( 'SyntaxComponenet', {

            constructor: function ( kfEditor ) {

                this.kfEditor = kfEditor;

                // 数据记录表
                this.record = {

                    // 光标位置
                    cursor: {
                        group: null,
                        startOffset: -1,
                        endOffset: -1
                    }

                };

                // 子组件结构
                this.components = {};

                // 对象树
                this.objTree = null;

                this.initComponents();
                this.initServices();

            },

            initComponents: function () {
                this.components[ 'move' ] = new MoveComponent( this, this.kfEditor );
            },

            initServices: function () {

                this.kfEditor.registerService( "syntax.update.objtree", this, {
                    updateObjTree: this.updateObjTree
                } );

                this.kfEditor.registerService( "syntax.get.objtree", this, {
                    getObjectTree: this.getObjectTree
                } );

                this.kfEditor.registerService( "syntax.get.group.object", this, {
                    getGroupObject: this.getGroupObject
                } );

                this.kfEditor.registerService( "syntax.valid.placeholder", this, {
                    isPlaceholder: this.isPlaceholder
                } );

                this.kfEditor.registerService( "syntax.valid.brackets", this, {
                    isBrackets: this.isBrackets
                } );

                this.kfEditor.registerService( "syntax.get.group.content", this, {
                    getGroupContent: this.getGroupContent
                } );

                this.kfEditor.registerService( "syntax.update.record.cursor", this, {
                    updateCursor: this.updateCursor
                } );

                this.kfEditor.registerService( "syntax.update.selection", this, {
                    updateSelection: this.updateSelection
                } );

                this.kfEditor.registerService( "syntax.get.record.cursor", this, {
                    getCursorRecord: this.getCursorRecord
                } );

                this.kfEditor.registerService( "syntax.get.latex.info", this, {
                    getLatexInfo: this.getLatexInfo
                } );

                this.kfEditor.registerService( "syntax.insert.string", this, {
                    insertString: this.insertString
                } );

                this.kfEditor.registerService( "syntax.insert.group", this, {
                    insertGroup: this.insertGroup
                } );

                this.kfEditor.registerService( "syntax.serialization", this, {
                    serialization: this.serialization
                } );

                this.kfEditor.registerService( "syntax.cursor.move.left", this, {
                    leftMove: this.leftMove
                } );

                this.kfEditor.registerService( "syntax.cursor.move.right", this, {
                    rightMove: this.rightMove
                } );

            },

            updateObjTree: function ( objTree ) {

                var selectInfo = objTree.select;

                if ( selectInfo && selectInfo.groupId ) {
                    this.updateCursor( selectInfo.groupId, selectInfo.startOffset, selectInfo.endOffset );
                }

                this.objTree = objTree;

            },

            // 验证给定ID的组是否是占位符
            isPlaceholder: function ( groupId ) {
                return !!this.objTree.mapping[ groupId ].objGroup.node.getAttribute( "data-placeholder" );
            },

            isBrackets: function ( groupId ) {
                return !!this.objTree.mapping[ groupId ].objGroup.node.getAttribute( "data-brackets" );
            },

            getObjectTree: function () {
                return this.objTree;
            },

            getGroupObject: function ( id ) {

                return this.objTree.mapping[ id ].objGroup || null;

            },

            getCursorRecord: function () {

                return kity.Utils.extend( {}, this.record.cursor ) || null;

            },

            getGroupContent: function ( groupId ) {

                var groupInfo = this.objTree.mapping[ groupId ],
                    content = [],
                    operands = groupInfo.objGroup.operands,
                    offset = operands.length - 1,
                    isLtr = groupInfo.strGroup.traversal !== "rtl";

                kity.Utils.each( operands, function ( operand, i ) {

                    if ( isLtr ) {
                        content.push( operand.node );
                    } else {
                        content[ offset - i ] = operand.node;
                    }

                } );

                return {
                    id: groupId,
                    traversal: groupInfo.strGroup.traversal || "ltr",
                    groupObj: groupInfo.objGroup.node,
                    content: content
                };

            },

            updateSelection: function ( group ) {

                var groupObj = this.objTree.mapping[ group.id ],
                    curStrGroup = groupObj.strGroup,
                    parentGroup = null,
                    parentGroupObj = null,
                    resultStr = null,
                    startOffset = -1,
                    endOffset = -1;

                parentGroup = group;
                parentGroupObj = groupObj;

                if ( curStrGroup.name === "combination" ) {

                    this.record.cursor = {
                        groupId: parentGroup.id,
                        startOffset: 0,
                        endOffset: curStrGroup.operand.length
                    };

                    // 字符内容处理
                    curStrGroup.operand.unshift( CURSOR_CHAR );
                    curStrGroup.operand.push( CURSOR_CHAR );

                } else {

                    // 函数处理， 找到函数所处的最大范围
                    while ( parentGroupObj.strGroup.name !== "combination" || parentGroup.content === 1 ) {

                        group = parentGroup;
                        groupObj = parentGroupObj;

                        parentGroup = this.kfEditor.requestService( "position.get.parent.group", groupObj.objGroup.node );
                        parentGroupObj = this.objTree.mapping[ parentGroup.id ];

                    }

                    var parentIndex = [].indexOf.call( parentGroup.content, group.groupObj );

                    this.record.cursor = {
                        groupId: parentGroup.id,
                        startOffset: parentIndex,
                        endOffset: parentIndex + 1
                    };

                    // 在当前函数所在的位置作标记
                    parentGroupObj.strGroup.operand.splice( parentIndex+1, 0, CURSOR_CHAR );
                    parentGroupObj.strGroup.operand.splice( parentIndex, 0, CURSOR_CHAR );

                }

                // 返回结构树进过序列化后所对应的latex表达式， 同时包含有当前光标定位点信息
                resultStr = this.kfEditor.requestService( "parser.latex.serialization", this.objTree.parsedTree );

                startOffset = resultStr.indexOf( CURSOR_CHAR );
                resultStr = resultStr.replace( CURSOR_CHAR, "" );
                endOffset = resultStr.indexOf( CURSOR_CHAR );

                parentGroupObj.strGroup.operand.splice( this.record.cursor.startOffset, 1 );
                parentGroupObj.strGroup.operand.splice( this.record.cursor.endOffset, 1 );

                return {
                    str: resultStr,
                    startOffset: startOffset,
                    endOffset: endOffset
                }

            },

            getLatexInfo: function () {

                var cursor = this.record.cursor,
                    objGroup = this.objTree.mapping[ cursor.groupId ],
                    curStrGroup = objGroup.strGroup,
                    resultStr = null,
                    strStartIndex = -1,
                    strEndIndex = -1,
                    isPlaceholder = !!curStrGroup.attr[ "data-placeholder" ];

                // 格式化偏移值， 保证在处理操作数时， 标记位置不会出错
                strStartIndex = Math.min( cursor.endOffset, cursor.startOffset );
                strEndIndex = Math.max( cursor.endOffset, cursor.startOffset );

                if ( !isPlaceholder ) {

                    curStrGroup.operand.splice( strEndIndex, 0, CURSOR_CHAR );
                    curStrGroup.operand.splice( strStartIndex, 0, CURSOR_CHAR );
                    strEndIndex += 1;

                } else {
                    // 找到占位符的包裹元素
                    curStrGroup = this.kfEditor.requestService( "position.get.parent.group", objGroup.objGroup.node )
                    curStrGroup = this.objTree.mapping[ curStrGroup.id ].strGroup;
                    curStrGroup.operand.unshift( CURSOR_CHAR );
                    curStrGroup.operand.push( CURSOR_CHAR );
                }

                // 返回结构树进过序列化后所对应的latex表达式， 同时包含有当前光标定位点信息
                resultStr = this.kfEditor.requestService( "parser.latex.serialization", this.objTree.parsedTree );

                if ( !isPlaceholder ) {
                    curStrGroup.operand.splice( strEndIndex, 1 );
                    curStrGroup.operand.splice( strStartIndex, 1 );
                } else {
                    curStrGroup.operand.shift();
                    curStrGroup.operand.pop();
                }

                strStartIndex = resultStr.indexOf( CURSOR_CHAR );
                // 清除掉一个符号
                resultStr = resultStr.replace( CURSOR_CHAR, "" );
                strEndIndex = resultStr.lastIndexOf( CURSOR_CHAR );

                return {
                    str: resultStr,
                    startOffset: strStartIndex,
                    endOffset: strEndIndex
                }

            },

            // 更新光标记录， 同时更新数据
            updateCursor: function ( groupId, startOffset, endOffset ) {

                if ( endOffset === undefined ) {
                    endOffset = startOffset;
                }

                this.record.cursor = {
                    groupId: groupId,
                    startOffset: startOffset,
                    endOffset: endOffset
                };

                window.tt = this.record.cursor;

            },

            serialization: function () {

                // 返回结构树进过序列化后所对应的latex表达式， 同时包含有当前光标定位点信息
                return this.kfEditor.requestService( "parser.latex.serialization", this.objTree.parsedTree );


            },

            insertGroup: function ( latexStr ) {

                var parsedResult = this.kfEditor.requestService( "parser.parse", latexStr ),
                    subtree = parsedResult.tree;

                this.insertSubtree( subtree );

            },

            leftMove: function () {
                this.components.move.leftMove();
            },

            rightMove: function () {
                this.components.move.rightMove();
            },

            insertSubtree: function ( subtree ) {

                var cursorInfo = this.record.cursor,
                    // 当前光标信息所在的子树
                    startOffset = 0,
                    endOffset = 0,
                    currentTree = null,
                    diff = 0;

                if ( this.isPlaceholder( cursorInfo.groupId ) ) {
                    // 当前在占位符内，所以用子树替换占位符
                    this.replaceTree( subtree );

                } else {

                    startOffset = Math.min( cursorInfo.startOffset, cursorInfo.endOffset );
                    endOffset = Math.max( cursorInfo.startOffset, cursorInfo.endOffset );
                    diff = endOffset - startOffset;

                    currentTree = this.objTree.mapping[ cursorInfo.groupId ].strGroup;

                    // 插入子树
                    currentTree.operand.splice( startOffset, diff, subtree );

                    // 更新光标记录
                    cursorInfo.startOffset += 1;
                    cursorInfo.endOffset = cursorInfo.startOffset;
                }

            },

            replaceTree: function ( subtree ) {

                var cursorInfo = this.record.cursor,
                    groupNode = this.objTree.mapping[ cursorInfo.groupId ].objGroup.node,
                    parentInfo = this.kfEditor.requestService( "position.get.parent.info", groupNode ),
                    currentTree = this.objTree.mapping[ parentInfo.group.id ].strGroup;

                // 替换占位符为子树
                currentTree.operand[ parentInfo.index ] = subtree;

                // 更新光标
                cursorInfo.groupId = parentInfo.group.id;
                cursorInfo.startOffset = parentInfo.index + 1;
                cursorInfo.endOffset = parentInfo.index + 1;

            }

        });

    return SyntaxComponenet;

} );