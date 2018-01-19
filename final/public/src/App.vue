<template>
  <div id="app">
    <app-header @pageChanged="changePage"></app-header>
    <transition mode="out-in" name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Home from './components/Home.vue';
  import Portfolio from './components/portfolio/Portfolio.vue';
  import Stocks from './components/stocks/Stocks.vue';

  export default {
    name: 'app',
    data () {
      return {
        currentComponent: 'home'
      }
    },
    beforeCreate() {
      this.$store.dispatch('loadData');
    },
    methods: {
      changePage($page) {
        this.currentComponent = $page;
      }
    },
    computed: {
      componentName() {
        return 'app-'+this.currentComponent;
      }
    },
    components: {
      appHeader: Header,
      appHome: Home,
      appPortfolio: Portfolio,
      appStocks: Stocks
    }
  }
</script>

<style>

  #app {
    display: block;
    margin: 40px auto;
    width: 80vw;
    height: 80vh;
  }

  .slide-enter {

  }

  .slide-enter-active {
    animation: slide-in 0.2s ease forwards;
  }

  .slide-leave {

  }

  .slide-leave-active {
    animation: slide-out 0.2s ease forwards;
  }


  @keyframes slide-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-20px);
      opacity: 0;
    }
  }

  @keyframes slide-in {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }

</style>
