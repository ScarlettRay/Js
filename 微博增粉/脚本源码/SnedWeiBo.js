/**
 * Created by Ray on 2017/4/26.
 */
var dataDitionary3 = {
    urls: {
        getCommentsUrl1: "http://d.weibo.com/aj/v6/comment/small?isMain=true&act=list",	//获取微博评论 1
        getCommentsUrl2:"http://weibo.com/aj/v6/comment/small?isMain=true&ajwvr=6&act=list"	,	//获取微博评论	2
        forwordWeiBoUrl1: "http://d.weibo.com/aj/v6/mblog/forward",    								//转发微博	1
        forwordWeiBoUrl2: "http://weibo.com/aj/v6/mblog/forward?ajwvr=6&domain=100505",				//转发微博	2
        getHotDocUrl: "http://d.weibo.com/?topnav=1&mod=logo&wvr=6", //获取文档以取得mid
        hotweibo: [  //遗弃，更新太慢了
            "http://d.weibo.com/102803_ctg1_3288_-_ctg1_3288?from=faxian_hot&mod=fenlei#",//电影
            "http://d.weibo.com/102803_ctg1_2288_-_ctg1_2288?from=faxian_hot&mod=fenlei#", //美女模特
            "http://d.weibo.com/102803_ctg1_2088_-_ctg1_2088?from=faxian_hot&mod=fenlei#", //科技
            "http://d.weibo.com/102803_ctg1_4388_-_ctg1_4388?from=faxian_hot&mod=fenlei#",  //搞笑
            "http://d.weibo.com/102803_ctg1_1988_-_ctg1_1988?from=faxian_hot&mod=fenlei#",  //情感
            "http://d.weibo.com/102803_ctg1_4288_-_ctg1_4288?from=faxian_hot&mod=fenlei#",   //明星
            "http://d.weibo.com/102803_ctg1_2588_-_ctg1_2588?from=faxian_hot&mod=fenlei#",      //旅游
            "http://d.weibo.com/102803_ctg1_4988_-_ctg1_4988?from=faxian_hot&mod=fenlei#",		//美图
            "http://d.weibo.com/102803_ctg1_4688_-_ctg1_4688?from=faxian_hot&mod=fenlei#",		//综艺
            "http://d.weibo.com/102803_ctg1_2688_-_ctg1_2688?from=faxian_hot&mod=fenlei#",		//美食
            "http://d.weibo.com/102803_ctg1_1199_-_ctg1_1199?from=faxian_hot&mod=fenlei#",		//视频
            "http://d.weibo.com/102803_ctg1_5288_-_ctg1_5288?from=faxian_hot&mod=fenlei#",		//音乐
            "http://d.weibo.com/102803?feed_sort=102803_ctg1_9999_-_ctg1_9999&feed_filter=102803_ctg1_9999_-_ctg1_9999#Pl_Core_NewMixFeed__3"	//一小时榜单
        ],
        type: [
            [
                "http://weibo.com/u/5337879011?profile_ftype=1&is_all=1#_0",					//腐剧天天看      --电影
                "http://weibo.com/u/3947532062?profile_ftype=1&is_all=1#_0",					//电影攻略菌	--电影
            ],
            [
                "http://weibo.com/u/1418070140?profile_ftype=1&is_all=1#_0"						//微博美女		--美女
            ],
            [
                "http://weibo.com/p/1005052206258462/home?profile_ftype=1&is_all=1#_0",			//NASA中文        --科技
                "http://weibo.com/entpaparazzi?profile_ftype=1&is_all=1#_0",					//新浪娱乐        --科技
                "http://weibo.com/u/1749224837?profile_ftype=1&is_all=1#_0",					//IT工程师        --科技
                "http://weibo.com/u/5150774534?profile_ftype=1&is_all=1#_0",					//黑客师          --科技
            ],
            [
                "http://weibo.com/feidieshuo9527?profile_ftype=1&is_all=1#_0",					//飞碟说		  --搞笑
                "http://weibo.com/920722209?profile_ftype=1&is_all=1#_0",						//史上第一最最搞  --搞笑
                "http://weibo.com/u/3440325930?profile_ftype=1&is_all=1#_0",					//纯良叫兽		  --搞笑
            ],
            [

            ],
            [
                "http://weibo.com/juziyule?profile_ftype=1&is_all=1#_0",						//橘子娱乐		--明星
                "http://weibo.com/iampaparazzi?profile_ftype=1&is_all=1#_0",					//全名星探		--明星
            ],
            [
                "http://weibo.com/tamaxingzhe?profile_ftype=1&is_all=1#_0",						//踏马行者  	--旅游
            ],
            [

            ],
            [

            ],
            [
                "http://weibo.com/u/5222794628?profile_ftype=1&is_all=1#_0",					//舌尖上的菜谱    --美食
                "http://weibo.com/u/5879823459?profile_ftype=1&is_all=1#_0",					//一米便当 		  --美食
            ],
            [
                "http://weibo.com/ergengshipin?profile_ftype=1&is_all=1#_0",					//二更视频		--视频
            ],
            [
                "http://weibo.com/houson100037?profile_ftype=1&is_all=1#_0",					//Houson猴姆	  --音乐
                "http://weibo.com/luvmuzik?profile_ftype=1&is_all=1#_0",						//DC大叔		  --音乐
            ],
        ],
        userhotweibo:new Array,
    },
    weiboSum: 2,     //每轮发送的博文数
    time: 50 * 60 * 1000,        //间隔时间
    mids: null, //存放mid
    comments: null,   //存放评论
    hadSendEeiBoMid: new Array,   //已发送微博的mid
    continueflag: true	//是否继续的flag
}
/**
 * 逻辑函数
 * @constructor
 */
