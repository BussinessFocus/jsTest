/*
 * @Description: 维修页面的技术文件
 * @Author: WangXin
 * @Date: 2019-08-14 17:19:43
 */

require('layui-layer')
// 引入分页插件
require('paginationjs/dist/pagination.css')
require('paginationjs')
var Pagination = require('../../base/common/pagingation.js')

// 引入搜索下拉框插件
require('@/lib/chosen_v1.8.7/chosen.jquery.js')
require('@/lib/chosen_v1.8.7/chosen.css')

// 引入头部
import 'src@/templates/head/head.js'
// 引入公共的css文件
require('src@/templates/head/common.css')

var utils = require('src@/base/utils/index')
// console.log(utils)


// 引入基础的路径
import { baseUrl } from 'src@/base/config/index.js'
// var baseUrl = 'http://192.168.2.93:8080/'

// 引入样式表
import './index.less'

var addDataUrl = baseUrl + '/api/repair/add' //  添加报修的地址
var getStstusCountUrl = baseUrl + '/api/repair/getStstusCount' // 获取各种状态数据的条数
var queryRepairDataUrl = baseUrl + '/api/repair/getDataByPage' // 分页获取报修数据
var editDataUrl = baseUrl + '/api/repair/edit' // 修改镜子状态的地址
var getAllEndoscopeurl = baseUrl + '/api/getAllEndoscope' // 查询所有未报修镜子


document.title = "维修"
queryStatusCount()

// 点击tab区域的按钮
var currentDataStauts = 1
$('.tab-div').click(function() {
    $('#search-mirrorNo-input').val("")
    currentDataStauts = $(this).attr('data-status')
    $('.tab-div').removeClass('active')
    $(this).addClass('active')
    renderTableHeader(currentDataStauts)
    let sendData1 = {
        status: currentDataStauts,
        pageNo: 1,
        pageSize: 5
    }
    utils.Request.ajaxHttpsRequest(queryRepairDataUrl, sendData1, function(res) {
        if (res.code == 200) {
            renderTableData('tbody', res.data.body, currentDataStauts)
            Pagination.renderPagination('#pagingation', res.data.total, 5, function(pageNumber) {
                let sendData = {
                    status: currentDataStauts,
                    pageNo: pageNumber,
                    pageSize: 5
                }
                utils.Request.ajaxHttpsRequest(queryRepairDataUrl, sendData, function(res1) {
                    renderTableData('tbody', res1.data.body, currentDataStauts)
                    if (res1.data.total == 0) {
                        let noDataStr = '<tr><td colspan="5">当前暂无数据</td></tr>'
                        $('tbody').html(noDataStr)
                        $('#pagingation').pagination('destroy')
                    }
                })
            })
        }
    })
})
$('.tab-div.active').click()

// 点击每一行数据 页面跳转总览详情2页面
$('body').on('click', 'tbody tr', function() {
    let info = JSON.parse($(this).children('.operation').attr('data-info'))
    console.log(info)
    sessionStorage.setItem('sourceCount', 1)
    sessionStorage.setItem('TaskID', info.endoscopeNo)
    sessionStorage.setItem('TaskNum', info.endoscopeCode)
    open('./zonglan-detail2.html')
})
// 阻止事件冒泡
$('body').on('click', 'tbody tr .operation', function(event) {
    event.stopPropagation()
})

// 点击添加按钮 显示添加模态框
$('.add-btn').click(function() {
    $('#name').val(sessionStorage.getItem('nick'))
    $('#add-modal').modal('show')
    renderSelectOpt()
    $("#endoscope").chosen({
        width: "350",
        search_contains: true, //true-可根据中间字段模糊查询  
        no_results_text: "没有匹配结果"
    })
})
$('.add-sure-btn').click(function(event) {
    let sendData = {
        endoscope: $.trim($('#endoscope').val()),
        name: $.trim($('#name').val()),
        remark: $.trim($('#remark').val())
    }
    if (sendData.endoscope == '') {
        layer.msg('请输入编号')
        return
    }
    if (sendData.name == '') {
        layer.msg('请输入报修人')
        return
    }

    utils.Request.ajaxHttpsRequest(addDataUrl, sendData, function(res) {
        if (res.code == 200) {
            queryStatusCount()
            if (currentDataStauts == 1) {
                $('.tab-div.active').click()
            }
            $('#add-modal').modal('hide')
            layer.msg('添加报修成功')
            $('#add-modal input').val('')
        } else {
            layer.msg(res.msg)
        }
    })
})

