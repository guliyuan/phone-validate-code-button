<template lang="pug">
    div 
        button(@click="postValidCode" :disabled="getDisabled").button
            | {{pending ? '请求中': result}}
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
            codeNumber:-1
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

