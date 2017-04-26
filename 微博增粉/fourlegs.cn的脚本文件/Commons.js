/**
 * Created by Ray on 2017/4/26.
 */
//Ajax请求,获取要关注人的信息
function aj_getJsonpData(url, queryData) {
    return $.ajax({
        url: url,
        type: "get",
        data: queryData,
        dataType: "jsonp",
        async: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (result) {
            getData_callback(result,queryData.id);
        },
        error: function (error) {
            console.log(error)
        }
    });
};
//Ajax请求，关注用户/回复unfollow_me用户/发送群消息
function aj_toFollow_reply(url, form, callback) {
    return $.ajax({
        url: url,
        type: "post",
        data: form,
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        processData: false,
        contentType: false,
        success: function (result) {
            if(callback){
                callback(result, form.get("uid"));
            }
        },
        error: function (error) {
            console.log("aj_toFollow_reply函数：" + error)
        }
    });
};
