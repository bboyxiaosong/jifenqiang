/*
 
 * by xiaosong 2019.3.6
 * 设置密码
 * */

 function getImgCode(ele){
	  $(ele).attr("src",_url+"/baihe-adserver/piccode?r=" + Math.floor(Math.random()*100000));
 }
 
$(function(){
	addLoadingCtrl();
	var flag = false;
	var params = {};
	var userObj = get('userObj');//过期时间为1周
    if (userObj) {
    	 	 params.mobile = userObj.tel;
    	 	 if(!userObj.isFlag){
    	 	 	window.location.href="cashDeposit.html";
       		window.close();
    	 	 }
    }else{
       window.location.href="index.html";
       window.close();
    }   
	//首次赋值
	
	$('#piccodeImg').attr("src",_url+"/baihe-adserver/piccode?r="+ Math.floor(Math.random()*100000));
	$('#code-bt').click(function(){
		
	    if($('#piccode').val() == ''){
	        errorAlert('请输入图形验证码');
	        return;
	    }
        params.piccode = $('#piccode').val();
     	getCodeCtrl(params);
        
	});
	
	var obj = {};
	$('#login-bt').click(function(){
		if($('#_password').val() ==''){
			errorAlert('密码不能为空');
			 return;
		}
		if(!isPasswd($('#_password').val())){
			errorAlert('请输入6-20个字母、数字、下划线');
			 return;
		}
		if($('#_password').val() !== $('#sure_password').val()){
			errorAlert('两次输入密码不一致');
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
		obj.uid = userObj.uid;
		obj.piccode = $('#piccode').val();
		obj.smscode = $('#_code').val();
		obj.newPassword = $('#_password').val();
		obj.confirmPassword = $('#sure_password').val();
		submitPowardCtrl(obj);
		
	});
	$('.mask .common_close').click(function(){
		$('.mask,.success_box,fail_wrap').hide();
	});
	
	
});


function checkInfor(){
    flag = true;
}

function getCodeCtrl(params){
	getJsonpHtml('/baihe-adserver/get/smscode',params,function(data){
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

function submitPowardCtrl(params){
	getJsonpHtml('/baihe-adserver/user/set/payassword',params,function(data){
 		if(data.code == -1){
			//errorAlert(data.msg);
			$('.mask,.fail_wrap').show();
			$('.mask .fail_wrap .txt1').html(data.msg);
		}
		if(data.code == 0){
			$('.mask,.success_box').show();
			var flag = data.code == 0 ? false : true;
			var userObj = get('userObj');
			userObj.isFlag = flag;
			set('userObj',userObj);
		}

	},function(e){
		
	});
}
function successCtrl(){
	window.location.href="task.html";
	window.close();
}



