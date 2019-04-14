import Vue from 'vue'
import PhoneValidateCodeButton from '@/components/phone-validate-code-button'

describe('PhoneValidateCodeButton.vue', () => {
  it('reset 为true的情况下,codeNumber为-1', () => {
    const Constructor = Vue.extend(PhoneValidateCodeButton)
    const vm = new Constructor().$mount()
    vm.reset = true;
    expect(vm.codeNumber).toEqual(-1)
  })
  it('倒计时为-1时，button文字是否是发送验证码', () => {
    const Constructor = Vue.extend(PhoneValidateCodeButton)
    const vm = new Constructor().$mount()
    vm.codeNumber = -1;
    expect(vm.$el.querySelector('.code-button').textContent)
    .toEqual('发送验证码')
  })
  it('倒计时为0时，animationButton数组是非为空', () => {
    const Constructor = Vue.extend(PhoneValidateCodeButton)
    const vm = new Constructor().$mount()
    vm.codeNumber = 0;
    expect(vm.animationButton).toEqual([])
  })
  it('倒计时为0时，animationCount数组是非为空', () => {
    const Constructor = Vue.extend(PhoneValidateCodeButton)
    const vm = new Constructor().$mount()
    vm.codeNumber = 0;
    expect(vm.animationCount).toEqual([])
  })
})