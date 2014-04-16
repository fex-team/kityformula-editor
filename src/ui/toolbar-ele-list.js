/*!
 * toolbar元素列表定义
 */

define( function ( require ) {

    var UI_ELE_TYPE = require( "ui/ui-impl/def/ele-type" ),
        BOX_TYPE = require( "ui/ui-impl/def/box-type" ),
        kity = require( "kity" );

    var config = [ {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "预设",
                icon: "assets/images/toolbar/button/pi.png"
            },
            box: {
                group: [ {
                    title: "预设公式",
                    items: [ {
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
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DELIMITER
    }, {
        type: UI_ELE_TYPE.AREA,
        options: {
            button: {
                icon: "assets/images/toolbar/char/button.png"
            },
            box: {
                width: 527,
                type: BOX_TYPE.OVERLAP,
                group: [ {
                    title: "基础数学",
                    items: [ {
                        title: "基础数学",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/pm.png">',
                                val: "\\pm"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/infty.png">',
                                val: "\\infty"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/eq.png">',
                                val: "="
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/sim.png">',
                                val: "\\sim"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/times.png">',
                                val: "\\times"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/div.png">',
                                val: "\\div"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/tanhao.png">',
                                val: "!"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/lt.png">',
                                val: "<"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/ll.png">',
                                val: "\\ll"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/gt.png">',
                                val: ">"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/gg.png">',
                                val: "\\gg"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/leq.png">',
                                val: "\\leq"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/geq.png">',
                                val: "\\geq"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/mp.png">',
                                val: "\\mp"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/simeq.png">',
                                val: "\\simeq"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/char/math/equiv.png">',
                                val: "\\equiv"
                            }
                        } ]
                    } ]
                }, {
                    title: "希腊字母",
                    items: []
                }, {
                    title: "求反关系运算符",
                    items: []
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
                width: 332,
                group: [ {
                    title: "分数",
                    items: [ {
                        title: "分数",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/frac/1.png">',
                                val: "\\frac \\placeholder\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/frac/2.png">',
                                val: "{\\placeholder/\\placeholder}"
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
                width: 332,
                group: [ {
                    title: "上标和下标",
                    items: [ {
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
                                val: "{^\\placeholder_\\placeholder\\placeholder}"
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
                width: 332,
                group: [ {
                    title: "根式",
                    items: [ {
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
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "积分",
                icon: "assets/images/toolbar/button/int.png"
            },
            box: {
                width: 332,
                group: [ {
                    title: "积分",
                    items: [ {
                        title: "积分",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/int/1.png">',
                                val: "\\int \\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/int/2.png">',
                                val: "\\int^\\placeholder_\\placeholder\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/int/3.png">',
                                val: "\\iint\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/int/4.png">',
                                val: "\\iint^\\placeholder_\\placeholder\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/int/5.png">',
                                val: "\\iiint\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/int/6.png">',
                                val: "\\iiint^\\placeholder_\\placeholder\\placeholder"
                            }
                        } ]
                    } ]
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "大型运算符",
                icon: "assets/images/toolbar/button/sum.png"
            },
            box: {
                width: 332,
                group: [ {
                    title: "求和",
                    items: [ {
                        title: "求和",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/large/1.png">',
                                val: "\\sum\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/large/2.png">',
                                val: "\\sum^\\placeholder_\\placeholder\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/large/3.png">',
                                val: "\\sum_\\placeholder\\placeholder"
                            }
                        } ]
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
                width: 332,
                group: [ {
                    title: "方括号",
                    items: [ {
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
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "函数",
                icon: "assets/images/toolbar/button/sin.png"
            },
            box: {
                width: 249,
                group: [ {
                    title: "函数",
                    items: [ {
                        title: "三角函数",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/func/1.png">',
                                val: "\\sin\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/2.png">',
                                val: "\\cos\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/3.png">',
                                val: "\\tan\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/4.png">',
                                val: "\\csc\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/5.png">',
                                val: "\\sec\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/6.png">',
                                val: "\\cot\\placeholder"
                            }
                        } ]
                    }, {
                        title: "常用函数",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/func/c1.png">',
                                val: "\\sin\\theta"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/c2.png">',
                                val: "\\sin{2x}"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/c3.png">',
                                val: "\\tan\\theta=\\frac {\\sin\\theta}{\\cos\\theta}"
                            }
                        } ]
                    } ]
                } ]
            }
        }
    }, {
        type: UI_ELE_TYPE.DRAPDOWN_BOX,
        options: {
            button: {
                label: "极限和对数",
                icon: "assets/images/toolbar/button/lim.png"
            },
            box: {
                width: 249,
                group: [ {
                    title: "函数",
                    items: [ {
                        title: "函数",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/func/1.png">',
                                val: "\\sin\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/2.png">',
                                val: "\\cos\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/3.png">',
                                val: "\\tan\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/4.png">',
                                val: "\\csc\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/5.png">',
                                val: "\\sec\\placeholder"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/6.png">',
                                val: "\\cot\\placeholder"
                            }
                        } ]
                    }, {
                        title: "常用函数",
                        content: [ {
                            item: {
                                show: '<img src="assets/images/toolbar/func/c1.png">',
                                val: "\\sin\\theta"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/c2.png">',
                                val: "\\sin{2x}"
                            }
                        }, {
                            item: {
                                show: '<img src="assets/images/toolbar/func/c3.png">',
                                val: "\\tan\\theta=\\frac {\\sin\\theta}{\\cos\\theta}"
                            }
                        } ]
                    } ]
                } ]
            }
        }
    } ];

    // 初始化希腊字符配置
    ( function () {

        var greekList = [ {
                title: "小写",
                values: [ "alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa", "lambda", "mu", "nu", "xi", "omicron", "pi", "rho", "sigma", "tau", "upsilon", "phi", "chi", "psi", "omega" ]
            }, {
                title: "大写",
                values: [ "Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "Mu", "Nu", "Xi", "Omicron", "Pi", "Rho", "Sigma", "Tau", "Upsilon", "Phi", "Chi", "Psi", "Omega" ]
            } ],
            greekConfigList = config[ 2 ].options.box.group[ 1 ].items;

        // 小写处理
        greekConfigList.push( {
            title: greekList[ 0 ].title,
            content: getContents( {
                path: "assets/images/toolbar/char/greek/lower/",
                values: greekList[ 0 ].values
            } )
        } );

        // 大写处理
        greekConfigList.push( {
            title: greekList[ 1 ].title,
            content: getContents( {
                path: "assets/images/toolbar/char/greek/upper/",
                values: greekList[ 1 ].values
            } )
        } );

    } )();

    // 初始化求反运算符
    ( function () {

        var greekList = [ {
                title: "求反关系运算符",
                values: [ "neq", "ncong", "nequiv", "nge", "ngt", "nin", "nle", "nlt", "nsim", "nsubseteq", "nsupseteq" ]
            } ],
            greekConfigList = config[ 2 ].options.box.group[ 2 ].items;

        greekConfigList.push( {
            title: greekList[ 0 ].title,
            content: getContents( {
                path: "assets/images/toolbar/char/not/",
                values: greekList[ 0 ].values
            } )
        } );

    } )();


    function getContents ( data ) {

        var result = [],
            path = data.path,
            values = data.values;

        kity.Utils.each( values, function ( value ) {

            result.push( {
                item: {
                    show: '<img src="' + path + value.toLowerCase() +'.png">',
                    val: "\\" + value
                }
            } );

        } );

        return result;

    }

    return config;

} );