<template>
  <div class="home">
    <p>counter: {{ $store.state.counter }}</p>
    <button @click="$store.commit('add', 1)">add</button>
    <br />
    <button @click="$store.dispatch('addAsync', 10)">
      async add
    </button>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
