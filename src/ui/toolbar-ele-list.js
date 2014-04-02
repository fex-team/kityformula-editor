/*!
 * toolbar元素列表定义
 */

define( function ( require ) {

    var UI_ELE_TYPE = require( "ui/ui-impl/def/ele-type" );

    return [ {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "预设",
                icon: "assets/images/toolbar/pi.png"
            },
            box: {
//                width: 400,
                group: [ {
                    title: "预设公式",
                    content: [ {
                        label: "二次公式",
                        item: {
                            show: '<img src="assets/images/toolbar/ys/1.png">',
                            val: "x=\\frac {-b\\pm\\sqrt {b^2-4ac}}{2a}"
                        }
                    }, {
                        label: "二项式定理",
                        item: "nihao"
                    } ]
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DELIMITER
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "分数",
                icon: "assets/images/toolbar/pi.png"
            },
            box: {
                width: 332,
                group: [ {
                    title: "分数",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/1.png">',
                            val: "\\frac {\\placeholder}{\\placeholder}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/2.png">',
                            val: "{\\placeholder} / {\\placeholder}"
                        }
                    } ]
                }, {
                    title: "常用分数",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/c1.png">',
                            val: "\\frac {dx}{dy}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/c2.png">',
                            val: "\\frac {\\Delta y}{\\Delta x}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/c4.png">',
                            val: "\\frac {\\delta y}{\\delta x}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/c5.png">',
                            val: "\\frac \\pi 2"
                        }
                    } ]
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "分数",
                icon: "assets/images/toolbar/pi.png"
            },
            box: {
                width: 332,
                group: [ {
                    title: "分数",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/1.png">',
                            val: "\\frac {\\placeholder}{\\placeholder}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/2.png">',
                            val: "{\\placeholder} / {\\placeholder}"
                        }
                    } ]
                }, {
                    title: "常用分数",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/c1.png">',
                            val: "\\frac {dx}{dy}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/c2.png">',
                            val: "\\frac {\\Delta y}{\\Delta x}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/c4.png">',
                            val: "\\frac {\\delta y}{\\delta x}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/c5.png">',
                            val: "\\frac \\pi 2"
                        }
                    } ]
                } ]
            }
        }
    } ];

} );