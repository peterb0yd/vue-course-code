<template>
  <div id="app">
    <input type="text" v-model="filterText">
    <button @click="fruits.push('Berries')">Add Item</button>
    <ul>
      <li v-for="fruit in filteredFruits">{{ fruit }}</li>
    </ul>
    <hr>
    <app-list></app-list>
  </div>
</template>

<script>
import List from './List.vue';
import { fruitMixin } from './fruitMixin';

export default {
  mixins: [fruitMixin],
  data() {
    return {
      text: '',
    };
  },
  computed: {
    textUpper() {
      return this.text.toUpperCase();
    },
  },
  components: {
    appList: List
  }
}
</script>

<style>
</style>
