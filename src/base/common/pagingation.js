/*
* @Description: 初始化分页插件的js
* @Author: WangXin
* @Date: 2019-08-17 16:53:04
*/

/**
 * @description 动态渲染分页组件
 * @Author wangxin
 * @Date   2019-08-17
 * @param  {[string]}   selector  要渲染的选择器 如: '#aaa'
 * @param  {[number]}   total    总页码数  25
 * @param  {[number]}   size     每页数据的数量 5
 * @param  {[function]}   cab      回调函数 参数为当前的页码数
 * @return {[null]}            [description]
 */
function renderPagination(selector, total, size, cab) {
	// 先销毁原来的分页
	// $(selector).pagination('destroy')
    // 动态渲染分页
    $(selector).pagination({
        dataSource: function(done) {
            var result = [];
            for (var i = 1; i <= total; i++) {
                result.push(i);
            }

            done(result);
        },
        totalNumber: total,
        pageSize: size,
        // totalNumberLocator : function (res) {
        // },
        className: 'my-pagination',
        // alias: { // 请求别名
        //     pageNumber: 'pageNum',
        //     pageSize: 'limit'
        // },
        // showBeginingOnOmit: false, //是否在有省略号时显示开始页码
        prevText: '', // 上一页文本
        nextText: '', // '下一页' 的文本
        callback: function(data, pagination) {
            cab(pagination.pageNumber)
        }
    });
}

module.exports = {renderPagination}