// 点击搜索按钮
$('.search-btn').click(function(event) {
    /* Act on the event */
    let sendData2 = {
        status: currentDataStauts,
        pageNo: 1,
        pageSize: 5,
        mirrorNo: $.trim($('#search-mirrorNo-input').val())
    }
    if (sendData2.mirrorNo == '') {
        layer.msg('请输入搜索的镜子编号')
        return
    }
    utils.Request.ajaxHttpsRequest(queryRepairDataUrl, sendData2, function(res) {
        if (res.code == 200) {
            renderTableData('tbody', res.data.body, currentDataStauts)
            Pagination.renderPagination('#pagingation', res.data.total, 5, function(pageNumber) {
                let sendData = {
                    status: currentDataStauts,
                    pageNo: pageNumber,
                    pageSize: 5,
                    mirrorNo: $('#search-mirrorNo-input').val()
                }
                utils.Request.ajaxHttpsRequest(queryRepairDataUrl, sendData, function(res1) {
                    renderTableData('tbody', res1.data.body, currentDataStauts)
                    if (res1.data.total == 0) {
                        let noDataStr = '<tr><td colspan="5">当前暂无数据</td></tr>'
                        $('tbody').html(noDataStr)
                        $('#pagingation').pagination('destroy')
                    }
                })
            })


        }
    })
})

// 点击修维修按钮
var tempThis = null
$('body').on('click', '.repair-btn', function() {
    $('.current-account').val(sessionStorage.getItem('nick'))
    $('#repair-modal').modal('show')
    tempThis = this
})
$('.repair-sure-btn').click(function(event) {
    let sendData = {
        id: $(tempThis).parent().attr('data-id'),
        status: 2,
        sign: $('.receivesign-input').val(),
        peopleName: sessionStorage.getItem('nick')
    }
    utils.Request.ajaxHttpsRequest(editDataUrl, sendData, function(res) {
        if (res.code == 200) {
            $(tempThis).parents('tr').remove()
            queryStatusCount()
            $('#repair-modal').modal('hide')
        }
    })
})

// 点击报废按钮
$('body').on('click', '.scrap-btn', function() {
    $('.current-account').val(sessionStorage.getItem('nick'))
    $('#scrap-modal').modal('show')
    tempThis = this
})
$('.scrap-sure-btn').click(function(event) {
    let sendData = {
        id: $(tempThis).parent().attr('data-id'),
        status: 4,
        sign: $('.scrapsign-input').val(),
        peopleName: sessionStorage.getItem('nick')
    }
    utils.Request.ajaxHttpsRequest(editDataUrl, sendData, function(res) {
        if (res.code == 200) {
            $(tempThis).parents('tr').remove()
            queryStatusCount()
            $('#scrap-modal').modal('hide')
        }
    })
})

// 点击修复按钮
$('body').on('click', '.xiufu-btn', function() {
    $('.current-account').val(sessionStorage.getItem('nick'))
    $('#xiufu-modal').modal('show')
    tempThis = this
})
$('.xiufu-sure-btn').click(function(event) {
    let sendData = {
        id: $(tempThis).parent().attr('data-id'),
        status: 3,
        sign: $('.repairtsign-input').val(),
        peopleName: sessionStorage.getItem('nick')
    }
    utils.Request.ajaxHttpsRequest(editDataUrl, sendData, function(res) {
        if (res.code == 200) {
            $(tempThis).parents('tr').remove()
            queryStatusCount()
            $('#xiufu-modal').modal('hide')
        }
    })
})

