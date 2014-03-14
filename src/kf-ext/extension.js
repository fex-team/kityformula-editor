/**
 * 公式扩展接口
 */

define( function ( require ) {

    var kf = require( "kf" );

    function ext () {

        kf.PlaceholderExpression = require( "kf-ext/expression/placeholder" );

    }

    return {
        ext: ext
    };

} );
