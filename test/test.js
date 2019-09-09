/**
 * Created by Lee on 2019/9/7.
 */


/**
 * 剪切姓名，只保留姓其余以*显示
 * @param str
 * @returns {string}
 */
function curtName(str) {
    return str.slice(0, 1) + new Array(str.length).join('*');
}

/**
 * js截取字符串，中英文都能用,中文一个字符占2位，如果截取长度小于字符串实际长度则以…结尾
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 * @return 截取后的字符串
 */
function cutstr(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            if (str_len * 2 > len) {
                str_cut = str_cut.concat("...");
            }
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length <= len) {
        return str;
    }
}