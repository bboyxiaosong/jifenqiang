
/*
 * 
 by xiaosong  2019.3
 * 历史任务列表
 * */
var isbool = true;
$(function(){
	addLoadingCtrl();
	var userObj = get('userObj');//过期时间为1周
    if (userObj) {
    		userObj.pageNo = 1;
    		userObj.pageSize = 20;
    	 	taskHitstoryCtrl(userObj);
    }else{
       window.close();
       window.location.href="index.html";
    }
    window.onscroll = function() {
        if (getScrollTop() + getWindowHeight() >= getScrollHeight() - 20&&isbool==true) {
            isbool = false;
            userObj.pageNo += 1;
            setTimeout(function(){
                taskHitstoryCtrl(userObj);
            },300)
        } 
    }
    
});
//4.8	会员历史任务
function taskHitstoryCtrl(params){
	getJsonpHtml('/baihe-adserver/user/history/tasks',params,function(data){
		if(data.code == 0){
			 taskListCtrl(data.data.tasklist,params);
		}else{
			errorAlert(data.msg);
		}
	},function(e){
		
	});
	 isbool = true;
	
}
//4.11	用户确认完成任务
function completeCtrl(params){
	getJsonpHtml('/baihe-adserver/user/task/complete',params,function(data){
		if(data.code == 0){
			var params = {};
			params.uid = params.uid;
			taskHitstoryCtrl(params);
		}else{
			errorAlert(data.msg);
		}
	},function(e){
		
	});
}
function sureCtrlFn(ele){
	var self = $(ele);
	var tid = self.attr('data-tid');
	var userObj = get('userObj');//过期时间为1周
	userObj.tid = tid;
	if(self.hasClass('status_0')){
		completeCtrl(userObj);
	}
}

function taskListCtrl(arr,params){
	var ul_wrap = $('.task-ul');
	var str = '';
	var statusStr = '';
	$.each(arr, function(index,ele) {
			console.log(ele);
			ele.statusName = ele.status== 0?'未完成</br>请确认':ele.status== 1?'待审核':ele.status==2?'已完成':ele.status==3?'已失效':'未通过';
			
			str+='<div class="task-li">'
				+'<div class="lf-img" style="background: url('+ele.pic+') no-repeat center center;"></div>'
				+'<div class="left-wrap">'
				+'	<div class="store-name">'+ele.tname+' <span style="color: #f8b526;">'+(ele.award/100)+'元</span></div>'
				+'	<div class="cash-times">'+getLocalTime(ele.expiretime,3)+'<span class="daoqi-time">'+getLocalTime(ele.expiretime,6)+' 到期</span></div>'
				+'</div>'
				+'<div class="right-wrap status_'+ele.status+'" data-tid="'+ele.tid+'" onclick="sureCtrlFn(this)" >'+ele.statusName+'</div>'
				+'<div class="clear"></div>'
			+'</div>';
	});
	if(params.pageNo == 1){
		if(!arr.length){
			ul_wrap.html('<div class="no_content">暂无账务明细</div>');
		}else{
			ul_wrap.html(str);
		}
	}else{
		ul_wrap.append(str);
	}
}