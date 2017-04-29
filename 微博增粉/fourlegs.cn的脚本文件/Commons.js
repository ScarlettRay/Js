/**
 * Created by Ray on 2017/4/26.
 */
//Ajax请求,获取要关注人的信息
function aj_getJsonpData(url, queryData) {
    $.ajax({
        url: url,
        type: "get",
        data: queryData,
        dataType: "jsonp",
        async: false,
        xhrFields: {
            withCredentials: true
        },
        complete: function (XHR, TS) {
            XHR = null
        },//回收xhr
        success: function (result, textStatus) {
            //           console.log(xhr);
            getData_callback(result, queryData.id);
            result = null;
        },
        error: function (error) {
            console.log(error)
        }
    });
};
//Ajax请求，关注用户/回复unfollow_me用户/发送群消息
function aj_toFollow_reply(url, form, callback) {
    $.ajax({
        url: url,
        type: "post",
        data: form,
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        processData: false,
        contentType: false,
        complete: function (XHR, TS) {
            XHR = null
        },
        success: function (result, textStatus) {
            if (callback) {
                callback(result, form.get("uid"));
            }
            result = null;
        },
        error: function (error) {
            console.log("aj_toFollow_reply函数：" + error)
        }
    });
};
function aj_getDoc(url, queryData, callback) {
    $.ajax({
        url: url,
        type: "get",
        data: queryData,
        dataType: "text",   //
//        async: false,
        xhrFields: {
            withCredentials: true
        },
        complete: function (XHR, TS) {
            XHR = null
        },
        success: function (result, textStatus) {
            callback(result);
        },
        error: function (error) {
            console.log(error)
        }

    });
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
 * 群聊接口
 */
function sendMesG(gid) {
    dataDitionary.testAttr_AjaxNum=++dataDitionary.testAttr_AjaxNum;
    var form = createForm({"gid": gid, "text": dataDitionary.replayG});
    console.log("发送群消息:" + gid);
    aj_toFollow_reply(dataDitionary.url.sendGrouppMes, form);//在群中发送消息
}
/**
 * 休息函数（目前是以群发消息作为休息 ）
 *
 * function shutDown(){
    console.log("进入休息函数");
        for (var i = 0; i < dataDitionary.groudId.length; i++){
            sendMesG(dataDitionary.groudId[i]);
        }
    console.log("离开休息函数");
}
 */
/**暂停函数
 *
 * @param obj 继续执行对象
 * @param iMinSecond 暂停时间
 * @constructor
 */
function Pause(obj, iMinSecond) {
    if (window.eventList == null) window.eventList = new Array();
    var ind = -1;
    for (var i = 0; i < window.eventList.length; i++) {
        if (window.eventList[i] == null) {
            window.eventList[i] = obj;
            ind = i;
            break;
        }
    }

    if (ind == -1) {
        ind = window.eventList.length;
        window.eventList[ind] = obj;
    }
    setTimeout("GoOn(" + ind + ")", iMinSecond);
}
/**
 * 继续执行函数
 * @param ind
 * @constructor
 */
function GoOn(ind) {
    var obj = window.eventList[ind];
    window.eventList[ind] = null;
    if (obj.NextStep) obj.NextStep();
    else obj();
}

//分时函数
function differTime() {

}
//执行群聊函数
function sendG() {
    console.log("已发送："+dataDitionary.testAttr_AjaxNum+"条");
    for (var i = 0; i < dataDitionary.groudId.length; i++) {
        setTimeout("sendMesG("+dataDitionary.groudId[i]+")",i*3000);
    }
}