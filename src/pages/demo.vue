<template lang="pug">
    div 
        div 操作页面：
        div.content
            div 
                input.input(
                    :class = "{'error':error}" 
                    :maxLength="11"
                    v-model="value" 
                    v-on:input="onInputChange"
                    v-on:blur="onBlurChange")
                PhoneValidateVodeButton(
                    class="button"
                    transition="top"  
                    :disabled = "disabled"
                    :number = "number"
                    :numberBeforeText="numberBeforeText"
                    :numberAfterText="numberAfterText"
                )
                div(v-if="error").tips 喵，请输入正确手机号码
</template>
<script>
import PhoneValidateVodeButton from '@/components/phone-validate-code-button'

const regexRule = {
    mobile: /^1[3-9][0-9]\d{8}$/
};

export default {
    data(){
        return{
            disabled:true,
            number:5,
            numberBeforeText:'请耐心等待',
            numberAfterText:'',
            error:false,
            value:''
        }
    },
    components:{
        PhoneValidateVodeButton
    },
    methods:{
        onInputChange(){
            const { value } = this;
            if(!value || !regexRule.mobile.test(value)){
                this.disabled = true;
                return;
            };
            this.disabled = false;
            this.error = false;
        },
        onBlurChange(){
            const { value } = this;
            if(value && regexRule.mobile.test(value)) return;
            this.error = true;
        }
    }
}
</script>
<style lang="scss">
.content{
    padding-top: 12px;
    .input{
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 180px;
        margin-right: 12px;
        &:focus{
            outline: none;
            border-color: #409eff;
        }
        &.error{
            border-color: #f66495;
        }
    }
    .tips{
        color: #f66495;
        font-size: 12px;
        padding: 6px 0;
    }
}
</style>
