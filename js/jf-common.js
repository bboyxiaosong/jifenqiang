/*
 * 
  公共 js 
  /*
 
 * by xiaosong 2019.3.6
 * 
 * */

var _url = 'http://120.92.93.15:8089';

function isTel(s) {
	if(s.length != 11) return false;
	var patrn = /^(0|86|17951)?(16[0-9]|19[0-9]|13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
	if(!patrn.exec(s)) return false;
	return true;
}

function addLoadingCtrl() {
	var html = '';
	html += '<div class="loading-container"> <div class="loading">' +
		' <span></span>' +
		' <span></span>' +
		' <span></span>' +
		' <span></span>' +
		' <span></span>' +
		'</div></div>';
	$('body').append(html)
}

function errorAlert(ele) {
	$(".error").html(ele).show();
	setTimeout(function() {
		$(".error").fadeOut();
	}, 1500)
}

//倒计时
function settime(obj) {
	var t = '';
	var countdown = '';
	countdown = 60;
	t = setInterval(function() {
		countdown--;
		if(countdown == 0) {
			clearInterval(t);
			obj.removeAttr("disabled");
			obj.val("获取验证码");
			return;
		} else {
			obj.attr("disabled", true);
			obj.val(countdown + "秒后获取");
		}
	}, 1000);
}
//时间戳变为年月日
function getLocalTime(stamp, type) {
	var format;
	var formatDate = new Date();
	formatDate.setTime(stamp);
	var year = formatDate.getFullYear();
	var month = formatDate.getMonth() + 1;
	var date = formatDate.getDate();
	var hour = formatDate.getHours();
	var minute = formatDate.getMinutes();
	if(hour < 10) {
		hour = '0' + hour;
	}
	if(minute < 10) {
		minute = '0' + minute;
	}
	if(type) {
		if(type == 1) { //形式2018.3.21
			if(month < 10) {
				month = '0' + month;
			}
			if(date < 10) {
				date = '0' + date;
			}
			format = formatDate.getFullYear() + "." + month + "." + date;
		}
		if(type == 2) { //形式3月21日
			format = month + "月" + date + "日";
		}
		if(type == 3) { //形式2018-04-08
			if(month < 10) {
				month = '0' + month;
			}
			if(date < 10) {
				date = '0' + date;
			}
			format = formatDate.getFullYear() + "年" + month + "." + date;
		}
		if(type == 4) {
			if(date < 10) {
				date = '0' + date;
			}
			format = month + "月" + date + "日" + hour + ":" + minute;
		}
		if(type == 5) {
			if(date < 10) {
				date = '0' + date;
			}
			format = year + "-" + month + "-" + date + "  " + hour + ":" + minute;
		}
		if(type == 6) {
			if(hour < 10) {
				hour = '0' + hour;
			}
			if(minute < 10) {
				minute = '0' + minute;
			}
			format =  hour + ":" + minute;
		}
		

	} else { //形式2018年3月21日
		format = formatDate.getFullYear() + "年" + month + "月" + date + "日";
	}

	return format;
}
function getUrlParms(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
    return decodeURI(r[2]);
    return null;
}
var u = navigator.userAgent, app = navigator.appVersion
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
$(document).ready(function(){
	$("input").blur(function(){
		if (isIOS) {
			blurAdjust()
		}
	});
});

function blurAdjust(e){
	setTimeout(()=>{
		if(document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA'){
			return
		}
		let result = 'pc';
		if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
				result = 'ios'
		}else if(/(Android)/i.test(navigator.userAgent)) {  //判断Android
				result = 'android'
		}
		
		if( result = 'ios' ){
			document.activeElement.scrollIntoViewIfNeeded(true);
		}
	},100)
}
function set(key,value){
    var curTime = new Date().getTime();
    localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
}
function get(key,exp){
    var data = localStorage.getItem(key);
    var dataObj = JSON.parse(data);
    if (data) {
    		 if (new Date().getTime() - dataObj.time >=exp) {
    		 	var storage1 = window.localStorage;
			storage1.clear();
			errorAlert('信息已过期,请重新登录');
			return null;
    		 }else{
    		 	var dataObjDatatoJson = dataObj.data
        		return dataObjDatatoJson;
    		 }
    }else{
       return null;
    }
}

function isPasswd(s){   
	var patrn=/^(\w){6,20}$/;   
	if (!patrn.exec(s)) return false 
	return true 
}   
function postHtml(url, data, successfn, errorfn) {
    $.ajax({
        type: "POST",
        data: $.param(data),
        url: url,
        cache: false,
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        //dataType: "json",
        processData: false,
        async: true,
        success: function (d) {
            if (successfn) {
                successfn(d);
            }
        },
        error: function (e) {
            if (errorfn) {
                errorfn(e);
            }
        }
    });
};
function getHtml(url, data, successfn, errorfn) {
    $.ajax({
        type: "get",
        url:url,
        async: true,
		dataType: "json",
        data: {params: JSON.stringify(data)},
        success: function (d) {
            if (successfn) {
                successfn(d);
            }
        },
        error: function (e) {
            if (errorfn) {
                errorfn(e);
            }
        }
    });
};
function getJsonpHtml(url, data, successfn, errorfn) {
    $.ajax({
        aasync:true,
		url: _url + url,  // 跨域URL
		type: 'GET',
		dataType: 'jsonp',
		jsonp: 'jsoncallback', //默认callback
		data: data,
        success: function (d) {
            if (successfn) {
                successfn(d);
            }
        },
        error: function (e) {
            if (errorfn) {
                errorfn(e);
            }
        }
    });
};

//滚动条在Y轴上的滚动距离
function getScrollTop() {
    var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
//文档的总高度
function getScrollHeight() {
    var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}
//浏览器视口的高度
function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
function clearNoNum(val){  
	val = val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符   
	val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的   
	val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
	val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数   
	if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
		val = parseFloat(val);  
	}
	return val;
}