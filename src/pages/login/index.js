/*
* @Description: 登录页面的js
* @Author: WangXin
* @Date: 2019-08-16 17:19:43
*/

require("layui-layer")
import './index.less'

// 引入基础的路径
import {
	baseUrl
} from '../../base/config/index.js'

// var baseUrl = 'http://192.168.2.91:8080'
// var baseUrl = 'http://139.129.167.26:35001/'
var utils = require('../../base/utils/index.js')

var loginUrl = baseUrl + 'api/user/login'
// 登录按钮的点击事件
$('.login-btn').click(function() {
	var sendData = {
		name: $.trim($('#account').val()),
		password: $.trim($('#password').val())
	}
	console.log(sendData)

	if (sendData.name == '') {
		layer.msg('请输入用户名')
		return
	} else if (sendData.password == '') {
		layer.msg('请输入密码')
		return
	}
	// 发送ajax请求
	utils.Request.ajaxHttpsRequest(loginUrl, sendData, function(res) {
		if (res.code == 200) {
			sessionStorage.setItem('token', res.token)
			sessionStorage.setItem('nick', res.data)
			location.href = './zonglan.html'
		} else {
			if (res.data) {
				layer.msg(res.data)
			} else {
				layer.msg(res.msg)
			}
		}
	})
})

// 回车登录的方法
$('#password').keyup(function(event) {
	/* Act on the event */
	if (event.keyCode==13) {
		$('.login-btn').click()
	}
})
