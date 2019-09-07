/*
 * @Description: 院感监测的js文件
 * @Author: WangXin
 * @Date: 2019-08-15 16:10:36
 */

 document.title = "院感监测"
require("layui-layer");
import 'src@/templates/head/head.js'
import 'src@/templates/head/common.css'
import './index.less'

require('paginationjs/dist/pagination.css')
require('paginationjs')

require('@/lib/chosen_v1.8.7/chosen.jquery.js')
require('@/lib/chosen_v1.8.7/chosen.css')

import { baseUrl } from 'src@/base/config/index.js'
// var baseUrl = 'http://192.168.2.91:8080/'
var Pagination = require('src@/base/common/pagingation.js')

var utils = require('src@/base/utils/index.js')
console.log(utils.Request)

var getDataListUrl = baseUrl + '/api/getSense' // 分页查询获取数据
var delDataUrl = baseUrl + '/api/delectSense' // 删除院感数据
var updateDataUrl = baseUrl + '/api/updateSense' // 根据id跟新院感数据
var addDataUrl = baseUrl + '/api/addSense' // 添加院感数据
var delectSenseUrl = baseUrl + '/api/delectSense' // 删除院感数据地址
var updateSenseUrl = baseUrl + '/api/updateSense' // 更新院感数据
var queryZidianUrl = baseUrl + '/api/selectDictionary' // 查询院感字典数据
var getAllEndoscopeurl = baseUrl + '/api/getAllEndoscope' // 查询所有采样点

// 请求首屏的数据
var sendData = {
    PageSize: 5,
    PageNumber: 1
}
utils.Request.ajaxAsyncHttpsRequest(getDataListUrl, sendData, function(res) {
    if (res.code = 200) {
        // 渲染分页插件
        Pagination.renderPagination('#pagingation', res.data.total, 5, function(pageIndex) {
            let sendData = {
                PageSize: 5,
                PageNumber: pageIndex
            }
            utils.Request.ajaxHttpsRequest(getDataListUrl, sendData, function(res2) {
                renderTableData('tbody', res2.data.list)
            })
        })
    }
})

// 点击添加按钮 打开添加按钮模态框
$('body').on('click', '.add-span', function() {
    $('#addData-modal').modal('show')
    getSelectOpt()
    $("#EndoscopeID").chosen({
        width: "100%",
        search_contains: true, //true-可根据中间字段模糊查询  
        no_results_text: "没有匹配结果"
    })
    // var htmlStr = `
    //     <option value="1">111</option>
    //     <option value="1">111</option>
    //     <option value="1">111</option>
    //     <option value="1">111</option>
    // `
    // $('.EndoscopeID').html(htmlStr)
    // $('.EndoscopeID').chosen({
    //     width: "100%",
    //     search_contains: true, //true-可根据中间字段模糊查询  
    //     no_results_text: "没有匹配结果"
    // });
})
// 点击添加模态框确定按钮
$('body').on('click', '.add-sure-btn', function() {
    let sendData = {
        MonitoringConclusions: $('#MonitoringConclusions').val(),
        StandardValue: $('#StandardValue').val(),
        EndoscopeID: $('#EndoscopeID').val(),
        Unit: $('#Unit').val(),
        TestItems: $('#TestItems').val(),
        Auditor: $('#Auditor').val(),
        Result: $('#Result').val()
    }
    utils.Request.ajaxHttpsRequest(addDataUrl, { data: JSON.stringify(sendData) }, function(res) {
        if (res.code == 200) {
            $('#addData-modal').modal('hide')
            layer.msg('添加院感数据成功')
            // 重新加载表格数据
            var sendData = {
                PageSize: 5,
                PageNumber: 1
            }
            utils.Request.ajaxHttpsRequest(getDataListUrl, sendData, function(res) {
                if (res.code = 200) {
                    // 渲染分页插件
                    Pagination.renderPagination('#pagingation', res.data.total, 5, function(pageIndex) {
                        let sendData = {
                            PageSize: 5,
                            PageNumber: pageIndex
                        }
                        utils.Request.ajaxHttpsRequest(getDataListUrl, sendData, function(res2) {
                            renderTableData('tbody', res2.data.list)
                        })
                    })
                }
            })
        }
    })
})

// 点击编辑按钮 打开编辑模态框
var editSenseID = null
$('body').on('click', '.edit-btn', function() {
    let itemData = JSON.parse($(this).parent().attr('data-info'))
    editSenseID = itemData.senseID
    getSelectOpt()
    $('#editData-modal').modal('show')
    $('#edit-MonitoringConclusions').val(itemData.monitoringConclusions)
    $('#edit-StandardValue').val(itemData.standardValue)

    $("#edit-EndoscopeID").chosen({
        width: "100%",
        search_contains: true, //true-可根据中间字段模糊查询  
        no_results_text: "没有匹配结果"
    })
    // $('#edit-EndoscopeID').val(itemData.endoscopeID)
    $("#edit-EndoscopeID").get(0).value = itemData.endoscopeID
    $("#edit-EndoscopeID").trigger("chosen:updated")

    $('#edit-Unit').val(itemData.unit)
    $('#edit-TestItems').val(itemData.testItems)
    $('#edit-Auditor').val(itemData.auditor)
    $('#edit-Result').val(itemData.result)
})
// 点击编辑模态框的确定按钮
$('body').on('click', '.edit-sure-btn', function() {
    let data = {
        MonitoringConclusions: $('#edit-MonitoringConclusions').val(),
        StandardValue: $('#edit-StandardValue').val(),
        EndoscopeID: $('#edit-EndoscopeID').val(),
        Unit: $('#edit-Unit').val(),
        TestItems: $('#edit-TestItems').val(),
        Auditor: $('#edit-Auditor').val(),
        Result: $('#edit-Result').val()
    }
    let sendData = {
        id: editSenseID,
        data: JSON.stringify(data)
    }
    utils.Request.ajaxHttpsRequest(updateSenseUrl, sendData, function(res) {
        console.log(res)
        if (res.code == 200) {
            let currentPage = $('#pagingation').pagination('getSelectedPageNum')
            $('#pagingation').pagination(currentPage)
            $('#editData-modal').modal('hide')
            layer.msg('更新院感数据成功')
            editSenseID = null
        }
    })
})

