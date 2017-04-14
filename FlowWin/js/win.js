
function buildDIV(message){
	var myform=
	"<div " +
	"class='dialogbody' " 
	+
	"id='dialogbody'  "+
	"style= '"
		+ "width:100%;"
		+ "height:300px" +  + ";"
		+ "background-color:white;"
		+ "line-height:18px;"
		+ "word-break:break-all;"
		+ "padding:3px;font-size:14px;"
		+ "'>" + message + "</div>"
		document.body.insertAdjacentHTML("beforeEnd",myform);
}

/**
*@Author Ray
*@param message 窗体内容html字符串
*		title 窗口标题
*/
function createWin(message,title){
	var dialogexist = document.getElementById("dialog");
	if(dialogexist == null){
	var dialog = document.createElement("div");
	dialog.setAttribute("id","dialog");
	/*创建窗口标题栏元素并添加属性*/
	var dialogtitlebar = document.createElement("div");
	var dialogtitle = document.createElement("span");
	var dialogclose = document.createElement("button");
	dialogtitlebar.setAttribute("class","dialogtitlebar");
	dialogtitle.setAttribute("class","title");
	dialogclose.setAttribute("class","close");
	/*封装窗口状态栏元素*/
	dialogtitle.innerHTML = title;
	dialogtitlebar.appendChild(dialogtitle);
	dialogtitlebar.appendChild(dialogclose);
	/*获取窗体元素*/
	buildDIV(message);
	var dialogbody=document.getElementById("dialogbody");
	/*封装整个窗口*/
	dialog.appendChild(dialogtitlebar);
	dialog.appendChild(dialogbody);
	/*装载整个窗口进body*/
	document.body.appendChild(dialog);
//	document.body.appendChild(gray);
	
	
	/*窗体缩放居中事件*/
	var temptop,templeft
	var minetop,mineleft
	temptop = (window.innerHeight-600)/2;
	templeft = (window.innerWidth-360)/2;
	$("#dialog").css("left",templeft);
	$("#dialog").css("top","600");
	$(window).resize(function(){
	$("#dialog").css("left",(window.innerWidth-360)/2);
	$("#dialog").css("top",(window.innerHeight-600)/2);
//	$("#gray").css("width",window.innerWidth);
//	$("#gray").css("height",window.innerHeight);
	minetop = parseInt($("#dialog").css("top"));        //松开鼠标时要重新给这两个值赋值否则会使用之前的旧的值导致下次移动的时候发生问题
	mineleft = parseInt($("#dialog").css("left"));
    });
	
	
	
	/*窗口移动事件*/
	var ismousedown = false;
	var downX,downY
	minetop = parseInt($("#dialog").css("top"));
	mineleft = parseInt($("#dialog").css("left"));
	$("#dialog .dialogtitlebar").mousedown(function(e){
		ismousedown = true;
		downX=e.clientX;
		downY=e.clientY;
	});
	
	$(document).mousemove(function(e){
		if(ismousedown){
		$("#dialog").css("top",e.clientY-downY+minetop);    //意义为“鼠标Y轴上移动的距离”即 鼠标终止移动的坐标的Y值(e.clientY) 减去 鼠标第一下点击的初始坐标的Y值(downY)
		$("#dialog").css("left",e.clientX-downX+mineleft);
		}
	});
	
	$(document).mouseup(function(){
		minetop = parseInt($("#dialog").css("top"));        //松开鼠标时要重新给这两个值赋值否则会使用之前的旧的值导致下次移动的时候发生问题
	    mineleft = parseInt($("#dialog").css("left"));
		ismousedown = false;
	});
	
	/*点击关闭窗口事件*/
	$("#dialog .dialogtitlebar .close").click(function(){
		document.body.removeChild(dialog);
		$("#body").children().removeAttr("disabled");
//		document.body.removeChild(gray);
	});
	
	
	}
}

