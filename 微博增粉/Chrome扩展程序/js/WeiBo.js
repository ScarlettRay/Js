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

//启动
function installScript(getfans,unfollow,forward){
	var commons,script;
	
        if (document.readyState == "complete") {
			console.log("执行Chrome扩展程序");
			if(window.location.pathname.indexOf("/home")>-1&&getfans){
			//引入脚本，Jquery.js和WeiBo.js,commons.js
			commons=document.createElement("script");
		   commons.src=dataDitionary.url.commons;
		   document.body.appendChild(commons);
		   
           script=document.createElement("script");
		   script.src=dataDitionary.url.Jquery;
		   document.body.appendChild(script);
		   
		   var WeiBo=document.createElement("script");
		   WeiBo.src=dataDitionary.url.WeiBo_js;
		   document.body.appendChild(WeiBo);
		   
			}
		if(window.location.host.indexOf("weibo.com")>-1&&unfollow){
			if(!commons){
			commons=document.createElement("script");
		   commons.src=dataDitionary.url.commons;
		   document.body.appendChild(commons);
			}
			if(script){
			var unfollow=document.createElement("script");
		   unfollow.src=dataDitionary.url.UnFollowing;
		   document.body.appendChild(unfollow);	
			}else{
			script=document.createElement("script");
		   script.src=dataDitionary.url.Jquery;
		   script.onload=function(){ 
		   var unfollow=document.createElement("script");
		   unfollow.src=dataDitionary.url.UnFollowing;
		   document.body.appendChild(unfollow);
		   };
		   document.body.appendChild(script);	
			}
			
			}
		if(window.location.host.indexOf("weibo.com")>-1&&forward){
			if(!commons){
			commons=document.createElement("script");
		   commons.src=dataDitionary.url.commons;
		   document.body.appendChild(commons);	
			}
			
			if(script){
		   var sendWeiBo=document.createElement("script");
		   sendWeiBo.src=dataDitionary.url.sendWeiBo;
		   document.body.appendChild(sendWeiBo);				
			}else{
			script=document.createElement("script");
		   script.src=dataDitionary.url.Jquery;
		   script.onload=function(){ 
		   var sendWeiBo=document.createElement("script");
		   sendWeiBo.src=dataDitionary.url.sendWeiBo;
		   document.body.appendChild(sendWeiBo);
		   };
		   document.body.appendChild(script);	
			}

			}
			
        }else{
			document.onreadystatechange = function () {
				if (document.readyState == "complete"){
				installScript(getfans,unfollow,forward);
				}
			}
		}
    
};

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
		if(!dataDitionary.hasStarted){
		installScript(message.getfans,message.unfollow,message.forward);
		dataDitionary.hasStarted=true;
		sendResponse({text: "脚本开始执行"})
		}else{
			alert("脚本已在执行！如要修改选项，请刷新后重新选择！")
		}
        
});

