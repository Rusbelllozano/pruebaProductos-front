import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Products: [],
    Pages: null,
    CurrentPage: null,
    Categories: []
  },
  mutations: {
    async GET_CATEGORIES(state) {
      await axios.get(`http://localhost:3000/get_all_categories`).then(res => {
        console.log(res)
        let filterCategories = res.data.response.filter((valorActual, indiceActual, arreglo) => {
          return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
        });
        state.Categories = filterCategories
      })
    },
    async GET_PRODUCTS(state, page) {
      await axios.get(`http://localhost:3000/products/`, {
        params: {
          page: page,
          search: ""
        }
      }
      ).then(res => {
        state.Products = res.data.products;
        state.Pages = res.data.pages
        state.CurrentPage = res.data.currentPage
        console.log(res.data)
      });
    },
    async GET_SEARCH_PRODUCTS(state, search) {
      await axios.get(`http://localhost:3000/products/`, {
        params: {
          page: 1,
          search: search
        }
      }).then(res => {
        state.Products = res.data.products;
        state.Pages = res.data.pages;
        state.CurrentPage = res.data.currentPage;
        console.log(res.data);
      });
    },
    async GET_SEARCH_CATEGORY(state, category) {
      await axios.get(`http://localhost:3000/products/`, {
        params: {
          page: 1,
          category: category
        }
      }).then(res => {
        state.Products = res.data.products;
        state.Pages = res.data.pages;
        state.CurrentPage = res.data.currentPage;
        console.log(res.data);
      });
    },
    async GET_SORT_PRODUCTS(state, sort) {
      await axios.get(`http://localhost:3000/products/`, {
        params: {
          page: 1,
          search: "",
          sort: sort
        }
      }).then(res => {
        state.Products = res.data.products;
        state.Pages = res.data.pages;
        state.CurrentPage = res.data.currentPage;
        console.log(res.data)
      });
    }
  },
  actions: {},
  modules: {}
});
