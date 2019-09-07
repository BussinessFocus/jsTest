/**
 * Created by Lee on 2019/3/13.
 */
// var arr = [1,2,3];
// sum = arr.reduce(function (prev, cur, index, arr) {
//     console.log(prev, cur, index);//输出的是第一项的值或上一次叠加的结果，正在被处理的元素，正在被处理的元素的索引值
//     return prev + cur;
// })
// console.log(arr, sum); //输入数组本身和最后的结果

data = {a:1,b:2,c:3};
expr = ['c'];
dataRes = expr.reduce((pre,next)=>{
    return pre[next];
},data);
console.log(dataRes);
