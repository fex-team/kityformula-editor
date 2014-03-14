/**
 * 模块暴露
 */

( function ( global ) {

    define( 'kf.start', function ( require ) {

        var KFEditor = require( "editor/editor" );

        // 注册parser组件
        KFEditor.registerComponents( "parser", require( "parse/parser" ) );

    } );

    // build环境中才含有use
    try {
        use( 'kf.start' );
    } catch ( e ) {
    }

} )( this );
