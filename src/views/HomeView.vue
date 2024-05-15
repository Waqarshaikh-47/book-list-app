<template>
  <div class="home">
    <BookList msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BookList from '@/components/BookList.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    BookList,
  },
});
</script>
