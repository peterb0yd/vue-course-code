<template lang="">
  <div class="company">
    <header>
      <h2>{{ company.name }}</h2>
      <p>(Price: {{ formatCurrency(company.price) }})</p>
    </header>
    <section>
      <input type="text" placeholder="Quantity" v-model="quantity">
      <button @click="buy" :disabled="quantity <= 0 || isNaN(quantity)">Buy</button>
    </section>
  </div>
</template>

<script>
  import mixin from '../../mixins/mixin';

  export default {
    props: [ 'company' ],
    data() {
      return {
        quantity: undefined
      };
    },
    methods: {
      buy() {
        let payload = {
          shares: this.quantity,
          companyId: this.company.id
        }
        this.$store.commit('buy', payload);
        this.quantity = undefined;
      }
    },
    mixins: [mixin]
  }
</script>

<style lang="css" scoped>

  .company {
    display: inline-block;
    width: 40%;
    margin: 20px;
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid green;
  }

  .company header {
    background: lightgreen;
    color: darkgreen;
    padding: 10px 0;
  }

  .company header h2,
  .company header p {
    display: inline;
  }

  .company section {
    text-align: left;
    padding: 10px 0;
  }

  .company section input {
    padding: 5px;
    margin: 5px 10px;
  }

  .company section button {
    float: right;
    cursor: pointer;
    background-color: lightgreen;
    padding: 5px;
    margin: 5px;
    border: 1px solid green;
    border-radius: 5px;
  }

</style>