// 点击删除模态框按钮
let delSenseID = null
let delItemRow = null
$('body').on('click', '.delete-btn', function() {
    let itemData = JSON.parse($(this).parent().attr('data-info'))
    delSenseID = itemData.senseID
    delItemRow = $(this).parent().parent()
    $('#del-modal').modal('show')
})
$('body').on('click', '.sure-del-item', function() {
    let sendData = {
        id: delSenseID
    }
    utils.Request.ajaxHttpsRequest(delectSenseUrl, sendData, function(res) {
        if (res.code == 200) {
            delItemRow.remove()
            $('#del-modal').modal('hide')
            layer.msg('删除院感数据成功')
            delSenseID = null
        }
    })
})

// 点击详情按钮
$('body').on('click', '.detail-btn', function() {
    let itemData = JSON.parse($(this).parent().attr('data-info'))
    console.log(itemData)
    $('#endoscope-val').text(itemData.eq + '-' + itemData.endoscopeNumber)
    Object.keys(itemData).forEach(v => {
        $('#' + v + '-val').text(itemData[v])
    })
    $('#detail-modal').modal('show')
})

// 点击字典维护按钮
$('.zdwh-div').click(function(event) {
    /* Act on the event */
    window.location.href = './zidianweihu.html'
})

/**
 * @Description 渲染表格数据的方法
 * @Author      wangxin
 * @Date        2019-08-17
 * @param       {string}   selector 选择器 如 'body'
 * @param       {array}   dataArr  要进行渲染的数据列表
 * @return      {none}            [description]
 */
function renderTableData(selector, dataArr) {
    let htmlStr = ''
    dataArr.forEach(v => {
        console.log(v)
        htmlStr += `
                <tr>
                    <td>${v.endoscopeCode}</td>
                    <td>${v.endoscopeNumber}</td>
                    <td>${v.testItemsName}</td>
                    <td>${v.monitoringConclusionsName}</td>
                    <td>${v.auditorName}</td>
                    <td>${v.createTime}</td>
                    <td class="operation" data-endoscopeID="${v.endoscopeID}" data-info='${JSON.stringify(v)}'>
                        <span class="edit-btn"><img src="${require('@/static/edit.png')}" alt="">编辑</span>
                        <span class="delete-btn"><img src="${require('src@/assets/remove.png')}" alt="">删除</span>
                        <span class="detail-btn"><img src="${require('src@/assets/detail.png')}" alt="">详情</span>
                    </td>
                </tr>
            `
    })
    $(selector).html(htmlStr)
}

/**
 * @Description 渲染模态框中的下拉框
 * @Author      wangxin
 * @Date        2019-08-19
 * @return      {null}   [description]
 */
function getSelectOpt() {
    utils.Request.ajaxAsyncHttpsRequest(queryZidianUrl, {}, function(res) {
        // 监测结论
        let htmlStr1 = ''
        res.MonitoringConclusions.forEach(v => {
            htmlStr1 += `<option value="${v.dictionariesID}">${v.itemName}</option>`
        })
        $('.MonitoringConclusions').html(htmlStr1)

        // 标准值
        let htmlStr2 = ''
        res.StandardValue.forEach(v => {
            htmlStr2 += `<option value="${v.dictionariesID}">${v.itemName}</option>`
        })
        $('.StandardValue').html(htmlStr2)

        // 结果单位
        let htmlStr4 = ''
        res.Unit.forEach(v => {
            htmlStr4 += `<option value="${v.dictionariesID}">${v.itemName}</option>`
        })
        $('.Unit').html(htmlStr4)

        // 监测项目
        let htmlStr5 = ''
        res.TestItems.forEach(v => {
            htmlStr5 += `<option value="${v.dictionariesID}">${v.itemName}</option>`
        })
        $('.TestItems').html(htmlStr5)

        // 审核者
        let htmlStr6 = ''
        res.Auditor.forEach(v => {
            htmlStr6 += `<option value="${v.dictionariesID}">${v.itemName}</option>`
        })
        $('.Auditor').html(htmlStr6)

        // 采样点
        utils.Request.getAjaxAsyncHttpsRequest(getAllEndoscopeurl, {}, function(res1) {
            if (res1.code == 200) {
                var htmlStr3 = ''
                res1.data.forEach(v => {
                    htmlStr3 += `<option value="${v.iD}">${v.eq}-${v.code}</option>`
                })
                $('.EndoscopeID').html(htmlStr3)
                // $('.EndoscopeID').chosen({
                //     width: "100%",
                //     search_contains: true, //true-可根据中间字段模糊查询  
                //     no_results_text: "没有匹配结果"
                // });
            }
        })
    })
}