/**
 * Created by Lee on 2019/9/25.
 */
var srcData = require("../../assets/login-banner1.png")
loadImg(srcData,function (img) {
    //调用标记方法
    var tags = [{
        code: 191,
        name: "早期食管癌_0-Ip型",
        rect: "0.6423516,0.2980556,0.1599375,0.2935139"
    },
        {
            code: 192,
            name: "早期食管癌11",
            rect: "0.7423516,0.1980556,0.1599375,0.2935139"
        }
    ]
    var canvasImg = imageMark(img,tags);
    $("#myImg").attr("src",canvasImg);
})

/**
 * 利用canvas给图片做标记，用于标图程序中的标图数据的回显
 * @param imgObj
 * @param tagsArr
 * @returns {*}
 */
function imageMark(imgObj,tagsArr) {
    var cav = document.createElement("canvas");
    var cavCon = cav.getContext("2d");
    var srcData = null;
    var currentRectData = [];
    var colors = "#0f0";
    cav.width = imgObj.width;
    cav.height = imgObj.height;
    cavCon.drawImage(imgObj,0,0,imgObj.width,imgObj.height);
    cavCon.fillStyle = colors;
    cavCon.font='30px 黑体';
    for(var i=0;i<tagsArr.length;i++){
        currentRectData = tagsArr[i].rect.split(',');
        cavCon.beginPath();
        cavCon.lineWidth="3";
        cavCon.strokeStyle=colors;
        cavCon.rect(imgObj.width*parseFloat(currentRectData[0]) , imgObj.height * parseFloat(currentRectData[1]) , imgObj.width*parseFloat(currentRectData[2]) , imgObj.height * parseFloat(currentRectData[3]))
        cavCon.fillText(tagsArr[i].name,imgObj.width*parseFloat(currentRectData[0]),imgObj.height * parseFloat(currentRectData[1])+imgObj.height * parseFloat(currentRectData[3])+30);
        cavCon.stroke();
    }
    srcData = cav.toDataURL("image/jpeg");
    return srcData;
}

/**
 * 加载一张图片，加载成功后执行回调（待优化项：加载失败后的回调）
 * @param src 需要加载的图片地址
 * @param callback 加载成功后的回调
 */
function loadImg(src,callback){
    var image = new Image();
    image.src = src;
    image.onload = function () {
        callback(image);
    }
}





