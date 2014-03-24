/*!
 * 工具条组件
 */

define( function ( require ) {

    var kity = require( "kity" ),

        DEFAULT_OPTIONS = {

        },

        Tollbar = kity.createClass( "Tollbar", {

            constructor: function ( kfEditor, uiComponent ) {

                this.kfEditor = kfEditor;
                this.uiComponent = uiComponent;

            }

        } );

    return Tollbar;

} );