function sendWeiBoService() {
    if (dataDitionary3.continueflag) {
        dataDitionary3.mids = new Array;
        dataDitionary3.comments = new Array;
        getDoc();//h获取头条mid
        setTimeout("service()", 20 * 1000);  //
    } else {
        clearInterval(timer);
    }
}
//防止异步加载出错的蹩脚办法
function service() {
    for (var i = 0; i < dataDitionary3.weiboSum; i++) {
        if (sessionStorage.hasSendMids.indexOf(dataDitionary3.mids[i]) < 0) {
            setTimeout("getComments(" + i + ")", (i + 1) * 10 * 1000);  //获取评论作为转发的reason
//        var form = createForm({"mid": dataDitionary3.mids[i]});
            setTimeout("WeiBoforword(" + i + ")", (i + 1) * dataDitionary3.time);
        }

    }
}
/**
 * 发送转发请求
 * @param form
 */
function WeiBoforword(i) {
    console.log("执行转发Ajax");
    var form = createForm({"mid": dataDitionary3.mids[i], "reason": dataDitionary3.comments[i]});
    aj_toFollow_reply(dataDitionary3.urls.forwordWeiBoUrl2, form, forword_callback);//
    if(!sessionStorage.hasSendMids||sessionStorage.hasSendMids==""){
        sessionStorage.setItem("hasSendMids",dataDitionary3.mids[i]);
    }else{
        sessionStorage.hasSendMids=sessionStorage.hasSendMids+","+dataDitionary3.mids[i];
    }
}
/**
 * 获取文档Ajax
 */
function getDoc() {
    var randomNum = Math.floor(Math.random() * dataDitionary3.urls.userhotweibo.length);//随机取一博主
    aj_getDoc(dataDitionary3.urls.userhotweibo[randomNum], {}, getmids);//获取头条文档
}
/**
 * 获取评论的Ajax请求
 * @param result
 */
function getComments(i) {
    if(dataDitionary3.mids[i]){
        aj_getDoc(dataDitionary3.urls.getCommentsUrl2, {"mid": dataDitionary3.mids[i]}, getComments_callback);
    }

}
/**
 * 转发的回调函数
 * @param result
 */
