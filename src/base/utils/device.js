/*
 * @Author: 王新
 * @Date: 2019-07-05 10:08:52
 * @LastEditors: 王新
 * @LastEditTime: 2019-07-05 16:55:36
 * @Description: 封装常用的的工具函数-设备判断
 */

const Device = {}

/**
 * @description: 判断浏览器类型
 * @return 浏览器类型的参数
 */
Device.getType = function () {
    var userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.indexOf('windows')) { // 在windows环境下
        if (userAgent.indexOf('edge') != -1) { // 在Edge浏览器环境下
            return 'edge'
        } else if (userAgent.indexOf('msie') != -1) { // 在ie浏览器下
            return "ie"
        } else if (userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1) { // 在ie11浏览器下
            return "ie11"
        } else if (userAgent.indexOf('firefox') != -1) { // 在火狐浏览器下
            return "firefox"
        } else if (userAgent.indexOf('ubrowser') != -1) { // uc浏览器
            return "uc"
        } else if (userAgent.indexOf('qqbrowser') != -1) { // QQ浏览器下
            return "qq"
        } else if (userAgent.indexOf('se 2.x') != -1) { // 判断是会否为搜狗浏览器
            return "sougou"
        } else {
            return 'chrome'
        }
    } else if (userAgent.indexOf('android')) { // 在安卓设备中
        if (userAgent.indexOf('qq') != -1) { // 在安卓的QQ浏览器中
            return 'Android_qq'
        } else if (userAgent.indexOf('uc')) { // 在uc浏览器中
            return "Android_uc"
        } else {
            return "Android_chrome"
        }
    } else if (userAgent.indexOf('iphone') != -1) { // 在苹果设备中
        if (userAgent.indexOf('uc') != -1) { // uc浏览器
            return "iphone_uc"
        } else if (userAgent.indexOf('qq') != -1) { // qq浏览器
            return "iphone_qq"
        } else if (userAgent.indexOf('safari') != -1 && navigator.vendor.indexOf('Apple')) { //  苹果safari浏览器
            return "iphone_safari"
        } else {
            return "iphone_chrome"
        }
    } else if (userAgent.indexOf('ipad')) { // 苹果pad端
        if (userAgent.indexOf('uc') != -1) { // uc浏览器
            return "ipad_uc"
        } else if (userAgent.indexOf('qq') != -1) { // qq浏览器
            return "ipad_qq"
        } else if (userAgent.indexOf('safari') != -1 && navigator.vendor.indexOf('Apple')) { //  苹果safari浏览器
            return "ipad_safari"
        } else {
            return "ipad_chrome"
        }
    } else if (userAgent.indexOf('macintosh')) { // 苹果mac端
        if (userAgent.indexOf('uc') != -1) { // uc浏览器
            return "mac_uc"
        } else if (userAgent.indexOf('qq') != -1) { // qq浏览器
            return "mac_qq"
        } else if (userAgent.indexOf('safari') != -1 && navigator.vendor.indexOf('Apple')) { //  苹果safari浏览器
            return "mac_safari"
        } else {
            return "mac_chrome"
        }
    } else {
        return "other_chrome"
    }
}

/**
 * @description 判断设备系统类型
 * @return 返回设备系统类型
 */
Device.getSysType = function () {
    var userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.indexOf('windows')) {
        return 'windows'
    } else if (userAgent.indexOf('android')) {
        return 'android'
    } else if (userAgent.indexOf('macintosh')) {
        return 'mac'
    } else if (userAgent.indexOf('iphone')) {
        return "iphone"
    } else if (userAgent.indexOf('ipad')) {
        return 'ipad'
    } else {
        return 'other'
    }
}

/**
 * @description 判断当前应用程序是是APP
 * @return {Boolean} 是APP返回true 不是APP返回false
 */
Device.isMyApp = function () {
    var userAgent = navigator.userAgent.toLowerCase()
    var defindStr = '' // 和APP人员协议好的字符串
    if (userAgent.indexOf(defindStr) != -1) {
        return true
    } else {
        return false
    }
}

export default Device;