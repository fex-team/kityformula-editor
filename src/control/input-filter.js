/*!
 * 输入过滤器
 */

define( function ( require ) {

    // 过滤列表， 其中的key对应于键盘事件的keycode， 带有s+字样的key，匹配的是shift+keycode
    var LIST = {
        32: "\\,",
        "s+219": "\\{",
        "s+221": "\\}",
        "220": "\\backslash"
    };

    return {

        getReplaceString: function ( key ) {
            return LIST[ key ] || null;
        }

    };

} );