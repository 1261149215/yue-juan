// import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

// 从sessionStorage中获取token
const getToken = function getToken() {
    // return Cookies.get(TokenKey)
    return sessionStorage.getItem(TokenKey)
}

// 给sessionStorage设置token
const setToken = function setToken(token) {
    // return Cookies.set(TokenKey, token)
    return sessionStorage.setItem(TokenKey, token)
}

// 从sessionStorage移除token
const removeToken = function removeToken() {
    // return Cookies.remove(TokenKey)
    return sessionStorage.removeItem(TokenKey)
}

// 深拷贝，对数组，对象进行深复制
const deepCopy = function(obj) {
        if (obj === null) {
            return null
        }
        if (Array.isArray(obj)) {
            // 如果是数组
            const myArray = []
            for (let i = 0; i < obj.length; i++) {
                myArray.push(deepCopy(obj[i]))
            }
            return myArray
        } else if (typeof(obj) === 'object') {
            // 如果是对象
            const myObject = {}
            for (let key in obj) {
                myObject[key] = deepCopy(obj[key])
            }
            return myObject
        }
        return obj
    }
    // 判断两个对象是否相等。
const diff = function diff(obj1, obj2) {
        var o1 = obj1 instanceof Object
        var o2 = obj2 instanceof Object
        if (!o1 || !o2) {
            /*  判断不是对象  */
            return obj1 === obj2
        }
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false
                // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
        }

        for (var attr in obj1) {
            var t1 = obj1[attr] instanceof Object
            var t2 = obj2[attr] instanceof Object
            if (t1 && t2) {
                return diff(obj1[attr], obj2[attr])
            } else if (obj1[attr] !== obj2[attr]) {
                return false
            }
        }
        return true
    }
    //获取屏幕的宽高
const getclient = function() {
    let winWidth
    let winHeight
    if (window.innerWidth) {
        winWidth = window.innerWidth
    } else if ((document.body) && (document.body.clientWidth)) {
        winWidth = document.body.clientWidth
    }
    // 获取窗口高度
    if (window.innerHeight) {
        winHeight = window.innerHeight
    } else if ((document.body) && (document.body.clientHeight)) {
        winHeight = document.body.clientHeight
    }
    // 通过深入 Document 内部对 body 进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight
        winWidth = document.documentElement.clientWidth
    }
    let a = {
        winWidth: winWidth,
        winHeight: winHeight
    }
    return a
}

const prefix = function(num, val) {
    return (new Array(num).join('0') + val).slice(-num);
}

// Blob 文件下载
const downloadBlobFile = function downloadBlobFile(response) {

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // IE 模式
            window.navigator.msSaveOrOpenBlob(new Blob([response.data]), response.headers.name)
        } else {
            // NOE-IE 模式
            let url = window.URL.createObjectURL(new Blob([response.data]))

            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', decodeURI(response.headers.name))
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
        }
    }
    // 去除字符串两边的空格
const trim = function(str) {
        return str.replace(/^\s*|\s*$/g, "");
    }
    // 格式化时间 
    // fmt: 时间格式
    // dat: 时间值
const dateFtt = function(fmt, dat) {
        dat = dat.replace(/\-/g, "/");
        let date = new Date(dat)
        let o = {
            "M+": date.getMonth() + 1, //月份   
            "d+": date.getDate(), //日   
            "h+": date.getHours(), //小时   
            "m+": date.getMinutes(), //分   
            "s+": date.getSeconds(), //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    // 调用：TableHover($('.table-container table td'));
const TableHover = function($table) {
        $table.mouseenter(function(event) {
            var xIdx = 0,
                yIdx = 0;
            $table.each(function(index, el) {
                $(this).removeClass('hover');
            });

            $(this).addClass('hover').siblings().removeClass('hover');
            $table.each(function(index, el) {
                if ($(this).hasClass('hover')) {
                    xIdx = $(this).index();
                    yIdx = $(this).parent().index();
                }
            });
            if (xIdx > 0) {
                // for (var i = 0; i < xIdx; i++) {
                //     $(this).parent().children().eq(i).addClass('hover');
                // }
                // for (var i = 0; i < yIdx; i++) {
                //     $(this).parent().parent().children().eq(i).children().eq(xIdx).addClass('hover');
                // }
                $(this).parent().parent().parent().rows[0].cells[0];
            }

        });
        $table.mouseout(function(event) {
            $table.each(function(index, el) {
                $(this).removeClass('hover');
            });
        });
    }
    // 清除数组左右两边，数据为空的数据
const ArrayTrim = function(array) {
    array = array.slice(0)
    let a = true
    let b = true
    if (array[0].lk.people == 0 && array[0].lk.allpeople == 0 && array[0].lk.percent == 0 && array[0].bx.people == 0 && array[0].bx.allpeople == 0 && array[0].bx.percent == 0) {
        array.splice(0, 1)
        a = false
    }
    let end = array.length - 1
    if (array[end].lk.people == 0 && array[end].lk.allpeople == 0 && array[end].lk.percent == 0 && array[end].bx.people == 0 && array[end].bx.allpeople == 0 && array[end].bx.percent == 0) {
        array.splice(end, 1)
        b = false
    }
    if (a & b) {
        return array
    } else {
        return ArrayTrim(array)
    }
}
export {
    getToken,
    setToken,
    removeToken,
    deepCopy,
    diff,
    getclient,
    prefix,
    downloadBlobFile,
    trim,
    dateFtt,
    TableHover,
    ArrayTrim,
}