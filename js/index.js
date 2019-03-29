/*
 
 * by xiaosong 2019.3.6
 * 登录注册页面
 * */

 function getImgCode(ele){
	  $(ele).attr("src",_url+"/piccode?r=" + Math.floor(Math.random()*100000));
 }
 
$(function(){
	addLoadingCtrl();
	//首次赋值
	var userObj = get('userObj');
    if (userObj) {
    	 	window.location.href="task.html";
       	window.close();
    }
	$('#piccodeImg').attr("src",_url+"/piccode?r="+ Math.floor(Math.random()*100000));
	var flag = false;
	var params = {};
	$('#code-bt').click(function(){
		if($('#_tel').val() == ''){
	        errorAlert('手机号码不能为空');
	        return;
	    }
	    if(!isTel($('#_tel').val())){
	        errorAlert('请输入正确的手机号码');
	        return;
	    }
	    if($('#piccode').val() == ''){
	        errorAlert('请输入图形验证码');
	        return;
	    }
        params.mobile = $('#_tel').val();
        params.piccode = $('#piccode').val();
     	getCodeCtrl(params);
	});
	
	$('#login-bt').click(function(){
		if($('#_tel').val() == ''){
	        errorAlert('手机号码不能为空');
	        return;
	    }
	    if(!isTel($('#_tel').val())){
	        errorAlert('请输入正确的手机号码');
	        return;
	    }
	    if($('#piccode').val() == ''){
	        errorAlert('请输入图形验证码');
	        return;
	    }
		if($('#_code').val() == ''){
	        errorAlert('验证码不能为空');
	        return;
	    }
	 	params.mobile = $('#_tel').val();
        params.piccode = $('#piccode').val();
		params.smscode = $('#_code').val();
		loginCtrl(params);
	});
	
	
});

function checkInfor(){
    flag = true;
}
function loginCtrl(params){
	getJsonpHtml('/user/login',params,function(data){
		if(data.code == -1){
			errorAlert(data.msg)
		}
		if(data.code == 0){
			var flag = data.data.setPayPassword == 0 ? true : false;
			var userObj = {};
			userObj.uid = data.data.uid;
			userObj.tel = params.mobile;
			userObj.isFlag = flag;
			set('userObj',userObj);
			get('userObj',1000*60*60*24*7);
			window.location.href="task.html";
			window.close();
		}
	},function(e){
		
	});
}
function getCodeCtrl(params){
	getJsonpHtml('/get/smscode',params,function(data){
 		if(data.code == 0){
			settime($('#code-bt'));
			errorAlert(data.msg);
		}
 		if(data.code == -1){
			errorAlert(data.msg);
		}

	},function(e){
		
	});
}