<template>
  <div id="app">
    <form>
      <h2>Create Account</h2>
      <label>Email</label>
      <input type="email" v-model="newAccount.email">
      <label>Password</label>
      <input type="password" v-model="newAccount.password">
      <button @click.prevent="createAccount">Create Account</button>
    </form>
    <br>
    <hr>
    <br>
    <form>
      <h2>Log In</h2>
      <label>Email</label>
      <input type="email" v-model="userAccount.email">
      <label>Password</label>
      <input type="password" v-model="userAccount.password">
      <button @click.prevent="login">Log In</button>
    </form>
    <br>
    <div v-if="loggedIn">
      <hr>
      <br>
      <form>
        <h2>Add Todo</h2>
        <label>Description</label>
        <input type="text" v-model="myTodo.description">
        <label class="inline">Completed?</label>
        <input type="checkbox" v-model="myTodo.completed">
        <button @click.prevent="addTodo">Add Todo Item</button>
      </form>
      <br>
      <hr>
      <br>
      <button @click.prevent="getTodos">Fetch Todos</button>
      <br>
      <ul>
        <li v-for="todo in allTodos">
          <h4>{{ todo.description }}</h4>
          <p>Completed: {{ todo.completed }}</p>
        </li>
      </ul>
      <br><br>
      <hr>
      <br><br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      loggedIn: false,
      authToken: '',
      response: '',
      newAccount: {
        email: '',
        password: '',
      },
      userAccount: {
        email: '',
        password: '',
      },
      myTodo: {
        description: '',
        completed: false
      },
      allTodos: [],
      resource: {}
    };
  },
  created() {
    const customActions = {
      saveUser: { method: 'POST', url: 'users' },
      getAllTodos: { method: 'GET', url: 'todos', options: this.reqOptions() }
    };
    this.resource = this.$resource('', {}, customActions);
  },
  methods: {
    createAccount() {
      // this.$http.post('users', this.newAccount).then((res) => {
      //   this.response = res.body;
      //   console.log('success!' + this.response.body);
      // }).catch((err) => {
      //   this.response = err.body;
      //   console.log("Got an error...");
      // });
      this.resource.saveUser(this.newAccount);
    },
    login() {
      this.$http.post('users/login', this.userAccount).then((res) => {
        this.authToken = res.headers.get('Auth');
        this.loggedIn = true;
        console.log(res);
      }).catch((err) => {
        this.response = err.body;
        console.log("Got an error...");
      });
    },
    reqOptions() {
      return {
        headers: { Auth: this.authToken }
      };
    },
    addTodo() {
      this.$http.post('todos', this.myTodo, this.reqOptions()).then((res) => {
        console.log(res);
      }).catch((err) => {
        this.response = err;
        console.log("Got an error...");
      });
    },
    getTodos() {
      // this.$http.get('todos', this.reqOptions()).then((res) => {
      //   return res.json();
      // }).then((todos) => {
      //   this.allTodos = todos;
      // }).catch((err) => {
      //   this.response = err;
      //   console.log("Got an error...");
      // });
      this.resource.getAllTodos();
    }
  }
}
</script>

<style>

form {
  display: block;
  margin: 40px auto;
  padding: 40px;
  width: 500px;
  text-align: center;
  background-color: lightgray;
  border: 1px solid darkgray;
  border-radius: 10px;
}
label, input {
  display: block;
}
label {
  margin: 5px auto;
}
input {
  margin: 10px auto 20px auto;
}
.inline,
input[type=checkbox] {
  display: inline;
}

button {
  display: block;
  background: darkblue;
  margin: 10px auto;
  cursor: pointer;
  padding: 5px 10px;
  color: white;
  border-radius: 10px;
}
</style>
