/**
 * 编辑器编辑区的缩放控制
 */

define( function ( require ) {

    var defaultOption = {
            step: 0.05,
            min: 0.5,
            max: 5
        },
        Utils = require( "base/utils" );

    function zoomController ( formula, opt ) {

        opt = Utils.extend( {}, defaultOption, opt );

        formula.on( "mousewheel", function ( e ) {

            e = e.originEvent;

            if ( e.wheelDelta > 0 ) {
                // 放大
                enlargeView( formula, opt );
            } else {
                // 缩小
                narrowView( formula, opt );
            }

        } );

    }

    function enlargeView ( formula, opt ) {
        updateViewZoom( formula, 1 + opt.step, opt.min, opt.max );
    }

    function narrowView ( formula, opt ) {
        updateViewZoom( formula, 1 - opt.step, opt.min, opt.max );
    }

    function updateViewZoom ( formula, zoom, min, max ) {

        var viewPort = formula.getViewPort();

        zoom = viewPort.zoom * zoom;

        if ( zoom < min || zoom > max ) {
            return false;
        }

        viewPort.zoom = zoom;

        formula.setViewPort( viewPort );

    }

    return zoomController;

} );