function forword_callback(result) {
    if (result.code == 100001) {
        console.log("转发失败!" + result.msg);
    } else if (result.code = 100000) {
        console.log("成功发送一条博文");
    }
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
function getmids(result) {
    console.log("getmids函数执行");
    var pattern = /\\"[ ]{1,2}mid=\\"\d{16}/g;
    var matches = pattern.exec(result);
    var flag=false;
    while(matches){
        if(flag){					//遇到转发微博跳过下一条
            flag=false;
            matches=pattern.exec(result);
            continue;
        }else if((result.charAt(matches.index-1))=="p"){	//判断是否为置顶微博
            console.log("遇到置顶微博！");
            if((result.charAt(matches.index+29))=="s")flag=true;		//是否还是转发微博
            matches=pattern.exec(result);
            continue;
        }else if((result.charAt(matches.index+29))=="i"){						//判断是否为转发
            console.log("遇到转发微博");
            flag=true;	//设置flag
        }else{
            dataDitionary3.mids.push(matches[0].slice(10));			//截断并储存
            if(dataDitionary3.mids.length==dataDitionary3.weiboSum)break;
        }
        matches=pattern.exec(result);
    }
    matches = null;
    result = null;
}
/**
 * 获取评论的回调函数
 * @param result
 */
function getComments_callback(result) {
    if(result.code == 100001){
        console.log("加载失败");
    }else{
        var commentsHtml = JSON.parse(result).data.html;
        if (commentsHtml) {
            var pos = commentsHtml.indexOf("：");
            var boxend = commentsHtml.indexOf("</div>", pos + 1);
            var deletTag = dealComment(commentsHtml.slice(pos + 1, boxend));//temp位评论div中的html代码
            console.log("deal end:" + deletTag)
            dataDitionary3.comments.push(deletTag);
        }
        console.log("out");
        result = null;
        commentsHtml = null;
    }

}
//处理评论
function dealComment(str) {
    var checkAstart = str.indexOf("<a");
    var checkAend = null;
    while (checkAstart > -1) {
        //       console.log("a 循环");
        checkAend = str.indexOf("</a>", checkAstart);
        console.log("checkAend" + checkAend);
        if (checkAend < 0) {
            str = str.slice(0, checkAstart);
            break;
        } else {
            str = deleteTag(str, checkAstart, checkAend, "a");
        }
        ;
        console.log(str);
        checkAstart = str.indexOf("<a");//??
    }
    var checkIMGstart = str.indexOf("<img");
    var checkIMGend = null;
    while (checkIMGstart > -1) {
        //      console.log("img 循环");
        checkIMGend = str.indexOf("/>", checkIMGstart);
        if (checkIMGend < 0) {
            checkIMGend = str.indexOf("->", checkIMGstart);//img有一个特殊结构
            if (checkIMGend < 0) {
                str = str.slice(0, checkIMGstart);
                break;
            }
        }
        str = deleteTag(str, checkIMGstart, checkIMGend, "img");
        //      console.log("去 img:" + str);
        checkIMGstart = str.indexOf("<img");
    }

    return str.replace(/&nbsp;/g," ");		//格式化空格
}
/**
 * 去除表起码的字符串操作
 * @param str  要操作的字符串
 * @param start     标签开始位置“<”
 * @param end         标签结束位置    a:“</”, img:"/>"
 * @param tag           标签类型"a","img"
 */
function deleteTag(str, start, end, tag) {
    if (tag == "a") {
        var pattern = /[#,@]{1,2}[\u4e00-\u9fa5_a-zA-Z0-9_]{1,50}[#]{0,1}/g;
        var center = str.slice(start, end);
        var matches = pattern.exec(center);
        if (matches) {
            var Name = matches[0]
            console.log("userNme:" + Name);   //取得@或#的字符
        } else if (center.indexOf("href") > -1) {
            var urlPattern = /http[s]{0,1}:\/\/[a-zA-Z0-9./_?=#]{1,}/g;            //取得href中的url
            var urlMatches = urlPattern.exec(center);
            if (urlMatches) {
                var Name = urlMatches[0] + " ";
            }
        }
        //       console.log("text:" + aTextstart + "  " + end + "userName");
        center = null;
        matches = null;
        return str.slice(0, start) + Name + str.slice(end + 4);
    } else if (tag == "img") {
        var center = str.slice(start, end);
        //       console.log("center:" + center);
        var pattern = /\[[\u4e00-\u9fa5_a-zA-Z0-9_]{1,10}\]/;//匹配中英文{1-10个}；
        var matches = pattern.exec(center);
        center = null;
        if (matches) {
            var face = matches[0];
        } else {
            var face = "";
        }
        return str.slice(0, start) + face + str.slice(end + 2);
    } else {
        console.log("无法识别的Tag");
    }
}
(function sendWeiBoStart() {
    /*
     *用户选项
     */
    //转发类型
    if(sessionStorage.forwardtype){
        var temp=sessionStorage.forwardtype.split(",");
        for(var i=0;i<temp.length;i++){
            if(temp[i]=="true"){
                for(var url in dataDitionary3.urls.type[i]){
                    dataDitionary3.urls.userhotweibo.push(dataDitionary3.urls.type[i][url]);
                }
            }
        }
    }
    //自添加的微博ID
    if(sessionStorage.otherIDs){
        var IDs=sessionStorage.otherIDs.split(",");
        for(var ID in IDs){
            if(isNaN(ID)) {
                dataDitionary3.urls.userhotweibo.push("http://weibo.com/"+IDs[ID]+"?profile_ftype=1&is_all=1#_0");
            }else{
                dataDitionary3.urls.userhotweibo.push("http://weibo.com/u/" + IDs[ID] + "?profile_ftype=1&is_all=1#_0");
            }
        }
    }
	if(dataDitionary3.urls.userhotweibo.length>0){
	    if(!sessionStorage.hasSendMids){
        sessionStorage.hasSendMids="";
    }
    sendWeiBoService();
    timer = setInterval("sendWeiBoService()", 2*60 * 60 * 1000);
	}

})();