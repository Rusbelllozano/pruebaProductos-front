<template>
  <div class="home">
    <div class="h-20 p-6 bg-gray-200">
      <h1 class="text-2xl text-black text-left font-bold">Products List</h1>
    </div>
    <div class="p-6 h-6">
      <div class="flex flex-row justify-center justify-items-center p-8">
        <div class="flex flex-row mr-5">
          <input
            class="h-8 w-50 p-5 bg-blue-200 rounded-l-lg text-black"
            type="text"
            placeholder="Ingrese su busqueda"
            v-model="name"
          />
          <button
            class="h-10 w-30 p-2 bg-blue-700 flex justify-center rounded-r-lg text-white cursor-pointer"
            @click="nextPage()"
          >
            <span class="material-icons">search</span>
          </button>
        </div>

        <div
          class="flex flex-row justify-center justify-items-center rounded-md gap-5"
        >
          <select
            class="border border-gray-300 rounded-md"
            v-model="category"
            @change="nextPage()"
            id=""
          >
            <option value="" selected disabled>Category</option>
            <option
              v-for="(category, index) in Categories"
              :key="index"
              :value="category.category"
            >
              {{ category.category }}
            </option>
          </select>
          <select
            class="border border-gray-300 rounded-md"
            v-model="sort"
            @change="nextPage()"
          >
            <option value="" selected disabled>Precio</option>
            <option value="-price" selected>Mayor a Menor</option>
            <option value="price">
              Menor a Mayor
            </option>
          </select>
          <select
            class="border border-gray-300 rounded-md"
            v-model="quantity"
            @change="nextPage()"
          >
            <option value="" selected disabled>Stock</option>
            <option value="0" selected>Sin Stock</option>
            <option value="10">
              Con Stock
            </option>
          </select>
          <div>
            <button
              class="rounded-lg bg-gray-300 p-2 text-black"
              @click="reset()"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="Products.length"
        class="grid grid-flow-row  gap-5 p-5 md:grid-cols-2 lg:grid-cols-4 "
      >
        <div v-for="(Product, index) in Products" :key="index">
          <CardProduct :Product="Product" />
        </div>
      </div>
      <div v-else class="p-20">
        <h1>No hay productos con esa busqueda</h1>
      </div>
    </div>

    <!-- <div>
      <div class="flex flex-row gap-5 justify-items-center justify-center">
        <div v-if="CurrentPage == 1">
          <button disabled>Primera Pagina</button>
        </div>
        <div v-else>
          <button @click="nextPage()">Primera Pagina</button>
        </div>
        <div v-for="(Page, index) in Pages" :key="index">
          <div @click="nextPage()">{{ Page }}</div>
        </div>
        <div v-if="CurrentPage == Pages">
          <button disabled>Ultima Pagina</button>
        </div>
        <div v-else>
          <button @click="nextPage()">Ultima Pagina</button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import CardProduct from "@/components/CardProduct.vue";

export default {
  name: "Home",
  components: {
    CardProduct,
  },
  data() {
    return {
      category: "",
      price: "",
      name: "",
      sort: "",
      quantity: "",
    };
  },
  methods: {
    nextPage() {
      let name = this.name;
      let category = this.category;
      let price = this.price;
      let sort = this.sort;
      let quantity = this.quantity;
      this.debounce(this.$store.commit("GET_PRODUCTS", {
        name,
        category,
        price,
        sort,
        quantity,
      }),2000);
    },
    debounce(fn,delay){
      let timeoutID;
        return function (...args) {
          if(timeoutID) clearTimeout(timeoutID);
          timeoutID = setTimeout(()=>{
            fn(...args);
          },delay)
        }
    },
    reset() {
      this.name = "";
      this.category = "";
      this.price = "";
      this.sort = "";
      this.quantity = "";
      this.nextPage();
    },
  },
  computed: {
    Products() {
      return this.$store.state.Products;
    },
    Categories() {
      return this.$store.state.Categories;
    },
  },
};
</script>
<style scoped></style>
