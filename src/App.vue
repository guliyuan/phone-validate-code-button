<template>
  <div id="app">
    <Demo/>
  </div>
</template>

<script>
import Demo from './pages/demo'

export default {
  name: 'App',
  components: {
    Demo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
