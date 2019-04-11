<template lang="pug">
    div 示例页面
        PhoneValidateVodeButton(
            :disabled = "disabled"
            :number = "number"
            :numberBeforeText="numberBeforeText"
            :numberAfterText="numberAfterText"
        )
</template>
<script>
import PhoneValidateVodeButton from '@/components/phone-validate-code-button'

export default {
    data(){
        return{
            disabled:false,
            number:10,
            numberBeforeText:'请耐心等待',
            numberAfterText:'可再次发送'
        }
    },
    components:{
        PhoneValidateVodeButton
    }
}
</script>

<style lang="scss">
div{
    color: red;
}
</style>
