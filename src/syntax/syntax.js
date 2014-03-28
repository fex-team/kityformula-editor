/*!
 * 语法控制单元
 */

define( function ( require ) {

    var kity = require( "kity" ),

        CTRL = require( "syntax/ctrl" ),

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
                // 对象树
                this.objTree = null;
                this.initServices();

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

            getObjectTree: function () {
                return this.objTree;
            },

            getGroupObject: function ( id ) {

                return this.objTree.mapping[ id ].objGroup || null;

            },

            getCursorRecord: function () {

                return this.record.cursor || null;

            },

            getGroupContent: function ( groupId ) {

                var groupInfo = this.objTree.mapping[ groupId ],
                    content = [],
                    operands = groupInfo.objGroup.operands;

                kity.Utils.each( operands, function ( operand, i ) {

                    content.push( operand.node );

                } );

                return {
                    id: groupId,
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
                    // 由于插入了strStartIndex， 所以需要加1
                    strEndIndex += 1;
                } else {
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
                strEndIndex = resultStr.lastIndexOf( CURSOR_CHAR );

                return {
                    str: resultStr,
                    startOffset: strStartIndex,
                    endOffset: strEndIndex
                }

            },

            // 更新光标记录， 同时更新数据
            updateCursor: function ( groupId, startOffset, endOffset ) {

                var curStrGroup = this.objTree.mapping[ groupId ].strGroup,
                    resultStr = null,
                    isPlaceholder = !!curStrGroup.attr[ "data-placeholder" ];

                if ( endOffset === undefined ) {
                    endOffset = startOffset;
                }

                this.record.cursor = {
                    groupId: groupId,
                    startOffset: startOffset,
                    endOffset: endOffset
                };

                if ( isPlaceholder ) {
                    this.record.cursor.startOffset = 1;
                    this.record.cursor.endOffset = 1;
                }

            },

            insertString: function ( str ) {

                var curStrGroup = this.objTree.mapping[ this.record.cursor.groupId ].strGroup,
                    charArr = str.split( "" );

                charArr = [ this.record.cursor.index, 0 ].concat( charArr );

                [].splice.apply( curStrGroup.operand, charArr );

            },

            insertGroup: function ( str ) {

                var curStrGroup = this.objTree.mapping[ this.record.cursor.groupId ].strGroup;

                str = "{" + str + "}";

                curStrGroup.operand.splice( this.record.cursor.index, 0, str );

            },

            serialization: function () {

                // 返回结构树进过序列化后所对应的latex表达式， 同时包含有当前光标定位点信息
                return this.kfEditor.requestService( "parser.latex.serialization", this.objTree.parsedTree );

            },

            leftMove: function () {
                CTRL.leftMove( this.kfEditor, this );
            },

            rightMove: function () {
                CTRL.rightMove( this.kfEditor, this );
            }

        });

    return SyntaxComponenet;

} );