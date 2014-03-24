/*!
 * 编辑器主体结构
 */

define( function ( require ) {

    var kity = require( "kity" ),
        Utils = require( "base/utils" ),
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

    var COMPONENTS = {};

    var KFEditor = kity.createClass( 'KFEditor', {

        constructor: function ( container, opt ) {

            this.options = Utils.extend( true, {}, defaultOpt, opt );

            this.container = container;
            this.services = {};
            this.commands = {};

            this.initComponents();

        },

        getContainer: function () {
            return this.container;
        },

        getOptions: function () {
            return this.options;
        },

        initComponents: function () {

            var _self = this;

            Utils.each( COMPONENTS, function ( component ) {

                new component( _self );

            } );

        },

        requestService: function ( serviceName, args ) {

            var serviceObject =  getService.call( this, serviceName );

            return serviceObject.service[ serviceObject.key ].apply( serviceObject.provider, [].slice.call( arguments, 1 ) );

        },

        request: function ( serviceName ) {

            var serviceObject = getService.call( this, serviceName );

            return serviceObject.service;

        },

        registerService: function ( serviceName, provider, serviceObject ) {

            var key = null;

            for ( key in serviceObject ) {

                if ( serviceObject[ key ] && serviceObject.hasOwnProperty( key ) ) {
                    serviceObject[ key ] = Utils.proxy( serviceObject[ key ], provider );
                }

            }

            this.services[ serviceName ] = {
                provider: provider,
                key: key,
                service: serviceObject
            };

        },

        registerCommand: function ( commandName, executor, execFn ) {

            this.commands[ commandName ] = {
                executor: executor,
                execFn: execFn
            };

        },

        execCommand: function ( commandName, args ) {

            var commandObject =  this.commands[ commandName ];

            if ( !commandObject ) {
                throw new Error( 'KFEditor: not found command, ' + commandName );
            }

            return commandObject.execFn.apply( commandObject.executor, [].slice.call( arguments, 1 ) );

        }

    } );

    function getService ( serviceName ) {

        var serviceObject =  this.services[ serviceName ];

        if ( !serviceObject ) {
            throw new Error( 'KFEditor: not found service, ' + serviceName );
        }

        return serviceObject;

    }

    Utils.extend( KFEditor, {

        registerComponents: function ( name, component ) {

            COMPONENTS[ name ] = component;

        }

    } );


    return KFEditor;

} );
