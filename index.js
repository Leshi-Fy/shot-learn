$(function(){
    // 规则按钮监听
    $('.bottom').click(function(){
        // 关闭规则按钮监听
        $('.rules').stop().fadeIn(100)
        if ($('.gameContent').css('display')=='block'){
            clearInterval(int_time)
            clearInterval(int_anime)
        }
        
    })
    $('.rules').children('button').click(function(){
        $('.rules').stop().fadeOut(100)
        if ($('.gameContent').css('display')=='block'){
            int_time=setInterval(intTime,50)
            int_anime=setInterval(anime,10)
        }
        
    })
    //游戏开始按钮监听
    $('.start').click(function(){
        $('.start').css({
            'display':'none'
        })
        $('.gameContent').css({
            'display':'block'
        })
        $('.target_far').children().remove()
        $('.target_mid').children().remove()
        $('.target_near').children().remove()
        gamestart_time()
        get_target()
        $('.score').children('span').html(0)
    })
    //暂停按钮监听
    $('.clockOutline').children('.pause').click(function(){
        $('.gamePause').css({
            'display':'block'
        })
        clearInterval(int_time)
        clearInterval(int_anime)
    })
    //重新开始按钮监听
    $('.gameEnd').children('.reStart').click(function(){
        $('.gameEnd').stop().fadeOut(10)
        
        $('.target_far').children().remove()
        $('.target_mid').children().remove()
        $('.target_near').children().remove()
        gamestart_time()
        get_target()
        $('.score').find('span').html(0)
    })
    // 继续游戏按钮
    $('.gamePause').children('.reStart').click(function(){
        $('.gamePause').css({
            'display':'none'
        })
        int_time=setInterval(intTime,50)
        int_anime=setInterval(anime,10)
    })
    //回到主界面按钮监听
    $('.gameEnd').children('.Back').click(function(){
        $('.score').find('span').html(0)
        $('.target_far').children().remove()
        $('.target_mid').children().remove()
        $('.target_near').children().remove()
        $('.gameEnd').css({
            'display':'none'
        })
        $('.gameContent').css({
            'display':'none'
        })
        $('.start').css({
            'display':'block'
        })
    })
    $('.gamePause').children('.Back').click(function(){
        $('.score').find('span').html(0)
        $('.target_far').children().remove()
        $('.target_mid').children().remove()
        $('.target_near').children().remove()
        $('.gamePause').css({
            'display':'none'
        })
        $('.gameContent').css({
            'display':'none'
        })
        $('.start').css({
            'display':'block'
        })
    })
    $('.gameContent').find('.fa-home').click(function(){
        $('.score').find('span').html(0)
        $('.start').css({
            'display':'block'
        })
        $('.gameContent').css({
            'display':'none'
        })
        $('.gamePause').css({
            'display':'none'
        })
        $('.gameEnd').css({
            'display':'none'
        })
        clearInterval(int_anime)
        clearInterval(int_time)
    })
    // 监听点击靶子后事件
    var Score
    $('.target').delegate('.can','click',function(){
        $(this).remove()
        get_target()
        Score=$('.score').children('span').html()
        $('.score').children('span').html(parseInt(Score)+1)
    })
    $('.target').delegate('.cannt','click',function(){
        $(this).remove()
        get_target()
        Score=$('.score').children('span').html()
        $('.score').children('span').html(parseInt(Score)-1)
    })

    // 创建游戏开始后动画
    function gamestart_time(){
        $('.clock').css({
            "width":$('.clockOutline').css('width')
        })
        // 时间条动画
        window: int_time=setInterval(intTime,50)

    }

    // 动画执行函数
    function intTime(){
        var clockIndex=$('.clock').css("width")
        window:numClock=parseFloat(clockIndex)
        numClock-=1
        // console.log(numClock);
        if (numClock<0){
            clearInterval(int_time)
            clearInterval(int_anime)
            $('.gameEnd').stop().fadeIn(10)
            $('.target_far').children().remove()
            $('.target_mid').children().remove()
            $('.target_near').children().remove()
            if ($('.score').children('span').html()>0){
                $('.final_score').css('color','red')
                $('.final_score').html($('.score').children('span').html())
            }else{
                $('.final_score').css('color','white')
                $('.final_score').html($('.score').children('span').html())
            }
        }
        $('.clock').css({
            "width":numClock
        })
    }

    //创建靶子类型数组
    target_dis=['target_near','target_mid','target_far']
    target_type=['cannt','can']
    //创建获取靶子函数
    var targetDis
    var targetType
    var leftIndex
    function get_target(){
        
        clearInterval(int_anime)
        window: onoffDistance=Math.floor(Math.random()*3)
        var onoffType=Math.floor(Math.random()*2) 
        targetDis=target_dis[onoffDistance]
        targetType=target_type[onoffType]
        $('.'+targetDis).append('<div class='+targetType+'></div>')
        $('.'+targetDis).children('.'+targetType).css('left',-230)
        leftIndex=parseInt($('.'+targetDis).children('.'+targetType).css('left'))
        int_anime=setInterval(anime,10)
        
        
    }
    var int_anime=setInterval(anime,10)
    var anime=function(){
        if (onoffDistance==0){
            leftIndex+=5
        }else if(onoffDistance==1){
            leftIndex+=3
        }else{
            leftIndex+=2
        }
        $('.'+targetDis).children('.'+targetType).css('left',leftIndex)
        if (leftIndex>600){
            $('.'+targetDis).children('.'+targetType).remove()
            get_target()
        }
    }
    clearInterval(int_anime)
    
})