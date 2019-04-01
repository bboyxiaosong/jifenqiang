/*
 
 * by xiaosong 2019.3.6
 * 登录之后首页
 * */
$(function(){
	addLoadingCtrl();
	var userObj = get('userObj');
    if (userObj) {
       	userObj.sid='BH12358';
		if(userObj.uid){
			getTasklistCtrl(userObj);
			userInforCtrl(userObj);
			$('.no-login').hide();
			$('.is-land').show();
			$('.nick-name').html(userObj.tel);
			$('#cashDeposit').click(function(){
    				if(userObj.isFlag){
    					window.location.href="setpassword.html";
    				}else{
    					window.location.href="cashDeposit.html";
    				}
    			});
		}    
    }else{
    		var obj = {};
    		obj.sid='BH12358';
    		getTasklistCtrl(obj);
        $('.no-login').show();
		$('.is-land').hide();
    }
});


//4.3	获取积分墙中的任务列表
function getTasklistCtrl(params){
	if(!params){var params = {}}
	getJsonpHtml('/task/list',params,function(data){
		if(data.code == 200){
			var arr = data.data.result;
			taskListCtrl(arr);
		}else{
			errorAlert(data.msg);
		}
	},function(e){
		
	});
}
//任务列表循环
function taskListCtrl(arr){
	var ul_wrap = $('.ul-wrap');
	ul_wrap.html('');
	var str = '';
	if(arr.length > 0){
		$.each(arr, function(index,ele) {
			str+='<div class="list">'
				+'	<div class="lf-head" style="background: url('+ele.pic.url+') no-repeat center center;"></div>'
				
				+'	<div class="center-time">'
				+'		<div class="label-name">'+ele.title+'</div>'
				+'      <div class="rewardprice">奖励金额'+ele.rewardprice+'元</div>'
				+'		<div class="bottom-time"><span>'+getLocalTime(ele.expiretime,3)+'</span><span class="daoqi-time">'+getLocalTime(ele.expiretime,6)+' 到期</span></div>'
				+'	</div>'
				+'	<div class="rt-btn" data-tid="'+ele.tid+'" onclick="immedCtrl(this)" data-link="'+ele.link.url+'" data-pic="'+ele.pic.url+'" data-desc="'+ele.introduction+'">立即前往</div>'
				+'	<div class="clear"></div>'
				+'</div>';
		});
		ul_wrap.html(str);
	}else{
		ul_wrap.html('<div class="no_content">暂无任务 !</div>');
	}
}
function immedCtrl(ele){
	var userObj = get('userObj');
	var obj = {};
	
	if(userObj){
		if(userObj.uid){
			var tid = $(ele).attr('data-tid');
			obj.pic =  $(ele).attr('data-pic');
			obj.desc =  $(ele).attr('data-desc');
			obj.link =  $(ele).attr('data-link');
			userObj.tid = tid;
			receiveTaskCtrl(userObj,obj);
		}	
	}else{
		window.location.href = "index.html";
	}
}
//4.7	会员领取任务
function receiveTaskCtrl(params,obj){
	getJsonpHtml('/user/get/task',params,function(data){
		if(data.code == 0){
			getTasklistCtrl(params);
			window.location.href = "taskDetail.html?pic="+obj.pic+"&desc="+obj.desc+"&link="+obj.link;
		}else{
			errorAlert(data.msg);
		}
	},function(e){
		
	});
}
//4.5	获取会员钱包余额
function userInforCtrl(params){
	getJsonpHtml('/user/wallet/balance',params,function(data){
		if(data.code == -1){
			errorAlert(data.msg)
		}
		if(data.code == 0){
			$('#wallet_balance').html(data.data.wallet_balance);
		}
	},function(e){
		
	});
}
//4.4	用户退出登录
function exitCtrlFn(){
	var params = {};
	getJsonpHtml('/user/exit',params,function(data){
		if(data.code == -1){
			errorAlert(data.msg)
		}
		if(data.code == 0){
			var storage1 = window.localStorage;
			storage1.clear();
			window.location.reload();
		}
	},function(e){
		
	});
}
function historyCtrl(){
	var userObj = get('userObj');
    if (userObj) {
    	 	window.location.href="taskHistory.html";
    }else{
       window.location.href="index.html";
    }   
}

