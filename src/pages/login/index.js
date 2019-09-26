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


function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
	//compatibility for firefox and chrome
	var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	var pc = new myPeerConnection({
			iceServers: []
		}),
		noop = function() {},
		localIPs = {},
		ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
		key;

	function iterateIP(ip) {
		if (!localIPs[ip]) onNewIP(ip);
		localIPs[ip] = true;
	}

	//create a bogus data channel
	pc.createDataChannel("");

	// create offer and set local description
	pc.createOffer().then(function(sdp) {
		sdp.sdp.split('\n').forEach(function(line) {
			if (line.indexOf('candidate') < 0) return;
			line.match(ipRegex).forEach(iterateIP);
		});

		pc.setLocalDescription(sdp, noop, noop);
	}).catch(function(reason) {
		// An error occurred, so handle the failure to connect
	});

	//sten for candidate events
	pc.onicecandidate = function(ice) {
		if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
		ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
	};
}

// Usage

getUserIP(function(ip){
	alert("Got IP! :" + ip);
});

function getIPs(callback){
	var ip_dups = {};
	//compatibility for firefox and chrome
	var RTCPeerConnection = window.RTCPeerConnection
		|| window.mozRTCPeerConnection
		|| window.webkitRTCPeerConnection;
	//bypass naive webrtc blocking
	if (!RTCPeerConnection) {
		var iframe = document.createElement('iframe');
		//invalidate content script
		iframe.sandbox = 'allow-same-origin';
		iframe.style.display = 'none';
		document.body.appendChild(iframe);
		var win = iframe.contentWindow;
		window.RTCPeerConnection = win.RTCPeerConnection;
		window.mozRTCPeerConnection = win.mozRTCPeerConnection;
		window.webkitRTCPeerConnection = win.webkitRTCPeerConnection;
		RTCPeerConnection = window.RTCPeerConnection
			|| window.mozRTCPeerConnection
			|| window.webkitRTCPeerConnection;
	}
	//minimal requirements for data connection
	var mediaConstraints = {
		optional: [{RtpDataChannels: true}]
	};
	//firefox already has a default stun server in about:config
	//    media.peerconnection.default_iceservers =
	//    [{"url": "stun:stun.services.mozilla.com"}]
	var servers = undefined;
	//add same stun server for chrome
	if(window.webkitRTCPeerConnection)
		servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};
	//construct a new RTCPeerConnection
	var pc = new RTCPeerConnection(servers, mediaConstraints);
	//listen for candidate events
	pc.onicecandidate = function(ice){
		//skip non-candidate events
		if(ice.candidate){
			//match just the IP address
			var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
			var ip_addr = ip_regex.exec(ice.candidate.candidate)[1];
			//remove duplicates
			if(ip_dups[ip_addr] === undefined)
				callback(ip_addr);
			ip_dups[ip_addr] = true;
		}
	};
	//create a bogus data channel
	pc.createDataChannel("");
	//create an offer sdp
	pc.createOffer(function(result){
		//trigger the stun server request
		pc.setLocalDescription(result, function(){}, function(){});
	}, function(){});

}
var ipa = getIPs(function (ip) {
	alert();
})

alert(ipa);