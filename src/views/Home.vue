<template>
  <div class="home">
    <div class="flex flex-row justify-center justify-items-center rounded-md">
      <input
        class="h-8 w-50 p-5 bg-blue-200 rounded-md"
        type="text"
        placeholder="Ingrese su busqueda"
        v-model="search"
      />
      <button
        class="h-10 w-30 p-2 bg-blue-700 flex justify-center rounded-md text-white cursor-pointer"
        @click="searchProducts()"
      >
        Buscar
      </button>
    </div>

    <div class="flex flex-row justify-center justify-items-center rounded-md">
      <select v-model="category" @change="searchCategory($event)" id="">
        <option
          v-for="(category, index) in Categories"
          :key="index"
          :value="category.category"
        >
          {{ category.category }}
        </option>
      </select>
      <button
        class="h-10 w-30 p-2 bg-blue-700 flex justify-center rounded-md text-white cursor-pointer"
        @click="sortProducts(-1)"
      >
        Mayor a Menor
      </button>
      <button
        class="h-10 w-30 p-2 bg-blue-700 flex justify-center rounded-md text-white cursor-pointer"
        @click="sortProducts(1)"
      >
        Menor a Mayor
      </button>
    </div>
    <div v-if="Products.length" class="grid grid-flow-row grid-cols-3 gap-5">
      <div v-for="(Product, index) in Products" :key="index">
        <CardProduct :Product="Product" />
      </div>
    </div>
    <div v-else class="p-20">
      <h1>No hay productos con esa busqueda</h1>
    </div>
    <div>
      <div class="flex flex-row gap-5 justify-items-center justify-center">
        <div v-if="CurrentPage == 1">
          <button disabled>Primera Pagina</button>
        </div>
        <div v-else>
          <button @click="nextPage(1)">Primera Pagina</button>
        </div>
        <div v-for="(Page, index) in Pages" :key="index">
          <div @click="nextPage(Page)">{{ Page }}</div>
        </div>
        <div v-if="CurrentPage == Pages">
          <button disabled>Ultima Pagina</button>
        </div>
        <div v-else>
          <button @click="nextPage(Pages)">Ultima Pagina</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CardProduct from "@/components/CardProduct.vue";

export default {
  name: "Home",
  components: {
    CardProduct,
  },
  data() {
    return {
      search: "",
      category: "",
    };
  },
  methods: {
    nextPage(page) {
      this.$store.commit("GET_PRODUCTS", page);
    },
    searchProducts() {
      let search = this.search;
      this.$store.commit("GET_SEARCH_PRODUCTS", search);
    },
    sortProducts(sort) {
      this.$store.commit("GET_SORT_PRODUCTS", sort);
    },
    searchCategory(event) {
      console.log(event.target.value);
      this.$store.commit("GET_SEARCH_CATEGORY", event.target.value);
    },
  },
  computed: {
    Products() {
      return this.$store.state.Products;
    },
    Categories() {
      return this.$store.state.Categories;
    },
    Pages() {
      return this.$store.state.Pages;
    },
    CurrentPage() {
      return this.$store.state.CurrentPage;
    },
  },
};
</script>
<style scoped>
.home {
  padding: 20px;
}
</style>
