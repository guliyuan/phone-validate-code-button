# phone-validate-code-button

> 基于 Vue CLI 的发送验证码按钮组件。

## 追加的依赖
* npm install pug
* npm install express
* npm install cors
* npm install body-parser

## 组装

* deme.vue 操作示例页面

     1 blur,focus事件处理，判断按钮是否可点击，正则判断输入内容是否符合11位手机号码。

     2 传入四个配置参数
          - phone 需要发送验证码的手机号码，必传
          - disabled 按钮是否失效，默认true，手机号码输入正确为true
          - number 倒计时秒数，非必传
          - numberBeforeText 自定义秒数前面的数字，非必传
          - numberAfterText 自定义秒数后面的数字，非必传

     3 错误提示借鉴B站文案，及主色调粉色。

* phone-validate-code-button 组件页面

     1 使用scss处理器
          - $color定义组件配色，参照B站主题色。
          - 按钮动画参照element-ui内置过渡动画，页面中一共定义了三种，为上，下，中间的效果，理想情况可在上级组件传入动画主题。

     2 props接受上级传入五个属性，单项数据流不做更改。

     3 内部状态：
          - reset 重置按钮，默认false，接口请求错误情况下设置为true。
          - pending 接口请求发送中，默认false，点击按钮为true,接口发送完成为false（无论是否成功）。
          - codeNumber 本地倒计时秒数，默认-1未点击状态。
          - animationButton 按钮动画数组，写成数组是方便扩展。
          - animationCount 计数span动画数组，写成数组是方便扩展。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# 开始mock server
npm run mock

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```
