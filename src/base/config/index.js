
// 判断传输协议是http还是https
let protocol = 'http://'

if (location.protocol == "https:") { 
    protocol = 'https://'
}

let baseUrl = "";//接口基地址

//开发环境下的配置
if(HTTP_ENV === 'development'){
    baseUrl = "192.168.2.91:8080/";
}

//测试环境下的配置
if(HTTP_ENV === 'test'){
    baseUrl = "192.168.2.91:8080/";
}

//生产环境下的配置
if(HTTP_ENV === 'production'){
    baseUrl = "192.168.2.91:8080/";
}

baseUrl = protocol + baseUrl;

export {baseUrl};