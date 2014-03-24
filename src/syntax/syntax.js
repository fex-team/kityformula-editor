/*!
 * 语法控制单元
 */

define( function ( require ) {

    var kity = require( "kity" ),

        CURSOR_CHAR = "\uF155",

        SyntaxComponenet = kity.createClass( 'SyntaxComponenet', {

            constructor: function ( kfEditor ) {

                this.kfEditor = kfEditor;

                // 数据记录表
                this.record = {

                    // 光标位置
                    cursor: {
                        group: null,
                        index: -1
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

                this.kfEditor.registerService( "syntax.get.group.object", this, {
                    getGroupObject: this.getGroupObject
                } );

                this.kfEditor.registerService( "syntax.update.cursor", this, {
                    updateCursor: this.updateCursor
                } );

                this.kfEditor.registerService( "syntax.update.selection", this, {
                    updateSelection: this.updateSelection
                } );

                this.kfEditor.registerService( "syntax.get.record.cursor", this, {
                    getCursorRecord: this.getCursorRecord
                } );

                this.kfEditor.registerService( "syntax.update.cursor.index", this, {
                    updateCursorIndex: this.updateCursorIndex
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

            },

            updateObjTree: function ( objTree ) {

                var selectInfo = objTree.select;

                if ( selectInfo && selectInfo.groupId ) {
                    this.record.cursor.index = selectInfo.index;
                    this.record.cursor.groupId = selectInfo.groupId;
                }

                this.objTree = objTree;

            },

            getGroupObject: function ( id ) {

                return this.objTree.mapping[ id ].objGroup || null;

            },

            getCursorRecord: function () {

                return this.record.cursor || null;

            },

            // 仅更新光标的位置信息
            updateCursorIndex: function ( index ) {

                this.record.cursor.index = index;

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

            // 更新光标记录， 同时更新数据
            updateCursor: function ( group, index ) {

                var curStrGroup = this.objTree.mapping[ group.id ].strGroup,
                    resultStr = null,
                    isPlaceholder = !!curStrGroup.attr[ "data-placeholder" ],
                    startOffset = -1,
                    endOffset = -1;

                this.record.cursor = {
                    groupId: group.id,
                    startOffset: index,
                    endOffset: index
                };

                if ( !isPlaceholder ) {
                    curStrGroup.operand.splice( index, 0, CURSOR_CHAR );
                } else {
                    curStrGroup.operand.unshift( CURSOR_CHAR );
                    curStrGroup.operand.push( CURSOR_CHAR );
                    // 占位符的索引是固定的
                    this.record.cursor.startOffset = 1;
                    this.record.cursor.endOffset = 1;
                }

                // 返回结构树进过序列化后所对应的latex表达式， 同时包含有当前光标定位点信息
                resultStr = this.kfEditor.requestService( "parser.latex.serialization", this.objTree.parsedTree );

                if ( !isPlaceholder ) {

                    startOffset = resultStr.indexOf( CURSOR_CHAR );
                    endOffset = startOffset;
                    curStrGroup.operand.splice( index, 1 );

                } else {

                    startOffset = resultStr.indexOf( CURSOR_CHAR );
                    resultStr = resultStr.replace( CURSOR_CHAR, "" );
                    endOffset = resultStr.indexOf( CURSOR_CHAR );

                    curStrGroup.operand.shift();
                    curStrGroup.operand.pop();

                }

                return {
                    str: resultStr,
                    startOffset: startOffset,
                    endOffset: endOffset
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

            }

        });

    return SyntaxComponenet;

} );