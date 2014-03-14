/**
 * 占位符操作符
 */

define( function ( require, exports, modules ) {

    var kity = require( "kity" );

    return kity.createClass( 'PlaceholderOperator', {

        base: require( "kf" ).Operator,

        constructor: function () {

            this.callBase( "Placeholder" );

        },

        applyOperand: function () {

            this.setBoxSize( 17, 27 );
            this.addOperatorShape( generateOPShape() );

        }

    } );

    function generateOPShape () {

        var w = 13,
            h = 17,
            shape = null;

        shape =  new kity.Rect( w, h, 0, 0 ).stroke( "black" ).translate( 2, 6 );
        shape.setAttr( "stroke-dasharray", "2, 2" );

        return shape;

    }

} );