// 点击详情按钮
$('body').on('click', '.detail-btn', function() {
    let itemInfo = JSON.parse($(this).parent().attr('data-info'))
    $('.statusStr').text($(this).parent().attr('data-statusstr'))
    console.log(itemInfo)
    Object.keys(itemInfo).forEach(key => {
        $('.show-' + key).text(itemInfo[key] ? itemInfo[key] : '---')
        if (key == 'reporttime') {
            $('.show-' + key).text(itemInfo[key] ? utils.Time.formatterDate(new Date(itemInfo[key])) : '---')
        }
        if (key == 'receivetime') {
            $('.show-receivetime').text(itemInfo['receivetime'].split(' ')[0])
        }
        if (key == 'repairtime') {
            $('.show-repairtime').text(itemInfo['repairtime'].split(' ')[0])
        }
        if (key == 'scraptime') {
            $('.show-scraptime').text(itemInfo['scraptime'].split(' ')[0])
        }
    })
    let currentStatus = $(this).parent().attr('data-status')
    if (currentStatus == 1) {
        $('#detail-modal').modal('show')
    } else if (currentStatus == 2) {
        $('#detail-modal2').modal('show')
    } else if (currentStatus == 3) {
        $('#detail-modal3').modal('show')
    } else if (currentStatus == 4) {
        $('#detail-modal4').modal('show')
    }
})



/**
 * @Description 请求各种状态的数据的数量的方法
 * @Author      wangxin
 * @Date        2019-08-20
 * @return      {null}   [description]
 */
function queryStatusCount() {
    utils.Request.getAjaxAsyncHttpsRequest(getStstusCountUrl, {}, function(res) {
        if (res.code == 200) {
            Object.keys(res.data).forEach(key => {
                $('.count-' + key).text('(' + res.data[key] + ')')
            })
        }
    })
}

/**
 * @Description 动态渲染表格表头的方法
 * @Author      王新
 * @Date        2019-08-27
 * @param       {[number]}   status [要渲染的状态值] 1,2,3,4,5
 * @return      {[null]}    
 */
function renderTableHeader(status) {
    if (status == 1) {
        let htmlStr = `
             <tr>
                <th>编号</th>
                <th>报修日期</th>
                <th>报修人</th>
                <th>备注</th>
                <th>操作</th>
            </tr>
        `
        $('thead').html(htmlStr)
    } else if (status == 2) {
        let htmlStr = `
             <tr>
                <th>编号</th>
                <th>维修日期</th>
                <th>维修人</th>
                <th>备注</th>
                <th>操作</th>
            </tr>
        `
        $('thead').html(htmlStr)
    } else if (status == 3) {
        let htmlStr = `
             <tr>
                <th>编号</th>
                <th>修复日期</th>
                <th>修复人</th>
                <th>备注</th>
                <th>操作</th>
            </tr>
        `
        $('thead').html(htmlStr)
    } else if (status == 4) {
        let htmlStr = `
             <tr>
                <th>编号</th>
                <th>报废日期</th>
                <th>报废人</th>
                <th>备注</th>
                <th>操作</th>
            </tr>
        `
        $('thead').html(htmlStr)
    } else if (status == 5) {
        let htmlStr = `
             <tr>
                <th>编号</th>
                <th>报修日期</th>
                <th>报修人</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        `
        $('thead').html(htmlStr)
    } else {
        renderTableHeader(1)
    }
}

/**
 * @Description 动态渲染表格数据的方法
 * @Author      wangxin
 * @Date        2019-08-17
 * @param       {[string]}   selector 要渲染的选择器 如'body'
 * @param       {[array]}   dataArr   要进行渲染的数据 
 * @param       {[number]}   status   要渲染数据的状态类型 
 * @return      {[nyull]}            [description]
 */
