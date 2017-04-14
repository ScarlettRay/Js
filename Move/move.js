/**
 * Created by Ray on 2017/4/14.
 */
//終極動畫函數
function moveStart(obj, jData, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
            var flag = true;
            for (var attr in jData) {
                var target = jData[attr];
                if (attr == "opacity") {
                    curStyle = parseFloat(getStyle(obj, attr))*100;
                    target=target*100;
                } else {
                    curStyle = parseInt(getStyle(obj, attr));
                }
                speed = (target - curStyle) / 5;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (curStyle != target) {
                    flag=false;
                    if (attr == "opacity") {
                        obj.style.filter = "alpha(opacity:" + curStyle + speed + ")";
                        obj.style[attr] = (curStyle + speed) / 100;
                    } else {
                        console.log(attr + ":" + curStyle);
                        obj.style[attr] = curStyle + speed + "px";
                    }
                }
            }
            if(flag){
                clearInterval(obj.timer);
                if(callback){
                    callback();
                }
            }
        }
        ,
        30
    );
}
;

function getStyle(obj, attr) {
    if (getComputedStyle) {
        return getComputedStyle(obj, false)[attr];

    } else {
        return obj.currentStyle[attr];
    }

}
