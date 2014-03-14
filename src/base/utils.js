/*!
 * 基础工具包
 */

define( function ( require ) {

    // copy保护
    var MAX_COPY_DEEP = 10;

    var Utils = {

        extend: function ( target, source ) {

            var isDeep = false;

            if ( typeof target === "boolean" ) {
                isDeep = target;
                target = source;
                source = [].splice.call( arguments, 2 );
            } else {
                source = [].splice.call( arguments, 1 );
            }

            if ( !target ) {
                throw new Error( 'Utils: extend, target can not be empty' );
            }

            Utils.each( source, function ( src ) {

                if ( src && typeof src === "object" || typeof src === "function" ) {

                    copy( isDeep, target, src );

                }

            } );

            return target;

        },

        isArray: function ( obj ) {
            return obj && ({}).toString.call( obj ) === "[object Array]";
        },

        isString: function ( obj ) {
            return typeof obj === "string";
        },

        each: function ( obj, fn ) {

            if ( !obj ) {
                return;
            }

            if ( obj.forEach ) {

                obj.forEach( fn );

            } else {

                if ( 'length' in obj && typeof obj.length === "number" ) {

                    for ( var i = 0, len = obj.length; i < len; i++ ) {
                        fn.call( null, obj[ i ], i, obj );
                    }

                } else {

                    for ( var key in obj ) {

                        if ( obj.hasOwnProperty( key ) ) {
                            fn.call( null, obj[ key ], key, obj );
                        }

                    }

                }
            }

        }

    };

    function copy ( isDeep, target, source, count ) {

        count = count | 0;

        if ( count > MAX_COPY_DEEP ) {
            return source;
        }

        count++;

        Utils.each( source, function ( value, index, origin ) {

            if ( isDeep ) {

                if ( !value || ( typeof value !== "object" && typeof value !== "function" ) ) {
                    target[ index ] = value;
                } else {
                    target[ index ] = target[ index ] || ( Utils.isArray( value ) ? [] : {} );
                    target[ index ] = copy( isDeep, target[ index ], value, count );
                }

            } else {
                target[ index ] = value;
            }

        } );

        return target;

    }

    return Utils;

} );
