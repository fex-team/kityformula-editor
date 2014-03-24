/**
 * Created by hn on 14-3-19.
 */

( function () {

    var c = {
        start: function ( editor ) {
            kfEditor = editor;

            inp = document.getElementById( "hiddenInput" );

            initClick();
        }
    },
    inp = null,
    lastCount = -1,
    cursorIndex = -1,
    kfEditor = null;

    // init click
    function initClick  () {

        inp.focus();
        var evt = kfEditor.request( "ui.canvas.container.event" );

        evt.on( "click", function ( e ) {

            cursorIndex = 0;

            var target = e.target,
                group = kfEditor.requestService( "position.get.group", target );

            if ( group ) {
                kfEditor.requestService( "render.select.group", group );
                var result = kfEditor.requestService( "syntax.update.cursor", group, cursorIndex );
                inp.value = result.str;
                inp.startOffset = result.startOffset;
                inp.endOffset = result.endOffset;
                lastCount = result.str.length;
                inp.selectionStart = result.startOffset;
                inp.selectionEnd = result.endOffset;
                inp.focus();
            } else {
                kfEditor.requestService( "render.clear.select" );
            }

        } );

        evt.on( "dblclick", function ( e ) {

            var target = e.target,
                group = kfEditor.requestService( "position.get.parent.group", target );

            if ( group ) {
                kfEditor.requestService( "render.select.group.all", group );
                var result = kfEditor.requestService( "syntax.update.selection", group );
                inp.value = result.str;
                inp.startOffset = result.startOffset;
                inp.endOffset = result.endOffset;
                lastCount = result.str.length;
                inp.selectionStart = result.startOffset;
                inp.selectionEnd = result.endOffset;
                inp.focus();
            } else {
                kfEditor.requestService( "render.clear.select" );
            }

        } );

        inp.oninput = function ( e ) {

            cursorIndex += inp.value.length - lastCount;
            kfEditor.requestService( "render.draw", inp.value );
            kfEditor.requestService( "render.reselect" );


        };

    }

    window.c = c;

} )();