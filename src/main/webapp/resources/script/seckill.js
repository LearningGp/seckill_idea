//存放主要交互逻辑js代码
var seckill ={
    URL: {
        now : function () {
            return '/seckill/time/now';
        }
    },
    validatePhone:function(phone){
      if(phone && phone.length == 11 && !isNaN(phone)){
          return true;
      } else {
          return false;
      }
    },
    countDown:function(seckillId,nowTime,startTime,endTime){
        var seckillBox = $('#seckill-box');
        if(nowTime > endTime){
            seckillBox.html('秒杀结束！');
        }else if (nowTime < startTime){
            var killTime = new Date(startTime + 1000);
            console.log(killTime);
            seckillBox.countdown(killTime,function (event) {
                var format = event.strftime('秒杀计时：%D天 %H时 %M分 %S秒');
                seckillBox.html(format);
            });
        }
    },
    detail: {
        init : function (params) {
            //手机验证和登录，计时交互
            var killPhone = $.cookie('killPhone');

            if(!seckill.validatePhone(killPhone)){
                var killPhoneModal = $('#killPhoneModal');
                killPhoneModal.modal({
                    show:true,
                    backdrop:'static',
                    keyboard:false
                });
                $('#killPhoneBtn').click(function (){
                   var inputPhone = $('#killPhoneKey').val();
                   if(seckill.validatePhone(inputPhone)){
                       $.cookie('killPhone',inputPhone,{expires:7,path:'/seckill'});
                       window.location.reload();
                   }else {
                       $('#killPhoneMessage').hide().html('<label class="label label-danger">手机号错误！</label>').show(300);
                   }
                });
            }
            //计时交互
            var startTime = params['startTime'];
            var endTime = params['endTime'];
            var seckillId = params['seckillId'];
            $.get(seckill.URL.now(),{},function (result) {
                if(result && result['success']){
                    var nowTime = result['data'];
                    seckill.countDown(seckillId,nowTime,startTime,endTime);
                    console.log('result:'+result['success']);
                }else {
                    console.log('result:'+result['success']);
                }
            });
        }
    }
}