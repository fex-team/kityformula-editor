/**
 * 占位符表达式， 扩展KF自有的Empty表达式
 */


define( function ( require, exports, module ) {

    var kity = require( "kity" ) ,

        kf = require( "kf" ),

        PlaceholderOperator = require( "kf-ext/operator/placeholder" );

    return kity.createClass( 'PlaceholderExpression', {

        base: kf.CompoundExpression,

        constructor: function () {

            this.callBase();

            this.setFlag( "Placeholder" );

            this.box.setAttr( "data-type", null );
            this.setOperator( new PlaceholderOperator() );

        },

        select: function () {

            this.getOperator().select();

        },

        selectAll: function () {

            this.getOperator().selectAll();

        },

        unselect: function () {
            this.getOperator().unselect();
        }

    } );

} );