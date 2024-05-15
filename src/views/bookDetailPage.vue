<template>
    <div class="bookDetails pt-5">
      <div class="container mb-5">
      <div class="row" v-if="bookDetails.volumeInfo && bookDetails.volumeInfo.title">
        <div class="col-md-4">
          <img :src="bookDetails.volumeInfo.imageLinks.thumbnail" class="img-fluid rounded" alt="Book Cover">
        </div>
        <div class="col-md-8">
          <h2 class="fw-bold">{{ bookDetails.volumeInfo.title }}</h2>
          <h4 class="text-muted">{{ bookDetails.volumeInfo.subtitle }}</h4>
          <p><strong>Author:</strong> {{ bookDetails.volumeInfo.authors.join(', ') }}</p>
          <p><strong>Publisher:</strong> {{ bookDetails.volumeInfo.publisher }}</p>
          <p><strong>Published Date:</strong> {{ bookDetails.volumeInfo.publishedDate }}</p>
          <p><strong>Page Count:</strong> {{ bookDetails.volumeInfo.pageCount }}</p>
          <p><strong>Language:</strong> {{ bookDetails.volumeInfo.language }}</p>
          <p><strong>Description:</strong> {{ bookDetails.volumeInfo.description }}</p>
          <a :href="bookDetails.volumeInfo.previewLink" target="_blank" class="btn btn-primary me-2">Preview Book</a>
          <a :href="bookDetails.volumeInfo.infoLink" target="_blank" class="btn btn-secondary">More Info</a>
        </div>
      </div>
    </div>
    </div>
  </template>
    
    <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useStore } from 'vuex';
  import { cloneDeep } from "lodash";
  
    const store = useStore()
    const bookDetails = ref({}) as any
  
    onMounted(()=>{
      intializeBookDetails()
    })
    const intializeBookDetails = ()=>{
      let bookData = store.state.bookDetail ? store.state.bookDetail : {}
      bookData = cloneDeep(bookData) // this is just to make data reference free from the orignal object ref
      bookDetails.value = bookData
    }
   
  
    </script>
    <style scoped>
    .bookDetails{
      background-image: linear-gradient(to bottom right,#999da5, #ffffff);
      padding-bottom: 20px;
      color: #000;
    }
  
    .btn-primary{
    background-color: #25272a;
    border-color: #87898d;
  }
    </style>
    