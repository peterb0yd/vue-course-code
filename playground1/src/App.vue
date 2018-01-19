<template>
  <div id="app">
    <button @click="selectedComponent = 'appQuote'">Quote</button>
    <button @click="selectedComponent = 'appAuthor'">Author</button>
    <button @click="selectedComponent = 'appNew'">New</button>
    <p>Selected Component: {{ selectedComponent }}</p>
    <hr>
    <keep-alive>
      <component :is="selectedComponent">
        <h2 slot="title">The Header</h2>
        <h4>TEST</h4>
        <p>A wonderful quote!</p>
        <p slot="subtitle">injected text!</p>
      </component>
    </keep-alive>
    <!-- <app-quote>
      <h2 slot="title">The Header</h2>
      <h4>TEST</h4>
      <p>A wonderful quote!</p>
      <p slot="subtitle">injected text!</p>
    </app-quote> -->
  </div>
</template>

<script>
import Quote from './components/Quote.vue';
import Author from './components/Author.vue';
import New from './components/New.vue';

export default {
  components: {
    appQuote: Quote,
    appAuthor: Author,
    appNew: New
  },
  data() {
    return {
      selectedComponent: 'appQuote'
    };
  }
}
</script>

<style>
</style>
