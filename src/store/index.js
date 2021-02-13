import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Products: [],
    Pages: null,
    CurrentPage: null,
    Categories: [],
    page: 1,
    limit: 8
  },
  mutations: {
    async GET_CATEGORIES(state) {
      await axios.get(`http://localhost:3000/get_all_categories`).then(res => {
        let filterCategories = res.data.response.filter((valorActual, indiceActual, arreglo) => {
          return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
        });
        state.Categories = filterCategories
      })
    },
    async GET_PRODUCTS(state, { category, name, price, sort, quantity }) {
      let params = {
        limit: state.limit,
        page: state.page
      }
      if (category) {
        params.category = category
      }
      if (name) {
        params.name = name
      }
      if (price) {
        params.price = price
      }
      if (sort) {
        params.sort = sort
      }
      if (quantity) {
        params.quantity = quantity
      }

      await axios.
        get(`http://localhost:3000/products/`, { params })
        .then(
          res => {
            state.Products = res.data.products;
            state.Pages = res.data.results
          }
        );
    },
  },
  actions: {},
  modules: {}
});
