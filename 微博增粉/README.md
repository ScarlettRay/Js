# 微博管理机器人
[![SinaWeiBoRobot](https://img.shields.io/badge/detail-bolg-green.svg)](http://120.77.38.103//?p=103)      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;       [![SinaWeiBoRobot](https://img.shields.io/badge/project-download-red.svg)](120.77.38.103/wordpress/wp-content/themes/MyDream1.5/js/chromeextension.zip)


这个星期都被拿来写一个js脚本程序了，不过也还挺好玩的。下面就介绍一下这个历时一个星期完成的脚本文件。
程序主要有三个模块组成，分别是关注用户发送信息，取消关注，转发热门微博。我把他做成Chrome扩展应用的形式，可以给一些没有编程基础的人用。</br>
注意，所有功能都需要你登录才能执行</br>
把谷歌扩展程序加载进去以后，你就可以使用以下三个功能了。</br>

然后进入微博的我的首页，网址的样子大概是：http://weibo.com/u/你的微博id/home?…,  对，进入以后，在右上角点击微博图标，选择你需要的模块，然后点击执行。脚本就会开始执行了</br>
关注模块和取关模块就要在首页执行，发微博模块就可以任意weibo.com下的页面可以执行</br></br>
<strong>【关注用户发送信息】</strong>在写这个脚本之前，我了解了一下微博增粉的主要渠道。发现一个互粉群的东西，可以有效的涨粉。我的脚本也主要是从这方面下手。首先你的先进入几个互粉群，人越多越好。
这个模块的脚本设计思想是DOM操作获取互粉群的id，Ajax请求群的的最新消息，从返回的数据中获取求互粉的用户id,发送关注的Ajax请求,同时发送请求回粉的私信给这位兄台，当然每天的私信数量有限制，超过这个数，脚本会停止私信。最后还会在这个群上发送一条求互粉的消息。</br>

<strong>【取消关注】</strong>进入微博的我的首页，我设置每次取消关注100名。达到数量会停止并弹出提示“OK”.</br>

<strong>【转发微博】</strong>这个开发耗时最久，(进入除上面列出的网址外，包含weibo.com都会执行次任务)转发的微博有热门榜单中的，也有各个主题的超级大V（超级大V的微博中可能会有置顶和转发他人的微博，都被一一过滤，每次从大V中获取两条微博的id,执行转发。后来发现没有转发文字很难看。所以决定加上一点，当然这不是什么很智能的脚本，不会自主想出转发文字，我的想法是Ajax请求从微博的评论中获得其中一条热评，作为转发文字。最后也实现了。

观察了两天我的脚本运行情况，修复了一些发现的bug,目前一切运行正常稳定。
可能微博会提示你账号表现异常，不过可以忽略。

脚本一直都会更新的，也会通过谷歌扩展程序给出更多的供用户选择的选项等,提高用户体验。
