/*
 
 * by xiaosong 2019.3.6
 * 
 * */

var isbool = true;
$(function(){
	addLoadingCtrl();
	var userObj = get('userObj');//过期时间为1周
    if (userObj) {
    		userObj.pageNo = 1;
    		userObj.pageSize = 10;
    		billListCtrl(userObj);
    }else{
       window.location.href="index.html";
       window.close();
    }
    
     window.onscroll = function() {
        if (getScrollTop() + getWindowHeight() >= getScrollHeight() - 20 && isbool == true) {
            isbool = false;
            userObj.pageNo += 1;
            setTimeout(function(){
                billListCtrl(userObj);
            },300)
        } 
    }
});
//4.6	获取会员账务明细
function billListCtrl(params){
	getJsonpHtml('/baihe-adserver/user/bill/list',params,function(data){
 		if(data.code == 0){
		 	taskListCtrl(data.data.accountdetailslist,params);
		}else{
			errorAlert(data.msg);
		}
	 	},function(e){
	 		
 	});
 	isbool = true;
}

function taskListCtrl(arr,params){
	var ul_wrap = $('.cash-ul');
	var str = '';
	$.each(arr, function(index,ele) {
		ele.statusName = ele.status== 0?'已成功':'待审核';
		
		ele.amount = ele.amount/100;
		str +='<div class="cash-list">'
			+'<div class="left-wrap">'
			+'	<div class="store-name">'+ele.memo+'</div>'
			+'	<div class="cash-times">'+getLocalTime(ele.createtime,3)+ '<span class="tixian_time">'+getLocalTime(ele.createtime,6)+'</span></div>'
			+'</div>'
			+'<div class="center-wrap">'+ele.statusName+'</div>'
			+'<div class="right-wrap">'+ele.amount+'</div>'
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