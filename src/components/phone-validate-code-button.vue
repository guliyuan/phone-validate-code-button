<template lang="pug">
    span.button-box
        button.code-button(
                @click="postValidCode" 
                :disabled="getDisabled" 
                :class="animationButton")
                | {{pending ? '请求中': (codeNumber == -1 ? '发送验证码':'重新发送')}}
        span.count(:class="animationCount")
            | {{numberBeforeText}}{{codeNumber}}s{{numberAfterText}}     
</template>
<script>
// 计时器
let Timer = null;

export default {
    // 设置默认值 防止不传的情况
    props:{
        disabled:{
            default:false
        },
        number:{
            default:60
        },
        numberBeforeText:{
            default:'请耐心等待'
        },
        numberAfterText:{
            default:''
        },
        transtion:{
            default:'top'
        }
    },
    data(){
        return{
            reset:false,
            pending:false,
            codeNumber:-1,
            animationButton:[],
            animationCount:[]
        }
    },
    computed:{
        getDisabled(){
            return this.disabled || (this.codeNumber > 0) || this.pending
        },
        result(){
            const { codeNumber ,numberBeforeText,numberAfterText} = this;
            return (codeNumber && codeNumber !== 0 && codeNumber !== -1) ? `${numberBeforeText}${codeNumber}s${numberAfterText}`:(codeNumber == '0' ? '重新发送':'发送验证码');
        }
    },
    watch:{
        reset(val){
            if(!val) return;
            clearInterval(Timer);
            this.codeNumber = -1;
        }
    },
    methods:{
        onReset(){
            this.reset = true;
        },
        postValidCode(){
            // 模拟接口请求  mock sever
            this.pending = true;
            this.reset = false;
            setTimeout(_=>{
                this.start();
            },2000)
            // 接口请求失败 reset 
        },
        start(){
            Timer = null;
            this.pending = false;
            this.codeNumber = this.number;
            this.animationButton = ['top-leave'];
            this.animationCount = ['bottom-enter'];
            Timer = setInterval(_=>{
                this.codeNumber = this.codeNumber - 1;
                if(this.codeNumber == 0){
                    clearInterval(Timer);
                    this.animationButton = [];
                    this.animationCount = [];
                }
            },1000)
        }
    },
    mounted(){
        // 页面卸载 防止内存泄露
        clearInterval(Timer);
    }
}
</script>
<style lang="scss">
$color:#f66495;
// 中间旋转
.center-enter{
    transform: scaleX(1);
    transition: all .3s cubic-bezier(.55,0,.1,1);
}
.center-leave{
    transform: scaleX(0);
    transition: all .3s cubic-bezier(.55,0,.1,1);
}
// 从上
.bottom-enter{
    opacity: 1!important;
    transform: scaleY(1)!important;
    transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);
    transform-origin: bottom center;
}
.bottom-leave{
    opacity: 0;
    transform: scaleY(0);
    transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);
    transform-origin: bottom center;
}
// 从下
.top-enter{
    opacity: 1;
    transform: scaleY(1);
    transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);
    transform-origin: top center;
}
.top-leave{
    opacity: 0!important;
    transform: scaleY(0)!important;
    transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);
    transform-origin: top center;
}
.code-button{
    color: #fff;
    background-color: $color;
    border-color: $color;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
    min-width: 112px;
    @extend .top-enter;
    &[disabled]{
        background-color: #ddd;
    }
}
.count{
    position: absolute;
    width: 110px;
    height: 38px;
    left: 0;
    border: 1px solid$color;
    color:$color;
    line-height: 38px;
    text-align: center;
    border-radius: 4px;
    z-index:-1;
    font-size: 14px;
    @extend .bottom-leave;
}
.button-box{
    position: relative;
}
</style>

