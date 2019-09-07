/*
 * @Author: 王新
 * @Date: 2019-07-05 10:08:52
 * @LastEditors: 李祥雨
 * @LastEditTime: 2019-08-11 16:57
 * @Description: 封装常用的的工具函数-发送请求的一些函数
 */

/**
 * @description 请求数据的get异步方法
 * @param {string} _url  发送数据的路径
 * @param {object} _data    要发送的数据
 * @param {function} callback   发送成功的回调
 * @param {function} errback    发送失败的回调
 */
function getAjaxHttpsRequest(_url, _data, callback, errback) {
    // 调用jq中的ajax方法
    $.ajax({
        // 将参数传递到方法的配置中
        type: 'get',
        url: _url,
        dataType: "json",
        // contentType: "application/json; charset=utf-8",
        headers: {
            token: sessionStorage.getItem('token')
        },
        async: true,
        cache: false,
        data: _data,
        timeout: 3000,
        // 成功请求成功后的回调函数
        success: function(data) {
            if (data.code == 1000) {
                location.href = './login.html'
                return
            }
            callback(data)
        },
        error: function(a, e) {
            errback && errback(e)
        }
    });
}

/**
 * @description 请求数据的get同步步方法
 * @param {string} _url  发送数据的路径
 * @param {object} _data    要发送的数据
 * @param {function} callback   发送成功的回调
 * @param {function} errback    发送失败的回调
 */
function getAjaxAsyncHttpsRequest(_url, _data, callback, errback) {
    // 调用jq中的ajax方法
    $.ajax({
        // 将参数传递到方法的配置中
        type: 'get',
        url: _url,
        dataType: "json",
        // contentType: "application/json; charset=utf-8",
        headers: {
            token: sessionStorage.getItem('token')
        },
        async: false,
        cache: false,
        data: _data,
        timeout: 3000,
        // 成功请求成功后的回调函数
        success: function(data) {
            if (data.code == 1000) {
                location.href = './login.html'
                return
            }
            callback(data)
        },
        error: function(a, e) {
            errback && errback(e)
        }
    });
}

/**
 * @description 向后台发送数据的异步方法
 * @param {string} _url  发送数据的路径
 * @param {object} _data    要发送的数据
 * @param {function} callback   发送成功的回调
 * @param {function} errback    发送失败的回调
 */
function ajaxHttpsRequest(_url, _data, callback, errback) {
    // 调用jq中的ajax方法
    $.ajax({
        // 将参数传递到方法的配置中
        type: 'post',
        url: _url,
        dataType: "json",
        // contentType: "application/json; charset=utf-8",
        headers: {
            token: sessionStorage.getItem('token')
        },
        async: true,
        cache: false,
        data: _data,
        timeout: 3000,
        // 成功请求成功后的回调函数
        success: function(data) {
            if (data.code == 1000) {
                location.href = './login.html'
                return
            }
            callback(data)
        },
        error: function(a, e) {
            errback && errback(e)
        }
    });
}

/**
 * @description 向后台发送数据的同步方法
 * @param {string} _url  发送数据的路径
 * @param {object} _data    要发送的数据
 * @param {function} callback   发送成功的回调
 * @param {function} errback    发送失败的回调
 */
function ajaxAsyncHttpsRequest(_url, _data, callback, errback) {
    // 调用jq中的ajax方法
    $.ajax({
        // 将参数传递到方法的配置中
        type: 'post',
        url: _url,
        dataType: "json",
        // contentType: "application/json; charset=utf-8",
        headers: {
            token: sessionStorage.getItem('token')
        },
        async: false,
        cache: false,
        timeout: 3000,
        data: _data,
        // 成功请求成功后的回调函数
        success: function(data) {
            if (data.code == 1000) {
                location.href = './login.html'
                return
            }
            callback(data)
        },
        error: function(a, e) {
            errback && errback(e)
        }

    });
}

// var request = {
//     getAjaxHttpsRequest,
//     ajaxHttpsRequest,
//     ajaxAsyncHttpsRequest
// }

// module.exports = request

export default {
    getAjaxHttpsRequest,
    getAjaxAsyncHttpsRequest,
    ajaxHttpsRequest,
    ajaxAsyncHttpsRequest
}