/**
 * Created by hn on 14-4-1.
 */

define( function ( require ) {

    var $ = require( "jquery" ),
        kity = require( "kity" ),
        TOPIC_POOL = {};

    return {

        ele: function ( doc, name, options ) {

            var node = null;

            if ( name === "text" ) {
                return doc.createTextNode( options );
            }

            node =  doc.createElement( name );
            options.className && ( node.className = options.className );

            if ( options.content ) {
                node.innerHTML = options.content;
            }
            return node;
        },

        on: function ( target, type, fn ) {
            $( target ).on( type, fn );
            return this;
        },

        delegate: function ( target, selector, type, fn ) {

            $( target ).delegate( selector, type, fn );
            return this;

        },

        publish: function ( topic, args ) {

            var callbackList = TOPIC_POOL[ topic ];

            if ( !callbackList ) {
                return;
            }

            args = [].slice.call( arguments, 1 );

            kity.Utils.each( callbackList, function ( callback ) {

                callback.apply( null, args );

            } );

        },

        subscribe: function ( topic, callback ) {

            if ( !TOPIC_POOL[ topic ] ) {

                TOPIC_POOL[ topic ] = [];

            }

            TOPIC_POOL[ topic ].push( callback );

        }

    };

} );