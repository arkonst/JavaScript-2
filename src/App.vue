<template>
  <div id="app"> 
    <app-header></app-header>
    <main>      
      <router-view />      
    </main>   
    <app-footer></app-footer> 
  </div>
</template>


<script>
import appHeader from '@/components/app-header';
import appFooter from '@/components/app-footer';
import 'reset-css';

export default {
  name: 'App',
  components: {
    appHeader,
    appFooter
  }
};
</script> 

<style lang="scss">
html {
  font-family: 'Roboto', sans-serif;
}
#app {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
}
main {
  display: flex;
  flex: 1 0 auto;
  height: calc(100% - 96px);
}
</style>