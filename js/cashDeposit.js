/*
 
 * by xiaosong 2019.3.6
 * 提现
 * */

$(function(){
	addLoadingCtrl();
	var userObj = get('userObj');
    if (userObj) {
    		if(userObj.uid){
    			userInforCtrl(userObj);
    		}
    }
    var params = {};
	$('#detail-bt').click(function(){
		var price = parseFloat($('#case_price').val());
		var allPrice = parseFloat($('#ky-rmb').html());
		if($('#alipayno').val() == ''){
	        errorAlert('支付宝账号不能为空');
	        return;
	    }
	    if($('#realname').val() == ''){
	        errorAlert('姓名不能为空');
	        return;
	    }
	    if($('#payPassword').val() == ''){
	        errorAlert('密码不能为空');
	        return;
	    }
	    if($('#case_price').val() == ''){
	        errorAlert('提现金额不能为空');
	        return;
	    }
	    if(price < 1){
	        errorAlert('提现金额应大于1元');
	        return;
	    }
	    if(price > allPrice){
	        errorAlert('提现金额不能超过钱包金额');
	        return;
	    }
        params.uid = userObj.uid;
        params.money = $('#case_price').val();
        params.payPassword = $('#payPassword').val();
        params.alipayno = $('#alipayno').val();
        params.realname = encodeURIComponent($('#realname').val());
     	userCashDeposit(params);
	});
	$('.dialog-content').click(function(){
		window.location.href = "task.html";
		window.close();
	});
	
	$('.case_price').bind('input propertychange', function() {  
		var self = $(this);
		var allPrice = parseFloat($('#ky-rmb').html());
    		price = self.val();
    		if(price){
    			clearNoNum(price);
    			self.val(clearNoNum(price));
    			if(clearNoNum(price) > allPrice){
    				self.val(allPrice);
    			}
    		}
  	});  
});
//4.5	获取会员钱包余额
function userInforCtrl(params){
	getJsonpHtml('/baihe-adserver/user/wallet/balance',params,function(data){
		if(data.code == -1){
			errorAlert(data.msg);
		}
		if(data.code == 0){
			$('#ky-rmb').html(data.data.wallet_balance);
		}
	},function(e){
		
	});
}
function userCashDeposit(params){
	getJsonpHtml('/baihe-adserver/user/withdraw',params,function(data){
		if(data.code == -1){
			errorAlert(data.msg);
		}
		if(data.code == 0){
			$('.dialog').show();
			$('.commom-ipt').val('');
			$('#case_price').val('');
			var userObj = get('userObj');
			userInforCtrl(userObj);
		}
	},function(e){
		
	});
}