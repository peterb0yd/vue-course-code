<template lang="">
  <header>
    <nav class="left">
      <router-link to="/" class="inline" active-class="selected"><h2>Stock Trader</h2></router-link>
      <router-link to="/portfolio" class="inline" active-class="selected" @click="changePage('portfolio')"><h3>Portfolio</h3></router-link>
      <router-link to="/stocks" class="inline" active-class="selected" @click="changePage('stocks')"><h3>Stocks</h3></router-link>
    </nav>

    <nav class="right">
      <a class="inline" @click="endDay"><h3>End Day</h3></a>
      <div class="inline toggle">
        <a :class="{ active: showSaveLoad }" @click="showSaveLoad = !showSaveLoad"><h3>Save & Load</h3></a>
        <ul id="save-load-dropdown" v-if="showSaveLoad">
          <li><a @click="saveData">Save</a></li>
          <li><a @click="loadData">Load</a></li>
        </ul>
      </div>
      <h3 class="inline">Funds: {{ formatCurrency(myFunds) }}</h3>
    </nav>
  </header>
</template>

<script>
  import mixin from '../mixins/mixin';

  export default {
    data() {
      return {
        showSaveLoad: false,
        page: 'home'
      };
    },
    methods: {
      changePage(p) {
        this.page = p;
        this.$emit('pageChanged', p);
      },
      endDay() {
        this.$store.commit('endDay');
      },
      saveData() {
        this.showSaveLoad = false;
        this.$store.dispatch('saveData');
      },
      loadData() {
        this.showSaveLoad = false;
        this.$store.dispatch('loadData');
      }
    },
    computed: {
      myFunds() {
        return this.$store.state.portfolio.available;
      }
    },
    mixins: [mixin]
  }
</script>

<style lang="css" scoped>

  header {
    display: block;
    width: 100%;
    border: 1px solid rgba(100,100,100,0.6);
    background-color: rgba(100,100,100,0.2);
    border-radius: 5px;
    color: rgba(100,100,100,0.8);
  }

  .selected, .active {
    font-weight: bold;
    color: black;
  }

  .inline {
    display: inline-block;
    margin: 5px 20px;
  }

  .toggle {
    position: relative;
  }

  .left, .right { display: inline-block; position: relative }
  .left { text-align: left; width: 38% }
  .right { text-align: right; width: 58%}

  a {
    cursor: pointer;
    text-decoration: none;
    color: rgba(100,100,100,0.8);
  }

  #save-load-dropdown {
    display: block;
    position: absolute;
    padding: 0;
    margin-top: 10px;
    left: 0; top: 100%;
    background: rgba(220,220,220,0.9);
    border: 1px solid rgba(100,100,100,0.6);
    font-size: 12pt;
  }

  #save-load-dropdown li {
    cursor: pointer;
    padding: 10px 20px;
    list-style: none;
    text-align: left;
  }

  #save-load-dropdown li:first {
    border-bottom: 1px solid rgba(100,100,100,0.6);
  }

</style>
