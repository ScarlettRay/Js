/**
 * Created by Ray on 2017/4/26.
 */
//数据字典
var dataDitionary2 = {
    urls: {
        unfollow: "http://weibo.com/aj/f/unfollow?ajwvr=6&__rnd=1493186279517", //取消关注的url
        followPage: null //关注页的url,翻页用
    },
    uids: new Array,  //保存用户的id
    unfollowNum: 1000, //取消关注的人数
    curPage: null,
	sleepflag:1,		//休息数值
	urlnum:null
}
/**
 * 操作函数
 */
function unfollowing() {
    if (sessionStorage.unfollowNum < dataDitionary2.uids.length) {//不能超过取关数
        dataDitionary2.uids = dataDitionary2.uids.splice(0, sessionStorage.unfollowNum);
    }
    var form = createForm({"uid": dataDitionary2.uids.join(","), "refer_flag": "unfollow_all", "_t": 0});
    aj_toFollow_reply(dataDitionary2.urls.unfollow, form, unfollow_callback);
}
/**
 * 取消关注的回调函数
 * @param result
 */
function unfollow_callback(result) {
    if (result.code == 100000) {
        console.log("取消关注了：" + dataDitionary2.uids.length + "人");
    } else {
        //Skip
    }
    sessionStorage.unfollowNum = sessionStorage.unfollowNum - dataDitionary2.uids.length;
//    dataDitionary2.uids.splice(0,dataDitionary2.uids.length);//数组清空
    if (dataDitionary2.curPage - 1 > 0 && sessionStorage.unfollowNum > 0) {
        changePage(--dataDitionary2.curPage) //翻页
    }else{
		alert("OK!");
	}

}

function getUid(result){
	console.log("获取取关人的uid");
	var pattern=/action-data=\\"uid=\d+&profile/g;
	var uidpattern=/\d+/;
	var matches=pattern.exec(result)
	while(matches){
		dataDitionary2.uids.push(uidpattern.exec(matches[0])[0]);
		var matches=pattern.exec(result);
	}
	console.log(dataDitionary2.uids);
	result=null;
	setTimeout("unfollowing()",dataDitionary2.sleepflag*5*1000);	
	dataDitionary2.sleepflag++;
}
/**
*	废弃（为了解决Chrome不工作的状况）
*
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
*/
/**
 * 翻页函数
 
function changePage(pageMun) {
    window.location = dataDitionary2.urls.followPage + "&Pl_Official_RelationMyfollow__93_page=" + pageMun;
}
*/
//Ajax请求获取页面信息
function changePage(pageMun){
	dataDitionary2.uids=new Array;//清空
	aj_getDoc(dataDitionary2.urls.followPage, {"Pl_Official_RelationMyfollow__93_page": pageMun},getUid);
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
 * 逻辑函数(废弃)
 * @constructor
 
function Service() {
    try {
        if (window.location.pathname.indexOf("/home") > -1) {//判断是否为首页
            var followNum = $("strong[node-type='follow']")[0].innerHTML;
            var pageNum = followNum % 30 == 0 ? followNum / 30 : Math.ceil(followNum / 30);
            window.open(dataDitionary2.urls.followPage + "&Pl_Official_RelationMyfollow__93_page=" + pageNum);
        } else if (window.location.pathname.indexOf("/myfollow") > -1) {//是否为关注页
            var curfollowing = $(".attach.S_txt1")[0].innerHTML;
            if (!sessionStorage.unfollowNum) {
                sessionStorage.setItem("unfollowNum", dataDitionary2.unfollowNum);//存储需要取关的人数
                sessionStorage.setItem("followNum", curfollowing);//存储取关操作前关注的人数
            }
            //获取页码
            //  var goal=sessionStorage.followNum-sessionStorage.unfollowNum;
            if (sessionStorage.unfollowNum > 0) {
                var temp = window.location.search.slice(window.location.search.indexOf("Pl_Official_RelationMyfollow__93_page="));
                dataDitionary2.curPage = temp.slice(temp.indexOf("=") + 1);
                getUid();
                unfollowing();
            } else {
                alert("OK");
            }

        } else {
            console.log("01");
        }
    }catch(error){
        console.log("unfolowing.js has something wrong.Another time. error message:"+error.message);
        setTimeout("Service()",2*60*1000);
    }
}

*/
//获取关注列表url中的一串数字
function geturlnum(){
	if(!dataDitionary2.urlnum){
		var elem=document.getElementsByClassName("W_ficon ficon_setup S_ficon")[0];
		var p=/\d+/g;
		dataDitionary2.urlnum=p.exec(elem.href)[0];
		geturlnum=function(){return dataDitionary2.urlnum;}
	}
	return dataDitionary2.urlnum;
}
/**
*	逻辑函数（取关直接在首页进行）
*/
(function Service(){
	if(sessionStorage.unfollow_mun){
		dataDitionary2.unfollowNum=sessionStorage.unfollow_mun;
	}
	try {
        if (window.location.pathname.indexOf("/home")>-1) {//判断是否为首页
			//获取关注列表url中的一串数字
			dataDitionary2.urls.followPage="http://weibo.com/p/"+geturlnum()+"/myfollow?t=1";
            var followNum = $("strong[node-type='follow']")[0].innerHTML;
            var pageNum = followNum % 30 == 0 ? followNum / 30 : Math.ceil(followNum / 30);
			dataDitionary2.curPage=pageNum;			
            sessionStorage.setItem("unfollowNum", dataDitionary2.unfollowNum);//存储需要取关的人数
            sessionStorage.setItem("followNum", followNum);//存储取关操作前关注的人数           
            aj_getDoc(dataDitionary2.urls.followPage, {"Pl_Official_RelationMyfollow__93_page": pageNum},getUid);
         
        } else {
            console.log("01");
        }
    }catch(error){
        console.log("unfolowing.js has something wrong.Another time. error message:"+error.message);
        setTimeout("Service()",2*60*1000);
    }
})();
//启动取关函数(方法2)
