/*!
 * 输入控制组件
 */

define( function ( require, exports, module ) {

    var kity = require( "kity" ),
        kfUtils = require( "base/utils" ),
        KEY_CODE = {
            LEFT: 37,
            RIGHT: 39
        };

    return kity.createClass( "InputComponent", {

        constructor: function ( parentComponent, kfEditor ) {

            this.parentComponent = parentComponent;
            this.kfEditor = kfEditor;

            this.inputBox = this.createInputBox();

            this.initServices();

            this.focus();

            this.initEvent();

        },

        initServices: function () {

            this.kfEditor.registerService( "control.update.input", this, {
                updateInput: this.updateInput
            } );

        },

        createInputBox: function () {

            var editorContainer = this.kfEditor.getContainer(),
                box = this.kfEditor.getDocument().createElement( "input" );

            box.className = "kf-editor-input-box";
            box.type = "text";

            editorContainer.appendChild( box );

            return box;

        },

        updateInput: function () {

            var latexInfo = this.kfEditor.requestService( "syntax.serialization" );

            this.inputBox.value = latexInfo.str;
            this.inputBox.selectionStart = latexInfo.startOffset;
            this.inputBox.selectionEnd = latexInfo.endOffset;
            this.inputBox.focus();

        },

        focus: function () {
            this.inputBox.focus();
        },

        initEvent: function () {

            var _self = this;

            kfUtils.addEvent( this.inputBox, "keydown", function ( e ) {

                switch ( e.keyCode ) {

                    case KEY_CODE.LEFT:
                        e.preventDefault();
                        _self.leftMove();
                        break;

                    case KEY_CODE.RIGHT:
                        e.preventDefault();
                        _self.rightMove();
                        break;

                }

            } );

            // 用户输入
            kfUtils.addEvent( this.inputBox, "input", function ( e ) {



            } );

        },

        leftMove: function () {

            this.kfEditor.requestService( "syntax.cursor.move.left" );
            this.update();

        },

        rightMove: function () {

            this.kfEditor.requestService( "syntax.cursor.move.right" );
            this.update();

        },

        update: function () {

            this.kfEditor.requestService( "render.clear.select" );
            // 更新输入框
            this.updateInput();
            // 重定位光标
            this.kfEditor.requestService( "control.cursor.relocation" );
            // 着色
            this.kfEditor.requestService( "render.tint.current.cursor" );

        }

    } );

} );