/**
*@Author Ray
*@param message 窗体内容html字符串
*		title 窗口标题
*		startColor 标题栏起始颜色
*		endColor 标题栏终止颜色
*		dialogtitlebarWidth 标题栏宽
*		dialogtitlebarHeight 标题栏高
*		bodywidth 宽
*		bodyheight 高
*/
function createWin(message,title,startColor,endColor,dialogtitlebarWidth,dialogtitlebarHeight,bodywidth,bodyheight){
	var dialogexist = document.getElementById("dialog");
	if(dialogexist == null){
	var dialog = document.createElement("div");
	dialog.setAttribute("id","dialog");
	/*创建窗口标题栏元素并添加属性*/
	var dialogtitlebar = document.createElement("div");
	var dialogtitle = document.createElement("span");
	var dialogclose = document.createElement("button");
	dialogtitlebar.setAttribute("class","dialogtitlebar");
	dialogtitle.setAttribute("class","title");
	dialogclose.setAttribute("class","close");
	/*封装窗口状态栏元素*/
	dialogtitle.innerHTML = title;
	dialogtitlebar.appendChild(dialogtitle);
	dialogtitlebar.appendChild(dialogclose);
	/*获取窗体元素*/
	buildDIV(message);
	var dialogbody=document.getElementById("dialogbody");
	/*封装整个窗口*/
	dialog.appendChild(dialogtitlebar);
	dialog.appendChild(dialogbody);
	/*装载整个窗口进body*/
	document.body.appendChild(dialog);
//	document.body.appendChild(gray);
	
	
	/*窗体缩放居中事件*/
	var temptop,templeft
	var minetop,mineleft
	temptop = (window.innerHeight-600)/2;
	templeft = (window.innerWidth-360)/2;
	$("#dialog").css("left",templeft);
	$("#dialog").css("top","600");
	$(window).resize(function(){
	$("#dialog").css("left",(window.innerWidth-360)/2);
	$("#dialog").css("top",(window.innerHeight-600)/2);
//	$("#gray").css("width",window.innerWidth);
//	$("#gray").css("height",window.innerHeight);
	minetop = parseInt($("#dialog").css("top"));        //松开鼠标时要重新给这两个值赋值否则会使用之前的旧的值导致下次移动的时候发生问题
	mineleft = parseInt($("#dialog").css("left"));
    });
	
	
	
	/*窗口移动事件*/
	var ismousedown = false;
	var downX,downY
	minetop = parseInt($("#dialog").css("top"));
	mineleft = parseInt($("#dialog").css("left"));
	$("#dialog .dialogtitlebar").mousedown(function(e){
		ismousedown = true;
		downX=e.clientX;
		downY=e.clientY;
	});
	
	$(document).mousemove(function(e){
		if(ismousedown){
		$("#dialog").css("top",e.clientY-downY+minetop);    //意义为“鼠标Y轴上移动的距离”即 鼠标终止移动的坐标的Y值(e.clientY) 减去 鼠标第一下点击的初始坐标的Y值(downY)
		$("#dialog").css("left",e.clientX-downX+mineleft);
		}
	});
	
	$(document).mouseup(function(){
		minetop = parseInt($("#dialog").css("top"));        //松开鼠标时要重新给这两个值赋值否则会使用之前的旧的值导致下次移动的时候发生问题
	    mineleft = parseInt($("#dialog").css("left"));
		ismousedown = false;
	});
	
	/*点击关闭窗口事件*/
	$("#dialog .dialogtitlebar .close").click(function(){
		document.body.removeChild(dialog);
		$("#body").children().removeAttr("disabled");
//		document.body.removeChild(gray);
	});
	
	//自定义属性
	$("#dialog .dialogtitlebar").css("background","linear-gradient(to top, "+endColor+", "+startColor+")");
	$("#dialog .dialogtitlebar").css("width",dialogtitlebarWidth);
	$("#dialog .dialogtitlebar").css("height",dialogtitlebarHeight);
	$("#dialog .dialogbody").css("width",bodywidth);
	$("#dialog .dialogbody").css("height",bodyheight);
	}
}