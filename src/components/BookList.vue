<template>
  <div class="bookList pt-5">
    <div class="container">
      <div class="row mb-2">
        <div class="col-3">
          <select
            class="form-select booksCategory"
            aria-label="Default select example"
            v-model="booksCategory"
            @change="filterBooksByCategory"
          >
            <option :value="''" selected>Books Categories</option>
            <option
              :value="bookCategory"
              v-for="(bookCategory, bookCategoryIndex) in bookCategoryOptions"
            >
              {{ bookCategory }}
            </option>
          </select>
        </div>
      </div>
      <ul class="list-group">
        <li
          class="list-group-item bookListcard mb-2"
          v-for="(book, bookIndex) in paginatedBookList"
          :key="book.id"
        >
          <div class="row">
            <div class="col-2">
              <img
                :src="book.volumeInfo.imageLinks.thumbnail"
                class="img-fluid"
                alt="#"
              />
            </div>
            <div class="col-10">
              <h3>{{ book.volumeInfo.title }}</h3>
              <p>
                <strong>{{ book.volumeInfo.subtitle }}</strong>
              </p>
              <button class="btn btn-primary" @click="viewBookDetails(book)">
                View Details
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div class="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <button
              class="page-link"
              :disabled="currentPage < 2"
              @click="previousPage"
            >
              Previous
            </button>
          </li>
          <li
            class="page-item"
            v-for="(page, pageIndex) in pages"
            :key="pageIndex"
          >
            <a class="page-link" @click="gotoPage(page)">{{ page }}</a>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              :disabled="currentPage == pages"
              @click="nextPage"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { cloneDeep, forEach } from "lodash";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore()
const router = useRouter()
const bookList = ref<Array<any>>([]);
const filteredBookList = ref<Array<any>>([]);
const bookCategoryOptions = ref<Array<any>>([]);
const currentPage = ref<number>(1);
const booksCategory = ref<string>("");
let pageCount = 5;

onMounted(async () => {
    store.commit('setBookDetail',{})
  try {
    const res = await axios(
      "https://www.googleapis.com/books/v1/volumes?q=vue.js"
    );
    if (res.status === 200) {
      bookList.value = cloneDeep(res.data.items);
      filteredBookList.value = cloneDeep(res.data.items);
      setBookCategoryOptions();
    }
  } catch {
    bookList.value = [];
  }
});

let pages = computed(() => {
  return Math.ceil(filteredBookList.value.length / pageCount);
});

const setBookCategoryOptions = () => {
  filteredBookList.value.forEach((book) => {
    book.volumeInfo.categories.forEach((category: string) => {
      if (!bookCategoryOptions.value.includes(category)) {
        bookCategoryOptions.value.push(category);
      }
    });
  });
};
const paginatedBookList = computed(() => {
  let startIndex = (currentPage.value - 1) * pageCount;
  let endIndex =  startIndex + pageCount;
  return filteredBookList.value.slice(startIndex, endIndex);
});

const previousPage = () => {
  currentPage.value--;
};

const nextPage = () => {
  currentPage.value++;
};

const gotoPage = (page: number) => {
  currentPage.value = page;
};

const filterBooksByCategory = () => {
  filteredBookList.value = bookList.value.filter((book)=>{
    console.log(book)
    if(booksCategory.value == ''){
        return true
    }
    return book.volumeInfo.categories.includes(booksCategory.value)
  })
};

const viewBookDetails = (book:any)=>{
    let bookClone = cloneDeep(book)
    store.commit('setBookDetail',bookClone)
    setTimeout(()=>{
      router.push({name:'book-details'})
    },100)
}
</script>

<style scoped>
.btn-primary{
    background-color: black;
    border-color: rgb(80, 77, 77);
}

.bookList {
  background-image: linear-gradient(to bottom right, #87898d, #1f2738);
  padding-bottom: 20px;
  min-height: 100vh;
}

.bookListcard {
  background-image: linear-gradient(to bottom right, #999da5, #ffffff);
  padding-bottom: 20px;
  border: #25272a;
  border-radius: 5px;
}

.booksCategory{
    background-color: rgb(82, 84, 84);
    border-color: rgb(80, 77, 77);
    color:#ffffff
}
</style>
