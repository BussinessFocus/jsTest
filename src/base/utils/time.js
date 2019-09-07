
/*
 * @Author: 王新
 * @Date: 2019-07-05 10:08:52
 * @LastEditors: 李祥雨
 * @LastEditTime: 2019-08-11 16:57
 * @Description: 封装常用的的工具函数-与时间有关的一些处理函数
 */

/**
 * @description  格式化时间插件
 * @param {Date} date 要格式化的时间 如: new Date()
 * @param {int} flag 返回的时间格式类型 可以不传 则返回2019-03-02  传1则返回2019年03月07日 传2则返回2019.03.02
 * @returns {string} 格式化好的时间 如 2019-03-02
 */
function formatterDate(date,flag) {
    if (flag == 1) {
        var strDate = date.getFullYear() + "年";
        if (date.getMonth() < 10) {
            var s = date.getMonth() + 1 + "月";
            strDate += "0" + s;
        } else {
            strDate += date.getMonth() + 1 + "月";
        }
        if (date.getDate() < 10) {
            strDate += "0" + date.getDate() + "日"
        } else {
            strDate += date.getDate() + "日"
        }
        return strDate;
    } else if(flag == 2){
        var strDate = date.getFullYear() + ".";
        if (date.getMonth() < 10) {
            var s = date.getMonth() + 1 + ".";
            strDate += "0" + s;
        } else {
            strDate += date.getMonth() + 1 + ".";
        }
        if (date.getDate() < 10) {
            strDate += "0" + date.getDate();
        } else {
            strDate += date.getDate();
        }
        return strDate;
    }else{
        var strDate = date.getFullYear() + "-";
        if (date.getMonth() < 10) {
            var s = date.getMonth() + 1 + "-";
            strDate += "0" + s;
        } else {
            strDate += date.getMonth() + 1 + "-";
        }
        if (date.getDate() < 10) {
            strDate += "0" + date.getDate();
        } else {
            strDate += date.getDate();
        }
        return strDate;
    }
}

/**
 * @description  获取本周第i天日期 从0开始计数
 * @param {int} i 获取第几天的 周一传入0 周日传入6
 * @param {int} flag 返回的时间格式 传入不为false的值 则返回 2019年03月02日
 * @returns {string} 格式化好的日期 (2019-03-05)
 */
function getWeek(i, flag) {
    var now = new Date();
    var firstDay = new Date(now - (now.getDay() - 1) * 86400000)
    firstDay.setDate(firstDay.getDate() + i);
    mon = Number(firstDay.getMonth()) + 1;
    if (flag) {
        return now.getFullYear() + "年" + mon + "月" + firstDay.getDate() + "日"
    } else {
        return now.getFullYear() + "-" + mon + "-" + firstDay.getDate();
    }
}

/**
 * @description 获取本月第一天的日期
 * @returns Date()对象 使用时用formatterDate()方法格式化一下
 */
function getCurrentMonthFirst() {
    var date=new Date();
    date.setDate(1);
    return date;
}

/**
 * @description 获取本月最后一天的日期
 * @returns Date()对象 使用时用formatterDate()方法格式化一下
 */
function getCurrentMonthLast() {
    var date=new Date();
    var currentMonth=date.getMonth();
    var nextMonth=++currentMonth;
    var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
    var oneDay=1000*60*60*24;
    return new Date(nextMonthFirstDay-oneDay);
}


/**
 * @description 倒计时方法 按秒计算
 * @param {Number} sec 倒计时时间 秒
 * @param {Function} callback1 执行倒计时的回调函数 一个参数为当前剩余秒数
 * @param {Function} callback2 倒计时执行完毕后的回调函数 无参数
 * @return null
 */
function countDown(sec, callback1, callback2) {
    var count = sec
    callback1 && callback1(count)
    var setintervalID = setInterval(function () {
        count--;
        callback1 && callback1(count)
        if (count <= 0) {
            callback2 && callback2()
            clearInterval(setintervalID)
            setintervalID = null
        }
    }, 1000)
}

export default {
    formatterDate,
    getWeek,
    getCurrentMonthFirst,
    getCurrentMonthLast,
    countDown
}