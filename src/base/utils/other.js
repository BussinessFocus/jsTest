
/*
 * @Author: 王新
 * @Date: 2019-07-05 10:08:52
 * @LastEditors: 李祥雨
 * @LastEditTime: 2019-08-11 16:57
 * @Description: 封装常用的的工具函数-其他的一些不常用方法
 */

/**
 * @description 根据出生日期计算年龄差
 * @param {string} strBirthday 出生日期  格式 2019-03-03或2019-02-02T10:20:30
 * @returns 年龄
 */
function getAge(strBirthday) {
    var returnAge;
    strBirthday = strBirthday.split('T')[0]
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
    if (nowYear == birthYear) {
        returnAge = 0; //同年 则为0岁
    } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay; //日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            } else {
                var monthDiff = nowMonth - birthMonth; //月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            }
        } else {
            returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge; //返回周岁年龄
}

export default {
    getAge
}