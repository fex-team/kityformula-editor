/*!
 * 滚动条组件
 */

define( function ( require ) {

    var kity = require( "kity" ),
        SCROLLBAR_DEF = require( "ui/def" ).scrollbar,
        Utils = require( "base/utils" ),
        CLASS_PREFIX = "kf-editor-ui-";

    return kity.createClass( "Scrollbar", {

        constructor: function ( uiComponent, kfEditor ) {

            this.uiComponent = uiComponent;
            this.kfEditor = kfEditor;

            this.widgets = null;
            this.container = this.uiComponent.scrollbarContainer;

            // 显示状态
            this.state = false;

            // 滚动条当前各个状态下的值
            this.values = {
                // 滚动条此时实际的偏移值, 计算的时候假定滑块的宽度为0
                offset: 0,
                // 滑块此时偏移的百分比, 计算的时候假定滑块的宽度为0
                left: 0,
                // 滚动条控制的容器的可见宽度
                viewWidth: 0,
                // 滚动条对应的内容实际宽度
                contentWidth: 0,
                // 轨道长度
                trackWidth: 0,
                // 滑块宽度
                thumbWidth: 0
            };

            this.initWidget();
            this.mountWidget();
            this.initSize();

            this.hide();
            this.initServices();
            this.initEvent();

        },

        initWidget: function () {

            var doc = this.container.ownerDocument;

            this.widgets = {
                leftButton: createElement( doc, "div", "left-button" ),
                rightButton: createElement( doc, "div", "right-button" ),
                track: createElement( doc, "div", "track" ),
                thumb: createElement( doc, "div", "thumb" )
            };

        },

        initSize: function () {

            var leftBtnWidth = getRect( this.widgets.leftButton ).width,
                rightBtnWidth = getRect( this.widgets.rightButton ).width;

            this.values.viewWidth = getRect( this.container ).width;
            this.values.trackWidth = this.values.viewWidth - leftBtnWidth - rightBtnWidth;

            this.widgets.track.style.width = this.values.trackWidth + "px";

        },

        initServices: function () {

            this.kfEditor.registerService( "ui.show.scrollbar", this, {
                showScrollbar: this.show
            } );

            this.kfEditor.registerService( "ui.hide.scrollbar", this, {
                hideScrollbar: this.hide
            } );

            this.kfEditor.registerService( "ui.update.scrollbar", this, {
                updateScrollbar: this.update
            } );

        },

        initEvent: function () {

            preventDefault( this );
            trackClick( this );
            thumbHandler( this );

        },

        mountWidget: function () {

            var widgets = this.widgets,
                container = this.container;

            for ( var wgtName in widgets ) {
                container.appendChild( widgets[ wgtName ] );
            }

            widgets.track.appendChild( widgets.thumb );

        },

        show: function () {
//            this.state = true;
//            this.container.style.display = "block";
        },

        hide: function () {
            this.state = false;
            this.container.style.display = "none";
        },

        update: function ( contentWidth ) {

            var trackWidth = this.values.trackWidth,
                scale = trackWidth / contentWidth,
                thumbWidth = 0;

            this.values.contentWidth = contentWidth;

            if ( trackWidth >= contentWidth ) {
                this.hide();
                return;
            }

            thumbWidth = Math.max( Math.ceil( trackWidth * scale ), SCROLLBAR_DEF.thumbMinSize );

            this.values.thumbWidth = thumbWidth;
            this.widgets.thumb.style.width = thumbWidth + "px";

        }

    } );

    function createElement ( doc, eleName, className ) {

        var node = doc.createElement( eleName );
        node.className = CLASS_PREFIX + className;

        return node;

    }

    function getRect ( node ) {
        return node.getBoundingClientRect();
    }

    // 阻止浏览器在scrollbar上的默认行为
    function preventDefault ( container ) {

        Utils.addEvent( container, "mousedown", function ( e ) {
            e.preventDefault();
        } );

    }

    function preventDefault ( comp ) {

        Utils.addEvent( comp.container, "mousedown", function ( e ) {
            e.preventDefault();
        } );

    }

    // 轨道点击
    function trackClick ( comp ) {

        Utils.addEvent( comp.widgets.track, "mousedown", function ( e ) {
            trackClickHandler( this, comp, e );
        } );

    }

    // 滑块处理
    function thumbHandler ( comp ) {

        var isMoving = false,
            startPoint = 0;

        Utils.addEvent( comp.widgets.thumb, "mousedown", function ( e ) {

            e.preventDefault();
            e.stopPropagation();

            isMoving = true;
            startPoint = e.clientX;

        } );

        Utils.addEvent( comp.container.ownerDocument, "mouseup", function ( e ) {

            isMoving = false;
            startPoint = 0;

        } );

        Utils.addEvent( comp.container.ownerDocument, "mousemove", function ( e ) {

            if ( !isMoving ) {
                return;
            }

            var diff = e.clientX - startPoint;


        } );

    }

    // 轨道点击处理器
    function trackClickHandler ( track, comp, evt ) {

        var trackRect = getRect( track ),
            values = comp.values,
            // 单位偏移值， 一个viewWidth所对应到轨道上后的offset值
            unitOffset = values.viewWidth / values.contentWidth * values.trackWidth,
            // 点击位置在轨道中的偏移
            clickOffset = evt.clientX - trackRect.left;

        // right click
        if ( clickOffset > values.offset ) {

            // 剩余距离已经不足以支撑滚动， 则直接偏移置最大
            if ( values.offset + unitOffset > values.trackWidth ) {
                setThumbOffset( comp, values.trackWidth );
            } else {
                setThumbOffset( comp, values.offset + unitOffset );
            }

        // left click
        } else {

            // 剩余距离已经不足以支撑滚动， 则直接把偏移置零
            if ( values.offset - unitOffset < 0 ) {
                setThumbOffset( comp, 0 );
            } else {
                setThumbOffset( comp, values.offset - unitOffset );
            }

        }

    }


    // 设置滑块位置, 会修正滑块在显示上的定位， 但不影响取值
    function setThumbOffset ( comp, offset ) {

        var values = comp.values;

        values.offset = offset;
        values.left = offset / values.trackWidth * 100;

        // 修正定位
        if ( offset + values.thumbWidth > values.trackWidth ) {
            offset = values.trackWidth - values.thumbWidth;
        }

        comp.widgets.thumb.style.left = offset + "px";

    }

} );
