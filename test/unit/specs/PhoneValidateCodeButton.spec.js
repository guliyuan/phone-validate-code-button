import Vue from 'vue'
import PhoneValidateCodeButton from '@/components/phone-validate-code-button'

describe('PhoneValidateCodeButton.vue', () => {
  it('reset 为true的情况下,codeNumber为-1', () => {
    const Constructor = Vue.extend(PhoneValidateCodeButton)
    const vm = new Constructor().$mount()
    vm.reset = true;
    expect(vm.codeNumber).toEqual(-1)
  })
})