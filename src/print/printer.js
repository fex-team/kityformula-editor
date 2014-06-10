/*!
 * 打印服务
 */

define( function ( require ) {

    var kity = require( "kity" ),
        canvg = require( "canvg/canvg" );

    return kity.createClass( "Printer", {

        constructor: function ( kfEditor ) {

            this.kfEditor = kfEditor;

            this.initServices();

            this.initCommands();

        },

        initServices: function () {

            this.kfEditor.registerService( "print.image", this, {
                printImage: this.printImage
            } );

        },

        initCommands: function () {

            this.kfEditor.registerCommand( "get.image.data", this, this.getImageData );

        },

        printImage: function ( type ) {

            var dataUrl = this.getBase64DataUrl();

            window.open( dataUrl );

        },

        getImageData: function () {

            var canvasData = this.getFormatCanvasData();

            return {
                width: canvasData.width,
                height: canvasData.height,
                img: getBase64DataURL( canvasData, arguments[ 0 ] )
            };

        },

        /**
         * 获取base64编码的dataurl， 可以根据参数指定生产的图片类型， 默认为png
         * @param type 图片类型， 支持： jpg, png, gif
         * @returns {*}
         */
        getBase64DataUrl: function () {

            var canvasData = this.getFormatCanvasData();

            return getBase64DataURL( canvasData, arguments[ 0 ] );

        },

        /**
         * 获取当前公式的dataurl地址
         * @returns {string} image/svg+xml格式的dataurl地址
         */
        getDataUrl: function () {

            return getSVGDataURL( this.getFormatCanvasData() );

        },

        getFormatCanvasData: function () {

            var canvas = null,
                contentSpace = null,
                canvasCopiesNode = null;

            this.kfEditor.requestService( "render.clear.canvas.transform" );
            this.kfEditor.requestService( "control.cursor.hide" );
            this.kfEditor.requestService( "render.clear.select" );

            canvas = this.kfEditor.requestService( "render.get.canvas" );
            canvasCopiesNode = canvas.node.cloneNode( true );

            contentSpace = canvas.container.getRenderBox();
            canvasCopiesNode.setAttribute( "width", contentSpace.width );
            canvasCopiesNode.setAttribute( "height", contentSpace.height );

            this.kfEditor.requestService( "render.revert.canvas.transform" );
            this.kfEditor.requestService( "control.cursor.relocation" );
            this.kfEditor.requestService( "render.reselect" );

            return {
                width: Math.floor( contentSpace.width ),
                height: Math.floor( contentSpace.height ),
                content: getOuterHTML( canvasCopiesNode ).replace( '"<"', '"&#x3c;"' )
            };

        }

    } );

    function getBase64DataURL ( data, tyep ) {

        var canvas = document.createElement( "canvas" ),
            ctx = canvas.getContext( "2d" ),
            type = getImageType( tyep );

        canvas.width = data.width;
        canvas.height = data.height;


        if ( type !== "image/png" ) {
            ctx.fillStyle = "white";
            ctx.fillRect( 0, 0, canvas.width, canvas.height );
        }

        if ( isSafari() ) {
            canvg( canvas, data.content );
        } else {
            var image = new Image();
            image.src = getSVGDataURL( data );
            ctx.drawImage( image, 0, 0 );
        }

        return canvas.toDataURL( type );

    }

    function getSVGDataURL ( data ) {
        return "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent( data.content )));
    }

    function getImageType ( type ) {

        switch ( type ) {

            case "jpg":
            case "jpeg":
                return "image/jpeg";

            default:
                return "image/png";

        }

    }

    function getOuterHTML ( node ) {

        var container = node.ownerDocument.createElement( "div" );

        container.appendChild( node.cloneNode( true ) );

        return container.innerHTML;

    }

    function isSafari () {
        var userAgent = window.navigator.userAgent;
        return userAgent.indexOf( "Safari" ) !== -1 && userAgent.indexOf( "Chrome" ) === -1;
    }

} );


