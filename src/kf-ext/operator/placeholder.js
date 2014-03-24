/**
 * 占位符操作符
 */

define( function ( require, exports, modules ) {

    var kity = require( "kity" ),
        SELECT_COLOR = require( "kf-ext/def" ).selectColor,
        ALL_SELECT_COLOR = require( "kf-ext/def" ).allSelectColor;

    return kity.createClass( 'PlaceholderOperator', {

        base: require( "kf" ).Operator,

        constructor: function () {

            this.opShape = null;
            this.callBase( "Placeholder" );

        },

        applyOperand: function () {

            this.setBoxSize( 17, 27 );
            this.opShape = generateOPShape();
            this.addOperatorShape( this.opShape );

        },

        select: function () {

            this.opShape.fill( SELECT_COLOR );

        },

        selectAll: function () {

            this.opShape.fill( ALL_SELECT_COLOR );

        },

        unselect: function () {

            this.opShape.fill( "transparent" );

        }

    } );

    function generateOPShape () {

        var w = 13,
            h = 17,
            shape = null;

        shape =  new kity.Rect( w, h, 0, 0 ).stroke( "black" ).fill( "transparent" ).translate( 2, 6 );
        shape.setAttr( "stroke-dasharray", "1, 2" );

        return shape;

    }

} );