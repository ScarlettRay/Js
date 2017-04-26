/**
 * Created by Ray on 2017/4/26.
 */
//数据字典
var dataDitionary2 = {
    urls: {
        unfollow: "http://weibo.com/aj/f/unfollow?ajwvr=6&__rnd=1493186279517", //取消关注的url
        followPage:"http://weibo.com/p/1005055945738590/myfollow?t=1" //关注页的url,翻页用
    },
    uids: new Array,  //保存用户的id
    unfollowNum:100, //取消关注的人数
    curPage: null
}
/**
 * 操作函数
 */
function unfollowing() {
    if(sessionStorage.unfollowNum<dataDitionary2.uids.length) {//不能超过取关数
        dataDitionary2.uids = dataDitionary2.uids.splice(0, sessionStorage.unfollowNum);
    }
        var form = createForm({"uid": dataDitionary2.uids.join(","), "refer_flag": "unfollow_all", "_t": 0});
        aj_toFollow_reply(dataDitionary2.urls.unfollow, form, unfollow_callback);
}
/**
 * 取消关注的回调函数
 * @param result
 */
function unfollow_callback(result){
    if(result.code==100000){
            console.log("取消关注了："+dataDitionary2.uids.length+"人");
    }else{
        //Skip
    }
    sessionStorage.unfollowNum=sessionStorage.unfollowNum-dataDitionary2.uids.length;
//    dataDitionary2.uids.splice(0,dataDitionary2.uids.length);//数组清空
    if(dataDitionary2.curPage-1>0){
        changePage(dataDitionary2.curPage-1) //翻页
    }

}
function getUid() {
    var lis = $(".member_ul.clearfix").children();
    for (var i = 0; i < lis.length; i++) {
        if (lis[i].getAttribute("action-data").indexOf("uid") > -1) {
            var attrValue = lis[i].getAttribute("action-data");
            var start = attrValue.indexOf("=") + 1;
            var end = attrValue.indexOf("&");
            dataDitionary2.uids.push(attrValue.slice(start, end));
        }
    }
}
/**
 * 创造form表单
 * @param jsonData Json格式的参数
 * @returns {Form}
 */
function createForm(jsonData) {
    var form = new FormData;
    for (var attr in jsonData) {
        form.append(attr, jsonData[attr]);
    }
    return form;
}
/**
 * 翻页函数
 */
function changePage(pageMun){
        window.location=dataDitionary2.urls.followPage+"&Pl_Official_RelationMyfollow__93_page="+pageMun;
}
// //启动函数(方法1 废弃)
// function unfollowStart(){
//     var pages=$(".page.S_txt1").slice(1,$(".page.S_txt1").length-1);
//     var maxPage=pages[pages.length-1].innerHTML;
//     changePage(maxPage);
//     document.onreadystatechange = function () {
//         if (document.readyState == "complete") {
//         getUid();
//         unfollowing()
//         }
//     }
// };
/**
 * 逻辑函数
 * @constructor
 */
function Service(){
    if(window.location.pathname.indexOf("/home")>-1){//判断是否为首页
        var followNum=$("strong[node-type='follow']")[0].innerHTML;
        var pageNum=followNum%30==0?followNum/30:Math.ceil(followNum/30);
        window.open(dataDitionary2.urls.followPage+"&Pl_Official_RelationMyfollow__93_page="+pageNum);
    }else if(window.location.pathname.indexOf("/myfollow")>-1){//是否为关注页
        var curfollowing=$(".attach.S_txt1")[0].innerHTML;
        if(!sessionStorage.unfollowNum){
            sessionStorage.setItem("unfollowNum",dataDitionary2.unfollowNum);//存储需要取关的人数
            sessionStorage.setItem("followNum",curfollowing);//存储取关操作前关注的人数
        }
        //获取页码
        //  var goal=sessionStorage.followNum-sessionStorage.unfollowNum;
        if(sessionStorage.unfollowNum>0) {
            var temp = window.location.search.slice(window.location.search.indexOf("Pl_Official_RelationMyfollow__93_page="));
            dataDitionary2.curPage = temp.slice(temp.indexOf("=") + 1);
            getUid();
            unfollowing();
        }else{
            alert("OK");
        }

    }else{
        console.log("01");
    }
}
//启动函数(方法2)
(function unfollowStart(){
        setTimeout("Service()",20*1000);//TODO
})();
