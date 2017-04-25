/**
 * Created by Ray on 2017/4/18.
 */
//数据字典
var dataDitionary = {
    url: {
        getUserdata: "http://api.weibo.com/groupchat/query_messages.json?callback=?",
		Jquery:"https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js",
		WeiBo_js:"http://fourlegs.cn/wordpress/wp-content/themes/Snape-master/js/WeiBo.js",
    },
    type: {
        get: "get",
        post: "post",
    },
    fansqun: {}
};
//获取粉丝
function getFans() {
    var querydata = {
//		callback: "Mydata_01",
        id: 4052032501757841,
        count: 3,
        is_encoded: 1,
        convert_emoji: 1,
        is_pc: 1,
        source: 209678993,
        __rnd: "Mydata_01"
    };
	var result=$.getJSON(dataDitionary.url.getUserdata, querydata,function(data){
		console.log("1");
		console.log(data);
		console.log("2");
	});
    var result = aj_getJsonpData(dataDitionary.url.getUserdata, "get", querydata);
    console.log(result);
    // while (result == "undefined") {
    //     console.log("undefined");
    // }
    // var users = result.responseJSON.messages;
    // console.log(usersdata);
    // var form = new FormData();
    // for (var i = 0; i < users.length; i++) {
    //     form.append("uid", users[i].from_uid);
    //     form.append("refer_flag", "1005050001_");
    //     console.log(form);
    //     aj_toFollow(form);
    //}

};
//success回调函数
function suc_getFans(result){
	
};
function Mydata_01(data){
	console.log("1");
	console.log(data);
	console.log("2");
}

//Ajax请求，获取用户信息(uid为主)
function aj_getJsonpData(url, type, queryData) {
    return $.ajax({
        url: url,
        type: type,
        data: queryData,
        dataType: "jsonp",
		jsonpCallback:"Mydata_01",
        async: false,//jsonp请求没有异步同步之分
        xhrFields: {
            withCredentials: true
        },
        success: function (result) {
            console.log("回调函数");
            console.log(result);
        },
        error: function (XHR,textStatus) {
			console.log(XHR.responseText)
            console.log(XHR.status);
			console.log(XHR.readyState);
			console.log(textStatus);
        }
    });
};
//Ajax请求，关注用户
function aj_toFollow(form) {
    return $.ajax({
        url: "http://weibo.com/aj/f/followed",
        type: "post",
        data: form,
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        processData: false,
        contentType: false,
        success: function (result) {
            console.log(result);
        },
        error: function (error) {
            console.log(error)
        }
    });
};

//启动
(function start() {
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
			//引入脚本，Jquery.js和WeiBo.js
           var script=document.createElement("script");
		   script.src=dataDitionary.url.Jquery;
		   document.body.appendChild(script);
		   var WeiBo=document.createElement("script");
		   WeiBo.src=dataDitionary.url.WeiBo_js;
		   document.body.appendChild(WeiBo);
        }
    }
})();