function renderTableData(selector, dataArr, status) {
    let htmlStr = ''
    dataArr.forEach(v => {
        // 根据不同状态值 显示不同的内容 
        let statusStr = ''
        switch (v.status - 0) {
            case 1:
                statusStr = '已报修'
                break;
            case 2:
                statusStr = '维修中'
                break;
            case 3:
                statusStr = '已修复'
                break;
            case 4:
                statusStr = '已报废'
                break;
            case 5:
                statusStr = '全部'
                break;
            default:
                statusStr = '未定义'
                break;
        }

        if (status == 1) {
            htmlStr += `
                <tr>
                    <td>${v.endoscopeCode}</td>
                    <td>${utils.Time.formatterDate(new Date(v.reporttime))}</td>
                    <td>${v.reporter}</td>
                    <td>${v.remark?v.remark:'---'}</td>
                    <td class="operation" data-id="${v.repairId}" data-status="${v.status}" data-info='${JSON.stringify(v)}' data-statusstr="${statusStr}">
                        <span class="repair-btn ${v.status==2||v.status==4||v.status==3?'hid':''}">维修</span>
                        <span class="xiufu-btn ${v.status==1||v.status==4||v.status==3?'hid':''}">修复</span>
                        <span class="scrap-btn ${v.status==4||v.status==3?'hid':''}">报废</span>
                        <span class="detail-btn">详情</span>
                    </td>
                </tr>
            `
        } else if (status == 2) {
            htmlStr += `
                <tr>
                    <td>${v.endoscopeCode}</td>
                    <td>${utils.Time.formatterDate(new Date(v.receivetime))}</td>
                    <td>${v.receiver}</td>
                    <td>${v.receivesign?v.receivesign:'---'}</td>
                    <td class="operation" data-id="${v.repairId}" data-status="${v.status}" data-info='${JSON.stringify(v)}' data-statusstr="${statusStr}">
                        <span class="repair-btn ${v.status==2||v.status==4||v.status==3?'hid':''}">维修</span>
                        <span class="xiufu-btn ${v.status==1||v.status==4||v.status==3?'hid':''}">修复</span>
                        <span class="scrap-btn ${v.status==4||v.status==3?'hid':''}">报废</span>
                        <span class="detail-btn">详情</span>
                    </td>
                </tr>
            `
        } else if (status == 3) {
            htmlStr += `
                <tr>
                    <td>${v.endoscopeCode}</td>
                    <td>${utils.Time.formatterDate(new Date(v.repairtime))}</td>
                    <td>${v.repairter}</td>
                    <td>${v.repairtsign?v.repairtsign:'---'}</td>
                    <td class="operation" data-id="${v.repairId}" data-status="${v.status}" data-info='${JSON.stringify(v)}' data-statusstr="${statusStr}">
                        <span class="repair-btn ${v.status==2||v.status==4||v.status==3?'hid':''}">维修</span>
                        <span class="xiufu-btn ${v.status==1||v.status==4||v.status==3?'hid':''}">修复</span>
                        <span class="scrap-btn ${v.status==4||v.status==3?'hid':''}">报废</span>
                        <span class="detail-btn">详情</span>
                    </td>
                </tr>
            `
        } else if (status == 4) {
            htmlStr += `
                <tr>
                    <td>${v.endoscopeCode}</td>
                    <td>${utils.Time.formatterDate(new Date(v.scraptime))}</td>
                    <td>${v.scraper}</td>
                    <td>${v.scrapsign?v.scrapsign:'---'}</td>
                    <td class="operation" data-id="${v.repairId}" data-status="${v.status}" data-info='${JSON.stringify(v)}' data-statusstr="${statusStr}">
                        <span class="repair-btn ${v.status==2||v.status==4||v.status==3?'hid':''}">维修</span>
                        <span class="xiufu-btn ${v.status==1||v.status==4||v.status==3?'hid':''}">修复</span>
                        <span class="scrap-btn ${v.status==4||v.status==3?'hid':''}">报废</span>
                        <span class="detail-btn">详情</span>
                    </td>
                </tr>
            `
        } else if (status == 5) {
            htmlStr += `
                <tr>
                    <td>${v.endoscopeCode}</td>
                    <td>${utils.Time.formatterDate(new Date(v.reporttime))}</td>
                    <td>${v.reporter}</td>
                    <td>${statusStr}</td>
                    <td class="operation" data-id="${v.repairId}" data-status="${v.status}" data-info='${JSON.stringify(v)}' data-statusstr="${statusStr}">
                        <span class="repair-btn ${v.status==2||v.status==4||v.status==3?'hid':''}">维修</span>
                        <span class="xiufu-btn ${v.status==1||v.status==4||v.status==3?'hid':''}">修复</span>
                        <span class="scrap-btn ${v.status==4||v.status==3?'hid':''}">报废</span>
                        <span class="detail-btn">详情</span>
                    </td>
                </tr>
            `
        }

    })
    $(selector).html(htmlStr)
}

// 渲染添加模态框下拉框
function renderSelectOpt() {
    utils.Request.getAjaxAsyncHttpsRequest(getAllEndoscopeurl, {}, function(res1) {
        if (res1.code == 200) {
            var htmlStr3 = ''
            res1.data.forEach(v => {
                htmlStr3 += `<option value="${v.iD}">${v.eq}-${v.code}</option>`
            })
            $('#endoscope').html(htmlStr3)
        }
    })
}