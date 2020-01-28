//存放主要交互逻辑js代码
var seckill ={
    URL: {
        now : function () {
            return '/seckill/time/now';
        },
        exposer : function (seckillId) {
            return '/seckill/'+seckillId+'/exposer';
        },
        execution : function (seckillId,md5) {
            return '/seckill/'+seckillId+'/'+md5+'/execution';
        }
    },
    handleSeckill : function(seckillId,node){
        //处理秒杀逻辑
        node.hide()
            .html('<button class="btn btn-primary btn-lg" id="killBtn">开始秒杀</button>');
        $.post(seckill.URL.exposer(seckillId),{},function (result) {
            //在回调函数中执行交互流程
            if(result && result['success']){
                var exposer = result['data'];
                if(exposer['exposed']){
                    //开启了秒杀
                    //获取秒杀地址
                    var md5 = exposer['md5'];
                    var killUrl = seckill.URL.execution(seckillId,md5);
                    console.log("killUrl"+killUrl);
                    //绑定一次
                    $('#killBtn').one('click',function () {
                        //绑定点击事件，执行秒杀请求操作
                        $(this).addClass('disabled');//禁用按钮
                        $.post(killUrl,{},function (result) {
                            if(result && result['success']){
                                var killResult = result['data'];
                                var state = killResult['state'];
                                var stateInfo = killResult['stateInfo'];
                                node.html('<span class="label label-success">'+stateInfo+'</span>');
                            }
                        });//发送秒杀请求
                    });
                    node.show();
                }else {
                    //未开启秒杀
                    var now = exposer['now'];
                    var start = exposer['start'];
                    var end = exposer['end'];
                    seckill.countDown(seckillId,now,start,end);
                }
            }else {
                console.log('result:'+result);
            }
        });
    },
    validatePhone:function(phone){
      if(phone && phone.length == 11 && !isNaN(phone)){
          return true;
      } else {
          return false;
      }
    },
    countDown:function(seckillId,nowTime,startTime,endTime){
        console.log('5');
        var seckillBox = $('#seckill-box');
        if(nowTime > endTime){
            seckillBox.html('秒杀结束！');
        }else if (nowTime < startTime){
            var killTime = new Date(startTime + 1000);
            console.log(killTime);
            seckillBox.countdown(killTime,function (event) {
                var format = event.strftime('秒杀计时：%D天 %H时 %M分 %S秒');
                seckillBox.html(format);
                /*时间完成后回调事件*/
            }).on('finish.countdown',function () {
                //获取秒杀地址，控制秒杀逻辑，执行秒杀
                seckill.handleSeckill(seckillId,seckillBox);
            });
        }else{
            //秒杀开始
            console.log('2');
            seckill.handleSeckill(seckillId,seckillBox);

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
                    console.log('result1:'+result['success']);
                }else {
                    console.log('result2:'+result['success']);
                }
            });
        }
    }
}