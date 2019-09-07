import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
require('layui-layer')
import {baseUrl} from "../../base/config/index.js"
var utils = require('../../base/utils/index.js')

import "./head.css" 
// var baseUrl = "http://192.168.2.93:8080/"
var logoutUrl = baseUrl + "api/user/logout"; //请求退出

// 获取到用户的信息
var userInfo = sessionStorage.getItem('nick')

// nav选择状态判断
var urlstr = window.location.href;
if(urlstr.indexOf('zonglan')!=-1){
    $('.navbar-nav').find('li').removeClass('on')
    $('.navbar-nav').children("li[href-data='zonglan']").addClass('on')
}else if(urlstr.indexOf('maintain')!=-1){
    $('.navbar-nav').find('li').removeClass('on')
    $('.navbar-nav').children("li[href-data='maintain']").addClass('on')
}else if(urlstr.indexOf('setting')!=-1){
    $('.navbar-nav').find('li').removeClass('on')
    $('.navbar-nav').children("li[href-data='setting']").addClass('on')
}else if(urlstr.indexOf('shebeiweihu')!=-1){
    $('.navbar-nav').find('li').removeClass('on')
    $('.navbar-nav').children("li[href-data='shebeiweihu']").addClass('on')
}else if(urlstr.indexOf('yuanganjiance')!=-1){
    $('.navbar-nav').find('li').removeClass('on')
    $('.navbar-nav').children("li[href-data='yuanganjiance']").addClass('on')
}


// 将用户昵称显示到页面上
$('#usernick').text(userInfo); 

// 用户退出
$('.userquit').on('click',function(){
    $('.quitdefinebtn').on('click',function(){
        utils.Request.ajaxHttpsRequest(logoutUrl, {}, function (res) {
            console.log(res)
            if (res.code == 200) {
                location.href = "./login.html"
                sessionStorage.clear()
                layer.msg('登出成功')
            }
        })
        
    })
})























