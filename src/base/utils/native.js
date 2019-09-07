
/*
 * @Author: 王新
 * @Date: 2019-07-05 10:08:52
 * @LastEditors: 李祥雨
 * @LastEditTime: 2019-08-11 16:57
 * @Description: 封装常用的的工具函数-内嵌原生app的webview中的网页调用的与原生交互的方法（medcare）
 */

/**
 * @description 调用app内的方法
 * @param {string} funName  要调用的方法的名称
 * @param {object} funParam  传入的参数对象
 */
function userAppmethods(funName, funParam) {
    var obj = {
        MethodName: funName,
        Parameters: funParam
    }
    try {
        MobileNa.call(JSON.stringify(obj))   // 调用安卓端的方法
    } catch(err) {}

    try {
        MobileNaCall(JSON.stringify(obj))   // 调用IOS端的方法
    } catch(err) {}
}

export default {
    userAppmethods
}