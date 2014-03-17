/**
 * Created by hn on 14-3-17.
 */

define( function ( require ) {

    var kity = require( "kity" ),

        Assembly = require( "kf" ).Assembly,

        DEFAULT_OPTIONS = {
            autoresize: false,
            fontsize: 30
        },

        RenderComponenet = kity.createClass( 'RenderComponent', {

            constructor: function ( kfEditor ) {

                this.kfEditor = kfEditor;
                this.assembly = null;
                this.formula = null;

                this.initCanvas();

                this.initServices();
                this.initCommands();

            },

            initCanvas: function () {

                var canvasContainer = this.kfEditor.requestService( "ui.get.canvas.container" );

                this.assembly = Assembly.use( canvasContainer, DEFAULT_OPTIONS );
                this.formula = this.assembly.formula;
                this.formula.node.setAttribute( "fill", "red" );

            },

            initServices: function () {

                this.kfEditor.registerService( "render.relocation", this, {
                    relocation: this.relocation
                } );

            },

            initCommands: function () {

                this.kfEditor.registerCommand( "render", this, COMMAND_LIST.render );

            },

            relocation: function () {

                var formulaSpace = this.formula.container.getRenderBox(),
                    viewPort = this.formula.getViewPort();

                viewPort.center.x = formulaSpace.width / 2;
                viewPort.center.y = formulaSpace.height / 2;

                this.formula.setViewPort( viewPort );

            }

        } ),

        COMMAND_LIST = {

            render: function ( latexStr ) {

                var parsedTree = this.kfEditor.requestService( "parser.parse", latexStr );

                this.assembly.regenerateBy( parsedTree );

                this.relocation();

            }

        };

    return RenderComponenet;

} );