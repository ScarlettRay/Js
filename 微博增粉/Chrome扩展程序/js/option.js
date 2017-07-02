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