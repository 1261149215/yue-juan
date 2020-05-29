(function() {
    var json = { "version": "3.4.0", "objects": [{ "type": "group", "version": "3.4.0", "originX": "left", "originY": "top", "left": 1050, "top": 200, "width": 227.89, "height": 238.61, "fill": "rgb(0,0,0)", "stroke": null, "strokeWidth": 0, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 30, "flipX": false, "flipY": false, "opacity": 1, "shadow": null, "visible": true, "clipTo": null, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "transformMatrix": null, "skewX": 0, "skewY": 0, "objects": [{ "type": "ellipse", "version": "3.4.0", "originX": "left", "originY": "top", "left": -71.45, "top": -36.81, "width": 160, "height": 80, "fill": "#800080", "stroke": "#555", "strokeWidth": 5, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 30, "flipX": false, "flipY": false, "opacity": 1, "shadow": null, "visible": true, "clipTo": null, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "transformMatrix": null, "skewX": 0, "skewY": 0, "rx": 80, "ry": 40 }, { "type": "ellipse", "version": "3.4.0", "originX": "left", "originY": "top", "left": -71.45, "top": -36.81, "width": 160, "height": 80, "fill": "#FFFF00", "stroke": "#555", "strokeWidth": 5, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": -30, "flipX": false, "flipY": false, "opacity": 1, "shadow": null, "visible": true, "clipTo": null, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "transformMatrix": null, "skewX": 0, "skewY": 0, "rx": 80, "ry": 40 }, { "type": "text", "version": "3.4.0", "originX": "left", "originY": "top", "left": -71.45, "top": -36.81, "width": 100.17, "height": 19.21, "fill": "#333", "stroke": null, "strokeWidth": 1, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 1, "shadow": null, "visible": true, "clipTo": null, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "transformMatrix": null, "skewX": 0, "skewY": 0, "text": "I am a group!", "fontSize": 17, "fontWeight": "normal", "fontFamily": "Helvetica", "fontStyle": "normal", "lineHeight": 1.16, "underline": false, "overline": false, "linethrough": false, "textAlign": "left", "textBackgroundColor": "", "charSpacing": 0, "styles": {} }] }, { "type": "rect", "version": "3.4.0", "originX": "left", "originY": "top", "left": 84.51, "top": 147.04, "width": 481.69, "height": 283.94, "fill": "rgba(255, 255, 255, 0)", "stroke": "red", "strokeWidth": 2, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 1, "shadow": null, "visible": true, "clipTo": null, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "transformMatrix": null, "skewX": 0, "skewY": 0, "rx": 0, "ry": 0 }] }
    var mouseFrom = {},
        mouseTo = {},
        drawType = 'rectangle', //画板默认选中绘制类型
        canvasObjectIndex = 0,
        textbox = null;
    var drawWidth = 2; //笔触宽度
    var color = "red"; //画笔颜色
    var drawingObject = null; //当前绘制对象
    var moveCount = 1; //绘制移动计数器
    var doDrawing = false; // 绘制状态
    var rightColor = "#006400",
        wrongColor = "#E34F51";

    //初始化画板
    var canvas = new fabric.Canvas("c", {
        isDrawingMode: false,
        skipTargetFind: true,
        selectable: false,
        selection: false
    });
    fabric.Image.fromURL('http://icdn.apigo.cn/paper.png?1', function(img) {
        img.set({ evented: false, selectable: false })
        canvas.add(img);
    }, { crossOrigin: 'anonymous' });
    // // debugger
    // console.log(canvas.loadFromJSON) 
    // canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
    // var ellipse1 = new fabric.Ellipse({
    //     rx: 80,
    //     ry: 40,
    //     fill: '#800080',
    //     stroke: '#555',
    //     strokeWidth: 5,
    //     angle: 30
    // });
    // var ellipse2 = new fabric.Ellipse({
    //     rx: 80,
    //     ry: 40,
    //     fill: '#FFFF00',
    //     stroke: '#555',
    //     strokeWidth: 5,
    //     angle: -30
    // });
    // var text = new fabric.Text('I am a group!', {
    //     fill: '#333',
    //     fontFamily: 'Helvetica',
    //     fontSize: 17
    // });
    // var group = new fabric.Group([ellipse1, ellipse2, text], {
    //     left: 1050,
    //     top: 200,
    //     angle: 30,
    //     zoom: 200,
    // });
    // canvas.add(group);

    // fabric.util.enlivenObjects([json], function(objects) {
    //     var origRenderOnAddRemove = canvas.renderOnAddRemove;
    //     canvas.renderOnAddRemove = false;

    //     objects.forEach(function(o) {
    //         canvas.add(o);
    //     });

    //     canvas.renderOnAddRemove = origRenderOnAddRemove;
    //     canvas.renderAll();
    // });
    window.canvas = canvas;
    window.zoom = window.zoom ? window.zoom : 1;
    window.drawType = drawType;
    canvas.freeDrawingBrush.color = color; //设置自由绘颜色
    canvas.freeDrawingBrush.width = drawWidth;

    //绑定画板事件
    canvas.on("mouse:down", function(options) {
        var xy = transformMouse(options.e.offsetX, options.e.offsetY);
        mouseFrom.x = xy.x;
        mouseFrom.y = xy.y;
        doDrawing = true;
    });
    canvas.on("mouse:up", function(options) {
        var xy = transformMouse(options.e.offsetX, options.e.offsetY);
        mouseTo.x = xy.x;
        mouseTo.y = xy.y;
        drawing();
        drawingObject = null;
        moveCount = 1;
        doDrawing = false;
    });
    canvas.on("mouse:move", function(options) {
        if (moveCount % 2 && !doDrawing) {
            //减少绘制频率
            return;
        }
        moveCount++;
        var xy = transformMouse(options.e.offsetX, options.e.offsetY);
        mouseTo.x = xy.x;
        mouseTo.y = xy.y;
        drawing();
    });

    canvas.on("selection:created", function(e) {
        if (drawType.indexOf("remove") != -1) {
            if (e.target._objects) {
                //多选删除
                if (e.target.type == "group") {
                    canvas.remove(e.target);
                } else {
                    var etCount = e.target._objects.length;
                    for (var etindex = 0; etindex < etCount; etindex++) {
                        if (e.target._objects[etindex].type == "image") {
                            continue;
                        }
                        canvas.remove(e.target._objects[etindex]);
                    }
                }
            } else {
                //单选删除
                if (e.target.type != "image") {
                    canvas.remove(e.target);
                }
            }
            canvas.discardActiveObject(); //清楚选中框
        }
    });

    //坐标转换
    function transformMouse(mouseX, mouseY) {
        return { x: mouseX / window.zoom, y: mouseY / window.zoom };
    }

    //绑定工具事件
    $("#toolsul").find("li").on("click", function() {
            $("#toolsul").find("li>i").each(function() {
                $(this).attr("class", $(this).attr("data-default"));
            })
            $(this).addClass("active").siblings().removeClass("active");
            $(this).find("i").attr("class", $(this).find("i").attr("class").replace("black", "select"));
            drawType = $(this).attr("data-type");
            window.drawType = drawType;
            canvas.isDrawingMode = false;
            if (textbox) {
                //退出文本编辑状态
                textbox.exitEditing();
                textbox = null;
            }
            if (drawType == "pen") {
                canvas.isDrawingMode = true;
            } else if (drawType == "remove") {
                canvas.selection = true;
                canvas.skipTargetFind = false;
                canvas.selectable = true;
            } else if (drawType == "move") {
                canvas.selection = false;
                canvas.skipTargetFind = false;
                canvas.selectable = true;
                canvas.hasControls = true
            } else {
                canvas.skipTargetFind = true; //画板元素不能被选中
                canvas.selection = false; //画板不显示选中
            }
        })
        //绘画方法
    function drawing() {
        if (drawingObject) {
            canvas.remove(drawingObject);
        }
        var canvasObject = null;
        switch (drawType) {
            case "ellipse": //椭圆
                var left = mouseFrom.x,
                    top = mouseFrom.y;
                var radius = Math.sqrt((mouseTo.x - left) * (mouseTo.x - left) + (mouseTo.y - top) * (mouseTo.y - top)) / 2;
                canvasObject = new fabric.Ellipse({
                    left: left,
                    top: top,
                    stroke: color,
                    fill: "rgba(255, 255, 255, 0)",
                    originX: "center",
                    originY: "center",
                    rx: Math.abs(left - mouseTo.x),
                    ry: Math.abs(top - mouseTo.y),
                    strokeWidth: drawWidth
                });
                break;
            case "rectangle": //长方形
                var left = mouseFrom.x,
                    top = mouseFrom.y;
                // var path =
                //     "M " +
                //     mouseFrom.x +
                //     " " +
                //     mouseFrom.y +
                //     " L " +
                //     mouseTo.x +
                //     " " +
                //     mouseFrom.y +
                //     " L " +
                //     mouseTo.x +
                //     " " +
                //     mouseTo.y +
                //     " L " +
                //     mouseFrom.x +
                //     " " +
                //     mouseTo.y +
                //     " L " +
                //     mouseFrom.x +
                //     " " +
                //     mouseFrom.y +
                //     " z";
                // canvasObject = new fabric.Path(path, {
                //     left: left,
                //     top: top,
                //     padding: 0,
                //     fill: "rgba(255, 0, 0, 0.3)",
                //     borderColor: "rgba(0, 0, 0, 1)",
                //     cornerColor: "rgba(0, 0, 0, 1)",
                //     cornerStrokeColor: "rgba(0, 0, 0, 1)",
                // });
                let widthval = Math.abs(mouseFrom.x - mouseTo.x)
                let heightval = Math.abs(mouseFrom.y - mouseTo.y)
                if (widthval > 2 && heightval > 2) {
                    canvasObject = new fabric.Rect({
                        width: widthval,
                        height: heightval,
                        left: left,
                        top: top,
                        padding: 0,
                        stroke: color,
                        strokeWidth: drawWidth,
                        fill: "rgba(255, 255, 255, 0)",
                        borderColor: "rgba(0, 0, 0, 1)",
                        cornerColor: "rgba(0, 0, 0, 1)",
                        cornerStrokeColor: "rgba(0, 0, 0, 1)",
                    })
                }
                //也可以使用fabric.Rect
                break;
            case "remove":
                break;
            case "move":
                break;
            default:
                break;
        }
        if (canvasObject) {
            // canvasObject.index = getCanvasObjectIndex();
            canvasObject.type = drawType;
            canvas.add(canvasObject); //.setActiveObject(canvasObject)
            drawingObject = canvasObject;
        }
    }

    //绘制箭头方法
    function drawArrow(fromX, fromY, toX, toY, theta, headlen) {
        theta = typeof theta != "undefined" ? theta : 30;
        headlen = typeof theta != "undefined" ? headlen : 10;
        // 计算各角度和对应的P2,P3坐标
        var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
            angle1 = (angle + theta) * Math.PI / 180,
            angle2 = (angle - theta) * Math.PI / 180,
            topX = headlen * Math.cos(angle1),
            topY = headlen * Math.sin(angle1),
            botX = headlen * Math.cos(angle2),
            botY = headlen * Math.sin(angle2);
        var arrowX = fromX - topX,
            arrowY = fromY - topY;
        var path = " M " + fromX + " " + fromY;
        path += " L " + toX + " " + toY;
        arrowX = toX + topX;
        arrowY = toY + topY;
        path += " M " + arrowX + " " + arrowY;
        path += " L " + toX + " " + toY;
        arrowX = toX + botX;
        arrowY = toY + botY;
        path += " L " + arrowX + " " + arrowY;
        return path;
    }

    //获取画板对象的下标
    function getCanvasObjectIndex() {
        return canvasObjectIndex++;
    }
})();