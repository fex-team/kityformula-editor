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
                icon: "assets/images/toolbar/button/pi.png"
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
                        item: {
                            show: '<img src="assets/images/toolbar/ys/2.png">',
                            val: "{\\left(x+a\\right)}^2=\\sum^n_{k=0}{\\left(^n_k\\right)x^ka^{n-k}}"
                        }
                    }, {
                        label: "勾股定理",
                        item: {
                            show: '<img src="assets/images/toolbar/ys/3.png">',
                            val: "a^2+b^2=c^2"
                        }
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
                icon: "assets/images/toolbar/button/frac.png"
            },
            box: {
                width: 378,
                group: [ {
                    title: "分数",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/1.png">',
                            val: "\\frac \\placeholder\\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/2.png">',
                            val: "\\placeholder/\\placeholder"
                        }
                    } ]
                }, {
                    title: "常用分数",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/frac/c1.png">',
                            val: "\\frac {dy}{dx}"
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
                label: "上下标",
                icon: "assets/images/toolbar/button/script.png"
            },
            box: {
                width: 378,
                group: [ {
                    title: "上标和下标",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/script/1.png">',
                            val: "\\placeholder^\\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/script/2.png">',
                            val: "\\placeholder_\\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/script/3.png">',
                            val: "\\placeholder^\\placeholder_\\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/script/4.png">',
                            val: "^\\placeholder_\\placeholder\\placeholder"
                        }
                    } ]
                }, {
                    title: "常用的上标和下标",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/script/c1.png">',
                            val: "e^{-i\\omega t}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/script/c2.png">',
                            val: "x^2"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/script/c3.png">',
                            val: "^n_1Y"
                        }
                    } ]
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "根式",
                icon: "assets/images/toolbar/button/sqrt.png"
            },
            box: {
                width: 378,
                group: [ {
                    title: "根式",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/1.png">',
                            val: "\\sqrt \\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/2.png">',
                            val: "\\sqrt [\\placeholder] \\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/3.png">',
                            val: "\\sqrt [2] \\placeholder"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/4.png">',
                            val: "\\sqrt [3] \\placeholder"
                        }
                    } ]
                }, {
                    title: "常用根式",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/c1.png">',
                            val: "\\frac {-b\\pm\\sqrt{b^2-4ac}}{2a}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/sqrt/c2.png">',
                            val: "\\sqrt {a^2+b^2}"
                        }
                    } ]
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "括号",
                icon: "assets/images/toolbar/button/brackets.png"
            },
            box: {
                width: 378,
                group: [ {
                    title: "方括号",
                    content: [ {
                        item: {
                            show: '<img src="assets/images/toolbar/brackets/1.png">',
                            val: "\\left(\\placeholder\\right)"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/brackets/2.png">',
                            val: "\\left[\\placeholder\\right]"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/brackets/3.png">',
                            val: "\\left\\{\\placeholder\\right\\}"
                        }
                    }, {
                        item: {
                            show: '<img src="assets/images/toolbar/brackets/4.png">',
                            val: "\\left|\\placeholder\\right|"
                        }
                    } ]
                } ]
            }
        }
    } ];

} );