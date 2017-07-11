/**
 * Created by Ray on 2017/4/18.
 */
//数据字典
var dataDitionary = {
    url: {
        Jquery:"https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js",
        WeiBo_js:"http://fourlegs.cn/wordpress/wp-content/themes/Snape-master/js/WeiBo.js",
        UnFollowing:"http://fourlegs.cn/wordpress/wp-content/themes/Snape-master/js/Unfollowing.js",
        commons:"http://fourlegs.cn/wordpress/wp-content/themes/Snape-master/js/Commons.js",
        sendWeiBo:"http://fourlegs.cn/wordpress/wp-content/themes/Snape-master/js/SnedWeiBo.js"
    },
    hasStarted:false
};
//安装js
function installWidthUrl(url){
	var js=document.createElement("script");
	js.src=url;
	document.body.appendChild(js);
}
//启动
function installScript(getfans,unfollow,forward){
    if (document.readyState == "complete") {
        console.log("执行Chrome扩展程序");
        var jquery = document.createElement("script");
        jquery.src = dataDitionary.url.Jquery;
        jquery.onload = function () {
            installWidthUrl(dataDitionary.url.commons)
            console.log("a"+getfans);
            if (window.location.pathname.indexOf("/home") > -1 && getfans) {
                //引入脚本，Jquery.js和WeiBo.js,commons.js
				installWidthUrl(dataDitionary.url.WeiBo_js);
				console.log("2")
            }
            if (window.location.pathname.indexOf("/home") > -1 && unfollow) {
				installWidthUrl(dataDitionary.url.UnFollowing);
            }
            if (window.location.host.indexOf("weibo.com") > -1 && forward) {
				installWidthUrl(dataDitionary.url.sendWeiBo);
            }

        };
        document.body.appendChild(jquery);
    }
    else
        {
            document.onreadystatechange = function () {
                if (document.readyState == "complete") {
                    installScript(getfans, unfollow, forward);
                }
            }
        }

};

//与配置页面进行交互
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        if(!dataDitionary.hasStarted){
            //安装脚本
            console.log(message.unfollow);
            installScript(message.getfans,message.unfollow,message.forward);
            //存储配置到sessionstorage
            sessionStorage.group_content=message.group_content;
            sessionStorage.user_content=message.user_content;
            sessionStorage.unfollow_mun=message.unfollow_mun;
            sessionStorage.forwardtype=message.forwardtype;
            sessionStorage.otherIDs=message.otherIDs;
            dataDitionary.hasStarted=true;
            sendResponse({text: "脚本开始执行"})
        }else{
            alert("脚本已在执行！如要修改选项，请刷新后重新选择！")
        }

    });


