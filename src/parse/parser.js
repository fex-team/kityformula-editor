/**
 * 数学公式解析器
 */

define( function ( require ) {

    var KFParser = require( "kf" ).Parser,
        kity = require( "kity" ),
        COMPARISON_TABLE = require( "parse/def" ),
        PID_PREFIX = "_kf_editor_",
        GROUP_TYPE = "kf-editor-group",
        PID = 0;

    var Parser = kity.createClass( "Parser", {

        constructor: function ( kfEditor ) {

            this.kfEditor = kfEditor;

            this.callBase();
            // kityformula 解析器
            this.kfParser = KFParser.use( "latex" );

            this.initKFormulExtension();

            this.pid = generateId();
            this.groupRecord = 0;

            this.tree = null;

            this.initServices();

        },

        parse: function ( str ) {

            var parsedResult = this.kfParser.parse( str );

            this.resetGroupId();
            // 对解析出来的结果树做适当的处理，使得编辑器能够更容易地识别当前表达式的语义
            this.updateTree( parsedResult.tree );

            return parsedResult;

        },

        initServices: function () {

            this.kfEditor.registerService( "parser.parse", this, {
                parse: this.parse
            } );

        },

        // 初始化KF扩展
        initKFormulExtension: function () {
            require( "kf-ext/extension" ).ext();
        },

        resetGroupId: function () {
            this.groupRecord = 0;
        },

        getGroupId: function () {
            return this.pid + "_" + ( ++this.groupRecord );
        },

        updateTree: function ( tree ) {

            this.tree = parseToTree( this, tree );

        }

    } );

    // 把解析树解析成公式编辑器的语义树
    function parseToTree ( parser, tree ) {

        var sTree = [],
            currentOperand = null;

        tree.attr = tree.attr || {};

        tree.attr.id = parser.getGroupId();
        tree.attr[ "data-type" ] = GROUP_TYPE;

        for ( var i = 0, len= tree.operand.length; i < len; i++ ) {

            currentOperand = tree.operand[ i ];

            // 占位符替换
            if ( currentOperand === null && COMPARISON_TABLE[ tree.name ] ) {

                tree.operand[ i ] = {
                    name: "placeholder",
                    operand: [],
                    attr: {
                        id: parser.getGroupId(),
                        "data-type": GROUP_TYPE
                    }
                };

                continue;
            }

            if ( typeof currentOperand === "string" ) {
                sTree.push( currentOperand );
            } else {

                if ( currentOperand && COMPARISON_TABLE[ currentOperand.name ] ) {
                    sTree.push( parseToTree( parser, currentOperand ) );
                } else {
                    sTree.push( currentOperand );
                }

            }

        }

        return sTree;

    }

    function generateId () {
        return PID_PREFIX + ( ++PID );
    }

    return Parser;

} );

