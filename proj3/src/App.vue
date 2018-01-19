<template>
  <div id="app">

    <div v-if="!formSubmitted">
      <form>
        <app-full-name v-model="userData.name"></app-full-name>

        <label>Email</label>
        <input type="email" v-model="userData.email">

        <label>Password</label>
        <input type="password" v-model="userData.password">

        <label>Store data?</label>
        <input type="radio" value="Yes" v-model="storeData"> Yes
        <input type="radio" value="No" v-model="storeData"> No

        <button @click="formSubmitted = true">Sign Up!</button>
      </form>
    </div>

    <div v-else>
      <p>Name: {{ userData.name }}</p>
      <p>Email: {{ userData.email }}</p>
      <p>Password: {{ userData.password }}</p>
      <p>Stored?: {{ storeData }}</p>
    </div>

  </div>
</template>

<script>
import FullName from './FullName.vue';

export default {
  name: 'app',
  components: {
    appFullName: FullName
  },
  data () {
    return {
      userData: {
        name: '',
        email: '',
        password: ''
      },
      storeData: 'Yes',
      formSubmitted: false
    }
  }
}
</script>

<style>
</style>
