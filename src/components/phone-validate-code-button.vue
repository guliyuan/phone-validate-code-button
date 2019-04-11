<template lang="pug">
    div 
        button(@click="change1") 旋转上
        button(@click="change2") 旋转下
        button(@click="change3") 中间旋转
        button(@click="cancel") 取消数组
        button.code-button( @click="postValidCode" :disabled="getDisabled")
                | {{pending ? '请求中': result}}
        div(style="padding:20px 0")
            div.demo1(:class="themeClassArr1")
            div.demo2(:class="themeClassArr2")
            div.demo3(:class="themeClassArr3")
        div {{codeNumber}} {{disabled}} {{numberBeforeText}} {{numberAfterText}}
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
        }
    },
    data(){
        return{
            reset:false,
            // 接口请求中
            pending:false,
            codeNumber:-1,
            themeClassArr1:[],
            themeClassArr2:[],
            themeClassArr3:[]
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
    methods:{
        change1(){
            this.themeClassArr1 = ['top-enter'];
        },
        change2(){
            this.themeClassArr2 = ['bottom-enter'];
        },
        change3(){
            this.themeClassArr3 = ['center-enter'];
        },
        cancel(){
            this.themeClassArr1 = ['top-leave'];
            this.themeClassArr2 = ['bottom-leave'];
            this.themeClassArr3 = ['center-leave'];
        },
        postValidCode(){
            // 模拟接口请求
            this.pending = true;
            setTimeout(_=>{
                this.start();
            },2000)
            // 接口请求失败 reset 
        },
        start(){
            console.log('计时器开始');
            Timer = null;
            this.pending = false;
            this.codeNumber = this.number;
            Timer = setInterval(_=>{
                console.log('setInterval');
                this.codeNumber = this.codeNumber - 1;
                if(this.codeNumber == 0){
                    clearInterval(Timer);
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
.demo1,.demo2{
    width: 200px;
    height: 100px;
    display:inline-block;
    background-color: green;
    transform: scaleY(0);
    opacity: 0;
    border-radius: 4px;
    background-color: #409eff;
}
.demo3{
    width: 200px;
    height: 100px;
    display: inline-block;
    background-color: green;
    transform: scaleX(0);
    border-radius: 4px;
    background-color: #409eff;
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
}
</style>

