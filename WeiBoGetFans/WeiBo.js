/**
 * Created by Ray on 2017/4/18.
 */
var dataDitionary = {
    url: {
        getUserdata: "http://api.weibo.com/groupchat/query_messages.json",
    },
    type: {
        get: "get",
        post: "post",
    },
    fansqun: {}
}
//获取粉丝
function getFans() {
    var querydata = {
        id: 4052032501757841,
        count: 3,
        is_encoded: 1,
        convert_emoji: 1,
        is_pc: 1,
        source: 209678993,
        callback: "Mydata_01",
        __rnd: "Mydata_01"
    };
    var result = aj_getJsonpData(dataDitionary.url.getUserdata, "get", querydata);
    while(result!=undefined){break;}
        var users = result.responseJSON.messages;
          console.log(usersdata);
        var form = new FormData();
        for (var i = 0; i < users.length; i++) {
            form.append("uid", users[i].from_uid);
            form.append("refer_flag", "1005050001_");
            aj_toFollow(form);
        }

}
//发热门微博
function getHotWeiBo() {

}
//删除粉丝
function removeFollowing() {

}
//Ajax请求，获取用户信息(uid为主)
function aj_getJsonpData(url, type, queryData) {
    return $.ajax({
        url: url,
        type: type,
        data: queryData,
        dataType: "jsonp",
        async:false,
        xhrFields: {
            withCredentials: true
        },
        success: function (result) {
            console.log(result);
        },
        error: function (error) {
            console.log(error)
        }
    });
}
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
}
//兼容所有浏览器的获取XMLHttpRequest对象的方法，采用惰性载入方法设计函数
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        createXHR = function () {
            return new XMLHttpRequest();
        };
    } else if (typeof ActiveXObject != "undefined") {
        createXHR = function () {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                    i,
                    len;
                for (i = 0; i < versions.length; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXStirng = versions[i];
                        break;
                    } catch (error) {
                        //skip
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }
    } else {
        createXHR = function () {
            throw new Error("Not XHR Object available!");
        }
    }
    return createXHR();
}