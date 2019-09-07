/**
 * Created by WangXin on 2019/8/13
 */
const My_layer = {}

My_layer.containerClick = function () {
    // alert(123)
    $('.my-layer-container').remove()
}

My_layer.confirm = function (word,option,sureCab, cancelCab) {

    let htmlStr = `
        <div class="my-layer-container my-layer-confirm-container">
            <div class="my-layer-box">
                <span class="my-layer-close">×</span>
                <span class="my-layer-word">${word}</span>
                <div class="my-layer-btn-box">
                    <span class="my-layer-btn my-layer-sure-cancel-btn">取消</span>
                    <span class="my-layer-btn my-layer-sure-btn">确定</span>
                </div>
            </div>
        </div>
    `
    $('html').append(htmlStr)

    // 点击取消按钮
    $('.my-layer-sure-cancel-btn').click(function (e) {
        cancelCab&&cancelCab()
        $('.my-layer-confirm-container').remove()
        e.stopPropagation()
    })
    
    // 点击确定的回调
    $('.my-layer-sure-btn').click(function (e) {
        sureCab&&sureCab()
        $('.my-layer-confirm-container').remove()
        e.stopPropagation()
    })

    // 点击X关闭
    $('.my-layer-close').click(function (e) {
        $('.my-layer-confirm-container').remove()
        e.stopPropagation()
    })

    // 点击遮罩层关闭
    $('.my-layer-confirm-container').click(function() {
        if (option.showClick != false) {
            $(this).remove()
        }
    })
    // 阻止事件冒泡
    $('.my-layer-box').click(function (e) {
        e.stopPropagation()
    })
}

My_layer.closeAll = function () {
    $('.my-layer-container').remove()
}
export {
    My_layer
}