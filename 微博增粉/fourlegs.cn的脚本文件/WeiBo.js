/**
 * Created by Ray on 2017/4/18.
 */
//数据字典
var dataDitionary = {
    url: {
        getUserdata: "http://api.weibo.com/groupchat/query_messages.json",//获取用户数据的URL
        toFollow: "http://weibo.com/aj/f/followed",//执行关注的URL
        sendUserMes: "http://weibo.com/aj/message/add?ajwvr=6&__rnd=1493124149327",//发送用户消息的URL
        sendGrouppMes: "http://weibo.com/aj/message/groupchatadd"//群聊消息发送URL
    },
    type: {
        get: "get",
        post: "post",
    },
    sendMesflag: true,
    followingflag: true,
    groudId: new Array,
    replyU: "互粉互赞喲![doge]）本消息由js脚本自动发送,了解更多请访问项目主页：https://github.com/ScarlettRay/Js/tree/master/%E5%BE%AE%E5%8D%9A%E5%A2%9E%E7%B2%89  打扰了！（",
    replayG:"粉我赞我，在线等喲[doge]！必回粉回赞"
};
//获取粉丝，主函数
function getFans(gid) {
    var querydata = {//数据准备
        id: gid,
        count: 3,
        is_encoded: 1,
        convert_emoji: 1,
        is_pc: 1,
        source: 209678993,
        callback: "Mydata_01",
        __rnd: "Mydata_01"
    };
    aj_getJsonpData(dataDitionary.url.getUserdata, querydata);//发送请求
};

//获取用户信息的回调函数
function getData_callback(result,gid) {
    while (result == undefined) {
        console.log("undefined");
    }
    ;
    var users = result.messages;
    for (var i = 0; i < users.length; i++) {
        var form = new FormData();
        form.append("uid", users[i].from_uid);
        form.append("refer_flag", "1005050001_");
        form.append("f", 1);
        aj_toFollow_reply(dataDitionary.url.toFollow, form, following_callback);//关注Ajax
    }
    var form=new FormData;
    form.append("gid",gid);
    form.append("text",dataDitionary.replayG);
    console.log("发送群消息"+gid);
    aj_toFollow_reply(dataDitionary.url.sendGrouppMes, form);//在群中发送消息
};
//关注用户的回调函数
function following_callback(result, uid) {
    console.log("关注了用户：" + result.data.fnick);
    if (dataDitionary.sendMesflag && result.data.relation.follow_me == 0) {//是否关注了我
        var form = new FormData;
        form.append("uid", uid);
        form.append("text", dataDitionary.replyU);
        aj_toFollow_reply(dataDitionary.url.sendUserMes, form, reply_callback);//发送消息 回粉
    }
}
//回复用户的回调函数
function reply_callback(result) {
    if (result.code == 100001) {
        dataDitionary.sendMesflag = false;//不能再私信啦！
    }
}
//群聊消息回调函数
function replyG_callback(result){
    conosle.log("群聊消息回调函数：");
    console.log(result);
}
//获取群的id,放入全局数据字典dataDitionary.groudId
function getGroupId() {
    //脑残方法TODO
    if(document.getElementsByClassName("webim_fold_v2")[0]==undefined
            &&document.getElementsByClassName("webim_chat_window")[0]==undefined
                &&document.getElementsByClassName("webim_contacts_list")[0]==undefined){
      //  console.log("waiting...");
        console.log("Another time");
        return false;
    }else{
        var btn = document.getElementsByClassName("webim_fold_v2")[0];
        btn.click();
        var continer = document.getElementsByClassName("webim_chat_window")[0];
        continer.style = "display:none";
        var ul = document.getElementsByClassName("webim_contacts_list")[0];
        var lis = ul.childNodes;
        for (var i = 0; i < lis.length; i++) {
            if (lis[i].getAttribute("action-data").indexOf("gid") > -1) {
                var attrValue = lis[i].getAttribute("action-data");
                var start = attrValue.indexOf("=") + 1;
                var end = attrValue.indexOf("&");
                dataDitionary.groudId.push(attrValue.slice(start, end));
            }
        }
        if(timer01){
            clearInterval(timer01);//清除定时器
        }

    }
}

//验证引入脚本是否可用
function checkScript(i) {
    var s = document.createElement("script");
    s.innerHTML = "alert('remove " + i + "')";
    document.body.appendChild(s);
}
//移除script节点
function removeScript() {
    var children = document.body.childNodes;
    var j = 0;
    for (var i = 0; i < children.length; i++) {
        if (children[i].nodeName == "SCRIPT") {
            document.body.removeChild(children[i]);
            checkScript(++j);
        }
    }
}
//循环执行函数
function loop() {
    if (dataDitionary.followingflag) {
        for (var i = 0; i < dataDitionary.groudId.length; i++) {
//      console.log(dataDitionary.groudId[i]);
            getFans(dataDitionary.groudId[i]);
        }
    } else {
        clearTimeout(timer);
    }
}

//启动
(function start() {
    if(!getGroupId()){
        timer01=setInterval("getGroupId()",20*1000);
    }
    timer01=null;
    timer = setInterval("loop()",60 * 1000);
})();