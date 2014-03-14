/*!
 * 编辑器主体结构
 */

define( function ( require ) {

    var Assembly = require( "kf" ).Assembly,
        Parser = require( "parse/parser" ),
        Utils = require( "base/utils" ),
        kity = require( "kity" ),
        defaultOpt = {
            controller: {
                zoom: true,
                maxzoom: 5,
                minzoom: 0.5
            },
            formula: {

                fontsize: 50,
                autoresize: false
            }
        };

    var Editor = kity.createClass( 'Editor', {

        constructor: function ( container, opt ) {

            this.options = Utils.extend( true, {}, defaultOpt, opt );

            this.originContainer = container;
            this.assembly = createAssembly( container, this.options.formula );
            this.formula = this.assembly.formula;
            this.parser = createParser();

            // 数据
            this.currentStr = null;

            this.initController();

        },

        initController: function () {

            var _self = this,
                RESIZE_TIMER = null,
                formula = this.formula,
                controller = require( "editor/control/controller" );

            // 缩放控制
            if ( this.options.controller.zoom ) {
                controller.zoom( this.formula, this.options.controller );
            }

            // 重定位
            formula.node.ownerDocument.defaultView.onresize = function () {

                window.clearTimeout( RESIZE_TIMER );

                if ( !_self.currentStr ) {
                    return;
                }

                RESIZE_TIMER = window.setTimeout( function () {

                    _self.relocation();

                }, 100 );

            };

        },

        render: function ( latexStr ) {

            this.currentStr = latexStr;

            this.assembly.regenerateBy( this.parser.parse( latexStr ) );

            this.relocation();

        },

        relocation: function () {

            var formulaSpace = this.formula.container.getRenderBox(),
                viewPort = this.formula.getViewPort();

            viewPort.center.x = formulaSpace.width / 2;
            viewPort.center.y = formulaSpace.height / 2;

            this.formula.setViewPort( viewPort );

        }

    } );

    function createAssembly ( container, opt ) {
        return Assembly.use( container, opt );
    }

    function createParser () {
        return new Parser();
    }


    return Editor;

} );
