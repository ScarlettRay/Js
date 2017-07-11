/*
 document.getElementsByClassName("options")[0].onclick=function(){
 //chrome.tabs.sendMessage(0, {greeting: "Watch your back."}, function (response) {
 //console.log("return:"+response)
 chrome.tabs.query(
 {active: true, currentWindow: true},
 function(tabs) {
 chrome.tabs.sendMessage(
 tabs[0].id,
 {getfans: document.getElementsByClassName("getfans")[0].checked,
 unfollow:document.getElementsByClassName("unfollow")[0].checked,
 forward:document.getElementsByClassName("forward")[0].checked
 },
 function(response) {
 console.log(response.text);
 window.close();
 });
 });

 }
 */

document.getElementsByClassName("options")[0].onclick = function () {
    document.getElementsByClassName("youroptions")[0].style = "display:none";
    var define=document.getElementsByClassName("defineByYouSelf")[0].style="display:block";
}

//非默认显示文本框函数
var elems = document.getElementsByClassName("need");
for (var i = 0; i < elems.length; i++) {
    elems[i].onclick = function (event) {
        if (!event.target.checked) {
            event.target.nextSibling.nextSibling.style = "display:block";
        } else {
            event.target.nextSibling.nextSibling.style = "display:none";
        }

    }
}
var num = 0;
document.getElementsByClassName("addBtn")[0].onclick = function () {
    if (num == 10) {
        alert("只能添加十个！");
    } else {
        var li = document.createElement("li");
        var input = document.createElement("input");
        input.type = "text";
        input.className = "otherID";
        input.title = ++num;
        li.appendChild(input);
        document.getElementsByClassName("your_forwardID")[0].appendChild(li);
    }

}

/*
 *进行脚本参数配置
 */
document.getElementsByClassName("ack")[0].onclick = function () {
    //关注模块
    //console.log("it work!");
    if (!document.getElementsByClassName("need group_content")[0].checked
        && document.getElementsByClassName("group_word")[0].value != "") {
        localStorage.group_content = document.getElementsByClassName("group_word")[0].value;
    } else {
        localStorage.group_content = "default";
    }
    if (!document.getElementsByClassName("need user_content")[0].checked
        && document.getElementsByClassName("user_word")[0].value != "") {
        localStorage.user_content = document.getElementsByClassName("user_word")[0].value;
    } else {
        localStorage.user_content = "default";
    }

    /*
    *
    *转发微博模块
     */
    //选择转发类型
        var forwards = document.getElementsByClassName("forward");
        if(forwards.length>0) {
            localStorage.forwardtype = forwards[0].checked;
            for (var i = 1; i < forwards.length; i++) {
                localStorage.forwardtype = localStorage.forwardtype + "," + forwards[i].checked;
            }
        }
    //添加转发的ID
    if (document.getElementsByClassName("otherID").length >0) {
        var IDs = document.getElementsByClassName("otherID");
        localStorage.otherIDs = IDs[0].value;
        for (var i = 1; i < IDs.length; i++) {
            if (IDs[i] != "") {//最好用正则
                localStorage.otherIDs = localStorage.otherIDs + "," + IDs[i].value;
            }
        }
    }

    //取关模块
    var unfollow_mun = document.getElementsByClassName("unfollow_mun")[0].value;
    if(isNaN(unfollow_mun)||unfollow_mun === ""){
        alert("取关人数请输入数字！");
    }else{
        localStorage.unfollow_mun=unfollow_mun;

        document.getElementsByClassName("youroptions")[0].style = "display:block";
        document.getElementsByClassName("defineByYouSelf")[0].style = "display:none"
    }
}

/*
 *执行脚本
 */
document.getElementsByClassName("start")[0].onclick = function () {
    start()//开始函数
}

function start() {
    chrome.tabs.query(
        {active: true, currentWindow: true},
        function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    getfans: document.getElementsByClassName("getfans")[0].checked,
                    unfollow: document.getElementsByClassName("unfollow")[0].checked,
                    forward: document.getElementsByClassName("forwardweibo")[0].checked,
                    group_content: localStorage.group_content,
                    user_content: localStorage.user_content,
                    unfollow_mun: localStorage.unfollow_mun,
                    forwardtype: localStorage.forwardtype,
                    otherIDs: localStorage.otherIDs
                },
                function (response) {
                    console.log(response.text);
                    window.close();
                });
        });
}