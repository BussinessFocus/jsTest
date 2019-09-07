
/*
 * @Author: 李祥雨
 * @Date: 2019-07-05 10:08:52
 * @LastEditors: 李祥雨
 * @LastEditTime: 2019-08-11 16:57
 * @Description: 封装常用的的工具函数-与url有关的一些处理函数
 */

/**
 * @description 获取url中的参数
 * @param name 获取参数的名称
 * @returns {null}
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

export default {
    getUrlParam
}