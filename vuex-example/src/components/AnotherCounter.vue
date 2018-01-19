<template>
    <div>
      <p>Async</p>
      <button class="btn btn-primary" @click="asyncIncrement({by: 50, duration: 500})">Increment</button>
      <button class="btn btn-primary" @click="asyncDecrement({by: 25, duration: 1000})">Decrement</button>
      <button @click="alertMe">Alert me bro</button>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { mapActions } from 'vuex';

  export default {
      computed: mapGetters(['getCounter']),
      methods: {
        ...mapActions([
          'asyncIncrement',
          'asyncDecrement'
        ]),
        alertMe() {
          alert('You rock dude');
        }
      }
  }
</script>
