/**
 * Created by Ray on 2017/4/26.
 */
var dataDitionary3 = {
    urls: {
        getCommentsUrl: "http://d.weibo.com/aj/v6/comment/small",//获取微博评论
        forwordWeiBoUrl: "http://d.weibo.com/aj/v6/mblog/forward",    //转发微博
        getDocUrl: "http://d.weibo.com/" //获取文档以取得mid
    },
    weiboSum: 3,     //每轮发送的博文数
    time: 60 * 1000,        //间隔时间
    mids: new Array, //存放mid
    comments:new Array    //存放评论
}
/**
 * 逻辑函数
 * @constructor
 */
function sendWeiBoService() {
        getDoc();//h获取头条mid
        setTimeout("service()",10*1000);  //
}
//防止异步加载出错的蹩脚办法
function service(){
    for (var i = 0; i < dataDitionary3.weiboSum; i++) {
        getComments(i);  //获取评论作为转发的reason
        var form = createForm({"mid": mids[i]});
        var data={"form":form,"i":i};
        setTimeout("forword(" + data+")", i * dataDitionary3.time);
    }
}
/**
 * 发送转发请求
 * @param form
 */
function forword(data) {
    console.log("执行转发Ajax");
    data["form"].append("reason",dataDitionary3.comments[data["i"]])
    aj_toFollow_reply(dataDitionary3.urls.forwordWeiBoUrl,form, forword_callback);//
}
/**
 * 获取文档Ajax
 */
function getDoc() {
    aj_getDoc(dataDitionary3.urls.getDocUrl,{}, getmids);//获取头条文档
}
/**
 * 获取评论的Ajax请求
 * @param result
 */
function getComments(i) {
    aj_getDoc(dataDitionary3.urls.getCommentsUrl,{"mid":dataDitionary3.mids[i]},getComments_callback);
}
/**
 * 转发的回调函数
 * @param result
 */
function forword_callback(result) {
    console("成功发送一条博文");
    console.log(result);
}

//从DOC文档中获取其微博的mid，作为aj_getDoc的回调函数
/*function getmids(result) {
    console.log("DOC的回调函数");
    console.log("type of:"+typeof result);
    console.log("instance of String:"+(result instanceof String));
    var p1=result.indexOf("html");
    console.log("html的位置："+p1)
    var pos = result.indexOf('" mid="');
    var lastpos=result.lastIndexOf('" mid="');
    console.log(pos);
    console.log(lastpos);
    var mid=null;
    while(pos>-1){
        var end = result.indexOf('\"', pos + 7);
         mid= result.slice(pos + 7, end);
         console.log(mid);
        dataDitionary3.mids.push(mid);
        pos=result.indexOf('" mid="',pos+7);
    }
    console.log("mids:")
    console.log(dataDitionary3.mids);
    result=null;
}
*/
/**
 * 正则匹配文档内容获取mid
 * @param result
 */
function getmids(result){
    console.log("getmids函数执行");
    var pattern=/\\" mid=\\"\d{16}/g;
    for(var i=0;i<dataDitionary3.weiboSum;i++){
        var matches=pattern.exec(result);
        dataDitionary3.mids.push(matches[0].slice(9));
        matches=null;
    }
    result=null;
}
/**
 * 获取评论的回调函数
 * @param result
 */
function getComments_callback(result){
    var responseJson=JSON.parse(result);
    if(responseJson.data.html){
        console.log("in");
        var commentsHtml=responseJson.data.html;
        var pos=commentsHtml.indexOf("：");
        console.log("pos:"+pos);
        var checkA=commentsHtml.indexOf("<a",pos);
        var checkIMG=commentsHtml.indexOf("<img",pos);
        if(checkA==pos+1||checkIMG==pos+1){
                //换下一条？？
        }else{
            var end=commentsHtml.indexOf("<",pos);
        }

        console.log("end:"+end)
        dataDitionary3.comments.push(commentsHtml.slice(pos+1,end));
    }
    console.log("out");
    result = null;
    responseJson=null;
}
function sendWeiBoStart() {
}