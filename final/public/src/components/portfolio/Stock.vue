<template lang="">
  <div class="stock">
    <header>
      <h2>{{ company.name }}</h2>
      <p>(Price: {{ formatCurrency(company.price) }} | Quantity: {{ stock.shares }})</p>
    </header>
    <section>
      <input type="text" placeholder="Quantity" v-model="quantity">
      <button @click="sell" :disabled="quantity <= 0 || isNaN(quantity)">Sell</button>
    </section>
  </div>
</template>

<script>
  import mixin from '../../mixins/mixin';

  export default {
    props: [ 'stock' ],
    data() {
      return {
        quantity: undefined
      };
    },
    methods: {
      sell() {
        let payload = {
          companyId: this.stock.companyId,
          shares: this.quantity
        };
        this.$store.commit('sell', payload);
        this.quantity = undefined;
      }
    },
    computed: {
      company() {
        console.log(this.$store.state.companies);
        return this.$store.state.companies.find(company => {
          console.log('company: ' + company.name);
          return company.id == this.stock.companyId;
        });
      }
    },
    mixins: [mixin]
  }
</script>

<style lang="css" scoped>

  .stock {
    display: inline-block;
    width: 40%;
    margin: 20px;
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid blue;
  }

  .stock header {
    background: lightblue;
    color: darkblue;
    padding: 10px 0;
  }

  .stock header h2,
  .stock header p {
    display: inline;
  }

  .stock section {
    text-align: left;
    padding: 10px 0;
  }

  .stock section input {
    padding: 5px;
    margin: 5px 10px;
  }

  .stock section button {
    float: right;
    cursor: pointer;
    background-color: lightblue;
    padding: 5px;
    margin: 5px;
    border: 1px solid blue;
    border-radius: 5px;
  }

</style>
