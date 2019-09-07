/**
 * Created by Lee on 2019/7/17.
 */
import "./index.css"
//import 'echarts/dist/echarts.min.js'
import echarts from 'echarts'
import {baseUrl} from 'src@/base/config/index'
// import Common from '../base/common/index.js'
var utils = require('src@/base/utils/index.js')
import "src@/templates/head/head.css"
import "src@/templates/head/head.js"

console.log(baseUrl)

// var baseUrl="http://192.168.2.91:8080/"

var getWashUrl = baseUrl + "api/home/getWashData"; //请求洗消数据
var getHospitalInfectionUrl = baseUrl + "api/home/getHospitalInfectionData"; //请求院感数据
var getStoreroomUrl = baseUrl + "api/home/getStoreroomData"; //请求储藏室温湿度
var getRepairUrl = baseUrl + "api/home/getRepairData"; //请求报修数据
var getWashingPoolUrl = baseUrl + "api/home/getWashingPoolData"; //请求酶洗池数据

document.title = "总览"


// 洗消数据
function oneChart(){
    var sendData = {}
    utils.Request.ajaxHttpsRequest(getWashUrl, sendData, function (res) {
        if (res.code == 200) {
            console.log(res.data.length,156)
            if(res.data.length==0){
                var nohtml='<div class="nothingfont">暂无数据</div>'
                $('#onechart').html(nohtml);  
            }else{
                var titledata = []
                var piedata = []
                for(var i=0; i<res.data.length; i++){
                    titledata.push(res.data[i].name);
                    piedata.push({name:res.data[i].name,value:res.data[i].value});       
                }
                var myChart=echarts.init(document.getElementById('onechart'));	
                var	option = {
                    title : {
                        text: '洗消数据',
                        x:'right',
                        textStyle : {
                            color : '#fff',
                            fontSize : 18,
                            fontWeight : 'normal'
                        },
                        padding: [
                            15,  // 上
                            10, // 右
                            0,  // 下
                            0,
                        ]
                    },
                    
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 0,
                        top: 0,
                        textStyle:{
                            color: '#C4C4CD',
                            fontSize : 12,
                        },
                        data:titledata
                    },
                    color:['#317EFE', '#74A8FF','#ADCCFF','#76BBF4', '#40BFE6','#67D5F1','#ADCCFF','#5897FF'],
                    series: [
                        {
                            name: '洗消数据',
                            type: 'pie',
                            center: ['50%', '60%'],
                            radius: ['35%', '50%'],
                            minAngle:'15',
                            data:piedata,
                            label: {
                                show : false,
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                myChart.setOption(option);
            }
        }
    })
    
}
oneChart()

// 院感数据
function twoChart(){
    var sendData = {}
    utils.Request.getAjaxHttpsRequest(getHospitalInfectionUrl, sendData, function (res) {
        if (res.code == 200) {
            var titledata = []
            var piedata = []
            for(var i=0; i<res.data.length; i++){
                titledata.push(res.data[i].name);
                piedata.push({name:res.data[i].name,value:res.data[i].value});       
            }
            var myChart=echarts.init(document.getElementById('twochart'));	
            var	option = {
                title : {
                    text: '院感数据',
                    x:'right',
                    textStyle : {
                        color : '#fff',
                        fontSize : 18,
                        fontWeight : 'normal'
                    },
                    padding: [
                        15,  // 上
                        10, // 右
                        0,  // 下
                        0,
                    ]
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 0,
                    top: 0,
                    textStyle:{
                        color: '#C4C4CD',
                        fontSize : 12,
                    },
                    data:titledata
                },
                color:['#317EFE', '#74A8FF','#ADCCFF','#76BBF4', '#40BFE6','#67D5F1','#ADCCFF','#5897FF'],
                series: [
                    {
                        name: '院感数据',
                        type: 'pie',
                        center: ['45%', '60%'],
                        radius : '50%',
                        minAngle:'15',
                        data: piedata,
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#99b8dd'  // 改变标示文字的颜色
                                }
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
        }
    })
    
}
twoChart()

// 报修折线图数据
function fourChart(){
    var yeardate = $('#yeardate').find("option:selected").text();
    var sendData = {
        date:yeardate
    }
    utils.Request.ajaxHttpsRequest(getRepairUrl, sendData, function (res) {
        if (res.code == 200) {
            var linedata = res.data
            var myChart=echarts.init(document.getElementById('fourchart'));	
            var	option = {
                title : {
                    text: '月份报修分布图折线',
                    x:'left',
                    textStyle : {
                        color : '#fff',
                        fontSize : 18,
                        fontWeight : 'normal'
                    },
                    padding: [
                        15,  // 上
                        0, // 右
                        0,  // 下
                        140,
                    ]
                },
                tooltip: {
                    trigger: 'axis'
                },
                color:['#317EFE'],
                grid: {
                    left: '5%',
                    right: '5%',
                    top: '70',
                    bottom: '20',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                    axisLabel: {
                        formatter: '{value}',
                        color:'#C4C4CD',
                        fontSize : 14,
                        align:'center',
                        padding:[5, 0, 0, 0]
                    },
                    axisLine: {
                        show: true,
                        lineStyle:{
                            color: '#2F3348'
                        }
                    },
                    axisTick: {
                        show: true,
                        lineStyle:{
                            color: '#373C53'
                        }
                    }
                },
                yAxis:{
                    type: 'value',
                    name: '',
                    nameTextStyle:{
                        color: "#317EFE",
                        fontSize : 12,
                    },
                    interval: 1000,
                    axisLabel: {
                        formatter: '{value}',
                        color:'#C4C4CD',
                        fontSize : 14,
                    },
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        show: true,
                        lineStyle:{
                            color: '#2F3348'
                        }
                    },
                },
                series: [
                    {
                        name:'月份报修分布图折线',
                        type:'line',
                        lineStyle:{
                            color:'#317EFE'
                        },
                        smooth: true,
                        stack: '总量',
                        data:linedata
                    }
                ]
            };
            
            myChart.setOption(option);
        }
    })
    
    
    
}
fourChart()
// 报修折线图切换数据数据
$("#yeardate").change(function(){
    fourChart();
})

// 储藏室数据
function threeChart(){   
    var tnum = 1;
    var ccsnum = 0; 
    var sendData = {
        id:ccsnum,
        date:tnum
    }
    utils.Request.ajaxHttpsRequest(getStoreroomUrl, sendData, function (res) {
        if (res.code == 200) {
            var namelegth = res.data.temperature.length
            // x轴坐标
            if(namelegth==7){
                var xaxisStr = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
            }else if(namelegth==12){
                var xaxisStr = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }else if(namelegth==24){
                var xaxisStr = ['0h','1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18h','19h','20h','21h','22h','23h']
            }else if(namelegth==28){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28']
            }else if(namelegth==29){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29']
            }else if(namelegth==30){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']
            }else if(namelegth==31){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
            }
            //温度值
            var temperatureStr = res.data.temperature;       
            //湿度值
            var humidityStr = res.data.humidity;       


        }
        var myChart=echarts.init(document.getElementById('threechart'));
        var	option = {
            title : {
                text: '储藏室温湿度',
                x:'center',
                textStyle : {
                    color : '#fff',
                    fontSize : 18,
                    fontWeight : 'normal'
                },
                padding: [
                    15,  // 上
                    0, // 右
                    0,  // 下
                    0,
                ]
            },
            tooltip: {
                trigger: 'axis'
            },
            color:['#317EFE','#40BFE6'],
            legend: {
                show:false
            },
            grid: {
                left: '5%',
                right: '5%',
                top: '110',
                bottom: '20',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xaxisStr,
                axisLabel: {
                    formatter: '{value}',
                    rotate:"45",
                    interval:0,
                    color:'#C4C4CD',
                    fontSize : 14,
                    align:'center',
                    padding:[5, 0, 0, 0]
                },
                axisLine: {
                    show: true,
                    lineStyle:{
                        color: '#2F3348'
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle:{
                        color: '#373C53'
                    }
                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: '温度',
                    min: 0,
                    max: 100,
                    nameTextStyle:{
                        color: "#317EFE",
                        fontSize : 12,
                    },
                    interval: 20,
                    axisLabel: {
                        formatter: '{value}°',
                        color:'#C4C4CD',
                        fontSize : 14,
                    },
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        show: true,
                        lineStyle:{
                            color: '#2F3348'
                        }
                    },
                },
                {
                    type: 'value',
                    name: '湿度',
                    min: 0,
                    max: 120,
                    nameTextStyle:{
                        color: "#40BFE6",
                        fontSize : 12,
                    },
                    interval: 20,
                    axisLabel: {
                        formatter: '{value}°',
                        color:'#C4C4CD',
                        fontSize : 14,
                    },
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        show: false
                    },
                }
            ],
            series: [
                {
                    name:'温度折线图',
                    type:'line',
                    lineStyle:{
                        color:'#317EFE'
                    },
                    smooth: true,
                    stack: '温度',
                    data:temperatureStr
                },
                {
                    name:'湿度折线图',
                    type:'line',
                    lineStyle:{
                        color:'#40BFE6'
                    },
                    smooth: true,
                    stack: '湿度',
                    yAxisIndex: 1,
                    data:humidityStr
                }
            ]
        };
        
        myChart.setOption(option);
    })
      
}
function threetab(){
    var sendData = {
        id:0,
        date:1
    }
    utils.Request.ajaxHttpsRequest(getStoreroomUrl, sendData, function (res) {
        if (res.code == 200) {
            // 表头储藏室list
            var ccsList = ''
            if(res.data.titlelist==null){
                var noccsList = '<div class="nothingfont">暂无数据</div>'
                $('#threechart').html(noccsList);                 
            }else{
                res.data.titlelist.forEach(function (item,index) {
                    ccsList += `
                                <span class="${index==0?'on':''}" data-id="${item.storeroomId}">${item.storeroomName}</span>
                                `
                })
                $('#ccstitle').html(ccsList); 
            }
            

            
        }
    })
    
    
}
threetab();
threeChart();
$(document).on('click','#ccstitle>span',function(){
    $("#ccstitle").find('span').removeClass('on');
    $(this).addClass('on');
    $('#ccstime>span:first-child').click();
    
    
})
$('#ccstime>span').click(function(){
    $(this).addClass('on').siblings('span').removeClass('on');
    var tnum = $('#ccstime>span.on').index()+1;
    var ccsnum =$('#ccstitle>span.on').attr('data-id');
    var sendData = {
        id:ccsnum,
        date:tnum
    }
    console.log(sendData,11)
    utils.Request.ajaxHttpsRequest(getStoreroomUrl, sendData, function (res) {
        if (res.code == 200) {
            var namelegth = res.data.temperature.length
            // x轴坐标
            if(namelegth==7){
                var xaxisStr = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
            }else if(namelegth==12){
                var xaxisStr = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }else if(namelegth==24){
                var xaxisStr = ['0h','1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18h','19h','20h','21h','22h','23h']
            }else if(namelegth==28){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28']
            }else if(namelegth==29){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29']
            }else if(namelegth==30){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']
            }else if(namelegth==31){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
            }
            //温度值
            var temperatureStr = res.data.temperature;       
            //湿度值
            var humidityStr = res.data.humidity;       


        }
        var myChart=echarts.init(document.getElementById('threechart'));
        var	option = {
            title : {
                text: '储藏室温湿度',
                x:'center',
                textStyle : {
                    color : '#fff',
                    fontSize : 18,
                    fontWeight : 'normal'
                },
                padding: [
                    15,  // 上
                    0, // 右
                    0,  // 下
                    0,
                ]
            },
            tooltip: {
                trigger: 'axis'
            },
            color:['#317EFE','#40BFE6'],
            legend: {
                show:false
            },
            grid: {
                left: '5%',
                right: '5%',
                top: '110',
                bottom: '20',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xaxisStr,
                axisLabel: {
                    formatter: '{value}',
                    rotate:"45",
                    interval:0,
                    color:'#C4C4CD',
                    fontSize : 14,
                    align:'center',
                    padding:[5, 0, 0, 0]
                },
                axisLine: {
                    show: true,
                    lineStyle:{
                        color: '#2F3348'
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle:{
                        color: '#373C53'
                    }
                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: '温度',
                    min: 0,
                    max: 100,
                    nameTextStyle:{
                        color: "#317EFE",
                        fontSize : 12,
                    },
                    interval: 20,
                    axisLabel: {
                        formatter: '{value}°',
                        color:'#C4C4CD',
                        fontSize : 14,
                    },
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        show: true,
                        lineStyle:{
                            color: '#2F3348'
                        }
                    },
                },
                {
                    type: 'value',
                    name: '湿度',
                    min: 0,
                    max: 120,
                    nameTextStyle:{
                        color: "#40BFE6",
                        fontSize : 12,
                    },
                    interval: 20,
                    axisLabel: {
                        formatter: '{value}°',
                        color:'#C4C4CD',
                        fontSize : 14,
                    },
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        show: false
                    },
                }
            ],
            series: [
                {
                    name:'温度折线图',
                    type:'line',
                    lineStyle:{
                        color:'#317EFE'
                    },
                    smooth: true,
                    stack: '温度',
                    data:temperatureStr
                },
                {
                    name:'湿度折线图',
                    type:'line',
                    lineStyle:{
                        color:'#40BFE6'
                    },
                    smooth: true,
                    stack: '湿度',
                    yAxisIndex: 1,
                    data:humidityStr
                }
            ]
        };
        
        myChart.setOption(option);
    })

    
    
})
window.onload=function(){ document.getElementById("ccstime").children[0].click()}



// 霉洗池数据
function fiveChart(){
    var tnum = 1;
    var ccsnum = 0;
    var sendData = {
        id:ccsnum,
        date:tnum
    }
    utils.Request.ajaxHttpsRequest(getWashingPoolUrl, sendData, function (res) {
        console.log(res,123)
        if (res.code == 200) {
            // x轴坐标
            var namelegth = res.data.temperature.length
            // x轴坐标
            if(namelegth==7){
                var xaxisStr = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
            }else if(namelegth==12){
                var xaxisStr = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }else if(namelegth==24){
                var xaxisStr = ['0h','1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18h','19h','20h','21h','22h','23h']
            }else if(namelegth==28){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28']
            }else if(namelegth==29){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29']
            }else if(namelegth==30){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']
            }else if(namelegth==31){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
            }
            //温度值
            var temperatureStr = res.data.temperature;             
        }
        var myChart=echarts.init(document.getElementById('fivechart'));	
        var	option = {
            title : {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            color:['#317EFE','#40BFE6'],
            grid: {
                left: '5%',
                right: '5%',
                top: '110',
                bottom: '20',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data:xaxisStr,
                axisLabel: {
                    formatter: '{value}',
                    rotate:"45",
                    interval:0,
                    color:'#C4C4CD',
                    fontSize : 14,
                    align:'center',
                    padding:[5, 0, 0, 0]
                },
                axisLine: {
                    show: true,
                    lineStyle:{
                        color: '#2F3348'
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle:{
                        color: '#373C53'
                    }
                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: '温度',
                    min: 0,
                    max: 100,
                    nameTextStyle:{
                        color: "#317EFE",
                        fontSize : 12,
                    },
                    interval: 20,
                    axisLabel: {
                        formatter: '{value}°',
                        color:'#C4C4CD',
                        fontSize : 14,
                    },
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        show: true,
                        lineStyle:{
                            color: '#2F3348'
                        }
                    },
                }
            ],
            series: [
                {
                    name:'温度折线图',
                    type:'line',
                    lineStyle:{
                        color:'#317EFE'
                    },
                    smooth: true,
                    stack: '温度量',
                    areaStyle: {},
                    data:temperatureStr
                }
            ]
        };
        
        myChart.setOption(option);
    })
      
}
function fivetab(){
    var sendData = {
        id:0,
        date:1
    }
    utils.Request.ajaxHttpsRequest(getWashingPoolUrl, sendData, function (res) {
        if (res.code == 200) {
            // 表头储藏室list
            var xmcList = ''
            if(res.data.titlelist==null){
                var noxmcList = '<div class="nothingfont">暂无数据</div>'
                $('#fivechart').html(noxmcList);                 
            }else{
                res.data.titlelist.forEach(function (item,index) {
                    xmcList += `
                            <span class="${index==0?'on':''}" data-id="${item.iD}">${item.name}</span>
                            `
                })
                $('#xmctitle').html(xmcList); 
            }
        }
    })
    
    
}
fivetab();
fiveChart();
$(document).on('click','#xmctitle>span',function(){
    $("#xmctitle").find('span').removeClass('on');
    $(this).addClass('on');
    $('#xmctime>span:first-child').click();
    
    
})
$('#xmctime>span').click(function(){
    $(this).addClass('on').siblings('span').removeClass('on');
    var tnum = $('#xmctime>span.on').index()+1;
    var ccsnum =$('#xmctitle>span.on').attr('data-id');
    var sendData = {
        id:ccsnum,
        date:tnum
    }
    console.log(sendData)
    utils.Request.ajaxHttpsRequest(getWashingPoolUrl, sendData, function (res) {
        console.log(res,44)
        if (res.code == 200) {
            // x轴坐标
            var namelegth = res.data.temperature.length
            // x轴坐标
            if(namelegth==7){
                var xaxisStr = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
            }else if(namelegth==12){
                var xaxisStr = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }else if(namelegth==24){
                var xaxisStr = ['0h','1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18h','19h','20h','21h','22h','23h']
            }else if(namelegth==28){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28']
            }else if(namelegth==29){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29']
            }else if(namelegth==30){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']
            }else if(namelegth==31){
                var xaxisStr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
            }
            //温度值
            var temperatureStr = res.data.temperature;             
        }
        var myChart=echarts.init(document.getElementById('fivechart'));	
        var	option = {
            title : {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            color:['#317EFE','#40BFE6'],
            grid: {
                left: '5%',
                right: '5%',
                top: '110',
                bottom: '20',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data:xaxisStr,
                axisLabel: {
                    formatter: '{value}',
                    rotate:"45",
                    interval:0,
                    color:'#C4C4CD',
                    fontSize : 14,
                    align:'center',
                    padding:[5, 0, 0, 0]
                },
                axisLine: {
                    show: true,
                    lineStyle:{
                        color: '#2F3348'
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle:{
                        color: '#373C53'
                    }
                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: '温度',
                    min: 0,
                    max: 100,
                    nameTextStyle:{
                        color: "#317EFE",
                        fontSize : 12,
                    },
                    interval: 20,
                    axisLabel: {
                        formatter: '{value}°',
                        color:'#C4C4CD',
                        fontSize : 14,
                    },
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        show: true,
                        lineStyle:{
                            color: '#2F3348'
                        }
                    },
                }
            ],
            series: [
                {
                    name:'温度折线图',
                    type:'line',
                    lineStyle:{
                        color:'#317EFE'
                    },
                    smooth: true,
                    stack: '温度量',
                    areaStyle: {},
                    data:temperatureStr
                }
            ]
        };
        
        myChart.setOption(option);
    })
    
    
})
window.onload=function(){ document.getElementById("xmctime").children[0].click()}

$(document).on("click", ".xxsjchartmod", function () {
    window.open("./zonglan-detail1.html");
});
$(document).on("click", ".ygjcchartmod", function () {
    window.open("./yuanganjiance.html");
});

