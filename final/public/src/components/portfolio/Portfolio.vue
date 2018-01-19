<template lang="html">
  <div id="container">
    <ul>
      <app-stock v-for="stock in stocks" :stock="stock"></app-stock>
    </ul>
  </div>
</template>

<script>
  import Stock from './Stock.vue';

  export default {
    computed: {
      stocks() {
        return this.$store.state.stocks;
      }
    },
    components: {
      appStock: Stock
    }
  }
</script>

<style lang="css" scoped>

  #container {
    text-align: center;
  }

</style>
