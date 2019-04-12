<template lang="pug">
    span.button-box
        button.code-button(
                @click="postValidCode" 
                :disabled="getDisabled" 
                :class="themeClassArr1")
                | {{pending ? '请求中': (codeNumber == -1 ? '发送验证码':'重新发送')}}
        span.count(:class="themeClassArr11")
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
            // 接口请求中
            pending:false,
            codeNumber:-1,
            themeClassArr1:[],
            themeClassArr11:[]
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
            // this.pending = false;
        },
        transtion:{
            immediate: true,
            handler(val){
                // 动画动态配置
                if(val === 'center'){
                    this.themeClassArr1 = ['center-enter'];
                    this.themeClassArr11 = ['center-leave'];
                } else if(val === 'bottom'){
                    this.themeClassArr1 = ['bottom-enter'];
                    this.themeClassArr11 = ['top-leave'];
                } else {
                    this.themeClassArr1 = ['top-enter'];
                    this.themeClassArr11 = ['bottom-leave'];
                }
            }
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
            this.themeClassArr1 = ['top-leave'];
            this.themeClassArr11 = ['bottom-enter'];
            Timer = setInterval(_=>{
                this.codeNumber = this.codeNumber - 1;
                if(this.codeNumber == 0){
                    clearInterval(Timer);
                    // 默认top 动画  还未做动态配置
                    this.themeClassArr1 = ['top-enter'];
                    this.themeClassArr11 = ['bottom-leave'];
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
.button-box{
    position: relative;
    .count{
        position: absolute;
        width: 110px;
        height: 38px;
        left: 0;
        border: 1px solid #f66495;
        color: #f66495;
        line-height: 38px;
        text-align: center;
        border-radius: 4px;
        z-index:-1;
        font-size: 14px;
    }
}
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
    opacity: 1;
    transform: scaleY(1);
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
    opacity: 0;
    transform: scaleY(0);
    transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);
    transform-origin: top center;
}
.code-button{
    color: #fff;
    background-color: #f66495;
    border-color: #f66495;
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
    &[disabled]{
        background-color: #ddd;
    }
}
</style>

